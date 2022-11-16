<?php
require_once URLSLAB_PLUGIN_DIR . '/includes/services/class-urlslab-file-data.php';

abstract class Urlslab_Driver {
	const URLSLAB_DIR = 'urlslab/';

	public const DRIVER_DB = 'D';
	public const DRIVER_LOCAL_FILE = 'F';
	public const DRIVER_S3 = 'S';

	public const STATUS_ACTIVE = 'A';
	public const STATUS_PENDING = 'P';
	public const STATUS_NEW = 'N';
	public const STATUS_ERROR = 'E';

	public const DOWNLOAD_URL_PATH = 'urlslab-download/';

	private static $driver_cache = array();

	/**
	 * return content of file
	 *
	 * @param Urlslab_File_Data $file_pointer
	 *
	 * @return mixed
	 */
	abstract function get_file_content( Urlslab_File_Data $file );

	/**
	 * output content of file to standard output
	 *
	 * @param Urlslab_File_Data $file
	 *
	 * @return mixed
	 */
	abstract function output_file_content( Urlslab_File_Data $file );

	abstract function save_file_to_storage( Urlslab_File_Data $file, string $local_file_name ): bool;

	abstract function is_connected();

	abstract public function save_to_file( Urlslab_File_Data $file, $file_name ): bool;

	abstract public function delete_content( Urlslab_File_Data $file ): bool;

	abstract public function get_driver_code(): string;

	public function get_url( Urlslab_File_Data $file ) {
		//URL to standard proxy script
		return site_url( self::DOWNLOAD_URL_PATH . urlencode( $file->get_fileid() ) . '/' . urlencode( $file->get_filename() ) );
	}

	public function get_file_hash( $file_name ) {
		return hash_file( 'xxh3', $file_name, false );
	}

	/**
	 * @param Urlslab_File_Data $file
	 *
	 * @return string|null filename of downloaded file
	 */
	private function download_url( Urlslab_File_Data $file ): ?string {
		$local_tmp_file = download_url( $file->get_url() );
		if ( is_wp_error( $local_tmp_file ) ) {
			if (
				get_option( Urlslab_Media_Offloader_Widget::SETTING_NAME_IMAGE_RESIZING, Urlslab_Media_Offloader_Widget::SETTING_DEFAULT_IMAGE_RESIZING ) &&
				404 == $local_tmp_file->get_error_data( 'http_404' )['code'] &&
				preg_match( '/^(.*?)-([0-9]*?)x([0-9]*?)\.(.*?)$/', $file->get_url(), $matches )
			) {
				if ( strlen( $file->get_parent_url() ) ) {
					$original_tmp_file = download_url( $file->get_parent_url() );
				} else {
					$original_tmp_file = download_url( $matches[1] . '.' . $matches[4] );
				}
				if ( ! is_wp_error( $original_tmp_file ) ) {
					$local_tmp_file = $this->resize_image( $original_tmp_file, $matches[2], $matches[3] );
					unlink( $original_tmp_file );
					if ( false === $local_tmp_file ) {
						//on this place we could use original file as new file if we want, but it would generate useless traffic
						return false;
					}
				} else {
					return false;
				}
			} else {
				return false;
			}
		}

		return $local_tmp_file;
	}

	public function upload_content( Urlslab_File_Data $file ) {
		global $wpdb;

		if ( strlen( $file->get_local_file() ) && file_exists( $file->get_local_file() ) ) {
			$file_name   = $file->get_local_file();
			$delete_file = false;
		} else {
			$file_name = $this->download_url( $file );
			if ( false === $file_name ) {
				return false;
			}
			$delete_file = true;
		}

		$update_data = array();

		$filehash = $this->get_file_hash( $file_name );
		if ( $filehash && $file->get_filehash() != $filehash ) {
			$update_data['filehash'] = $filehash;
		}

		$file_size = filesize( $file_name );
		if ( $file_size && ( empty( $file->get_filesize() ) || $file->get_filesize() != $file_size ) ) {
			$update_data['filesize'] = $file_size;
		}

		//if pointer exists, stop uploading
		$pointer = Urlslab_File_Pointer_Data::get_file_pointer( $filehash, $file_size );

		if ( null == $pointer ) {
			$result = $this->save_file_to_storage( $file, $file_name );

			//create pointer
			$size = getimagesize( $file_name );
			if ( $size ) {
				$width  = $size[0];
				$height = $size[1];
			} else {
				$width  = 0;
				$height = 0;
			}

			$wpdb->insert(
				URLSLAB_FILE_POINTERS_TABLE,
				array(
					'filehash' => $filehash,
					'filesize' => $file_size,
					'driver'   => $this->get_driver_code(),
					'filetype' => Urlslab_File_Pointer_Data::get_mime_type_from_filename( $file_name ),
					'width'    => $width,
					'height'   => $height,
				)
			);
		}

		if ( $delete_file ) {
			unlink( $file_name );
		}

		if ( $result ) {
			//update filesize attribute
			if ( ! empty( $update_data ) ) {
				$wpdb->update( URLSLAB_FILES_TABLE, $update_data, array( 'fileid' => $file->get_fileid() ) );
			}
		}

		return $result;
	}

