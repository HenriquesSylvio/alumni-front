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
import {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import validate from "../../../../../validators/RegisterValidator";
import {Autocomplete} from "@mui/lab";
import {getFaculty} from "../../../../../services/GetFacultyApi";
import ButtonSearch from "../../Search/ButtonSearch";
import IconProfilePicture from "../../IconProfilePicture";
import SignInButton from "../SignInButton";
import {CircularProgress} from "@mui/material";
import OpenModalAuth from "../../../../../contexts/OpenModalAuth";

const theme = createTheme();

export default function SignUp() {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    promo: "",
    username: "",
    faculty: {
      id: ""
    }
  });
  const [faculties, setFaculties] = React.useState({});
  const [facultyId, setFacultyId] = React.useState({});
  // const [loadingFaculty, setLoadingFaculty] = React.useState(false);
  const [promo, setPromo] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const {isOpenAuth, setIsOpenAuth} = useContext(OpenModalAuth);
  const yearPromo = [];
  const facultiesName = [];
  const facultiesId = [];

  function handleClick() {
     setErrors(validate(values));
  }

  const handleChange = ({currentTarget}) => {
    const {name, value} = currentTarget;

    setValues({...values, [name]: value})
  }

  const loadYearPromo = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const maxYear = currentDate.getFullYear() + 4;

    for (let i = 2017; i < maxYear; i++) {
      yearPromo.push(i.toString());
    }
    setPromo(yearPromo)
  }

  const getFaculties = async () => {
    const response = await getFaculty();
    // console.log(response.data.faculty);

    // for (let i = 0; i < maxYear; i++) {
    //   yearPromo.push(i.toString());
    // }
    // for (var facultyName in response.data.faculty) {
    //   console.log(facultyName.name);
    // }
    // console.log("facultyName.name");
    for (var key of Object.keys(response.data.faculty)) {
      // console.log(key + " -> " + response.data.faculty[key].name)
      facultiesName.push(response.data.faculty[key].name.toString());
      facultiesId.push(response.data.faculty[key].id.toString());
    }
    console.log(facultiesName)

    // setFaculties(response.data.faculty);
    // console.log(facultiesId)
    setFaculties(facultiesName);
    setFacultyId(facultiesId);
  };

  useEffect(() => {
    const getData = async () => {
      // setLoadingFaculty(true)
      await loadYearPromo();
      await getFaculties();
      // setLoadingFaculty(false)
    }
    getData();
  }, []);
  //
  // useLayoutEffect(() => {
  //   loadYearPromo();
  // });



  const handleSubmit = async event => {
    event.preventDefault();
    // setErrors(validate(values));
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      try {
        await register(values);
        setIsOpenAuth(false)
        toast.success('Votre compte a été créé. Il faut désormais que votre compte soit accepté par un administrateur ! 😄');
      } catch ({response}) {
        var error = response.data.erreur
        Object.keys(error).forEach(function (key) {
          toast.error(error[key] + ' 😃')
        });
      }
      setLoading(false);
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {(faculties.length && (
                        <Autocomplete
                            fullWidth
                            options={faculties}
                            // onChange={(event, value) => setValues({...values, ["promo"]: value})}
                            // onChange={(event, value) => console.log(facultiesName[1])}
                            // onChange={(event, value) => console.log(facultiesId[facultiesName.indexOf(value)])}
                            onChange={(event, value) => setValues({...values, "faculty" : { id: facultyId[faculties.indexOf(value)]}})}
                            // faculty: {
                            //   id: ""
                            // }
                            disabled={loading}
                            autoComplete="faculty"

                            renderInput={(params) =>
                                <TextField {...params}
                                           required
                                    // onChange={handleChange}
                                           id="faculty"
                                           name="faculty"
                                           label="Filière"
                                           error={ errors.faculty }
                                           helperText={ errors.faculty }
                                           disabled={loading}
                                />
                            }
                        />
                    ))
                    ||
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      marginTop: 2
                    }}>
                      <CircularProgress sx={{justifyContent:"center", display:"flex"}}/>
                    </Box>
                }
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                    fullWidth
                    options={promo}
                    onChange={(event, value) => setValues({...values, ["promo"]: value})}
                    disabled={loading}
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
                                   disabled={loading}
                        />
                }
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
                    error={ errors.username }
                    helperText={ errors.username }
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
                />
              </Grid>
            </Grid>
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
                >
                  Inscription
                </Button>
            }
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
