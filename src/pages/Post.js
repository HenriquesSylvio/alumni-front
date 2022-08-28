import {Button, CircularProgress, Fade, Modal, Paper, Stack} from '@mui/material';
import {useEffect, useState} from 'react';
import MainFeed from '../components/Post/MainFeed';
import {styled} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import {useParams} from "react-router-dom";
import getPostById from "../services/GetPostByIdApi";
import Typography from "@mui/material/Typography";
import getCommentById from "../services/GetCommentByIdApi";
import Backdrop from "@mui/material/Backdrop";
import AddPostForm from "../components/Post/AddPostForm";
import OpenModalAddComment from "../contexts/OpenModalAddComment";
import {useContext} from "react";
import AddCommentForm from "../components/Post/AddCommentForm";
import ResponseIdPost from "../contexts/ResponseIdPost";
import getFeed from "../services/FeedApi";
import DetailUser from "../components/Profile/DetailUser";
import getProfile from "../services/ProfileApi";
// import OpenModalAddPost from "../contexts/OpenModalAddComment";
import ActiveConnectedUser from "../contexts/ActiveConnectedUser";
import {getItem} from "../services/LocaleStorage";
import SendMessageForm from "../components/Profile/SendMessageForm";
import OpenModalSendMessage from "../contexts/OpenModalSendMessage";
// import { useParams } from "react-router-dom";

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

export default function Post() {
    const [comments, setComments] = useState('');
    const [post, setPost] = useState('');
    const [loadingPage, setLoading] = useState(true);
    const {isOpenAddComment, setIsOpenAddComment} = useContext(OpenModalAddComment);
    const {idPost, setIdPost} = useContext(ResponseIdPost);
    const [author, setAuthor] = useState('');
    const [activeProfile] = useState(JSON.parse(getItem('Profile')));
    const [loadingComment, setLoadingComment] = useState(false);
    const {isOpenSendMessage, setIsOpenSendMessage} = useContext(OpenModalSendMessage);

    let idActivePost = "";
    const params = useParams();
    let newComments = [];
    let page = 1;
    let idAuthor = "";
    let loadingDataComment = false;

    const handleClose = () => {
        setIsOpenSendMessage(false);
        setIsOpenAddComment(false);
        // setIdPost(0)
    }

    const getComment = async () => {
        setLoadingComment(true);
        // if(loadingComment){
            try{
                const response = await getCommentById(params.id, page)
                newComments = response.data.posts.items;
                setComments((oldComments) => [...oldComments, ...newComments])
                page += 1
            } catch {
            }
        // }
        setLoadingComment(false);
    }

    const getPost = async () => {
        const response = await getPostById(params.id)
        setPost(response.data[0])
        idAuthor = response.data[0].idUser
    };

    const getProfileAuthor = async () => {
        const response = await getProfile(idAuthor)
        setAuthor(response.data)
    };

    const handleScroll = async (e) =>{
        if(loadingDataComment === false) {
            loadingDataComment = true
            if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
                await getComment()
            }
            loadingDataComment = false
        }
    }

    useEffect( () => {
        const getData = async () => {
            loadingDataComment = true
            setLoading(true);
            setComments('')
            await getPost();
            await getComment();
            await getProfileAuthor();
            setLoading(false);
            loadingDataComment = false
        }
        // idActivePost = params.id

        getData();
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [params.id]);

    return (
        <Box>
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

                <Grid container spacing={3} paddingTop={8} paddingLeft="10%" paddingRight="10%">
            <Grid item xs sx={{ display: { xs: 'none', md: 'block' }}}>
                <DetailUser
                    firstName={activeProfile.firstName}
                    lastName={activeProfile.lastName}
                    urlProfilePicture={activeProfile.urlProfilePicture}
                    nbSubscriber={activeProfile.followerNumber}
                    nbPosts={activeProfile.nbPosts}
                    nbSubscription={activeProfile.followingNumber}
                    promo={activeProfile.promo}
                    sector={activeProfile.faculty_label}
                    biography={activeProfile.biography}
                    idUser={activeProfile.id}
                    subscribe={activeProfile.subcribe}
                    canModify={false}
                    myProfile={true}
                />
            </Grid>
            <Grid item xs>
                {(post && (
                        <MainFeed
                            post={post}
                        />
                    ))
                    ||
                    null
                }
                {comments.length ?
                <Typography paddingTop={5} variant="h4" component="div" style={{fontFamily: 'Fugaz One'}}>
                    Commentaires
                </Typography>
                    :
                    <Typography paddingTop={5} variant="h4" component="div"  style={{fontFamily: 'Fugaz One'}}>
                        Aucun commentaire trouvé !
                    </Typography>
                }
                {comments.length ?
                    comments.map(
                        comment =>
                            <Box marginBottom={2} >
                                <MainFeed
                                    post={comment}
                                />
                            </Box>
                    ): null
                }
                {(loadingComment && (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: 2
                    }}>
                        <CircularProgress sx={{justifyContent:"center", display:"flex"}}/>
                    </Box>
                ))
                }

            </Grid>
            <Grid item xs sx={{ display: { xs: 'none', md: 'block' }}}>
                {(author && (
                        <DetailUser
                            firstName={author.firstName}
                            lastName={author.lastName}
                            urlProfilePicture={author.urlProfilePicture}
                            nbSubscriber={author.followerNumber}
                            nbPosts={author.nbPosts}
                            nbSubscription={author.followingNumber}
                            promo={author.promo}
                            sector={activeProfile.faculty_label}
                            biography={author.biography}
                            idUser={author.id}
                            subscribe={author.subcribe}
                            canModify={false}
                            myProfile={author.myProfile}
                        />
                    ))
                    ||
                    null
                }

            </Grid>
            {/*<Box>*/}
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={isOpenAddComment}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    {/*<Fade>*/}
                    <Fade in={isOpenAddComment}>
                        <Box>
                            <Box sx={styleBox}>
                                <AddCommentForm idPost={idPost}/>
                            </Box>
                            <Box sx={styleResponsiveBox}>
                                <AddCommentForm idPost={idPost}/>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
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
                                    <SendMessageForm idUser={author.id}/>
                                </Paper>
                                <Paper sx={styleResponsiveBox}>
                                    <SendMessageForm idUser={author.id}/>
                                </Paper>
                            </Box>
                        </Fade>
                    </Modal>
            {/*</Box>*/}
        </Grid>
            )}

        </Box>
    )
}