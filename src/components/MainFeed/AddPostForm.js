import React, {useContext, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {CircularProgress} from "@mui/material";
import Auth from "../../contexts/Auth";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import CreateIcon from '@mui/icons-material/Create';

const theme = createTheme();

export default function AddPostForm() {
    return (
        // <ThemeProvider theme={theme}>
        //     <Container component="main" maxWidth="xs">
            <Container component="main">
                <CssBaseline />
                {/*<Box*/}
                {/*    sx={{*/}
                {/*        // marginTop: 2,*/}
                {/*        // display: 'flex',*/}
                {/*        // flexDirection: 'column',*/}
                {/*        // alignItems: 'center',*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <Box*/}
                {/*        sx={{*/}
                {/*            marginTop: 2,*/}
                {/*            display: 'flex',*/}
                {/*            flexDirection: 'column',*/}
                {/*            alignItems: 'center',*/}
                {/*        }}*/}
                {/*    >*/}
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '100%' }}
                >
                    {/*<TopLoginRegister label = "Connexion"/>*/}
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <CreateIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Création de poste
                        </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="title"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Titre"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="content"
                                    name="content"
                                    label="Contenu du poste"
                                    multiline
                                    rows={10}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            // onClick={handleClick}
                            // loading={loading}
                            // loadingPosition="end"
                        >
                            Créer
                        </Button>
                    </Box>
                </Grid>
            </Container>
        // </ThemeProvider>
    );
}
