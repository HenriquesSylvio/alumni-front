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

export default function ShowCommentButton() {
    // const [open, setOpen] = React.useState(false);
    // const contextValue = useContext(CloseChildModal);
    const {isOpenDiscussion, setIsOpenDiscussion} = useContext(OpenModalComment);
    const handleOpen = () => {
        setIsOpenDiscussion(true);
        console.log(isOpenDiscussion);
    };

    const handleClose = () => {
        setIsOpenDiscussion(false)
    }

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            {/*<Box style={styleButton}>*/}
            {/*    /!*sx={{display:"flex", flex: 1, color:"#CA4B38"}}*!/*/}
            {/*    <Fab sx={{backgroundColor:"#00A5A5", color: "white", '&:hover': {color: '#00A5A5'}}} saria-label="add" onClick={handleOpen}>*/}
            {/*        <AddIcon/>*/}
            {/*    </Fab>*/}
            {/*</Box>*/}
            <Button variant="text" onClick={handleOpen}>Afficher cette discussion</Button>
            <ShowCommentModal/>
            {/*<Modal*/}
            {/*    aria-labelledby="transition-modal-title"*/}
            {/*    aria-describedby="transition-modal-description"*/}
            {/*    open={isOpenDiscussion}*/}
            {/*    onClose={handleClose}*/}
            {/*    closeAfterTransition*/}
            {/*    BackdropComponent={Backdrop}*/}
            {/*    BackdropProps={{*/}
            {/*        timeout: 500,*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <Fade in={isOpenDiscussion}>*/}
            {/*        <Box>*/}
            {/*            <Box sx={styleBox}>*/}
            {/*                <AddPostForm />*/}
            {/*            </Box>*/}
            {/*            <Box sx={styleResponsiveBox}>*/}
            {/*                <AddPostForm />*/}
            {/*            </Box>*/}
            {/*        </Box>*/}

            {/*    </Fade>*/}
            {/*</Modal>*/}
        </Box>
    );
}
