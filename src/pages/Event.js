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
import ButtonAddPost from "../components/Post/ButtonAddPost";
import {CalendarPicker, StaticDatePicker} from "@mui/lab";
// import {LocalizationProvider, StaticDatePicker} from "@mui/lab";
// import isWeekend from 'date-fns/isWeekend';
// import TextField from '@mui/material/TextField';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers'
import ButtonAddEvent from "../components/Event/ButtonAddEvent";

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
                                    marginBottom: 2
                                }}>
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
                    {/*<LocalizationProvider >*/}
                    {/*    <CalendarPicker />*/}
                    {/*</LocalizationProvider>*/}
                    {/*<LocalizationProvider dateAdapter={AdapterDateFns}>*/}
                    {/*    <StaticDatePicker<Date>*/}
                    {/*        orientation="landscape"*/}
                    {/*        openTo="day"*/}
                    {/*        value={value}*/}
                    {/*        shouldDisableDate={isWeekend}*/}
                    {/*        onChange={(newValue) => {*/}
                    {/*        setValue(newValue);*/}
                    {/*    }}*/}
                    {/*        renderInput={(params) => <TextField {...params} />}*/}
                    {/*        />*/}
                    {/*</LocalizationProvider>*/}
                </Grid>
            </Grid>

            <ButtonAddEvent/>
        </Box>
            )}

        </Box>
    )
}