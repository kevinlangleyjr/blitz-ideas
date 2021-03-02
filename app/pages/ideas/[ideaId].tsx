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

    <div>
      <h1>Idea { idea.id }</h1>
      <h2>{ idea.title }</h2>
      <p>{ idea.body }</p>

      <Link href={ `/ideas/${idea.id}/edit` }>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={ async () => {
          if ( window.confirm( 'This will be deleted' ) ) {
            try {
              await deleteIdeaMutation( { id: idea.id } );
              router.push( '/ideas' );
            } catch( error ) {
              console.error( error );
            }
          }
        } }
        style={ { marginLeft: '0.5rem' } }
      >
        Delete
      </button>
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
