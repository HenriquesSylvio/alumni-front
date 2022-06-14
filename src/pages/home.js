import React from "react"
import Button from '@mui/material/Button';
import ModalDialog from "../components/ModalDialog/ModalDialog";
import { useState } from "react";

const Home = () => {

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
                S'inscrire
            </Button>
            <ModalDialog open={open} handleClose={handleClose} />
        </div>
    )
}

export default Home