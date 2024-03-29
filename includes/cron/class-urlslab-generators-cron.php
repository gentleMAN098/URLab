<?php

use Urlslab_Vendor\OpenAPI\Client\ApiException;
use Urlslab_Vendor\OpenAPI\Client\Configuration;
use Urlslab_Vendor\OpenAPI\Client\Model\DomainDataRetrievalAugmentPrompt;
use Urlslab_Vendor\OpenAPI\Client\Model\DomainDataRetrievalAugmentRequest;
use Urlslab_Vendor\OpenAPI\Client\Model\DomainDataRetrievalContentQuery;
use Urlslab_Vendor\OpenAPI\Client\Urlslab\ContentApi;
use Urlslab_Vendor\GuzzleHttp;

require_once URLSLAB_PLUGIN_DIR . '/includes/cron/class-urlslab-cron.php';

class Urlslab_Generators_Cron extends Urlslab_Cron {
	private ContentApi $content_client;

	public function __construct() {
		parent::__construct();
	}

	public function get_description(): string {
		return __( 'Generating content', 'urlslab' );
	}

	protected function execute(): bool {
		if ( ! Urlslab_User_Widget::get_instance()->is_widget_activated( Urlslab_Content_Generator_Widget::SLUG )
			 || ! Urlslab_User_Widget::get_instance()->get_widget( Urlslab_Content_Generator_Widget::SLUG )->get_option( Urlslab_Content_Generator_Widget::SETTING_NAME_SCHEDULE )
			 || ! $this->init_client()
		) {
			return false;
		}

		/**
		 * @var Urlslab_Content_Generator_Widget $widget
		 */
		$widget = Urlslab_User_Widget::get_instance()->get_widget( Urlslab_Content_Generator_Widget::SLUG );

		global $wpdb;

		$query_data   = array();
		$query_data[] = Urlslab_Generator_Shortcode_Row::STATUS_ACTIVE;
		$query_data[] = Urlslab_Generator_Result_Row::STATUS_NEW;
		$active_sql   = '';

		if ( Urlslab_Widget::FREQ_NEVER != $widget->get_option( Urlslab_Content_Generator_Widget::SETTING_NAME_REFRESH_INTERVAL ) ) {
			$query_data[] = Urlslab_Generator_Result_Row::STATUS_ACTIVE;
			$query_data[] = Urlslab_Data::get_now( time() - $widget->get_option( Urlslab_Content_Generator_Widget::SETTING_NAME_REFRESH_INTERVAL ) );
			$active_sql   = '(r.status = %s AND r.date_changed < %s) OR ';
		}
		// PENDING or UPDATING urls will be retried in one hour again
		$query_data[] = Urlslab_Generator_Result_Row::STATUS_PENDING;
		$query_data[] = Urlslab_Data::get_now( time() - 86000 );

		$url_row = $wpdb->get_row(
			$wpdb->prepare(
				'SELECT * FROM ' . URLSLAB_GENERATOR_SHORTCODES_TABLE . ' s INNER JOIN ' . URLSLAB_GENERATOR_RESULTS_TABLE . ' r ON (s.shortcode_id=r.shortcode_id) WHERE s.status = %s AND (r.status=%s OR ' . $active_sql . '(r.status = %s AND r.date_changed < %s)) ORDER BY r.date_changed LIMIT 1', // phpcs:ignore
				$query_data
			),
			ARRAY_A
		);
		if ( empty( $url_row ) ) {
			return false;
		}

		$row_obj = new Urlslab_Generator_Result_Row( $url_row );
		$row_obj->set_result( '' );
		$row_obj->set_status( Urlslab_Generator_Result_Row::STATUS_PENDING );
		$row_obj->update();

		$row_shortcode = new Urlslab_Generator_Shortcode_Row( $url_row );

		$attributes = (array) json_decode( $row_obj->get_prompt_variables() );

		try {
			$request = new DomainDataRetrievalAugmentRequest();
			$model   = $widget->get_option( Urlslab_Content_Generator_Widget::SETTING_NAME_GENERATOR_MODEL );
			if ( strlen( $row_shortcode->get_model() ) ) {
				$model = $row_shortcode->get_model();
			}
			$request->setAugmentingModelName( $model );
			$request->setRenewFrequency( DomainDataRetrievalAugmentRequest::RENEW_FREQUENCY_ONE_TIME );
			$prompt = new DomainDataRetrievalAugmentPrompt();

			if ( Urlslab_Generator_Shortcode_Row::TYPE_VIDEO === $row_shortcode->get_shortcode_type() ) {
				$attributes = $widget->get_att_values( $row_shortcode, $attributes, array( 'video_captions_text' ) );
				if ( ! isset( $attributes['video_captions_text'] ) || empty( $attributes['video_captions_text'] ) ) {
					$row_obj->set_result( 'Video captions not available' );
					$row_obj->set_status( Urlslab_Generator_Result_Row::STATUS_PENDING );
					$row_obj->update();

					return true;
				}
				$command = $widget->get_template_value(
					'Never appologize! If you do NOT know the answer, return just text: ' . Urlslab_Generator_Result_Row::DO_NOT_KNOW . "!\n" . $row_shortcode->get_prompt() .
					"\n\n--VIDEO CAPTIONS:\n{context}\n--VIDEO CAPTIONS END\nANSWER:",
					$attributes
				);
				$prompt->setPromptTemplate( $command );
				$prompt->setDocumentTemplate( $widget->get_template_value( '{{video_captions_text}}', $attributes ) );

				$prompt->setMetadataVars( array() );
				$request->setPrompt( $prompt );
				$response = Urlslab_Augment_Helper::get_instance()->augment( $request );
			} else {
				$attributes = $widget->get_att_values( $row_shortcode, $attributes );
				$command    = $widget->get_template_value(
					'Never appologize! If you do NOT know the answer, return just text: ' . Urlslab_Generator_Result_Row::DO_NOT_KNOW . "!\n" . $row_shortcode->get_prompt() .
					'ANSWER:',
					$attributes
				);
				$prompt->setPromptTemplate( "Additional information to your memory:\n--\n{context}\n----\n" . $command );
				$prompt->setDocumentTemplate( "--\n{text}\n--" );
				$prompt->setMetadataVars( array( 'text' ) );
				$request->setPrompt( $prompt );

				$filter = new DomainDataRetrievalContentQuery();
				$filter->setLimit( 5 );

				if ( strlen( $row_obj->get_url_filter() ) ) {
					$filter->setUrls( array( $row_obj->get_url_filter() ) );
				}

				if ( strlen( $row_obj->get_semantic_context() ) ) {
					$request->setAugmentCommand( $row_obj->get_semantic_context() );
					if ( ! strlen( $row_obj->get_url_filter() ) ) {
						$filter->setUrls( array( Urlslab_Url::get_current_page_url()->get_domain_name() ) );
					}
				}
				$request->setFilter( $filter );

				$response = Urlslab_Augment_Helper::get_instance()->augment( $request );
			}


			if ( $widget->get_option( Urlslab_Content_Generator_Widget::SETTING_NAME_AUTOAPPROVE ) ) {
				$row_obj->set_status( Urlslab_Generator_Result_Row::STATUS_ACTIVE );
			} else {
				$row_obj->set_status( Urlslab_Generator_Result_Row::STATUS_WAITING_APPROVAL );
			}

			$row_obj->set_result( $response->getResponse() );

			if ( false !== strpos( $row_obj->get_result(), Urlslab_Generator_Result_Row::DO_NOT_KNOW ) ) {
				$row_obj->set_status( Urlslab_Generator_Result_Row::STATUS_DISABLED );
			}

			$row_obj->update();
		} catch ( ApiException $e ) {
			switch ( $e->getCode() ) {
				case 422:
				case 429:
				case 504:
				case 500:
					$row_obj->set_status( Urlslab_Generator_Result_Row::STATUS_PENDING );
					$row_obj->set_result( $e->getMessage() );
					$row_obj->update();

					break;
				case 404:
					if ( strlen( $row_obj->get_semantic_context() ) ) {
						$row_obj->set_status( Urlslab_Generator_Result_Row::STATUS_DISABLED );
						$row_obj->set_result( 'Did not found any page matching the url. Schedule the url first and restart generator again.' );
						$row_obj->update();
						break;
					} else {
						$row_obj->set_status( Urlslab_Generator_Result_Row::STATUS_PENDING );
						$row_obj->set_result( 'URL not crawled yet, retrying later...' );
						$row_obj->update();
						break;
					}
				case 402:
					Urlslab_User_Widget::get_instance()->get_widget( Urlslab_General::SLUG )->update_option( Urlslab_General::SETTING_NAME_URLSLAB_CREDITS, 0 );
					$row_obj->set_status( Urlslab_Generator_Result_Row::STATUS_PENDING );
					$row_obj->set_result( 'No credits, retrying later...' );
					$row_obj->update();

					return false;

				default:
					$row_obj->set_status( Urlslab_Generator_Result_Row::STATUS_DISABLED );
					$row_obj->set_result( $e->getMessage() );
					$row_obj->update();
			}

			return false;
		}

		return true;
	}

	private function init_client(): bool {
		if ( empty( $this->content_client ) && Urlslab_General::is_urlslab_active() ) {
			$api_key              = Urlslab_User_Widget::get_instance()->get_widget( Urlslab_General::SLUG )->get_option( Urlslab_General::SETTING_NAME_URLSLAB_API_KEY );
			$config               = Configuration::getDefaultConfiguration()->setApiKey( 'X-URLSLAB-KEY', $api_key );
			$this->content_client = new ContentApi( new GuzzleHttp\Client(), $config );
		}

		return ! empty( $this->content_client );
	}
}
