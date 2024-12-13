import { TextField } from "@mui/material";

interface InputFieldProps {
  label: string;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  ...props
}) => {
  return <TextField label={label} placeholder={placeholder} {...props} />;
};

export default InputField;
