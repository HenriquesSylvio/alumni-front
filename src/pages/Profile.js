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
import MainFeed from "../components/MainFeed/MainFeed";
import EventFeed from "../components/EventFeed/EventFeed";
import DetailUser from "../components/Profile/DetailUser";

// const Item = styled(Paper)(({ theme }) => ({
//     ...theme.typography.body2,
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//     padding: 10,
//     lineHeight: '60px',
// }));

// const useStyles = makeStyles((theme) => ({
//     links: {
//         padding: '0 50px',
//         color: 'white',
//         "&:hover": {
//             textDecorationColor: "green",
//             cursor:'pointer'
//         }
//     },
//
// }));

export default function Feed() {
    return (
        <Box
            sx={{
                marginTop: 8,
                // marginLeft: 10,
                // display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Box sx={{ m: 1, background:'rgba(202,75,56,0.25)'}} paddingTop={10} minHeight={225} >
                <Typography paddingRight={20} paddingLeft={20} paddingBottom={5} variant="h6" component="div">
                    Henriques Sylvio
                </Typography>
                <Typography paddingRight={20} paddingLeft={20} variant="subtitle1" component="div">
                    Ceci est une bio Ceci est une bio Ceci est une bio Ceci est une bio Ceci est une bio Ceci est une bio Ceci est une bio Ceci est une bio Ceci est une bio Ceci est une bioCeci est une bio Ceci est une bio Ceci est une bio Ceci est une bio Ceci est une bioCeci est une bio Ceci est une bio Ceci est une bio Ceci est une bio Ceci est une bio
                </Typography>
            </Box>
            <Box style={{display: "flex"}}>
                {/*<Stack direction="column" alignItems="center" sx={{display:"flex", flex: 1}} marginLeft={5} marginRight={5} marginTop={-5}>*/}
                    <Box width="95%" marginLeft={5} marginRight={5} marginTop={-9} >
                        <Typography marginLeft={5} variant="h6" component="div">
                            Postes récents
                        </Typography>
                        <Stack direction="column" spacing={5}>
                            <MainFeed titre="La Normandie Web School recrute !" description="Nouvelle école dans le numérique, l'administration à besoin de vous, recherche tel type d'emploi" nbComment={5}></MainFeed>
                        </Stack>
                    </Box>
                {/*</Stack>*/}
                <Box marginLeft={5} marginRight={5} marginTop={-5}>
                    <DetailUser first_name='Sylvio' last_name='Henriques' urlProfilePicture='' nbSubscriber='5' nbPosts='5' nbSubscription='5' promo='2022' sector='Développeur'/>
                </Box>
            </Box>
        </Box>
    );
}
