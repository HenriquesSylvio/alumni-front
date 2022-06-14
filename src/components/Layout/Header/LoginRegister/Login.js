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

const theme = createTheme();

export default function SignIn() {
    const navigate = useNavigate();
    const {isAuthenticated, setIsAuthenticated} = useContext(Auth);
    const[user, setUser] = useState({
        username: "",
        password: ""
    })

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;

        setUser({...user, [name]: value})
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        event.preventDefault();
        try {
            const response = await login(user);
            console.log(response);
            setIsAuthenticated(response);
            console.log(isAuthenticated);
            navigate('/feed')
        } catch ({response}) {
            console.log(response)
        }
    };

    useEffect(() => {
        if(isAuthenticated)
        {
            navigate('/feed')
        }
    }, [navigate, isAuthenticated]);

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
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Connexion
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
