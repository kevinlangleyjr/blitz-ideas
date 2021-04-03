import { Suspense } from 'react';
import { Head, Link, useRouter, useParam, BlitzPage, useMutation } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import IdeaCommentsList from 'app/comments/components/IdeaComments';
import useIdea from 'app/ideas/hooks/useIdea';
import deleteIdea from 'app/ideas/mutations/deleteIdea';

export const Idea = () => {
  const router = useRouter();
  const ideaId = useParam( 'ideaId', 'number' );
  const [ deleteIdeaMutation ] = useMutation( deleteIdea );
  const idea = useIdea( ideaId );

  return <>
    <Head>
      <title>Idea { idea.id }</title>
    </Head>

    <div className="mt-8 max-w-3xl mx-auto sm:px-6 lg:max-w-7xl">
      <article key={ idea.id }>
        <div className="flex">
          <div className="mr-4 flex-shrink-0">
            <img className="h-12 w-12 border-2 border-gray-500" src="/user.svg" alt="" />
          </div>
          <div>
            <h1 className="text-lg font-bold">{ idea.title }</h1>
            <p className="mt-1">
              { idea.body }
            </p>
          </div>
        </div>
        <footer className="flex mt-3">
          <Link href={ `/ideas/${idea.id}/edit` }>
            <a className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Edit</a>
          </Link>
          <button
            type="button"
            onClick={ async () => {
              if ( window.confirm( 'This will be deleted' ) ) {
                try {
                  await deleteIdeaMutation( { id: idea.id } );
                  router.push( '/ideas' );
                } catch ( error ) {
                  console.error( error );
                }
              }
            } }
            className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-2"
          >
            Delete
          </button>
        </footer>
      </article>
    </div>
  </>;
};

const ShowIdeaPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={ <div>Loading...</div> }>
        <Idea />
        <IdeaCommentsList />
      </Suspense>
    </div>
  );
};

ShowIdeaPage.getLayout = ( page ) => <Layout>{ page }</Layout>;

export default ShowIdeaPage;
