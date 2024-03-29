import { useMemo, useEffect } from 'react';
import { useI18n } from '@wordpress/react-i18n';
import { createColumnHelper } from '@tanstack/react-table';
import { useInView } from 'react-intersection-observer';

import { useInfiniteQuery } from '@tanstack/react-query';
import { postFetch } from '../api/fetching';
import filtersArray from '../lib/filtersArray';

import { create } from 'zustand';

export const fetchingStore = create( ( set ) => ( {
	fetchingStatus: false,
	setFetchingStatus: () => set( ( state ) => ( { fetchingStatus: ! state.fetchingStatus } ) ),
} ) );

export default function useInfiniteFetch( options, maxRows = 50 ) {
	const { __ } = useI18n();
	const columnHelper = useMemo( () => createColumnHelper(), [] );
	const { ref, inView } = useInView();
	const { key, filters: userFilters, sorting, paginationId } = options;

	const sortingArray = sorting ? sorting.map( ( sortingObj ) => {
		const { key: keyName, dir } = sortingObj;
		return { col: keyName, dir };
	} ) : [];

	const query = useInfiniteQuery( {
		queryKey: [ key, filtersArray( userFilters ), sorting ],
		queryFn: async ( { pageParam = '' } ) => {
			const { lastRowId, sortingFilters, sortingFiltersLastValue } = pageParam;
			const response = await postFetch( key, {
				sorting: [ ...sortingArray, { col: paginationId, dir: 'ASC' } ],
				filters: sortingFilters
					? [
						{ cond: 'OR',
							filters: [
								{ cond: 'AND', filters: [ ...sortingFiltersLastValue, { col: paginationId, op: '>', val: lastRowId } ] },
								...sortingFilters,
							],
						},
						...filtersArray( userFilters ),
					]
					: [ ...filtersArray( userFilters ) ],
				rows_per_page: maxRows,
			} );
			return response.json();
		},
		getNextPageParam: ( allRows ) => {
			if ( allRows.length < maxRows ) {
				return undefined;
			}
			const lastRowId = allRows[ allRows?.length - 1 ][ paginationId ] ?? undefined;
			const sortingFilters = sorting ? sorting.map( ( sortingObj ) => {
				const { key: keyName, op } = sortingObj;
				return { col: keyName, op, val: allRows[ allRows?.length - 1 ][ keyName ] };
			} ) : [];
			const sortingFiltersLastValue = sorting ? sorting.map( ( sortingObj ) => {
				const { key: keyName } = sortingObj;
				return { col: keyName, op: '=', val: allRows[ allRows?.length - 1 ][ keyName ] };
			} ) : [];
			return { lastRowId, sortingFilters, sortingFiltersLastValue };
		},
		keepPreviousData: true,
		refetchOnWindowFocus: false,
		cacheTime: Infinity,
		staleTime: Infinity,
	} );

	const {
		data,
		status,
		isSuccess,
		isFetching,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage } = query;

	const setFetchingStatus = fetchingStore( ( state ) => state.setFetchingStatus );

	if ( ! isFetching ) {
		setFetchingStatus();
	}

	useEffect( () => {
		if ( inView ) {
			fetchNextPage();
		}
	}, [ inView, key, fetchNextPage ] );

	return {
		__,
		columnHelper,
		data,
		status,
		isSuccess,
		isFetching,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage, ref };
}
