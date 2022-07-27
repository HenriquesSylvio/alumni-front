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

export default function Event() {

    const {activeProfile} = useContext(ActiveConnectedUser);

    const [events, setEvents] = useState([]);

    const getEventsComing = async () => {
        const response = await getEvents();
        console.log(response.data.data);
        setEvents(response.data.data);
    };

    useEffect(() => {
        const getData = async () => {
            await getEventsComing();
        }
        getData();
    }, []);

    return (
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
                    <EventCard/>
                </Grid>
                <Grid item xs sx={{ display: { xs: 'none', md: 'block' }}}>
                </Grid>
            </Grid>
        </Box>
    )

}