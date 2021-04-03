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
            <img className="h-16 w-16 border-2 border-gray-500" src="/user.svg" alt="" />
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

      { ( page !== 0 || hasMore ) && (
        <div className="flex align-middle justify-between">
          <button
            disabled={ page === 0 }
            onClick={ goToPreviousPage }
            className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
              Previous
          </button>
          <button
            disabled={ ! hasMore }
            onClick={ goToNextPage }
            className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
              Next
          </button>
        </div>
      ) }
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
