import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from "@mui/material/TextField";
import 'react-toastify/dist/ReactToastify.css';
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CreateIcon from '@mui/icons-material/Create';
import validate from "../../validators/EditProfileValidator";
import {addPost} from "../../services/AddPostApi";
import {toast} from "react-toastify";
import {addComment} from "../../services/AddCommentApi";
import OpenModalAddComment from "../../contexts/OpenModalAddComment";
import {CircularProgress} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import {createTheme, styled, ThemeProvider} from "@mui/material/styles";
import {EditProfile} from "../../services/EditProfile";
import {deleteObject, getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../config/firebaseConfig";
import getProfile from "../../services/ProfileApi";
import {addItem} from "../../services/LocaleStorage";
import { v4 } from "uuid";
import OpenModalEditProfile from "../../contexts/OpenModalEditProfile";

export default function EditProfileForm({firstName, lastName, urlProfilePicture, biography}) {
    const [loading, setLoading] = React.useState(false);
    const [avatar, setAvatar] = React.useState(urlProfilePicture);
    const [values, setValues] = useState({
        first_name: firstName,
        last_name: lastName,
        biography: biography,
        url_profile_picture: urlProfilePicture
    });
    const [errors, setErrors] = useState({});
    const [image, setImage] = React.useState();
    const [open, setOpen] = React.useState(false);
    const { isOpenEditProfile, setIsOpenEditProfile } = useContext(OpenModalEditProfile)
    const handleSubmit = async event => {
        event.preventDefault();
        setErrors(validate(values));
        if (Object.keys(errors).length === 0) {
            setLoading(true);
            try {
                await uploadImage();
                await EditProfile(values);
                await deleteImage();
                await getMyProfile();
                window.location.reload();
            } catch ({response}) {
                toast.error('Une erreur est survenue. Veuillez réessayer plus tard ! 😃')
            }
        }
    }
    function handleClick() {
        setErrors(validate(values));
    }

    const Input = styled('input')({
        display: 'none',
    });

    const uploadImage = async () => {
        if (image == null) return;
        const imageRef = ref(storage, `image/${image.name + v4()}`);
        await uploadBytes(imageRef, image).then(async (snapshot) => {
            await getDownloadURL(snapshot.ref).then((url) => {
                values.url_profile_picture = url
            })
        })
    }
    const deleteImage = async () => {
        if (image == null) return;
        try{
            const deletePicture = ref(storage, urlProfilePicture);
            await deleteObject(deletePicture).then();
        } catch {}
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
    }

    const getMyProfile = async () => {
        const response = await getProfile()
        addItem('Profile',  JSON.stringify(response.data))
    }

    const theme = createTheme();


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <IconButton onClick={() => setIsOpenEditProfile(false)}>
                    <CloseIcon/>
                </IconButton>
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    onSubmit={handleSubmit}
                >
                    <Box display="flex" justifyContent="center" alignItems="center" marginBottom={1}>
                        <Avatar
                            src={avatar || ""}
                            sx={{ width: 100, height: 100, display: { xs: 'block', sm: 'block' }}}
                        />
                    </Box>
                    <Box marginBottom={1}>
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={changeAvatar}
                                   name="url_profile_picture" disabled={loading}/>
                            <Button variant="contained" component="span" onClick={changeAvatar} disabled={loading}>
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
                                    disabled={loading}
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
                                    disabled={loading}
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
                                    disabled={loading}
                                    // value={values.biography}
                                />
                            </Grid>
                        </Grid>
                        {(loading && (
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
                            >
                                Modifier
                            </Button>
                        }
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}