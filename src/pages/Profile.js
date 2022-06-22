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
        <>
            <Box
                sx={{
                    marginTop: 8,
                    // marginLeft: 10,
                    // display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {/*<Paper*/}
                {/*    elevation={4}*/}
                {/*>*/}
                {/*    <Box p={5}>*/}
                {/*        <Grid*/}
                {/*            container spacing={1}*/}
                {/*            direction="row"*/}
                {/*        >*/}
                {/*            <Grid p={2}>*/}
                {/*                <Avatar*/}
                {/*                    alt="Remy Sharp"*/}
                {/*                    src="/static/images/avatar/1.jpg"*/}
                {/*                    sx={{ width: 200, height: 200  }}*/}
                {/*                />*/}
                {/*            </Grid>*/}
                {/*            <Grid item xs>*/}
                {/*                <Grid*/}
                {/*                    container spacing={1}*/}
                {/*                    direction="column"*/}
                {/*                >*/}
                {/*                    <Grid item>*/}
                {/*                        <Typography variant="subtitle1" component="div">*/}
                {/*                            Henriques Sylvio*/}
                {/*                        </Typography>*/}
                {/*                    </Grid>*/}
                {/*                    <Grid item xs>*/}
                {/*                        <Grid*/}
                {/*                            container spacing={1}*/}
                {/*                            direction="row"*/}
                {/*                        >*/}
                {/*                            <Grid item xs>*/}
                {/*                                <Item>Filière</Item>*/}
                {/*                            </Grid>*/}
                {/*                            <Grid item xs>*/}
                {/*                                <Item>Promo</Item>*/}
                {/*                            </Grid>*/}
                {/*                        </Grid>*/}
                {/*                    </Grid>*/}

                {/*                </Grid>*/}
                {/*            </Grid>*/}
                {/*            <Grid item xs>*/}
                {/*                <Typography variant="subtitle1" component="div">*/}
                {/*                    Abonnés*/}
                {/*                </Typography>*/}
                {/*            </Grid>*/}
                {/*            <Grid item xs>*/}
                {/*                <Box>*/}
                {/*                    <Typography variant="subtitle1">*/}
                {/*                        19*/}
                {/*                    </Typography>*/}
                {/*                    <Typography variant="subtitle1">*/}
                {/*                        Abonnements*/}
                {/*                    </Typography>*/}
                {/*                </Box>*/}
                {/*            </Grid>*/}
                {/*            <Grid item xs>*/}
                {/*            </Grid>*/}
                {/*        </Grid>*/}
                {/*        <Grid item xs>*/}
                {/*            <Item>*/}
                {/*                Bio*/}
                {/*            </Item>*/}
                {/*        </Grid>*/}
                {/*    </Box>*/}
                {/*</Paper>*/}

                {/*<Paper*/}
                {/*    elevation={4}*/}

                {/*>*/}
                    <Box sx={{ m: 1, background:'rgba(202,75,56,0.25)'}} paddingTop={10} minHeight={225} >
                        <Typography paddingRight={20} paddingLeft={20} paddingBottom={5} variant="h6" component="div">
                            Henriques Sylvio
                        </Typography>
                        <Typography paddingRight={20} paddingLeft={20} variant="subtitle1" component="div">
                            Ceci est une bio Ceci est une bio Ceci est une bio Ceci est une bio Ceci est une bio Ceci est une bio Ceci est une bio Ceci est une bio Ceci est une bio Ceci est une bioCeci est une bio Ceci est une bio Ceci est une bio Ceci est une bio Ceci est une bioCeci est une bio Ceci est une bio Ceci est une bio Ceci est une bio Ceci est une bio
                        </Typography>
                    </Box>
                    <Box style={{display: "flex"}}>
                        <Stack direction="column" alignItems="center" spacing={5} sx={{display:"flex", flex: 1,  color:"#CA4B38"}}>
                        </Stack>

                        {/*<Box marginLeft={5} marginRight={5} marginTop={-5} >*/}
                        {/*        <Card sx={{minWidth: 450, maxWidth: 450}} >*/}
                        {/*            <Box*/}
                        {/*                 display="flex"*/}
                        {/*                 justifyContent="center"*/}
                        {/*                 alignItems="center">*/}
                        {/*                <Avatar*/}
                        {/*                    alt="Henriques Sylvio"*/}
                        {/*                    src="/static/images/avatar/1.jpg"*/}
                        {/*                    sx={{ width: 100, height: 100, position: "absolute"}}*/}
                        {/*                />*/}
                        {/*            </Box>*/}
                        {/*            <Grid*/}
                        {/*                container*/}
                        {/*                direction="row"*/}
                        {/*                justifyContent="space-between"*/}
                        {/*                alignItems="flex-start"*/}
                        {/*                paddingLeft={8}*/}
                        {/*                paddingRight={8}*/}
                        {/*                paddingTop={3}*/}
                        {/*            >*/}
                        {/*                <CardActions >*/}
                        {/*                    <Button style={{backgroundColor: "#00A5A5"}} sx={{minWidth:95}} size="small" variant="contained" >S'abonner</Button>*/}
                        {/*                </CardActions>*/}
                        {/*                <CardActions>*/}
                        {/*                    <Button style={{backgroundColor: "#00A5A5"}} sx={{minWidth:95}} size="small" variant="contained">Message</Button>*/}
                        {/*                </CardActions>*/}
                        {/*            </Grid>*/}
                        {/*            <Grid*/}
                        {/*                container*/}
                        {/*                direction="row"*/}
                        {/*                justifyContent="space-around"*/}
                        {/*                alignItems="flex-start"*/}
                        {/*                paddingTop={2}*/}
                        {/*                paddingLeft={5}*/}
                        {/*                paddingRight={5}*/}
                        {/*            >*/}
                        {/*                <Box sx={{ position: "absolute"}} paddingRight={30}>*/}
                        {/*                    <Typography variant="body2" align={"center"} fontWeight={"bold"}>*/}
                        {/*                        16*/}
                        {/*                    </Typography>*/}
                        {/*                    <Typography variant="body2" color="text.secondary">*/}
                        {/*                        Abonnés*/}
                        {/*                    </Typography>*/}
                        {/*                </Box>*/}
                        {/*                <Box sx={{ position: "absolute"}}>*/}
                        {/*                    <Typography variant="body2" align={"center"} fontWeight={"bold"}>*/}
                        {/*                        16*/}
                        {/*                    </Typography>*/}
                        {/*                    <Typography variant="body2" color="text.secondary">*/}
                        {/*                        Postes*/}
                        {/*                    </Typography>*/}
                        {/*                </Box>*/}
                        {/*                <Box sx={{ position: "absolute"}} paddingLeft={30}>*/}
                        {/*                    <Typography variant="body2" align={"center"} fontWeight={"bold"}>*/}
                        {/*                        5*/}
                        {/*                    </Typography>*/}
                        {/*                    <Typography variant="body2" color="text.secondary">*/}
                        {/*                        Abonnements*/}
                        {/*                    </Typography>*/}
                        {/*                </Box>*/}
                        {/*            </Grid>*/}
                        {/*            <Box paddingTop={6}>*/}
                        {/*                <Typography gutterBottom variant="h6" component="div" align={"center"} >*/}
                        {/*                    Henriques Sylvio*/}
                        {/*                </Typography>*/}
                        {/*            </Box>*/}
                        {/*            <CardContent>*/}
                        {/*                <Typography color="text" align={"center"}>*/}
                        {/*                    Développeur en promo 2022*/}
                        {/*                </Typography>*/}
                        {/*            </CardContent>*/}

                        {/*        </Card>*/}
                        {/*    /!*</Stack>*!/*/}
                        {/*</Box>*/}
                        <DetailUser/>
                    </Box>
                {/*</Paper>*/}
            </Box>
        </>
    );
}
