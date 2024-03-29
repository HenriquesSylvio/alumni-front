import * as React from 'react';
import {Button, Fab, Fade, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Backdrop from '@mui/material/Backdrop';
import Typography from "@mui/material/Typography";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AddIcon from "@mui/icons-material/Add";
import SignIn from "../Layout/Header/LoginRegister/Login/Login";
import OpenModalAddPost from "../../contexts/OpenModalAddPost";
import {useContext} from "react";
import Auth from "../../contexts/Auth";
import AddEventForm from "./AddEventForm";

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
    right: 50,
    bottom: 65,
    left: 'auto',
    position: 'fixed',
};


export default function ButtonAddEvent() {
    // const [open, setOpen] = React.useState(false);
    // const contextValue = useContext(CloseChildModal);
    const {isOpenAddPost, setIsOpenAddPost} = useContext(OpenModalAddPost);
    const handleOpen = () => {
        setIsOpenAddPost(true);
    };

    const handleClose = () => {
        setIsOpenAddPost(false)
    }

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Box style={styleButton}>
                {/*sx={{display:"flex", flex: 1, color:"#CA4B38"}}*/}
                <Fab sx={{backgroundColor:"#00A5A5", color: "white", '&:hover': {color: '#00A5A5'}}} saria-label="add" onClick={handleOpen}>
                    <AddIcon/>
                </Fab>
            </Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isOpenAddPost}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isOpenAddPost}>
                    <Box>
                        <Box sx={styleBox}>
                            <AddEventForm />
                        </Box>
                        <Box sx={styleResponsiveBox}>
                            <AddEventForm />
                        </Box>
                    </Box>

                </Fade>
            </Modal>
        </Box>
    );
}
