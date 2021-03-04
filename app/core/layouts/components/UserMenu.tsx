import { useState } from 'react';
import { Link, useMutation } from 'blitz';
import logout from 'app/auth/mutations/logout';
import { useCurrentUser } from 'app/core/hooks/useCurrentUser';

const UserMenu = () => {
  const currentUser = useCurrentUser();
  const [ logoutMutation ] = useMutation( logout );
  const [ menuOpen, setMenuOpen ] = useState<boolean>( false );

  return (
    <>
      { currentUser ? (
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div className="ml-3 relative">
            <div>
              <button
                className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                id="user-menu"
                aria-haspopup="true"
                onClick={ () => setMenuOpen( ! menuOpen ) }
              >
                <span className="sr-only">Open user menu</span>
                <img className="h-8 w-8 rounded-full border-2 border-gray-500" src="/user.svg" alt="" />
              </button>
            </div>
            <div
              className={ `transition ${ menuOpen ? 'ease-out duration-200 transform opacity-100 scale-100' : 'ease-in duration-75 transform opacity-0 scale-95' } origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5` }
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              <button
                className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={ async () => {
                  await logoutMutation();
                } }
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="ml-3 relative flex items-center justify-center">
          <Link href="/signup">
            <a className="relative items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign up</a>
          </Link>
          <Link href="/login">
            <a className="ml-2 relative items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</a>
          </Link>
        </div>
      ) }
    </>
  );
};

export default UserMenu;
