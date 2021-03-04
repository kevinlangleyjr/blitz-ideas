import { cloneElement, ReactElement } from 'react';
import { Link, useRouter } from 'blitz';

type MenuItemLinkProps = {
  href: string
  defaultClasses: string
  selectedClasses: string
  children: ReactElement
};

const MenuItemLink = ( { href, children, selectedClasses, defaultClasses }: MenuItemLinkProps ) => {
  const router = useRouter();

  let className = children?.props?.className || '';
  if ( router.pathname === href ) {
    className = `${ className } ${ selectedClasses }`;
  } else {
    className = `${ className } ${ defaultClasses }`;
  }

  return (
    <Link href={ href }>{ cloneElement( children , { className } ) }</Link>
  );
};

export default MenuItemLink;
