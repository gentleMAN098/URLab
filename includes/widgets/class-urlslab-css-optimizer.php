<?php

// phpcs:disable WordPress
require_once URLSLAB_PLUGIN_DIR . '/includes/services/class-urlslab-css-cache-row.php';

class Urlslab_CSS_Optimizer extends Urlslab_Widget {

	const SLUG = 'urlslab-css-optimizer';

	private string $widget_slug;
	private string $widget_title;
	private string $widget_description;
	private string $landing_page_link;
	private Urlslab_Admin_Page $parent_page;

	const SETTING_NAME_CSS_MAX_SIZE = 'urlslab_css_max_size';
	const DEFAULT_CSS_MAX_SIZE = 100000;

	const SETTING_NAME_CSS_CACHE_TTL = 'urlslab_css_ttl';
	const DEFAULT_CSS_CACHE_TTL = 604800;


	public function __construct() {
		$this->widget_slug        = self::SLUG;
		$this->widget_title       = __( 'CSS Optimizer' );
		$this->widget_description = __( 'Optimizes speed of CSS loading into page' );
		$this->landing_page_link  = 'https://www.urlslab.com';
		$this->parent_page        = Urlslab_Page_Factory::get_instance()->get_page( 'urlslab-header-seo' );
	}

	public function init_widget() {
		Urlslab_Loader::get_instance()->add_action( 'urlslab_content', $this, 'theContentHook', 100 );
		Urlslab_Loader::get_instance()->add_action( 'urlslab_head_content', $this, 'theContentHook' );
	}


	/**
	 * @return string
	 */
	public function get_widget_slug(): string {
		return $this->widget_slug;
	}

	/**
	 * @return string
	 */
	public function get_widget_title(): string {
		return $this->widget_title;
	}

	/**
	 * @return string
	 */
	public function get_widget_description(): string {
		return $this->widget_description;
	}

	/**
	 * @return string
	 */
	public function get_landing_page_link(): string {
		return $this->landing_page_link;
	}

	public function theContentHook( DOMDocument $document ) {
		try {
			$xpath     = new DOMXPath( $document );
			$css_links = $xpath->query( "//link[@rel='stylesheet' and (@type='text/css' or not(@type)) and @href ]" );
			$links     = array();
			foreach ( $css_links as $link_object ) {
				if ( ! isset( $links[ $link_object->getAttribute( 'href' ) ] ) ) {
					$url = new Urlslab_Url( $link_object->getAttribute( 'href' ) );
					if ( $url->is_same_domain_url() ) {
						$links[ $link_object->getAttribute( 'href' ) ] = $url->get_url_id();
					}
				}
			}

			$css_files = Urlslab_CSS_Cache_Row::get_css_files( $links );

			$remove_elements = array();
			foreach ( $css_links as $link_object ) {
				if ( isset( $links[ $link_object->getAttribute( 'href' ) ] ) && isset( $css_files[ $links[ $link_object->getAttribute( 'href' ) ] ] ) ) {
					$css_object = $css_files[ $links[ $link_object->getAttribute( 'href' ) ] ];
					if ( $css_object->get( 'status' ) == Urlslab_CSS_Cache_Row::STATUS_ACTIVE && $this->get_option( self::SETTING_NAME_CSS_MAX_SIZE ) > $css_object->get( 'filesize' ) ) {
						$new_elm = $document->createElement( 'style', $css_files[ $links[ $link_object->getAttribute( 'href' ) ] ]->get( 'css_content' ) );
						$new_elm->setAttribute( 'type', 'text/css' );
						if ( $link_object->hasAttribute( 'media' ) ) {
							$new_elm->setAttribute( 'media', $link_object->getAttribute( 'media' ) );
						}
						if ( $link_object->hasAttribute( 'id' ) ) {
							$new_elm->setAttribute( 'id', $link_object->getAttribute( 'id' ) );
						}
						$link_object->setAttribute( 'urlslab-old', 'should-remove' );
						$new_elm->setAttribute( 'urlslab-css', '1' );
						$link_object->parentNode->insertBefore( $new_elm, $link_object );
						$remove_elements[] = $link_object;
					}
				}
			}
			foreach ( $remove_elements as $element ) {
				$element->parentNode->removeChild( $element );
			}

			$this->insert_missing_css_files( $links, $css_files );
		} catch ( Exception $e ) {
		}
	}

	public function get_shortcode_content( $atts = array(), $content = null, $tag = '' ): string {
		return '';
	}

	public function has_shortcode(): bool {
		return false;
	}

	public function render_widget_overview() {}

	public function get_thumbnail_demo_url(): string {
		return plugin_dir_url( URLSLAB_PLUGIN_DIR . '/admin/assets/demo/css-optimizer-demo.png' ) . 'css-optimizer-demo.png';
	}

	public function get_parent_page(): Urlslab_Admin_Page {
		return $this->parent_page;
	}

	public function get_widget_tab(): string {
		return 'meta-tags';
	}

	public static function update_settings( array $new_settings ) {}

	public function is_api_key_required() {
		return false;
	}

	private function insert_missing_css_files( array $links, array $css_files ) {
		$placeholders = array();
		$values       = array();
		$now          = Urlslab_Data::get_now();
		foreach ( $links as $url => $urld_id ) {
			if ( ! isset( $css_files[ $urld_id ] ) ) {
				$placeholders[] = '(%d,%s,%s,%s)';
				array_push(
					$values,
					$urld_id,
					$url,
					Urlslab_CSS_Cache_Row::STATUS_NEW,
					$now
				);
			}
		}
		if ( ! empty( $values ) ) {
			global $wpdb;
			$query = 'INSERT IGNORE INTO ' . URLSLAB_CSS_CACHE_TABLE . ' (url_id,url,status,status_changed) VALUES ' . implode( ', ', $placeholders );
			$wpdb->query( $wpdb->prepare( $query, $values ) ); // phpcs:ignore
		}
	}

	protected function add_options() {
		$this->add_option_definition(
			self::SETTING_NAME_CSS_MAX_SIZE,
			self::DEFAULT_CSS_MAX_SIZE,
			true,
			__( 'CSS Max Size (bytes)' ),
			__( 'Include into HTML CSS files smaller as defined limit' ),
			self::OPTION_TYPE_NUMBER,
			false,
			function( $value ) {
				return is_numeric( $value ) && 0 <= $value;
			}
		);
		$this->add_option_definition(
			self::SETTING_NAME_CSS_CACHE_TTL,
			self::DEFAULT_CSS_CACHE_TTL,
			true,
			__( 'CSS Cache Time to Live [seconds]' ),
			__( 'Invalidate cache of CSS file after defined amount of seconds. It can take few minutes before the cash object is created. Cache is loaded in cron task running each minute. Recommended values: One day = 86400 , One week = 604800, One month = 2628000' ),
			self::OPTION_TYPE_NUMBER,
			false,
			function( $value ) {
				return is_numeric( $value ) && 0 <= $value;
			}
		);
	}
}