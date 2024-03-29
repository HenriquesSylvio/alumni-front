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
import {addItem, getItem} from "../../../../../services/LocaleStorage";
import Admin from "../../../../../contexts/Admin";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import OpenModalAuth from "../../../../../contexts/OpenModalAuth";

const theme = createTheme();

export default function SignIn() {
    const navigate = useNavigate();
    const {isAuthenticated,setIsAuthenticated} = useContext(Auth);
    const {setIsAdmin} = useContext(Admin);
    const {setActiveProfile} = useContext(ActiveConnectedUser)
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = React.useState(false);
    const {isOpenAuth, setIsOpenAuth} = useContext(OpenModalAuth);

    let authenticated = false;

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
    }

    const getMyProfile = async () => {
        const response = await getProfile()
        addItem('Profile',  JSON.stringify(response.data))
    }

    useEffect( () => {
        if(authenticated)
        {
            navigate('/feed', { replace: true })
        }
    }, [navigate, isAuthenticated]);

    const handleSubmit = async event => {
        event.preventDefault();

        setErrors(validate(values));
         if (Object.keys(errors).length === 0) {
             setLoading(true);
            try {
                const response = await login(values);
                authenticated = response
                await getMyProfile()
                setIsAuthenticated(response);
                const token = JSON.parse(atob(getItem('Token').split('.')[1])).roles
                setIsAdmin(token.some(item => item === 'ROLE_ADMIN'));
                navigate('/feed', { replace: true })
                toast.success('Bienvenue ! 😄')

                setIsOpenAuth(false)
            } catch ({response}) {
                toast.error(response.data.erreur + ' 😃')
                setLoading(false);
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
