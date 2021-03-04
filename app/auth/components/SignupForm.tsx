import { Link, useMutation } from 'blitz';
import { LabeledTextField } from 'app/core/components/LabeledTextField';
import { Form, FORM_ERROR } from 'app/core/components/Form';
import signup from 'app/auth/mutations/signup';
import { Signup } from 'app/auth/validations';

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = ( props: SignupFormProps ) => {
  const [ signupMutation ] = useMutation( signup );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-16 w-auto" src="/ideas.png" alt="Share Ideas" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register for a free account!
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 max-w">
          Or <Link href="/login"><a className="font-medium text-indigo-600 hover:text-indigo-500">login to your account.</a></Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form
            className="space-y-6"
            submitText="Register"
            submitProps={ {
              className: 'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            } }
            schema={ Signup }
            initialValues={ { email: '', password: '' } }
            onSubmit={ async ( values ) => {
              try {
                await signupMutation( values );
                props.onSuccess?.();
              } catch ( error ) {
                if ( error.code === 'P2002' && error.meta?.target?.includes( 'email' ) ) {
                  // This error comes from Prisma
                  return { email: 'This email is already being used' };
                } else {
                  return { [FORM_ERROR]: error.toString() };
                }
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
            <LabeledTextField
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="password"
              label="Password"
              type="password"
              labelProps={ {
                htmlFor: 'password',
                className: 'block text-sm font-medium text-gray-700',
              } }
              innerProps={ {
                className: 'mt-1',
              } }
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
