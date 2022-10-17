<?php

if ( ! class_exists( 'WP_List_Table' ) ) {
	require_once( ABSPATH . 'wp-admin/includes/class-wp-list-table.php' );
}

class Urlslab_Offloader_Table extends WP_List_Table {

	private function transform( array $row ): Urlslab_File_Data {
		return new Urlslab_File_Data( $row );
	}

	/**
	 * @param string $search_key the searching key to search for
	 * @param string $status_filter the filter of files for status
	 * @param string $webp_filter the filter of files for status
	 * @param string $avif_filter the filter of files for status
	 * @param string $driver_filter the filter for file drivers
	 * @param int $limit the limit of the results
	 * @param int $offset the offset of results for pagination
	 *
	 * @return array
	 */
	private function get_offloading_files(
		string $search_key,
		string $status_filter,
		string $webp_filter,
		string $avif_filter,
		string $driver_filter,
		int $limit,
		int $offset ): array {
		global $wpdb;
		$table = URLSLAB_FILES_TABLE;
		$join_table = URLSLAB_FILE_URLS_TABLE;
		$values = array();

		/* -- Preparing your query -- */
		$query = "SELECT v.fileid AS fileid,
       					 v.url AS url,
       					 v.local_file AS local_file,
       					 v.filename AS filename,
       					 v.filesize AS filesize,
       					 v.width AS width,
       					 v.height AS height,
       					 v.filestatus AS filestatus,
       					 v.driver AS driver,
       					 v.last_seen AS last_seen,
       					 v.webp_alternative AS webp_alternative,
       					 v.avif_alternative AS avif_alternative,
       					 SUM(!ISNULL(d.urlMd5)) AS imageCountUsage
       FROM $table AS v LEFT JOIN $join_table AS d ON d.fileid = v.fileid";
		$where = '';

		/* -- Preparing the condition -- */

		if ( ! empty( $search_key ) ) {
			$where .= 'filename LIKE %s OR url LIKE %s';
			$values[] = '%' . $search_key . '%';
			$values[] = '%' . $search_key . '%';
		}

		if ( ! empty( $status_filter ) ) {
			if ( strlen( $where ) ) {
				$where .= ' AND ';
			}
			$where .= 'filestatus=%s';
			$values[] = $status_filter;
		}

		if ( ! empty( $webp_filter ) ) {
			if ( strlen( $where ) ) {
				$where .= ' AND ';
			}
			$where .= 'webp_alternative=%s';
			$values[] = $webp_filter;
		}
		if ( ! empty( $avif_filter ) ) {
			if ( strlen( $where ) ) {
				$where .= ' AND ';
			}
			$where .= 'avif_alternative=%s';
			$values[] = $avif_filter;
		}

		if ( ! empty( $driver_filter ) ) {
			if ( strlen( $where ) ) {
				$where .= ' AND ';
			}
			$where .= 'driver=%s';
			$values[] = $driver_filter;
		}

		if ( strlen( $where ) ) {
			$query .= ' WHERE ' . $where;
		}

		/* -- Ordering parameters -- */
		$query .= ' GROUP BY fileid';
		//Parameters that are going to be used to order the result
		$orderby = ( isset( $_GET['orderby'] ) ) ? esc_sql( $_GET['orderby'] ) : 'fileid';
		$order = ( isset( $_GET['order'] ) ) ? esc_sql( $_GET['order'] ) : 'ASC';
		if ( ! empty( $orderby ) && ! empty( $order ) ) {
			$query .= ' ORDER BY ' . $orderby . ' ' . $order; }

		/* -- Pagination parameters -- */
		$query .= ' LIMIT ' . $limit . ' OFFSET ' . $offset;
		$res = array();
		if ( empty( $values ) ) {
			$res = $wpdb->get_results(
				$query, // phpcs:ignore
				ARRAY_A
			);
		} else {
			$res = $wpdb->get_results(
				$wpdb->prepare(
					$query, // phpcs:ignore
					$values
				),
				ARRAY_A
			);
		}
		$query_res = array();
		foreach ( $res as $row ) {
			$query_res[] = $this->transform( $row );
		}
		return $query_res;
	}

