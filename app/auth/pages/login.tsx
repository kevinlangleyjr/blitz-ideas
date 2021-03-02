import { invalidateQuery, useRouter, BlitzPage } from 'blitz';
import LoginForm from 'app/auth/components/LoginForm';
import getCurrentUser from 'app/users/queries/getCurrentUser';

const LoginPage: BlitzPage = () => {
  const router = useRouter();

  return (
    <div>
      <LoginForm
        onSuccess={ () => {
          invalidateQuery( getCurrentUser );
          const next = ( router.query.next as string ) ?? '/';
          router.push( next );
        } }
      />
    </div>
  );
};

LoginPage.redirectAuthenticatedTo = '/';

export default LoginPage;
