import React, {useContext, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import validate from "../../../../../validators/LoginValidator";
import {CircularProgress} from "@mui/material";
import TopLoginRegister from "../TopLoginRegister";
import {login} from "../../../../../services/AuthApi";
import Auth from "../../../../../contexts/Auth";
import getProfile from "../../../../../services/ProfileApi";
import ActiveConnectedUser from "../../../../../contexts/ActiveConnectedUser";
import {getItem} from "../../../../../services/LocaleStorage";

const theme = createTheme();

export default function SignIn() {
    const navigate = useNavigate();
    const {setIsAuthenticated} = useContext(Auth);
    const {setActiveProfile} = useContext(ActiveConnectedUser)
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = React.useState(false);

    function handleClick() {
        setErrors(validate(values));
    }

    const [values, setValues] = useState({
        username: "",
        password: ""
    });

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;

        setValues({...values, [name]: value})
        console.log(values);
    }

    const getMyProfile = async () => {
        const response = await getProfile()
        console.log(response)
        setActiveProfile(response.data)

    }

    const handleSubmit = async event => {
        event.preventDefault();

        setErrors(validate(values));
        console.log(Object.keys(errors).length);
         if (Object.keys(errors).length === 0) {
             setLoading(true);
            try {
                console.log(values)
                const response = await login(values);
                await setIsAuthenticated(response);
                getMyProfile()

                navigate('/feed')
                toast.success('Bienvenue ! 😄')
            } catch ({response}) {
                toast.error(response.data.erreur + ' 😃')
                setLoading(false);
                console.log(response)
            }
         }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <TopLoginRegister label = "Connexion"/>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Nom d'utilisateur"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={handleChange}
                            error={ errors.username }
                            helperText={ errors.username }
                            disabled={loading}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mot de passe"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                            error={ errors.password }
                            helperText={ errors.password }
                            disabled={loading}
                        />
                        {(loading && (
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    marginTop: 2
                                }}>
                                    <CircularProgress sx={{justifyContent:"center", display:"flex"}}/>
                                </Box>
                            ))
                            ||
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={handleClick}
                                    // loading={loading}
                                    // loadingPosition="end"
                                >
                                    Connexion
                                </Button>
                        }
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
