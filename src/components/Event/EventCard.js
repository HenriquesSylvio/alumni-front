import React, {useContext, useEffect, useState} from "react";
import {Button, Card, CircularProgress} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {postParticipateEvent} from "../../services/ParticipateEventApi";
import {deleteParticipateEvent} from "../../services/DeleteParticipateEvent";
import Moment from "moment";
import {useNavigate} from "react-router-dom";
import {Box} from "@mui/system";
import OpenModalParticipant from "../../contexts/OpenModalParticipant";

// export default function EventCard({firstName, lastName, title, idEvent, idUser, description, date}) {
export default function EventCard({event, canInterate}) {
    let  navigate = useNavigate();
    const [participateByUser, setParticipate] = useState(event.participate);
    const [participateLoading, setParticipateLoading] = useState(false);
    const {isOpenParticipant, setIsOpenParticipant} = useContext(OpenModalParticipant);
    // const [canInterate, setCanInterate] = useState(false);
    let date = new Date();
    let dateEvent = new Date(Moment(event.date).format('x'));
    const handleParticipate = async () => {
        setParticipateLoading(true)
        await postParticipateEvent(event.idEvent)
        setParticipate(true)
        setParticipateLoading(false)
    };

    const handleUnparticipate = async () => {
        setParticipateLoading(true)
        await deleteParticipateEvent(event.idEvent)
        setParticipate(false)
        setParticipateLoading(false)
    };


    const goProfile = () => {
        // console.log(event.idUser);
        navigate(`/profile/${event.idUser}`);
    };

    const handleClickParticipant = () => {
        setIsOpenParticipant(event.idEvent)
    };

    useEffect(() => {
        // console.log(date)
        // console.log(event.date)
        // console.log(Moment(date).format('DD/MM/YYYY HH:mm'))
        // console.log(event.date < Moment(date, 'MM/DD/YYYY').format('DD/MM/YYYY HH:mm'))
        // console.log(Moment(event.date, 'DD/MM/YYYY HH:mm').format('x'))
        // console.log(Moment().format('x'))
        // console.log(Moment(event.date, 'DD/MM/YYYY HH:mm').format('x')  < Moment().format('x'))

        // console.log(Moment(date,'YYYY-MM-DD').add(+1, "days").format('DD/MM/YYYY 00:00'))
        // let today = new Date("23/09/2022");
        // let dd = today.getDate();
        //
        // let mm = today.getMonth()+1;
        // let yyyy = today.getFullYear();
        //     if(dd<10)
        //     {
        //         dd='0'+dd;
        //     }
        //
        //     if(mm<10)
        //     {
        //         mm='0'+mm;
        //     }
        // today = dd+'/'+mm+'/'+yyyy;
        // console.log(today);
        },[]
    )


    return (
        <Card  sx={{ paddingRight:1 }} >
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid
                    item
                >
                    <Box marginTop={2}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                        >
                        <IconButton onClick={goProfile}>
                            <Avatar
                                src={event.urlProfilePicture}
                                sx={{ width: 50, height: 50}}
                            />
                        </IconButton>
                        <Typography marginLeft={2} component="div" fontWeight={"bold"}>
                            {event.lastName} {event.firstName}
                        </Typography>
                        </Grid>
                    </Box>
                </Grid>

                <Grid
                    item
                    align={"center"}
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                    onClick={handleClickParticipant}
                >
                    <Typography variant="body2"  fontWeight={"bold"} justifyContent="center">
                        {event.numberParticipant}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Participants
                    </Typography>
                </Grid>
            </Grid>

            <Grid
                item
                align={"center"}
                paddingBottom={2}
                sx={{ display: { xs: 'block', sm: 'none' } }}
                onClick={handleClickParticipant}
            >
                <Typography variant="body2"  fontWeight={"bold"} justifyContent="center">
                    {event.numberParticipant}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Participants
                </Typography>
            </Grid>

            <Grid
                container
                direction="column"
                justifyContent="space-evenly"
                alignItems="center"
            >
                <Typography  component="div" fontWeight={"bold"}>
                    {event.title}
                </Typography>
                <Typography component="div" fontWeight={"lighter"}>
                    {event.date.split(" 00:00")}
                </Typography>
                <p>{event.description}</p>

                {(participateLoading && (
                        <CircularProgress size={30} sx={{marginBottom: 2}}/>
                    ))
                    ||
                    (participateByUser === true && (
                        <Button style={{backgroundColor: "#00A5A5"}} sx={{minWidth:95, marginBottom: 2}} size="small" variant="contained" onClick={handleUnparticipate} disabled={Moment(event.date, 'DD/MM/YYYY HH:mm').format('x')  < Moment().format('x')}>
                            Ne plus participer
                        </Button>
                    ))
                    ||
                    <Button style={{backgroundColor: "#00A5A5"}} sx={{minWidth:95, marginBottom: 2}} size="small" variant="contained" onClick={handleParticipate} disabled={Moment(event.date, 'DD/MM/YYYY HH:mm').format('x')  < Moment().format('x')}>
                        Participer
                    </Button>
                }
            </Grid>
        </Card>
    );
}
