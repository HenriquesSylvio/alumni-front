import * as React from 'react';
import {Button, Fab, Fade, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Backdrop from '@mui/material/Backdrop';
import AddPostForm from "../Post/AddPostForm";
import OpenModalDiscussion from "../../contexts/OpenModalComment";
import {useContext, useLayoutEffect} from "react";
import MainFeed from "../Post/MainFeed";
import Container from "@mui/material/Container";
import ShowCommentForm from "./TopCommentModal";
import TopCommentModal from "./TopCommentModal";

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

export default function ShowCommentModal({post}) {
    const {isOpenDiscussion, idActivePost,setIsOpenDiscussion} = useContext(OpenModalDiscussion);

    const handleClose = () => {
        console.log(post.idPost)
        setIsOpenDiscussion(0)
    }

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useLayoutEffect(() => {
        console.log(idActivePost);
    }, [])
    return (
        <Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isOpenDiscussion === post.idPost}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isOpenDiscussion}>
                    <Box>
                        <Box sx={styleBox}>
                            <TopCommentModal
                                content={post.content}
                                firstName={post.firstName}
                                lastName={post.lastName}
                                like={post.like}
                                idPost={post.idPost}
                                createAt={post.createAt}
                                url_profile_picture={post.urlProfilePicture}
                                idUser={post.idUser}
                                numberLike={post.numberLike}
                                numberComment={post.numberComment}
                            />
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}
