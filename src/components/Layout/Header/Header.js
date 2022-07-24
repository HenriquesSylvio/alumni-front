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
import nwsLogo from '../../../pictures/nws-logo.png'
import nwsLabel from '../../../pictures/nws-label.png'

export default function Header() {
    const {isAuthenticated} = useContext(Auth);


    return (
        <Box>
            <AppBar position="static" sx={{ bgcolor: 'white' }}>
                <Toolbar>
                    <SideMenu />

                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        sx={{ paddingLeft: 15 }}
                    >

                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <img
                                src={nwsLogo}
                                alt="nws-logo"
                                width="65"
                            />
                            <img
                                src={nwsLabel}
                                alt="nws-logo"
                                width="140"
                                height="40"
                            />
                            <Typography
                                variant="h3"
                                noWrap
                                component="div"
                                sx={{
                                    color: 'black',
                                    display: { xs: 'none', sm: 'block' },
                                }}
                            >
                                Alumni
                            </Typography>
                        </Grid>
                    </Grid>


                    {(isAuthenticated && (
                        <>
                            <Chip
                                icon={<SearchIcon />}
                                label="Rechercher ..."
                                variant="outlined"
                                sx={{
                                    display: { xs: 'none', sm: 'flex' },
                                }}
                            />
                            <IconProfilePicture />
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
