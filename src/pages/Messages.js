import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import {Button, CircularProgress, Divider, ListItemAvatar, Paper} from "@mui/material";
import ConversationListItem from "../components/Message/ConversationListItem";
import {useContext, useEffect, useState} from "react";
import getConversation from "../services/GetConversationApi";
import getProfile from "../services/ProfileApi";
import MainFeed from "../components/Post/MainFeed";
import Grid from "@mui/material/Grid";
import MessageLeft from "../components/Message/MessageLeft";
import MessageRight from "../components/Message/MessageRight";
import SendIcon from '@mui/icons-material/Send';
import MessageConversation from "../contexts/MessageConversation";
import TextField from "@mui/material/TextField";
import {sendMessage} from "../services/SendMessageApi";
import SelectedConversationIndex from "../contexts/SelectedConversationIndex";
import getMessages from "../services/GetMessagesApi";
import ActiveConnectedUser from "../contexts/ActiveConnectedUser";
import {getItem} from "../services/LocaleStorage";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Messages() {
    const [conversations, setConversations] = useState('');
    const [repeater, setRepeater] = useState(0)
    const {messageConversation, setMessageConversation} = useContext(MessageConversation);
    const {selectedConversationIndex, setSelectedConversationIndex} = useContext(SelectedConversationIndex);
    const [activeProfile] = useState(JSON.parse(getItem('Profile')));
    const [hiddenConversation, setHiddenConversation] = useState(false);
    // const [hiddenMessage, setHiddenMessage] = useState(false);
    let getLastConversation = 0;
    const [values, setValues] = useState({
        content: "",
    });
    const [content, setContent] = useState();

    const getConversations = async () => {
        const response = await getConversation()
        getLastConversation = response.data.conversations[0].id;
        setConversations(response.data.conversations)
    };

    const getAllMessage = async () => {
        if (messageConversation.length === 0) {
            setSelectedConversationIndex(conversations[0].id)
        }
        const response = await getMessages(selectedConversationIndex)
        setMessageConversation(response.data.messages)
    };

    const handleSubmit = async event => {
        event.preventDefault();
        // setConversations((oldMessage) => )
        setContent((oldMessage) => [...oldMessage, ...content])
        setContent("");
        await scrollBarGoDown()
        await sendMessage(values.content, selectedConversationIndex)
    };

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;

        setValues({...values, [name]: value})
        setContent(value);
    }

    const invisibleConversation = () => {
        setHiddenConversation(false)
    }

    useEffect( () => {
        const getData = async () => {
            await getConversations();
            await getAllMessage();
        }
        getData();

        setTimeout(() => setRepeater(prevState=>prevState+1), 1000);
    }, [repeater]);


    const handleListItemClick = async (event, index) => {
        setSelectedConversationIndex(index);
        setHiddenConversation(true)
        await getAllMessage();
        await scrollBarGoDown();
    };

    const scrollBarGoDown = () => {
        const element = document.getElementById('chat');
        element.scrollTop = element.scrollHeight;
    };

    return (
        <Box paddingTop={1}>
            <Grid container>
                <Grid item style={{width:"375px"}} sx={{ display: { xs: 'none', md: 'block' }}}>
                    <Paper style={{boxShadow: "none", height:'90vh', display:'flex', flexDirection:'column',overflow: 'auto'}}>
                        <List style={{height: '100%', overflow: 'auto'}}>
                            {conversations.length ?
                                conversations.map(
                                    conversation =>
                                        <Box marginBottom={2} >
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
                                        </Box>
                                ): null
                            }
                        </List>
                    </Paper>
                </Grid>

                <Grid item hidden={hiddenConversation} sx={{ display: { md: 'none' }}}>
                    <Paper style={{boxShadow: "none", height:'90vh', display:'flex', flexDirection:'column',overflow: 'auto'}}>
                        <List style={{height: '100%', overflow: 'auto'}}>
                            {conversations.length ?
                                conversations.map(
                                    conversation =>
                                        <Box marginBottom={2} >
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
                                        </Box>
                                ): null
                            }
                        </List>
                    </Paper>
                </Grid>


                <Grid item xs sx={{ display: { xs: 'none', md: 'block' }}}>
                    <Paper id="chat" style={{boxShadow: "none", height:'84vh', display:'flex', flexDirection:'column',overflow: "scroll"}}>
                        {messageConversation.length ?
                            messageConversation.map(
                                message =>
                                    (message.idUser === activeProfile.id && (
                                        <MessageRight
                                            message={message.content}
                                            time={message.createAt}
                                        />
                                    ))
                                    ||
                                    <MessageLeft
                                        firstName={message.firstName}
                                        lastName={message.lastName}
                                        message={message.content}
                                        urlProfilePicture={message.urlProfilePicture}
                                        time={message.createAt}
                                    />
                            ): null
                        }
                    </Paper>
                    <Box onSubmit={handleSubmit} sx={{
                        display: "flex",
                        width: "100%",
                        paddingBottom: 0
                    }}>
                        <TextField
                            value={content}
                            sx={{width: "100%"}}
                            id="content"
                            label="Recherche"
                            name="content"
                            autoComplete="content"
                            onChange={handleChange}
                        />
                        <Button id="content-message" variant="contained" color="primary" onClick={handleSubmit}>
                            <SendIcon />
                        </Button>
                    </Box>
                </Grid>
            {/*</Grid>*/}

                <Grid item xs  hidden={!hiddenConversation} sx={{ display: { md: 'none' }}}>
                    <IconButton onClick={invisibleConversation}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Paper id="chat" style={{boxShadow: "none", height:'84vh', display:'flex', flexDirection:'column',overflow: "scroll"}}>
                        {messageConversation.length ?
                            messageConversation.map(
                                message =>
                                (message.idUser === activeProfile.id && (
                                    <MessageRight
                                        message={message.content}
                                        time={message.createAt}
                                    />
                                ))
                                ||
                                    <MessageLeft
                                        firstName={message.firstName}
                                        lastName={message.lastName}
                                        message={message.content}
                                        urlProfilePicture={message.urlProfilePicture}
                                        time={message.createAt}
                                    />
                            ): null
                        }
                    </Paper>
                    <Box onSubmit={handleSubmit} sx={{
                        display: "flex",
                        width: "100%",
                        paddingBottom: 0
                    }}>
                        <TextField
                            value={content}
                            sx={{width: "100%"}}
                            id="content"
                            label="Recherche"
                            name="content"
                            autoComplete="content"
                            onChange={handleChange}
                        />
                        <Button id="content-message" variant="contained" color="primary" onClick={handleSubmit}>
                            <SendIcon />
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>

    )
}