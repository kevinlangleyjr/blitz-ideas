import { BlitzPage } from 'blitz';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

const ForgotPasswordPage: BlitzPage = () => {
  return (
    <div>
        <ForgotPasswordForm />
    </div>
  );
};

ForgotPasswordPage.redirectAuthenticatedTo = '/';

export default ForgotPasswordPage;
