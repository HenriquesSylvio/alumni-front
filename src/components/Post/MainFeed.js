import React, {useState} from "react";
import {Button, Card, CircularProgress} from "@mui/material";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {postLikePost} from "../../services/LikePostApi";
import {deleteLikePost} from "../../services/DeleteLikePost";
import Avatar from "@mui/material/Avatar";
import ShowCommentButton from "../Comment/ShowCommentButton";
import OpenModalAddComment from "../../contexts/OpenModalAddComment";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import ResponseIdPost from "../../contexts/ResponseIdPost";

export default function MainFeed({post, couleur, ...rest}) {
    let  navigate = useNavigate();
    const [likeCounter, setLikeCounter] = useState(post.numberLike);
    const [likeByUser, setLike] = useState(post.like);
    const [likeLoading, setLikeLoading] = useState(false);
    const {setIsOpenAddComment} = useContext(OpenModalAddComment);
    const {setIdPost} = useContext(ResponseIdPost);

    const handleOpen = () => {
        setIsOpenAddComment(true)
        console.log(post.idPost);
        setIdPost(post.idPost)
    }
    const LikePost = async () => {
        setLike(!likeByUser);
        setLikeLoading(true)
        if (likeByUser === true){
            await deleteLikePost(post.idPost);
            setLikeCounter(likeCounter => likeCounter - 1);
        } else {
            await postLikePost(post.idPost);
            setLikeCounter(likeCounter => likeCounter + 1);
        }
        setLikeLoading(false)
    };

    const goProfile = () => {
        console.log(post.idUser);
        navigate(`/profile/${post.idUser}`);
    };


    return (
        <Card  sx={{ paddingRight:1, color: couleur, ...rest}} >
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
            >
                <IconButton onClick={goProfile}>
                    <Avatar
                        sx={{ width: 50, height: 50}}
                        src= {post.urlProfilePicture}
                    />
                </IconButton>
                <Grid marginTop={1}>
                    <Typography marginLeft={2} component="div" fontWeight={"bold"}>
                        {post.lastName} {post.firstName}
                    </Typography>
                    <Typography marginLeft={2}>
                        {post.createAt}
                    </Typography>
                </Grid>
            </Grid>
            <p>{post.content}</p>
            <Grid container>
                <Grid item xs>
                    <ShowCommentButton post={post}/>
                </Grid>
                <Grid item>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        paddingRight={0}
                    >
                        <IconButton sx={{marginRight: 1}} onClick={handleOpen}>
                            <ChatBubbleOutlineIcon/>
                        </IconButton>
                        <Typography variant="body2">
                            {post.numberComment}
                        </Typography>
                        <Typography variant="body2" paddingRight={3} paddingLeft={1}>
                            commentaire(s)
                        </Typography>
                        {(likeLoading && (
                                <CircularProgress size={30} sx={{marginRight: 1}}/>
                            ))
                            ||
                            (likeByUser === true && (
                                <IconButton onClick={LikePost} sx={{marginRight: 1}}>
                                    <ThumbUpIcon/>
                                </IconButton>
                            ))
                            ||
                            <IconButton onClick={LikePost} sx={{marginRight: 1}}>
                                <ThumbUpOffAltIcon/>
                            </IconButton>
                        }
                        <Typography variant="body2">
                            {likeCounter}
                        </Typography>
                        <Typography variant="body2" paddingLeft={1}>
                            like(s)
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
}
