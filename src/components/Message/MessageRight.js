import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material";

const MessageOrange = styled('div')(() => ({
        position: "relative",
        marginRight: "20px",
        marginBottom: "10px",
        padding: "10px",
        backgroundColor: "#f8e896",
        width: "60%",
        //height: "50px",
        textAlign: "left",
        font: "400 .9em 'Open Sans', sans-serif",
        border: "1px solid #dfd087",
        borderRadius: "10px",
        "&:after": {
            content: "''",
            position: "absolute",
            width: "0",
            height: "0",
            borderTop: "15px solid #f8e896",
            borderLeft: "15px solid transparent",
            borderRight: "15px solid transparent",
            top: "0",
            right: "-15px"
        },
        "&:before": {
            content: "''",
            position: "absolute",
            width: "0",
            height: "0",
            borderTop: "17px solid #dfd087",
            borderLeft: "16px solid transparent",
            borderRight: "16px solid transparent",
            top: "-1px",
            right: "-17px"
        }
    }
));

export default function MessageRight({message, firstName, lastName}) {
    return (
        <Box display="flex" justifyContent="flex-end">
            <MessageOrange>
                <Box>
                    <Typography padding="0" margin="0">{message}</Typography>
                </Box>
            </MessageOrange>
        </Box>
    );
};