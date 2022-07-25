import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MessageIcon from '@mui/icons-material/Message';
import CelebrationIcon from '@mui/icons-material/Celebration';
import FeedIcon from '@mui/icons-material/Feed';
import WorkIcon from '@mui/icons-material/Work';

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
});

export default function BottomAppBar() {
    const [value, setValue] = React.useState('recents');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar
                position="fixed"
                color="primary"
                sx={{ top: 'auto', bottom: 0, bgcolor: 'white' }}
            >
                <Toolbar>
                    <BottomNavigation
                        sx={{ width: '100%' }}
                        value={value}
                        onChange={handleChange}
                    >
                        <BottomNavigationAction
                            label="Actualité"
                            value="Actualité"
                            icon={<FeedIcon />}
                        />
                        <BottomNavigationAction
                            label="Evenements"
                            value="Evenements"
                            icon={<CelebrationIcon />}
                        />

                        <BottomNavigationAction
                            label="Emplois"
                            value="Emplois"
                            icon={<WorkIcon />}
                        />
                        <BottomNavigationAction
                            label="Messages"
                            value="Messages"
                            icon={<MessageIcon />}
                        />
                    </BottomNavigation>
                    <StyledFab color="secondary">
                        <AddIcon />
                    </StyledFab>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}
