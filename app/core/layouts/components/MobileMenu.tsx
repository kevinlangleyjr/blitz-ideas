import MenuItemLink from './MenuItemLink';

type MobileMenuProps = {
  isOpen: boolean
  setIsOpen: ( value: boolean ) => void
};

const MobileMenu = ( { isOpen, setIsOpen }: MobileMenuProps ) => {

  const menuItemLinkProps = {
    defaultClasses: 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700',
    selectedClasses: 'bg-indigo-50 border-indigo-500 text-indigo-700'
  };

  const linkClasses = 'block pl-3 pr-4 py-2 border-l-4 text-base font-medium';

  return (
    <div className={ `sm:hidden ${ isOpen ? 'block' : 'hidden' }` } id="mobile-menu">
      <div className="pt-2 pb-4 space-y-1">
        <MenuItemLink
          { ...menuItemLinkProps }
          href="/"
        >
          <a className={ linkClasses }>Home</a>
        </MenuItemLink>
        <MenuItemLink
          { ...menuItemLinkProps }
          href="/ideas/new"
        >
          <a className={ linkClasses }>Submit an Idea</a>
        </MenuItemLink>
      </div>
    </div>
  );
};

export default MobileMenu;
