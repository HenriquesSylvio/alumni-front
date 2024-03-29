import * as React from 'react';
import {Button, Fade, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Backdrop from '@mui/material/Backdrop';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SignIn from "./Login/Login";
import SignUp from "./Register/Register";
import Auth from "../../../../contexts/Auth";
import OpenModalAuth from "../../../../contexts/OpenModalAuth";
import {useContext} from "react";
import TabIndexAuth from "../../../../contexts/TabIndexAuth";
import Paper from "@mui/material/Paper";
import EditFacultyForm from "../../../AdminPanel/AdminPanelFaculty/EditFacultyForm";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 'auto',
//     bgcolor: 'background.paper',
//     boxShadow: 24,
//     p: 4,
//     borderRadius: 2
// };
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
    display: { xs: 'none', md: 'block' },
};
const styleResponsiveBox = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflow:"scroll",
    display: { xs: 'block', md: 'none' }
};

export default function SignInButton() {
    // const [open, setOpen] = React.useState(false);
    const handleOpen = () => setIsOpenAuth(true);
    const handleClose = () => setIsOpenAuth(false)
    const {isOpenAuth, setIsOpenAuth} = useContext(OpenModalAuth);
    const {tabIndexAuth, setTabIndexAuth} = useContext(TabIndexAuth);

    // const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        // console.log(tabIndexAuth);
        setTabIndexAuth(newValue);
    };

    return (
        <Box sx={{ p: 1 }}>
            <Button onClick={handleOpen} color="primary">
                Se connecter
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isOpenAuth}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isOpenAuth}>
                    {/*<Box sx={style}>*/}
                    {/*    <TabContext value={tabIndexAuth}>*/}
                    {/*        <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>*/}
                    {/*            <TabList onChange={handleChange} aria-label="lab API tabs example">*/}
                    {/*                <Tab label="Connexion" value="1" />*/}
                    {/*                <Tab label="Inscription" value="2" />*/}
                    {/*            </TabList>*/}
                    {/*        </Box>*/}
                    {/*        <TabPanel value="1">*/}
                    {/*            <SignIn />*/}
                    {/*        </TabPanel>*/}
                    {/*        <TabPanel value="2">*/}
                    {/*            <SignUp />*/}
                    {/*        </TabPanel>*/}
                    {/*    </TabContext>*/}
                    {/*</Box>*/}
                    <Box>
                        <Paper sx={styleBox}>
                            <IconButton onClick={() => setIsOpenAuth(false)}>
                                <CloseIcon/>
                            </IconButton>
                            <TabContext value={tabIndexAuth}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
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
                        </Paper>
                        <Paper sx={styleResponsiveBox}>
                            <IconButton onClick={() => setIsOpenAuth(false)}>
                                <CloseIcon/>
                            </IconButton>
                            <TabContext value={tabIndexAuth}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
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
                        </Paper>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}
