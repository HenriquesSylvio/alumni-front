import * as React from 'react';
import {Button, Fade, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Backdrop from '@mui/material/Backdrop';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SignIn from "../Layout/Header/LoginRegister/Login/Login";
import SignUp from "../Layout/Header/LoginRegister/Register";
import Avatar from "@mui/material/Avatar";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {Autocomplete} from "@mui/lab";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};
const theme = createTheme();

export default function EditProfileButton({firstName, lastName, urlProfilePicture, biography}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false)


    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        // <ThemeProvider theme={theme}>
            <Box sx={{ p: 1 }}>
                <Button onClick={handleOpen} color="inherit" variant="outlined">
                    Modifier le profil
                </Button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <ThemeProvider theme={theme}>
                                <Container component="main" maxWidth="xs">
                                    <CssBaseline />
                                    <Box
                                        sx={{
                                            marginTop: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box display="flex" justifyContent="center" alignItems="center" marginBottom={1}>
                                            <Avatar
                                                src= {urlProfilePicture}
                                                sx={{ width: 100, height: 100}}

                                            />
                                        </Box>
                                        <Box display="flex" justifyContent="center" alignItems="center" marginBottom={1}>
                                            <Button variant="contained" >
                                                Importer image
                                            </Button>
                                        </Box>
                                        <Box
                                            component="form"
                                            noValidate
                                            // onSubmit={handleSubmit}
                                            sx={{ mt: 1 }}
                                        >
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        autoComplete="given-name"
                                                        name="first_name"
                                                        required
                                                        fullWidth
                                                        id="first_name"
                                                        label="Prénom"
                                                        autoFocus
                                                        defaultValue={firstName}
                                                        // onChange={handleChange}
                                                        // error={ errors.first_name }
                                                        // helperText={ errors.first_name }
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        id="last_name"
                                                        label="Nom"
                                                        name="last_name"
                                                        autoComplete="family-name"
                                                        defaultValue={lastName}
                                                        // onChange={handleChange}
                                                        // error={ errors.last_name }
                                                        // helperText={ errors.last_name }
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        id="outlined-multiline-static"
                                                        label="Biographie"
                                                        multiline
                                                        rows={6}
                                                        inputProps={{ maxLength: 255 }}
                                                        helperText={"255 caractères au maximum"}
                                                        defaultValue={biography}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                Modifier
                                            </Button>
                                        </Box>
                                    {/*</Box>*/}
                                    </Box>
                                </Container>
                            </ThemeProvider>
                        </Box>
                    </Fade>
                </Modal>
            </Box>
        // </ThemeProvider>
    );
}
