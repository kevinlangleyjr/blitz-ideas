import { invalidateQuery, useRouter, BlitzPage } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import { LoginForm } from 'app/auth/components/LoginForm';
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
LoginPage.getLayout = ( page ) => <Layout title="Log In">{ page }</Layout>;

export default LoginPage;
