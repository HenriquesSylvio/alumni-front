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
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import validate from "../../../../../validators/RegisterValidator";
import {Autocomplete} from "@mui/lab";

const theme = createTheme();

export default function SignUp() {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    promo: "",
    username: ""
  });

  const yearPromo = [];

  function handleClick() {
     setErrors(validate(values));
  }

  const handleChange = ({currentTarget}) => {
    const {name, value} = currentTarget;

    setValues({...values, [name]: value})
    console.log(values);
  }

  const loadYearPromo = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const maxYear = currentDate.getFullYear() + 4;

    for (let i = 2017; i < maxYear; i++) {
      yearPromo.push(i.toString());
    }
  }

  useLayoutEffect(() => {
    loadYearPromo()
  });

  const handleSubmit = async event => {
    event.preventDefault();
    // setErrors(validate(values));
    console.log(errors);
    if (Object.keys(errors).length === 0) {
      try {
        await register(values);
        toast.success('Votre compte a été créé. Il faut désormais que votre compte soit accepté par un administrateur ! 😄');
      } catch ({response}) {
        var error = response.data.erreur
        // var arr = [];
        Object.keys(error).forEach(function (key) {
          console.log(error.email);
          toast.error(error[key] + ' 😃')
        });
        // toast.error(response.data.erreur + ' 😃')
        // setLoading(false);
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
          <TopLoginRegister label = "S'inscrire"/>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="Prénom"
                  autoFocus
                  onChange={handleChange}
                  error={ errors.first_name }
                  helperText={ errors.first_name }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="last_name"
                  label="Nom"
                  name="last_name"
                  autoComplete="family-name"
                  onChange={handleChange}
                  error={ errors.last_name }
                  helperText={ errors.last_name }
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
                  error={ errors.email }
                  helperText={ errors.email }
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                    fullWidth
                    options={yearPromo}
                    onChange={(event, value) => setValues({...values, ["promo"]: value})}

                    autoComplete="promo"
                    renderInput={(params) =>
                        <TextField {...params}
                                   required
                                   // onChange={handleChange}
                                   id="promo"
                                   name="promo"
                                   label="Promo"
                                   error={ errors.promo }
                                   helperText={ errors.promo }
                        />
                }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="sername"
                    label="Nom d'utilisateur"
                    name="username"
                    autoComplete="username"
                    onChange={handleChange}
                    error={ errors.username }
                    helperText={ errors.username }
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
                    type="password"
                    onChange={handleChange}
                    error={ errors.password }
                    helperText={ errors.password }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    id="confirmPassword"
                    label="Confirmation mot de passe"
                    name="confirmPassword"
                    autoComplete="confirmPassword"
                    type="password"
                    onChange={handleChange}
                    error={ errors.confirmPassword }
                    helperText={ errors.confirmPassword }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleClick}
            >
              Inscription
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

// const test = () => {
//   yearPromo = [2022]
// };

const test = [
    "test"
]
