import * as React from 'react';
import {Box} from "@mui/system";
import {Button, Card, CardActions, CardContent, CircularProgress} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import {useNavigate} from "react-router-dom";
import OpenModalSubscriber from "../../contexts/OpenModalSubscriber";
import {useContext} from "react";

export default function MinimUser({user}) {
    const {isOpenSubscriber, setIsOpenSubscriber} = useContext(OpenModalSubscriber);
    let  navigate = useNavigate();
    const goProfile = () => {
        setIsOpenSubscriber(false)
        navigate(`/profile/${user.id}`);
    };

    return (
        <Card sx={{ minWidth:"20%"}}>
            <Grid sx={{display: { xs: 'none', sm: 'block' }}}>
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

                    <Box marginRight={2} marginLeft={4}>
                        <Button style={{backgroundColor: "#00A5A5"}} sx={{minWidth:95}} size="small" variant="contained" onClick={goProfile}>
                            Voir le profil
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <Grid sx={{display: { xs: 'block', sm: 'none' }}} onClick={goProfile}>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <IconButton>
                        <Avatar
                            sx={{ width: 50, height: 50}}
                            src= {user.urlProfilePicture}
                        />
                    </IconButton>
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

        </Card>
    );
}
