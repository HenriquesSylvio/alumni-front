import * as React from 'react';
import {Button} from "@mui/material";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";

export default function ShowCommentButton({post}) {
    let navigate = useNavigate();

    const showComment = () => {
        navigate(`/post/${post.idPost}`);
    };

    return (
        <Box>
            <Button variant="text" id={post.idPost} onClick={showComment}>Afficher les commentaires</Button>
        </Box>
    );
}
