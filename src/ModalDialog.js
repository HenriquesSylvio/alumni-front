import React from 'react';
import Dialog from '@mui/material/Dialog';
import Form from './components/Inscription/Form';

// Composant gérant la pop-up s'activant lors de la sélection du bouton "inscription"

const ModalDialog = ({ open, handleClose }) => {
  return (
    // props received from App.js
    <Dialog open={open} onClose={handleClose}>
      <Form handleClose={handleClose} />
    </Dialog>
  );
};

export default ModalDialog;