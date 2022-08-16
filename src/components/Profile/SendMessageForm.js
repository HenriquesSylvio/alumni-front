import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
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

export default function SendMessageForm() {
    const [errors, setErrors] = useState({});
    const [loadingForm, setLoadingForm] = React.useState(false);
    const [values, setValues] = useState({
        content: ""
    });

    useEffect( () => {
        console.log("test")
    }, []);

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
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <CreateIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Envoyer un message
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <Grid container>
                        <Grid item>
                            <TextField
                                required
                                fullWidth
                                id="content"
                                name="content"
                                label="Contenu du message"
                                multiline
                                rows={10}
                            />
                        </Grid>
                    </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Envoyer
                        </Button>
                </Box>
            </Grid>
        </Container>
    );
}