import React, {useEffect} from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { Api } from "@mui/icons-material";

import validate from "../../validators/LoginValidator";
import getFeed from "../../services/FeedApi";
import {login} from "../../services/AuthApi";
import {toast} from "react-toastify";



export default function MainFeed({titre, description, couleur, ...rest}) {

    // const fetchPosts = async() => {
    //     const data = await PostApi.getPost;
    //     console.log(data);
    // }
    // function getPostsData(PageNumber = 1) {
    //     const response = getFeed(1);
    //     console.log(response);
    //     console.log(response);
    // }

    //
    // async getPostsData(pageNumber = 1) {
    //     console.log(pageNumber)
    //     const url = `http://127.0.0.1:8000/api/posts?page=${pageNumber}`
    //     await axios.get(url)
    //         .then(response => {
    //             console.log(response.data['hydra:member'][0].author.firstName)
    //             this.setState({posts: response.data['hydra:member']})
    //             // pageNumberMax = Math.ceil(response.data['hydra:totalItems']/10)
    //             this.setState({pageNumberMax: Math.ceil(response.data['hydra:totalItems']/10)})
    //             // console.log(Math.ceil(response.data['hydra:totalItems']/10))
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }
    // *
    return (
        <Box sx={{border: '1px solid #FEC800', p: 1, borderRadius: 5, width: "95%", backgroundColor: "white", color: couleur, ...rest}}>
            <h2>{titre}</h2>
            <p>{description}</p>
            <Button sx={{border: '1px solid #00A5A5', borderRadius: 10, color: "white", backgroundColor: "#00A5A5", '&:hover': {color: '#00A5A5'}}}>Voir plus</Button>
            
        </Box>
    );
}
