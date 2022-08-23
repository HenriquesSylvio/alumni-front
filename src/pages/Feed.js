import {Fade, Modal, Stack} from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import EventFeed from '../components/EventFeed/EventFeed';
import MainFeed from '../components/Post/MainFeed';
import getFeed from "../services/FeedApi";
import ButtonAddPost from "../components/Post/ButtonAddPost";
import {useNavigate} from "react-router-dom";
import OpenModalAddComment from "../contexts/OpenModalAddComment";
import FirstLoad from "../contexts/FirstLoad";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import AddCommentForm from "../components/Post/AddCommentForm";
import ResponseIdPost from "../contexts/ResponseIdPost";

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

export default function Feed() {
    const {isOpenAddComment, setIsOpenAddComment} = useContext(OpenModalAddComment);
    const {idPost, setIdPost} = useContext(ResponseIdPost);
    let page = 1;
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    let newPosts = [];
    // let firstLoad = true;
    const {firstLoad, setFirstLoad} = useContext(FirstLoad);


    const handleClose = () => {
        setIsOpenAddComment(false)
        // setIdPost(0)
    }


    const getPostFromFeed = async () => {
        const response = await getFeed(page);
        // newPosts = response.data.data;
        //
        newPosts = response.data.posts.items;
        console.log(newPosts);
        setPosts((oldPosts) => [...oldPosts, ...newPosts])
        page += 1
    };

    const handleScroll = async (e) =>{
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
            console.log('test');
            await getPostFromFeed(1).then();
        }
    }

    useEffect(() => {
        const getData = async () => {
            await getPostFromFeed();
        }
        getData();

        window.addEventListener('scroll', handleScroll)
    }, []);

        return (
            <div style={{display: "flex"}}>
                <Stack direction="column" spacing={5} sx={{flex: 1, color:"#CA4B38"}} paddingRight={"10%"} paddingLeft={"10%"}>
                    <h1>Fil d'actualités</h1>
                    {posts.length ?
                        posts.map(post =>
                            <MainFeed
                                post={post}
                            />
                        ): null
                    }
                </Stack>
                {/*<div style={{width:"25%"}}>*/}
                {/*    <Stack className="event-right" direction="column" justifyContent="space-evenly" alignItems="center" spacing={4} marginBottom={5} color="#CA4B38">*/}
                {/*        <h2>Prochains évènements</h2>*/}
                {/*        <EventFeed titre="Titre 1" description="texte 1 texte 1 texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1 "/>*/}
                {/*        <EventFeed titre="Titre 3" description="texte 3"/>*/}
                {/*        <EventFeed titre="Titre 5" description="texte 5"/>*/}
                {/*    </Stack>*/}
                {/*    <Stack className="event-right" direction="column" justifyContent="space-evenly" alignItems="center" spacing={5} color="#CA4B38">*/}
                {/*        <h2>Offres d'emploi</h2>*/}
                {/*        <EventFeed titre="Titre 1" description="texte 1"/>*/}
                {/*        <EventFeed titre="Titre 3" description="texte 3"/>*/}
                {/*        <EventFeed titre="Titre 5" description="texte 5"/>*/}
                {/*    </Stack>*/}
                {/*</div>*/}
                <ButtonAddPost/>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={isOpenAddComment}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    {/*<Fade>*/}
                    <Fade in={isOpenAddComment}>
                        <Box>
                            <Box sx={styleBox}>
                                <AddCommentForm idPost={idPost}/>
                            </Box>
                            <Box sx={styleResponsiveBox}>
                                <AddCommentForm idPost={idPost}/>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        )
}