import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import {Divider, ListItemAvatar, Paper} from "@mui/material";
import ConversationListItem from "../components/Message/ConversationListItem";
import {useContext, useEffect, useState} from "react";
import getConversation from "../services/GetConversationApi";
import getProfile from "../services/ProfileApi";
import MainFeed from "../components/Post/MainFeed";
import Grid from "@mui/material/Grid";
import MessageLeft from "../components/Message/MessageLeft";
import MessageRight from "../components/Message/MessageRight";

import MessageConversation from "../contexts/MessageConversation";

export default function Messages() {
    const [conversations, setConversations] = useState('');
    const {messageConversation} = useContext(MessageConversation);

    const getConversations = async () => {
        const response = await getConversation()
        console.log(response);
        setConversations(response.data.conversations)
    };

    useEffect( () => {
        const getData = async () => {
            await getConversations();
        }
        getData();

    }, []);

    return (
        <Box paddingTop={1}>
            <Grid container>
                <Grid item style={{width:"375px"}}>
                    <Paper style={{height:'92vh', display:'flex', flexDirection:'column',overflow: 'auto'}}>
                        <List style={{height: '100%', overflow: 'auto'}}>
                            {conversations.length ?
                                conversations.map(
                                    conversation =>
                                        <Box marginBottom={2} >
                                            <ConversationListItem conversation={conversation}/>
                                        </Box>
                                ): null
                            }
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper style={{height:'92vh', display:'flex', flexDirection:'column',overflow: 'auto'}}>
                        {/*<MessageLeft*/}
                        {/*    message="Ceci est un test !!! Ceci est un test !!! Ceci est un test !!! Ceci est un test !!! Ceci est un test !!! Ceci est un test !!!"*/}
                        {/*/>*/}
                        {/*<MessageRight*/}
                        {/*    message="Ceci est un test !!! Ceci ests un test !!! Ceci est un test !!! Ceci est un test !!! Ceci est un test !!! Ceci est un test !!!"*/}
                        {/*/>*/}
                        {messageConversation.length ?
                            messageConversation.map(
                                message =>
                                    <MessageRight
                                        message={message.content}
                                    />
                            ): null
                        }
                    </Paper>
                </Grid>
            </Grid>
        </Box>

    )
}