import {Paper, Stack} from '@mui/material';
import React, {useEffect, useState} from 'react';
import EventFeed from '../components/EventFeed/EventFeed';
import MainFeed from '../components/Post/MainFeed';
import getFeed from "../services/FeedApi";
import ButtonAddPost from "../components/Post/ButtonAddPost";
import {styled} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import {Box} from "@mui/system";
import {useParams} from "react-router-dom";
import getProfile from "../services/ProfileApi";
import getPostById from "../services/GetPostByIdApi";
import SearchInput from "../components/Layout/Header/SearchInput";
import IconProfilePicture from "../components/Layout/Header/IconProfilePicture";
import SignInButton from "../components/Layout/Header/LoginRegister/SignInButton";
import Typography from "@mui/material/Typography";
import getCommentById from "../services/GetCommentByIdApi";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function Post() {
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState('');
    const [user, setUser] = useState('');
    const [loadingPage, setLoading] = useState(true);
    let params = useParams();
    let userId = '';

    useEffect( () => {
        // await getProfileUser();
        getPost();
        getComment();
    }, [params.id]);

    const getProfileUser = async () => {
        // const response = await getProfile(params.id)
        // setUser(response.data)
        // console.log(response.data);
        // userId = response.data.id;
    };

    const getComment = async () => {
        const response = await getCommentById(params.id)
        // console.log(response.data[0])
        setComments(response.data.posts.items)
        console.log(response.data.posts.items)
    }

    const getPost = async () => {
        const response = await getPostById(params.id)
        // console.log(response.data[0])
        setPost(response.data[0])
        console.log(response.data[0])

        // setComments(response.data.posts)
        // console.log(response.data.posts);
        // setLoading(!loadingPage);
    };


    return (
        <Grid container spacing={3} paddingTop={8} paddingLeft="10%" paddingRight="10%">
            <Grid item xs>
                <Item>xs</Item>
            </Grid>
            <Grid item xs={6}>
                {(post && (
                        <MainFeed
                            // firstName={post.firstName}
                            // lastName={post.lastName}
                            // titre={post.title}
                            // description={post.content}
                            // nbComment={post.numberComment}
                            // nbLike={post.numberLike}
                            // like={post.like}
                            // idPost={post.idPost}
                            // createAt={post.createAt}
                            // url_profile_picture={post.urlProfilePicture}
                            // idUser={post.idUser}
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
                                    // firstName={post.firstName}
                                    // lastName={post.lastName}
                                    // titre={post.title}
                                    // description={post.content}
                                    // nbComment={post.numberComment}
                                    // nbLike={post.numberLike}
                                    // like={post.like}
                                    // idPost={post.idPost}
                                    // createAt={post.createAt}
                                    // url_profile_picture={post.urlProfilePicture}
                                    // idUser={post.idUser}
                                    post={comment}
                                >
                                </MainFeed>
                            </Box>
                    ): null
                }
            </Grid>
            <Grid item xs>
                <Item>xs</Item>
            </Grid>
        </Grid>
    )
}