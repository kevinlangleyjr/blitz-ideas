import { BlitzPage } from 'blitz';
import ResetPasswordForm from 'app/auth/components/ResetPasswordForm';
import AuthLayout from 'app/core/layouts/AuthLayout';

const ResetPasswordPage: BlitzPage = () => {

  return (
    <div>
      <ResetPasswordForm />
    </div>
  );
};

ResetPasswordPage.redirectAuthenticatedTo = '/';
ResetPasswordPage.getLayout = ( page ) => <AuthLayout title="Reset Password">{ page }</AuthLayout>;

export default ResetPasswordPage;
