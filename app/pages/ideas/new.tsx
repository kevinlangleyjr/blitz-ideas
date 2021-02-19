import { Link, useRouter, useMutation, BlitzPage } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import createIdea from 'app/ideas/mutations/createIdea';
import { IdeaForm, FORM_ERROR } from 'app/ideas/components/IdeaForm';

const NewIdeaPage: BlitzPage = () => {
  const router = useRouter();
  const [ createIdeaMutation ] = useMutation( createIdea );

  return (
    <div>
      <h1>Create New Idea</h1>

      <IdeaForm
        submitText="Create Idea"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateIdea}
        // initialValues={{}}
        onSubmit={ async ( values ) => {
          try {
            const idea = await createIdeaMutation(
              values,
            );
            if ( idea?.id ) {
              router.push(
                `/ideas/${idea.id}`,
              );
            }
          } catch ( error ) {
            console.error( error );
            return {
              [FORM_ERROR]: error.toString(),
            };
          }
        } }
      />

      <p>
        <Link href="/ideas">
          <a>Ideas</a>
        </Link>
      </p>
    </div>
  );
};

NewIdeaPage.authenticate = true;
NewIdeaPage.getLayout = ( page ) => (
  <Layout title={ 'Create New Idea' }>{ page }</Layout>
);

export default NewIdeaPage;
