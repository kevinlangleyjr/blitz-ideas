import { ReactNode, PropsWithoutRef } from 'react';
import { Form as FinalForm, FormProps as FinalFormProps } from 'react-final-form';
import * as z from 'zod';
export { FORM_ERROR } from 'final-form';

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements['form']>, 'onSubmit'> {
  /** All your form fields */
  children?: ReactNode
  className?: string
  /** Text to display in the submit button */
  submitText?: string
  /** Props for the submit button */
  submitProps?: PropsWithoutRef<JSX.IntrinsicElements['button']>
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>['onSubmit']
  initialValues?: FinalFormProps<z.infer<S>>['initialValues']
}

export function Form<S extends z.ZodType<any, any>>( {
  children,
  className,
  schema,
  submitText,
  submitProps,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S> ) {
  return (
    <FinalForm
      initialValues={ initialValues }
      validate={ ( values ) => {
        if ( ! schema ) {
          return;
        }
        try {
          schema.parse( values );
        } catch ( error ) {
          return error.formErrors.fieldErrors;
        }
      } }
      onSubmit={ onSubmit }
      render={ ( { handleSubmit, submitting, submitError } ) => (
        <form onSubmit={ handleSubmit } className={ `form ${ className }` } { ...props }>
          { /* Form fields supplied as children are rendered here */ }
          { children }

          { submitError && (
            <div role="alert" style={ { color: 'red' } }>
              { submitError }
            </div>
          ) }

          { submitText && (
            <div>
              <button type="submit" disabled={ submitting } { ...submitProps }>
                { submitText }
              </button>
            </div>
          ) }
        </form>
      ) }
    />
  );
}

export default Form;
