import { invalidateQuery, useRouter, BlitzPage } from 'blitz';
import SignupForm from 'app/auth/components/SignupForm';
import getCurrentUser from 'app/users/queries/getCurrentUser';
import AuthLayout from 'app/core/layouts/AuthLayout';

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
SignupPage.getLayout = ( page ) => <AuthLayout title="Sign up">{ page }</AuthLayout>;

export default SignupPage;
