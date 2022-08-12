<?php

class Urlslab_Related_Resource_Subpage extends Urlslab_Admin_Subpage {

	private Urlslab_Admin_Page $parent_page;
	private Urlslab_Related_Resources_Widget_Table $related_resource_table;
	private Urlslab_Url_Data_Fetcher $url_data_fetcher;
	private string $subpage_slug;

	public function __construct( $parent_page,
		Urlslab_Url_Data_Fetcher $url_data_fetcher ) {
		$this->parent_page = $parent_page;
		$this->subpage_slug = 'related-resource';
		$this->url_data_fetcher = $url_data_fetcher;
	}

	public function handle_action() {
		if ( isset( $_SERVER['REQUEST_METHOD'] ) and
			 'POST' === $_SERVER['REQUEST_METHOD'] and
			 isset( $_REQUEST['action'] ) and
			 - 1 != $_REQUEST['action'] ) {

			//# Import Functionality
			if ( isset( $_POST['submit'] ) &&
				 'Import' === $_POST['submit'] ) {
				check_admin_referer( 'related-resource-widget-import' );
				$this->import_csv_url_relations();
			}
			//# Import Functionality

			//# Edit Functionality
			if ( isset( $_POST['submit'] ) &&
				 'Edit Url Relation' === $_POST['submit'] ) {
				if ( isset( $_POST['srcUrlHash'] ) && ! empty( $_POST['srcUrlHash'] ) &&
					isset( $_POST['destUrlHash'] ) && ! empty( $_POST['destUrlHash'] ) &&
					isset( $_POST['srcUrl'] ) && ! empty( $_POST['srcUrl'] ) &&
					isset( $_POST['destUrl'] ) && ! empty( $_POST['destUrl'] ) ) {
					$this->edit_url_relation(
						$_POST['srcUrlHash'],
						$_POST['destUrlHash'],
						new Urlslab_Url( $_POST['srcUrl'] ),
						new Urlslab_Url( $_POST['destUrl'] ),
					);
					wp_safe_redirect(
						$this->parent_page->menu_page(
							$this->subpage_slug,
							array(
								'status' => 'success',
								'urlslab-message' => 'keyword was edited successfully',
							)
						)
					);
					exit;
				} else {
					wp_safe_redirect(
						$this->parent_page->menu_page(
							$this->subpage_slug,
							array(
								'status' => 'failure',
								'urlslab-message' => 'entered relation detail was not valid',
							)
						)
					);
					exit;
				}
			}
			//# Edit Functionality

			# Add Functionality
			if ( isset( $_POST['submit'] ) &&
				 'Add Url Relation' === $_POST['submit'] ) {
				if ( isset( $_POST['srcUrl'] ) && ! empty( $_POST['srcUrl'] ) &&
					isset( $_POST['destUrl'] ) && ! empty( $_POST['destUrl'] ) ) {
					$this->add_url_relation(
						new Urlslab_Url( $_POST['srcUrl'] ),
						new Urlslab_Url( $_POST['destUrl'] ),
					);
					wp_safe_redirect(
						$this->parent_page->menu_page(
							$this->subpage_slug,
							array(
								'status'          => 'success',
								'urlslab-message' => 'Keyword was added successfully',
							)
						)
					);
					exit;
				} else {
					wp_safe_redirect(
						$this->parent_page->menu_page(
							$this->subpage_slug,
							array(
								'status' => 'failure',
								'urlslab-message' => 'entered relation detail was not valid',
							)
						)
					);
					exit;
				}
			}
			# Add Functionality

		}

		if ( isset( $_SERVER['REQUEST_METHOD'] ) and
			 'GET' === $_SERVER['REQUEST_METHOD'] and
			 isset( $_REQUEST['action'] ) and
			 - 1 != $_REQUEST['action'] ) {

			//# Export Functionality
			if ( 'export' == $_REQUEST['action'] ) {
				$this->export_csv_url_relations();
				die();
			}
			//# Export Functionality

			//# Clear Functionality
			if ( 'clear' == $_REQUEST['action'] ) {
				$this->clear_url_relations();
				wp_safe_redirect(
					$this->parent_page->menu_page(
						$this->subpage_slug,
						array(
							'status' => 'success',
							'urlslab-message' => 'All Data deleted successfully',
						)
					)
				);
				exit;
			}
			//# Clear Functionality

			//# Sample Data Generation
			if ( 'generate_sample_data' == $_REQUEST['action'] ) {
				$this->init_sample_data();
				wp_safe_redirect(
					$this->parent_page->menu_page(
						$this->subpage_slug,
						array(
							'status' => 'success',
							'urlslab-message' => 'Sample Data generated successfully',
						)
					)
				);
				exit;
			}
			//# Sample Data Generation
		}
	}

