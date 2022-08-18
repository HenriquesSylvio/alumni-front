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
import {useEffect} from "react";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from "@mui/material/IconButton";

const columns = [
    { id: 'lastName', label: 'Nom', minWidth: 100 },
    { id: 'firstName', label: 'Prénom', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 170 },
    // { id: 'promo', label: 'Nom d', minWidth: 170 },
    {
        id: 'promo',
        label: 'Promo',
        minWidth: 50,
        align: 'right',
    },
    { id: 'faculty_label', label: 'Filière', minWidth: 200 },
    // { id: 'action', label: 'Action', minWidth: 200 },
];


export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [users, setUsers] = React.useState({});

    useEffect(() => {
        const getData = async () => {
            await getPostFromFeed();
        }
        getData();
        console.log('sheeeeesh')
    }, []);

    const getPostFromFeed = async () => {
        const response = await getUserWaitingForValidation();
        console.log(response.data.users);
        setUsers(response.data.users);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // const deleteUser = async (idUser, indexRow) => {
    //     if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
    //         const j = users[indexRow];
    //     }
    //     const j = delete users[indexRow]
    //     console.log(j)
    //     console.log(users)
    // };

    const handleDelete = (index,e) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            setUsers(users.filter((v, i) => i !== index))
        }
    }

    return (
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
                        {users.length ?
                            users
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((user, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                                        {columns.map((column) => {
                                            const value = user[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell key="action" align="center">
                                            <IconButton>
                                                <CheckIcon color="success"/>
                                            </IconButton>
                                            {/*<IconButton onClick={(e) => deleteUser(user.id, index)}>*/}
                                            <IconButton onClick={e => handleDelete(index, e)}>
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
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
