import React from "react";
import { Box } from "@mui/system";
import {Button, Card} from "@mui/material";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {grey} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

export default function MainFeed({titre, description, couleur, nbComment, ...rest}) {
    return (
        <Card sx={{ p: 1, color: couleur, ...rest}} >
            <h3>{titre}</h3>
            <p>{description}</p>
            {/*<Button>En savoir plus</Button>*/}
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >
                <IconButton>
                    <ChatBubbleOutlineIcon/>
                </IconButton>
                <Typography variant="body2">
                    {nbComment} commentaire(s)
                </Typography>

                <IconButton>
                    <ThumbUpOffAltIcon/>
                </IconButton>
                <Typography variant="body2">
                    {nbComment} like(s)
                </Typography>

            </Grid>
            <Button variant="text">Afficher cette discussion</Button>

        </Card>
    );
}
