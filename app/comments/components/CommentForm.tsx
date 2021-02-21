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
      <LabeledTextareaField name="body" label="Comment" placeholder="Comment" minLength={ 10 } />
    </Form>
  );
}
