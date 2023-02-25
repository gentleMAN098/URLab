import { useI18n } from '@wordpress/react-i18n';
import { createColumnHelper } from '@tanstack/react-table';

import { handleInput, handleSelected } from '../../constants/tableFunctions';
import SortMenu from '../../elements/SortMenu';
import Checkbox from '../../elements/Checkbox';

export default function Columns() {
	const { __ } = useI18n();
	const columnHelper = createColumnHelper();

	const statusTypes = {
		N: __( 'New' ),
		A: __( 'Available' ),
		P: __( 'Processing' ),
		D: __( 'Disabled' ),
	};

	return [
		columnHelper.accessor( 'check', {
			className: 'checkbox',
			cell: ( cell ) => <Checkbox checked={ cell.row.getIsSelected() } onChange={ ( val ) => {
				handleSelected( val, cell );
			} } />,
			header: () => __( '' ),
		} ),
		columnHelper?.accessor( ( row ) => JSON.parse( `${ row?.microdata }` )?.items[ 0 ]?.snippet, {
			id: 'thumb',
			className: 'thumbnail',
			cell: ( image ) => <img src={ image?.getValue()?.thumbnails?.default?.url } alt={ image?.getValue()?.title
			} />,
			header: () => __( 'Thumbnail' ),
		} ),
		columnHelper?.accessor( 'videoid', {
			header: () => __( 'YouTube Id' ),
		} ),
		columnHelper?.accessor( 'status', {
			cell: ( cell ) => <SortMenu
				items={ statusTypes }
				name={ cell.column.id }
				checkedId={ cell.getValue() }
				onChange={ ( val ) => handleInput( val, cell ) } />,
			className: 'youtube-status',
			header: () => __( 'Status' ),
		} ),
		columnHelper?.accessor( ( row ) => [ row?.videoid, JSON.parse( `${ row?.microdata }` )?.items[ 0 ]?.snippet?.title ], {
			id: 'title',
			cell: ( val ) => <a href={ `https://youtu.be/${ val?.getValue()[ 0 ] }` } target="_blank" rel="noreferrer">{ val?.getValue()[ 1 ] }</a>,
			header: () => __( 'Title' ),
		} ),
		columnHelper?.accessor( ( row ) => JSON.parse( `${ row?.microdata }` )?.items[ 0 ]?.snippet?.publishedAt, {
			id: 'published',
			cell: ( val ) => new Date( val?.getValue() ).toLocaleString( window.navigator.language ),
			header: () => __( 'Published' ),
		} ),
	];
}