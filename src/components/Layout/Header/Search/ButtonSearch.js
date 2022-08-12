import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Box from "@mui/material/Box";
import {Chip, Fade, Modal} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import AddEventForm from "../../../Event/AddEventForm";
import OpenModalAddPost from "../../../../contexts/OpenModalAddPost";
import {useContext, useState} from "react";
import SearchForm from "./SearchForm";

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
    display: { xs: 'flex', md: 'none' }
};

const styleButton = {
    margin: 0,
    top: 'auto',
    right: 100,
    bottom: 100,
    left: 'auto',
    position: 'fixed',
};


export default function ButtonSearch() {
    const [isOpenForm, setIsOpenSearch] = useState(false);

    const handleOpen = () => {
        setIsOpenSearch(true);
    };

    const handleClose = () => {
        setIsOpenSearch(false)
    }
    return (
        <Box>
            <Box
                sx={{
                    display: { xs: 'none', sm: 'flex' },
                }}
            >
                <Chip
                    onClick={handleOpen}
                    icon={<SearchIcon />}
                    label="Rechercher ..."
                    variant="outlined"
                />
            </Box>
            <Box
                sx={{
                    display: { xs: 'flex', sm: 'none' },
                }}
                paddingRight={2}
            >
                <SearchIcon onClick={handleOpen} sx={{ color:"black"}}/>
            </Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isOpenForm}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isOpenForm}>
                    <Box>
                        <Box sx={styleBox}>
                            <SearchForm />
                        </Box>
                        <Box sx={styleResponsiveBox}>
                            <SearchForm />
                        </Box>
                    </Box>

                </Fade>
            </Modal>
        </Box>
    );
}
