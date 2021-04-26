import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import config from "../config";
import AuthService from './AuthService';



const Jobs = props => {

    const authService = new AuthService();

    const [jobs, setJobs] = useState([]);
    const [users, setUsers] = useState([]);
    const [isMyQuestions, setIsMyQuestion] = useState(false);
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

        getUsers();
        init();
    }, []);


    const init = () => {
        let token = localStorage.getItem('token');

        let configReq = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
        };
        axios.get(`${config.localApiUrl}api/jobs`, configReq)
            .then(resp => {
                if (resp.status != 200) {
                    console.log(resp);
                } else {
                    console.log(resp);

                    setJobs(resp.data);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const getUsers = () => {
        let token = localStorage.getItem('token');

        let configReq = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
        };
        axios.get(`${config.localApiUrl}api/users`, configReq)
            .then(resp => {
                if (resp.status != 200) {
                    console.log(resp);
                } else {
                    setUsers(resp.data);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const getUserOfQuestion = (userId) => {
        let user = users?.filter(u => u._id == userId);
        console.log(user);
        return user[0];
    }

    const deleteJob = (jobId) => {
        let token = localStorage.getItem('token');

        let configReq = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
        };
        axios.delete(`${config.localApiUrl}api/jobs/${jobId}`, configReq)
            .then(resp => {
                if (resp.status != 200) {
                    console.log(resp);
                } else {
                    init();
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const navigateToAddJob = () => {
        if (isUserLoggedIn) {
            props.history.push(`${process.env.PUBLIC_URL}/add-job`);
        } else {
            props.history.push('/login');
        }
    }

    return (
        <div style={{ width: '100%' }}>
            <div style={{ margin: '0 1%' }}>
                <Paper elevation={3} style={{ padding: '0.5%', margin: '2%' }}>
                    <div style={{ padding: '1%', float: 'right' }}>
                        <Button variant="contained" color="primary" onClick={navigateToAddJob}>
                            Add Job
                    </Button>
                    </div>

                    <div style={{ padding: '1%', float: 'left' }}>
                        <h3>  All Jobs </h3>
                        <hr />
                    </div>


                    <div style={{ padding: '1%', paddingTop: '0', clear: 'both' }}>
                        <h5>  {jobs.length} Jobs</h5>
                        <hr />
                    </div>
                </Paper>

                <div style={{ padding: '2%', clear: 'both' }}>
                    {
                        jobs.map((q) => (
                            <Paper elevation={3} style={{ padding: '2%', margin: '0 0 2% 0' }}>
                                <Grid container alignItems="center">
                                    <Grid item xs>
                                        <Typography gutterBottom variant="h6" style={{ color: '#3f51b5', cursor: 'pointer' }}>
                                            {q.name}
                                        </Typography>
                                        <Typography gutterBottom variant="body2">
                                            {q.companyName}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider style={{ margin: '1% 0' }} variant="middle" />

                                <Typography color="textSecondary" variant="body1">
                                    <b>Description</b> < br />
                                    {q.description}
                                </Typography>
                                <Divider style={{ margin: '1% 0' }} variant="middle" />
                                <Typography color="textSecondary" variant="body1">
                                    <b>Type</b> < br />
                                    {q.type}
                                </Typography>
                                <Divider style={{ margin: '1% 0' }} variant="middle" />
                                <Typography color="textSecondary" variant="body1">
                                    <b>Role</b> < br />
                                    {q.role}
                                </Typography>
                                <Divider style={{ margin: '1% 0' }} variant="middle" />
                                <Typography color="textSecondary" variant="body1">
                                    <b>Apply Link</b> < br />
                                    {q.applyLink}
                                </Typography>
                                <Divider style={{ margin: '1% 0' }} variant="middle" />
                                <div>
                                    <div style={{ padding: '1% 0' }}>
                                        {
                                            q.tags.map((t) => (
                                                <Chip label={t} style={{ backgroundColor: '#3f51b5', color: 'white', marginRight: '10px' }} />
                                            ))}

                                    </div>
                                </div>
                                <Divider style={{ margin: '1% 0' }} variant="middle" />


                                <Typography color="textSecondary" variant="body1">
                                    <Chip label="EDIT" style={{ marginRight: '10px', backgroundColor: '#cc6600', color: 'white' }} onClick={(e) => {
                                        props.history.push(`/edit-job/${q._id}`)
                                    }} />
                                         &nbsp; <Chip label="DELETE" onClick={(e) => {
                                        deleteJob(q._id);
                                    }} style={{ marginRight: '10px', backgroundColor: '#b30000', color: 'white' }} />
                                </Typography>
                            </Paper>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs;