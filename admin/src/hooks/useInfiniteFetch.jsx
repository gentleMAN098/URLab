import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchData } from '../api/fetching';

export default function useInfiniteFetch( options, maxRows = 50 ) {
	const { ref, inView } = useInView();
	const { key, url, pageId } = options;
	const query = useInfiniteQuery( {
		queryKey: [ key, url ],
		queryFn: ( { pageParam = '' } ) => {
			return fetchData( `${ key }?from_${ pageId }=${ pageParam }${ url }&rows_per_page=${ maxRows }` );
		},
		getNextPageParam: ( allRows ) => {
			if ( allRows.length < maxRows ) {
				return undefined;
			}
			const lastRowId = allRows[ allRows?.length - 1 ][ pageId ] ?? undefined;
			return lastRowId;
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
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage } = query;

	useEffect( () => {
		if ( inView ) {
			fetchNextPage();
		}
	}, [ inView, fetchNextPage ] );

	return { data,
		status,
		isSuccess,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage, ref };
}