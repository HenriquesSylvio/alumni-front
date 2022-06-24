import React, {useState} from "react";
import { Box } from "@mui/system";
import {Button, Card, CircularProgress} from "@mui/material";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {grey} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import getProfile from "../../services/ProfileApi";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {register} from "../../services/RegisterApi";
import {toast} from "react-toastify";
import {postLikePost} from "../../services/LikePostApi";
import {deleteLikePost} from "../../services/DeleteLikePost";

export default function MainFeed({titre, description, couleur, nbComment, nbLike, like, idPost, ...rest}) {

    const [likeCounter, setLikeCounter] = useState(nbLike);
    const [likeByUser, setLike] = useState(like);
    const [likeLoading, setLikeLoading] = useState(false);
    const LikePost = async () => {
        setLike(!likeByUser);
        setLikeLoading(true)
        if (likeByUser === true){
            await deleteLikePost(idPost);
            setLikeCounter(likeCounter => likeCounter - 1);
        } else {
            await postLikePost(idPost);
            setLikeCounter(likeCounter => likeCounter + 1);
        }
        setLikeLoading(false)
    };


    return (
        <Card sx={{ p: 1, color: couleur, ...rest}} >
            <h3>{titre}</h3>
            <p>{description}</p>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >
                <IconButton>
                    <ChatBubbleOutlineIcon/>
                </IconButton>
                {(nbComment = 0 && (
                        <Typography variant="body2" marginRight={5}>
                            0 commentaire(s)
                        </Typography>
                    ))
                    ||
                    <Typography variant="body2" marginRight={5}>
                        {nbComment} commentaire(s)
                    </Typography>
                }



                {(likeLoading && (
                        <CircularProgress size={30} sx={{marginRight: 1}}/>
                    ))
                    ||
                    (likeByUser === true && (
                        <IconButton onClick={LikePost} sx={{marginRight: 1}}>
                            <ThumbUpIcon/>
                        </IconButton>
                    ))
                    ||
                    <IconButton onClick={LikePost} sx={{marginRight: 1}}>
                        <ThumbUpOffAltIcon/>
                    </IconButton>
                }

                <Typography variant="body2">
                    {likeCounter} like(s)
                </Typography>
            </Grid>
            <Button variant="text">Afficher cette discussion</Button>

        </Card>
    );
}
