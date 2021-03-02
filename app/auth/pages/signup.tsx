import { invalidateQuery, useRouter, BlitzPage } from 'blitz';
import SignupForm from 'app/auth/components/SignupForm';
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

export default SignupPage;
