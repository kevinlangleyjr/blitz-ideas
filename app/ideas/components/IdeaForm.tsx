import { Form, FormProps } from 'app/core/components/Form';
import { LabeledTextField } from 'app/core/components/LabeledTextField';
import { LabeledTextareaField } from 'app/core/components/LabeledTextareaField';
import * as z from 'zod';
export { FORM_ERROR } from 'app/core/components/Form';

export function IdeaForm<S extends z.ZodType<any, any>>( props: FormProps<S> ) {
  return (
    <Form<S> { ...props }>
      <LabeledTextField
        labelProps={ {
          className: 'sr-only',
        } }
        name="title"
        label="Title"
        placeholder="Title"
        required
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-3"
      />
      <LabeledTextareaField
        labelProps={ {
          className: 'sr-only',
        } }
        name="body"
        label="Content"
        placeholder="Content"
        required
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-4"
      />
    </Form>
  );
}
