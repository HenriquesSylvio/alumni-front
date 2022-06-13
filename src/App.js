import './App.css';
import React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import ModalDialog from './ModalDialog';
import Inscription from "./pages/inscription";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  // declare a new state variable for modal open
  const [open, setOpen] = useState(false);

  // function to handle modal open
  const handleOpen = () => {
    setOpen(true);
  };

  // function to handle modal close
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Signup
      </Button>
      <ModalDialog open={open} handleClose={handleClose} />
    <BrowserRouter>
      <Routes>

        <Route exact path='/Inscription' component={Inscription}/>

      </Routes>
    </BrowserRouter>
    </div>
   
  );
};



export default App;