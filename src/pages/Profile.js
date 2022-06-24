
import {Box} from "@mui/system";
import {CircularProgress, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import MainFeed from "../components/MainFeed/MainFeed";
import DetailUser from "../components/Profile/DetailUser";
import getProfile from "../services/ProfileApi";
import React, { useEffect, useState } from 'react';
import getPostByUser from "../services/PostByUserApi";
import { useParams } from "react-router-dom";

export default function Profile() {

    const [posts, setPosts] = useState('');
    const [user, setUser] = useState('');
    const [loadingPage, setLoading] = useState(true);
    let params = useParams();
    let userId = '';

    useEffect(async () => {
        await getProfileUser();
        await getPostByUserId();
    }, []);

    const getProfileUser = async () => {
        const response = await getProfile(params.id)

        setUser(response.data)
        userId = response.data.id;

    };

    const getPostByUserId = async () => {
        // const userId = user.id;

        const response = await getPostByUser(userId)
        setPosts(response.data.posts)
        console.log(response.data);
        setLoading(!loadingPage);
    };

        return (
            <Box
                sx={{
                    marginTop: 8,
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {loadingPage ? (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: 2
                    }}>
                        <CircularProgress sx={{justifyContent:"center", display:"flex"}}/>
                    </Box>
                ) : (
                    <>
                        <Box marginLeft={2} marginRight={2} marginTop={15}>
                            <DetailUser
                                first_name={user.first_name}
                                last_name={user.last_name}
                                urlProfilePicture={user.url_profile_picture}
                                nbSubscriber={user.followerNumber}
                                nbPosts='5'
                                nbSubscription={user.followingNumber}
                                promo={user.promo}
                                sector='Développeur'
                                biography={user.biography}
                            />
                        </Box>
                        <Box display="flex" sx={{ flexDirection: 'column' }} marginLeft={2} marginRight={2} marginTop={2}>
                               {
                                   posts.length ?
                                       <Typography marginLeft={5} variant="h6" component="div">
                                           Postes récents
                                       </Typography>
                                       :
                                       <Typography marginLeft={5} variant="h5" component="div">
                                           Aucun postes récents
                                       </Typography>
                               }
                               {posts.length ?
                                   posts.map(
                                       post =>
                                           <Box marginBottom={2} >
                                               <MainFeed
                                                   titre={post.title}
                                                   description={post.content}
                                                   nbComment={post.numberComment}
                                                   nbLike={post.numberLike}
                                                   like={post.like}
                                                   idPost={post.idPost}
                                               >
                                               </MainFeed>
                                           </Box>
                                   ): null
                               }
                        </Box>
                    </>
                )}
            </Box>
        );
    }
