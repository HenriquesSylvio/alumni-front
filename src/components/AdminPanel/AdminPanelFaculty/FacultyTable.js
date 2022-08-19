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
import {deleteUser} from "../../../services/DeleteUserApi";
import {acceptUser} from "../../../services/AcceptUserApi";
import {getFaculty} from "../../../services/GetFacultyApi";
import {deleteFaculty} from "../../../services/DeleteFacultyApi";
import {toast} from "react-toastify";
import Container from "@mui/material/Container";
import {Box} from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from '@mui/icons-material/Add';

const columns = [
    { id: 'name', label: 'Libelle', minWidth: 100 },
];


export default function FacultyTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [faculties, setFaculties] = React.useState({});

    useEffect(() => {
        const getData = async () => {
            await getFaculties();
        }
        getData();
    }, []);

    const getFaculties = async () => {
        const response = await getFaculty();
        console.log(response.data.faculty);
        setFaculties(response.data.faculty);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDelete = async (index, idFaculy) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet filière ?')) {
            try {
                setFaculties(faculties.filter((v, i) => i !== index + (page * 10)))
                await deleteFaculty(idFaculy);
            } catch {
                toast.error("Impossible de supprimer la filière, car des utilisateurs y sont rattachés ! 😃")
            }

        }
    }

    return (
        <Box>
            {/*<Paper*/}
            {/*    component="form"*/}
            {/*    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}*/}
            {/*>*/}
            {/*<Container component="main">*/}
                <Box sx={{
                    display: "flex",
                    width: "100%",
                    paddingBottom: 2
                }}
                     component="form"
                >
                    <Button variant="contained" startIcon={<AddIcon />}>
                        Ajouter une filière
                    </Button>
                </Box>
            {/*</Container>*/}
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
                            {faculties.length ?
                                faculties
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((faculty, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={faculty.id}>
                                            {columns.map((column) => {
                                                const value = faculty[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell key="action" align="center">
                                                <IconButton onClick={e => handleDelete(index, faculty.id)}>
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
                    rowsPerPageOptions={10}
                    component="div"
                    count={faculties.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
