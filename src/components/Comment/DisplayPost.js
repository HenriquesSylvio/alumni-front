// import * as React from 'react';
import React, {useState} from "react";
import {Button, CircularProgress, Divider, Fab, Fade, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Backdrop from '@mui/material/Backdrop';
import AddPostForm from "../Post/AddPostForm";
import OpenModalDiscussion from "../../contexts/OpenModalComment";
import {useContext, useLayoutEffect} from "react";
import MainFeed from "../Post/MainFeed";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ShowCommentButton from "./ShowCommentButton";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import {deleteLikePost} from "../../services/DeleteLikePost";
import {postLikePost} from "../../services/LikePostApi";

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

const styleButton = {
    margin: 0,
    top: 'auto',
    right: 100,
    bottom: 100,
    left: 'auto',
    position: 'fixed',
};

export default function DisplayPost({idPost, content, createAt, firstName, lastName, numberComment, numberLike, url_profile_picture, like, idUser}) {
    const {isOpenDiscussion, idActivePost,setIsOpenDiscussion} = useContext(OpenModalDiscussion);
    const [likeCounter, setLikeCounter] = useState(numberLike);
    const [likeByUser, setLike] = useState(like);
    const [likeLoading, setLikeLoading] = useState(false);

    const LikePost = async () => {
        setLike(!likeByUser);
        setLikeLoading(true)
        if (likeByUser === true){
            await deleteLikePost(idPost);
            setLikeCounter(likeCounter => likeCounter - 1);
        } else {
            await postLikePost(idPost);
            setLikeCounter(likeCounter => likeCounter + 1);
        }
        setLikeLoading(false)
    };

    const handleClose = () => {
        // console.log(post.idPost)
        setIsOpenDiscussion(0)
    }

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
    <Box>
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            // maxHeight={500}
        >
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
            >
                <IconButton>
                    <Avatar
                        sx={{ width: 50, height: 50}}
                        src= {url_profile_picture}
                    />
                </IconButton>
                <Grid marginTop={1}>
                    <Typography marginLeft={2} component="div" fontWeight={"bold"}>
                        {lastName} {firstName}
                    </Typography>
                    <Typography marginLeft={2}>
                        {createAt}
                    </Typography>
                </Grid>
            </Grid>
            <p>{content}</p>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Grid
                        container
                        // direction="row"
                        // justifyContent="flex-end"
                        alignItems="center"
                        paddingRight={0}
                    >
                        <IconButton sx={{marginRight: 1}}>
                            <ChatBubbleOutlineIcon/>
                        </IconButton>
                        <Typography variant="body2">
                            {numberComment}
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
        </Grid>
    </Box>
    );
}
