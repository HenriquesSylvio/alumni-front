import * as React from 'react';
import {Box} from "@mui/system";
import {Button, Card, CardActions, CardContent, CircularProgress} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Grid";
import {deleteLikePost} from "../../services/DeleteLikePost";
import {postLikePost} from "../../services/LikePostApi";
import {postSubscribe} from "../../services/AddSubscribeApi";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import {deleteSubscribe} from "../../services/DeleteSubscribeApi";
import {useState} from "react";

export default function ButtonsInteractionUser({idUser, subscribe}) {
    const [subscribeByUser, setSubscribe] = useState(subscribe);
    const [subscribeLoading, setSubscribeLoading] = useState(false);
    const handleSubcribe = async () => {
        setSubscribeLoading(true)
        await postSubscribe(idUser)
        setSubscribe(true)
        setSubscribeLoading(false)
    };

    const handleRemoveSubcribe = async () => {
        setSubscribeLoading(true)
        await deleteSubscribe(idUser)
        setSubscribe(false)
        setSubscribeLoading(false)
    };

    return (
        <>
            <CardActions>
                {(subscribeLoading && (
                        <CircularProgress size={30} sx={{marginRight: 1}}/>
                    ))
                    ||
                    (subscribeByUser === true && (
                        <Button style={{backgroundColor: "#00A5A5"}} sx={{minWidth:95}} size="small" variant="contained" onClick={handleRemoveSubcribe}>Se désabonner</Button>
                    ))
                    ||
                    <Button style={{backgroundColor: "#00A5A5"}} sx={{minWidth:95}} size="small" variant="contained" onClick={handleSubcribe}>S'abonner</Button>
                }
                {/*<Button style={{backgroundColor: "#00A5A5"}} sx={{minWidth:95}} size="small" variant="contained" onClick={handleSubcribe}>S'abonner</Button>*/}
            </CardActions>
            <CardActions>
                <Button style={{backgroundColor: "#00A5A5"}} sx={{minWidth:95}} size="small" variant="contained">Message</Button>
            </CardActions>
        </>
    );
}
