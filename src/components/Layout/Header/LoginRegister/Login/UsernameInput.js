import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function UsernameInput() {
    return (
        <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nom d'utilisateur"
            name="username"
            autoComplete="username"
            autoFocus
        />
    );
}
