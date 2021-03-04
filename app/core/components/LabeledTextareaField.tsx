import { forwardRef, PropsWithoutRef } from 'react';
import { useField } from 'react-final-form';

export interface LabeledTextareaFieldProps extends PropsWithoutRef<JSX.IntrinsicElements['textarea']> {
  /** Field name. */
  name: string
  /** Field inner container props. */
  innerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>
  /** Field label. */
  label: string
  /** Field label props. */
  labelProps?: PropsWithoutRef<JSX.IntrinsicElements['label']>
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: 'text' | 'password' | 'email' | 'number'
  /** Field outer container props. */
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>
}

export const LabeledTextareaField = forwardRef<HTMLTextAreaElement, LabeledTextareaFieldProps>(
  ( {
    name,
    innerProps,
    label,
    labelProps,
    outerProps,
    ...props
  }, ref ) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField( name );

    const normalizedError = Array.isArray( error ) ? error.join( ', ' ) : error || submitError;

    return (
      <>
        <div { ...outerProps }>
          <label { ...labelProps }>
            { label }
          </label>
          <div { ...innerProps }>
            <textarea rows={ 3 } { ...input } disabled={ submitting } { ...props } ref={ ref } />
          </div>
        </div>
        { touched && normalizedError && (
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
                    { normalizedError }
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) }
      </>
    );
  }
);

export default LabeledTextareaField;
