import { Suspense } from 'react';
import { Link, useMutation } from 'blitz';
import { useCurrentUser } from 'app/core/hooks/useCurrentUser';
import logout from 'app/auth/mutations/logout';

const UserInfo = () => {
  const currentUser = useCurrentUser();
  const [ logoutMutation ] = useMutation( logout );

  if ( currentUser ) {
    return (
      <button
        className="button small"
        onClick={ async () => {
          await logoutMutation();
        } }
      >
        Logout
      </button>
    );
  } else {
    return (
      <>
        <Link href="/signup">
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href="/login">
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    );
  }
};

const Header = () => {
  return (
    <header>
      <Suspense fallback={ <div>Loading...</div> }>
        <UserInfo />
      </Suspense>
    </header>
  );
};

export default Header;
