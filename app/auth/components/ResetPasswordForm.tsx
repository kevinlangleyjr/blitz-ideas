import { Link, useMutation, useRouterQuery } from 'blitz';
import { LabeledTextField } from 'app/core/components/LabeledTextField';
import { Form, FORM_ERROR } from 'app/core/components/Form';
import resetPassword from 'app/auth/mutations/resetPassword';
import { ResetPassword } from 'app/auth/validations';

type ResetPasswordFormProps = {
  onSuccess?: () => void
}

export const ResetPasswordForm = ( props: ResetPasswordFormProps ) => {
  const query = useRouterQuery();
  const [ resetPasswordMutation, { isSuccess } ] = useMutation( resetPassword );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-16 w-auto" src="/ideas.png" alt="Share Ideas" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Password Reset
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          { isSuccess ? (
            <div>
              <h2 className="text-xl font-bold">Password Reset Successfully</h2>
              <p><Link href="/login"><a className="font-medium text-indigo-600 hover:text-indigo-500">Continue to login.</a></Link></p>
            </div>
          ) : (
            <Form
              className="space-y-6"
              submitText="Send Reset Password Instructions"
              submitProps={ {
                className: 'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              } }
              schema={ ResetPassword.omit( { token: true } ) }
              initialValues={ { password: '', passwordConfirmation: '' } }
              onSubmit={ async ( values ) => {
                try {
                  await resetPasswordMutation( { ...values, token: query.token as string } );
                } catch ( error ) {
                  if ( error.name === 'ResetPasswordError' ) {
                    return {
                      [FORM_ERROR]: error.message,
                    };
                  } else {
                    return {
                      [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again.',
                    };
                  }
                }
              } }
            >
              <LabeledTextField
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name="password"
                label="New Password"
                type="password"
                labelProps={ {
                  htmlFor: 'password',
                  className: 'block text-sm font-medium text-gray-700',
                } }
                innerProps={ {
                  className: 'mt-1',
                } }
              />
              <LabeledTextField
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name="passwordConfirmation"
                label="Confirm New Password"
                type="password"
                labelProps={ {
                  htmlFor: 'passwordConfirmation',
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

export default ResetPasswordForm;
