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
import AuthService from './AuthService';
import TextField from '@material-ui/core/TextField';




const Answer = props => {

    const authService = new AuthService();

    const [questionId, setQuestionId] = useState('');
    const [question, setQuestion] = useState({});

    const [answers, setAnswers] = useState([]);
    const [users, setUsers] = useState([]);
    const [loggedInUserId, setLoggedInUserId] = useState('');
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const [answer, setAnswer] = useState('');
    const [answerHelperText, setAnswerHelperText] = useState('');
    const [showAnswerErrorMessage, setShowAnswerErrorMessage] = useState(false);


    useEffect(() => {
        let loggedInUserId = authService.getUserId();
        if (loggedInUserId) {
            setLoggedInUserId(loggedInUserId);
            setIsUserLoggedIn(true);
        } else {
            setIsUserLoggedIn(false);
        }
        setQuestionIdFromParam();
        getUsers();
        getQuestionDetails();
        addViewToQuestion();
        init();
    }, [questionId]);


    const getQuestionDetails = () => {
        if (questionId) {
            let token = localStorage.getItem('token');

            let configReq = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
            };
            axios.get(`${config.localApiUrl}api/questions/${questionId}`, configReq)
                .then(resp => {
                    console.log(resp);

                    if (resp.status != 200) {
                        console.log(resp);
                    } else {
                        setQuestion(resp.data);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }


    const setQuestionIdFromParam = () => {
        if (props.match.params.id) {
            setQuestionId(props.match.params.id);
        }
    }

    const addViewToQuestion = () => {
        if (questionId) {

            let token = localStorage.getItem('token');

            let configReq = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
            };
            axios.post(`${config.localApiUrl}api/questions/${questionId}/addView`, configReq)
                .then(resp => {
                    if (resp.status != 200) {
                        console.log(resp);
                    } else {

                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }


    const init = () => {
        let token = localStorage.getItem('token');

        let configReq = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
        };
        axios.get(`${config.localApiUrl}api/answers/getAnswersByQuestionID/${questionId}`, configReq)
            .then(resp => {
                console.log(resp.data);
                if (resp.status != 200) {
                    console.log(resp);
                } else {
                    setAnswers(resp.data);
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


    const addLikeToAnswer = (answerId) => {
        let token = localStorage.getItem('token');

        let configReq = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
        };
        axios.post(`${config.localApiUrl}api/answers/${answerId}/addLike`, configReq)
            .then(resp => {
                if (resp.status != 200) {
                    console.log(resp);
                } else {
                    init()

                }
            })
            .catch(err => {
                console.log(err);
            });
    }


    const formAnswerModel = () => {
        let answerDetails = {};
        answerDetails = {
            answer: answer,
            questionID: questionId,
            likes: 0,
            userID: authService.getUserId(),
        }

        return answerDetails;
    }


    const saveAnswer = () => {
        if (!isUserLoggedIn) {
            props.history.push('/login');
        } else {
            let isAnswerValid = validateAnswerDetails();
            if (isAnswerValid) {
                const answer = formAnswerModel();

                let token = localStorage.getItem('token');

                let configReq = {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': token
                    },
                };

                axios.post(`${config.localApiUrl}api/answers`, answer, configReq)
                    .then(resp => {
                        console.log(resp);
                        props.history.push('/question')

                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    }


    const validateAnswerDetails = () => {
        let isDataValid = true;
        if (!answer) {
            isDataValid = false;
            setShowAnswerErrorMessage(true);
            setAnswerHelperText('Please answer');
        }
        if (!isDataValid) {
            return false;
        }
        return true;
    }


    return (
        <div style={{ width: '100%' }}>
            <div style={{ margin: '1%', float: 'left', width: '20%' }}>
                <Paper elevation={3} style={{ padding: '0.5%', margin: '2%', }}>
                    <div style={{ padding: '1%', margin: '1%' }}>
                        <hr />
                        <p style={{ cursor: 'pointer' }} onClick={init}><b>All answers</b></p>
                        <hr />
                    </div>
                </Paper>
            </div>
            <div style={{  float: 'right', width: '74%', padding: '0.5%', margin: '2%' }}>
                <Paper elevation={3} style={{ padding: '2%', margin: '0 0 2% 0' }}>
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <Typography gutterBottom variant="h6" style={{ color: '#3f51b5', cursor: 'pointer' }}>
                                {question?.title}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Typography color="textSecondary" variant="body1">
                        {question?.description}
                    </Typography>
                    <Divider style={{ margin: '1% 0' }} variant="middle" />
                    <div>
                        <div style={{ padding: '1% 0' }}>
                            {
                                (question.tags ?? []).map((t) => (
                                    <Chip label={t} style={{ backgroundColor: '#3f51b5', color: 'white', marginRight: '10px' }} />
                                ))}

                        </div>
                    </div>
                    <Divider style={{ margin: '1% 0' }} variant="middle" />
                    <div>
                        <div style={{ padding: '1% 0' }}>
                            {
                                 (question.category ?? []).map((t) => (
                                    <Chip label={t} style={{ marginRight: '10px' }} />
                                ))}

                        </div>
                    </div>
                    <Divider style={{ margin: '1% 0' }} variant="middle" />

                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" style={{ backgroundColor: '#3f51b5' }}>
                                {getUserOfQuestion(question?.user)?.email[0]}
                            </Avatar>
                        }
                        title={getUserOfQuestion(question?.user)?.email}
                        subheader={new Date(question?.createdAt).toLocaleString()}
                    />
                </Paper>

                <Paper elevation={3} style={{ padding: '0.5%', margin: '2%' }}>

                    <div style={{ padding: '1%', float: 'left' }}>
                        <h3>  All Answers </h3>
                        <hr />
                    </div>


                    <div style={{ padding: '1%', paddingTop: '0', clear: 'both' }}>
                        <h5>  {answers.length} Answers</h5>
                        <hr />
                    </div>
                </Paper>

                <div style={{ padding: '2%', clear: 'both' }}>

                    {
                        answers.map((q) => (
                            <Paper elevation={3} style={{ padding: '2%', margin: '0 0 2% 0' }}>

                                <Typography color="textSecondary" variant="body1">
                                    {q.answer}
                                </Typography>
                                <Divider style={{ margin: '1% 0' }} variant="middle" />
                                <Typography color="textSecondary" variant="body1">
                                    <ThumbUpIcon style={{ marginBottom: '3px', cursor: 'pointer' }} onClick={(e) => {
                                        addLikeToAnswer(q._id)
                                    }} />  {q.likes} likes  &nbsp;
                                </Typography>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipe" style={{ backgroundColor: '#3f51b5' }}>
                                            {getUserOfQuestion(q.userID)?.email[0]}
                                        </Avatar>
                                    }
                                    title={getUserOfQuestion(q.userID)?.email}
                                    subheader={new Date(q.createdAt).toLocaleString()}
                                />
                            </Paper>

                        ))
                    }

                    <Paper elevation={3} style={{ padding: '2%', margin: '0 0 2% 0' }}>
                        <Grid item xs={12}>
                            <TextField
                                error={showAnswerErrorMessage}
                                style={{
                                    width: '100%'
                                }}
                                onChange={(e) => {
                                    setAnswer(e.target.value);
                                    setShowAnswerErrorMessage(false);
                                    setAnswerHelperText('');
                                }}
                                id="outlined-multiline-static"
                                label="Answer"
                                variant="outlined"
                                value={answer}
                                helperText={answerHelperText}
                                multiline
                                rows={3}
                                placeholder="Include your answer"
                            />
                        </Grid>
                        <br></br>
                        <div style={{ padding: '1%' }}>
                            <Button variant="contained" color="primary" onClick={saveAnswer}>
                                SAVE
                    </Button>
                        </div>
                    </Paper>


                </div>
            </div>
        </div>
    )
}

export default Answer;