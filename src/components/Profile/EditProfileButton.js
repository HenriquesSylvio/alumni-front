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
import {createRef, useEffect, useState} from "react";
import {storage} from "../../config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import {EditProfile} from "../../services/EditProfile";
// import { validate } from "../../validators/EditProfileValidator"
import validate from "../../validators/EditProfileValidator";
// import EditProfile from "../../services/EditProfile";

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
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        first_name: firstName,
        last_name: lastName,
        biography: biography,
        url_profile_picture: urlProfilePicture
    });
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false)

    function handleClick() {
        setErrors(validate(values));
    }

    const uploadImage = async () => {
        let test = '';
        if (image == null) return;
        console.log("noice")
        const imageRef = ref(storage, `image/${image.name + v4()}`);
            await uploadBytes(imageRef, image).then(async (snapshot) => {
                await getDownloadURL(snapshot.ref).then(async (url) => {
                    values.url_profile_picture = url
                })
            })
    }

    const changeAvatar = (event) => {
        const newImage = event.target?.files?.[0];

        if (newImage) {
            setAvatar(URL.createObjectURL(newImage));
            setImage(newImage);
        }
    };

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;

        setValues({...values, [name]: value})
        // console.log(values);
    }
    // useEffect(handleChange,[])

    const handleSubmit = async event => {
        event.preventDefault();
        // setValues({
        //     first_name: values.first_name,
        //     last_name: values.last_name,
        //     url_profile_picture: values.url_profile_picture,
        //     biography: values.biography
        // })
        // setValues({...values, ["url_profile_picture"]: urlProfile})
        setErrors(validate(values));
        console.log(Object.keys(errors).length);
        if (Object.keys(errors).length === 0) {
        console.log("test");
        await uploadImage();
        await EditProfile(values);
            //     toast.success('Votre compte a été créé. Il faut désormais que votre compte soit accepté par un administrateur ! 😄');
            // } catch ({response}) {
            //     var error = response.data.erreur
            //     Object.keys(error).forEach(function (key) {
            //         console.log(error.email);
            //         toast.error(error[key] + ' 😃')
            //     });
            //     console.log(response)
            // }
        }
    }

    return (
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
                    onSubmit={handleSubmit}
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
                                                src={avatar || ""}
                                                sx={{ width: 100, height: 100}}
                                            />
                                        </Box>
                                        <Box marginBottom={1}>
                                            <label htmlFor="contained-button-file">
                                                <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={changeAvatar}
                                                       name="url_profile_picture"/>
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
                                                        onChange={handleChange}
                                                        error={ errors.first_name }
                                                        helperText={ errors.first_name }
                                                        value={values.first_name}
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
                                                        onChange={handleChange}
                                                        error={ errors.last_name }
                                                        helperText={ errors.last_name }
                                                        value={values.last_name}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        id="biography"
                                                        name="biography"
                                                        label="Biographie"
                                                        multiline
                                                        rows={6}
                                                        inputProps={{ maxLength: 255 }}
                                                        helperText={"255 caractères au maximum"}
                                                        defaultValue={biography}
                                                        onChange={handleChange}
                                                        // value={values.biography}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                                onClick={handleClick}
                                            >
                                                Modifier
                                            </Button>
                                        </Box>
                                    </Box>
                                </Container>
                            </ThemeProvider>
                        </Box>
                    </Fade>
                </Modal>
            </Box>
    );
}
