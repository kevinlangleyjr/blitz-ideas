import { forwardRef, PropsWithoutRef } from 'react';
import { useField } from 'react-final-form';

export interface LabeledTextareaFieldProps extends PropsWithoutRef<JSX.IntrinsicElements['textarea']> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>
}

export const LabeledTextareaField = forwardRef<HTMLTextAreaElement, LabeledTextareaFieldProps>(
  ( { name, label, outerProps, ...props }, ref ) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField( name, {
      parse: undefined,
    } );

    const normalizedError = Array.isArray( error ) ? error.join( ', ' ) : error || submitError;

    return (
      <div { ...outerProps }>
        <label>
          { label }
          <textarea { ...input } disabled={ submitting } { ...props } ref={ ref } rows={ 20 } cols={ 60 } />
        </label>

        { touched && normalizedError && (
          <div role="alert">
            { normalizedError }
          </div>
        ) }
      </div>
    );
  }
);

export default LabeledTextareaField;
