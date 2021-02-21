import { invalidateQuery, useRouter, BlitzPage } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import { SignupForm } from 'app/auth/components/SignupForm';
import getCurrentUser from 'app/users/queries/getCurrentUser';

const SignupPage: BlitzPage = () => {
  const router = useRouter();

  return (
    <div>
      <SignupForm onSuccess={ () => {
        router.push( '/' );
        invalidateQuery( getCurrentUser );
      } } />
    </div>
  );
};

SignupPage.redirectAuthenticatedTo = '/';
SignupPage.getLayout = ( page ) => <Layout title="Sign Up">{ page }</Layout>;

export default SignupPage;
