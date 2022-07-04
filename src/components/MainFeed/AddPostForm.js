import React, {useContext, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {CircularProgress} from "@mui/material";
import Auth from "../../contexts/Auth";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import CreateIcon from '@mui/icons-material/Create';
import {addPost} from "../../services/AddPostApi";

const theme = createTheme();

export default function AddPostForm() {
    const [values, setValues] = useState({
        content: "",
        tag: {
            id: 2
        }
    });

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;

        setValues({...values, [name]: value})
        console.log(values);
    }

    const handleSubmit = async event => {
        event.preventDefault();

        // await setErrors(validate(values));
        // if (Object.keys(errors).length === 0) {
        //     setLoading(true);
        //     try {
        const response = await addPost(values);
        console.log(response);
        //         setIsAuthenticated(response);
        //         navigate('/feed')
        //         toast.success('Bienvenue ! 😄')
        //     } catch ({response}) {
        //         toast.error(response.data.erreur + ' 😃')
        //         setLoading(false);
        //         console.log(response)
        //     }
        // }
    };


    return (
            <Container component="main">
                <CssBaseline />
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '100%' }}
                    onSubmit={handleSubmit}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <CreateIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Création de poste
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="title"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Titre"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="content"
                                    name="content"
                                    label="Contenu du poste"
                                    multiline
                                    rows={10}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            // onClick={handleClick}
                            // loading={loading}
                            // loadingPosition="end"
                        >
                            Créer
                        </Button>
                    </Box>
                </Grid>
            </Container>
    );
}


// import React, {useContext, useEffect, useState} from 'react';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import TextField from "@mui/material/TextField";
// import {toast} from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import {CircularProgress} from "@mui/material";
// import Auth from "../../contexts/Auth";
// import Grid from "@mui/material/Grid";
// import Avatar from "@mui/material/Avatar";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import CreateIcon from '@mui/icons-material/Create';
// import validate from "../../validators/LoginValidator";
// import {login} from "../../services/AuthApi";
// import {addPost} from "../../services/addPostApi";
// import {useNavigate} from "react-router-dom";
//
// const theme = createTheme();
//
// export default function AddPostForm() {
//
//     const [values, setValues] = useState({
//         content: ""
//     });
//
//     const handleChange = ({currentTarget}) => {
//         const {name, value} = currentTarget;
//
//         setValues({...values, [name]: value})
//     }
//
//     const handleSubmit = async event => {
//         event.preventDefault();
//
//         // await setErrors(validate(values));
//         // if (Object.keys(errors).length === 0) {
//         //     setLoading(true);
//         //     try {
//         const response = await addPost(values);
//         console.log(response);
//         //         setIsAuthenticated(response);
//         //         navigate('/feed')
//         //         toast.success('Bienvenue ! 😄')
//         //     } catch ({response}) {
//         //         toast.error(response.data.erreur + ' 😃')
//         //         setLoading(false);
//         //         console.log(response)
//         //     }
//         // }
//     };
//
//     return (
//         <Container component="main">
//             <Grid
//                 container
//                 spacing={0}
//                 direction="column"
//                 alignItems="center"
//                 justifyContent="center"
//                 style={{ minHeight: '100%' }}
//                 onSubmit={handleSubmit}
//             >
//                 <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
//                     <CreateIcon />
//                 </Avatar>
//                 <Typography component="h1" variant="h5">
//                     Création de poste
//                 </Typography>
//                 <Box component="form" noValidate sx={{ mt: 1 }}>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12}>
//                             <TextField
//                                 name="title"
//                                 required
//                                 fullWidth
//                                 id="title"
//                                 label="Titre"
//                                 autoFocus
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 required
//                                 fullWidth
//                                 id="content"
//                                 name="content"
//                                 label="Contenu du poste"
//                                 multiline
//                                 rows={10}
//                                 onChange={handleChange}
//                             />
//                         </Grid>
//                     </Grid>
//                     <Button
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         sx={{ mt: 3, mb: 2 }}
//                         // onClick={handleClick}
//                         // loading={loading}
//                         // loadingPosition="end"
//                     >
//                         Créer
//                     </Button>
//                 </Box>
//             </Grid>
//         </Container>
//         // </ThemeProvider>
//     );
// }
