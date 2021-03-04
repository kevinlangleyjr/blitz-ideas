import MenuItemLink from './MenuItemLink';

const HeaderMenu = () => {
  const menuItemLinkProps = {
    defaultClasses: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
    selectedClasses: 'border-indigo-500 text-gray-900'
  };

  const linkClasses = 'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium';

  return (
    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
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
  );
};

export default HeaderMenu;
