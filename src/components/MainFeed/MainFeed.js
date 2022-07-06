import React, {useState} from "react";
import {Button, Card, CircularProgress} from "@mui/material";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {postLikePost} from "../../services/LikePostApi";
import {deleteLikePost} from "../../services/DeleteLikePost";
import Avatar from "@mui/material/Avatar";
import {useNavigate} from "react-router-dom";
import ShowDiscussionButton from "./ShowDiscussionButton";

export default function MainFeed({idPost, titre, description, createAt, firstName, lastName, nbComment, nbLike, url_profile_picture, like, idUser, couleur, ...rest}) {
    let  navigate = useNavigate();
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

    const goProfile = () => {
        navigate(`/profile/${idUser}`);
    };


    return (
        <Card  sx={{ paddingRight:1, color: couleur, ...rest}} >
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
            >
                <IconButton onClick={goProfile}>
                    <Avatar
                        sx={{ width: 50, height: 50}}
                        src= {url_profile_picture}
                    />
                </IconButton>
                <Grid marginTop={1}>
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
                <IconButton sx={{marginRight: 1}}>
                    <ChatBubbleOutlineIcon/>
                </IconButton>
                {/*{(nbComment = 0 && (*/}
                {/*        <Typography variant="body2" marginRight={2}>*/}
                {/*            0 commentaire(s)*/}
                {/*        </Typography>*/}
                {/*    ))*/}
                {/*    ||*/}
                {/*    <Typography variant="body2" marginRight={2}>*/}
                {/*        {nbComment} commentaire(s)*/}
                {/*    </Typography>*/}
                {/*}*/}

                <Typography variant="body2">
                    {nbComment}
                </Typography>
                <Typography variant="body2" paddingRight={3} paddingLeft={1}>
                    commentaire(s)
                </Typography>
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
                    {likeCounter}
                </Typography>
                <Typography variant="body2" paddingLeft={1}>
                    like(s)
                </Typography>
            </Grid>
            <ShowDiscussionButton/>

        </Card>
    );
}
