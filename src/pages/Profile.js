
import {Box} from "@mui/system";
import {CircularProgress, Fade, Modal, Paper, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import MainFeed from "../components/Post/MainFeed";
import DetailUser from "../components/Profile/DetailUser";
import getProfile from "../services/ProfileApi";
import React, {useContext, useEffect, useState} from 'react';
import getPostByUser from "../services/PostByUserApi";
import { useParams } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import SendMessageForm from "../components/Profile/SendMessageForm";
import OpenModalSendMessage from "../contexts/OpenModalSendMessage";

const styleBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    display: { xs: 'none', md: 'flex' },
};
const styleResponsiveBox = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display: { xs: 'flex', md: 'none' }
};

export default function Profile() {

    const [posts, setPosts] = useState('');
    const [user, setUser] = useState('');
    const [loadingPage, setLoading] = useState(true);
    const {isOpenSendMessage, setIsOpenSendMessage} = useContext(OpenModalSendMessage);
    let params = useParams();
    let userId = '';

    useEffect( () => {
        const getData = async () => {
            await getProfileUser();
            await getPostByUserId();
        }
        getData();

    }, []);

    const getProfileUser = async () => {
        const response = await getProfile(params.id)
        setUser(response.data)
        console.log(response.data);
        userId = response.data.id;
    };

    const handleClose = () => {
        setIsOpenSendMessage(false)
    }

    const getPostByUserId = async () => {
        console.log(userId);
        const response = await getPostByUser(userId)
        setPosts(response.data.posts)
        console.log(response.data.posts);
        setLoading(!loadingPage);
    };

        return (
            <Box
                sx={{
                    marginTop: 8,
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {loadingPage ? (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: 2
                    }}>
                        <CircularProgress sx={{justifyContent:"center", display:"flex"}}/>
                    </Box>
                ) : (
                    <Box paddingRight={"10%"} paddingLeft={"10%"}>
                        <Box>
                            <DetailUser
                                firstName={user.firstName}
                                lastName={user.lastName}
                                urlProfilePicture={user.urlProfilePicture}
                                nbSubscriber={user.followerNumber}
                                nbPosts='5'
                                nbSubscription={user.followingNumber}
                                promo={user.promo}
                                sector='Développeur'
                                biography={user.biography}
                                idUser={user.id}
                                subscribe={user.subcribe}
                                canModify={user.myProfile}
                                myProfile={user.myProfile}

                            />
                        </Box>
                        <Box display="flex" sx={{ flexDirection: 'column' }} marginTop={2}>
                               {
                                   posts.length ?
                                       <Typography marginLeft={5} variant="h6" component="div">
                                           Postes récents
                                       </Typography>
                                       :
                                       <Typography marginLeft={5} variant="h5" component="div">
                                           Aucun postes récents
                                       </Typography>
                               }
                               {posts.length ?
                                   posts.map(
                                       post =>
                                           <Box marginBottom={2} >
                                               <MainFeed
                                                   post={post}
                                               >
                                               </MainFeed>
                                           </Box>
                                   ): null
                               }
                        </Box>
                    </Box>
                )}
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={isOpenSendMessage}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={isOpenSendMessage}>
                        <Box>
                            <Paper sx={styleBox}>
                                <SendMessageForm idUser={params.id}/>
                            </Paper>
                            <Paper sx={styleResponsiveBox}>
                                <SendMessageForm idUser={params.id}/>
                            </Paper>
                        </Box>
                    </Fade>
                </Modal>
            </Box>
        );
    }
