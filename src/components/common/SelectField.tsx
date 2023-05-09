import { InputLabel, MenuItem, Select } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { FieldProps, Field, useField, ErrorMessage } from 'formik';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  field: FieldProps['field'];
  form: FieldProps['form'];
  label: string;
  options: SelectOption[];
}

const SelectInput = ({ label, options, ...props }: any) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : ``;
  return (
    <FormControl fullWidth error={!!errorText}>
      <InputLabel>{label}</InputLabel>
      <Select {...field} label={label}>
        <MenuItem value="men">Men</MenuItem>
        {/* {options?.map((option: any) => (
          <MenuItem key={option?.value} value={option.value}>
            {option?.label}
          </MenuItem>
        ))} */}
      </Select>
      <ErrorMessage name={field.name} component="div" />
    </FormControl>
  );
};

const SelectField = (...props: any[]) => {
  return <Field component={SelectInput} {...props} />;
};

export default SelectField;

// const MaterialUISelect = ({
//   field,
//   form,
//   label,
//   options,
//   ...props
// }: SelectProps) => {
//   return (
//     <FormControl fullWidth>
//       <InputLabel>{label}</InputLabel>
//       <Select
//         {...field}
//         {...props}
//         onChange={(event) => form.setFieldValue(field.name, event.target.value)}
//       >
//         {options.map((option: any) => (
//           <MenuItem key={option.value} value={option.value}>
//             {option.label}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// };