	/**
	 * @return mixed count for pagination
	 */
	private function count_offloading_files( string $driver_filter = '', string $status = '', $webp_status = '', $avif_status = '' ) {
		global $wpdb;
		$table = URLSLAB_FILES_TABLE;

		if ( empty( $driver_filter ) && empty( $status ) ) {
			return $wpdb->get_row( "SELECT COUNT(*) AS cnt FROM $table", ARRAY_A )['cnt']; // phpcs:ignore
		} else {
			$query = "SELECT COUNT(*) AS cnt FROM $table ";
			$where = '';
			$values = array();
			if ( ! empty( $driver_filter ) ) {
				$where .= 'driver=%s';
				$values[] = $driver_filter;
			}

			if ( ! empty( $status ) ) {
				if ( strlen( $where ) ) {
					$where .= ' AND ';
				}
				$where .= 'filestatus=%s';
				$values[] = $status;
			}

			if ( ! empty( $webp_status ) ) {
				if ( strlen( $where ) ) {
					$where .= ' AND ';
				}
				$where .= 'webp_alternative=%s';
				$values[] = $webp_status;
			}

			if ( ! empty( $avif_status ) ) {
				if ( strlen( $where ) ) {
					$where .= ' AND ';
				}
				$where .= 'avif_alternative=%s';
				$values[] = $avif_status;
			}

			if ( strlen( $where ) ) {
				$query .= ' WHERE ' . $where;
			}

			return $wpdb->get_row(
				$wpdb->prepare( $query, $values ), // phpcs:ignore
				ARRAY_A
			)['cnt'];
		}

	}

	/**
	 * Define the columns that are going to be used in the table
	 * @return array $columns, the array of columns to use with the table
	 */
	function get_columns(): array {
		return array(
			'col_url' => 'Original Url',
			'col_generated_resource' => 'Offloaded Url',
			'col_local_file' => 'Local File',
			'col_filename' => 'File Name',
			'col_file_size' => 'File Size',
			'col_file_type' => 'File Type',
			'col_width' => 'Width',
			'col_height' => 'Height',
			'col_file_status' => 'File Status',
			'col_driver' => 'Driver',
			'col_last_seen' => 'Last Seen',
			'col_image_usage_count' => 'Image Usage Count',
		);
	}

	/**
	 * Render a column when no column specific method exists.
	 *
	 * @param Urlslab_File_Data $item
	 * @param string $column_name
	 *
	 * @return bool|int|string
	 */
	public function column_default( $item, $column_name ) {
		switch ( $column_name ) {
			case 'col_url':
				return sprintf(
					'<a target="_blank" href="%s">%s</a>',
					esc_url( $item->get_url() ),
					esc_url( $item->get_url() )
				);

			case 'col_generated_resource':
				if ( $item->get_filestatus() == Urlslab_Driver::STATUS_ACTIVE ) {
					$url = Urlslab_Driver::get_driver( $item )->get_url( $item );
					return sprintf(
						'<a href="%s" target="_blank">%s</a>',
						$url,
						$url
					);
				} else {
					return 'File not generated yet';
				}
			case 'col_local_file':
				return $this->local_file_to_html( $item->get_local_file(), $item->get_driver() );
			case 'col_filename':
				return sprintf(
					'<span title="%s">%s</span>',
					esc_attr( $item->get_filename() ),
					substr( $item->get_filename(), 0, 70 )
				);
			case 'col_file_size':
				return (int) $item->get_filesize() / 1000 . ' KB';
			case 'col_file_type':
				$value = $item->get_filetype();
				switch ( $item->get_webp_alternative() ) {
					case Urlslab_File_Data::FILE_ALTERNATIVE_AVAILABLE:
						$value .= '<br/>WEBP alternative';
						break;
					default:
				}
				switch ( $item->get_avif_alternative() ) {
					case Urlslab_File_Data::FILE_ALTERNATIVE_AVAILABLE:
						$value .= '<br/>AVIF alternative';
						break;
					default:
				}
				return $value;
			case 'col_width':
				return $item->get_width();
			case 'col_height':
				return $item->get_height();
			case 'col_file_status':
				return $this->status_to_html( $item->get_filestatus() );
			case 'col_driver':
				return $this->driver_to_html( $item->get_driver() );
			case 'col_last_seen':
				return $item->get_last_seen();
			default:
				return print_r( $item, true );
		}
	}