	public function render_manage_buttons() {
		?>
		<div class="urlslab-action-container">
			<div>
				<button id="add-url-relation-btn" class="button button-primary">
					Add Url Relation
				</button>
				<a href="#ex1" rel="modal:open" class="button button-primary">
					Import
				</a>
			</div>
			<div>
				<a href="<?php echo esc_url( $this->parent_page->menu_page( $this->subpage_slug, 'action=export' ) ); ?>" target="_blank"
				   class="button">Export</a>
				<a href="<?php echo esc_url( $this->parent_page->menu_page( $this->subpage_slug, 'action=clear' ) ); ?>"
				   class="button">Delete all</a>
				<a href="<?php echo esc_url( $this->parent_page->menu_page( $this->subpage_slug, 'action=generate_sample_data' ) ); ?>"
				   class="button">Generate Sample Data</a>
			</div>
		</div>
		<?php
	}

	public function render_tables() {
		?>
		<form method="get" class="float-left">
			<?php
			$this->related_resource_table->prepare_items();
			?>
			<input type="hidden" name="page" value="<?php echo esc_attr( $this->parent_page->get_menu_slug() ); ?>">
			<input type="hidden" name="tab" value="<?php echo esc_attr( $this->subpage_slug ); ?>">
			<?php
			$this->related_resource_table->search_box( 'Search', 'urlslab-url-relation-input' );
			$this->related_resource_table->display();
			?>
		</form>
		<?php
	}

	public function render_modals() {
		?>
		<div id="ex1" class="modal">
			<h2>Import Related Resources CSV</h2>
			<div>
				The CSV file should contain headers. the CSV file should include following headers:
				<ul>
					<li class="color-danger">src URL (required)</li>
					<li class="color-danger">dest URL (required)</li>
				</ul>
			</div>
			<form action="<?php echo esc_url( $this->parent_page->menu_page( $this->subpage_slug, 'action=import' ) ); ?>" method="post"
				  enctype="multipart/form-data">
				<?php wp_nonce_field( 'related-resource-widget-import' ); ?>
				<input type="file" name="csv_file">
				<br class="clear"/>
				<br class="clear"/>
				<input type="submit" name="submit" id="submit" class="button" value="Import">
			</form>
		</div>
		<?php
	}

	public function set_table_screen_options() {
		add_screen_option(
			'per_page',
			array(
				'label' => 'Relations',
				'default' => 50,
				'option' => 'users_per_page',
			)
		);

		$this->related_resource_table = new Urlslab_Related_Resources_Widget_Table();
	}

	private function import_csv_url_relations(): void {
		try {
			if ( isset( $_FILES['csv_file']['error'] ) and
				 UPLOAD_ERR_OK == $_FILES['csv_file']['error'] and
				 isset( $_FILES['csv_file'] ) and
				 isset( $_FILES['csv_file']['size'] ) and
				 isset( $_FILES['csv_file']['tmp_name'] ) and
				 ! empty( $_FILES['csv_file'] ) and
				 $_FILES['csv_file']['size'] > 0 ) {
				$res = $this->import_csv( $_FILES['csv_file']['tmp_name'] );
				if ( $res > 0 ) {
					$redirect_to = $this->parent_page->menu_page(
						$this->subpage_slug,
						array(
							'status' => 'success',
							'urlslab-message' => 'Processed ' . $res . ' rows of CSV successfully',
						)
					);
				} else {
					$redirect_to = $this->parent_page->menu_page(
						$this->subpage_slug,
						array(
							'status' => 'failure',
							'urlslab-message' => 'Didnt process any rows of CSV',
						)
					);
				}
			} else {
				$redirect_to = $this->parent_page->menu_page(
					$this->subpage_slug,
					array(
						'status' => 'failure',
						'urlslab-message' => urlslab_file_upload_code_to_message( $_FILES['csv_file']['error'] ),
					)
				);
			}
		} catch ( Exception $e ) {
			$redirect_to = $this->parent_page->menu_page(
				$this->subpage_slug,
				array(
					'status' => 'failure',
					'urlslab-message' => 'Error in processing CSV: ' . $e->getMessage(),
				)
			);
		} finally {
			wp_safe_redirect( $redirect_to );
			exit();
		}
	}

