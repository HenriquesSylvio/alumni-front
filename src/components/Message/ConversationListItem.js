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
import {useContext, useState} from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import OpenModalAddPost from "../../contexts/OpenModalAddPost";
import SelectedConversationIndex from "../../contexts/SelectedConversationIndex";
import getMessages from "../../services/GetMessagesApi";
import MessageConversation from "../../contexts/MessageConversation";

export default function ConversationListItem({conversation}) {
    const {selectedConversationIndex, setSelectedConversationIndex} = useContext(SelectedConversationIndex);
    const {messageConversation, setMessageConversation} = useContext(MessageConversation);

    const handleListItemClick = async (event, index) => {
        setSelectedConversationIndex(index);
        const response = await getMessages(index);
        console.log(response.data.message)
        setMessageConversation(response.data.messages);
        console.log(messageConversation);
    };

    return (
        <ListItemButton
            selected={selectedConversationIndex === conversation.id}
            onClick={(event) => handleListItemClick(event, conversation.id)}
        >
            <ListItemAvatar>
                <Avatar src={conversation.urlProfilePicture} />
            </ListItemAvatar>
            <ListItemText
                primary= {conversation.lastName + ' ' + conversation.firstName}
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {conversation.createAt}
                        </Typography>
                        {" — " + conversation.content}
                    </React.Fragment>
                }
            />
        </ListItemButton>
    );
}
