import React, {useState} from "react";
import { Box } from "@mui/system";
import {Button, Card} from "@mui/material";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {grey} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import getProfile from "../../services/ProfileApi";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

export default function MainFeed({titre, description, couleur, nbComment, nbLike, like, ...rest}) {

    const [likeCounter, setLikeCounter] = useState(nbLike);
    const [likeByUser, setLike] = useState(like);
    const LikePost = () => {
        setLike(!likeByUser);

        if (likeByUser === true){
            setLikeCounter(likeCounter => likeCounter - 1);
        } else {
            setLikeCounter(likeCounter => likeCounter + 1);
        }
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
                        <Typography variant="body2">
                            0 commentaire(s)
                        </Typography>
                    ))
                    ||
                    <Typography variant="body2">
                        {nbComment} commentaire(s)
                    </Typography>
                }

                {(likeByUser === true && (
                        <IconButton onClick={LikePost}>
                            <ThumbUpIcon/>
                        </IconButton>
                    ))
                    ||
                    <IconButton onClick={LikePost}>
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
