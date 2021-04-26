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
import AuthService from './AuthService';


const AddCompany = props => {

    const authService = new AuthService();

    const [name, setName] = useState('');
    const [nameHelperText, setNameHelperText] = useState('');
    const [showNameErrorMessage, setShowNameErrorMessage] = useState(false);

    const [description, setDescription] = useState('');
    const [descriptionHelperText, setDescriptionHelperText] = useState('');
    const [showDescriptionErrorMessage, setShowDescriptionErrorMessage] = useState(false);

    const [website, setWebsite] = useState('');

    const [company, setCompany] = useState({});

    const [industry, setIndustry] = useState('');

    const [status, setStatus] = useState('');

    const [isEdit, setIsEdit] = useState(false);

    const [companyId, setCompanyId] = useState('');


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
        getCompanyById();

    }, [isEdit, companyId]);


    const checkIsEditMode = () => {
        if (window.location.href.indexOf("edit-company") > -1) {
            setCompanyId(props.match.params.id);
            setIsEdit(true);
        }
    }

    const getCompanyById = () => {
        let token = localStorage.getItem('token');

        let configReq = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
        };

        axios.get(`${config.localApiUrl}api/companies/${companyId}`, configReq)
            .then(resp => {
                console.log(resp);
                if (resp.data) {
                    setCompany(resp.data);
                    setName(resp.data.name);
                    setDescription(resp.data.description);
                    setStatus(resp.data.status);
                    setIndustry(resp.data.industry);
                    setWebsite(resp.data.website);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }


    const formCompanyModel = () => {
        let companyDetails = {};
        if (isEdit) {
            companyDetails = {
                id: companyId,
                name: name,
                description: description,
                website: website,
                industry: industry,
                status: status,
            }
        } else {
            companyDetails = {
                name: name,
                description: description,
                website: website,
                industry: industry,
                status: status,

            }
        }
        return companyDetails;
    }


    const saveCompany = () => {
        let isCompanyValid = validateCompanyDetails();
        if (isCompanyValid) {
            const company = formCompanyModel();

            let token = localStorage.getItem('token');

            let configReq = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
            };

            if (isEdit) {
                axios.put(`${config.localApiUrl}api/companies`, company, configReq)
                    .then(resp => {
                        console.log(resp);
                        props.history.push('/companies')

                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                axios.post(`${config.localApiUrl}api/companies`, company, configReq)
                    .then(resp => {
                        console.log(resp);
                        props.history.push('/companies')

                    })
                    .catch(err => {
                        console.log(err);
                    });
            }


        }
    }


    const validateCompanyDetails = () => {
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
                    <h3>  Add a company</h3>
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
                    <FormControl  style={{
                            width: '50%'
                        }}>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            onChange={(e) => {
                                setStatus(e.target.value);
                            }}
                        >
                            <MenuItem value="Private">Private</MenuItem>
                            <MenuItem value="Public">Public</MenuItem>
                            <MenuItem value="Funded">Funded</MenuItem>
                            <MenuItem value="Sponsored">Sponsored</MenuItem>
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
                            setWebsite(e.target.value);
                        }}
                        id="outlined-multiline-static"
                        label="Website"
                        variant="outlined"
                        value={website}
                        placeholder="Website"
                    />
                </Grid>

                <br></br>
                <Grid item xs={12}>
                    <TextField
                        style={{
                            width: '100%'
                        }}
                        onChange={(e) => {
                            setIndustry(e.target.value);
                        }}
                        id="outlined-multiline-static"
                        label="Industry"
                        variant="outlined"
                        value={industry}
                        placeholder="Industry"
                    />
                </Grid>

                <br></br>

              
                <div style={{ padding: '1%', float: 'right' }}>
                    <Button variant="contained" color="primary" onClick={saveCompany}>
                        SAVE
                    </Button>
                </div>

            </Paper>
        </div>
    )
}

export default AddCompany;