	private function resize_image( $file, $w, $h ) {
		$img_info = getimagesize( $file );
		$width    = $img_info[0];
		$height   = $img_info[1];

		$r = $width / $height;
		if ( $w / $h > $r ) {
			$newwidth  = $h * $r;
			$newheight = $h;
		} else {
			$newheight = $w / $r;
			$newwidth  = $w;
		}

		switch ( $img_info['mime'] ) {
			case 'image/png':
				$src = imagecreatefrompng( $file );
				break;
			case 'image/bmp':
				$src = imagecreatefrombmp( $file );
				break;
			case 'image/gif':
				$src = imagecreatefromgif( $file );
				break;
			case 'image/jpg':
			case 'image/jpe':
			case 'image/jpeg':
				$src = imagecreatefromjpeg( $file );
				break;
			default:
				return false;
		}
		$dst = imagecreatetruecolor( $newwidth, $newheight );
		imagecopyresampled( $dst, $src, 0, 0, 0, 0, $newwidth, $newheight, $width, $height );
		$tmp_name = wp_tempnam();
		switch ( $img_info['mime'] ) {
			case 'image/png':
				imagepng( $dst, $tmp_name );
				break;
			case 'image/bmp':
				imagebmp( $dst, $tmp_name );
				break;
			case 'image/gif':
				imagegif( $dst, $tmp_name );
				break;
			case 'image/jpg':
			case 'image/jpe':
			case 'image/jpeg':
				imagejpeg( $dst, $tmp_name );
				break;
			default:
				return false;
		}

		return $tmp_name;
	}

	public static function get_driver( $driver ): Urlslab_Driver {
		if ( isset( self::$driver_cache[ $driver ] ) ) {
			return self::$driver_cache[ $driver ];
		}

		switch ( $driver ) {
			case self::DRIVER_DB:
				self::$driver_cache[ self::DRIVER_DB ] = new Urlslab_Driver_Db();
				break;
			case self::DRIVER_S3:
				self::$driver_cache[ self::DRIVER_S3 ] = new Urlslab_Driver_S3();
				break;
			case self::DRIVER_LOCAL_FILE:
				self::$driver_cache[ self::DRIVER_LOCAL_FILE ] = new Urlslab_Driver_File();
				break;
			default:
				throw new Exception( 'Driver not found' );
		}

		return self::$driver_cache[ $driver ];
	}

	public static function transfer_file_to_storage(
		Urlslab_File_Data $file,
		string $dest_driver
	): bool {
		global $wpdb;

		$result   = false;
		$tmp_name = wp_tempnam();
		if (
			Urlslab_Driver::get_driver( $file->get_file_pointer()->get_driver() )->save_to_file( $file, $tmp_name ) &&
			(
				filesize( $tmp_name ) == $file->get_file_pointer()->get_filesize() ||
				( 0 == $file->get_file_pointer()->get_filesize() && 0 < filesize( $tmp_name ) )
			)
		) {
			$old_file = clone $file;

			//set new driver of storage
			$file->get_file_pointer()->set_driver( $dest_driver );
			//save file to new storage
			if ( Urlslab_Driver::get_driver( $file->get_file_pointer()->get_driver() )->save_file_to_storage( $file, $tmp_name ) ) {
				//change driver of file in db
				$wpdb->update(
					URLSLAB_FILE_POINTERS_TABLE,
					array(
						'driver'   => $file->get_file_pointer()->get_driver(),
						'filesize' => filesize( $tmp_name ),
					),
					array(
						'filehash' => $file->get_filehash(),
						'filesize' => $file->get_filesize(),
					)
				);
				//delete original file
				if ( get_option( Urlslab_Media_Offloader_Widget::SETTING_NAME_DELETE_AFTER_TRANSFER, Urlslab_Media_Offloader_Widget::SETTING_DEFAULT_DELETE_AFTER_TRANSFER ) ) {
					Urlslab_Driver::get_driver( $old_file->get_file_pointer()->get_driver() )->delete_content( $old_file );
				}

				$result = true;
			}
		}
		unlink( $tmp_name );

		return $result;
	}

	protected function sanitize_output() {
		remove_all_actions( 'template_redirect' );
		while ( ob_get_level() ) {
			ob_end_clean();
		}
	}
}
