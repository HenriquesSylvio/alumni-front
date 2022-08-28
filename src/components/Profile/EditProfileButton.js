import * as React from 'react';
import {Button, CircularProgress, Fade, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Backdrop from '@mui/material/Backdrop';
import { styled} from "@mui/material/styles";
import EditProfileForm from "./EditProfileForm";
import ActiveConnectedUser from "../../contexts/ActiveConnectedUser";
import OpenModalEditProfile from "../../contexts/OpenModalEditProfile";
import {useContext} from "react";

const styleBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    display: { xs: 'none', md: 'flex' },
};
const styleResponsiveBox = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display: { xs: 'flex', md: 'none' },
    overflow:"scroll"
};

export default function EditProfileButton({firstName, lastName, urlProfilePicture, biography}) {
    // const [open, setOpen] = React.useState(false);
    const { isOpenEditProfile, setIsOpenEditProfile } = useContext(OpenModalEditProfile)

    const handleOpen = () => setIsOpenEditProfile(true);
    const handleClose = () => setIsOpenEditProfile(false)

    return (
            <Box sx={{ p: 1 }}>
                <Button onClick={handleOpen} color="inherit" variant="outlined">
                    Modifier le profil
                </Button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={isOpenEditProfile}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={isOpenEditProfile}>
                        <Box>
                            <Box sx={styleBox}>
                                <EditProfileForm
                                    firstName={firstName}
                                    lastName={lastName}
                                    biography={biography}
                                    urlProfilePicture={urlProfilePicture}
                                />
                            </Box>
                            <Box sx={styleResponsiveBox}>
                                <EditProfileForm
                                    firstName={firstName}
                                    lastName={lastName}
                                    biography={biography}
                                    urlProfilePicture={urlProfilePicture}
                                />
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </Box>
    );
}
