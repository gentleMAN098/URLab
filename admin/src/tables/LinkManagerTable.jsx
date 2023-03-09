import {
	useInfiniteFetch, handleSelected, Tooltip, Trash, MenuInput, InputField, SortMenu, Checkbox, Loader, Table, ModuleViewHeaderBottom,
} from '../constants/tableImports';

import useTableUpdater from '../hooks/useTableUpdater';

export default function LinkManagerTable( { slug } ) {
	const { filters, currentFilters, addFilter, removeFilters, sortingColumn, sortBy, row, deleteRow, updateRow } = useTableUpdater();

	const url = `${ filters }${ sortingColumn }`;
	const pageId = 'urlMd5';

	const {
		__,
		columnHelper,
		data,
		status,
		isSuccess,
		isFetchingNextPage,
		hasNextPage,
		ref,
	} = useInfiniteFetch( { key: slug, url, pageId } );

	const statusTypes = {
		N: __( 'New' ),
		A: __( 'Active' ),
		P: __( 'Pending' ),
		U: __( 'Updating' ),
		B: __( 'Not crawling' ),
		X: __( 'Blocked' ),
	};

	const visibilityTypes = {
		V: __( 'Visible' ),
		H: __( 'Hidden' ),
	};

	const header = {
		urlTitle: __( 'URL Title' ),
		urlMetaDescription: __( 'URL Description' ),
		screenshot_url: __( 'Screenshot' ),
		status: __( 'Status' ),
		urlName: __( 'URL' ),
		urlSummary: __( 'URL Summary' ),
		visibility: __( 'Visibility' ),
		updateStatusDate: __( 'Status Date' ),
		urlCheckDate: __( 'Check Date' ),
	};

	const columns = [
		columnHelper.accessor( 'check', {
			className: 'checkbox',
			cell: ( cell ) => <Checkbox checked={ cell.row.getIsSelected() } onChange={ ( val ) => {
				handleSelected( val, cell );
			} } />,
			header: null,
		} ),
		columnHelper?.accessor( 'screenshot_url', {
			className: 'thumbnail',
			cell: ( image ) => image?.getValue()
				? <a href={ image?.getValue() } target="_blank" rel="noreferrer"><img src={ image?.getValue() } alt={ image.row.original.urlName } /></a>
				: <div className="img"></div>,
			header: () => header.screenshot_url,
			size: 90,
		} ),
		columnHelper.accessor( 'urlTitle', {
			className: 'nolimit',
			tooltip: ( cell ) => <Tooltip>{ cell.getValue() }</Tooltip>,
			cell: ( cell ) => <InputField defaultValue={ cell.getValue() }
				onChange={ ( newVal ) => updateRow( { data, newVal, url, slug, cell, rowSelector: pageId } ) } />,
			header: () => <MenuInput isFilter placeholder="Enter URL Title" defaultValue={ currentFilters.urlTitle } onChange={ ( val ) => addFilter( 'urlTitle', val ) }>{ header.urlTitle }</MenuInput>,
			size: 150,
		} ),
		columnHelper?.accessor( 'urlMetaDescription', {
			className: 'nolimit',
			tooltip: ( cell ) => <Tooltip>{ cell.getValue() }</Tooltip>,
			cell: ( cell ) => <InputField defaultValue={ cell.getValue() }
				onChange={ ( newVal ) => updateRow( { data, newVal, url, slug, cell, rowSelector: pageId } ) } />,
			header: () => <MenuInput isFilter placeholder="Enter URL Desc" defaultValue={ currentFilters.urlMetaDescription } onChange={ ( val ) => addFilter( 'urlFilter', val ) }>{ header.urlMetaDescription }</MenuInput>,
			size: 200,
		} ),
		columnHelper.accessor( 'urlSummary', {
			className: 'nolimit',
			tooltip: ( cell ) => <Tooltip>{ cell.getValue() }</Tooltip>,
			cell: ( cell ) => <InputField defaultValue={ cell.getValue() }
				onChange={ ( newVal ) => updateRow( { data, newVal, url, slug, cell, rowSelector: pageId } ) } />,
			header: () => <MenuInput isFilter placeholder="Enter Text" defaultValue={ currentFilters.urlSummary } onChange={ ( val ) => addFilter( 'urlSummary', val ) }>{ header.urlSummary }</MenuInput>,
			size: 150,
		} ),
		columnHelper?.accessor( 'status', {
			className: 'nolimit',
			cell: ( cell ) => <SortMenu
				items={ statusTypes }
				name={ cell.column.id }
				checkedId={ cell.getValue() }
				onChange={ ( newVal ) => updateRow( { data, newVal, url, slug, cell, rowSelector: pageId } ) } />,
			header: ( cell ) => <SortMenu isFilter items={ statusTypes } name={ cell.column.id } checkedId={ currentFilters.status || '' } onChange={ ( val ) => addFilter( 'status', val ) }>{ header.status }</SortMenu>,
			size: 100,
		} ),
		columnHelper.accessor( 'updateStatusDate', {
			header: () => header.updateStatusDate,
			size: 140,
		} ),
		columnHelper.accessor( 'visibility', {
			className: 'nolimit',
			cell: ( cell ) => <SortMenu
				items={ visibilityTypes }
				name={ cell.column.id }
				checkedId={ cell.getValue() }
				onChange={ ( newVal ) => updateRow( { data, newVal, url, slug, cell, rowSelector: pageId } ) } />,
			header: ( cell ) => <SortMenu isFilter items={ visibilityTypes } name={ cell.column.id } checkedId={ currentFilters.visibility || '' } onChange={ ( val ) => addFilter( 'status', val ) }>{ header.visibility }</SortMenu>,
			size: 100,
		} ),
		columnHelper.accessor( 'urlName', {
			tooltip: ( cell ) => <Tooltip>{ cell.getValue() }</Tooltip>,
			cell: ( cell ) => <a href={ cell.getValue() } target="_blank" rel="noreferrer">{ cell.getValue() }</a>,
			header: () => <MenuInput isFilter placeholder="Enter URL Desc" defaultValue={ currentFilters.urlName } onChange={ ( val ) => addFilter( 'urlName', val ) }>{ header.urlName }</MenuInput>,
			size: 250,
		} ),
		columnHelper.accessor( 'urlCheckDate', {
			header: () => header.urlCheckDate,
			size: 140,
		} ),
		columnHelper.accessor( 'delete', {
			className: 'deleteRow',
			cell: ( cell ) => <Trash onClick={ () => deleteRow( { data, url, slug, cell, rowSelector: pageId } ) } />,
			header: null,
		} ),
	];

	if ( status === 'loading' ) {
		return <Loader />;
	}

	return (
		<>
			<ModuleViewHeaderBottom
				slug={ slug }
				currentFilters={ currentFilters }
				header={ header }
				removeFilters={ ( key ) => removeFilters( key ) }
				onSort={ ( val ) => sortBy( val ) }
				exportOptions={ {
					url: slug,
					filters,
					fromId: `from_${ pageId }`,
					pageId,
					deleteCSVCols: [ 'urlId', 'urlMd5', 'domainId' ],
					perPage: 1000,
				} }
			/>
			<Table className="fadeInto" columns={ columns }
				data={ isSuccess && data?.pages?.flatMap( ( page ) => page ?? [] ) }
			>
				{ row
					? <Tooltip center>{ `${ header.urlName } “${ row.urlName }”` } has been deleted.</Tooltip>
					: null
				}
				<button ref={ ref }>{ isFetchingNextPage ? 'Loading more...' : hasNextPage }</button>
			</Table>
		</>
	);
}
