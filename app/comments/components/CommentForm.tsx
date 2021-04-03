import { useSession } from 'blitz';
import { Form, FormProps } from 'app/core/components/Form';
import { LabeledTextareaField } from 'app/core/components/LabeledTextareaField';
import * as z from 'zod';
export { FORM_ERROR } from 'app/core/components/Form';

export function CommentForm<S extends z.ZodType<any, any>>( props: FormProps<S> ) {
  const session = useSession();

  if ( ! session?.userId ) {
    return (
      <div>
        <h3>Login to comment!</h3>
      </div>
    );
  }

  return (
    <Form<S> { ...props }>
      <LabeledTextareaField
        label="Comment"
        labelProps={ {
          className: 'sr-only',
        } }
        name="body"
        placeholder="Comment"
        minLength={ 10 }
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-4"
      />
    </Form>
  );
}
