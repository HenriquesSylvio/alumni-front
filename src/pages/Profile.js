
import {Box} from "@mui/system";
import {CircularProgress, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import MainFeed from "../components/Post/MainFeed";
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

    useEffect( () => {
        const getData = async () => {
            await getProfileUser();
            await getPostByUserId();
        }
        getData();

    }, []);

    const getProfileUser = async () => {
        const response = await getProfile(params.id)
        setUser(response.data)
        console.log(response.data);
        userId = response.data.id;
    };

    const getPostByUserId = async () => {
        console.log(userId);
        const response = await getPostByUser(userId)
        setPosts(response.data.posts)
        console.log(response.data.posts);
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
                    <Box paddingRight={"10%"} paddingLeft={"10%"}>
                        <Box  marginTop={15}>
                            <DetailUser
                                firstName={user.firstName}
                                lastName={user.lastName}
                                urlProfilePicture={user.urlProfilePicture}
                                nbSubscriber={user.followerNumber}
                                nbPosts='5'
                                nbSubscription={user.followingNumber}
                                promo={user.promo}
                                sector='D??veloppeur'
                                biography={user.biography}
                                idUser={user.id}
                                subscribe={user.subcribe}
                            />
                        </Box>
                        <Box display="flex" sx={{ flexDirection: 'column' }} marginTop={2}>
                               {
                                   posts.length ?
                                       <Typography marginLeft={5} variant="h6" component="div">
                                           Postes r??cents
                                       </Typography>
                                       :
                                       <Typography marginLeft={5} variant="h5" component="div">
                                           Aucun postes r??cents
                                       </Typography>
                               }
                               {posts.length ?
                                   posts.map(
                                       post =>
                                           <Box marginBottom={2} >
                                               <MainFeed
                                                   // firstName={post.firstName}
                                                   // lastName={post.lastName}
                                                   // titre={post.title}
                                                   // description={post.content}
                                                   // nbComment={post.numberComment}
                                                   // nbLike={post.numberLike}
                                                   // like={post.like}
                                                   // idPost={post.idPost}
                                                   // createAt={post.createAt}
                                                   // url_profile_picture={post.urlProfilePicture}
                                                   // idUser={post.idUser}
                                                   post={post}
                                               >
                                               </MainFeed>
                                           </Box>
                                   ): null
                               }
                        </Box>
                    </Box>
                )}
            </Box>
        );
    }
