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
                        <img
                            src="https://storage.googleapis.com/prod-phoenix-bucket//osp/tab/901/nws-photo01-210927044012.jpg"
                            alt="nws-logo"
                            width="65"
                        />
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                color: 'black',
                                paddingTop: 2,
                                display: { xs: 'none', sm: 'block' },
                            }}
                        >
                            NWS Alumni
                        </Typography>
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

// {(isAuthenticated && (
//     <>
//         <Box sx={{ flexGrow: 1 }}>
//             <SearchInput />
//         </Box>
//         <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
//             <IconProfilePicture />
//         </Box>
//     </>
// ))
// ||
// <Box position='absolute' right='0'>
//     <SignInButton />
// </Box>
// }

// return (
//     <Box>
//         <AppBar position="static" sx={{ bgcolor: 'white' }}>
//             <Toolbar>
//                 <SideMenu />
//
//                 <Grid
//                     container
//                     direction="row"
//                     justifyContent="center"
//                     sx={{ paddingLeft: 15 }}
//                 >
//                     <img
//                         src="https://storage.googleapis.com/prod-phoenix-bucket//osp/tab/901/nws-photo01-210927044012.jpg"
//                         alt="nws-logo"
//                         width="65"
//                     />
//                     <Typography
//                         variant="h6"
//                         noWrap
//                         component="div"
//                         sx={{
//                             color: 'black',
//                             paddingTop: 2,
//                             display: { xs: 'none', sm: 'block' },
//                         }}
//                     >
//                         NWS Alumni
//                     </Typography>
//                 </Grid>
//
//                 <Chip
//                     icon={<SearchIcon />}
//                     label="Rechercher ..."
//                     variant="outlined"
//                     sx={{
//                         display: { xs: 'none', sm: 'flex' },
//                     }}
//                 />
//                 <IconProfilePicture />
//             </Toolbar>
//         </AppBar>
//     </Box>
// );