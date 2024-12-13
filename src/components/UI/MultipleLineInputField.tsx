import { TextField } from '@mui/material';

interface InputFieldProps {
  label: string;
  placeholder: string;
  rows: number
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder, rows, ...props }) => {
  return <TextField label={label} placeholder={placeholder} rows={rows} multiline {...props} />;
};

export default InputField;
