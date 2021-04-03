import { Suspense } from 'react';
import { Head, useRouter, useQuery, useMutation, useParam, BlitzPage } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import getIdea from 'app/ideas/queries/getIdea';
import updateIdea from 'app/ideas/mutations/updateIdea';
import { IdeaForm, FORM_ERROR } from 'app/ideas/components/IdeaForm';
import { UpdateIdea } from 'app/ideas/validations';

export const EditIdea = () => {
  const router = useRouter();
  const ideaId = useParam( 'ideaId', 'number' );
  const [ idea, { setQueryData } ] = useQuery( getIdea, { id: ideaId } );
  const [ updateIdeaMutation ] = useMutation( updateIdea );

  return <>
    <Head>
      <title>Edit Idea { idea.id }</title>
    </Head>

    <div className="mt-8 max-w-3xl mx-auto sm:px-6 lg:max-w-7xl">
      <h1>Edit Idea { idea.id }</h1>
      <pre>{ JSON.stringify( idea ) }</pre>

      <IdeaForm
        submitProps={ {
          className: 'flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        } }
        submitText="Update Idea"
        schema={ UpdateIdea }
        initialValues={ idea }
        onSubmit={ async ( values ) => {
          try {
            const updated = await updateIdeaMutation( {
              ...values
            } );
            await setQueryData( updated );
            router.push(
              `/ideas/${updated.id}`,
            );
          } catch ( error ) {
            console.error( error );
            return {
              [FORM_ERROR]: error.toString(),
            };
          }
        } }
      />
    </div>
  </>;
};

const EditIdeaPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={ <div>Loading...</div> }>
        <EditIdea />
      </Suspense>
    </div>
  );
};

EditIdeaPage.authenticate = true;
EditIdeaPage.getLayout = ( page ) => <Layout>{ page }</Layout>;

export default EditIdeaPage;
