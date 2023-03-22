<?php

class Urlslab_Api_Files extends Urlslab_Api_Table {
	public function register_routes() {
		$base = '/file';

		register_rest_route( self::NAMESPACE, $base . '/', $this->get_route_get_items() );
		register_rest_route( self::NAMESPACE, $base . '/count', $this->get_count_route( $this->get_route_get_items() ) );

		register_rest_route(
			self::NAMESPACE,
			$base . '/(?P<fileid>[0-9a-zA-Z]+)',
			array(
				array(
					'methods'             => WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'update_item' ),
					'permission_callback' => array( $this, 'update_item_permissions_check' ),
					'args'                => array(
						'filestatus' => array(
							'required'          => false,
							'validate_callback' => function( $param ) {
								switch ( $param ) {
									case Urlslab_Driver::STATUS_NEW:
									case Urlslab_Driver::STATUS_ACTIVE:
									case Urlslab_Driver::STATUS_PENDING:
									case Urlslab_Driver::STATUS_ERROR:
										return true;
									default:
										return false;
								}
							},
						),
					),
				),
			)
		);

		register_rest_route(
			self::NAMESPACE,
			$base . '/delete-all',
			array(
				array(
					'methods'             => WP_REST_Server::DELETABLE,
					'callback'            => array( $this, 'delete_all_items' ),
					'permission_callback' => array( $this, 'delete_item_permissions_check' ),
					'args'                => array(),
				),
			)
		);

		register_rest_route(
			self::NAMESPACE,
			$base . '/(?P<fileid>[0-9a-zA-Z]+)',
			array(
				array(
					'methods'             => WP_REST_Server::DELETABLE,
					'callback'            => array( $this, 'delete_item' ),
					'permission_callback' => array( $this, 'delete_item_permissions_check' ),
					'args'                => array(),
				),
			)
		);

