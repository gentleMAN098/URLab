import {
	useInfiniteFetch,
	ProgressBar,
	SortBy,
	Trash,
	Checkbox,
	Loader,
	Table,
	ModuleViewHeaderBottom,
	TooltipSortingFiltering,
	InputField, SingleSelectMenu,
} from '../lib/tableImports';

import useTableUpdater from '../hooks/useTableUpdater';
import useChangeRow from '../hooks/useChangeRow';
import useTablePanels from '../hooks/useTablePanels';

import '../assets/styles/components/_ModuleViewHeader.scss';

export default function SchedulesTable( { slug } ) {
	const paginationId = 'schedule_id';
	const { table, setTable, filters, sorting, sortBy } = useTableUpdater( { slug } );

	const url = { filters, sorting };

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
	} = useInfiniteFetch( { key: slug, filters, sorting, paginationId } );

	const { selectedRows, selectRow, deleteRow, deleteSelectedRows } = useChangeRow( { data, url, slug, paginationId } );

	const setRowToEdit = useTablePanels( ( state ) => state.setRowToEdit );
	const rowToEdit = useTablePanels( ( state ) => state.rowToEdit );

	const followLinksTypes = {
		FOLLOW_ALL_LINKS: __( 'Follow all links' ),
		FOLLOW_NO_LINK: __( 'Do not follow' ),
	};
	const analyzeTextTypes = {
		1: __( 'Analyze page text (Recommended)' ),
		0: __( 'Do not analyze text' ),
	};
	const processSitemapsTypes = {
		1: __( 'Process all sitemaps of domain (Recommended)' ),
		0: __( 'Schedule just single URL' ),
	};
	const takeScreenshotsTypes = {
		1: __( 'Screenshot every page of domain (Recommended)' ),
		0: __( 'Do not take screenshots' ),
	};

	const scanFrequencyTypes = {
		ONE_TIME: 'One Time',
		YEARLY: 'Yearly',
		MONTHLY: 'Monthly',
		DAILY: 'Daily',
		WEEKLY: 'Weekly',
		HOURLY: 'Hourly',
	};

	const header = {
		urls: __( 'URLs' ),
		analyze_text: __( 'Analyse text' ),
		follow_links: __( 'Follow links' ),
		process_all_sitemaps: __( 'Process all sitemaps' ),
		take_screenshot: __( 'Take screenshots' ),
		custom_sitemaps: __( 'Sitemaps' ),
		scan_frequency: __( 'Scan frequency' ),
		scan_speed_per_minute: __( 'Scan speed (pages per minute)' ),
	};
	const rowEditorCells = {
		urls: <InputField liveUpdate defaultValue="" label={ header.urls } onChange={ ( val ) => setRowToEdit( { ...rowToEdit, urls: val } ) } required />,
		analyze_text: <SingleSelectMenu defaultAccept autoClose items={ analyzeTextTypes } name="analyze_text" defaultValue="1" onChange={ ( val ) => setRowToEdit( { ...rowToEdit, analyze_text: val } ) }>{ header.analyze_text }</SingleSelectMenu>,
		follow_links: <SingleSelectMenu defaultAccept autoClose items={ followLinksTypes } name="follow_links" defaultValue={ 'FOLLOW_ALL_LINKS' } onChange={ ( val ) => setRowToEdit( { ...rowToEdit, follow_links: val } ) }>{ header.follow_links }</SingleSelectMenu>,
		process_all_sitemaps: <SingleSelectMenu defaultAccept autoClose items={ processSitemapsTypes } name="process_all" defaultValue="1" onChange={ ( val ) => setRowToEdit( { ...rowToEdit, process_all_sitemaps: val } ) }>{ header.process_all_sitemaps }</SingleSelectMenu>,
		custom_sitemaps: <InputField liveUpdate defaultValue="" label={ header.custom_sitemaps } onChange={ ( val ) => setRowToEdit( { ...rowToEdit, custom_sitemaps: val } ) } />,
		take_screenshot: <SingleSelectMenu defaultAccept autoClose items={ takeScreenshotsTypes } name="take_screenshot" defaultValue="1" onChange={ ( val ) => setRowToEdit( { ...rowToEdit, take_screenshot: val } ) }>{ header.take_screenshot }</SingleSelectMenu>,
		scan_frequency: <SingleSelectMenu defaultAccept autoClose items={ scanFrequencyTypes } name="scan_frequency" defaultValue={ 'ONE_TIME' } onChange={ ( val ) => setRowToEdit( { ...rowToEdit, scan_frequency: val } ) }>{ header.scan_frequency }</SingleSelectMenu>,
		scan_speed_per_minute: <InputField liveUpdate defaultValue="20" label={ header.scan_speed_per_minute } onChange={ ( val ) => setRowToEdit( { ...rowToEdit, scan_speed_per_minute: val } ) } />,
	};
	const columns = [
		columnHelper?.accessor( 'urls', {
			className: 'nolimit',
			cell: ( array ) => array?.getValue().map( ( link ) => <><a href={ link } target="_blank" rel="noreferrer" key={ link }>{ link }</a>, </>,
			),
			header: ( th ) => <SortBy props={ { header, sorting, th, onClick: () => sortBy( th ) } }>{ header.urls }</SortBy>,
			size: 300,
		} ),
		columnHelper?.accessor( 'follow_links', {
			filterValMenu: followLinksTypes,
			cell: ( cell ) => followLinksTypes[ cell?.getValue() ],
			header: ( th ) => <SortBy props={ { header, sorting, th, onClick: () => sortBy( th ) } }>{ header.follow_links }</SortBy>,
			size: 100,
		} ),
		columnHelper?.accessor( 'analyze_text', {
			cell: ( cell ) => <Checkbox readOnly className="readOnly" defaultValue={ cell.getValue() } />,
			header: ( th ) => <SortBy props={ { header, sorting, th, onClick: () => sortBy( th ) } }>{ header.analyze_text }</SortBy>,
			size: 90,
		} ),
		columnHelper?.accessor( 'take_screenshot', {
			cell: ( cell ) => <Checkbox readOnly className="readOnly" defaultValue={ cell.getValue() } />,
			header: ( th ) => <SortBy props={ { header, sorting, th, onClick: () => sortBy( th ) } }>{ header.take_screenshot }</SortBy>,
			size: 90,
		} ),
		columnHelper?.accessor( 'process_all_sitemaps', {
			cell: ( cell ) => <Checkbox readOnly className="readOnly" defaultValue={ cell.getValue() } />,
			header: ( th ) => <SortBy props={ { header, sorting, th, onClick: () => sortBy( th ) } }>{ header.process_all_sitemaps }</SortBy>,
			size: 90,
		} ),
		columnHelper?.accessor( 'custom_sitemaps', {
			cell: ( array ) => array?.getValue().map( ( sitemap ) => <><a href={ sitemap } target="_blank" rel="noreferrer" key={ sitemap }>{ sitemap }</a>, </>,
			),
			header: ( th ) => <SortBy props={ { header, sorting, th, onClick: () => sortBy( th ) } }>{ header.custom_sitemaps }</SortBy>,
			size: 150,
		} ),
		columnHelper.accessor( 'scan_frequency', {
			filterValMenu: scanFrequencyTypes,
			cell: ( cell ) => scanFrequencyTypes[ cell?.getValue() ],
			header: ( th ) => <SortBy props={ { header, sorting, th, onClick: () => sortBy( th ) } }>{ header.scan_frequency }</SortBy>,
			size: 90,
		} ),
		columnHelper.accessor( 'scan_speed_per_minute', {
			header: ( th ) => <SortBy props={ { header, sorting, th, onClick: () => sortBy( th ) } }>{ header.scan_speed_per_minute }</SortBy>,
			size: 90,
		} ),
		columnHelper.accessor( 'editRow', {
			className: 'editRow',
			cell: ( cell ) => <Trash onClick={ () => deleteRow( { cell, id: 'urls' } ) } />,
			header: null,
			size: 60,
		} ),
	];

	if ( status === 'loading' ) {
		return <Loader />;
	}

	return (
		<>
			<ModuleViewHeaderBottom
				table={ table }
				noFiltering
				noCount
				noExport
				noImport
				noDelete
				selectedRows={ selectedRows }
				onDeleteSelected={ () => deleteSelectedRows( { id: 'urls' } ) }
				options={ { header, rowEditorCells, title: 'Add schedule', data, slug, url, paginationId, rowToEdit, id: 'urls' } }
			/>
			<Table className="noHeightLimit fadeInto"
				slug={ slug }
				returnTable={ ( returnTable ) => setTable( returnTable ) }
				columns={ columns }
				data={ isSuccess && data?.pages?.flatMap( ( page ) => page ?? [] ) }
			>
				<TooltipSortingFiltering props={ { isFetching, filters, sorting } } />
				<div ref={ ref }>
					{ isFetchingNextPage ? '' : hasNextPage }
					<ProgressBar className="infiniteScroll" value={ ! isFetchingNextPage ? 0 : 100 } />
				</div>
			</Table>
		</>
	);
}
