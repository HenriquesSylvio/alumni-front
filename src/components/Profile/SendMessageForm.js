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
import validate from "../../validators/SendMessageValidator";
import {addPost} from "../../services/AddPostApi";
import {toast} from "react-toastify";
import {addComment} from "../../services/AddCommentApi";
import OpenModalAddComment from "../../contexts/OpenModalAddComment";
import {CircularProgress} from "@mui/material";
import {addEvent} from "../../services/AddEventApi";
import OpenModalSendMessage from "../../contexts/OpenModalSendMessage";
import {sendMessage} from "../../services/SendMessageApi";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export default function SendMessageForm({idUser}) {
    const [errors, setErrors] = useState({});
    const [loadingForm, setLoadingForm] = React.useState(false);
    const {isOpenSendMessage, setIsOpenSendMessage} = useContext(OpenModalSendMessage);
    const [values, setValues] = useState({
        content: ""
    });

    const handleSubmit = async event => {
        event.preventDefault();

        setLoadingForm(true)
        setErrors(validate(values));
        if (Object.keys(errors).length === 0) {
            await sendMessage(values.content, idUser);
            toast.success('Le message a été envoyé ! 😄')
            setIsOpenSendMessage(false);
        }
        setLoadingForm(false)
    };

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;

        setValues({...values, [name]: value})
    }

    function handleClick() {
        setErrors(validate(values));
    }

    return (
        <Container component="main">
            <CssBaseline />
            <IconButton onClick={() => setIsOpenSendMessage(false)}>
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
                            disabled={loadingForm}
                        >
                            Envoyer
                        </Button>
                    }
                </Box>
            </Grid>
        </Container>
    );
}