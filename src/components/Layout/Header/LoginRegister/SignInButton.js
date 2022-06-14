import * as React from 'react';
import {Button, Fade, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Backdrop from '@mui/material/Backdrop';
import Typography from "@mui/material/Typography";
import SignIn from "./Login";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SignUp from "../../../Inscription/Form";
import ModalDialog from "../../../../ModalDialog";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function SignInButton() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false)


    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ p: 1 }}>
            <Button onClick={handleOpen} color="inherit" variant="outlined">
                Se connecter
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Connexion" value="1" />
                                    <Tab label="Inscription" value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <SignIn />
                            </TabPanel>
                            <TabPanel value="2">
                                <SignUp />
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}
