import Box from "@mui/material/Box";
import {Button, Card, CircularProgress, Fade, Modal} from "@mui/material";
import Grid from "@mui/material/Grid";
import DetailUser from "../components/Profile/DetailUser";
import MainFeed from "../components/Post/MainFeed";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import AddCommentForm from "../components/Post/AddCommentForm";
import ActiveConnectedUser from "../contexts/ActiveConnectedUser";
import React,{useContext, useEffect, useState} from "react";
import EventCard from "../components/Event/EventCard";
import getEvents from "../services/GetEvents";
import getFeed from "../services/FeedApi";
import getCommentById from "../services/GetCommentByIdApi";
import ButtonAddPost from "../components/Post/ButtonAddPost";
// import {CalendarPicker, StaticDatePicker} from "@mui/lab";
// import {LocalizationProvider, StaticDatePicker} from "@mui/lab";
import { LocalizationProvider } from '@mui/x-date-pickers'
import ButtonAddEvent from "../components/Event/ButtonAddEvent";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CalendarPicker } from '@mui/x-date-pickers'
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import Moment from 'moment';
import getAllDateEvent from "../services/GetAllDateEventApi";

export default function Event() {

    const {activeProfile} = useContext(ActiveConnectedUser);
    const [canInterateEvent, setCanInterateEvent] = useState(false);
    const [loadingEvent, setLoadingEvent] = useState(false);
    const [loadingByDate, setLoadingByDate] = useState(false);
    const [events, setEvents] = useState([]);
    const [loadingPage, setLoading] = useState(true);
    const [dateCalendar, setDateCalendar] = React.useState(new Date());
    const [datesEvent, setDatesEvent] = useState([]);

    // let datesEvent = []
    let date = new Date();
    let today = new Date();
    let loadingDataEvent = false;
    let page = 1
    let newEvents = [];

    const customDayRenderer = (
        date: Date,
        selectedDates: Array<Date | null>,
        pickersDayProps: PickersDayProps<Date>
    ) => {

        const stringifiedDate = date.toISOString().slice(0, 10);
        // console.log(datesEvent)
        // Moment().add()
        if (datesEvent.includes(Moment(stringifiedDate).add(+1, "days").format('DD/MM/YYYY'))) {
            return <PickersDay {...pickersDayProps} />;
        }
        return <PickersDay {...pickersDayProps} disabled/>;
    };

    const getEventsComing = async () => {
        setLoadingEvent(true);
        try{
            console.log(Moment(date).format('YYYY-MM-DD'));
            const response = await getEvents(page, Moment(date).format('YYYY-MM-DD'));
            // console.log(page)
            newEvents = response.data.data;
            // console.log(newEvents)
            setEvents((oldEvents) => [...oldEvents, ...newEvents])
            page += 1
        } catch {
        }
        setLoadingEvent(false);
    };

    // const load

    const ChangeDate = async (newDate) => {
        setDateCalendar(newDate)
        setLoadingByDate(true);
        date = newDate
        setEvents('')
        await getEventsComing();
        // Moment(stringifiedDate).add(+1, "days").format('DD/MM/YYYY'))
        // console.log(Moment(date).format('DD/MM/YYYY') > Moment(newDate).format('DD/MM/YYYY'))
        // console.log(date. > newDate)
        // console.log(date.getTime())
        // console.log(today.getTime())
        if (date.getTime() > today.getTime()) {
            setCanInterateEvent(false)
        } else {
            setCanInterateEvent(true)
        }
        // setCanInterateEvent()
        setLoadingByDate(false);
    };

    const getDateEvent = async () => {
        const response = await getAllDateEvent();
        // console.log(response.data.dates)
        // for (var i = 0; i < response.data.length; i++){
        //     setDatesEvent((dates) => [...dates, response.data.dates[i].date])
        // }
        Object.keys(response.data.dates).forEach(function(key) {
            // arr.push(response.data.dates[key]);
            console.log(response.data.dates[key].date)
            setDatesEvent(currentDate => [...currentDate, response.data.dates[key].date])
            // datesEvent.push(response.data.dates[key].date)
        });
        console.log(datesEvent)
        // console.log(newEvents)
       //  setDatesEvent(response.dates)
       //  datesEvent = response.data.dates
       //  console.log(datesEvent)
       //  console.log(datesEvent.includes("{ 05 "))
    };

    const handleScroll = async (e) =>{
        if(loadingDataEvent === false) {
            loadingDataEvent = true
            if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
                // console.log("tzesqd")
                await getEventsComing()
            }
            loadingDataEvent = false
        }
    }


    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            await getEventsComing();
            await getDateEvent();
            console.log("dsddssqdqsdqdsqsd")
            setLoading(false);
        }
        getData();
        console.log("test2")
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
                    {(loadingByDate && (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: 2
                        }}>
                            <CircularProgress sx={{justifyContent:"center", display:"flex"}}/>
                        </Box>
                        ))
                        ||
                        ( events.length ?
                            events.map(event =>
                                <Box sx={{
                                    marginBottom: 2
                                }}>
                                    <EventCard event={event} canInterate={canInterateEvent}  />
                                </Box>
                            ):
                                <Typography paddingTop={5} variant="h4" component="div">
                                    Aucun événement trouvé !
                                </Typography>
                        )
                        ||
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: 2
                        }}>
                            <CircularProgress sx={{justifyContent:"center", display:"flex"}}/>
                        </Box>
                    }

                    {/*{*/}
                    {/*    events.length ?*/}
                    {/*        events.map(event =>*/}
                    {/*            <Box sx={{*/}
                    {/*                marginBottom: 2*/}
                    {/*            }}>*/}
                    {/*                <EventCard event={event}/>*/}
                    {/*            </Box>*/}
                    {/*        ): null*/}
                    {/*}*/}
                    {/*{(loadingEvent && (*/}
                    {/*    <Box sx={{*/}
                    {/*        display: 'flex',*/}
                    {/*        flexDirection: 'column',*/}
                    {/*        alignItems: 'center',*/}
                    {/*        marginTop: 2*/}
                    {/*    }}>*/}
                    {/*        <CircularProgress sx={{justifyContent:"center", display:"flex"}}/>*/}
                    {/*    </Box>*/}
                    {/*))*/}
                    {/*}*/}
                </Grid>
                <Grid item xs sx={{ display: { xs: 'none', md: 'block' }}}>
                    <Card>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            {/*<Grid container spacing={3}>*/}
                            {/*    <Grid item xs={12} md={6}>*/}
                            {/*<CalendarPicker date={date} renderDay={customDayRenderer} onChange={(newDate) => setDate(newDate)} />*/}
                            <CalendarPicker date={dateCalendar} renderDay={customDayRenderer} onChange={(newDate) => ChangeDate(newDate)} />
                            {/*    </Grid>*/}
                            {/*</Grid>*/}
                        </LocalizationProvider>
                    </Card>

                </Grid>
            </Grid>

            <ButtonAddEvent/>
        </Box>
            )}

        </Box>
    )
}