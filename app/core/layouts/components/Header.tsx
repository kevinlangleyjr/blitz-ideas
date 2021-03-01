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
          <a>
            Sign Up
          </a>
        </Link>
        <Link href="/login">
          <a>
            Login
          </a>
        </Link>
      </>
    );
  }
};

const Header = () => {
  return (
    <header>
      <Link href="/">
        <a>
          Ideas
        </a>
      </Link>
      <Suspense fallback={ <div>Loading...</div> }>
        <UserInfo />
      </Suspense>
    </header>
  );
};

export default Header;
