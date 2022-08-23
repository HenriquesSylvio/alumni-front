import React, {useEffect, useState} from "react";
import {Button, Card, CircularProgress} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {postParticipateEvent} from "../../services/ParticipateEventApi";
import {deleteParticipateEvent} from "../../services/DeleteParticipateEvent";
import Moment from "moment";

// export default function EventCard({firstName, lastName, title, idEvent, idUser, description, date}) {
export default function EventCard({event, canInterate}) {

    const [participateByUser, setParticipate] = useState(event.participate);
    const [participateLoading, setParticipateLoading] = useState(false);
    // const [canInterate, setCanInterate] = useState(false);
    let date = new Date();

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
        // console.log()
        // console.log(event.date > Moment().format('DD/MM/YYYY 00:00'))
    }, []);

    return (
        <Card  sx={{ paddingRight:1 }} >
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
            >
                <IconButton>
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
                        <Button style={{backgroundColor: "#00A5A5"}} sx={{minWidth:95, marginBottom: 2}} size="small" variant="contained" onClick={handleUnparticipate} disabled={event.date < Moment().format('DD/MM/YYYY 00:00')}>
                            Ne plus participer
                        </Button>
                    ))
                    ||
                    <Button style={{backgroundColor: "#00A5A5"}} sx={{minWidth:95, marginBottom: 2}} size="small" variant="contained" onClick={handleParticipate} disabled={event.date < Moment().format('DD/MM/YYYY 00:00')}>
                        Participer
                    </Button>
                }
            </Grid>
        </Card>
    );
}
