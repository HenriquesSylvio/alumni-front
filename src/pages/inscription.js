import React from "react"
import ModalDialog from "../components/ModalDialog/ModalDialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Inscription = () => {

      // declare a new state variable for modal open
  const [open, setOpen] = useState(true);
  const navigate = useNavigate()
  // function to handle modal close
  const handleClose = () => {
    setOpen(false);
    navigate('/')
  };
    return (
      <ModalDialog open={open} handleClose={handleClose} />
    )
}

export default Inscription