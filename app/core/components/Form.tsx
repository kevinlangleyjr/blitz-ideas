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
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <div className="text-sm text-red-700">
                    <p>
                      { submitError }
                    </p>
                  </div>
                </div>
              </div>
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
