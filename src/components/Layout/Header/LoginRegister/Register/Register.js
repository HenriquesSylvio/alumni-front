import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TopLoginRegister from "../TopLoginRegister";
import {register} from "../../../../../services/RegisterApi"
import {useState} from "react";
import {toast} from "react-toastify";

const theme = createTheme();

export default function SignUp() {

  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    password: "",
    birthday: "",
    email: "",
    promo: "",
    username: ""
  });

  const handleChange = ({currentTarget}) => {
    const {name, value} = currentTarget;

    setValues({...values, [name]: value})
  }

  const handleSubmit = async event => {
    event.preventDefault();
      try {
        await register(values);
        toast.success('Votre compte a été créé. Il faut désormais que votre compte soit accepté par un administrateur ! 😄');
      } catch ({response}) {
        var error = response.data.erreur
        // var arr = [];
        Object.keys(error).forEach(function(key) {
          console.log(error.email);
          toast.error(error[key] + ' 😃')
        });
        // toast.error(response.data.erreur + ' 😃')
        // setLoading(false);
        console.log(response)
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
          <TopLoginRegister label = "S'inscrire"/>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Prénom"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Nom"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="birthday"
                    label="Date de naissance"
                    name="birthday"
                    autoComplete="birthday"
                    onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Adresse e-mail"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="promo"
                    label="Promo"
                    name="promo"
                    autoComplete="promo"
                    onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="username"
                    label="Nom d'utilisateur"
                    name="username"
                    autoComplete="username"
                    onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    id="password"
                    label="Mot de passe"
                    name="password"
                    autoComplete="password"
                    onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    id="password"
                    label="Confirmation mot de passe"
                    name="password"
                    autoComplete="password"
                    onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Etape suivante
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}