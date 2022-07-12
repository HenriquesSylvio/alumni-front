import * as React from 'react';
import {Button, CircularProgress, Fab, Fade, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Backdrop from '@mui/material/Backdrop';
import AddPostForm from "../Post/AddPostForm";
import OpenModalComment from "../../contexts/OpenModalComment";
import {useContext, useState} from "react";
import ShowCommentModal from "./ShowCommentModal";
import getCommentByIdApi from "../../services/GetCommentByIdApi";

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

export default function ShowCommentButton({post}) {
    let {setIsOpenDiscussion} = useContext(OpenModalComment);
    const [commentLoading, setCommentLoading] = useState(false);
    const [comments, setComments] = useState();

    const handleOpen = event => {
        setIsOpenDiscussion(post.idPost)
    };

    const handleClose = () => {
        setIsOpenDiscussion(false)
    }

    // const loadComment = async () => {
    //     setCommentLoading(true);
    //     const response = await getCommentByIdApi(post.idPost)
    //     // console.log(response.data.posts.items);
    //     setComments(response.data.posts.items);
    //     // const response = await getTag();
    //     // setTags(response.data.tags);
    //     handleOpen();
    //     setCommentLoading(false);
    // }

    return (
        <Box>
            {/*{(commentLoading && (*/}
            {/*        <CircularProgress size={30} sx={{marginLeft: 10}}/>*/}
            {/*    ))*/}
            {/*    ||*/}
            <Button variant="text" id={post.idPost} onClick={handleOpen}>Afficher les commentaires</Button>
            <ShowCommentModal post={post}/>
        </Box>
    );
}
