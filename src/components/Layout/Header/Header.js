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
import Grid from "@mui/material/Grid";
import {Chip} from "@mui/material";
import SideMenu from "./SideMenu";
import SearchIcon from '@mui/icons-material/Search';
import nwsLogo from "../../../pictures/nws-logo.png"
import nwsLogoAlumni from "../../../pictures/logo-nws-alumni.png"

export default function Header() {
    const {isAuthenticated} = useContext(Auth);


    return (
        <Box>
            <AppBar position="static" sx={{ bgcolor: 'white' }}>
                <Toolbar>

                    <Box display="flex" style={{ width: '100%' }} sx={{ flexDirection: 'row' }}>

                    {(isAuthenticated && (
                            <SideMenu />
                        ))
                        ||
                        null
                    }
                    <Box
                        textAlign='center'
                        container
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        width="100%"
                        sx={{
                            display: { xs: 'none', sm: 'flex' },
                            justifyContent: 'center'
                        }}
                    >
                            <img
                                src={nwsLogoAlumni}
                                alt="nws-logo"
                                width="300"
                            />
                    </Box>

                        <Box
                            textAlign='center'
                            container
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            // display="flex"
                            width="100%"

                            // position={"absolute"}
                            marginRight={3}
                            sx={{
                                display: { xs: 'flex', sm: 'none' },
                                justifyContent: 'center'
                            }}
                        >
                            <img
                                src={nwsLogo}
                                alt="nws-logo"
                                width="65"
                            />
                        </Box>


                    {(isAuthenticated && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                            direction="row"
                            alignItems="center"
                            position='absolute'
                            right='0'
                        >
                            <Box
                                sx={{
                                    display: { xs: 'none', sm: 'flex' },
                                }}
                            >
                            <Chip
                                icon={<SearchIcon />}
                                label="Rechercher ..."
                                variant="outlined"
                            />
                            </Box>
                            <Box
                                sx={{
                                    display: { xs: 'flex', sm: 'none' },
                                }}
                                paddingRight={2}
                            >
                                <SearchIcon sx={{ color:"black"}}/>
                            </Box>
                            <Box>
                                <IconProfilePicture />
                            </Box>
                        </Box>
                    ))
                    ||
                    <Box position='absolute' right='0'>
                        <SignInButton />
                    </Box>
                    }
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
