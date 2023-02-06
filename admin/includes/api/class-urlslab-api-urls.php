<?php

class Urlslab_Api_Urls extends Urlslab_Api_Table {
	public function register_routes() {
		$base = '/url';

		register_rest_route(
			self::NAMESPACE,
			$base . '/',
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_items' ),
					'args'                => $this->get_table_arguments(
						array(
							'filter_urlMd5'             => array(
								'required'          => false,
								'validate_callback' => function( $param ) {
									return is_numeric( $param );
								},
							),
							'filter_urlName'            => array(
								'required'          => false,
								'validate_callback' => function( $param ) {
									return 1024 >= strlen( $param );
								},
							),
							'filter_status'             => array(
								'required'          => false,
								'validate_callback' => function( $param ) {
									switch ( $param ) {
										case Urlslab_Driver::STATUS_ERROR:
										case Urlslab_Driver::STATUS_NEW:
										case Urlslab_Driver::STATUS_PENDING:
										case Urlslab_Driver::STATUS_ACTIVE:
											return true;
										default:
											return false;
									}
								},
							),
							'filter_domainId'           => array(
								'required'          => false,
								'validate_callback' => function( $param ) {
									return 32 >= strlen( $param );
								},
							),
							'filter_urlId'              => array(
								'required'          => false,
								'validate_callback' => function( $param ) {
									return 32 >= strlen( $param );
								},
							),
							'filter_screenshotDate'     => array(
								'required'          => false,
								'validate_callback' => function( $param ) {
									return is_numeric( $param );
								},
							),
							'filter_updateStatusDate'   => array(
								'required'          => false,
								'validate_callback' => function( $param ) {
									return 32 >= strlen( $param );
								},
							),
							'filter_urlTitle'           => array(
								'required'          => false,
								'validate_callback' => function( $param ) {
									return is_string( $param );
								},
							),
							'filter_urlMetaDescription' => array(
								'required'          => false,
								'validate_callback' => function( $param ) {
									return is_string( $param );
								},
							),
							'filter_urlSummary'         => array(
								'required'          => false,
								'validate_callback' => function( $param ) {
									return is_string( $param );
								},
							),
							'filter_visibility'         => array(
								'required'          => false,
								'validate_callback' => function( $param ) {
									switch ( $param ) {
										case Urlslab_Url_Data::VISIBILITY_VISIBLE:
										case Urlslab_Url_Data::VISIBILITY_HIDDEN:
											return true;
										default:
											return false;
									}

									return 32 >= strlen( $param );
								},
							),
							'filter_urlCheckDate'       => array(
								'required'          => false,
								'validate_callback' => function( $param ) {
									return 32 >= strlen( $param );
								},
							),
						)
					),
					'permission_callback' => array( $this, 'get_items_permissions_check' ),
				),
			)
		);

		register_rest_route(
			self::NAMESPACE,
			$base . '/(?P<urlMd5>[0-9]+)',
			array(
				array(
					'methods'             => WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'update_item' ),
					'permission_callback' => array( $this, 'update_item_permissions_check' ),
					'args'                => array(
						'status'             => array(
							'required'          => false,
							'validate_callback' => function( $param ) {
								switch ( $param ) {
									case Urlslab_Driver::STATUS_ERROR:
									case Urlslab_Driver::STATUS_NEW:
									case Urlslab_Driver::STATUS_PENDING:
									case Urlslab_Driver::STATUS_ACTIVE:
										return true;
									default:
										return false;
								}
							},
						),
						'visibility'         => array(
							'required'          => false,
							'validate_callback' => function( $param ) {
								switch ( $param ) {
									case Urlslab_Url_Data::VISIBILITY_VISIBLE:
									case Urlslab_Url_Data::VISIBILITY_HIDDEN:
										return true;
									default:
										return false;
								}
							},
						),
						'urlTitle'           => array(
							'required'          => false,
							'validate_callback' => function( $param ) {
								return is_string( $param );
							},
						),
						'urlMetaDescription' => array(
							'required'          => false,
							'validate_callback' => function( $param ) {
								return is_string( $param );
							},
						),
						'urlSummary'         => array(
							'required'          => false,
							'validate_callback' => function( $param ) {
								return is_string( $param );
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
					'callback'            => array( $this, 'detele_all_items' ),
					'permission_callback' => array( $this, 'delete_item_permissions_check' ),
					'args'                => array(),
				),
			)
		);

		register_rest_route(
			self::NAMESPACE,
			$base . '/(?P<urlMd5>[0-9]+)',
			array(
				array(
					'methods'             => WP_REST_Server::DELETABLE,
					'callback'            => array( $this, 'detele_item' ),
					'permission_callback' => array( $this, 'delete_item_permissions_check' ),
					'args'                => array(),
				),
			)
		);

		register_rest_route(
			self::NAMESPACE,
			$base . '/(?P<destUrlMd5>[0-9]+)/linked-from',
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_url_usage' ),
					'args'                => array(
						'rows_per_page' => array(
							'required'          => true,
							'default'           => self::ROWS_PER_PAGE,
							'validate_callback' => function( $param ) {
								return is_numeric( $param ) && 0 < $param && 200 > $param;
							},
						),
						'from_urlMd5'   => array(
							'required'          => false,
							'validate_callback' => function( $param ) {
								return is_numeric( $param );
							},
						),
					),
					'permission_callback' => array( $this, 'get_items_permissions_check' ),
				),
			)
		);
		register_rest_route(
			self::NAMESPACE,
			$base . '/(?P<srcUrlMd5>[0-9]+)/links',
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_url_usage' ),
					'args'                => array(
						'rows_per_page' => array(
							'required'          => true,
							'default'           => self::ROWS_PER_PAGE,
							'validate_callback' => function( $param ) {
								return is_numeric( $param ) && 0 < $param && 200 > $param;
							},
						),
						'from_urlMd5'   => array(
							'required'          => false,
							'validate_callback' => function( $param ) {
								return is_numeric( $param );
							},
						),
					),
					'permission_callback' => array( $this, 'get_items_permissions_check' ),
				),
			)
		);
	}


	public function get_items( $request ) {
		$sql = new Urlslab_Api_Table_Sql( $request );
		$sql->add_select_column( '*', 'u' );
		$sql->add_select_column( 'SUM(!ISNULL(m_used.srcUrlMd5))', false, 'url_usage_count' );
		$sql->add_select_column( 'SUM(!ISNULL(m_links.destUrlMd5))', false, 'url_links_count' );
		$sql->add_from(
			URLSLAB_URLS_TABLE . ' u LEFT JOIN ' . URLSLAB_URLS_MAP_TABLE . ' m_used ON u.urlMd5 = m_used.destUrlMd5' .
			' LEFT JOIN ' . URLSLAB_URLS_MAP_TABLE . ' m_links ON u.urlMd5 = m_links.srcUrlMd5'
		);

		$this->add_filter_table_fields( $sql );

		$sql->add_filter( 'filter_urlMd5' );
		$sql->add_filter( 'filter_urlName', '%s', 'LIKE' );
		$sql->add_filter( 'filter_status' );
		$sql->add_filter( 'filter_domainId' );
		$sql->add_filter( 'filter_urlId' );
		$sql->add_filter( 'filter_screenshotDate', '%d' );
		$sql->add_filter( 'filter_updateStatusDate' );
		$sql->add_filter( 'filter_urlTitle', '%s', 'LIKE' );
		$sql->add_filter( 'filter_urlMetaDescription', '%s', 'LIKE' );
		$sql->add_filter( 'filter_urlSummary', '%s', 'LIKE' );
		$sql->add_filter( 'filter_visibility' );
		$sql->add_filter( 'filter_urlCheckDate' );
		$sql->add_having_filter( 'filter_url_usage_count', '%d' );
		$sql->add_having_filter( 'filter_url_links_count', '%d' );

		$sql->add_group_by( 'urlMd5', 'u' );

		if ( $request->get_param( 'sort_column' ) ) {
			$sql->add_order( $request->get_param( 'sort_column' ), $request->get_param( 'sort_direction' ) );
		}
		$sql->add_order( 'u.urlMd5' );

		$rows = $sql->get_results();

		if ( ! is_array( $rows ) ) {
			return new WP_Error( 'error', __( 'Failed to get items', 'urlslab' ), array( 'status' => 500 ) );
		}

		foreach ( $rows as $row ) {
			$row->url_usage_count = (int) $row->url_usage_count; // phpcs:ignore
			$row->url_links_count = (int) $row->url_links_count; // phpcs:ignore
			$row->screenshotDate  = (int) $row->screenshotDate; // phpcs:ignore
			$row->urlMd5          = (int) $row->urlMd5; // phpcs:ignore
		}

		return new WP_REST_Response( $rows, 200 );
	}

	public function get_url_usage( $request ) {
		$sql = new Urlslab_Api_Table_Sql( $request );
		$sql->add_select_column( 'srcUrlMd5' );
		$sql->add_select_column( 'destUrlMd5' );
		$sql->add_select_column( 'urlName', 'u_src', 'srcUrlName' );
		$sql->add_select_column( 'urlName', 'u_dest', 'destUrlName' );
		$sql->add_from( URLSLAB_URLS_MAP_TABLE . ' m LEFT JOIN ' . URLSLAB_URLS_TABLE . ' u_src ON m.srcUrlMd5 = u_src.urlMd5 LEFT JOIN ' . URLSLAB_URLS_TABLE . ' u_dest ON m.destUrlMd5 = u_dest.urlMd5' ); // phpcs:ignore
		$sql->add_filter( 'destUrlMd5' );
		$sql->add_filter( 'srcUrlMd5' );
		$sql->add_filter( 'from_destUrlMd5', '%d' );
		$sql->add_filter( 'from_srcUrlMd5', '%d' );
		$sql->add_order( 'srcUrlMd5' );
		$sql->add_order( 'destUrlMd5' );
		$rows = $sql->get_results();
		if ( ! is_array( $rows ) ) {
			return new WP_Error( 'error', __( 'Failed to get items', 'urlslab' ), array( 'status' => 500 ) );
		}

		foreach ( $rows as $row ) {
			$row->srcUrlMd5  = (int) $row->srcUrlMd5; // phpcs:ignore
			$row->destUrlMd5 = (int) $row->destUrlMd5; // phpcs:ignore
		}

		return new WP_REST_Response( $rows, 200 );
	}

	public function delete_item( $request ) {
		global $wpdb;

		$delete_params           = array();
		$delete_params['urlMd5'] = $request->get_param( 'urlMd5' );

		if ( false === $wpdb->delete( URLSLAB_URLS_TABLE, $delete_params ) ) {
			return new WP_Error( 'error', __( 'Failed to delete', 'urlslab' ), array( 'status' => 500 ) );
		}
		if ( false === $wpdb->delete( URLSLAB_FILE_URLS_TABLE, $delete_params ) ) {
			return new WP_Error( 'error', __( 'Failed to delete', 'urlslab' ), array( 'status' => 500 ) );
		}
		if ( false === $wpdb->delete( URLSLAB_KEYWORDS_MAP_TABLE, $delete_params ) ) {
			return new WP_Error( 'error', __( 'Failed to delete', 'urlslab' ), array( 'status' => 500 ) );
		}

		$delete_params              = array();
		$delete_params['srcUrlMd5'] = $request->get_param( 'urlMd5' );
		if ( false === $wpdb->delete( URLSLAB_URLS_MAP_TABLE, $delete_params ) ) {
			return new WP_Error( 'error', __( 'Failed to delete', 'urlslab' ), array( 'status' => 500 ) );
		}
		if ( false === $wpdb->delete( URLSLAB_RELATED_RESOURCE_TABLE, $delete_params ) ) {
			return new WP_Error( 'error', __( 'Failed to delete', 'urlslab' ), array( 'status' => 500 ) );
		}

		$delete_params               = array();
		$delete_params['destUrlMd5'] = $request->get_param( 'urlMd5' );
		if ( false === $wpdb->delete( URLSLAB_URLS_MAP_TABLE, $delete_params ) ) {
			return new WP_Error( 'error', __( 'Failed to delete', 'urlslab' ), array( 'status' => 500 ) );
		}
		if ( false === $wpdb->delete( URLSLAB_RELATED_RESOURCE_TABLE, $delete_params ) ) {
			return new WP_Error( 'error', __( 'Failed to delete', 'urlslab' ), array( 'status' => 500 ) );
		}

		return new WP_REST_Response( __( 'Deleted' ), 200 );
	}

	public function detele_all_items( $request ) {
		global $wpdb;

		if ( false === $wpdb->query( $wpdb->prepare( 'TRUNCATE ' . URLSLAB_URLS_TABLE ) ) ) { // phpcs:ignore
			return new WP_Error( 'error', __( 'Failed to delete', 'urlslab' ), array( 'status' => 500 ) );
		}

		if ( false === $wpdb->query( $wpdb->prepare( 'TRUNCATE ' . URLSLAB_URLS_MAP_TABLE ) ) ) { // phpcs:ignore
			return new WP_Error( 'error', __( 'Failed to delete', 'urlslab' ), array( 'status' => 500 ) );
		}

		return new WP_REST_Response( __( 'Deleted' ), 200 );
	}

	function get_row_object( $params = array() ): Urlslab_Data {
		return new Urlslab_Url_Row( $params );
	}

	function get_editable_columns(): array {
		return array( 'status', 'visibility', 'urlTitle', 'urlMetaDescription', 'urlSummary' );
	}
}