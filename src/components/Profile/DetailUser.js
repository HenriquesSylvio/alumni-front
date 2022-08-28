import * as React from 'react';
import {Box} from "@mui/system";
import {Button, Card, CardActions, CardContent, CircularProgress} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Grid";
import StatUser from "./StatUser";
import ButtonsInteractionUser from "./ButtonsInteractionUser";
import EditProfileButton from "./EditProfileButton";
import {getItem} from "../../services/LocaleStorage";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {deletePost} from "../../services/DeletePostApi";
import {deleteUser} from "../../services/DeleteUserApi";
import {useNavigate} from "react-router-dom";
import {logout} from "../../services/AuthApi";
import {toast} from "react-toastify";
import Auth from "../../contexts/Auth";
import ActiveConnectedUser from "../../contexts/ActiveConnectedUser";
import {useContext, useEffect} from "react";

export default function DetailUser({idUser ,firstName, lastName, urlProfilePicture, nbSubscriber, nbSubscription, nbPosts, sector, promo, biography, subscribe, canModify, myProfile, canDeleteMyProfile}) {
    const { setIsAuthenticated } = useContext(Auth);
    const { setActiveUser } = useContext(ActiveConnectedUser)
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // const handleDeletePost = async () => {
    //     if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ?')) {
    //         await deleteUser(idUser)
    //         navigate(0);
    //
    // }
    const handleLogout = async () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ?')) {
            await deleteUser(idUser)
            logout();
            setIsAuthenticated(false);
            setActiveUser([]);
            toast.info('A bientôt ! 😋');
        }
    }

    // useEffect(() => {
    //     console.log(JSON.parse(getItem('Profile')).id);
    //     console.log(idUser);
    //     console.log(JSON.parse(getItem('Profile')).id === idUser);
    // }, [])

    return (
        <Card sx={{ minWidth:200}}>
            {(canDeleteMyProfile & JSON.parse(getItem('Profile')).id === idUser && (
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <IconButton onClick={handleOpenUserMenu}>
                            <MoreVertIcon/>
                        </IconButton>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key='Delete_post' onClick={handleLogout}>
                                <Typography textAlign="center" color="red">Supprimer le compte</Typography>
                            </MenuItem>
                            {/*<MenuItem key='Logout' onClick={handleLogout}>*/}
                            {/*    <Typography textAlign="center">Se déconnecter</Typography>*/}
                            {/*</MenuItem>*/}
                        </Menu>
                    </Grid>
                ))
                ||
                null
            }
            <Box display="flex" justifyContent="center" alignItems="center">
                <Avatar
                    src= {urlProfilePicture}
                    sx={{ width: 100, height: 100, position: "absolute", marginBottom:2}}
                />
            </Box>

            <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="flex-start"
                paddingLeft={8}
                paddingRight={8}
                paddingTop={2}
                sx={{ display: { xs: 'none', md: 'flex' }}}
            >
                {(!myProfile && (
                    <ButtonsInteractionUser idUser={idUser} subscribe={subscribe}/>
                ))}

            </Grid>
            <StatUser nbSubscriber={nbSubscriber} nbPosts={nbPosts} nbSubscription={nbSubscription} idUser={idUser}/>

            <Box paddingTop={6}>
                <Typography gutterBottom variant="h6" component="div" align={"center"} >
                    {firstName} {lastName}
                </Typography>
                <Typography align={"center"}  paddingRight={2} paddingLeft={2} variant="subtitle1" component="div" color={"grey"}>
                    {biography}
                </Typography>
            </Box>
            <CardContent>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography color="text" align={"center"} paddingRight={5}>
                        Filière: {sector}
                    </Typography>
                    <Typography color="text" align={"center"}>
                        Promo: {promo}
                    </Typography>
                </Grid>
            </CardContent>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                paddingLeft={2}
                paddingRight={2}
                paddingTop={1}
                sx={{ display: { xs: 'flex', md: 'none' }}}
            >
                {(!myProfile && (
                    <ButtonsInteractionUser idUser={idUser} subscribe={subscribe}/>
                ))}

            </Grid>
            <Box display="flex" justifyContent="center" alignItems="center" paddingBottom={2}>
                {/*<Button style={{backgroundColor: "#00A5A5"}} size="small" variant="contained">*/}
                {/*    Modifier le profil*/}
                {/*</Button>*/}
                {(canModify && (
                    <EditProfileButton
                        firstName={firstName}
                        lastName={lastName}
                        biography={biography}
                        urlProfilePicture={urlProfilePicture}
                    />
                    ))}
            </Box>
        </Card>
    );
}
