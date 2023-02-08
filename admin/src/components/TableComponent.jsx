import { useRef } from 'react';
import {
	flexRender,
	getCoreRowModel,
	useReactTable } from '@tanstack/react-table';

import { useVirtual } from 'react-virtual';

import '../assets/styles/components/_TableComponent.scss';

export default function Table( { children, className, columns, data } ) {
	const tableContainerRef = useRef();
	const table = useReactTable( {
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
	} );

	const tbody = [];

	const { rows } = table.getRowModel();

	const rowVirtualizer = useVirtual( {
		parentRef: tableContainerRef,
		size: rows.length,
		overscan: 10,
	} );

	const { virtualItems: virtualRows, totalSize } = rowVirtualizer;
	const paddingTop = virtualRows.length > 0 ? virtualRows?.[ 0 ]?.start || 0 : 0;
	const paddingBottom =
		virtualRows.length > 0
			? totalSize - ( virtualRows?.[ virtualRows.length - 1 ]?.end || 0 )
			: 0;

	for ( const virtualRow of virtualRows ) {
		const row = rows[ virtualRow.index ];
		tbody.push(
			<tr key={ row.id }>
				{ row.getVisibleCells().map( ( cell ) =>
					( <td key={ cell.id } className={ cell.column.columnDef.className }>
						{ flexRender( cell.column.columnDef.cell, cell.getContext() ) }
						{ /* { console.log( cell.getContext() ) } */ }
					</td> )
				) }
			</tr>
		);
	}

	return (
		<div className="urlslab-table-container" ref={ tableContainerRef }>
			<table className={ `urlslab-table urlslab-table-${ className }` }>
				<thead className="urlslab-table-head">
					{ table.getHeaderGroups().map( ( headerGroup ) => (
						<tr key={ headerGroup.id }>
							{ headerGroup.headers.map( ( header ) => (
								<th key={ header.id }>
									{ header.isPlaceholder
										? null
										: flexRender(
											header.column.columnDef.header,
											header.getContext()
										) }
								</th>
							) ) }
						</tr>
					) ) }
				</thead>
				<tbody className="urlslab-table-body" >
					{ paddingTop > 0 && (
						<tr>
							<td style={ { height: `${ paddingTop }px` } } />
						</tr>
					) }
					{ tbody }
					{ paddingBottom > 0 && (
						<tr>
							<td style={ { height: `${ paddingBottom }px` } } />
						</tr>
					) }
				</tbody>
			</table>
			{ children }
		</div>
	);
}