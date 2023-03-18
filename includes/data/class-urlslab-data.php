<?php

abstract class Urlslab_Data {
	protected $data = array();
	private $changed = array();

	public function as_array(): array {
		return $this->data;
	}

	public function set_public( $name, $value, $loaded_from_db ) {
		$this->set( $name, $value, $loaded_from_db );
	}

	public function get_public( $name ) {
		return $this->get( $name );
	}

	protected function set( $name, $value, $loaded_from_db ) {
		if ( isset( $this->data[ $name ] ) && $this->data[ $name ] == $value ) {
			return false;
		}
		$this->data[ $name ] = $value;
		if ( ! $loaded_from_db && isset( $this->get_columns()[ $name ] ) ) {
			$this->changed[ $name ] = true;
		}
	}

	protected function get( $name ) {
		return $this->data[ $name ] ?? false;
	}

	protected function has_changed() {
		return count( $this->changed ) > 0;
	}

	abstract function get_table_name(): string;

	abstract function get_primary_columns(): array;

	abstract function get_columns(): array;

	public function update(): bool {
		if ( ! $this->has_changed() ) {
			return true;
		}

		$update_data = array();
		$format      = array();
		foreach ( $this->changed as $key => $true ) {
			$update_data[ $key ] = $this->data[ $key ];
			$format[ $key ]      = $this->get_column_format( $key );
		}

		$where        = array();
		$where_format = array();
		foreach ( $this->get_primary_columns() as $key ) {
			$where[ $key ]        = $this->data[ $key ];
			$where_format[ $key ] = $this->get_column_format( $key );
		}

		global $wpdb;
		if ( $wpdb->update( $this->get_table_name(), $update_data, $where, $format, $where_format ) ) {
			$this->changed = array();

			return true;
		}

		return false;
	}

	public function insert( $replace = false ): bool {
		if ( ! $this->has_changed() ) {
			return true;
		}

		$insert_data = array();
		$format      = array();
		foreach ( $this->changed as $key => $true ) {
			$insert_data[ $key ] = $this->data[ $key ];
			$format[ $key ]      = $this->get_column_format( $key );
		}

		global $wpdb;
		if ( $replace ) {
			if ( $wpdb->replace( $this->get_table_name(), $insert_data, $format ) ) {
				$this->changed = array();

				return true;
			}
		} else {
			if ( $wpdb->insert( $this->get_table_name(), $insert_data, $format ) ) {
				$this->changed = array();

				return true;
			}
		}

		return false;
	}

	/**
	 * @param Urlslab_Data[] $rows
	 * @param bool $insert_ignore
	 * @param array $columns_update_on_duplicate
	 *
	 * @return bool|int|mysqli_result|resource|null
	 */
	public function insert_all( array $rows, $insert_ignore = false, $columns_update_on_duplicate = array() ) {
		if ( empty( $rows ) ) {
			return true;
		}
		global $wpdb;
		$row_placeholder  = '(' . implode( ',', $this->get_columns() ) . ')';
		$row_placeholders = array();
		$insert_values    = array();

		foreach ( $rows as $row ) {
			$row_data = array();
			foreach ( $this->get_columns() as $column => $format ) {
				$row_data[] = $row->get( $column );
			}
			$insert_values      = array_merge( $insert_values, $row_data );
			$row_placeholders[] = $row_placeholder;
		}

		$on_duplicate = '';
		if ( ! $insert_ignore && ! empty( $columns_update_on_duplicate ) ) {
			$update_columns = array();
			foreach ( $columns_update_on_duplicate as $column_name ) {
				$update_columns[] = "`$column_name` = VALUES(`$column_name`)";
			}
			$on_duplicate .= ' ON DUPLICATE KEY UPDATE ' . implode( ',', $update_columns );
		}

		$query = 'INSERT' .
				 ( $insert_ignore ? ' IGNORE' : '' ) .
				 ' INTO ' . $this->get_table_name() .
				 '(' . implode( ',', array_keys( $this->get_columns() ) ) . ')' .
				 ' VALUES ' . implode( ',', $row_placeholders ) .
				 $on_duplicate;

		$result = $wpdb->query( $wpdb->prepare( $query, $insert_values ) ); // phpcs:ignore

		return $result;
	}

	private function get_column_format( $name ) {
		return $this->get_columns()[ $name ] ?? '%s';
	}

	public function load(): bool {
		global $wpdb;

		if ( empty( $this->get_primary_columns() ) ) {
			return false;
		}

		$where      = array();
		$where_data = array();
		foreach ( $this->get_primary_columns() as $key ) {
			$where[]            = $key . '=' . $this->get_column_format( $key );
			$where_data[ $key ] = $this->data[ $key ];
		}

		$row = $wpdb->get_row(
			$wpdb->prepare(
				'SELECT *	FROM ' . $this->get_table_name() . ' WHERE ' . implode( ' AND ', $where ) . ' LIMIT 1', // phpcs:ignore
				$where_data
			),
			ARRAY_A
		);

		if ( empty( $row ) ) {
			return false;
		}

		foreach ( $row as $key => $value ) {
			$this->set( $key, $value, false );
		}

		return true;
	}

	public function import( array $rows, $on_duplicate_update_columns = true, $ignore = true ): int {
		$on_duplicate = array();
		if ( $on_duplicate_update_columns ) {
			foreach ( $this->get_columns() as $column => $format ) {
				if ( ! in_array( $column, $this->get_primary_columns() ) ) {
					$on_duplicate[] = $column;
				}
			}
		}

		return $this->insert_all( $rows, $ignore, $on_duplicate );
	}

	public function get_primary_id( string $glue = '_' ) {
		$id = array();
		foreach ( $this->get_primary_columns() as $primary_column ) {
			$id[ $primary_column ] = $this->get( $primary_column );
		}

		return implode( $glue, $id );
	}

	public static function get_now( $timestamp = false ): string {
		if ( $timestamp ) {
			return gmdate( 'Y-m-d H:i:s', $timestamp );
		}

		return gmdate( 'Y-m-d H:i:s' );
	}
}