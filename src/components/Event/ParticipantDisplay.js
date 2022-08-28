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
import validate from "../../validators/EditProfileValidator";
import {addPost} from "../../services/AddPostApi";
import {toast} from "react-toastify";
import {addComment} from "../../services/AddCommentApi";
import OpenModalAddComment from "../../contexts/OpenModalAddComment";
import {CircularProgress} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import {createTheme, styled, ThemeProvider} from "@mui/material/styles";
import {EditProfile} from "../../services/EditProfile";
import {deleteObject, getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../config/firebaseConfig";
import getProfile from "../../services/ProfileApi";
import {addItem} from "../../services/LocaleStorage";
import { v4 } from "uuid";
import OpenModalEditProfile from "../../contexts/OpenModalEditProfile";
import OpenModalSubscriber from "../../contexts/OpenModalSubscriber";
import getFeed from "../../services/FeedApi";
import getSubscriber from "../../services/GetSubscriberApi";
import MainFeed from "../Post/MainFeed";
import OpenModalSubscription from "../../contexts/OpenModalSubscription";
import getSubscription from "../../services/GetSuscriptionApi";
import OpenModalParticipant from "../../contexts/OpenModalParticipant";
import getParticipate from "../../services/GetParticipateApi";
import MinimUser from "../Profile/MinimUser";

export default function ParticipantDisplay({idPost}) {

    const {isOpenParticipant, setIsOpenParticipant} = useContext(OpenModalParticipant);
    const [participants, setParticipants] = useState('');
    const [loadingParticipant, setLoadinParticipant] = useState(true);
    const theme = createTheme()

    useEffect(() => {
        const getData = async () => {
            // setLoading(true)
            // console.log(idUser)5
            setLoadinParticipant(true);
            // await getSubscriptions();
            await getParticipates()
            setLoadinParticipant(false);
            // setLoading(false)
        }
        getData();
    }, []);

    const getParticipates = async () => {
        const response =  await getParticipate(isOpenParticipant);
        setParticipants(response.data.participant)

    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <IconButton onClick={() => setIsOpenParticipant(false)}>
                    <CloseIcon/>
                </IconButton>
                {loadingParticipant ? (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: 2
                    }}>
                        <CircularProgress sx={{justifyContent:"center", display:"flex"}}/>
                    </Box>
                ) : (
                    (
                        participants.length ?
                            participants.map(user =>
                                <Box sx={{
                                    marginBottom: 2
                                }}>
                                    <MinimUser user={user}/>
                                </Box>
                            ) :
                            <Typography paddingTop={5} variant="h4" component="div">
                                Aucun participant !
                            </Typography>
                    ) ||
                    null

                )}
            </Container>
        </ThemeProvider>
    );
}