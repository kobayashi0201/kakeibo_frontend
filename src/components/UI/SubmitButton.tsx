import { Button, ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  label: string;
  type?: 'button' | 'submit' | 'reset';
}

const SubmitButton: React.FC<CustomButtonProps> = ({ label, type = 'button', ...props }) => {
  return <Button color="primary" variant="contained" type={type} {...props}>{label}</Button>;
};

export default SubmitButton;
