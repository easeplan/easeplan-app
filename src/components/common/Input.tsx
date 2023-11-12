import React, { FC } from 'react';
import { Field, FieldProps } from 'formik';
import FormError from './FormError';

type Props = {
  name: string;
  label?: string;
  accept?: string;
  type?: 'text' | 'file';
  setPreviewImg: any;
  setFileName?: any;
};

const Input: FC<Props> = ({
  name,
  setFileName,
  setPreviewImg,
  label,
  accept,
  type = 'text',
}) => {
  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps) => {
        const { setFieldValue } = form;

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const { target } = event;

          setFileName((target?.files && target?.files[0]) || null);
          if (type === 'file') {
            const file = (target?.files && target?.files[0]) || null;
            setPreviewImg(
              (target?.files && URL.createObjectURL(target?.files[0])) || null,
            );

            setFieldValue(name, file);
          } else {
            const value = target?.value;
            setFieldValue(name, value);
          }
        };

        return (
          <div>
            <label htmlFor={name}>{label}</label>
            {type === 'file' ? (
              <input
                type="file"
                accept={accept}
                id={name}
                onChange={handleChange}
              />
            ) : (
              <input type={type} id={name} {...field} onChange={handleChange} />
            )}
            {meta.touched && meta.error ? (
              <FormError text={meta.error}></FormError>
            ) : null}
          </div>
        );
      }}
    </Field>
  );
};

export default Input;
