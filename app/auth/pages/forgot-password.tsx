import { BlitzPage } from 'blitz';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import AuthLayout from 'app/core/layouts/AuthLayout';

const ForgotPasswordPage: BlitzPage = () => {
  return (
    <div>
        <ForgotPasswordForm />
    </div>
  );
};

ForgotPasswordPage.redirectAuthenticatedTo = '/';
ForgotPasswordPage.getLayout = ( page ) => <AuthLayout title="Forgot Your Password?">{ page }</AuthLayout>;

export default ForgotPasswordPage;
