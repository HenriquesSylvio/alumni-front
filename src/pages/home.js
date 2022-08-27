import React, {useContext, useEffect} from "react"
import Button from '@mui/material/Button';
import ModalDialog from "../components/ModalDialog/ModalDialog";
import { useState } from "react";
import SignUp from "../components/Layout/Header/LoginRegister/Register/Register";
import {getItem} from "../services/LocaleStorage";
import {Box} from "@mui/system";
import {Card, CardActions, CardContent, Divider, makeStyles, Paper, styled} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import ButtonsInteractionUser from "../components/Profile/ButtonsInteractionUser";
import StatUser from "../components/Profile/StatUser";
import Typography from "@mui/material/Typography";
import EditProfileButton from "../components/Profile/EditProfileButton";
import test from "@fontsource/fira-sans/500.css"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import OpenModalAuth from "../contexts/OpenModalAuth";
import TabIndexAuth from "../contexts/TabIndexAuth";
import nwsBackground from "../../src/pictures/nws-background.jpg"

const Home = () => {
    const {isOpenAuth, setIsOpenAuth} = useContext(OpenModalAuth);
    const {tabIndexAuth, setTabIndexAuth} = useContext(TabIndexAuth);

    const handleOpenAuth = () => {
        setTabIndexAuth("2");
        setIsOpenAuth(true);
    }


    const style = {
        backgroundColor: "#00A5A5",
        // borderTop: "1px solid #00A5A5",
        // textAlign: "center",
        padding: "20px",
        // position: "fixed",
        left: "0",
        bottom: "0",
        // height: "100px",
        width: "100%"
    };

    const TikTokIcon = ({ color = "white" }) => {
        return (
            <svg
                fill={color}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="25px"
                height="100%"
            >
                <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
            </svg>
        );
    };

    return (
        <Box>
            <Box>
                <Box
                    component="img"

                    sx={{
                        position: "absolute",
                        //   marginTop: -1,
                        // height: 420,
                        width: "100%",
                        // maxHeight: { xs: 233, md: 167 },
                        // maxWidth: { xs: 350, md: 250 },
                    }}
                    src={nwsBackground}
                />

            </Box>

            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '85vh' }}
                sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
                <Card sx={{ maxWidth: 1000,  position: "absolute", minHeight:500}}>
                    <Box display="flex" alignContent="center" alignItems="center" sx={{paddingTop:5}}>
                        <CardContent>
                            <Typography variant="h3" style={{fontFamily: 'Fira Sans'}} textAlign="center" sx={{paddingTop:1}}>
                                Bienvenue au site des alumnis de la
                            </Typography>
                            <br/>
                            <Typography variant="h2" component="div" className="font-link" style={{fontFamily: 'Fugaz One'}}  textAlign="center">
                                Normandie Web School !
                            </Typography>
                            <br/>
                            <Typography variant="h5" style={{fontFamily: 'Fira Sans'}} textAlign="center" paddingRight={"10%"} paddingLeft={"10%"}>
                                Nous vous souhaitons une bonne expérience sur cette plateforme !
                            </Typography>
                            <br/>
                            <Typography variant="h5" style={{fontFamily: 'Fira Sans'}} textAlign="center" paddingRight={"10%"} paddingLeft={"10%"}>
                                Cette plateforme est le réseau social de l’école. Ici vous pourrez contacter vos anciens camarades, participer à des évènements, interagir sur des publications et plus encore !
                            </Typography>
                            <br/>
                            <br/>
                            <Typography variant="h5" style={{fontFamily: 'Fira Sans'}} textAlign="center">
                                Pas encore inscrit ?
                            </Typography>
                            <Typography variant="h5" style={{fontFamily: 'Fira Sans'}} textAlign="center"  onClick={handleOpenAuth}>
                                Cliquez ici !
                            </Typography>
                        </CardContent>
                    </Box>

                </Card>
            </Grid>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '85vh' }}
                sx={{ display: { xs: 'flex', sm: 'none' } }}
            >
                <Card sx={{ maxWidth: 1000,  position: "absolute"}}>
                    <Box display="flex" alignContent="center" alignItems="center">
                        <CardContent>
                            <Typography variant="h6" style={{fontFamily: 'Fira Sans'}} textAlign="center" sx={{paddingTop:1}}>
                                Bienvenue au site des alulmnis de la
                            </Typography>
                            <Typography variant="h5" component="div" className="font-link" style={{fontFamily: 'Fugaz One'}}  textAlign="center">
                                Normandie Web School !
                            </Typography>
                            <br/>
                            <Typography variant="body2" style={{fontFamily: 'Fira Sans'}} textAlign="center" paddingRight={"10%"} paddingLeft={"10%"}>
                                Nous vous souhaitons une bonne expérience sur cette plateforme !
                            </Typography>
                            <br/>
                            <Typography variant="body2" style={{fontFamily: 'Fira Sans'}} textAlign="center" paddingRight={"10%"} paddingLeft={"10%"}>
                                Cette plateforme est le réseau social de l’école. Ici vous pourrez contacter vos anciens camarades, participer à des évènements, interagir sur des publications et plus encore !
                            </Typography>
                            <br/>
                            <Typography variant="body2" style={{fontFamily: 'Fira Sans'}} textAlign="center">
                                Pas encore inscrit ?
                            </Typography>
                            {/*<Box onClick={() => window.open("https://www.instagram.com/nws_rouen/")}>*/}
                                <Typography variant="body2" style={{fontFamily: 'Fira Sans'}} textAlign="center" onClick={handleOpenAuth}>
                                    Cliquez ici !
                                </Typography>
                            {/*</Box>*/}

                        </CardContent>
                    </Box>

                </Card>
            </Grid>


            <Box>
                <Box style={style}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Box sx={{marginRight: 5}}>
                            <Box display="flex"  color="white" marginBottom={1}>
                                <LocationOnIcon />
                                <Typography paddingLeft={2} variant="body2" style={{fontFamily: 'Fira Sans'}}>
                                    22 Place Henri Gadeau de Kerville 76100 ROUEN (Métro Saint-Sever)
                                </Typography>
                            </Box>
                            <Box display="flex"  color="white" marginBottom={1}>
                                <PhoneIcon />
                                <Typography paddingLeft={2} variant="body2" style={{fontFamily: 'Fira Sans'}} color="white">
                                    02 79 02 73 78
                                </Typography>
                            </Box>
                            <Box display="flex" color="white" marginBottom={1}>
                                <MailIcon />
                                <Typography paddingLeft={2} variant="body2" style={{fontFamily: 'Fira Sans'}} >
                                    contact@normandiewebschool.fr
                                </Typography>
                            </Box>
                        </Box>
                        {/*<Divider orientation="vertical" flexItem sx={{marginLeft: 5, marginRight: 5}} />*/}
                        <Box >
                            <Box display="flex"  color="white" marginBottom={1} onClick={() => window.open("https://www.instagram.com/nws_rouen/")}>
                                <InstagramIcon />
                                <Typography paddingLeft={2} variant="body2" style={{fontFamily: 'Fira Sans'}}>
                                    Normandie Web School (@nws_rouen)
                                </Typography>
                            </Box>
                            <Box display="flex"  color="white" marginBottom={1} onClick={() => window.open("https://www.tiktok.com/@normandiewebschool")}>
                                <TikTokIcon />
                                <Typography paddingLeft={2} variant="body2" style={{fontFamily: 'Fira Sans'}} color="white">
                                    @normandiewebschool
                                </Typography>
                            </Box>
                            <Box display="flex" color="white" onClick={() => window.open("https://www.linkedin.com/school/normandiewebschool/")} marginBottom={1}>
                                <LinkedInIcon />
                                <Typography paddingLeft={2} variant="body2" style={{fontFamily: 'Fira Sans'}}>
                                    https://www.linkedin.com/school/normandiewebschool/
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Box>
            </Box>
        </Box>

    // sx={{backgroundColor:"#00A5A5", color: "white", '&:hover': {color: '#00A5A5'}}} saria-label="add" onClick={handleOpen}
        // <Box display="flex" justifyContent="center" alignItems="center">
        //   <Avatar
        //       // src= {urlProfilePicture}
        //       sx={{ width: 100, height: 100, position: "absolute"}}
        //   />
        // </Box>
    )
}

export default Home