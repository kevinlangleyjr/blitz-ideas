import { Suspense, useState } from 'react';
import { Link } from 'blitz';
import UserMenu from './UserMenu';
import HeaderMenu from './HeaderMenu';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [ menuOpen, setMenuOpen ] = useState<boolean>( false );

  return (
    <header>
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={ () => setMenuOpen( ! menuOpen ) }
              >
                <span className="sr-only">Open main menu</span>
                <svg className={ `${ menuOpen ? 'hidden' : 'block' } h-6 w-6` } xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg className={ `${ menuOpen ? 'block' : 'hidden' } h-6 w-6` } xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <a>
                    <img className="block lg:hidden h-12 w-auto" src="/logo.svg" alt="ShareIdeas.dev" />
                    <img className="hidden lg:block h-12 w-auto" src="/logo-large.svg" alt="ShareIdeas.dev" />
                  </a>
                </Link>
              </div>
              <HeaderMenu />
            </div>
            <Suspense fallback={ <div>Loading...</div> }>
              <UserMenu />
            </Suspense>
          </div>
        </div>

        <MobileMenu
          isOpen={ menuOpen }
          setIsOpen={ value => setMenuOpen( value ) }
        />
      </nav>
    </header>
  );
};

export default Header;
