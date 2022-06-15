import React from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";


export default function EventFeed({titre, description, couleur, ...rest}) {
    return (
        <Box sx={{border: '1px solid grey', p: 1, borderRadius: 2, width: "95%", color: couleur, ...rest}}>
            <h3>{titre}</h3>
            <p>{description}</p>
            <Button>En savoir plus</Button>
        </Box>
    );
}