	private function import_csv( $file ): int {
		//# Reading/Parsing CSV File
		$row = 1;
		$processed_rows = 0;
		$handle = fopen( $file, 'r' );
		if ( false !== ( $handle ) ) {
			wp_raise_memory_limit( 'admin' );
			while ( ( $data = fgetcsv( $handle ) ) !== false ) {
				$row++;
				//# processing CSV Header
				if ( 1 == $row ) {
					continue;
				}
				if ( ! isset( $data[0] ) || strlen( $data[0] ) == 0 ||
					 ! isset( $data[1] ) || strlen( $data[1] ) == 0 ) {
					continue;
				}
				//SrcUrl, DestUrl
				$data_row = array(
					new Urlslab_Url( $data[0] ),
					new Urlslab_Url( $data[1] ),
				);

				$res = $this->create_row( $data_row );
				if ( $res ) {
					$processed_rows++;
				}
			}
			fclose( $handle );
		}

		return $processed_rows;
	}

	/**
	 * @param Urlslab_Url[] $data srcUrl and destUrl
	 *
	 * @return bool
	 */
	private function create_row( array $data ): bool {
		//# Scheduling Src and Dest URLs
		if ( ! $this->url_data_fetcher->prepare_url_batch_for_scheduling( $data ) ) {
			return false;
		}
		//# Scheduling Src and Dest URLs

		global $wpdb;
		$table = URLSLAB_RELATED_RESOURCE_TABLE;

		$update_query = "INSERT IGNORE INTO $table (
                   srcUrlMd5,
                   destUrlMd5) VALUES
                   (%s, %s)";

		$result = $wpdb->query(
			$wpdb->prepare(
				$update_query, // phpcs:ignore
				array(
					$data[0]->get_url_id(),
					$data[1]->get_url_id(),
				)
			)
		);

