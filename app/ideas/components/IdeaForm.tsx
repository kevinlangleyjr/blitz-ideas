import { Form, FormProps } from 'app/core/components/Form';
import { LabeledTextField } from 'app/core/components/LabeledTextField';
import { LabeledTextareaField } from 'app/core/components/LabeledTextareaField';
import * as z from 'zod';
export { FORM_ERROR } from 'app/core/components/Form';

export function IdeaForm<S extends z.ZodType<any, any>>( props: FormProps<S> ) {
  return (
    <Form<S> { ...props }>
      <LabeledTextField name="title" label="Title" placeholder="Title" />
      <LabeledTextareaField
        name="body"
        label="Content"
        placeholder="Content"
        className="block w-full shadow-sm focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm border-gray-300 rounded-md"
      />
    </Form>
  );
}
