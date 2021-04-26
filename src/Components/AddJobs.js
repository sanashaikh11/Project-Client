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


const AddJob = props => {

    const authService = new AuthService();

    const [name, setName] = useState('');
    const [nameHelperText, setNameHelperText] = useState('');
    const [showNameErrorMessage, setShowNameErrorMessage] = useState(false);

    const [description, setDescription] = useState('');
    const [descriptionHelperText, setDescriptionHelperText] = useState('');
    const [showDescriptionErrorMessage, setShowDescriptionErrorMessage] = useState(false);

    const [type, setType] = useState('');

    const [job, setJob] = useState({});

    const [role, setRole] = useState('');

    const [applyLink, setApplyLink] = useState('');

    const [isEdit, setIsEdit] = useState(false);

    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [companyId, setCompanyId] = useState('');
    const [companyName, setCompanyName] = useState('');

    const [companies, setCompanies] = useState([]);

    const [jobId, setJobId] = useState('');


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
        getAllCompanies();
        getJobById();

    }, [isEdit, jobId]);


    const getAllTags = () => {
        let token = localStorage.getItem('token');

        let configReq = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
        };
        axios.get(`${config.localApiUrl}api/tag`, configReq)
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

    const checkIsEditMode = () => {
        if (window.location.href.indexOf("edit-job") > -1) {
            setJobId(props.match.params.id);
            setIsEdit(true);
        }
    }

    const getJobById = () => {
        let token = localStorage.getItem('token');

        let configReq = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
        };

        axios.get(`${config.localApiUrl}api/jobs/${jobId}`, configReq)
            .then(resp => {
                console.log(resp);
                if (resp.data) {
                    console.log(resp.data);
                    setJob(resp.data);
                    setName(resp.data.name);
                    setDescription(resp.data.description);
                    setSelectedTags(resp.data.tags ?? []);
                    setApplyLink(resp.data.applyLink);
                    setRole(resp.data.role);
                    setType(resp.data.type);
                    setCompanyId(resp.data.companyId);
                    setCompanyName(resp.data.companyName);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const getAllCompanies = () => {
        let token = localStorage.getItem('token');

        let configReq = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
        };
        axios.get(`${config.localApiUrl}api/companies`, configReq)
            .then(resp => {
                if (resp.status != 200) {
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


    const formJobModel = () => {
        let jobDetails = {};
        if (isEdit) {
            jobDetails = {
                id: jobId,
                name: name,
                description: description,
                applyLink: applyLink,
                type: type,
                role: role,
                tags: selectedTags,
                companyId: companyId,
                companyName: companyName
            }
        } else {
            jobDetails = {
                name: name,
                description: description,
                applyLink: applyLink,
                type: type,
                role: role,
                tags: selectedTags,
                companyId: companyId,
                companyName: companyName
            }
        }
        return jobDetails;
    }


    const saveJob = () => {
        let isJobValid = validateJobDetails();
        if (isJobValid) {
            const job = formJobModel();

            let token = localStorage.getItem('token');

            let configReq = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
            };

            if (isEdit) {
                axios.put(`${config.localApiUrl}api/jobs`, job, configReq)
                    .then(resp => {
                        console.log(resp);
                        props.history.push('/jobs')

                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                axios.post(`${config.localApiUrl}api/jobs`, job, configReq)
                    .then(resp => {
                        console.log(resp);
                        props.history.push('/jobs')

                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    }

    const handleChangeTag = (event) => {
        setSelectedTags(event.target.value);
    };


    const validateJobDetails = () => {
        let isDataValid = true;
        if (!name) {
            isDataValid = false;
            setShowNameErrorMessage(true);
            setNameHelperText('Please enter name');
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

    return (
        <div style={{ margin: '0 10%' }}>
            <Paper elevation={3} style={{ padding: '0.5%', paddingBottom: '10%', margin: '2%' }}>
                <div style={{ padding: '1%', float: 'left' }}>
                    <h3>  Add a Job</h3>
                    <hr />
                </div>

                <Grid item xs={12} style={{ clear: 'both' }}>
                    <TextField
                        error={showNameErrorMessage}
                        style={{
                            width: '100%'
                        }}
                        onChange={(e) => {
                            setName(e.target.value);
                            setNameHelperText('');
                            setShowNameErrorMessage(false);
                        }}
                        id="outlined-multiline-static"
                        label="Name"
                        variant="outlined"
                        value={name}
                        helperText={nameHelperText}
                        placeholder="Add a company name"
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
                        label="Description"
                        variant="outlined"
                        value={description}
                        helperText={descriptionHelperText}
                        multiline
                        rows={3}
                        placeholder="Description"
                    />
                </Grid>
                <br></br>
                <Grid item xs={12}>
                    <FormControl style={{ width: '350px' }}>
                        <InputLabel id="demo-simple-select-label">type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            onChange={(e) => {
                                setType(e.target.value);
                            }}
                        >
                            <MenuItem value="Contract">Contract</MenuItem>
                            <MenuItem value="Full-time">Full-time</MenuItem>
                            <MenuItem value="Part-time">Part-time</MenuItem>
                            <MenuItem value="Freelancer">Freelancer</MenuItem>
                            <MenuItem value="Internship">Internship</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <br></br>
                <Grid item xs={12}>
                    <TextField
                        style={{
                            width: '100%'
                        }}
                        onChange={(e) => {
                            setRole(e.target.value);
                        }}
                        id="outlined-multiline-static"
                        label="Role"
                        variant="outlined"
                        value={role}
                        placeholder="Role"
                    />
                </Grid>
                <br></br>
                <Grid item xs={12}>
                    <TextField
                        style={{
                            width: '100%'
                        }}
                        onChange={(e) => {
                            setApplyLink(e.target.value);
                        }}
                        id="outlined-multiline-static"
                        label="Apply Link"
                        variant="outlined"
                        value={applyLink}
                        placeholder="Apply Link"
                    />
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
                <Grid item xs={12}>
                    <FormControl style={{ width: '350px' }}>
                        <InputLabel id="demo-simple-select-label">Company</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={companyId}
                            onChange={(e) => {
                                setCompanyId(e.target.value);
                                companies.map(c => {
                                    if(c._id === e.target.value) {
                                        setCompanyName(c.name);
                                    }
                                })
                            }}
                        >
                            {companies.map(c => (
                                <MenuItem value={c._id}>{c.name}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </Grid>


                <div style={{ padding: '1%', float: 'right' }}>
                    <Button variant="contained" color="primary" onClick={saveJob}>
                        SAVE
                    </Button>
                </div>

            </Paper>
        </div>
    )
}

export default AddJob;