import { useRouter, useMutation, BlitzPage } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import createIdea from 'app/ideas/mutations/createIdea';
import { IdeaForm, FORM_ERROR } from 'app/ideas/components/IdeaForm';
import { CreateIdea } from 'app/ideas/validations';

const NewIdeaPage: BlitzPage = () => {
  const router = useRouter();
  const [ createIdeaMutation ] = useMutation( createIdea );

  return (
    <div className="mt-8 max-w-3xl mx-auto sm:px-6 lg:max-w-7xl">
      <h1 className="text-2xl mb-3">Create New Idea</h1>

      <IdeaForm
        submitProps={ {
          className: 'flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        } }
        submitText="Create Idea"
        schema={ CreateIdea }
        initialValues={ {
          title: '',
          body: '',
        } }
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
    </div>
  );
};

NewIdeaPage.authenticate = true;
NewIdeaPage.getLayout = ( page ) => (
  <Layout title={ 'Create New Idea' }>{ page }</Layout>
);

export default NewIdeaPage;
