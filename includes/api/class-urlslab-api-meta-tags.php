<?php

class Urlslab_Api_Meta_Tags extends Urlslab_Api_Urls {

	public function __construct() {
		$this->base = '/metatag';
	}


	public function register_routes() {

		register_rest_route( self::NAMESPACE, $this->base . '/', $this->get_route_get_items() );
		register_rest_route( self::NAMESPACE, $this->base . '/count', $this->get_count_route( $this->get_route_get_items() ) );

		register_rest_route(
			self::NAMESPACE,
			$this->base . '/(?P<url_id>[0-9]+)',
			array(
				array(
					'methods'             => WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'update_item' ),
					'permission_callback' => array( $this, 'update_item_permissions_check' ),
					'args'                => array(
						'url_title'            => array(
							'required'          => false,
							'validate_callback' => function( $param ) {
								return is_string( $param );
							},
						),
						'url_meta_description' => array(
							'required'          => false,
							'validate_callback' => function( $param ) {
								return is_string( $param );
							},
						),
						'url_summary'          => array(
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
			$this->base . '/(?P<url_id>[0-9]+)',
			array(
				array(
					'methods'             => WP_REST_Server::DELETABLE,
					'callback'            => array( $this, 'delete_item' ),
					'permission_callback' => array( $this, 'delete_item_permissions_check' ),
					'args'                => array(),
				),
			)
		);

	}

	function get_editable_columns(): array {
		return array(
			'url_title',
			'url_meta_description',
			'url_summary',
		);
	}

	protected function get_items_sql( WP_REST_Request $request ): Urlslab_Api_Table_Sql {
		if ( ! $request->get_param( 'filter_scr_schedule' ) ) {
			$request->set_param(
				'filter_url_type',
				json_encode(
					(object) array(
						'op'  => '=',
						'val' => Urlslab_Url_Row::URL_TYPE_INTERNAL,
					)
				)
			);
		}

		return parent::get_items_sql( $request );
	}

	protected function get_custom_columns() {
		return array();
	}
}