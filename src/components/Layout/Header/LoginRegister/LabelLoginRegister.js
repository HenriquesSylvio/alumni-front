import * as React from 'react';
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function LabelLoginRegister({label}) {
    return (
        <>
            <Typography component="h1" variant="h5">
                {label}
            </Typography>
        </>
    );
}
