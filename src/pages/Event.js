import Box from "@mui/material/Box";
import {CircularProgress, Fade, Modal} from "@mui/material";
import Grid from "@mui/material/Grid";
import DetailUser from "../components/Profile/DetailUser";
import MainFeed from "../components/Post/MainFeed";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import AddCommentForm from "../components/Post/AddCommentForm";
import ActiveConnectedUser from "../contexts/ActiveConnectedUser";
import {useContext, useEffect, useState} from "react";
import EventCard from "../components/Event/EventCard";
import getEvents from "../services/GetEvents";
import getFeed from "../services/FeedApi";
import getCommentById from "../services/GetCommentByIdApi";

export default function Event() {

    const {activeProfile} = useContext(ActiveConnectedUser);
    const [loadingEvent, setLoadingEvent] = useState(false);
    const [events, setEvents] = useState([]);
    const [loadingPage, setLoading] = useState(true);

    let loadingDataEvent = false;
    let page = 1
    let newEvents = [];

    const getEventsComing = async () => {
        setLoadingEvent(true);
        try{
            const response = await getEvents(page);
            console.log(page)
            newEvents = response.data.data;
            console.log(newEvents)
            setEvents((oldEvents) => [...oldEvents, ...newEvents])
            page += 1
        } catch {
        }
        setLoadingEvent(false);
    };

    const handleScroll = async (e) =>{
        if(loadingDataEvent === false) {
            loadingDataEvent = true
            if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
                console.log("tzesqd")
                await getEventsComing()
            }
            loadingDataEvent = false
        }
    }


    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            await getEventsComing();
            setLoading(false);
        }
        getData();

        window.addEventListener('scroll', handleScroll)
    }, []);

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
        <Box>
            <Grid container spacing={3} paddingTop={8} paddingLeft="10%" paddingRight="10%">
                <Grid item xs sx={{ display: { xs: 'none', md: 'block' }}}>
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
                    />
                </Grid>

                <Grid item xs>

                    {
                        events.length ?
                            events.map(event =>
                                <Box sx={{
                                    marginTop: 2
                                }}>
                                    <p>{event.idEvent}</p>
                                    <EventCard event={event}/>
                                </Box>
                            ): null
                    }
                    {(loadingEvent && (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: 2
                        }}>
                            <CircularProgress sx={{justifyContent:"center", display:"flex"}}/>
                        </Box>
                    ))
                    }



                </Grid>
                <Grid item xs sx={{ display: { xs: 'none', md: 'block' }}}>
                </Grid>
            </Grid>
        </Box>
            )}

        </Box>
    )
}