import React from 'react';
import Dialog from '@mui/material/Dialog';
import SignUp from "../Layout/Header/LoginRegister/Register/Register";


const ModalDialog = ({ open, handleClose }) => {
  return (
    // props received from App.js
    <Dialog open={open} onClose={handleClose}>
      <SignUp handleClose={handleClose} />
    </Dialog>
  );
};

export default ModalDialog;
