<?php
?>
<div class="urlslab-wrap">
	<?php require plugin_dir_path( __FILE__ ) . 'urlslab-admin-header.php'; ?>
	<section class="urlslab-content-container">
		<?php
		$page_data = Urlslab_Page_Factory::get_instance()->get_page( 'urlslab-image-seo' );
		$user = Urlslab_User_Widget::get_instance();
		?>


		<div id="urlslab-active-accordion" class="accordion col-12">


			<!-- Section 1 -->
			<div class="urlslab-accordion-header col-12">
				<div>
					<h3>Explanation</h3>
					<?php
					$widget = Urlslab_Available_Widgets::get_instance()->get_widget( 'urlslab-image-alt-attribute' );
					require plugin_dir_path( __FILE__ ) . 'urlslab-admin-activation-card-header.php';
					?>
				</div>
			</div>
			<div class="urlslab-card-container">
				<div class="urlslab-card-content">
					<div class="mar-bottom-1">
						Generate Alt text automatically for images that don't have any alt text. The alt text is
						created based on the following:
						<ol>
							<li>
								if the Image is wrapped in a link, summary of the destination URL generated by URLSLAB
								will be used as alt text
							</li>
							<li>
								The heading of the article that the image is embeded will be used as alt text
							</li>
						</ol>
					</div>
				</div>
			</div>

			<!-- Section 2 -->
			<div class="urlslab-accordion-header col-12">
				<h3>Settings</h3>
			</div>
			<div class="urlslab-card-container"></div>

		</div>
	</section>
</div>
