import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import getFeed from "../../../services/FeedApi";
import getUserWaitingForValidation from "../../../services/GetUserWaitingForValidationApi";
import {useEffect, useState} from "react";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from "@mui/material/IconButton";
import {deleteUser} from "../../../services/DeleteUserApi";
import {acceptUser} from "../../../services/AcceptUserApi";
import InputBase from "@mui/material/InputBase";
import {Box} from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from "@mui/icons-material/Send";
import getUsers from "../../../services/GetUsersApi";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import getPosts from "../../../services/GetPostsApi";
import {deletePost} from "../../../services/DeletePostApi";

const columns = [
    { id: 'content', label: 'Contenu de la publication', minWidth: 300 },
    { id: 'createAt', label: 'Date de création', minWidth: 100 },
];


export default function PostTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    const [posts, setPosts] = React.useState({});
    const [meta, setMeta] = React.useState({});
    const [maxPage, setMaxPage] = React.useState(0);
    const [values, setValues] = useState({
        content: "",
    });

    let newPosts = {}

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMaxPage(0)
        setPage(0)
        setPosts("")
        await searchPosts(1);
    };

    const searchPosts = async (numberPage) => {
        // console.log(numberPage);
        const response = await getPosts(numberPage, values.content);
        newPosts = response.data.data;
        if (posts.length){
            setPosts((oldPosts) => [...oldPosts, ...newPosts])
        } else {
            setPosts(newPosts)
        }
        setMeta(response.data.meta)
    }

    const handleChangePage = async (event, newPage) => {
        if (maxPage < newPage){
            await searchPosts(newPage + 1)
            setMaxPage(newPage);
        }
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;

        setValues({...values, [name]: value})
    }

    const handleDelete = async (index, idPost) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette publication ?')) {

            setPosts(posts.filter((v, i) => i !== index + (page * 15)))
            await deletePost(idPost);
        }
    }


    return (
        <Box>
            <Container component="main">
                <Box sx={{
                    display: "flex",
                    width: "100%",
                    paddingBottom: 2
                }}
                     onSubmit={handleSubmit}
                     component="form"
                >
                    <TextField
                        sx={{width: "100%"}}
                        id="content"
                        label="Recherche"
                        name="content"
                        autoComplete="content"
                        onChange={handleChange}
                    />
                    <Button id="content-message" variant="contained" color="primary" onClick={handleSubmit}>
                        <SearchIcon />
                    </Button>
                </Box>
            </Container>
            {/*</Paper>*/}
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell
                                    key="action"
                                    align="center"
                                    style={{ minWidth: "200" }}
                                >
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {posts.length ?
                                posts
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((post, index) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={post.idPost}>
                                                    {columns.map((column) => {
                                                        const value = post[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {column.format && typeof value === 'number'
                                                                    ? column.format(value)
                                                                    : value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                    <TableCell key="action" align="center">
                                                        <IconButton onClick={e => handleDelete(index, post.idPost)}>
                                                            <ClearIcon color="error"/>
                                                        </IconButton>

                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }
                                    ) : null
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[15]}
                    component="div"
                    count={meta.total_items}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
