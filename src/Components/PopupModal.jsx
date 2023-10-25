import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

export default function PopupModal(props) {
  
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          {props.children}
        </Box>
      </Modal>
    </div>
  );
}