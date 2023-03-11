<?php

class Urlslab_Url_Row extends Urlslab_Data {

	const URL_TYPE_INTERNAL = 'I';
	const URL_TYPE_EXTERNAL = 'E';

	const VALUE_EMPTY = 'E';

	const STATUS_HTTP_NOT_PROCESSED = - 1;

	const SCR_STATUS_ERROR = 'E';
	const SCR_STATUS_NEW = 'N';
	const SCR_STATUS_PENDING = 'P';
	const SCR_STATUS_UPDATING = 'U';
	const SCR_STATUS_ACTIVE = 'A';

	const SUM_STATUS_ERROR = 'E';
	const SUM_STATUS_NEW = 'N';
	const SUM_STATUS_PENDING = 'P';
	const SUM_STATUS_UPDATING = 'U';
	const SUM_STATUS_ACTIVE = 'A';

	public const VISIBILITY_VISIBLE = 'V';
	public const VISIBILITY_HIDDEN = 'H';


	public const SCREENSHOT_TYPE_CAROUSEL = 'carousel';
	public const SCREENSHOT_TYPE_FULL_PAGE = 'full-page';
	public const SCREENSHOT_TYPE_CAROUSEL_THUMBNAIL = 'carousel-thumbnail';
	public const SCREENSHOT_TYPE_FULL_PAGE_THUMBNAIL = 'full-page-thumbnail';

	/**
	 * @param array $url
	 */
	public function __construct(
		array $url = array(), $loaded_from_db = true
	) {
		$this->set( 'url_id', $url['url_id'] ?? 0, ! $loaded_from_db );
		$this->set( 'url_name', $url['url_name'] ?? '', ! $loaded_from_db );
		$this->set( 'scr_status', $url['scr_status'] ?? self::SCR_STATUS_NEW, ! $loaded_from_db );
		$this->set( 'sum_status', $url['sum_status'] ?? self::SUM_STATUS_NEW, ! $loaded_from_db );
		$this->set( 'http_status', $url['http_status'] ?? self::STATUS_HTTP_NOT_PROCESSED, ! $loaded_from_db );
		$this->set( 'urlslab_domain_id', $url['urlslab_domain_id'] ?? 0, ! $loaded_from_db );
		$this->set( 'urlslab_url_id', $url['urlslab_url_id'] ?? 0, ! $loaded_from_db );
		$this->set( 'urlslab_scr_timestamp', $url['urlslab_scr_timestamp'] ?? 0, ! $loaded_from_db );
		$this->set( 'urlslab_sum_timestamp', $url['urlslab_sum_timestamp'] ?? 0, ! $loaded_from_db );
		$this->set( 'update_scr_date', $url['update_scr_date'] ?? Urlslab_Data::get_now(), ! $loaded_from_db );
		$this->set( 'update_sum_date', $url['update_sum_date'] ?? Urlslab_Data::get_now(), ! $loaded_from_db );
		$this->set( 'update_http_date', $url['update_http_date'] ?? Urlslab_Data::get_now(), ! $loaded_from_db );
		$this->set( 'url_title', $url['url_title'] ?? '', ! $loaded_from_db );
		$this->set( 'url_meta_description', $url['url_meta_description'] ?? '', ! $loaded_from_db );
		$this->set( 'url_summary', $url['url_summary'] ?? '', ! $loaded_from_db );
		$this->set( 'visibility', $url['visibility'] ?? self::VISIBILITY_VISIBLE, ! $loaded_from_db );

		$url_type = self::URL_TYPE_INTERNAL;
		if ( isset( $url['url_type'] ) ) {
			$url_type = $url['url_type'];
		} else if ( strlen( $this->get( 'url_name' ) ) ) {
			try {
				$url_type = $this->get_url()->is_same_domain_url() ? self::URL_TYPE_INTERNAL : self::URL_TYPE_EXTERNAL;
			} catch ( Exception $e ) {
			}
		}
		$this->set( 'url_type', $url_type, ! $loaded_from_db );
	}

	function get_table_name(): string {
		return URLSLAB_URLS_TABLE;
	}

	function get_primary_columns(): array {
		return array( 'url_id' );
	}

	public function get_url(): Urlslab_Url {
		return new Urlslab_Url( $this->get( 'url_name' ), true );
	}

	function get_columns(): array {
		return array(
			'url_id'                => '%d',
			'url_name'              => '%s',
			'scr_status'            => '%s',
			'sum_status'            => '%s',
			'http_status'           => '%d',
			'urlslab_domain_id'     => '%s',
			'urlslab_url_id'        => '%s',
			'update_sum_date'       => '%s',
			'update_scr_date'       => '%s',
			'update_http_date'      => '%s',
			'urlslab_scr_timestamp' => '%d',
			'urlslab_sum_timestamp' => '%d',
			'url_title'             => '%s',
			'url_meta_description'  => '%s',
			'url_summary'           => '%s',
			'visibility'            => '%s',
			'url_type'              => '%s',
		);
	}

