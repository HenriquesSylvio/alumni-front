import React from 'react';
import Dialog from '@mui/material/Dialog';
import Form from '../components/Inscription/Form';


const ModalDialog = ({ open, handleClose }) => {
  return (
    // props received from App.js
    <Dialog open={open} onClose={handleClose}>
      // form to be created
      <Form handleClose={handleClose} />
    </Dialog>
  );
};

export default ModalDialog;
