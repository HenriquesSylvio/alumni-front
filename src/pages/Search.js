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
import {getItem} from "../services/LocaleStorage";
import getFeed from "../services/FeedApi";

export default function Search() {

    const params = useParams();
    const [typeSearch, setTypeSearch] = useState("");
    const [posts, setPost] = useState('');
    const [events, setEvents] = useState('');
    const [users, setUsers] = useState('');
    const [loadingNextPage, setLoadingNextPage] = useState(false);
    const [loadingPage, setLoading] = useState(true);
    const [activeProfile] = useState(JSON.parse(getItem('Profile')));
    let loadingData = false;
    let newData = [];
    let page = 1;

    const searchPosts = async () => {

        setLoadingNextPage(true);
        try{
            const response = await getPosts(page, params.word);
            console.log(response);
            newData = response.data.data
            setPost((oldPosts) => [...oldPosts, ...newData])
            page += 1
        } catch {
        }
        setLoadingNextPage(false)

    }

    const searchEvents = async () => {

        setLoadingNextPage(true);
        try{
            const response = await getEvents(page, "", params.word);
            console.log(response);
            newData = response.data.data
            setEvents((oldEvents) => [...oldEvents, ...newData])
            page += 1
        } catch {
        }
        setLoadingNextPage(false)
    }

    const searchUsers = async () => {
        setLoadingNextPage(true);
        try{
            const response = await getUsers(page, params.word);
            console.log(response);
            newData = response.data.data
            setUsers((oldUsers) => [...oldUsers, ...newData])
            page += 1
        } catch {
        }
        setLoadingNextPage(false);
    }

    useEffect( () => {
        // console.log(JSON.parse(getItem('Profile')).urlProfilePicture)
        setTypeSearch(params.typeSearch)
        const getData = async () => {
            setLoading(true);
            if (params.typeSearch === "post") {
                await searchPosts()
            } else if (params.typeSearch === "event"){
                await searchEvents()
            } else if (params.typeSearch === "user") {
                await searchUsers()
            }
            setLoading(false);
        }
        getData();


        window.addEventListener('scroll', handleScroll)
    }, [params.typeSearch, params.word]);

    const handleScroll = async (e) =>{
        if(loadingData === false) {
            loadingData = true
            if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
                // console.log("noice")
                if (params.typeSearch === "post") {
                    await searchPosts()
                } else if (params.typeSearch === "event"){
                    await searchEvents()
                } else if (params.typeSearch === "user") {
                    await searchUsers()
                }
            }
            loadingData = false
        }
    }

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
                    {(loadingNextPage && (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: 2
                        }}>
                            <CircularProgress sx={{justifyContent:"center", display:"flex"}}/>
                        </Box>
                    ))}
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