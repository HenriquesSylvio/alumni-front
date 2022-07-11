import * as React from 'react';
import {Button, Fab, Fade, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Backdrop from '@mui/material/Backdrop';
import AddPostForm from "../Post/AddPostForm";
import OpenModalComment from "../../contexts/OpenModalComment";
import {useContext} from "react";
import ShowCommentModal from "./ShowCommentModal";

const styleBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    display: { xs: 'none', md: 'flex' },
};
const styleResponsiveBox = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display: { xs: 'flex', md: 'none' }
};

const styleButton = {
    margin: 0,
    top: 'auto',
    right: 100,
    bottom: 100,
    left: 'auto',
    position: 'fixed',
};

export default function ShowCommentButton({idPost}) {
    let {setIsOpenDiscussion} = useContext(OpenModalComment);
    const handleOpen = event => {
        setIsOpenDiscussion(idPost)
    };

    const handleClose = () => {
        setIsOpenDiscussion(false)
    }

    return (
        <Box>
            <Button variant="text" id={idPost} onClick={handleOpen}>Afficher cette discussion</Button>
            <ShowCommentModal idPost={idPost}/>
        </Box>
    );
}