		return is_numeric( $result );
	}

	private function export_csv_url_relations() {
		header( 'Content-Type: text/csv; charset=utf-8' );
		header( 'Content-Disposition: attachment; filename=urlslab-related-resources.csv' );
		$output = fopen( 'php://output', 'w' );
		fputcsv( $output, array( 'Src URL', 'Dest URL' ) );
		global $wpdb;
		$related_resource_table = URLSLAB_RELATED_RESOURCE_TABLE;
		$urls_table = URLSLAB_URLS_TABLE;

		$query = "SELECT u.urlName AS srcUrlName,
				       v.urlName AS destUrlName
				FROM $related_resource_table r
				         INNER JOIN $urls_table as u
				                    ON r.srcUrlMd5 = u.urlMd5
				         INNER JOIN $urls_table as v
				                    ON r.destUrlMd5 = v.urlMd5
			    WHERE r.srcUrlMd5 <> r.destUrlMd5";
		$result = $wpdb->get_results( $query, ARRAY_N ); // phpcs:ignore
		foreach ( $result as $row ) {
			fputcsv(
				$output,
				array(
					urlslab_get_current_page_protocol() . $row[0],
					urlslab_get_current_page_protocol() . $row[1],
				)
			);
		}
		fclose( $output );
	}

	/**
	 * @param string $col_name
	 *
	 * @return false|string
	 */
	private function map_to_db_col( string $col_name ) {
		switch ( strtolower( trim( $col_name ) ) ) {
			case 'src url':
				return 'srcUrl';
			case 'dest url':
				return 'destUrl';
			default:
				return false;
		}
	}

	private function clear_url_relations() {
		global $wpdb;
		$table = URLSLAB_RELATED_RESOURCE_TABLE;

		$query = "TRUNCATE $table";
		$wpdb->query( $query ); // phpcs:ignore
	}

	private function init_sample_data() {
		$sample_urls = array();

		//try to load all titles with less than 4 words
		$posts = get_posts(
			array(
				'numberposts' => 1000,
				'orderby' => 'date',
				'order' => 'DESC',
			)
		);

		foreach ( $posts as $post ) {
			if ( 'publish' == $post->post_status ) {
				$sample_urls[] = get_permalink( $post->ID );
			}
		}
		$sample_urls = array_unique( $sample_urls );
		sort( $sample_urls, SORT_STRING | SORT_FLAG_CASE | SORT_NATURAL );

		foreach ( $sample_urls as $id => $url ) {
			$sample_urls[ $id ] = new Urlslab_Url( $url );
		}

		if ( ! $this->url_data_fetcher->prepare_url_batch_for_scheduling( $sample_urls ) ) {
			return false;
		}


		global $wpdb;
		$table = URLSLAB_RELATED_RESOURCE_TABLE;
		$values = array();
		$placeholder = array();

		$max = count( $sample_urls );
		for ( $i = 0; $i < $max; $i++ ) {
			for ( $j = $i + 1; $j < $max && $j < ( $i + 10 ); $j++ ) {
				array_push(
					$values,
					$sample_urls[ $i ]->get_url_id(),
					$sample_urls[ $j ]->get_url_id(),
				);
				$placeholder[] = '(%s, %s)';
			}
		}

		$placeholder_string = implode( ', ', $placeholder );
		$update_query = "INSERT IGNORE INTO $table (
                   srcUrlMd5,
                   destUrlMd5) VALUES
                   $placeholder_string";

		$result = $wpdb->query(
			$wpdb->prepare(
				$update_query, // phpcs:ignore
				$values
			)
		);

		return is_numeric( $result );
	}

	private function edit_url_relation(
		string $old_src_url,
		string $old_dest_url,
		Urlslab_Url $src_url,
		Urlslab_Url $dest_url ): void {

		global $wpdb;

		//# Deletion of Relation
		$wpdb->delete(
			URLSLAB_RELATED_RESOURCE_TABLE,
			array(
				'srcUrlMd5' => $old_src_url,
				'destUrlMd5' => $old_dest_url,
			),
			array(
				'%s',
				'%s',
			)
		);
		//# Deletion of Relation

		//# Scheduling Src and Dest URLs
		if ( ! $this->url_data_fetcher->prepare_url_batch_for_scheduling( array( $src_url, $dest_url ) ) ) {
			return;
		}
		//# Scheduling Src and Dest URLs

		//# Add Relation
		$query = 'INSERT INTO ' . URLSLAB_RELATED_RESOURCE_TABLE . ' (
                   srcUrlMd5,
                   destUrlMd5
        ) VALUES (%s, %s)';

		$wpdb->query(
			$wpdb->prepare( $query, // phpcs:ignore
				array(
					$src_url->get_url_id(),
					$dest_url->get_url_id(),
				)
			)
		);
		//# Add Relation
	}

	private function add_url_relation(
		Urlslab_Url $src_url,
		Urlslab_Url $dest_url ): void {

		global $wpdb;

		//# Scheduling Src and Dest URLs
		if ( ! $this->url_data_fetcher->prepare_url_batch_for_scheduling( array( $src_url, $dest_url ) ) ) {
			return;
		}
		//# Scheduling Src and Dest URLs

		//# Add Relation
		$query = 'INSERT INTO ' . URLSLAB_RELATED_RESOURCE_TABLE . ' (
                   srcUrlMd5,
                   destUrlMd5
        ) VALUES (%s, %s)';

		$wpdb->query(
			$wpdb->prepare( $query, // phpcs:ignore
				array(
					$src_url->get_url_id(),
					$dest_url->get_url_id(),
				)
			)
		);
		//# Add Relation
	}


	public function render_settings() {}
}