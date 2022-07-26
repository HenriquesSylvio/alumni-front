import React from "react";
import {Button, Card} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function EventCard() {

    return (
        <Card  sx={{ paddingRight:1 }} >
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
            >
                <IconButton>
                    <Avatar
                        sx={{ width: 50, height: 50}}
                    />

                </IconButton>
                <Grid marginTop={2}>
                    <Typography marginLeft={2} component="div" fontWeight={"bold"}>
                        Henriques Sylvio
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
                    Ceci est le titre de l'event
                </Typography>
                <Typography marginLeft={2} component="div" fontWeight={"lighter"}>
                    09 Aout 2022
                </Typography>
                <p>Ceci est une description</p>
                <Button style={{backgroundColor: "#00A5A5"}} sx={{minWidth:95, marginBottom: 2}} size="small" variant="contained">
                    Participer
                </Button>
            </Grid>
        </Card>
    );
}
