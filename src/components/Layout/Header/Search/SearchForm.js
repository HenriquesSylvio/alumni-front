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
import validate from "../../../../validators/LoginValidator";
import {login} from "../../../../services/AuthApi";
import {getItem} from "../../../../services/LocaleStorage";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import OpenModalSearch from "../../../../contexts/OpenModalSearch";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";



export default function SearchForm() {
    const navigate = useNavigate();
    const [alignment, setAlignment] = React.useState('user');
    const {isOpenSearch, setIsOpenSearch} = useContext(OpenModalSearch);
    let typeSearch = "user"
    const [values, setValues] = useState({
        search: "",
    });

    const handleChangeTypeSearch = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        if (newAlignment == null) {
            setAlignment(typeSearch)
        } else {
            setAlignment(newAlignment);
            typeSearch = newAlignment
        }
        console.log(typeSearch)
    };

    // const clickButtonSearch = event => {
    //     // event.preventDefault();
    //     navigate('/search/' + alignment + '/' + values.search, { replace: true })
    //     // console.log(alignment);
    // };

    const handleSubmit = event => {
        event.preventDefault();
        navigate('/search/' + alignment + '/' + values.search, { replace: true })
        setIsOpenSearch(false)
    };

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;

        setValues({...values, [name]: value})
    }
    return (
        <Container component="main">
            <CssBaseline />
            <IconButton onClick={() => setIsOpenSearch(false)}>
                <CloseIcon/>
            </IconButton>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100%' }}
                onSubmit={handleSubmit}
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
                        autoFocus
                        fullWidth
                        id="search"
                        label="Recherche"
                        name="search"
                        autoComplete="search"
                        onChange={handleChange}
                    />
                        <ToggleButtonGroup
                            sx = {{marginTop: 3, display: { xs: 'none', sm: 'flex' }}}
                            color="primary"
                            value={alignment}
                            exclusive
                            onChange={handleChangeTypeSearch}
                            fullWidth
                        >
                        <ToggleButton value="user">Utilisateur</ToggleButton>
                        <ToggleButton value="post">Publication</ToggleButton>
                        <ToggleButton value="event">Evenement</ToggleButton>
                    </ToggleButtonGroup>

                    <ToggleButtonGroup
                        sx = {{marginTop: 2, display: { xs: 'flex', sm: 'none' }}}
                        orientation="vertical"
                        value={alignment}
                        exclusive
                        onChange={handleChangeTypeSearch}
                        color="primary"
                    >
                        <ToggleButton value="user">Utilisateur</ToggleButton>
                        <ToggleButton value="post">Publication</ToggleButton>
                        <ToggleButton value="event">Evenement</ToggleButton>
                    </ToggleButtonGroup>
                    <Button
                        // type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSubmit}
                    >
                        Rechercher
                    </Button>
                </Box>
            </Grid>
        </Container>
    );
}
