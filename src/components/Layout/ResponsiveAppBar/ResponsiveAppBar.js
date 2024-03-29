import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MessageIcon from '@mui/icons-material/Message';
import CelebrationIcon from '@mui/icons-material/Celebration';
import FeedIcon from '@mui/icons-material/Feed';
import WorkIcon from '@mui/icons-material/Work';
import Box from "@mui/material/Box";
import ButtonSearch from "../Header/Search/ButtonSearch";
import IconProfilePicture from "../Header/IconProfilePicture";
import SignInButton from "../Header/LoginRegister/SignInButton";
import Auth from "../../../contexts/Auth";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {getItem} from "../../../services/LocaleStorage";
import {Divider} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ListItemText from "@mui/material/ListItemText";

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
});

export default function BottomAppBar() {
    const [value, setValue] = React.useState('Actualité');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const {isAuthenticated} = useContext(Auth);
    let  navigate = useNavigate();

    return (

        <React.Fragment>
            <CssBaseline />
            {(isAuthenticated && (
                    <AppBar
                        position="fixed"
                        color="primary"
                        sx={{ top: 'auto', bottom: 0, bgcolor: 'white', paddingTop:"20" }}
                    >
                        <Toolbar>
                            <BottomNavigation
                                sx={{ width: '100%' }}
                                value={value}
                                onChange={handleChange}
                            >
                                <BottomNavigationAction
                                    label="Actualité"
                                    value="Actualité"
                                    icon={<FeedIcon />}
                                    onClick={() => navigate(`/feed`)}
                                />
                                <BottomNavigationAction
                                    label="Evenements"
                                    value="Evenements"
                                    icon={<CelebrationIcon />}
                                    onClick={() => navigate(`/events`)}
                                />

                                {/*<BottomNavigationAction*/}
                                {/*    label="Emplois"*/}
                                {/*    value="Emplois"*/}
                                {/*    icon={<WorkIcon />}*/}
                                {/*/>*/}
                                <BottomNavigationAction
                                    label="Messages"
                                    value="Messages"
                                    icon={<MessageIcon />}
                                    onClick={() => navigate(`/messages`)}
                                />
                                {(JSON.parse(atob(getItem('Token').split('.')[1])).roles.some(item => item === 'ROLE_ADMIN' || item === 'ROLE_SUPER_ADMIN') && (
                                        // <>
                                        //     <Divider/>
                                        //     <ListItem disablePadding>
                                        //         <ListItemButton onClick={() => navigate(`/AdminPanel`)}>
                                        //             <ListItemIcon>
                                        //                 <AdminPanelSettingsIcon />
                                        //             </ListItemIcon>
                                        //             <ListItemText primary="Panel admin" />
                                        //         </ListItemButton>
                                        //     </ListItem>
                                        // </>
                                        <BottomNavigationAction
                                            label="Panel"
                                            value="Panel"
                                            icon={<AdminPanelSettingsIcon/>}
                                            onClick={() => navigate(`/adminPanel`)}
                                        />
                                    ))
                                    ||
                                    null
                                }
                            </BottomNavigation>
                            {/*<StyledFab color="secondary">*/}
                            {/*    <AddIcon />*/}
                            {/*</StyledFab>*/}
                        </Toolbar>
                    </AppBar>
                ))
                ||
                null
            }

        </React.Fragment>
    );
}
