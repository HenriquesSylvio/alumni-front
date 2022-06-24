import * as React from 'react';
import {Box} from "@mui/system";
import {Button, Card, CardActions, CardContent} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Grid";

export default function ButtonsInteractionUser() {
    return (
        <>
            <CardActions >
                <Button style={{backgroundColor: "#00A5A5"}} sx={{minWidth:95}} size="small" variant="contained" >S'abonner</Button>
            </CardActions>
            <CardActions>
                <Button style={{backgroundColor: "#00A5A5"}} sx={{minWidth:95}} size="small" variant="contained">Message</Button>
            </CardActions>
        </>
    );
}
