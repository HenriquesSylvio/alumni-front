import * as React from 'react';
import {Box} from "@mui/system";
import {CircularProgress, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import MainFeed from "../components/MainFeed/MainFeed";
import DetailUser from "../components/Profile/DetailUser";
import getProfile from "../services/ProfileApi";
import { Component } from "react";
import getPostByUser from "../services/PostByUserApi";
import Grid from "@mui/material/Grid";

class Profile extends Component {
    // let user = "";
    // // const [user, setUser] = React.useState();
    // const loadUserDetail = async () => {
    //     const response = await getProfile();
    //     user = response.data
    //     console.log(user.first_name);
    // }
    //
    // useLayoutEffect(() => {
    //     loadUserDetail();
    // });

    constructor(props) {
        super(props)

        this.state = {
            user: [],
            posts: [],
            loadingPage: true
        }
    }

    async getProfileUser() {
        const response = await getProfile('me');
        this.setState({user: response.data})
        console.log(response.data);
    };

    async getPostByUserId() {
        console.log(this.user);
        const response = await getPostByUser(34);
        this.setState({posts: response.data.posts})
        console.log(response.data.posts);
    };


    async componentDidMount() {
        await this.getProfileUser();
        await this.getPostByUserId()
        this.setState({loadingPage: false})
    }

    render() {
        const { user, posts, loadingPage} = this.state
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
                        <Box sx={{m: 1, background: 'rgba(202,75,56,0.25)'}} paddingTop={10} minHeight={225}>
                            <Typography paddingRight={20} paddingLeft={20} paddingBottom={5} variant="h6" component="div">
                                {user.last_name} {user.first_name}
                            </Typography>
                            <Typography paddingRight={20} paddingLeft={20} variant="subtitle1" component="div" color={"grey"}>
                                {user.biography}
                            </Typography>

                        </Box>
                        <Box style={{display: 'flex'}}>
                            <Box width="95%" marginLeft={5} marginRight={5} marginTop={-9}>
                                {posts.length ?
                                    <Typography marginLeft={5} variant="h6" component="div">
                                        Postes récents
                                    </Typography> :

                                    <Typography marginLeft={5} variant="h6" component="div">
                                        Aucun postes récents
                                    </Typography>
                                }

                                {posts.length ?
                                    posts.map(
                                        post =>
                                            <Box marginBottom={2}>
                                                <Stack direction='column' spacing={5}>
                                                    <MainFeed
                                                        titre={post.title}
                                                        description={post.content}
                                                        nbComment={5}></MainFeed>
                                                </Stack>
                                            </Box>
                                    ): null
                                }
                            </Box>
                            <Box marginLeft={5} marginRight={5} marginTop={-5}>
                                <DetailUser first_name={user.first_name} last_name={user.last_name} urlProfilePicture={user.url_profile_picture} nbSubscriber={user.followerNumber} nbPosts='5' nbSubscription={user.followingNumber} promo={user.promo} sector='Développeur'/>
                            </Box>
                        </Box>
                    </>
                )}
            </Box>
        );
    }
}


export default Profile