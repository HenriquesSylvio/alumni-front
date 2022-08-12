import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import Box from '@mui/material/Box';
import MainFeed from "../components/Post/MainFeed";
import Grid from "@mui/material/Grid";
import DetailUser from "../components/Profile/DetailUser";
import ActiveConnectedUser from "../contexts/ActiveConnectedUser";
import getPosts from "../services/GetPostsApi";
import getEvents from "../services/GetEvents";
import EventCard from "../components/Event/EventCard";
import MinimUser from "../components/Profile/MinimUser";
import getUsers from "../services/GetUsersApi";

export default function Search() {

    const params = useParams();
    const [typeSearch, setTypeSearch] = useState("");
    const {activeProfile} = useContext(ActiveConnectedUser);
    const [posts, setPost] = useState('');
    const [events, setEvents] = useState('');
    const [users, setUsers] = useState('');

    useEffect( () => {
        const searchPosts = async () => {
            const response = await getPosts(1, params.word);
            setPost(response.data.data)
        }

        const searchEvents = async () => {
            const response = await getEvents(1, "", params.word);
            setEvents(response.data.data)
            console.log(response)
        }

        const searchUsers = async () => {
            const response = await getUsers(1, params.word);
            setUsers(response.data.data)
            console.log(response.data.data)
        }

        setTypeSearch(params.typeSearch)

        if (params.typeSearch === "post") {
            searchPosts()
        } else if (params.typeSearch === "event"){
            searchEvents()
        } else if (params.typeSearch === "user") {
            searchUsers()
        }
    }, [params.typeSearch, params.word]);

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
                                    <MainFeed post={post}/>
                                </Box>
                            ): null
                    )) || typeSearch === "event" && (
                        events.length ?
                            events.map(event =>
                                <Box sx={{
                                    marginBottom: 2
                                }}>
                                    <EventCard event={event}/>
                                </Box>
                            ): null
                    ) || typeSearch === "user" && (
                        users.length ?
                            users.map(user =>
                                <Box sx={{
                                    marginBottom: 2
                                }}>
                                    <MinimUser user={user}/>
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