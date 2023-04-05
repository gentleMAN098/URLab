import { useMemo } from 'react';
import {
	useInfiniteFetch, ProgressBar, Tooltip, Checkbox, InputField, SortMenu, Trash, Loader, Table, ModuleViewHeaderBottom,
} from '../lib/tableImports';

import useTableUpdater from '../hooks/useTableUpdater';
import useChangeRow from '../hooks/useChangeRow';

export default function RedirectsTable( { slug } ) {
	const pageId = 'redirect_id';

	const { table, setTable, rowToInsert, setInsertRow, filters, setFilters, sortingColumn, sortBy } = useTableUpdater( { slug } );

	const url = useMemo( () => `${ filters }${ sortingColumn }`, [ filters, sortingColumn ] );

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

	const { row, rowsSelected, selectRow, deleteRow, updateRow } = useChangeRow( { data, url, slug, pageId } );

	const redirectTypes = {
		301: '301 Moved Permanently',
		302: '302 Found, Moved temporarily',
		303: '303 See Other',
		307: '307 Temporary Redirect',
		308: '308 Permanent Redirect',
	};

	const matchTypes = {
		E: 'Exact match',
		S: 'Contains',
		R: 'Regexp',
	};

	const logginTypes = {
		Y: 'Logged in',
		N: 'Not logged',
		A: 'Any',
	};

	const notFoundTypes = {
		Y: 'Page Not Found',
		N: 'Page Found',
		A: 'Any',
	};

	const header = {
		match_type: __( 'Match type' ),
		match_url: __( 'URL' ),
		replace_url: __( 'Redirect to URL' ),
		redirect_code: __( 'HTTP Code' ),
		is_logged: __( 'Is Logged in' ),
		capabilities: __( 'Capabilities' ),
		roles: __( 'Roles' ),
		browser: __( 'Browser' ),
		cookie: __( 'Cookies' ),
		headers: __( 'Request headers' ),
		params: __( 'Request parameters' ),
		if_not_found: __( 'Page status' ),
		cnt: __( 'Redirects Count' ),
	};

	const inserterCells = {
		match_type: <SortMenu defaultAccept autoClose items={ matchTypes } name="match_type" checkedId="E" onChange={ ( val ) => setInsertRow( { ...rowToInsert, match_type: val } ) }>{ header.match_type }</SortMenu>,
		match_url: <InputField type="url" liveUpdate defaultValue="" label={ header.match_url } onChange={ ( val ) => setInsertRow( { ...rowToInsert, match_url: val } ) } required />,
		replace_url: <InputField type="url" liveUpdate defaultValue="" label={ header.replace_url } onChange={ ( val ) => setInsertRow( { ...rowToInsert, replace_url: val } ) } required />,
		redirect_code: <SortMenu autoClose items={ redirectTypes } name="redirect_code" checkedId="301" onChange={ ( val ) => setInsertRow( { ...rowToInsert, redirect_code: val } ) }>{ header.redirect_code }</SortMenu>,
		is_logged: <SortMenu autoClose items={ logginTypes } name="is_logged" checkedId="A" onChange={ ( val ) => setInsertRow( { ...rowToInsert, is_logged: val } ) }>{ header.is_logged }</SortMenu>,
		headers: <InputField liveUpdate defaultValue="" label={ header.headers } onChange={ ( val ) => setInsertRow( { ...rowToInsert, headers: val } ) } />,
		cookie: <InputField liveUpdate defaultValue="" label={ header.cookie } onChange={ ( val ) => setInsertRow( { ...rowToInsert, cookie: val } ) } />,
		params: <InputField liveUpdate defaultValue="" label={ header.params } onChange={ ( val ) => setInsertRow( { ...rowToInsert, capabilities: val } ) } />,
		capabilities: <InputField liveUpdate defaultValue="" label={ header.capabilities } onChange={ ( val ) => setInsertRow( { ...rowToInsert, capabilities: val } ) } />,
		roles: <InputField liveUpdate defaultValue="" label={ header.roles } onChange={ ( val ) => setInsertRow( { ...rowToInsert, roles: val } ) } />,
		browser: <InputField liveUpdate defaultValue="" label={ header.browser } onChange={ ( val ) => setInsertRow( { ...rowToInsert, browser: val } ) } />,
		if_not_found: <SortMenu autoClose items={ notFoundTypes } name="if_not_found" checkedId="A" onChange={ ( val ) => setInsertRow( { ...rowToInsert, if_not_found: val } ) }>{ header.if_not_found }</SortMenu>,
	};

	const columns = [
		columnHelper.accessor( 'check', {
			className: 'checkbox',
			cell: ( cell ) => <Checkbox checked={ cell.row.getIsSelected() } onChange={ ( val ) => {
				selectRow( val, cell );
			} } />,
			header: null,
		} ),
		columnHelper.accessor( 'match_type', {
			filterValMenu: matchTypes,
			className: 'nolimit',
			cell: ( cell ) => <SortMenu items={ matchTypes } name={ cell.column.id } checkedId={ cell.getValue() } onChange={ ( newVal ) => updateRow( { newVal, cell } ) } />,
			header: header.match_type,
			size: 80,
		} ),
		columnHelper.accessor( 'match_url', {
			className: 'nolimit',
			cell: ( cell ) => <InputField defaultValue={ cell.getValue() } onChange={ ( newVal ) => updateRow( { newVal, cell } ) } />,
			header: header.match_url,
			size: 200,
		} ),
		columnHelper.accessor( 'replace_url', {
			className: 'nolimit',
			cell: ( cell ) => <InputField defaultValue={ cell.getValue() } onChange={ ( newVal ) => updateRow( { newVal, cell } ) } />,
			header: header.replace_url,
			size: 100,
		} ),
		columnHelper.accessor( 'redirect_code', {
			filterValMenu: redirectTypes,
			className: 'nolimit',
			cell: ( cell ) => <SortMenu items={ redirectTypes } name={ cell.column.id } checkedId={ cell.getValue() } onChange={ ( newVal ) => updateRow( { newVal, cell } ) } />,
			header: header.redirect_code,
			size: 100,
		} ),
		columnHelper.accessor( 'if_not_found', {
			filterValMenu: notFoundTypes,
			className: 'nolimit',
			cell: ( cell ) => <SortMenu items={ notFoundTypes } name={ cell.column.id } checkedId={ cell.getValue() } onChange={ ( newVal ) => updateRow( { newVal, cell } ) } />,
			header: header.if_not_found,
			size: 100,
		} ),
		columnHelper.accessor( 'is_logged', {
			filterValMenu: logginTypes,
			className: 'nolimit',
			cell: ( cell ) => <SortMenu items={ logginTypes } name={ cell.column.id } checkedId={ cell.getValue() } onChange={ ( newVal ) => updateRow( { newVal, cell } ) } />,
			header: header.is_logged,
			size: 100,
		} ),
		columnHelper.accessor( 'capabilities', {
			className: 'nolimit',
			cell: ( cell ) => <InputField defaultValue={ cell.getValue() } onChange={ ( newVal ) => updateRow( { newVal, cell } ) } />,
			header: header.capabilities,
			size: 100,
			show: false,
		} ),
		columnHelper.accessor( 'roles', {
			header: header.roles,
			size: 100,
		} ),
		columnHelper.accessor( 'browser', {
			className: 'nolimit',
			cell: ( cell ) => <InputField defaultValue={ cell.getValue() } onChange={ ( newVal ) => updateRow( { newVal, cell } ) } />,
			header: header.browser,
			size: 100,
			show: false,
		} ),
		columnHelper.accessor( 'cookie', {
			className: 'nolimit',
			cell: ( cell ) => <InputField defaultValue={ cell.getValue() } onChange={ ( newVal ) => updateRow( { newVal, cell } ) } />,
			header: header.cookie,
			size: 100,
		} ),
		columnHelper.accessor( 'headers', {
			className: 'nolimit',
			cell: ( cell ) => <InputField defaultValue={ cell.getValue() } onChange={ ( newVal ) => updateRow( { newVal, cell } ) } />,
			header: header.headers,
			size: 100,
		} ),
		columnHelper.accessor( 'params', {
			className: 'nolimit',
			cell: ( cell ) => <InputField defaultValue={ cell.getValue() } onChange={ ( newVal ) => updateRow( { newVal, cell } ) } />,
			header: header.params,
			size: 100,
		} ),
		columnHelper.accessor( 'cnt', {
			header: header.cnt,
			size: 100,
		} ),
		columnHelper.accessor( 'delete', {
			className: 'deleteRow',
			cell: ( cell ) => <Trash onClick={ () => deleteRow( { cell } ) } />,
			header: () => null,
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
				onSort={ ( val ) => sortBy( val ) }
				onFilter={ ( filter ) => setFilters( filter ) }
				insertOptions={ { inserterCells, title: 'Add redirect', data, slug, url, pageId, rowToInsert } }
				exportOptions={ {
					url: slug,
					filters,
					fromId: `from_${ pageId }`,
					pageId,
					deleteCSVCols: [ pageId ],
				} }
			/>
			<Table className="fadeInto"
				slug={ slug }
				returnTable={ ( returnTable ) => setTable( returnTable ) }
				initialState={ { columnVisibility: { is_logged: false, header: false, params: false, capabilities: false, if_not_found: false, browser: false, cookie: false } } }
				columns={ columns }
				data={ isSuccess && data?.pages?.flatMap( ( page ) => page ?? [] ) }
			>
				{ row
					? <Tooltip center>{ `${ header.str_search } “${ row.str_search }”` } { __( 'has been deleted.' ) }</Tooltip>
					: null
				}
				<div ref={ ref }>
					{ isFetchingNextPage ? '' : hasNextPage }
					<ProgressBar className="infiniteScroll" value={ ! isFetchingNextPage ? 0 : 100 } />
				</div>
			</Table>
		</>
	);
}