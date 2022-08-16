import {useContext, useState} from "react";
import OpenModalSendMessage from "../../contexts/OpenModalSendMessage";
import {CardActions, CircularProgress, Fade, Modal, Paper} from "@mui/material";
import Button from "@mui/material/Button";
import {Box} from "@mui/system";
import Backdrop from "@mui/material/Backdrop";
import SendMessageForm from "./SendMessageForm";
import {postSubscribe} from "../../services/AddSubscribeApi";
import {deleteSubscribe} from "../../services/DeleteSubscribeApi";


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

export default function ButtonsInteractionUser({idUser, subscribe}) {
    // const {isOpenSendMessage, setIsOpenSendMessage} = useContext(OpenModalSendMessage);
    const {isOpenSendMessage, setIsOpenSendMessage} = useContext(OpenModalSendMessage);
    const [subscribeByUser, setSubscribe] = useState(subscribe);
    const [subscribeLoading, setSubscribeLoading] = useState(false);

    const handleOpen = () => {
        setIsOpenSendMessage(true);
    };

    const handleClose = () => {
        setIsOpenSendMessage(false)
    }

    const handleSubcribe = async () => {
        setSubscribeLoading(true)
        await postSubscribe(idUser)
        setSubscribe(true)
        setSubscribeLoading(false)
    };

    const handleRemoveSubcribe = async () => {
        setSubscribeLoading(true)
        await deleteSubscribe(idUser)
        setSubscribe(false)
        setSubscribeLoading(false)
    };

    return (
        <Box>
            {/*<CardActions>*/}
            {/*    {(subscribeLoading && (*/}
            {/*            <CircularProgress size={30} sx={{marginRight: 1}}/>*/}
            {/*        ))*/}
            {/*        ||*/}
            {/*        (subscribeByUser === true && (*/}
            {/*            <Button style={{backgroundColor: "#00A5A5"}} sx={{minWidth:95}} size="small" variant="contained" onClick={handleRemoveSubcribe}>Désabonner</Button>*/}
            {/*        ))*/}
            {/*        ||*/}
            {/*        <Button style={{backgroundColor: "#00A5A5"}} sx={{minWidth:95}} size="small" variant="contained" onClick={handleSubcribe}>S'abonner</Button>*/}
            {/*    }*/}
            {/*    /!*<Button style={{backgroundColor: "#00A5A5"}} sx={{minWidth:95}} size="small" variant="contained" onClick={handleSubcribe}>S'abonner</Button>*!/*/}
            {/*</CardActions>*/}
            {/*<CardActions onClick={handleOpen}>*/}
                <Button style={{backgroundColor: "#00A5A5"}} sx={{minWidth:95}} size="small" variant="contained" onClick={handleOpen}>Message</Button>
            {/*</CardActions>*/}
        </Box>
    );
}
