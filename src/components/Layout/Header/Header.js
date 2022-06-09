import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchInput from './SearchInput';

export default function Header() {
    return (
        <Box>
            <AppBar position="relative">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Alumni NWS
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>
                        <SearchInput />
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
