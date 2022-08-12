import * as React from 'react';
import {Box} from "@mui/system";
import {Button, Card, CardActions, CardContent, CircularProgress} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

export default function MinimUser({idUser ,firstName, lastName, urlProfilePicture}) {
    return (
        <Card sx={{ minWidth:"20%"}}>
            <Grid p={1}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box>
                        <Grid container>
                            <IconButton>
                                <Avatar
                                    sx={{ width: 60, height: 60}}
                                    src= {urlProfilePicture}
                                />
                            </IconButton>
                            <Grid marginTop={1}>
                                <Typography marginLeft={2} component="div" fontWeight={"bold"}>
                                    Henriques Sylvio
                                </Typography>
                                <Typography marginLeft={2}>
                                    Promo : 2022
                                </Typography>
                                <Typography marginLeft={2}>
                                    Filière : Developpeur
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box>
                        <Button style={{backgroundColor: "#00A5A5"}} sx={{minWidth:95, display: { xs: 'none', sm: 'block' }}} size="small" variant="contained">
                            Voir le profil
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    );
}
