import * as React from 'react';
import {Button} from "@mui/material";
import Box from "@mui/material/Box";
import ShowCommentModal from "./ShowCommentModal";
import {Redirect, useNavigate} from "react-router-dom";
import {Navigate, useLocation} from "react-router";

export default function ShowCommentButton({post}) {
    let navigate = useNavigate();

    const showComment = () => {
        // console.log(navigate)
        // navigate.replace(`/post/${post.idPost}`)
        navigate(`/post/${post.idPost}`, {replace: false});
        // navigate(`/post/${post.idPost}`)
        // navigate(0)
    };

    return (
        <Box>
            <Button variant="text" id={post.idPost} onClick={showComment
            }>Afficher les commentaires</Button>
            <ShowCommentModal post={post}/>
        </Box>
    );
}
