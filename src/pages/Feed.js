import {Button, Card, Fab, Stack} from '@mui/material';
import { Box, padding } from '@mui/system';
import React, {Component, useContext, useEffect, useState} from 'react';
import EventFeed from '../components/EventFeed/EventFeed';
import MainFeed from '../components/MainFeed/MainFeed';
import getFeed from "../services/FeedApi";
import AddIcon from '@mui/icons-material/Add';
import SignInButton from "../components/Layout/Header/LoginRegister/SignInButton";

export default function Feed() {
    let page = 1;
    const [posts, setPosts] = useState([]);
    let newPosts = [];

    const loadMorePosts = () => {
        getPostFromFeed(1);
    }

    const getPostFromFeed = async () => {
        const response = await getFeed(page);
        newPosts = response.data.data;
        setPosts((oldPosts) => [...oldPosts, ...newPosts])
        page += 1
    };

    const style = {
        margin: 0,
        top: 'auto',
        right: 100,
        bottom: 100,
        left: 'auto',
        position: 'fixed',
    };


    const handleScroll = (e) =>{
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
            getPostFromFeed(1).then();
        }
    }

    useEffect(async () => {
        await getPostFromFeed();
        window.addEventListener('scroll', handleScroll)
    }, []);
        return (
            <div style={{display: "flex"}}>
                <Stack direction="column" alignItems="center" spacing={5} sx={{display:"flex", flex: 1, color:"#CA4B38"}}>
                    <h1>Fil d'actualités</h1>
                    {
                        posts.length ?
                            posts.map(post =>
                                // <MainFeed titre="La Normandie Web School recrute !" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ex augue, fringilla nec facilisis eu, gravida in felis. Ut vitae augue nec nunc dignissim accumsan. Phasellus consequat molestie convallis. Curabitur consequat neque eu risus consequat rhoncus. In vulputate vehicula finibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque tincidunt blandit nulla ac accumsan. Class aptent taciti sociosqu ad litora torquent per conubia molestie. "></MainFeed>
                                // <MainFeed titre="La Normandie Web School recrute !" description="Nouvelle école dans le numérique, l'administration a besoin de vous, recherche tel type d'emploi"></MainFeed>
                                <MainFeed titre="La Normandie Web School recrute !" description={post.content}></MainFeed>
                            ): null
                    }
                            </Stack>
                            <div style={{width:"25%"}}>
                                <Stack className="event-right" direction="column" justifyContent="space-evenly" alignItems="center" spacing={4} marginBottom={5} color="#CA4B38">
                                    <h2>Prochains évènements</h2>
                                    {/* Box personnalisée pour les feeds à droite*/}
                                    <EventFeed titre="Titre 1" description="texte 1 texte 1 texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1 "/>
                                    <EventFeed titre="Titre 3" description="texte 3"/>
                                    <EventFeed titre="Titre 5" description="texte 5"/>
                                </Stack>

                                <Stack className="event-right" direction="column" justifyContent="space-evenly" alignItems="center" spacing={5} color="#CA4B38">
                                    <h2>Offres d'emploi</h2>
                                    <EventFeed titre="Titre 1" description="texte 1"/>
                                    <EventFeed titre="Titre 3" description="texte 3"/>
                                    <EventFeed titre="Titre 5" description="texte 5"/>
                                </Stack>
                            </div>
                    }
                <Box style={style}>
                    {/*sx={{display:"flex", flex: 1, color:"#CA4B38"}}*/}
                    <Fab sx={{backgroundColor:"#00A5A5", color: "white", '&:hover': {color: '#00A5A5'}}} saria-label="add">
                        <AddIcon />
                    </Fab>
                </Box>
            </div>
        )
}