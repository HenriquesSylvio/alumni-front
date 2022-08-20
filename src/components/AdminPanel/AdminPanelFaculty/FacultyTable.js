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
import {useContext, useEffect} from "react";
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
import OpenModalAddFaculty from "../../../contexts/OpenModalAddFaculty";
import Backdrop from "@mui/material/Backdrop";
import {Fade, Modal} from "@mui/material";
import AddCommentForm from "../../Post/AddCommentForm";
import AddFacultyForm from "./AddFacultyForm";
import EditIcon from '@mui/icons-material/Edit';
import OpenModalEditFaculty from "../../../contexts/OpenModalEditFaculty";
import EditFacultyForm from "./EditFacultyForm";

const columns = [
    { id: 'name', label: 'Libelle', minWidth: 100 },
];
const styleBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    display: { xs: 'none', md: 'flex' },
};
const styleResponsiveBox = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display: { xs: 'flex', md: 'none' }
};

export default function FacultyTable() {
    const {isOpenAddFaculty, setIsAddFaculty} = useContext(OpenModalAddFaculty);
    const {isOpenEditFaculty, setIsEditFaculty} = useContext(OpenModalEditFaculty);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [faculties, setFaculties] = React.useState({});

    useEffect(() => {
        const getData = async () => {
            await getFaculties();
        }
        getData();
    }, []);

    const handleClose = () => {
        setIsAddFaculty(false)
        // setIdPost(0)
    }

    const handleOpenAddFaculty = () => {
        // console.log(Object.keys(isOpenEditFaculty).length)
        setIsAddFaculty(true);
    };

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
            <Box sx={{
                display: "flex",
                width: "100%",
                paddingBottom: 2
            }} component="form">
                    <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAddFaculty}>
                        Ajouter une filière
                    </Button>
                </Box>
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
                                                <IconButton onClick={() => setIsEditFaculty(faculty)}>
                                                    <EditIcon color="primary"/>
                                                </IconButton>
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
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isOpenAddFaculty}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isOpenAddFaculty}>
                    <Box>
                        <Paper sx={styleBox}>
                            <AddFacultyForm/>
                        </Paper>
                        <Paper sx={styleResponsiveBox}>
                            <AddFacultyForm/>
                        </Paper>
                    </Box>
                </Fade>
            </Modal>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={Object.keys(isOpenEditFaculty).length > 0}
                onClose={() => setIsEditFaculty({})}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={Object.keys(isOpenEditFaculty).length > 0}>
                    <Box>
                        <Paper sx={styleBox}>
                            <EditFacultyForm />
                        </Paper>
                        <Paper sx={styleResponsiveBox}>
                            <EditFacultyForm/>
                        </Paper>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}
