import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function PasswordInput() {
    return (
        <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
        />
    );
}
