import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import config from "../config";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AuthService from './AuthService';



const Question = props => {

    const authService = new AuthService();

    const [questions, setQuestions] = useState([]);
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
        setIsMyQuestion(false);
        let token = localStorage.getItem('token');

        let configReq = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
        };
        axios.get(`${config.localApiUrl}api/questions`, configReq)
            .then(resp => {
                if (resp.status != 200) {
                    console.log(resp);
                } else {
                    setQuestions(resp.data);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const getQuestionsByUserId = () => {
        if (!isUserLoggedIn) {
            props.history.push('/login');
        } else {
            setIsMyQuestion(true);
            let token = authService.getToken();

            let configReq = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
            };
            axios.get(`${config.localApiUrl}api/questions/user/${authService.getUserId()}`, configReq)
                .then(resp => {
                    if (resp.status != 200) {
                        console.log(resp);
                    } else {
                        setQuestions(resp.data);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
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

    const addLikeToQuestion = (questionId) => {
        let token = localStorage.getItem('token');

        let configReq = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
        };
        axios.post(`${config.localApiUrl}api/questions/${questionId}/addLike`, configReq)
            .then(resp => {
                if (resp.status != 200) {
                    console.log(resp);
                } else {
                    if (isMyQuestions) {
                        getQuestionsByUserId()
                    } else {
                        init();
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const deleteQuestion = (questionId) => {
        let token = localStorage.getItem('token');

        let configReq = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
        };
        axios.delete(`${config.localApiUrl}api/questions/${questionId}`, configReq)
            .then(resp => {
                if (resp.status != 200) {
                    console.log(resp);
                } else {
                    if (isMyQuestions) {
                        getQuestionsByUserId()
                    } else {
                        init();
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const navigateToAddQuestion = () => {
        if(isUserLoggedIn) {
            props.history.push(`${process.env.PUBLIC_URL}/add-question`);
        } else {
            props.history.push('/login');
        }
    }

    return (
        <div style={{ width: '100%' }}>
            <div style={{ margin: '1%', float: 'left', width: '20%' }}>
                <Paper elevation={3} style={{ padding: '0.5%', margin: '2%', }}>
                    <div style={{ padding: '1%', margin: '1%' }}>
                        <hr />
                        <p style={{ cursor: 'pointer' }} onClick={init}><b>All questions</b></p>
                        <hr />
                        <p style={{ cursor: 'pointer' }} onClick={getQuestionsByUserId}><b>My questions</b></p>
                        <hr />
                    </div>
                </Paper>
            </div>
            <div style={{ margin: '0 1%', float: 'right', width: '75%' }}>
                <Paper elevation={3} style={{ padding: '0.5%', margin: '2%' }}>
                    <div style={{ padding: '1%', float: 'right' }}>
                        <Button variant="contained" color="primary" onClick={navigateToAddQuestion}>
                            Ask Question
                    </Button>
                    </div>

                    <div style={{ padding: '1%', float: 'left' }}>
                        <h3>  {isMyQuestions ? 'My Questions' : 'All Questions'} </h3>
                        <hr />
                    </div>


                    <div style={{ padding: '1%', paddingTop: '0', clear: 'both' }}>
                        <h5>  {questions.length} Questions</h5>
                        <hr />
                    </div>
                </Paper>

                <div style={{ padding: '2%', clear: 'both' }}>
                    {
                        questions.map((q) => (
                            <Paper elevation={3} style={{ padding: '2%', margin: '0 0 2% 0' }}>
                                <Grid container alignItems="center">
                                    <Grid item xs>
                                        <Typography gutterBottom variant="h6" style={{ color: '#3f51b5', cursor:'pointer' }} onClick={(e) => {
                                            props.history.push(`/answers/${q._id}`)
                                        }}>
                                            {q.title}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Typography color="textSecondary" variant="body1">
                                    {q.description}
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
                                <div>
                                    <div style={{ padding: '1% 0' }}>
                                        {
                                            q.category.map((t) => (
                                                <Chip label={t} style={{ marginRight: '10px' }} />
                                            ))}

                                    </div>
                                </div>
                                <Divider style={{ margin: '1% 0' }} variant="middle" />

                                <Typography color="textSecondary" variant="body1">
                                    <VisibilityIcon style={{ marginBottom: '3px', cursor: 'pointer' }} /> {q.views} views &nbsp; <ThumbUpIcon style={{ marginBottom: '3px', cursor: 'pointer' }} onClick={(e) => {
                                        addLikeToQuestion(q._id)
                                    }} />  {q.likes} likes  &nbsp;  {isMyQuestions && <Chip label="EDIT" style={{ marginRight: '10px', backgroundColor: '#cc6600', color: 'white' }} onClick={(e) => {
                                        props.history.push(`/edit-question/${q._id}`)
                                    }} />}
                                         &nbsp; {isMyQuestions && <Chip label="DELETE" onClick={(e) => {
                                        deleteQuestion(q._id);
                                    }} style={{ marginRight: '10px', backgroundColor: '#b30000', color: 'white' }} />}
                                </Typography>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipe" style={{ backgroundColor: '#3f51b5' }}>
                                            {getUserOfQuestion(q.user)?.email[0]}
                                        </Avatar>
                                    }
                                    title={getUserOfQuestion(q.user)?.email}
                                    subheader={new Date(q.createdAt).toLocaleString()}
                                />
                            </Paper>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Question;