	public function get( $name ) {
		switch ( $name ) {
			case 'url_summary':
				//continue to next option
			case 'url_title':
				//continue to next option
			case 'url_meta_description':
				if ( Urlslab_Url_Row::VALUE_EMPTY == parent::get( $name ) ) {
					return '';
				} //continue to next option
			default:
		}

		return parent::get( $name );
	}

	public function get_summary( $strategy ): string {

		switch ( $strategy ) {

			case Urlslab_Link_Enhancer::DESC_TEXT_SUMMARY:
				if ( ! empty( trim( $this->get( 'url_summary' ) ) ) ) {
					return trim( $this->get( 'url_summary' ) );
				} //continue to next option
			case Urlslab_Link_Enhancer::DESC_TEXT_META_DESCRIPTION:
				if ( ! empty( trim( $this->get( 'url_meta_description' ) ) ) ) {
					return trim( $this->get( 'url_meta_description' ) );
				} //continue to next option
			case Urlslab_Link_Enhancer::DESC_TEXT_TITLE:
				if ( ! empty( trim( $this->get( 'url_title' ) ) ) ) {
					return trim( $this->get( 'url_title' ) );
				} //continue to next option
			case Urlslab_Link_Enhancer::DESC_TEXT_URL:
			default:
		}

		return ucwords(
			trim(
				trim(
					trim(
						str_replace(
							'/',
							' - ',
							str_replace(
								array(
									'-',
									'_',
									'+',
								),
								' ',
								$this->get_url()->get_url_path()
							)
						)
					),
					'-'
				)
			)
		);
	}

	/**
	 * @param string $screenshot_type
	 *
	 * @return string url of the schreenshot or empty string
	 */
	public function get_screenshot_url( string $screenshot_type = self::SCREENSHOT_TYPE_CAROUSEL ): string {
		if ( empty( $this->get( 'urlslab_scr_timestamp' ) ) || empty( $this->get( 'urlslab_domain_id' ) ) || empty( $this->get( 'urlslab_url_id' ) ) ) {
			return '';
		}
		switch ( $screenshot_type ) {
			case self::SCREENSHOT_TYPE_FULL_PAGE_THUMBNAIL:
				$path = 'https://www.urlslab.com/public/thumbnail/fullpage/%s/%s/%s';
				break;
			case self::SCREENSHOT_TYPE_CAROUSEL_THUMBNAIL:
				$path = 'https://www.urlslab.com/public/thumbnail/carousel/%s/%s/%s';
				break;
			case self::SCREENSHOT_TYPE_FULL_PAGE:
				$path = 'https://www.urlslab.com/public/image/%s/%s/%s';
				break;
			case self::SCREENSHOT_TYPE_CAROUSEL:
			default:
				$path = 'https://www.urlslab.com/public/carousel/%s/%s/%s';
				break;
		}

		return sprintf(
			$path,
			$this->get( 'urlslab_domain_id' ),
			$this->get( 'urlslab_url_id' ),
			$this->get( 'urlslab_scr_timestamp' )
		);
	}

	public function is_active() {
		return 200 >= $this->get( 'http_status' ) && $this->is_visible();
	}

	public function is_internal() {
		return self::URL_TYPE_INTERNAL === $this->get( 'url_type' );
	}

	public function is_visible() {
		return self::VISIBILITY_HIDDEN != $this->get( 'visibility' );
	}


	/**
	 * @param Urlslab_Url[] $urls
	 *
	 * @return void
	 */
	public function insert_urls( $urls, $scr_status = self::SCR_STATUS_NEW, $sum_status = self::SUM_STATUS_NEW, $http_status = self::STATUS_HTTP_NOT_PROCESSED ): bool {
		if ( empty( $urls ) ) {
			return true;
		}

		$rows = array();

		foreach ( $urls as $url ) {
			$rows[] = new Urlslab_Url_Row(
				array(
					'url_id'      => $url->get_url_id(),
					'url_name'    => $url->get_url(),
					'scr_status'  => $scr_status,
					'sum_status'  => $sum_status,
					'http_status' => $http_status,
					'url_type'    => $url->is_same_domain_url() ? self::URL_TYPE_INTERNAL : self::URL_TYPE_EXTERNAL,
				),
				false
			);
		}

		$result = $this->insert_all( $rows, true );

		return is_numeric( $result );
	}
}
