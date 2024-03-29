<?php
/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    urlslab
 * @subpackage urlslab/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    urlslab
 * @subpackage urlslab/admin
 */
class Urlslab_Admin {
	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string $urlslab The ID of this plugin.
	 */
	private string $urlslab;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string $version The current version of this plugin.
	 */
	private string $version;

	/**
	 * The menu factory to create different menus
	 *
	 * @since    1.1.0
	 * @access   private
	 * @var Urlslab_Page_Factory
	 */
	private Urlslab_Page_Factory $urlslab_menu_factory;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @param string $urlslab The name of this plugin.
	 * @param string $version The version of this plugin.
	 *
	 * @since    1.0.0
	 */
	public function __construct( string $urlslab, string $version ) {
		$this->urlslab = $urlslab;
		$this->version = $version;
		$this->urlslab_menu_factory = Urlslab_Page_Factory::get_instance();

		// list of modules available on editor pages
		$this->editor_modules = array( 
			'ai-content-assistant', 
		);
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_editor_assets' ) );
		add_action( 'elementor/editor/before_enqueue_scripts', array( $this, 'enqueue_elementor_editor_assets' ) );

		add_filter( 'script_loader_tag', array( $this, 'script_loader_tag' ), 10, 3 );
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_react_settings() {
		if ( isset( $_GET['page'] ) && str_contains( $_GET['page'], 'urlslab' ) ) {
			$maincss = glob( plugin_dir_path( __FILE__ ) . 'dist/assets/main-*.css' );
			$mainjs = glob( plugin_dir_path( __FILE__ ) . 'dist/main-*.js' );
			
			if ( ! empty( $maincss ) ) {
				wp_enqueue_style( $this->urlslab . '-main', plugin_dir_url( __FILE__ ) . 'dist/assets/' . basename( $maincss[0] ), false, $this->version );
			}

			if ( ! empty( $mainjs ) ) {
				wp_enqueue_script(
					$this->urlslab . '-main',
					plugin_dir_url( __FILE__ ) . 'dist/' . basename( $mainjs[0] ),
					array(
						'react',
						'react-dom',
						'wp-api-fetch',
						'wp-element',
						'wp-i18n',
					),
					$this->version,
					true
				);
			}
		}
	}

	/**
	 * Register block editor assets.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_block_editor_assets() {
		$this->enqueue_editors_modules( 'gutenberg' );
		
		
	}

	/**
	 * Register elementor editor assets.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_elementor_editor_assets() {
		$this->enqueue_editors_modules( 'elementor' );
	}
	

	public function enqueue_styles() {
		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in urlslab_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The urlslab_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {
		wp_localize_script(
			$this->urlslab,
			'wpApiSettings',
			array(
				'root'  => esc_url_raw( rest_url() ),
				'nonce' => wp_create_nonce( 'wp_rest' ),
			)
		);
	}

	public function get_urlslab_admin_menu_hook_suffix(): string {
		return 'toplevel_page_urlslab/admin/templates/urlslab-admin-display';
	}

	public function urlslab_admin_menu() {
		do_action( 'urlslab_admin_menu' );

		add_menu_page(
			'URLsLab Plugin',
			'URLsLab',
			'manage_options',
			$this->urlslab_menu_factory->main_menu_slug(),
			null,
			plugin_dir_url( __FILE__ ) . 'assets/urlslab-logo.png',
			80
		);

		$this->urlslab_menu_factory->init_admin_menus();
	}

	public function urlslab_page_ajax() {
		$this->urlslab_menu_factory->init_page_ajax();
	}

	function urlslab_load_add_widgets_page() {
		$action = '';
		$page_slug = '';
		$component = '';

		//# action initialization
		if ( isset( $_REQUEST['action'] ) and -1 != $_REQUEST['action'] and is_string( $_REQUEST['action'] ) ) {
			$action = $_REQUEST['action'];
		}
		//# action initialization

		//# slug initialization
		if ( isset( $_REQUEST['page'] ) and -1 != $_REQUEST['page'] ) {
			$page_slug = $_REQUEST['page'];
		}
		//# slug initialization

		//# component initialization
		if ( isset( $_REQUEST['component'] ) and -1 != $_REQUEST['component'] ) {
			$component = $_REQUEST['component'];
		}
		//# component initialization

		$this->urlslab_menu_factory->init_on_page_loads( $page_slug, $action, $component );
	}

	function script_loader_tag( $tag, $handle, $src ) {
		$handles = array_merge( array( 'main' ), $this->editor_modules );
		// if script is our module, update type attribute
		if ( strpos( $handle, $this->urlslab ) === 0 && in_array( str_replace( "{$this->urlslab}-", '', $handle ), $handles ) ) {
			return str_replace( ' src', ' type="module" src', $tag );
		}
		return $tag;
	}
	
	function enqueue_editors_modules( $editor_type ) {
		foreach ( $this->editor_modules as $module_name ) {
			$handle = "{$this->urlslab}-{$module_name}";
			$cssfile = glob( plugin_dir_path( __FILE__ ) . "src/app-{$module_name}/dist/assets/main-*.css" );
			$jsfile = glob( plugin_dir_path( __FILE__ ) . "src/app-{$module_name}/dist/main-*.js" );

			if ( ! empty( $cssfile ) ) {
				wp_enqueue_style( $handle, plugin_dir_url( __FILE__ ) . "src/app-{$module_name}/dist/assets/" . basename( $cssfile[0] ), false, $this->version );
			}
			
			if ( ! empty( $jsfile ) ) {
				wp_enqueue_script(
					$handle,
					plugin_dir_url( __FILE__ ) . "src/app-{$module_name}/dist/" . basename( $jsfile[0] ),
					array(
						'react',
						'react-dom',
						'wp-data',
						'wp-editor',
						'wp-dom-ready',
						'wp-i18n',
						'wp-blocks',
					),
					$this->version,
					true
				);

				wp_localize_script( $handle, 'scriptData', array( 'editor_type' => $editor_type ) );
			}
		}
	}
}
