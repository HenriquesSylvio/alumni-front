import * as React from 'react';
import {Box} from "@mui/system";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    makeStyles,
    Paper,
    Stack
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Grid";

export default function DetailUser() {
    return (
        <Box marginLeft={5} marginRight={5} marginTop={-5} >
            <Card sx={{minWidth: 450, maxWidth: 450}} >
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Avatar
                        alt="Henriques Sylvio"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 100, height: 100, position: "absolute"}}
                    />
                </Box>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    paddingLeft={8}
                    paddingRight={8}
                    paddingTop={3}
                >
                    <CardActions >
                        <Button style={{backgroundColor: "#00A5A5"}} sx={{minWidth:95}} size="small" variant="contained" >S'abonner</Button>
                    </CardActions>
                    <CardActions>
                        <Button style={{backgroundColor: "#00A5A5"}} sx={{minWidth:95}} size="small" variant="contained">Message</Button>
                    </CardActions>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="flex-start"
                    paddingTop={2}
                    paddingLeft={5}
                    paddingRight={5}
                >
                    <Box sx={{ position: "absolute"}} paddingRight={30}>
                        <Typography variant="body2" align={"center"} fontWeight={"bold"}>
                            16
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Abonnés
                        </Typography>
                    </Box>
                    <Box sx={{ position: "absolute"}}>
                        <Typography variant="body2" align={"center"} fontWeight={"bold"}>
                            16
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Postes
                        </Typography>
                    </Box>
                    <Box sx={{ position: "absolute"}} paddingLeft={30}>
                        <Typography variant="body2" align={"center"} fontWeight={"bold"}>
                            5
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Abonnements
                        </Typography>
                    </Box>
                </Grid>
                <Box paddingTop={6}>
                    <Typography gutterBottom variant="h6" component="div" align={"center"} >
                        Henriques Sylvio
                    </Typography>
                </Box>
                <CardContent>
                    <Typography color="text" align={"center"}>
                        Développeur en promo 2022
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
