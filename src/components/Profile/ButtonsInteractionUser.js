import * as React from 'react';
import {Box} from "@mui/system";
import {Button, Card, CardActions, CardContent} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Grid";
import {deleteLikePost} from "../../services/DeleteLikePost";
import {postLikePost} from "../../services/LikePostApi";
import {postSubscribe} from "../../services/AddSubscribeApi";

export default function ButtonsInteractionUser({idUser}) {
    const handleSubcribe = async () => {
        await postSubscribe(idUser)
        console.log('noice');
        // setLike(!likeByUser);
        // setLikeLoading(true)
        // if (likeByUser === true){
        //     await deleteLikePost(idPost);
        //     setLikeCounter(likeCounter => likeCounter - 1);
        // } else {
        //     await postLikePost(idPost);
        //     setLikeCounter(likeCounter => likeCounter + 1);
        // }
        // setLikeLoading(false)
    };

    return (
        <>
            <CardActions>
                <Button style={{backgroundColor: "#00A5A5"}} sx={{minWidth:95}} size="small" variant="contained" onClick={handleSubcribe}>S'abonner</Button>
            </CardActions>
            <CardActions>
                <Button style={{backgroundColor: "#00A5A5"}} sx={{minWidth:95}} size="small" variant="contained">Message</Button>
            </CardActions>
        </>
    );
}
