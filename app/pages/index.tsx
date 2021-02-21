import { Suspense } from 'react';
import { Link, usePaginatedQuery, useRouter, BlitzPage } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import getIdeas from 'app/ideas/queries/getIdeas';

const ITEMS_PER_PAGE = 10;

export const IdeasList = () => {
  const router = useRouter();
  const page = Number( router.query.page ) || 0;
  const [ { ideas, hasMore } ] = usePaginatedQuery( getIdeas, {
    orderBy: { id: 'asc' },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  } );

  const goToPreviousPage = () => router.push( { query: { page: page - 1 } } );
  const goToNextPage = () => router.push( { query: { page: page + 1 } } );

  return (
    <div>
      <ul>
        { ideas.map( ( idea ) => (
          <li key={ idea.id }>
            <Link href={ `/ideas/${idea.id}` }>
              <a>{ idea.title }</a>
            </Link>
          </li>
        ) ) }
      </ul>

      <button disabled={ page === 0 } onClick={ goToPreviousPage }>
        Previous
      </button>
      <button disabled={ ! hasMore } onClick={ goToNextPage }>
        Next
      </button>
    </div>
  );
};

const Home: BlitzPage = () => {
  return <>
    <div>
      <p>
        <Link href="/ideas/new">
          <a>Create Idea</a>
        </Link>
      </p>

      <Suspense fallback={ <div>Loading...</div> }>
        <IdeasList />
      </Suspense>
    </div>
  </>;
};

Home.suppressFirstRenderFlicker = true;
Home.getLayout = ( page ) => <Layout>{ page }</Layout>;

export default Home;
