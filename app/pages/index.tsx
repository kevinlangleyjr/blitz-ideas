import { Suspense } from 'react';
import { Link, useRouter, BlitzPage } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import useIdeas from 'app/ideas/hooks/useIdeas';

export const IdeasList = () => {
  const router = useRouter();
  const page = Number( router.query.page ) || 0;
  const { ideas, hasMore } = useIdeas( page );

  const goToPreviousPage = () => router.push( { query: { page: page - 1 } } );
  const goToNextPage = () => router.push( { query: { page: page + 1 } } );

  return (
    <div className="mt-8 max-w-3xl mx-auto sm:px-6 lg:max-w-7xl">
      { ideas.map( ( idea ) => (
        <div className="flex" key={ idea.id }>
          <div className="mr-4 flex-shrink-0">
            <svg className="h-16 w-16 border border-gray-300 bg-white text-gray-300" preserveAspectRatio="none" stroke="currentColor" fill="none" viewBox="0 0 200 200" aria-hidden="true">
              <path vector-effect="non-scaling-stroke" strokeWidth="1" d="M0 0l200 200M0 200L200 0" />
            </svg>
          </div>
          <div>
            <Link href={ `/ideas/${idea.id}` }>
              <a>
                <h4 className="text-lg font-bold">{ idea.title }</h4>
              </a>
            </Link>
            <p className="mt-1">
              { idea.body }
            </p>
          </div>
        </div>
      ) ) }

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
  return (
    <div>
      <Suspense fallback={ <div>Loading...</div> }>
        <IdeasList />
      </Suspense>
    </div>
  );
};

Home.suppressFirstRenderFlicker = true;
Home.getLayout = ( page ) => <Layout>{ page }</Layout>;

export default Home;
