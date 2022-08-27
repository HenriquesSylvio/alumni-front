import Box from "@mui/material/Box";
import {Button, Card, CircularProgress, Fade, Modal} from "@mui/material";
import Grid from "@mui/material/Grid";
import DetailUser from "../components/Profile/DetailUser";
import Typography from "@mui/material/Typography";
import ActiveConnectedUser from "../contexts/ActiveConnectedUser";
import React,{useContext, useEffect, useState} from "react";
import EventCard from "../components/Event/EventCard";
import getEvents from "../services/GetEvents";
import { LocalizationProvider } from '@mui/x-date-pickers'
import ButtonAddEvent from "../components/Event/ButtonAddEvent";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CalendarPicker } from '@mui/x-date-pickers'
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import Moment from 'moment';
import getAllDateEvent from "../services/GetAllDateEventApi";
import {getItem} from "../services/LocaleStorage";
import frLocale from "date-fns/locale/fr";
import Backdrop from "@mui/material/Backdrop";
import AddEventForm from "../components/Event/AddEventForm";
import OpenModalAddPost from "../contexts/OpenModalAddPost";
import OpenModalParticipant from "../contexts/OpenModalParticipant";
import ParticipantDisplay from "../components/Event/ParticipantDisplay";


const styleResponsiveBox = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display: { xs: 'flex', md: 'none' }
};

const styleBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    display: { xs: 'none', md: 'flex' },
};

export default function Event() {
    const [activeProfile] = useState(JSON.parse(getItem('Profile')));
    const [canInterateEvent, setCanInterateEvent] = useState(false);
    const [loadingEvent, setLoadingEvent] = useState(false);
    const [loadingByDate, setLoadingByDate] = useState(false);
    const [events, setEvents] = useState([]);
    const [loadingPage, setLoading] = useState(true);
    const [dateCalendar, setDateCalendar] = React.useState(new Date());
    const [datesEvent, setDatesEvent] = useState([]);
    const {isOpenParticipant, setIsOpenParticipant} = useContext(OpenModalParticipant);

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
        // console.log(stringifiedDate);
        // console.log(Moment(syr,'DD-MM
        // -YYYY').add(+1, "days").format('DD/MM/YYYY 00:00'))
        if (datesEvent.includes(Moment(stringifiedDate,'YYYY-MM-DD').add(+1, "days").format('DD/MM/YYYY 00:00'))) {
            return <PickersDay {...pickersDayProps} />;
        }
        return <PickersDay {...pickersDayProps} disabled/>;
    };

    const getEventsComing = async () => {
        setLoadingEvent(true);
        try{
            // console.log(Moment(date).format('YYYY-MM-DD'));
            const response = await getEvents(page, Moment(date).format('YYYY-MM-DD'));
            newEvents = response.data.data;
            setEvents((oldEvents) => [...oldEvents, ...newEvents])
            page += 1
            console.log(response.data.data)
        } catch {
        }
        setLoadingEvent(false);
    };

    const ChangeDate = async (newDate) => {
        setDateCalendar(newDate)
        setLoadingByDate(true);
        date = newDate
        setEvents('')
        await getEventsComing()
        // console.log(newDate)
        // console.log(today.getTime())
        if (date.getTime() > today.getTime()) {
            setCanInterateEvent(false)
        } else {
            setCanInterateEvent(true)
        }
        setLoadingByDate(false);
    };

    const getDateEvent = async () => {
        const response = await getAllDateEvent();
        Object.keys(response.data.dates).forEach(function(key) {
            // arr.push(response.data.dates[key]);
            // console.log(response.data.dates[key].date)
            setDatesEvent(currentDate => [...currentDate, response.data.dates[key].date])
        });
        console.log(Moment(response.data.dates[0].date,'DD/MM/YYYY').format('DD/MM/YYYY'));
    };

    const handleScroll = async (e) =>{
        if(loadingDataEvent === false) {
            loadingDataEvent = true
            if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
                await getEventsComing()
            }
            loadingDataEvent = false
        }
    }

    const handleClose = () => {
        setIsOpenParticipant(0)
    }

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            await getEventsComing();
            await getDateEvent();
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
            <Grid item sx={{ display: { xs: 'block', md: 'none' }}}>
                <Card>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <CalendarPicker date={dateCalendar} renderDay={customDayRenderer} onChange={(newDate) => ChangeDate(newDate)} />
                    </LocalizationProvider>
                </Card>

            </Grid>
            <Grid container spacing={3} paddingTop={8} paddingLeft="10%" paddingRight="10%">
                <Grid item xs sx={{ display: { xs: 'none', md: 'block' }}}>
                    <DetailUser
                        firstName={activeProfile.firstName}
                        lastName={activeProfile.lastName}
                        urlProfilePicture={activeProfile.urlProfilePicture}
                        nbSubscriber={activeProfile.followerNumber}
                        nbPosts={activeProfile.nbPosts}
                        nbSubscription={activeProfile.followingNumber}
                        promo={activeProfile.promo}
                        sector={activeProfile.faculty_label}
                        biography={activeProfile.biography}
                        idUser={activeProfile.id}
                        subscribe={activeProfile.subcribe}
                        canModify={false}
                        myProfile={true}
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
                    <Card>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale}>
                            <CalendarPicker date={dateCalendar} renderDay={customDayRenderer} onChange={(newDate) => ChangeDate(newDate)} />
                        </LocalizationProvider>
                    </Card>

                </Grid>
            </Grid>

            <ButtonAddEvent/>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isOpenParticipant !== 0}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isOpenParticipant !== 0}>
                    <Box>
                        <Box sx={styleBox}>
                            <ParticipantDisplay/>
                        </Box>
                        <Box sx={styleResponsiveBox}>
                            <ParticipantDisplay/>
                        </Box>
                    </Box>

                </Fade>
            </Modal>
        </Box>
            )}

        </Box>
    )
}