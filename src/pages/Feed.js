import {Stack} from '@mui/material';
import React, {useEffect, useState} from 'react';
import EventFeed from '../components/EventFeed/EventFeed';
import MainFeed from '../components/Post/MainFeed';
import getFeed from "../services/FeedApi";
import ButtonAddPost from "../components/Post/ButtonAddPost";

export default function Feed() {
    let page = 1;
    const [posts, setPosts] = useState([]);
    let newPosts = [];

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
        getPostFromFeed();
        window.addEventListener('scroll', handleScroll)
    }, []);

        return (
            <div style={{display: "flex"}}>
                <Stack direction="column" spacing={5} sx={{flex: 1, color:"#CA4B38"}} paddingRight={"10%"} paddingLeft={"10%"}>
                    <h1>Fil d'actualités</h1>
                    {
                        posts.length ?
                            posts.map(post =>
                                <MainFeed
                                    firstName={post.firstName}
                                    lastName={post.lastName}
                                    titre={post.title}
                                    description={post.content}
                                    nbComment={post.numberComment}
                                    nbLike={post.numberLike}
                                    like={post.like}
                                    idPost={post.idPost}
                                    createAt={post.createAt}
                                    url_profile_picture={post.urlProfilePicture}
                                    idUser={post.idUser}
                                />
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
                <ButtonAddPost/>
            </div>
        )
}