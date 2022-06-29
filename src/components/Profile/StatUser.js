import * as React from 'react';
import {Box} from "@mui/system";
import {Button, Card, CardActions, CardContent} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Grid";

export default function StatUser({nbSubscriber, nbSubscription, nbPosts}) {
    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="flex-start"
                paddingTop={2}
                paddingLeft={5}
                paddingRight={5}
                sx={{ display: { xs: 'none', md: 'flex' }}}
            >
                <Box sx={{ position: "absolute"}} paddingRight={30}>
                    <Typography variant="body2" align={"center"} fontWeight={"bold"}>
                        {nbSubscriber}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Abonnés
                    </Typography>
                </Box>
                <Box sx={{ position: "absolute"}}>
                    <Typography variant="body2" align={"center"} fontWeight={"bold"}>
                        {nbPosts}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Postes
                    </Typography>
                </Box>
                <Box sx={{ position: "absolute"}} paddingLeft={30}>
                    <Typography variant="body2" align={"center"} fontWeight={"bold"}>
                        {nbSubscription}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Abonnements
                    </Typography>
                </Box>
            </Grid>

            <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="flex-start"
                paddingTop={8}
                paddingLeft={5}
                paddingRight={5}
                sx={{display: { xs: 'flex', md: 'none' }}}
            >
                <Box sx={{ position: "absolute"}} paddingRight={25}>
                    {(nbSubscriber = 0 && (
                            <Typography variant="body2" align={"center"} fontWeight={"bold"}>
                                0
                            </Typography>
                        ))
                        ||
                        <Typography variant="body2" align={"center"} fontWeight={"bold"}>
                            {nbSubscriber}
                        </Typography>
                    }
                    <Typography variant="body2" color="text.secondary">
                        Abonnés
                    </Typography>
                </Box>
                <Box sx={{ position: "absolute"}}>
                    <Typography variant="body2" align={"center"} fontWeight={"bold"}>
                        {nbPosts}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Postes
                    </Typography>
                </Box>
                <Box sx={{ position: "absolute"}} paddingLeft={25}>
                    {(nbSubscription = 0 && (
                            <Typography variant="body2" align={"center"} fontWeight={"bold"}>
                                0
                            </Typography>
                        ))
                        ||
                        <Typography variant="body2" align={"center"} fontWeight={"bold"}>
                            {nbSubscription}
                        </Typography>
                    }
                    <Typography variant="body2" color="text.secondary">
                        Abonnements
                    </Typography>
                </Box>
            </Grid>
        </>
    );
}
