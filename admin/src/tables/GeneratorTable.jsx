import {
	useInfiniteFetch, Tooltip, Checkbox, Trash, ProgressBar, SortBy, InputField, Loader, Table, ModuleViewHeaderBottom, TooltipSortingFiltering, DateTimeFormat,
} from '../lib/tableImports';

import { langName } from '../lib/helpers';

import useTableUpdater from '../hooks/useTableUpdater';
import useChangeRow from '../hooks/useChangeRow';

export default function GeneratorTable( { slug } ) {
	const paginationId = 'generator_id';
	const { table, setTable, filters, setFilters, sorting, sortBy } = useTableUpdater( { slug } );

	const url = `${ 'undefined' === typeof filters ? '' : filters }${ 'undefined' === typeof sorting ? '' : sorting }`;

	const {
		__,
		columnHelper,
		data,
		status,
		isSuccess,
		isFetching,
		isFetchingNextPage,
		hasNextPage,
		ref,
	} = useInfiniteFetch( { key: slug, url, paginationId, filters, sorting } );

	const { row, selectedRows, selectRow, deleteRow, deleteSelectedRows, updateRow } = useChangeRow( { data, url, slug, paginationId } );

	const statusTypes = {
		A: 'Active',
		N: 'New',
		P: 'Pending',
		W: 'Waiting approval',
		D: 'Disabled',
	};

	const header = {
		command: __( 'Command' ),
		semantic_context: __( 'Context' ),
		url_filter: __( 'URL filter' ),
		lang: __( 'Language code' ),
		status: __( 'Status' ),
		status_changed: __( 'Last change' ),
		result: __( 'Result' ),
	};

	const columns = [
		columnHelper.accessor( 'check', {
			className: 'checkbox',
			cell: ( cell ) => <Checkbox checked={ cell.row.getIsSelected() } onChange={ ( val ) => {
				selectRow( val, cell );
			} } />,
			header: null,
		} ),
		columnHelper.accessor( 'command', {
			tooltip: ( cell ) => <Tooltip>{ cell.getValue() }</Tooltip>,
			header: <SortBy props={ { sorting, key: 'command', onClick: () => sortBy( 'command' ) } }>{ header.command }</SortBy>,
			size: 200,
		} ),
		columnHelper.accessor( 'semantic_context', {
			tooltip: ( cell ) => <Tooltip>{ cell.getValue() }</Tooltip>,
			header: <SortBy props={ { sorting, key: 'semantic_context', onClick: () => sortBy( 'semantic_context' ) } }>{ header.semantic_context }</SortBy>,
			size: 200,
		} ),
		columnHelper.accessor( 'url_filter', {
			tooltip: ( cell ) => <Tooltip>{ cell.getValue() }</Tooltip>,
			header: <SortBy props={ { sorting, key: 'url_filter', onClick: () => sortBy( 'url_filter' ) } }>{ header.url_filter }</SortBy>,
			size: 200,
		} ),
		columnHelper.accessor( 'lang', {
			cell: ( cell ) => langName( cell?.getValue() ),
			header: <SortBy props={ { sorting, key: 'lang', onClick: () => sortBy( 'lang' ) } }>{ header.lang }</SortBy>,
			size: 165,
		} ),
		columnHelper.accessor( 'result', {
			className: 'nolimit',
			tooltip: ( cell ) => <Tooltip>{ cell.getValue() }</Tooltip>,
			cell: ( cell ) => <InputField defaultValue={ cell.getValue() } onChange={ ( newVal ) => updateRow( { newVal, cell } ) } />,
			header: <SortBy props={ { sorting, key: 'result', onClick: () => sortBy( 'result' ) } }>{ header.result }</SortBy>,
			size: 200,
		} ),
		columnHelper.accessor( 'status', {
			filterValMenu: statusTypes,
			className: 'nolimit',
			cell: ( cell ) => statusTypes[ cell.getValue() ],
			header: <SortBy props={ { sorting, key: 'status', onClick: () => sortBy( 'status' ) } }>{ header.status }</SortBy>,
			size: 100,
		} ),
		columnHelper.accessor( 'status_changed', {
			cell: ( val ) => <DateTimeFormat datetime={ val.getValue() } />,
			header: <SortBy props={ { sorting, key: 'status_changed', onClick: () => sortBy( 'status_changed' ) } }>{ header.status_changed }</SortBy>,
			size: 100,
		} ),
		columnHelper.accessor( 'delete', {
			className: 'deleteRow',
			cell: ( cell ) => <Trash onClick={ () => deleteRow( { cell } ) } />,
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
				header={ header }
				table={ table }
				noImport
				selectedRows={ selectedRows }
				onSort={ ( val ) => sortBy( val ) }
				onDeleteSelected={ deleteSelectedRows }
				onFilter={ ( filter ) => setFilters( filter ) }
				exportOptions={ {
					slug,
					filters,
					fromId: `from_${ paginationId }`,
					paginationId,
					deleteCSVCols: [ paginationId, 'generator_id' ],
				} }
			/>
			<Table className="fadeInto"
				slug={ slug }
				columns={ columns }
				returnTable={ ( returnTable ) => setTable( returnTable ) }
				data={
					isSuccess && data?.pages?.flatMap( ( page ) => page ?? [] )
				}
			>
				{ row
					? <Tooltip center>{ __( 'Item has been deleted.' ) }</Tooltip>
					: null
				}
				<TooltipSortingFiltering props={ { isFetching, filters, sorting } } />
				<div ref={ ref }>
					{ isFetchingNextPage ? '' : hasNextPage }
					<ProgressBar className="infiniteScroll" value={ ! isFetchingNextPage ? 0 : 100 } />
				</div>
			</Table>
		</>
	);
}
