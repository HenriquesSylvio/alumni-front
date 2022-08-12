import * as React from 'react';
import {Box} from "@mui/system";
import {Button, Card, CardActions, CardContent, CircularProgress} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

export default function MinimUser({user}) {
    return (
        <Card sx={{ minWidth:"20%"}}>
            <Grid>
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
                                    sx={{ width: 50, height: 50}}
                                    src= {user.urlProfilePicture}
                                />
                            </IconButton>
                            <Grid marginTop={1}>
                                <Typography marginLeft={2} component="div" fontWeight={"bold"}>
                                    {user.lastName} {user.firstName}
                                </Typography>
                                <Typography marginLeft={2}>
                                    Promo : {user.promo}
                                </Typography>
                                <Typography marginLeft={2}>
                                    Filière : {user.faculty_label}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box marginRight={2}>
                        <Button style={{backgroundColor: "#00A5A5"}} sx={{minWidth:95, display: { xs: 'none', sm: 'block' }}} size="small" variant="contained">
                            Voir le profil
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    );
}
