import React, {useEffect, useLayoutEffect, useState} from 'react';
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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers'
import frLocale from 'date-fns/locale/fr';
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export default function AddEventForm() {
    const [errors, setErrors] = useState({});
    const {isOpenAddPost, setIsOpenAddPost} = useContext(OpenModalAddPost);
    const [loadingForm, setLoadingForm] = React.useState(false);
    const [values, setValues] = useState({
        title: "",
        description: "",
        date: (new Date().getDate() + 1) + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear() + "00:00"
    });
    const [date, setDate] = React.useState(new Date());
    const today = new Date()
    // const handleChangeDate = (newDate: Date | null) => {
    //     setDate(newDate);
    // };

    function handleClick() {
        setErrors(validate(values));
    }

    useEffect(() => {
        // console.log((new Date().getMonth() + 1) );
        setDate(today)
    }, []);

    const handleChange = ({currentTarget}) => {

        const {name, value} = currentTarget;

        console.log(value);

        setValues({...values, [name]: value})
        // setValues({...values, ["date"]: date})
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
            <IconButton onClick={() => setIsOpenAddPost(false)}>
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
                    <CreateIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Création d'événement
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
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
                                disabled={loadingForm}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale}>
                                <DatePicker
                                    minDate={today.setDate(today.getDate() + 1)}
                                    // minDate={() => {
                                    //     // const dateFormat = new Date(newDate)
                                    //     const date = new Date();
                                    //     return date.setDate(date.getDate() + 1);
                                    // }
                                    // }
                                    label="Date de l'événement"
                                    value={date}
                                    onChange={(newDate) => {
                                        // const dateFormat = new Date(newDate)
                                        const dd = new Date(newDate).getDate();
                                        const mm = new Date(newDate).getMonth() + 1;
                                        const yyyy = new Date(newDate).getFullYear();
                                        // console.log(dateFormat.getMonth())
                                        // console.log(dd + '/' + mm + '/' + yyyy);
                                        setDate(newDate)
                                        setValues({...values, ["date"]: dd + '/' + mm + '/' + yyyy +" 00:00"})
                                    }
                                    }
                                    renderInput={(params) => <TextField {...params} fullWidth required disabled={loadingForm}/>}
                                />
                            </LocalizationProvider>
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
                                disabled={loadingForm}
                            />
                        </Grid>


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