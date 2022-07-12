import * as React from 'react';
import {Button, Chip, CircularProgress, Divider, Fab, Fade, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Backdrop from '@mui/material/Backdrop';
import AddPostForm from "../Post/AddPostForm";
import OpenModalDiscussion from "../../contexts/OpenModalComment";
import {useContext, useEffect, useLayoutEffect, useState} from "react";
import MainFeed from "../Post/MainFeed";
import Container from "@mui/material/Container";
import ShowCommentForm from "./DisplayPost";
import DisplayPost from "./DisplayPost";
import getCommentByIdApi from "../../services/GetCommentByIdApi";
import Typography from "@mui/material/Typography";
import ShowCommentButton from "./ShowCommentButton";
import Grid from "@mui/material/Grid";

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
    overflow:'scroll',
    maxHeight:"75%"
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

export default function ShowCommentModal({post}) {
    const {isOpenDiscussion,setIsOpenDiscussion} = useContext(OpenModalDiscussion);
    // const {commentss,setComments} = useState(comments);
    const [commentLoading, setCommentLoading] = useState(false);
    const [comments, setComments] = useState([]);

    const handleClose = () => {
        console.log(comments[0].content)
        setIsOpenDiscussion(0)
    }
    const loadComment = async () => {
        // setCommentLoading(true);
        const response = await getCommentByIdApi(post.idPost)
        // console.log(response.data.posts.items);
        setComments(response.data.posts.items);
        console.log(response.data.posts.items);
        // const response = await getTag();
        // setTags(response.data.tags);
        // handleOpen();
        // setCommentLoading(false);
    }

    useEffect(()  => {
        if(isOpenDiscussion === post.idPost){
            // console.log("test")
            loadComment()
        }
    }, [isOpenDiscussion]);
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
                <Fade in={isOpenDiscussion === post.idPost}>
                    <Box flexDirection={"column"} sx={styleBox}>
                        <Box >
                            <DisplayPost
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
                            <Divider variant="middle" >
                                <Chip label="Commentaire" />
                            </Divider>
                        </Box>
                        {comments.length ?
                            comments.map(
                                comment =>
                                    <Box marginBottom={2} >
                                        <DisplayPost
                                            content={comment.content}
                                            firstName={comment.firstName}
                                            lastName={comment.lastName}
                                            like={comment.like}
                                            idPost={comment.idPost}
                                            createAt={comment.createAt}
                                            url_profile_picture={comment.urlProfilePicture}
                                            idUser={comment.idUser}
                                            numberLike={comment.numberLike}
                                            numberComment={comment.numberComment}
                                        />
                                        <Grid item xs>
                                            <ShowCommentButton post={comment}/>
                                        </Grid>
                                        <Divider variant="middle" />
                                    </Box>
                            ):
                            <CircularProgress size={30} sx={{marginRight: 1}}/>
                        }
                    </Box>

                </Fade>
            </Modal>
        </Box>
    );
}
