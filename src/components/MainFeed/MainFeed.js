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
import {register} from "../../services/RegisterApi";
import {toast} from "react-toastify";
import {postLikePost} from "../../services/LikePostApi";
import {deleteLikePost} from "../../services/DeleteLikePost";

export default function MainFeed({titre, description, couleur, nbComment, nbLike, like, idPost, ...rest}) {

    const [likeCounter, setLikeCounter] = useState(nbLike);
    const [likeByUser, setLike] = useState(like);
    const LikePost = async () => {
        setLike(!likeByUser);
        if (likeByUser === true){
            await deleteLikePost(idPost);
            setLikeCounter(likeCounter => likeCounter - 1);
        } else {
            await postLikePost(idPost);
            setLikeCounter(likeCounter => likeCounter + 1);
        }
    };

    // const handleSubmit = async event => {
    //     event.preventDefault();
    //     // setErrors(validate(values));
    //     console.log(errors);
    //     if (Object.keys(errors).length === 0) {
    //         try {
    //             await register(values);
    //             toast.success('Votre compte a été créé. Il faut désormais que votre compte soit accepté par un administrateur ! 😄');
    //         } catch ({response}) {
    //             var error = response.data.erreur
    //             Object.keys(error).forEach(function (key) {
    //                 console.log(error.email);
    //                 toast.error(error[key] + ' 😃')
    //             });
    //             console.log(response)
    //         }
    //     }
    // };


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
