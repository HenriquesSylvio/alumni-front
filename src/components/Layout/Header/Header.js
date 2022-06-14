import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchInput from './SearchInput';
import IconProfilePicture from './IconProfilePicture';
import {useContext} from "react";
import Auth from "../../../contexts/Auth";
import SignInButton from "./LoginRegister/SignInButton";

export default function Header() {
    const {isAuthenticated} = useContext(Auth);

    return (
        <Box>
            <AppBar position="relative">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Alumni NWS
                    </Typography>
                    {(isAuthenticated && (
                        <>
                            <Box sx={{ flexGrow: 1 }}>
                                <SearchInput />
                            </Box>
                            <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
                                <IconProfilePicture />
                            </Box>
                        </>
                    ))
                        ||
                        <Box position='absolute' right='0'>
                            <SignInButton />
                        </Box>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}
