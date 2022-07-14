import {Fade, Modal, Paper, Stack} from '@mui/material';
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
// import OpenModalAddPost from "../contexts/OpenModalAddComment";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


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
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState('');
    const [loadingPage, setLoading] = useState(true);
    const {isOpenAddComment, setIsOpenAddComment} = useContext(OpenModalAddComment);
    const {idPost, setIdPost} = useContext(ResponseIdPost);
    // const [isOpenAddComment, setIsOpenAddComment] = useContext(OpenModalAddPost);
    let params = useParams();
    let newComments = [];
    let page = 1;

    const handleClose = () => {
        setIsOpenAddComment(false)
        setIdPost(0)
    }

    const getComment = async () => {
        console.log("test")
        const response = await getCommentById(params.id, page)

        newComments = response.data.posts.items;
        // setPosts((oldPosts) => [...oldPosts, ...newPosts])

        setComments((oldComments) => [...oldComments, ...newComments])
        console.log(response.data.posts.items)
        page += 1
    }

    const getPost = async () => {
        const response = await getPostById(params.id)
        setPost(response.data[0])
        console.log(response.data[0])
    };

    const handleScroll = async (e) =>{
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
            console.log(e.target.documentElement.scrollHeight);
            await getComment().then();
        }
    }

    useEffect( () => {
        getPost();
        getComment();
        window.addEventListener('scroll', handleScroll)
    }, [params.id]);

    return (
        <Grid container spacing={3} paddingTop={8} paddingLeft="10%" paddingRight="10%">
            <Grid item xs>
                <Item>xs</Item>
            </Grid>
            <Grid item xs={6}>
                {(post && (
                        <MainFeed
                            post={post}
                        />
                    ))
                    ||
                    null
                }
                <Typography paddingTop={5} variant="h4" component="div">
                    Commentaires
                </Typography>
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
            </Grid>
            <Grid item xs>
                <Item>xs</Item>
            </Grid>
            <Box>
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
            </Box>
        </Grid>
    )
}