import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
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
import {addPost} from "../../services/AddPostApi";
import getTag from "../../services/GetTagApi";
import {Autocomplete} from "@mui/lab";
import validate from "../../validators/AddPostValidator";

const theme = createTheme();

export default function AddPostForm() {
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        title: "",
        content: "",
        tag: {
            id: ""
        }
    });
    const [tags, setTags] = useState([]);

    const listTag = [];

    const loadTag = async () => {
        const response = await getTag();
        console.log(response.data.tags);
        setTags(response.data.tags);
    }

    useLayoutEffect(() => {
        loadTag()
    }, []);

    function handleClick() {
        setErrors(validate(values));
    }

    // useEffect(async () => {
    //     await loadTag();
    // }, []);

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;

        setValues({...values, [name]: value})
        console.log(values);
    }

    const handleSubmit = async event => {
        event.preventDefault();

        await setErrors(validate(values));
        console.log(errors);
        if (Object.keys(errors).length === 0) {
        //     setLoading(true);
        //     try {
        const response = await addPost(values);
        console.log(response);
        //         setIsAuthenticated(response);
        //         navigate('/feed')
        //         toast.success('Bienvenue ! 😄')
        //     } catch ({response}) {
        //         toast.error(response.data.erreur + ' 😃')
        //         setLoading(false);
        //         console.log(response)
        //     }
        }
    };


    return (
            <Container component="main">
                <CssBaseline />
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '100%' }}
                    onSubmit={handleSubmit}
                >
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
                                    onChange={handleChange}
                                    error={ errors.title }
                                    helperText={ errors.title }
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
                                    onChange={handleChange}
                                    error={ errors.content }
                                    helperText={ errors.content }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    fullWidth
                                    options={tags}
                                    onChange={(event, value) => setValues({...values, ["tag"]: value})}
                                    autoComplete="tag"
                                    renderInput={(params) =>
                                        <TextField {...params}
                                                   required
                                                   id="tag"
                                                   name="tag"
                                                   label="Tag"
                                                   error={ errors.tag }
                                                   helperText={ errors.tag }
                                        />
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleClick}
                            // loading={loading}
                            // loadingPosition="end"
                        >
                            Créer
                        </Button>
                    </Box>
                </Grid>
            </Container>
    );
}