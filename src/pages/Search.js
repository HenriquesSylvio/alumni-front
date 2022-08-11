import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import Box from '@mui/material/Box';
import MainFeed from "../components/Post/MainFeed";
import Grid from "@mui/material/Grid";
import DetailUser from "../components/Profile/DetailUser";
import Typography from "@mui/material/Typography";
import {CircularProgress, Fade, Modal} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import AddCommentForm from "../components/Post/AddCommentForm";
// import {useContext} from "@types/react";
import ActiveConnectedUser from "../contexts/ActiveConnectedUser";
import getPosts from "../services/GetPostsApi";
import getEvents from "../services/GetEvents";
import EventCard from "../components/Event/EventCard";
import MinimUser from "../components/Profile/MinimUser";

export default function Search() {

    const params = useParams();
    const [typeSearch, setTypeSearch] = useState("");
    const {activeProfile} = useContext(ActiveConnectedUser);
    const [posts, setPost] = useState('');
    const [events, setEvents] = useState('');

    useEffect( () => {
        const searchPosts = async () => {
            const response = await getPosts(1, "test");
            setPost(response.data.data)
        }

        const searchEvents = async () => {
            const response = await getEvents(1, "", "test");
            setEvents(response.data.data)
            console.log(response)
        }

        setTypeSearch(params.typeSearch)

        if (params.typeSearch === "post") {
            searchPosts()
        } else if (params.typeSearch === "event"){
            searchEvents()
        }
    }, [params.typeSearch]);

    return (
        <Box>
            <Grid container spacing={3} paddingTop={8} paddingLeft="10%" paddingRight="10%">
                <Grid item xs={4} sx={{ display: { xs: 'none', md: 'block' }}}>
                    <DetailUser
                        firstName={activeProfile.firstName}
                        lastName={activeProfile.lastName}
                        urlProfilePicture={activeProfile.urlProfilePicture}
                        nbSubscriber={activeProfile.followerNumber}
                        nbPosts='5'
                        nbSubscription={activeProfile.followingNumber}
                        promo={activeProfile.promo}
                        sector='Développeur'
                        biography={activeProfile.biography}
                        idUser={activeProfile.id}
                        subscribe={activeProfile.subcribe}
                        canModify={false}
                        myProfile={true}
                    />
                </Grid>
                <Grid item xs>
                    {(typeSearch === "post" && (
                        posts.length ?
                            posts.map(post =>
                                <Box sx={{
                                    marginBottom: 2
                                }}>
                                    <MainFeed
                                        post={post}
                                    />
                                </Box>
                            ): null
                    )) || typeSearch === "event" && (
                        events.length ?
                            events.map(event =>
                                <Box sx={{
                                    marginBottom: 2
                                }}>
                                    {/*<EventCard*/}
                                    {/*    event={event}*/}
                                    {/*/>*/}
                                    <MinimUser/>
                                </Box>
                            ): null
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}


// <Grid item xs>
//     <DetailUser
//         firstName={activeProfile.firstName}
//         lastName={activeProfile.lastName}
//         urlProfilePicture={activeProfile.urlProfilePicture}
//         nbSubscriber={activeProfile.followerNumber}
//         nbPosts='5'
//         nbSubscription={activeProfile.followingNumber}
//         promo={activeProfile.promo}
//         sector='Développeur'
//         biography={activeProfile.biography}
//         idUser={activeProfile.id}
//         subscribe={activeProfile.subcribe}
//         canModify={false}
//         myProfile={true}
//     />
// </Grid>