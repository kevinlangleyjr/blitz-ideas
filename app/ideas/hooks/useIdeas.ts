import { usePaginatedQuery } from 'blitz';
import getIdeas from 'app/ideas/queries/getIdeas';

const ITEMS_PER_PAGE = 10;

const useIdeas = ( page: number ) => {
  const [ { ideas, hasMore } ] = usePaginatedQuery( getIdeas, {
    orderBy: { id: 'asc' },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  } );

  return { ideas, hasMore };
};

export default useIdeas;
