import * as React from 'react';
import {Box} from "@mui/system";
import {Button, Card, CardActions, CardContent} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Grid";
import StatUser from "./StatUser";
import ButtonsInteractionUser from "./ButtonsInteractionUser";

export default function DetailUser({first_name, last_name, urlProfilePicture, nbSubscriber, nbSubscription, nbPosts, sector, promo, biography}) {
    return (
        <Card sx={{ minWidth:300}}>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Avatar
                    src= {urlProfilePicture}
                    sx={{ width: 100, height: 100, position: "absolute"}}
                />
            </Box>
            <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="flex-start"
                paddingLeft={8}
                paddingRight={8}
                paddingTop={2}
                sx={{ display: { xs: 'none', md: 'flex' }}}
            >
                <ButtonsInteractionUser/>
            </Grid>

            <StatUser nbSubscriber={nbSubscriber} nbPosts={nbPosts} nbSubscription={nbSubscription}/>

            <Box paddingTop={6}>
                <Typography gutterBottom variant="h6" component="div" align={"center"} >
                    {first_name} {last_name}
                </Typography>
                <Typography align={"center"}  paddingRight={2} paddingLeft={2} variant="subtitle1" component="div" color={"grey"}>
                    {biography}
                </Typography>
            </Box>
            <CardContent>
                <Typography color="text" align={"center"}>
                    {sector} en promo {promo}
                </Typography>
            </CardContent>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                paddingLeft={2}
                paddingRight={2}
                paddingTop={1}
                sx={{ display: { xs: 'flex', md: 'none' }}}
            >
                <ButtonsInteractionUser/>
            </Grid>
        </Card>
    );
}
