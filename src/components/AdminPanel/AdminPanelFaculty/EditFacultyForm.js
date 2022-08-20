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
import {useContext} from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers'
import OpenModalAddFaculty from "../../../contexts/OpenModalAddFaculty";
import {addFaculty} from "../../../services/AddFacultyApi";
import validate from "../../../validators/AddFacultyValidator";
import OpenModalEditFaculty from "../../../contexts/OpenModalEditFaculty";

export default function EditFacultyForm() {
    const {isOpenEditFaculty, setIsEditFaculty} = useContext(OpenModalEditFaculty);
    const [loadingForm, setLoadingForm] = React.useState(false);
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        name: isOpenEditFaculty.name
    });

    function handleClick() {
        setErrors(validate(values));
    }

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;

        setValues({...values, [name]: value})
    }

    const handleSubmit = async event => {
        event.preventDefault();
        setLoadingForm(true)
        await setErrors(validate(values));

        if (Object.keys(errors).length === 0) {
            await addFaculty(values);
            setIsEditFaculty(0);
            toast.success('La filière a été modifier ! 😄');
        }
        setLoadingForm(false)
    }


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
                    Mofication de la filière
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <Grid container>
                        <Grid item xs>
                            <TextField
                                required
                                fullWidth
                                value={values.name}
                                id="name"
                                label="Libelle de la filière"
                                name="name"
                                autoComplete="name"
                                onChange={handleChange}
                                error={ errors.name }
                                helperText={ errors.name }
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
                            Modifier
                        </Button>
                    }
                </Box>
            </Grid>
        </Container>
    );
}