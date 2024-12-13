import { Modal, Box, Typography, Button } from '@mui/material';

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ open, onClose, title, children }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          padding: 4,
          borderRadius: 2,
          boxShadow: 24,
          width: 400,
        }}
      >
        <Typography variant="h5" color='primary'>{title}</Typography>
        <div>{children}</div>
        <Button onClick={onClose}>閉じる</Button>
      </Box>
    </Modal>
  );
};

export default CustomModal;
