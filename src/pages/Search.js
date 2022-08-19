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
import {CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Search() {

    const params = useParams();
    const [typeSearch, setTypeSearch] = useState("");
    const {activeProfile} = useContext(ActiveConnectedUser);
    const [posts, setPost] = useState('');
    const [events, setEvents] = useState('');
    const [users, setUsers] = useState('');
    const [loadingPage, setLoading] = useState(true);

    useEffect( () => {
        const searchPosts = async () => {
            setLoading(true);
            const response = await getPosts(1, params.word);
            console.log(response);
            setPost(response.data.data)
            setLoading(false);
        }

        const searchEvents = async () => {
            setLoading(true);
            const response = await getEvents(1, "", params.word);
            setEvents(response.data.data)
            setLoading(false);
        }

        const searchUsers = async () => {
            setLoading(true);
            const response = await getUsers(1, params.word);
            setUsers(response.data.data)
            console.log(response.data.data)
            setLoading(false);
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
            {loadingPage ? (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 2
                }}>
                    <CircularProgress sx={{justifyContent:"center", display:"flex"}}/>
                </Box>
            ) : (
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
                            ):
                            <Typography paddingTop={5} variant="h4" component="div">
                                Aucune publication trouvée !
                            </Typography>
                    )) || typeSearch === "event" && (
                        events.length ?
                            events.map(event =>
                                <Box sx={{
                                    marginBottom: 2
                                }}>
                                    <EventCard event={event}/>
                                </Box>
                            ):
                            <Typography paddingTop={5} variant="h4" component="div">
                                Aucun événement trouvé !
                            </Typography>
                    ) || typeSearch === "user" && (
                        users.length ?
                            users.map(user =>
                                <Box sx={{
                                    marginBottom: 2
                                }}>
                                    <MinimUser user={user}/>
                                </Box>
                            ):
                            <Typography paddingTop={5} variant="h4" component="div">
                                Aucun utilisateur trouvé !
                            </Typography>
                    )}
                </Grid>
            </Grid>
            )}
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