		register_rest_route( self::NAMESPACE, $base . '/(?P<fileid>[0-9a-zA-Z]+)/urls', $this->get_route_file_urls() );
		register_rest_route( self::NAMESPACE, $base . '/(?P<fileid>[0-9a-zA-Z]+)/urls/count', $this->get_count_route( $this->get_route_file_urls() ) );
	}


	public function get_items( $request ) {
		$rows = $this->get_items_sql( $request )->get_results();

		if ( ! is_array( $rows ) ) {
			return new WP_Error( 'error', __( 'Failed to get items', 'urlslab' ), array( 'status' => 400 ) );
		}

		foreach ( $rows as $row ) {
			$row->file_usage_count = (int) $row->file_usage_count;
			$row->filesize         = (int) $row->filesize;
			$row->width            = (int) $row->width;
			$row->height           = (int) $row->height;
			$row->avif_filesize    = (int) $row->avif_filesize;
			$row->webp_filesize    = (int) $row->webp_filesize;
		}

		return new WP_REST_Response( $rows, 200 );
	}

	public function get_file_urls( $request ) {
		$rows = $this->get_file_urls_sql( $request )->get_results();
		if ( ! is_array( $rows ) ) {
			return new WP_Error( 'error', __( 'Failed to get items', 'urlslab' ), array( 'status' => 400 ) );
		}
		foreach ( $rows as $row ) {
			$row->url_id = (int) $row->url_id;// phpcs:ignore
		}

		return new WP_REST_Response( $rows, 200 );
	}

	public function get_file_urls_count( $request ) {
		return new WP_REST_Response( $this->get_file_urls_sql( $request )->get_count(), 200 );
	}

	public function delete_item( $request ) {
		global $wpdb;

		$delete_params           = array();
		$delete_params['fileid'] = $request->get_param( 'fileid' );


		if ( false === $wpdb->delete( URLSLAB_FILES_TABLE, $delete_params ) ) {
			return new WP_Error( 'error', __( 'Failed to delete', 'urlslab' ), array( 'status' => 500 ) );
		}
		if ( false === $wpdb->delete( URLSLAB_FILE_URLS_TABLE, $delete_params ) ) {
			return new WP_Error( 'error', __( 'Failed to delete', 'urlslab' ), array( 'status' => 500 ) );
		}

		return new WP_REST_Response( __( 'Deleted' ), 200 );
	}

	public function delete_all_items( $request ) {
		global $wpdb;

		if ( false === $wpdb->query( $wpdb->prepare( 'TRUNCATE ' . URLSLAB_FILES_TABLE ) ) ) { // phpcs:ignore
			return new WP_Error( 'error', __( 'Failed to delete', 'urlslab' ), array( 'status' => 500 ) );
		}

		if ( false === $wpdb->query( $wpdb->prepare( 'TRUNCATE ' . URLSLAB_FILE_URLS_TABLE ) ) ) { // phpcs:ignore
			return new WP_Error( 'error', __( 'Failed to delete', 'urlslab' ), array( 'status' => 500 ) );
		}

		return new WP_REST_Response( __( 'Deleted' ), 200 );
	}

	function get_row_object( $params = array() ): Urlslab_Data {
		return new Urlslab_File_Row( $params );
	}

	function get_editable_columns(): array {
		return array( 'filestatus' );
	}

	/**
	 * @return array[]
	 */
	public function get_route_get_items(): array {
		return array(
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_items' ),
				'args'                => $this->get_table_arguments(
					array(
						'filter_fileid'           => array(
							'required'          => false,
							'validate_callback' => function( $param ) {
								return Urlslab_Api_Table::validate_string_filter_value( $param );
							},
						),
						'filter_url'              => array(
							'required'          => false,
							'validate_callback' => function( $param ) {
								return Urlslab_Api_Table::validate_string_filter_value( $param );
							},
						),
						'filter_parent_url'       => array(
							'required'          => false,
							'validate_callback' => function( $param ) {
								return Urlslab_Api_Table::validate_string_filter_value( $param );
							},
						),
						'filter_local_file'       => array(
							'required'          => false,
							'validate_callback' => function( $param ) {
								return Urlslab_Api_Table::validate_string_filter_value( $param );
							},
						),
						'filter_filename'         => array(
							'required'          => false,
							'validate_callback' => function( $param ) {
								return Urlslab_Api_Table::validate_string_filter_value( $param );
							},
						),
						'filter_filetype'         => array(
							'required'          => false,
							'validate_callback' => function( $param ) {
								return Urlslab_Api_Table::validate_string_filter_value( $param );
							},
						),
						'filter_filestatus'       => array(
							'required'          => false,
							'validate_callback' => function( $param ) {
								return Urlslab_Api_Table::validate_string_filter_value( $param );
							},
						),
						'filter_filehash'         => array(
							'required'          => false,
							'validate_callback' => function( $param ) {
								return Urlslab_Api_Table::validate_string_filter_value( $param );
							},
						),
						'filter_filesize'         => array(
							'required'          => false,
							'validate_callback' => function( $param ) {
								return Urlslab_Api_Table::validate_numeric_filter_value( $param );
							},
						),
						'filter_webp_fileid'      => array(
							'required'          => false,
							'validate_callback' => function( $param ) {
								return Urlslab_Api_Table::validate_string_filter_value( $param );
							},
						),
						'filter_avif_fileid'      => array(
							'required'          => false,
							'validate_callback' => function( $param ) {
								return Urlslab_Api_Table::validate_string_filter_value( $param );
							},
						),
						'filter_file_usage_count' => array(
							'required'          => false,
							'validate_callback' => function( $param ) {
								return Urlslab_Api_Table::validate_numeric_filter_value( $param );
							},
						),
					)
				),
				'permission_callback' => array( $this, 'get_items_permissions_check' ),
			),
		);
	}

	/**
	 * @param WP_REST_Request $request
	 *
	 * @return Urlslab_Api_Table_Sql
	 */
	protected function get_items_sql( WP_REST_Request $request ): Urlslab_Api_Table_Sql {
		$sql = new Urlslab_Api_Table_Sql( $request );

		$file_obj = new Urlslab_File_Row();
		foreach ( array_keys( $file_obj->get_columns() ) as $column ) {
			$sql->add_select_column( $column, 'f' );
		}

		$fil_pointer_obj = new Urlslab_File_Pointer_Row();
		foreach ( array_keys( $fil_pointer_obj->get_columns() ) as $column ) {
			switch ( $column ) {
				case 'filehash':
				case 'filesize':
					break;
				default:
					$sql->add_select_column( $column, 'p' );
			}
		}

		$sql->add_select_column( 'SUM(!ISNULL(m.url_id))', false, 'file_usage_count' );
		$sql->add_from(
			URLSLAB_FILES_TABLE . ' f' . ' LEFT JOIN ' . URLSLAB_FILE_URLS_TABLE . ' m ON m.fileid = f.fileid' .
			' LEFT JOIN ' . URLSLAB_FILE_POINTERS_TABLE . ' p ON p.filehash = f.filehash and p.filesize=f.filesize'
		);

		$this->add_filter_table_fields( $sql, 'f' );

		$sql->add_filter( 'filter_fileid' );
		$sql->add_filter( 'filter_url' );
		$sql->add_filter( 'filter_parent_url' );
		$sql->add_filter( 'filter_local_file' );
		$sql->add_filter( 'filter_filename' );
		$sql->add_filter( 'filter_filetype' );
		$sql->add_filter( 'filter_filestatus' );
		$sql->add_filter( 'filter_filehash' );
		$sql->add_filter( 'filter_filesize', '%d' );
		$sql->add_filter( 'filter_webp_fileid' );
		$sql->add_filter( 'filter_avif_fileid' );
		$sql->add_having_filter( 'filter_file_usage_count', '%d' );

		$sql->add_group_by( 'fileid', 'f' );

		if ( $request->get_param( 'sort_column' ) ) {
			$sql->add_order( $request->get_param( 'sort_column' ), $request->get_param( 'sort_direction' ) );
		}
		$sql->add_order( 'fileid' );

		return $sql;
	}

	/**
	 * @param $request
	 *
	 * @return Urlslab_Api_Table_Sql
	 */
	public function get_file_urls_sql( $request ): Urlslab_Api_Table_Sql {
		$sql = new Urlslab_Api_Table_Sql( $request );
		$sql->add_select_column( 'url_id', 'm' );
		$sql->add_select_column( 'url_name', 'u' );
		$sql->add_from( URLSLAB_FILE_URLS_TABLE . ' m LEFT JOIN ' . URLSLAB_URLS_TABLE . ' u ON (m.url_id = u.url_id)' );
		$sql->add_filter( 'fileid' );
		$sql->add_filter( 'from_url_id', '%d', 'm' );
		$sql->add_order( 'url_id', 'ASC', 'm' );

		return $sql;
	}

	/**
	 * @return array[]
	 */
	public function get_route_file_urls(): array {
		return array(
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_file_urls' ),
				'args'                => array(
					'rows_per_page' => array(
						'required'          => true,
						'default'           => self::ROWS_PER_PAGE,
						'validate_callback' => function( $param ) {
							return is_numeric( $param ) && 0 < $param && 200 > $param;
						},
					),
					'from_url_id'   => array(
						'required'          => false,
						'validate_callback' => function( $param ) {
							return is_numeric( $param );
						},
					),
				),
				'permission_callback' => array( $this, 'get_items_permissions_check' ),
			),
		);
	}


}