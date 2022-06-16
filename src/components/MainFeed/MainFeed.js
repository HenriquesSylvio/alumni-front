import React from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { Api } from "@mui/icons-material";
import { getPost } from "../../services/PostApi";



export default function MainFeed({titre, description, couleur, ...rest}) {

    const fetchPosts = async() => {
        const data = await PostApi.getPost;
        console.log(data);
    }

    return (
        <Box sx={{border: '1px solid #FEC800', p: 1, borderRadius: 5, width: "95%", backgroundColor: "white", color: couleur, ...rest}}>
            <h2>{titre}</h2>
            <p>{description}</p>
            <Button sx={{border: '1px solid #00A5A5', borderRadius: 10, color: "white", backgroundColor: "#00A5A5", '&:hover': {color: '#00A5A5'}}}>Voir plus</Button>
            
        </Box>
    );
}
