import React, { Component,useState,useEffect } from "react";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import ViewDayIcon from '@material-ui/icons/ViewDay';
import DeleteIcon from '@material-ui/icons/Delete';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import config from "../config";
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';





const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    section1: {
        margin: theme.spacing(3, 2),
    },
    section2: {
        margin: theme.spacing(2),
    },
    section3: {
        margin: theme.spacing(3, 1, 1),
    },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
    anchorOrigin: { vertical: "bottom", horizontal: "center" },
    transformOrigin: { vertical: "top", horizontal: "center" },
};



class AddTag extends Component {

    state = {
      

        tag: {}
    }


    formTagModel = () => {
        let  tagDetails = {};
        if(this.state.isEdit) {
            tagDetails = {
                tag: this.state.tag,
                user: "60771fac598e8f61742a9da3",
            }
        } else {
            tagDetails = {
                tag: this.state.tag,
                user: "60771fac598e8f61742a9da3",
            }
        }
       
        return tagDetails;
    }
    saveTag = () => {
        let isTagValid = this.validateTagDetails();
        if (isTagValid) {
            const tag = this.formTagModel();

            let token = localStorage.getItem('token');

            let configReq = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
            };

            if(this.state.isEdit) {
                axios.put(`${config.localApiUrl}api/tags`, tag)
                .then(resp => {
                    console.log(resp);
                    this.props.history.push('/tag')

                })
                .catch(err => {
                    console.log(err);
                });
            } else {
                axios.post(`${config.localApiUrl}api/tags`, tag)
                .then(resp => {
                    console.log(resp);
                    this.props.history.push('/tag')

                })
                .catch(err => {
                    console.log(err);
                });
            }

            
        }
    }


    validateTagDetails = () => {
        let isDataValid = true;
        if (!this.state.tag) {
            isDataValid = false;
            this.setState({
                showTitleErrorMessage: true,
                titleHelperText: 'Please enter title'
            })
        }
       
        if (!isDataValid) {
            return false;
        }

        return true;
    }

    


   



    render() {
        return (
            <div style={{ margin: '0 10%' }}>
                <Paper elevation={3} style={{ padding: '0.5%', paddingBottom: '10%', margin: '2%' }}>
                    <div style={{ padding: '1%', float: 'left' }}>
                        <h3>Enter a tag</h3>
                        <hr />
                    </div>

                    <Grid item xs={12} style={{ clear: 'both' }}>
                        <TextField
                            error={this.state.showTitleErrorMessage}
                            style={{
                                width: '100%'
                            }}
                            onChange={(e) => {
                                this.setState({
                                    tag: e.target.value,
                                    showTitleErrorMessage: false,
                                    titleHelperText: ''
                                });
                            }}
                            id="outlined-multiline-static"
                            label="Tag"
                            variant="outlined"
                            value={this.state.tag}
                            helperText={this.state.titleHelperText}
                            placeholder="Be specific and imagine you’re asking a question to another person"
                        />
                    </Grid>
                    <br></br>

                    
                    <br></br>
                    <div style={{ padding: '1%', float: 'right' }}>
                        <Button variant="contained" color="primary" onClick={this.saveTag}>
                            SAVE
                    </Button>
                    </div>

                </Paper>
            </div>
        )
    }
}

export default AddTag;