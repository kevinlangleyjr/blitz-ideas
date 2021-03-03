import { ReactNode } from 'react';
import Head from './components/Head';

type AuthLayoutProps = {
  title?: string
  children: ReactNode
}

const AuthLayout = ( { title, children }: AuthLayoutProps ) => {
  return (
    <>
      <Head title={ title } />
      { children }
    </>
  );
};

export default AuthLayout;
