import React, {useEffect, useState} from "react";
import {Button, Card, CircularProgress} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {postParticipateEvent} from "../../services/ParticipateEventApi";
import {deleteParticipateEvent} from "../../services/DeleteParticipateEvent";
import Moment from "moment";
import {useNavigate} from "react-router-dom";

// export default function EventCard({firstName, lastName, title, idEvent, idUser, description, date}) {
export default function EventCard({event, canInterate}) {
    let  navigate = useNavigate();
    const [participateByUser, setParticipate] = useState(event.participate);
    const [participateLoading, setParticipateLoading] = useState(false);
    // const [canInterate, setCanInterate] = useState(false);
    let date = new Date();
    let dateEvent = new Date(event.date);
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

    useEffect(() => {

        // console.log(Moment(event.date).format('DD/MM/YYYY'));
        // console.log)(Moment(.format('DD/MM/YYYY hh:mm'));
        // console.log(event.date < date) Moment().format('DD/MM/YYYY 00:00')
        // console.log(Moment(Moment().format('DD/MM/YYYY 00:00')).isAfter('2019-05-11'))
        // console.log(event.date)
        // console.log(Moment().format('MM/DD/YYYY'));
        // console.log(event.date < Moment().format('MM/DD/YYYY'))
        // console.log(Moment(dateEvent).toDate().getTime())
        // console.log(Moment(date).toDate().getTime())
        // console.log(Moment(dateEvent).toDate() < Moment(date).format('MM/DD/YYYY'))
        // console.log(dateEvent.toLocaleDateString('fr-FR'))
        // console.log(Moment(dateEvent.toLocaleDateString('fr-FR')).format('MM/DD/YYYY') < Moment().format('MM/DD/YYYY'))
    }, []);

    const goProfile = () => {
        // console.log(event.idUser);
        navigate(`/profile/${event.idUser}`);
    };

    return (
        <Card  sx={{ paddingRight:1 }} >
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
            >
                {/*<IconButton onClick={goProfile}>*/}
                {/*    <Avatar*/}
                {/*        sx={{ width: 50, height: 50}}*/}
                {/*        src= {post.urlProfilePicture}*/}
                {/*    />*/}
                {/*</IconButton>*/}
                <IconButton onClick={goProfile}>
                    <Avatar
                        src={event.urlProfilePicture}
                        sx={{ width: 50, height: 50}}
                    />
                </IconButton>
                <Grid marginTop={2}>
                    <Typography marginLeft={2} component="div" fontWeight={"bold"}>
                        {event.lastName} {event.firstName}
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                container
                direction="column"
                justifyContent="space-evenly"
                alignItems="center"
            >
                <Typography marginLeft={2} component="div" fontWeight={"bold"}>
                    {event.title}
                </Typography>
                <Typography marginLeft={2} component="div" fontWeight={"lighter"}>
                    {event.date.split(" 00:00")}
                </Typography>
                <p>{event.description}</p>

                {(participateLoading && (
                        <CircularProgress size={30} sx={{marginBottom: 2}}/>
                    ))
                    ||
                    (participateByUser === true && (
                        <Button style={{backgroundColor: "#00A5A5"}} sx={{minWidth:95, marginBottom: 2}} size="small" variant="contained" onClick={handleUnparticipate} disabled={Moment(dateEvent.toLocaleDateString('fr-FR')).format('MM/DD/YYYY') < Moment().format('MM/DD/YYYY')}>
                            Ne plus participer
                        </Button>
                    ))
                    ||
                    <Button style={{backgroundColor: "#00A5A5"}} sx={{minWidth:95, marginBottom: 2}} size="small" variant="contained" onClick={handleParticipate} disabled={Moment(dateEvent.toLocaleDateString('fr-FR')).format('MM/DD/YYYY') < Moment().format('MM/DD/YYYY')}>
                        Participer
                    </Button>
                }
            </Grid>
        </Card>
    );
}
