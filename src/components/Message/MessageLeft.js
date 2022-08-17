import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {deepOrange} from "@mui/material/colors";
import {Theme} from "@emotion/react";
import {makeStyles, styled} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import {Box} from "@mui/system";

const MessageBlue = styled('div')(() => ({
    position: "relative",
    marginLeft: "20px",
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#A8DDFD",
    width: "60%",
    //height: "50px",
    textAlign: "left",
    font: "400 .9em 'Open Sans', sans-serif",
    border: "1px solid #97C6E3",
    borderRadius: "10px",
    "&:after": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "15px solid #A8DDFD",
        borderLeft: "15px solid transparent",
        borderRight: "15px solid transparent",
        top: "0",
        left: "-15px"
    },
    "&:before": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "17px solid #97C6E3",
        borderLeft: "16px solid transparent",
        borderRight: "16px solid transparent",
        top: "-1px",
        left: "-17px"
    }
}));

export default function MessageLeft({message, firstName, lastName}) {
    return (
        <>
            <Box display="flex">
                <Avatar/>
                    <div>
                        <Box marginLeft="25px">Henriques Sylvio</Box>
                        <MessageBlue>
                            <Box>
                                <Typography padding="0" margin="0">{message}</Typography>
                            </Box>
                        </MessageBlue>
                    </div>
            </Box>
        </>
    );
};