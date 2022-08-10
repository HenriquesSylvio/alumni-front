import * as React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import CreateIcon from "@mui/icons-material/Create";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {CircularProgress} from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import SearchIcon from "@mui/icons-material/Search";
import {ToggleButton, ToggleButtonGroup} from "@mui/lab";



export default function SearchForm() {

    const [alignment, setAlignment] = React.useState('web');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

    return (
        <Container component="main">
            <CssBaseline />
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100%' }}
                // onSubmit={handleSubmit}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <SearchIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Recherche
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    {/*<Grid container spacing={2}>*/}
                    {/*    <Grid item xs={12}>*/}
                    <TextField
                        required
                        fullWidth
                        id="search"
                        label="Recherche"
                        name="search"
                        autoComplete="search"
                    />

                    <ToggleButtonGroup
                        sx = {{marginTop: 2}}
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        fullWidth
                    >
                        <ToggleButton value="user">Utilisateur</ToggleButton>
                        <ToggleButton value="post">Publication</ToggleButton>
                        <ToggleButton value="event">Evenement</ToggleButton>
                    </ToggleButtonGroup>
                        {/*</Grid>*/}
                    {/*</Grid>*/}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Rechercher
                    </Button>
                </Box>
            </Grid>
        </Container>
    );
}
