import React, {useLayoutEffect, useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from "@mui/material/TextField";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {CircularProgress} from "@mui/material";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CreateIcon from '@mui/icons-material/Create';
import {addPost} from "../../services/AddPostApi";
import getTag from "../../services/GetTagApi";
import {Autocomplete} from "@mui/lab";
import validate from "../../validators/AddPostValidator";
import ButtonAddPost from "./ButtonAddPost";
import {useContext} from "react";
import OpenModalAddPost from "../../contexts/OpenModalAddPost";

export default function AddPostForm() {
    const [errors, setErrors] = useState({});
    const {isOpenAddPost, setIsOpenAddPost} = useContext(OpenModalAddPost);
    const [loadingForm, setLoadingForm] = React.useState(false);
    const [values, setValues] = useState({
        title: "",
        content: "",
        tag: {
            id: ""
        }
    });
    const [tags, setTags] = useState([]);

    const loadTag = async () => {
        const response = await getTag();
        setTags(response.data.tags);
    }

    useLayoutEffect(() => {
        loadTag()
    }, []);

    function handleClick() {
        setErrors(validate(values));
    }

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;

        setValues({...values, [name]: value})
    }

    const handleSubmit = async event => {
        setLoadingForm(true);
        event.preventDefault();

        await setErrors(validate(values));
        console.log(errors);
        if (Object.keys(errors).length === 0) {
            await addPost(values);
            toast.success('Le poste a été créer ! 😄')
            setIsOpenAddPost(false);
        }
        setLoadingForm(false);
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
                                    disabled={loadingForm}
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
                                    disabled={loadingForm}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    fullWidth
                                    options={tags}
                                    onChange={(event, value) => setValues({...values, ["tag"]: value})}
                                    autoComplete="tag"
                                    disabled={loadingForm}
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

                        {(loadingForm && (
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
                                loading={loadingForm}
                            >
                                Créer
                            </Button>
                        }
                    </Box>
                </Grid>
            </Container>
    );
}