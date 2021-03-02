import { BlitzPage } from 'blitz';
import ResetPasswordForm from 'app/auth/components/ResetPasswordForm';

const ResetPasswordPage: BlitzPage = () => {

  return (
    <div>
      <ResetPasswordForm />
    </div>
  );
};

ResetPasswordPage.redirectAuthenticatedTo = '/';

export default ResetPasswordPage;
