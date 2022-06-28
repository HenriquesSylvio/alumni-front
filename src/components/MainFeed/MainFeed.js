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
import Avatar from "@mui/material/Avatar";

export default function MainFeed({idPost, titre, description, createAt, firstName, lastName, nbComment, nbLike, url_profile_picture, like, couleur, ...rest}) {

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
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
            >
                <Avatar
                    sx={{ width: 50, height: 50}}
                    src= {url_profile_picture}
                />
                <Grid>
                    <Typography marginLeft={2} component="div" fontWeight={"bold"}>
                        {lastName} {firstName}
                    </Typography>
                    <Typography marginLeft={2}>
                        {createAt}
                    </Typography>
                </Grid>
            </Grid>
            {/*<h3></h3>*/}
            <Typography gutterBottom variant="h5" component="div" align={"center"} paddingTop={2}>
                {titre}
            </Typography>
            <p>{description}</p>
            <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                paddingRight={0}
            >
                <IconButton>
                    <ChatBubbleOutlineIcon/>
                </IconButton>
                {(nbComment = 0 && (
                        <Typography variant="body2" marginRight={2}>
                            0 commentaire(s)
                        </Typography>
                    ))
                    ||
                    <Typography variant="body2" marginRight={2}>
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
