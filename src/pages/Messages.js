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

export default function Messages() {
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <Box paddingTop={1}>
            <Paper style={{width:"25%", height:'100vh', display:'flex', flexDirection:'column',overflow: 'auto'}}>
                <List style={{height: '100%', overflow: 'auto'}}>
                    <ListItemButton
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                    >
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Brunch this weekend?"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Ali Connors
                                    </Typography>
                                    {" — I'll be in your neighborhood doing errands this…"}
                                </React.Fragment>
                            }
                        />
                    </ListItemButton>
                    <Divider variant="inset" component="li" />
                    <ConversationListItem firstName={"Sylvio"} lastName={"Henriques"} lastMessage={"test"} urlProfilePicture={"test"} createAt={"12/12/2022"}/>
                </List>
            </Paper>
        </Box>

    )
}