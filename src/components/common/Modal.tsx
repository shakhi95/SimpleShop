import { Box, Modal } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

interface Props {
  isOpen: boolean;
  onClose: any;
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 16,
  p: 3,
};

const CustomModal: FC<PropsWithChildren<Props>> = ({ isOpen, onClose, children }) => {
  //
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default CustomModal;
