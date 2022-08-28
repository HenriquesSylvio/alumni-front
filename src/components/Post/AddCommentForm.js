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
import {CircularProgress} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function AddCommentForm({idPost}) {
    const {setIsOpenAddComment} = useContext(OpenModalAddComment);
    const [errors, setErrors] = useState({});
    const [loadingForm, setLoadingForm] = React.useState(false);
    const [values, setValues] = useState({
        content: "",
    });

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

        if (Object.keys(errors).length === 0) {
            await addComment(values, idPost);
            toast.success('Le commentaire a été créé ! 😄')
            setIsOpenAddComment(false)
        }
        setLoadingForm(false);
    };

    return (
        <Container component="main">
            <CssBaseline />
            <IconButton onClick={() => setIsOpenAddComment(false)}>
                <CloseIcon/>
            </IconButton>
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
                    <Grid container>
                        <Grid item>
                            <TextField
                                required
                                fullWidth
                                id="content"
                                name="content"
                                label="Contenu du commentaire"
                                multiline
                                rows={10}
                                onChange={handleChange}
                                error={ errors.content }
                                helperText={ errors.content }
                                disabled={loadingForm}
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