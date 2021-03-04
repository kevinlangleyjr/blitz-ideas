import { Link, useMutation } from 'blitz';
import { Menu, Transition } from '@headlessui/react';
import logout from 'app/auth/mutations/logout';
import { useCurrentUser } from 'app/core/hooks/useCurrentUser';

const UserMenu = () => {
  const currentUser = useCurrentUser();
  const [ logoutMutation ] = useMutation( logout );

  return (
    <>
      { currentUser ? (
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div className="ml-3 relative">
            <Menu>
              { ( { open } ) => (
                <>
                  <div>
                    <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <img className="h-8 w-8 rounded-full border-2 border-gray-500" src="/user.svg" alt="" />
                    </Menu.Button>
                  </div>
                  <Transition
                    show={ open }
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
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
                  </Transition>
                </>
              ) }
            </Menu>
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
