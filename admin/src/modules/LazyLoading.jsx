import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createColumnHelper, getFacetedMinMaxValues } from '@tanstack/react-table';
import { useI18n } from '@wordpress/react-i18n';
import { fetchData } from '../api/fetchData';
import Loader from '../components/Loader';
import Table from '../components/TableComponent';

export default function LazyLoading() {
	const { __ } = useI18n();
	const columnHelper = createColumnHelper();

	const { data, status } = useQuery( {
		queryKey: [ 'tableYoutube', 'youtubeCache' ],
		queryFn: () => fetchData( 'youtube-cache' ),
	} );

	if ( status === 'loading' ) {
		return <Loader />;
	}

	const columns = [
		columnHelper.accessor( ( row ) => JSON.parse( `${ row.microdata }` ).items[ 0 ].snippet, {
			id: 'thumb',
			cell: ( image ) => <img src={ image.getValue().thumbnails.medium.url } alt={ image.getValue().title
			} />,
			header: () => __( 'Thumbnail' ),
		} ),
		columnHelper.accessor( 'videoid', {
			header: () => __( 'YouTube Id' ),
		} ),
		columnHelper.accessor( 'status', {
			// cell: ( status ) => <span>{ status.renderValue() }</span>,
			className: 'youtube-status',
			header: () => __( 'Status' ),
		} ),

		columnHelper.accessor( ( row ) => JSON.parse( `${ row.microdata }` ).items[ 0 ].snippet.title, {
			id: 'title',
			header: () => __( 'Title' ),
		} ),
	];

	return (
		<Table columns={ columns } data={ data } />
	);
}
