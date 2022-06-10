import * as React from 'react';
import {Button} from "@mui/material";
import Box from "@mui/material/Box";

export default function SignInButton() {
    return (
        <Box sx={{ p: 1 }}>
            <Button color="inherit" variant="outlined">
                Se connecter
            </Button>
        </Box>
    );
}
