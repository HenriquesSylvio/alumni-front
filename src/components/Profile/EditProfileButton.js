import * as React from 'react';
import {Button, Fade, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Backdrop from '@mui/material/Backdrop';
import Avatar from "@mui/material/Avatar";
import {createTheme, styled, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {createRef} from "react";
import {storage} from "../../config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"

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

const Input = styled('input')({
    display: 'none',
});


export default function EditProfileButton({firstName, lastName, urlProfilePicture, biography}) {
    const [open, setOpen] = React.useState(false);
    const [avatar, setAvatar] = React.useState(urlProfilePicture);
    const [image, setImage] = React.useState();
    const [urlProfile, setUrlProfile] = React.useState();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false)
    const inputFileRef = createRef(null);

    const [value, setValue] = React.useState('1');

    const uploadImage = () => {
        // console.log(image)
        if (image == null) return;
        const imageRef = ref(storage, `image/${image.name + v4()}`);
        uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setUrlProfile(url)
            })
        })
    }

    const changeAvatar = (event) => {
        const newImage = event.target?.files?.[0];
        // console.log(URL.createObjectURL(newImage));
        if (newImage) {
            setAvatar(URL.createObjectURL(newImage));
            setImage(newImage);
        }
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
                                                loca
                                                src={avatar || ""}
                                                sx={{ width: 100, height: 100}}
                                            />
                                        </Box>
                                        <Box marginBottom={1}>
                                            <label htmlFor="contained-button-file">
                                                <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={changeAvatar}/>
                                                <Button variant="contained" component="span" onClick={changeAvatar}>
                                                    Importer une image
                                                </Button>
                                            </label>
                                        </Box>

                                        <Box
                                            component="form"
                                            noValidate
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
                                                // type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                                onClick={uploadImage}
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
