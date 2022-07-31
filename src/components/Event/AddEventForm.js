import React, {useLayoutEffect, useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from "@mui/material/TextField";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {CircularProgress} from "@mui/material";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CreateIcon from '@mui/icons-material/Create';
import {addEvent} from "../../services/AddEventApi";
import validate from "../../validators/AddEventValidator";
import {useContext} from "react";
import OpenModalAddPost from "../../contexts/OpenModalAddPost";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {LocalizationProvider} from "@mui/lab";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function AddEventForm() {
    const [errors, setErrors] = useState({});
    const {isOpenAddPost, setIsOpenAddPost} = useContext(OpenModalAddPost);
    const [loadingForm, setLoadingForm] = React.useState(false);
    const [values, setValues] = useState({
        title: "",
        description: "",
        date: "25/11/2022"
    });
    // const [value, setValue] = React.useState<Date>("");

    function handleClick() {
        setErrors(validate(values));
    }

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;

        setValues({...values, [name]: value})
        // setValues({...values, ["date"]: "25/11/2022"})
        console.log(values)
    }

    const handleSubmit = async event => {
        setLoadingForm(true);
        event.preventDefault();

        await setErrors(validate(values));
        console.log(errors);
        if (Object.keys(errors).length === 0) {
            await addEvent(values);
            toast.success('L\'événement a été créer ! 😄')
            setIsOpenAddPost(false);
        }
        setLoadingForm(false);
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
                onSubmit={handleSubmit}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <CreateIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Création d'événement
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="title"
                                label="Titre de l'événement"
                                name="title"
                                autoComplete="title"
                                onChange={handleChange}
                                error={ errors.title }
                                helperText={ errors.title }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="description"
                                name="description"
                                label="Description de l'événement"
                                multiline
                                rows={10}
                                onChange={handleChange}
                                error={ errors.description }
                                helperText={ errors.description }
                            />
                        </Grid>
                        {/*<Grid item xs={12}>*/}
                        {/*    <LocalizationProvider dateAdapter={AdapterDateFns}>*/}
                        {/*        <DatePicker*/}
                        {/*            label="Basic example"*/}
                        {/*            value={value}*/}
                        {/*            onChange={(newValue) => {*/}
                        {/*                setValue(newValue);*/}
                        {/*            }}*/}
                        {/*            renderInput={(params) => <TextField {...params} />}*/}
                        {/*        />*/}
                        {/*    </LocalizationProvider>*/}
                        {/*</Grid>*/}


                    </Grid>

                    {(loadingForm && (
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginTop: 2
                            }}>
                                <CircularProgress sx={{justifyContent:"center", display:"flex"}}/>
                            </Box>
                        ))
                        ||
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleClick}
                            loading={loadingForm}
                        >
                            Créer
                        </Button>
                    }
                </Box>
            </Grid>
        </Container>
    );
}