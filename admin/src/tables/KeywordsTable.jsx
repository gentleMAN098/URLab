
import {
	useInfiniteFetch, handleSelected, RangeSlider, SortMenu, LangMenu, InputField, Checkbox, MenuInput, Button, Trash, Loader, Table, ModuleViewHeaderBottom,
} from '../constants/tableImports';

import useTableUpdater from '../hooks/useTableUpdater';

export default function KeywordsTable( { slug } ) {
	const { tableHidden, setHiddenTable, filters, currentFilters, addFilter, removeFilters, sortingColumn, sortBy, deleteRow, updateRow } = useTableUpdater();

	const url = `${ filters }${ sortingColumn }`;
	const pageId = 'kw_id';

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

	const keywordTypes = {
		M: __( 'Manual' ),
		I: __( 'Imported' ),
		X: __( 'None' ),
	};

	const header = {
		kw_id: __( 'None' ),
		keyword: __( 'Keyword' ),
		kwType: __( 'Type' ),
		kw_length: __( 'Length' ),
		kw_priority: __( 'Priority' ),
		kw_usage_count: __( 'Usage' ),
		lang: __( 'Language' ),
		link_usage_count: __( 'Link Usage' ),
		urlFilter: __( 'URL Filter' ),
		urlLink: __( 'Link' ),
	};

	const columns = [
		columnHelper.accessor( 'delete', {
			className: 'deleteRow',
			cell: ( cell ) => <Button danger onClick={ () => deleteRow( { data, url, slug, cell, rowSelector: pageId } ) }><Trash /></Button>,
			header: () => __( '' ),
			enableResizing: false,
			maxSize: 0,
			size: 0,
		} ),
		columnHelper.accessor( 'check', {
			className: 'checkbox',
			cell: ( cell ) => <Checkbox checked={ cell.row.getIsSelected() } onChange={ ( val ) => {
				handleSelected( val, cell );
			} } />,
			header: () => __( '' ),
			enableResizing: false,
			maxSize: 24,
			size: 24,
		} ),
		columnHelper.accessor( 'keyword', {
			header: () => <MenuInput isFilter placeholder="Enter keyword" defaultValue={ currentFilters.keyword } onChange={ ( val ) => addFilter( 'keyword', val ) }>{ header.keyword }</MenuInput>,
			minSize: 150,
		} ),
		columnHelper.accessor( 'kwType', {
			cell: ( cell ) => <SortMenu items={ keywordTypes } name={ cell.column.id } checkedId={ cell.getValue() } onChange={ ( newVal ) => updateRow( { data, newVal, url, slug, cell, rowSelector: pageId } ) } />,
			header: ( cell ) => <SortMenu isFilter items={ keywordTypes } name={ cell.column.id } checkedId={ currentFilters.kwType || '' } onChange={ ( val ) => addFilter( 'kwType', val ) }>{ header.kwType }</SortMenu>,
		} ),
		columnHelper.accessor( 'kw_length', {
			header: () => header.kw_length,
			size: 70,
		} ),
		columnHelper.accessor( 'kw_priority', {
			cell: ( cell ) => <InputField type="number" defaultValue={ cell.getValue() }
				onChange={ ( newVal ) => updateRow( { data, newVal, url, slug, cell, rowSelector: pageId } ) } />,
			header: () => <RangeSlider isFilter min="0" max="255" onChange={ ( r ) => console.log( r ) }>{ header.kw_priority }</RangeSlider>,
		} ),
		columnHelper.accessor( 'kw_usage_count', {
			header: () => header.kw_usage_count,
			size: 70,
		} ),
		columnHelper.accessor( 'lang', {
			cell: ( cell ) => <LangMenu checkedId={ cell?.getValue() }
				onChange={ ( newVal ) => updateRow( { data, newVal, url, slug, cell, rowSelector: pageId } ) }
			/>,
			header: () => <LangMenu isFilter checkedId={ currentFilters.lang || 'all' } onChange={ ( val ) => addFilter( 'lang', val ) }>{ header.lang }</LangMenu>,
			size: 165,
		} ),
		columnHelper.accessor( 'link_usage_count', {
			header: () => header.link_usage_count,
		} ),
		columnHelper.accessor( 'urlFilter', {
			cell: ( cell ) => <InputField defaultValue={ cell.renderValue() }
				onChange={ ( newVal ) => updateRow( { data, newVal, url, slug, cell, rowSelector: pageId } ) } />,
			header: () => header.urlFilter,
		} ),
		columnHelper.accessor( 'urlLink', {
			cell: ( cell ) => <a href={ cell.getValue() } title={ cell.getValue() } target="_blank" className="limit-50" rel="noreferrer">{ cell.getValue() }</a>,
			header: () => <MenuInput isFilter placeholder="Enter URL" onChange={ ( val ) => addFilter( 'urlLink', val ) }>{ header.urlLink }</MenuInput>,
			enableResizing: false,
			minSize: '30em',
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
				removedFilters={ ( array ) => removeFilters( array ) }
				exportOptions={ {
					url: slug,
					filters,
					fromId: 'from_kw_id',
					pageId: 'kw_id',
					deleteCSVCols: [ 'kw_id', 'destUrlMd5' ],
				} }
				hideTable={ ( hidden ) => setHiddenTable( hidden ) }
			>
				<div className="ma-left flex flex-align-center">
					<strong>Sort by:</strong>
					<SortMenu className="ml-s" items={ header } name="sorting" onChange={ ( val ) => sortBy( val ) } />
				</div>
			</ModuleViewHeaderBottom>
			{ tableHidden
				? null
				: <Table className="fadeInto"
						resizable
						slug={ slug }
						columns={ columns }
						data={ isSuccess && data?.pages?.flatMap( ( page ) => page ?? [] ) }>
					<button ref={ ref }>{ isFetchingNextPage ? 'Loading more...' : hasNextPage }</button>
				</Table>
			}
		</>
	);
}
