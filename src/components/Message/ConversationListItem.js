import * as React from 'react';
import {Box} from "@mui/system";
import {Button, Card, CardActions, CardContent, CircularProgress, ListItemAvatar} from "@mui/material";
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
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

export default function ConversationListItem({lastName, firstName, urlProfilePicture, createAt, lastMessage}) {

    return (
        <ListItemButton
        >
            <ListItemAvatar>
                <Avatar src={urlProfilePicture} />
            </ListItemAvatar>
            <ListItemText
                primary= {lastName + ' ' + firstName}
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {createAt}
                        </Typography>
                        {" — " + lastMessage}
                    </React.Fragment>
                }
            />
        </ListItemButton>
    );
}
