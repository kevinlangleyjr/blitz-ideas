import { Link, useMutation } from 'blitz';
import { LabeledTextField } from 'app/core/components/LabeledTextField';
import { Form, FORM_ERROR } from 'app/core/components/Form';
import forgotPassword from 'app/auth/mutations/forgotPassword';
import { ForgotPassword } from 'app/auth/validations';

type ForgotPasswordFormProps = {
  onSuccess?: () => void
}

export const ForgotPasswordForm = ( props: ForgotPasswordFormProps ) => {
  const [ forgotPasswordMutation, { isSuccess } ] = useMutation( forgotPassword );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-16 w-auto" src="/ideas.png" alt="Share Ideas" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Forgot Password
        </h2>
        { ! isSuccess && (
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Or <Link href="/login"><a className="font-medium text-indigo-600 hover:text-indigo-500">login to your account.</a></Link>
          </p>
        ) }
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          { isSuccess ? (
            <div>
              <h2 className="text-xl font-bold">Request Submitted</h2>
              <p>If your email is in our system, you will receive instructions to reset your password shortly.</p>
              <p><Link href="/login"><a className="font-medium text-indigo-600 hover:text-indigo-500">Continue to login</a></Link></p>
            </div>
          ) : (
            <Form
              className="space-y-6"
              submitText="Send Reset Password Instructions"
              submitProps={ {
                className: 'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              } }
              schema={ ForgotPassword }
              initialValues={ { email: '' } }
              onSubmit={ async ( values ) => {
                try {
                  await forgotPasswordMutation( values );
                } catch ( error ) {
                  return {
                      [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again.',
                  };
                }
              } }
            >
              <LabeledTextField
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name="email"
                label="Email Address"
                labelProps={ {
                  htmlFor: 'email',
                  className: 'block text-sm font-medium text-gray-700',
                } }
                innerProps={ {
                  className: 'mt-1',
                } }
              />
            </Form>
          ) }
        </div>
      </div>
  </div>
  );
};

export default ForgotPasswordForm;
