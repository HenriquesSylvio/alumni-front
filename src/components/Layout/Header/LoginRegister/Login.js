import React, {useContext, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LabelLoginRegister from "./LabelLoginRegister";
import {login} from "../../../../services/AuthApi";
import Auth from "../../../../contexts/Auth";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import validate from "../../../../validators/LoginValidator";
import {LoadingButton} from "@mui/lab";

const theme = createTheme();

export default function SignIn() {
    const navigate = useNavigate();
    const {isAuthenticated, setIsAuthenticated} = useContext(Auth);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = React.useState(false);
    // const[user, setUser] = useState({
    //     username: "",
    //     password: ""
    // })
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

    const handleSubmit = async event => {
        event.preventDefault();

        await setErrors(validate(values));
         if (Object.keys(errors).length === 0) {
             setLoading(true);
            try {
                const response = await login(values);
                setIsAuthenticated(response);
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
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <LabelLoginRegister label = "Connexion"/>
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
                        <LoadingButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleClick}
                            loading={loading}
                            loadingPosition="end"
                        >
                            Connexion
                        </LoadingButton>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