	/**
	 * Method for name column
	 *
	 * @param Urlslab_File_Data $item an array of DB data
	 *
	 * @return string
	 */
	function column_col_driver( $item ): string {

		// create a nonce
		$transfer_nonce = wp_create_nonce( 'urlslab_transfer_file' );

		$title = $this->driver_to_html( $item->get_driver() );

		$actions = array();
		if ( isset( $_REQUEST['page'] ) ) {
			$actions = array();
			$current_driver = $item->get_driver();


			switch ( $current_driver ) {
				case Urlslab_Driver::DRIVER_LOCAL_FILE:
					$actions = array(
						'transfer-to-s3' => sprintf(
							'<a href="?page=%s&s=%s&action=%s&file=%s&_wpnonce=%s">Transfer to S3</a>',
							esc_attr( $_REQUEST['page'] ),
							esc_html( $_REQUEST['s'] ?? '' ),
							'transfer-to-s3',
							esc_attr( $item->get_fileid() ),
							$transfer_nonce
						),
						'transfer-to-db' => sprintf(
							'<a href="?page=%s&s=%s&action=%s&file=%s&_wpnonce=%s">Transfer to DB</a>',
							esc_attr( $_REQUEST['page'] ),
							esc_html( $_REQUEST['s'] ?? '' ),
							'transfer-to-db',
							esc_attr( $item->get_fileid() ),
							$transfer_nonce
						),
					);
					break;

				case Urlslab_Driver::DRIVER_S3:
					$actions = array(
						'transfer-to-localfile' => sprintf(
							'<a href="?page=%s&s=%s&action=%s&file=%s&_wpnonce=%s">Transfer to Local file</a>',
							esc_attr( $_REQUEST['page'] ),
							esc_html( $_REQUEST['s'] ?? '' ),
							'transfer-to-localfile',
							esc_attr( $item->get_fileid() ),
							$transfer_nonce
						),
						'transfer-to-db' => sprintf(
							'<a href="?page=%s&s=%s&action=%s&file=%s&_wpnonce=%s">Transfer to DB</a>',
							esc_attr( $_REQUEST['page'] ),
							esc_html( $_REQUEST['s'] ?? '' ),
							'transfer-to-db',
							esc_attr( $item->get_fileid() ),
							$transfer_nonce
						),
					);
					break;

				case Urlslab_Driver::DRIVER_DB:
					$actions = array(
						'transfer-to-localfile' => sprintf(
							'<a href="?page=%s&s=%s&action=%s&file=%s&_wpnonce=%s">Transfer to Local file</a>',
							esc_attr( $_REQUEST['page'] ),
							esc_html( $_REQUEST['s'] ?? '' ),
							'transfer-to-localfile',
							esc_attr( $item->get_fileid() ),
							$transfer_nonce
						),
						'transfer-to-s3' => sprintf(
							'<a href="?page=%s&s=%s&action=%s&file=%s&_wpnonce=%s">Transfer to S3</a>',
							esc_attr( $_REQUEST['page'] ),
							esc_html( $_REQUEST['s'] ?? '' ),
							'transfer-to-s3',
							esc_attr( $item->get_fileid() ),
							$transfer_nonce
						),
					);
					break;

			}
		}

		return $title . $this->row_actions( $actions );
	}

	/**
	 * Method for name column
	 *
	 * @param Urlslab_File_Data $item an array of DB data
	 *
	 * @return string
	 */
	public function column_col_image_usage_count( $item ) {
		$title = sprintf(
			'<span>%s</span>',
			$item->get_image_usage_count(),
		);

		$actions = array();
		if ( isset( $_REQUEST['page'] ) ) {
			$actions = array(
				'mediaUsage' => sprintf(
					'<span class="media-usage-show urlslab-ajax-show" data-file-id="%s">Media Usage</span>',
					esc_attr( $item->get_fileid() ),
				),
			);
		}

		return $title . $this->row_actions( $actions );
	}

	/**
	 * Decide which columns to activate the sorting functionality on
	 * @return array $sortable, the array of columns that can be sorted by the user
	 */
	public function get_sortable_columns(): array {
		return array(
			'col_file_size' => 'filesize',
			'col_image_usage_count' => 'imageCountUsage',
		);
	}

