import { useField } from 'formik';

interface TextAreaProps {
  rows?: number;
  name: string;
  placeholder?: string;
  sx?: any;
}

const TextArea = ({ rows = 10, ...props }: TextAreaProps) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <textarea
        style={{
          width: `100%`,
          padding: `1rem`,
          // border: `solid 1px #ccc`,
          resize: `none`,
          overflowY: `auto`,
          fontSize: `1rem`,
          background: `transparent`,
          borderRadius: `10px`,
        }}
        {...field}
        {...props}
        rows={rows}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default TextArea;
