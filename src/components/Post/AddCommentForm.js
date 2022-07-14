import React, {useContext, useLayoutEffect, useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from "@mui/material/TextField";
import 'react-toastify/dist/ReactToastify.css';
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CreateIcon from '@mui/icons-material/Create';
import validate from "../../validators/AddPostValidator";
import {addPost} from "../../services/AddPostApi";
import {toast} from "react-toastify";
import {addComment} from "../../services/AddCommentApi";
import OpenModalAddComment from "../../contexts/OpenModalAddComment";

export default function AddCommentForm({idPost}) {
    const {setIsOpenAddComment} = useContext(OpenModalAddComment);

    const [values, setValues] = useState({
        content: "",
    });

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;

        setValues({...values, [name]: value})
    }

    const handleSubmit = async event => {
        event.preventDefault();

        await addComment(values, idPost);
        toast.success('Le commentaire a été créer ! 😄')
        setIsOpenAddComment(false)
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
                    Création d'un commentaire
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
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
                            />
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Créer
                    </Button>
                </Box>
            </Grid>
        </Container>
    );
}