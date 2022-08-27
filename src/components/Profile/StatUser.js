import * as React from 'react';
import {Box} from "@mui/system";
import {Button, Card, CardActions, CardContent, Fade, Modal} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Grid";
import validate from "../../validators/AddEventValidator";
import getSubscriber from "../../services/GetSubscriberApi";
import Backdrop from "@mui/material/Backdrop";
import AddCommentForm from "../Post/AddCommentForm";
import OpenModalAddComment from "../../contexts/OpenModalAddComment";
import OpenModalSubscriber from "../../contexts/OpenModalSubscriber";
import {useContext} from "react";
import SubscriberDiplay from "./SubscriberDiplay";
import Paper from "@mui/material/Paper";

const styleBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    display: { xs: 'none', md: 'flex' },
};
const styleResponsiveBox = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display: { xs: 'flex', md: 'none' }
};

export default function StatUser({nbSubscriber, nbSubscription, nbPosts, idUser}) {
    const {isOpenSubscriber, setIsOpenSubscriber} = useContext(OpenModalSubscriber);
    // function handleClickSubscriber() {
    //     console.log(idUser)
    // }
    const handleClickSubscriber = async () => {
        setIsOpenSubscriber(true)
    }

    const handleClose = () => {
        setIsOpenSubscriber(false)
    }

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                paddingTop={5}
                paddingLeft={4}
                paddingRight={4}
                spacing={3}
            >
                <Grid item paddingRight={3} onClick={handleClickSubscriber}>
                    <Typography variant="body2" align={"center"} fontWeight={"bold"} >
                        {nbSubscriber}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Abonnés
                    </Typography>
                </Grid>
                <Grid item >
                    <Typography variant="body2" align={"center"} fontWeight={"bold"}>
                        {nbPosts}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Publications
                    </Typography>
                </Grid>
                <Grid item paddingLeft={4}>
                    <Typography variant="body2" align={"center"} fontWeight={"bold"}>
                        {nbSubscription}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Abonnements
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                paddingTop={8}
                // paddingLeft={2}
                // paddingRight={2}
                sx={{display: { xs: 'flex', md: 'none' }}}
            >
                    <Grid item xs align={"center"} onClick={handleClickSubscriber}>
                        {(nbSubscriber = 0 && (
                            <Typography variant="body2" fontWeight={"bold"}>
                            0
                            </Typography>
                            ))
                            ||
                            <Typography variant="body2" fontWeight={"bold"}>
                        {nbSubscriber}
                            </Typography>
                        }
                        <Typography variant="body2" color="text.secondary">
                            Abonnés
                        </Typography>
                    </Grid>
                    <Grid item xs align={"center"} paddingRight={1}>
                        <Typography variant="body2"  fontWeight={"bold"}>
                            {nbPosts}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Publications
                        </Typography>
                    </Grid>
                    <Grid item xs align={"center"}>
                        {(nbSubscription = 0 && (
                            <Typography variant="body2" fontWeight={"bold"}>
                                0
                            </Typography>
                            ))
                            ||
                            <Typography variant="body2" fontWeight={"bold"}>
                                {nbSubscription}
                            </Typography>
                        }
                        <Typography variant="body2" color="text.secondary">
                            Abonnements
                        </Typography>
                    </Grid>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={isOpenSubscriber}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        {/*<Fade>*/}
                        <Fade in={isOpenSubscriber}>
                            <Box>
                                <Paper sx={styleBox}>
                                    <SubscriberDiplay idUser={idUser}/>
                                </Paper>
                                <Paper sx={styleResponsiveBox}>
                                    <SubscriberDiplay idUser={idUser}/>
                                </Paper>
                            </Box>
                        </Fade>
                    </Modal>
                {/*</Grid>*/}
            </Grid>
        </>
    );
}