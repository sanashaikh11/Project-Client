import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AuthService from './AuthService';
import axios from "axios";
import config from "../config";





const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const Companies = props => {
    const classes = useStyles();

    const authService = new AuthService();

    const [companies, setCompanies] = useState([]);
    const [loggedInUserId, setLoggedInUserId] = useState('');
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);


    useEffect(() => {
        let loggedInUserId = authService.getUserId();
        if (loggedInUserId) {
            setLoggedInUserId(loggedInUserId);
            setIsUserLoggedIn(true);
        } else {
            setIsUserLoggedIn(false);
        }

        getCompanies();
    }, []);


    const getCompanies = () => {
        let token = localStorage.getItem('token');

        let configReq = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
        };
        axios.get(`${config.localApiUrl}api/companies`, configReq)
            .then(resp => {
                if (resp.status !== 200) {
                    console.log(resp);
                } else {
                    console.log(resp);
                    setCompanies(resp.data);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const deleteCompany = (companyid) => {
        let token = localStorage.getItem('token');

        let configReq = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
        };
        axios.delete(`${config.localApiUrl}api/companies/${companyid}`, configReq)
            .then(resp => {
                if (resp.status !== 200) {
                    console.log(resp);
                } else {
                    console.log(resp);
                    getCompanies();
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div style={{ margin: '2%' }}>
            <div style={{ padding: '1%', float: 'right' }}>
                <Button variant="contained" color="primary" onClick={(e) => {
                    props.history.push('/add-company')
                }}>
                    Add Company
                    </Button>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Name</b></TableCell>
                            <TableCell><b>Description</b></TableCell>
                            <TableCell><b>Status</b></TableCell>
                            <TableCell><b>Website</b></TableCell>
                            <TableCell><b>Industry</b></TableCell>
                            <TableCell><b>Edit</b></TableCell>
                            <TableCell><b>Delete</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>{row.website}</TableCell>
                                <TableCell>{row.industry}</TableCell>
                                <TableCell><Button variant="outlined" color="primary" onClick={(e) => {
                                    props.history.push(`/edit-company/${row._id}`)
                                }}>
                                    EDIT
</Button></TableCell>
                                <TableCell><Button variant="outlined" color="secondary" onClick={(e) => {
                                    deleteCompany(row._id);
                                }}>
                                    DELETE
</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    );
}

export default Companies;
