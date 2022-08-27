import * as React from 'react';
import {Box} from "@mui/system";
import {Button, Card, CardActions, CardContent} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Grid";
import validate from "../../validators/AddEventValidator";
import getSubscriber from "../../services/GetSubscriberApi";

export default function StatUser({nbSubscriber, nbSubscription, nbPosts, idUser}) {

    // function handleClickSubscriber() {
    //     console.log(idUser)
    // }
    const handleClickSubscriber = async () => {
        const response = await getSubscriber(idUser)
        console.log(response)
    }

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                paddingTop={5}
                paddingLeft={4}
                paddingRight={4}
                spacing={3}
            >
                <Grid item paddingRight={3} onClick={handleClickSubscriber}>
                    <Typography variant="body2" align={"center"} fontWeight={"bold"} >
                        {nbSubscriber}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Abonnés
                    </Typography>
                </Grid>
                <Grid item >
                    <Typography variant="body2" align={"center"} fontWeight={"bold"}>
                        {nbPosts}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Publications
                    </Typography>
                </Grid>
                <Grid item paddingLeft={4}>
                    <Typography variant="body2" align={"center"} fontWeight={"bold"}>
                        {nbSubscription}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Abonnements
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                paddingTop={8}
                // paddingLeft={2}
                // paddingRight={2}
                sx={{display: { xs: 'flex', md: 'none' }}}
            >
                    <Grid item xs align={"center"} onClick={handleClickSubscriber}>
                        {(nbSubscriber = 0 && (
                            <Typography variant="body2" fontWeight={"bold"}>
                            0
                            </Typography>
                            ))
                            ||
                            <Typography variant="body2" fontWeight={"bold"}>
                        {nbSubscriber}
                            </Typography>
                        }
                        <Typography variant="body2" color="text.secondary">
                            Abonnés
                        </Typography>
                    </Grid>
                    <Grid item xs align={"center"} paddingRight={1}>
                        <Typography variant="body2"  fontWeight={"bold"}>
                            {nbPosts}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Publications
                        </Typography>
                    </Grid>
                    <Grid item xs align={"center"}>
                        {(nbSubscription = 0 && (
                            <Typography variant="body2" fontWeight={"bold"}>
                                0
                            </Typography>
                            ))
                            ||
                            <Typography variant="body2" fontWeight={"bold"}>
                                {nbSubscription}
                            </Typography>
                        }
                        <Typography variant="body2" color="text.secondary">
                            Abonnements
                        </Typography>
                    </Grid>
                {/*</Grid>*/}
            </Grid>
        </>
    );
}