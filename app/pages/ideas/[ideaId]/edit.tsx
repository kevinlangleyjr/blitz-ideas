import { Suspense } from 'react';
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import getIdea from 'app/ideas/queries/getIdea';
import updateIdea from 'app/ideas/mutations/updateIdea';
import { IdeaForm, FORM_ERROR } from 'app/ideas/components/IdeaForm';

export const EditIdea = () => {
  const router = useRouter();
  const ideaId = useParam( 'ideaId', 'number' );
  const [ idea, { setQueryData } ] = useQuery( getIdea, { id: ideaId } );
  const [ updateIdeaMutation ] = useMutation( updateIdea );

  return <>
    <Head>
      <title>Edit Idea { idea.id }</title>
    </Head>

    <div>
      <h1>Edit Idea { idea.id }</h1>
      <pre>{ JSON.stringify( idea ) }</pre>

      <IdeaForm
        submitText="Update Idea"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={UpdateIdea}
        initialValues={ idea }
        onSubmit={ async ( values ) => {
          try {
            const updated = await updateIdeaMutation( {
              id: idea.id,
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

      <p>
        <Link href="/ideas">
          <a>Ideas</a>
        </Link>
      </p>
    </div>
  );
};

EditIdeaPage.authenticate = true;
EditIdeaPage.getLayout = ( page ) => <Layout>{ page }</Layout>;

export default EditIdeaPage;
