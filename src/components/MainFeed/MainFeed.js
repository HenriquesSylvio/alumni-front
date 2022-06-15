import React from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";


export default function MainFeed({titre, description, couleur, ...rest}) {
    return (
        <Box sx={{border: '1px solid #FEC800', p: 1, borderRadius: 5, width: "95%", backgroundColor: "white", color: couleur, ...rest}}>
            <h3>{titre}</h3>
            <p>{description}</p>
            <Button sx={{border: '1px solid #00A5A5', borderRadius: 10, color: "white", backgroundColor: "#00A5A5", '&:hover': {color: '#00A5A5'},}}>En savoir plus</Button>
            
        </Box>
    );
}
