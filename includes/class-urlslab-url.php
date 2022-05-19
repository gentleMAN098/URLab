<?php

class Urlslab_Url {
	private string $url;

	/**
	 * @param string $url
	 */
	public function __construct( string $url ) {
		$this->set_url( $url );
	}


	/**
	 * @return string
	 */
	public function get_url(): string {
		return $this->url;
	}

	private function set_url( string $url ) {
		if ( empty( $url ) ) {
			return;
		}

		$parsed_url = parse_url( $url );
		if ( ! empty( $parsed_url['query'] ) ) {
			$this->url = strtolower( $parsed_url['host'] . $parsed_url['path'] . '?' . $parsed_url['query'] );
		} else {
			$this->url = strtolower( $parsed_url['host'] . $parsed_url['path'] );
		}
	}

	public function get_url_id(): string {
		return md5( $this->url );
	}

}