	protected function get_views() {
		$views = array();
		$current_status = ( ! empty( $_REQUEST['status_filter'] ) ? $_REQUEST['status_filter'] : '' );
		$current_webp = ( ! empty( $_REQUEST['webp_filter'] ) ? $_REQUEST['webp_filter'] : '' );
		$current_avif = ( ! empty( $_REQUEST['avif_filter'] ) ? $_REQUEST['avif_filter'] : '' );
		$current_driver = ( ! empty( $_REQUEST['driver_filter'] ) ? $_REQUEST['driver_filter'] : '' );

		//# All case
		$class = ( '' == $current_status && '' == $current_driver ? ' class="current"' : '' );
		$all_url = remove_query_arg( 'status_filter' );
		$all_url = remove_query_arg( 'driver_filter', $all_url );
		$all_count = $this->count_offloading_files();
		$views['all'] = "<a href='$all_url' $class>All <span class='count'>($all_count)</span></a>";
		//# All case

		//# driver s3 case
		$class = ( Urlslab_Driver::DRIVER_S3 == $current_driver ? ' class="current"' : $current_status );
		$s3_driver_url = add_query_arg( 'driver_filter', Urlslab_Driver::DRIVER_S3 );
		$s3_driver_count = $this->count_offloading_files( Urlslab_Driver::DRIVER_S3, '' );
		$views['s3_driver'] = "<a href='$s3_driver_url' $class>S3 <span class='count'>($s3_driver_count)</span></a>";
		//# driver s3 case

		//# driver db case
		$class = ( Urlslab_Driver::DRIVER_DB == $current_driver ? ' class="current"' : '' );
		$db_driver_url = add_query_arg( 'driver_filter', Urlslab_Driver::DRIVER_DB );
		$db_driver_count = $this->count_offloading_files( Urlslab_Driver::DRIVER_DB, '' );
		$views['db_driver'] = "<a href='$db_driver_url' $class>Database <span class='count'>($db_driver_count)</span></a>";
		//# driver db case

		//# driver local file case
		$class = ( Urlslab_Driver::DRIVER_LOCAL_FILE == $current_driver ? ' class="current"' : '' );
		$local_driver_url = add_query_arg( 'driver_filter', Urlslab_Driver::DRIVER_LOCAL_FILE );
		$local_driver_count = $this->count_offloading_files( Urlslab_Driver::DRIVER_LOCAL_FILE, '' );
		$views['local_driver'] = "<a href='$local_driver_url' $class>Local File <span class='count'>($local_driver_count)</span></a>";
		//# driver local file case

		//# status pending case
		$class = ( Urlslab_Driver::STATUS_PENDING == $current_status ? ' class="current"' : '' );
		$pending_status_url = add_query_arg( 'status_filter', Urlslab_Driver::STATUS_PENDING );
		$pending_status_count = $this->count_offloading_files( '', Urlslab_Driver::STATUS_PENDING );
		$views['pending_status'] = "<a href='$pending_status_url' $class>Pending <span class='count'>($pending_status_count)</span></a>";
		//# status pending case

		//# status error case
		$class = ( Urlslab_Driver::STATUS_ERROR == $current_status ? ' class="current"' : '' );
		$error_status_url = add_query_arg( 'status_filter', Urlslab_Driver::STATUS_ERROR );
		$error_status_count = $this->count_offloading_files( '', Urlslab_Driver::STATUS_ERROR );
		$views['error_status'] = "<a href='$error_status_url' $class>Error <span class='count'>($error_status_count)</span></a>";
		//# status error case

		//# status active case
		$class = ( Urlslab_Driver::STATUS_ACTIVE == $current_status ? ' class="current"' : '' );
		$active_status_url = add_query_arg( 'status_filter', Urlslab_Driver::STATUS_ACTIVE );
		$active_status_count = $this->count_offloading_files( '', Urlslab_Driver::STATUS_ACTIVE );
		$views['active_status'] = "<a href='$active_status_url' $class>Active <span class='count'>($active_status_count)</span></a>";
		//# status active case

		//# status new case
		$class = ( Urlslab_Driver::STATUS_NEW == $current_status ? ' class="current"' : '' );
		$new_status_url = add_query_arg( 'status_filter', Urlslab_Driver::STATUS_NEW );
		$new_status_count = $this->count_offloading_files( '', Urlslab_Driver::STATUS_NEW );
		$views['new_status'] = "<a href='$new_status_url' $class>New <span class='count'>($new_status_count)</span></a>";
		//# status new case

		//# webp case
		$class = ( Urlslab_File_Data::FILE_ALTERNATIVE_AVAILABLE == $current_webp ? ' class="current"' : '' );
		$available_webp_url = add_query_arg( 'webp_filter', Urlslab_File_Data::FILE_ALTERNATIVE_AVAILABLE );
		$views['available_webp'] = "<a href='$available_webp_url' $class>WEBP available</a>";

		$class = ( Urlslab_File_Data::FILE_ALTERNATIVE_DISABLED == $current_webp ? ' class="current"' : '' );
		$disabled_webp_url = add_query_arg( 'webp_filter', Urlslab_File_Data::FILE_ALTERNATIVE_DISABLED );
		$views['disabled_webp'] = "<a href='$disabled_webp_url' $class>WEBP disabled</a>";

		//# avif case
		$class = ( Urlslab_File_Data::FILE_ALTERNATIVE_AVAILABLE == $current_avif ? ' class="current"' : '' );
		$available_avif_url = add_query_arg( 'avif_filter', Urlslab_File_Data::FILE_ALTERNATIVE_AVAILABLE );
		$views['available_avif'] = "<a href='$available_avif_url' $class>AVIF available</a>";

		$class = ( Urlslab_File_Data::FILE_ALTERNATIVE_DISABLED == $current_avif ? ' class="current"' : '' );
		$disabled_avif_url = add_query_arg( 'avif_filter', Urlslab_File_Data::FILE_ALTERNATIVE_DISABLED );
		$views['disabled_avif'] = "<a href='$disabled_avif_url' $class>AVIF disabled</a>";

		return $views;
	}

