import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import {logout} from "../../../services/AuthApi";
import {useContext, useState} from "react";
import Auth from "../../../contexts/Auth";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate, withRouter } from "react-router-dom";
import {Link} from "@mui/material";
import {Navigate} from "react-router";
import ActiveConnectedUser from "../../../contexts/ActiveConnectedUser";
import {getItem} from "../../../services/LocaleStorage";
import MessageRight from "../../Message/MessageRight";
import MessageLeft from "../../Message/MessageLeft";

export default function IconProfilePicture() {
    let navigate = useNavigate();

    const { setIsAuthenticated } = useContext(Auth);
    const { setActiveUser } = useContext(ActiveConnectedUser)
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    // const [img] = React.useState(JSON.parse(getItem('Profile')).urlProfilePicture)
    // const [activeProfile] = useState(JSON.parse(getItem('Profile')));

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        logout();
        setIsAuthenticated(false);
        setActiveUser([]);
        toast.info('A bientôt ! 😋');
    }
    return(
        <Box component="span"  sx={{ flexGrow: 0 }}>
            {/*{(getItem('Profile')).urlProfilePicture === null && (*/}
            {/*    <Tooltip title="Open settings">*/}
            {/*        <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>*/}
            {/*            <Avatar src={JSON.parse(getItem('Profile')).urlProfilePicture} />*/}
            {/*            /!*<Avatar />*!/*/}
            {/*        </IconButton>*/}
            {/*    </Tooltip>*/}
            {/*    ) || null*/}
            {/*}*/}
            {/*{(getItem('Profile')).urlProfilePicture === null && (*/}
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                        <Avatar src={JSON.parse(getItem('Profile')).urlProfilePicture} />
                        {/*<Avatar />*/}
                    </IconButton>
                </Tooltip>
            {/*) || null*/}
            {/*}*/}

            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem key='Profile' onClick={() => {navigate('/profile', { replace: true })}} >
                    <Typography textAlign="center">Profil</Typography>
                </MenuItem>
                <MenuItem key='Logout' onClick={handleLogout}>
                    <Typography textAlign="center">Se déconnecter</Typography>
                </MenuItem>
            </Menu>
        </Box>
    )
}
