<?php
require_once URLSLAB_PLUGIN_DIR . '/includes/cron/class-urlslab-convert-images-cron.php';

class Urlslab_Convert_Avif_Images_Cron extends Urlslab_Convert_Images_Cron {

	public function is_format_supported() {
		return function_exists( 'imageavif' ) ||
			   (
				   extension_loaded( 'imagick' ) &&
				   count( Imagick::queryFormats( 'AVIF*' ) ) > 0 &&
				   get_option( Urlslab_Media_Offloader_Widget::SETTING_NAME_USE_AVIF_ALTERNATIVE, false )
			   );
	}

	protected function get_file_types(): array {
		return get_option( Urlslab_Media_Offloader_Widget::SETTING_NAME_AVIF_TYPES_TO_CONVERT, Urlslab_Media_Offloader_Widget::SETTING_DEFAULT_AVIF_TYPES_TO_CONVERT );
	}

	protected function convert_next_file() {
		global $wpdb;

		$values = $this->get_file_types();

		if ( empty( $values ) ) {
			return false;
		}

		$placeholders = implode( ',', array_fill( 0, count( $values ), '%s' ) );
		array_unshift( $values, Urlslab_Driver::STATUS_ACTIVE );

		$file_row = $wpdb->get_row(
			$wpdb->prepare(
				'SELECT 
    					 f.*, 
    					 p.filehash as p_filehash,
       					 p.filesize as p_filesize,
       					 p.filetype as filetype,
       					 p.width as width,
       					 p.driver AS driver,
       					 p.webp_hash AS webp_hash,
       					 p.avif_hash AS avif_hash,
       					 p.webp_filesize AS webp_filesize,
       					 p.avif_filesize AS avif_filesize 
						FROM ' . URLSLAB_FILES_TABLE . ' f LEFT JOIN ' . URLSLAB_FILE_POINTERS_TABLE . " p ON f.filehash=p.hasid AND f.filesize=p.filesize WHERE f.filestatus = %s AND (f.avif_fileid = null OR f.avif_fileid = '') AND f.filetype IN (" . $placeholders . ') LIMIT 1', // phpcs:ignore
				$values
			),
			ARRAY_A
		);

		if ( empty( $file_row ) ) {
			return false;   //No rows to process
		}

		$file = new Urlslab_File_Data( $file_row );
		if ( ! empty( $file->get_avif_fileid() ) ) {
			//This file is already processing, disabled or processed -> continue to next file
			return true;
		}

		//update status to processing (lock file)
		$wpdb->update(
			URLSLAB_FILES_TABLE,
			array(
				'avif_fileid' => Urlslab_File_Data::ALTERNATIVE_PROCESSING,
			),
			array(
				'fileid' => $file->get_fileid(),
			)
		);

		if ( ! Urlslab_Driver::get_driver( $file )->is_connected() ) {
			//NOT connected, continue with next file
			return true;
		}


		//create local image file
		$original_image_filename = wp_tempnam();
		if ( Urlslab_Driver::get_driver( $file->get_file_pointer()->get_driver() )->save_to_file( $file, $original_image_filename ) ) {

			$new_file_name = $this->convert_image_format( $file, $original_image_filename, 'avif' );
			unlink( $original_image_filename );

			if ( empty( $new_file_name ) || ! file_exists( $new_file_name ) ) {
				$wpdb->update(
					URLSLAB_FILES_TABLE,
					array(
						'avif_fileid' => Urlslab_File_Data::ALTERNATIVE_DISABLED,
					),
					array(
						'fileid' => $file->get_fileid(),
					)
				);

				return true;
			}

			$avif_file = $this->process_file( $file, $new_file_name );

			if ( $avif_file ) {
				$data = array(
					'avif_fileid' => $avif_file->get_fileid(),
				);
			} else {
				$data = array(
					'avif_fileid' => Urlslab_File_Data::ALTERNATIVE_ERROR,
				);
			}
			//processing of file done
			$wpdb->update(
				URLSLAB_FILES_TABLE,
				$data,
				array(
					'fileid' => $file->get_fileid(),
				)
			);
		}

		return true;
	}

	protected function process_file( Urlslab_File_Data $file, string $new_file_name ): ?Urlslab_File_Data {
		global $wpdb;

		$avif_file = new Urlslab_File_Data(
			array(
				'url'         => $file->get_url( '.avif' ),
				'parent_url'  => $file->get_parent_url(),
				'filename'    => $file->get_filename() . '.avif',
				'filesize'    => filesize( $new_file_name ),
				'filetype'    => 'image/avif',
				'width'       => $file->get_width(),
				'height'      => $file->get_height(),
				'filestatus'  => Urlslab_Driver::STATUS_PENDING,
				'local_file'  => $new_file_name,
				'webp_fileid' => Urlslab_File_Data::ALTERNATIVE_DISABLED,
				'avif_fileid' => Urlslab_File_Data::ALTERNATIVE_DISABLED,
			)
		);

		if ( ! (
			$this->insert_alternative_file( $avif_file ) &&
			Urlslab_Driver::get_driver( $avif_file->get_file_pointer()->get_driver() )->upload_content( $avif_file )
		)
		) {
			unlink( $new_file_name );

			return false;
		}
		$wpdb->update(
			URLSLAB_FILES_TABLE,
			array(
				'filestatus' => Urlslab_Driver::STATUS_ACTIVE,
			),
			array(
				'fileid' => $avif_file->get_fileid(),
			)
		);
		unlink( $new_file_name );

		return $avif_file;
	}
}