	/**
	 * Prepare the table with different parameters,
	 * pagination, columns and table elements
	 */
	function prepare_items() {

		$offloading_search_key = isset( $_REQUEST['s'] ) ? wp_unslash( trim( $_REQUEST['s'] ) ) : '';
		$file_status_filter = isset( $_REQUEST['status_filter'] ) ? wp_unslash( trim( $_REQUEST['status_filter'] ) ) : '';
		$webp_filter = isset( $_REQUEST['webp_filter'] ) ? wp_unslash( trim( $_REQUEST['webp_filter'] ) ) : '';
		$avif_filter = isset( $_REQUEST['avif_filter'] ) ? wp_unslash( trim( $_REQUEST['avif_filter'] ) ) : '';
		$file_driver_filter = isset( $_REQUEST['driver_filter'] ) ? wp_unslash( trim( $_REQUEST['driver_filter'] ) ) : '';

		$table_page = $this->get_pagenum();
		$items_per_page = $this->get_items_per_page( 'users_per_page' );

		$query_results = $this->get_offloading_files(
			$offloading_search_key,
			$file_status_filter,
			$webp_filter,
			$avif_filter,
			$file_driver_filter,
			$items_per_page,
			( $table_page - 1 ) * $items_per_page
		);
		$total_count = $this->count_offloading_files( $file_driver_filter, $file_status_filter, $webp_filter, $avif_filter );


		// set the pagination arguments
		$this->set_pagination_args(
			array(
				'total_items' => $total_count,
				'per_page'    => $items_per_page,
				'total_pages' => ceil( $total_count / $items_per_page ),
			)
		);

		$this->items = $query_results;
	}

	public function no_items() {
		echo 'No Media offloading available';
	}

	private function status_to_html( string $file_status ): string {
		switch ( $file_status ) {
			case Urlslab_Driver::STATUS_ACTIVE:
				return '<div class="status-circle background-success" title="available"></div>';

			case Urlslab_Driver::STATUS_NEW:
				return '<div class="status-circle background-secondary" title="not-scheduled"></div>';

			case Urlslab_Driver::STATUS_PENDING:
				return '<div class="status-circle background-warning" title="pending"></div>';

			case Urlslab_Driver::STATUS_ERROR:
				return '<div class="status-circle background-danger" title="blocked"></div>';

			default:
				return $file_status;
		}
	}

	private function driver_to_html( string $driver ): string {
		switch ( $driver ) {
			case Urlslab_Driver::DRIVER_LOCAL_FILE:
				return sprintf(
					'<img src="%s" title="%s" alt="%s" width="30px" height="30px">',
					plugin_dir_url( URLSLAB_PLUGIN_DIR . 'admin/assets/cloud.png' ) . 'folder-outline.png',
					'Local File Driver',
					'Local File Driver',
				);

			case Urlslab_Driver::DRIVER_DB:
				return sprintf(
					'<img src="%s" title="%s" alt="%s" width="30px" height="30px">',
					plugin_dir_url( URLSLAB_PLUGIN_DIR . 'admin/assets/cloud.png' ) . 'database.png',
					'Database Driver',
					'Database Driver',
				);

			case Urlslab_Driver::DRIVER_S3:
				return sprintf(
					'<img src="%s" title="%s" alt="%s" width="30px" height="30px">',
					plugin_dir_url( URLSLAB_PLUGIN_DIR . 'admin/assets/cloud.png' ) . 'cloud.png',
					'AWS S3 Driver',
					'AWS S3 Driver',
				);

			default:
				return $driver;
		}
	}

	private function local_file_to_html( string $local_file, string $driver ) {
		switch ( $driver ) {
			case Urlslab_Driver::DRIVER_DB:
			case Urlslab_Driver::DRIVER_S3:
				return sprintf(
					'<span title="%s">%s</span>',
					esc_attr( $local_file ),
					empty( $local_file ) ? 'asset not downloaded in file server' : 'asset downloaded in file server but not used'
				);

			case Urlslab_Driver::DRIVER_LOCAL_FILE:
				return sprintf(
					'<span title="%s">%s</span>',
					esc_attr( $local_file ),
					substr( $local_file, 0, 70 )
				);
		}
	}

}
