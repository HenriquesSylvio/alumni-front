import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FeedIcon from "@mui/icons-material/Feed";
import CelebrationIcon from "@mui/icons-material/Celebration";
import WorkIcon from "@mui/icons-material/Work";
import MessageIcon from "@mui/icons-material/Message";
import {useNavigate} from "react-router-dom";
import {Divider} from "@mui/material";
import Auth from "../../../contexts/Auth";
import Admin from "../../../contexts/Admin";
import {useContext, useState} from "react";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {getItem} from "../../../services/LocaleStorage";

export default function SideMenu() {
    const [state, setState] = React.useState({
        left: false,
    });
    const {isAdmin} = useContext(Admin);
    // const {token} = useState(JSON.parse(atob(getItem('Token').split('.')[1])).roles)
    // const token =
    // console.log(token.some(item => item === 'ROLE_ADMIN'));
    // setIsAdmin(token.some(item => item === 'ROLE_ADMIN'));

    let  navigate = useNavigate();

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate(`/feed`)}>
                        <ListItemIcon>
                            <FeedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Actualité" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate(`/events`)}>
                        <ListItemIcon>
                            <CelebrationIcon />
                        </ListItemIcon>
                        <ListItemText primary="Evenements" />
                    </ListItemButton>
                </ListItem>
                {/*<ListItem disablePadding>*/}
                {/*    <ListItemButton>*/}
                {/*        <ListItemIcon>*/}
                {/*            <WorkIcon />*/}
                {/*        </ListItemIcon>*/}
                {/*        <ListItemText primary="Emplois" />*/}
                {/*    </ListItemButton>*/}
                {/*</ListItem>*/}
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate(`/messages`)}>
                        <ListItemIcon>
                            <MessageIcon />
                        </ListItemIcon>
                        <ListItemText primary="Messages" />
                    </ListItemButton>
                </ListItem>

                {(JSON.parse(atob(getItem('Token').split('.')[1])).roles.some(item => item === 'ROLE_ADMIN' || item === 'ROLE_SUPER_ADMIN') && (
                    <>
                        <Divider/>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate(`/AdminPanel`)}>
                                <ListItemIcon>
                                    <AdminPanelSettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Panel admin" />
                            </ListItemButton>
                        </ListItem>
                    </>

                    ))
                    ||
                    null
                }

            </List>
        </Box>
    );

    return (
        <>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ color:"black"}}
                onClick={toggleDrawer('left', true)}
            >
                <MenuIcon/>
            </IconButton >

            {/*<IconButton*/}
            {/*    sx={{ color:"black"}}*/}
            {/*    onClick={toggleDrawer('left', true)}*/}
            {/*>*/}
            {/*    <MenuIcon />*/}
            {/*</IconButton>*/}
            <SwipeableDrawer
                anchor={'left'}
                open={state['left']}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
            >
                {list('left')}
            </SwipeableDrawer>
        </>
    );
}