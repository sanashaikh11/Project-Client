import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import config from "../config";
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import AuthService from './AuthService';




const AddQuestion = props => {

    const authService = new AuthService();


    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [questionId, setQuestionId] = useState('');
    const [question, setQuestion] = useState({});
    const [showTitleErrorMessage, setShowTitleErrorMessage] = useState(false);
    const [title, setTitle] = useState('');
    const [titleHelperText, setTitleHelperText] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionHelperText, setDescriptionHelperText] = useState('');
    const [showDescriptionErrorMessage, setShowDescriptionErrorMessage] = useState(false);

    const [isEdit, setIsEdit] = useState(false);

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

        checkIsEditMode();
        getAllTags();
        getAllCategories();
        getQuestionById();

    }, [isEdit, questionId]);


    const checkIsEditMode = () => {
        if (window.location.href.indexOf("edit-question") > -1) {
            setQuestionId(props.match.params.id);
            setIsEdit(true);
        }
    }

    const getQuestionById = () => {
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
                if (resp.data) {
                    setQuestion(resp.data);
                    setTitle(resp.data.title);
                    setDescription(resp.data.description);
                    setSelectedTags(resp.data.tags ?? []);
                    setSelectedCategories(resp.data.category ?? []);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }


    const formQuestionModel = () => {
        let questionDetails = {};
        if (isEdit) {
            questionDetails = {
                id: questionId,
                title: title,
                description: description,
                tags: selectedTags,
                category: selectedCategories,
                views: question.views,
                likes: question.likes,
                comments: [],
                user: authService.getUserId(),
            }
        } else {
            questionDetails = {
                title: title,
                description: description,
                tags: selectedTags,
                category: selectedCategories,
                views: 0,
                likes: 0,
                comments: [],
                user: authService.getUserId(),

            }
        }

        return questionDetails;
    }


    const saveQuestion = () => {
        let isQuestionValid = validateQuestionDetails();
        if (isQuestionValid) {
            const question = formQuestionModel();

            let token = localStorage.getItem('token');

            let configReq = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
            };

            if (isEdit) {
                axios.put(`${config.localApiUrl}api/questions`, question, configReq)
                    .then(resp => {
                        console.log(resp);
                        props.history.push('/question')

                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                axios.post(`${config.localApiUrl}api/questions`, question, configReq)
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


    const validateQuestionDetails = () => {
        let isDataValid = true;
        if (!title) {
            isDataValid = false;
            setShowTitleErrorMessage(true);
            setTitleHelperText('Please enter title');
        }
        if (!description) {
            isDataValid = false;
            setShowDescriptionErrorMessage(true);
            setDescriptionHelperText("Please enter description");
        }
        if (!isDataValid) {
            return false;
        }

        return true;
    }

    const getAllTags = () => {
        let token = localStorage.getItem('token');

        let configReq = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
        };
        axios.get(`${config.localApiUrl}api/tags`, configReq)
            .then(resp => {
                if (resp.status != 200) {
                    console.log(resp);
                } else {
                    let tagsData = resp.data.map(t => {
                        return t.tag;
                    })
                    setTags(tagsData ?? []);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }


    const getAllCategories = () => {
        let token = localStorage.getItem('token');

        let configReq = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
        };
        axios.get(`${config.localApiUrl}api/category`, configReq)
            .then(resp => {
                if (resp.status != 200) {
                    console.log(resp);
                } else {

                    let categoryData = resp.data.map(c => {
                        return c.Categoryname;
                    })

                    setCategories(categoryData ?? []);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleChangeTag = (event) => {
        setSelectedTags(event.target.value);
    };

    const handleChangeCategory = (event) => {
        setSelectedCategories(event.target.value);
    };



    return (
        <div style={{ margin: '0 10%' }}>
            <Paper elevation={3} style={{ padding: '0.5%', paddingBottom: '10%', margin: '2%' }}>
                <div style={{ padding: '1%', float: 'left' }}>
                    <h3>  Ask a public question</h3>
                    <hr />
                </div>

                <Grid item xs={12} style={{ clear: 'both' }}>
                    <TextField
                        error={showTitleErrorMessage}
                        style={{
                            width: '100%'
                        }}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            setTitleHelperText('');
                            setShowTitleErrorMessage(false);
                        }}
                        id="outlined-multiline-static"
                        label="Title"
                        variant="outlined"
                        value={title}
                        helperText={titleHelperText}
                        placeholder="Be specific and imagine you’re asking a question to another person"
                    />
                </Grid>
                <br></br>


                <Grid item xs={12}>
                    <TextField
                        error={showDescriptionErrorMessage}
                        style={{
                            width: '100%'
                        }}
                        onChange={(e) => {
                            setDescription(e.target.value);
                            setShowDescriptionErrorMessage(false);
                            setDescriptionHelperText('');
                        }}
                        id="outlined-multiline-static"
                        label="Body"
                        variant="outlined"
                        value={description}
                        helperText={descriptionHelperText}
                        multiline
                        rows={3}
                        placeholder="Include all the information someone would need to answer your question"
                    />
                </Grid>
                <br></br>

                <Grid item xs={12}>
                    <FormControl style={{ width: '350px' }}>
                        <InputLabel id="demo-mutiple-checkbox-label">Categories</InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            multiple
                            variant="outlined"
                            value={selectedCategories}
                            onChange={handleChangeCategory}
                            input={<Input />}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {categories.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={(selectedCategories ?? []).indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <br></br>

                <Grid item xs={12}>
                    <FormControl style={{ width: '350px' }}>
                        <InputLabel id="demo-mutiple-checkbox-label">Tag</InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            multiple
                            variant="outlined"
                            value={selectedTags}
                            onChange={handleChangeTag}
                            input={<Input />}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {tags.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={(selectedTags ?? []).indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <br></br>
                <div style={{ padding: '1%', float: 'right' }}>
                    <Button variant="contained" color="primary" onClick={saveQuestion}>
                        SAVE
                    </Button>
                </div>

            </Paper>
        </div>
    )
}

export default AddQuestion;