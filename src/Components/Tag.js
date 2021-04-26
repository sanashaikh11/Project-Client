import React, { Component } from "react";
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
import config from "../config";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';





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

class Question extends Component {

    state = {
        tags: [],
        users: [],
        isMyQuestions: false,
    }

    componentDidMount() {
       this.getUsers();
        this.init();
    }


    init = () => {
        let token = localStorage.getItem('token');

        let configReq = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
        };
        axios.get(`${config.localApiUrl}api/tags`)
            .then(resp => {
                if (resp.status != 200) {
                    console.log(resp);
                } else {
                    this.setState({
                        tags: resp.data
                    }, () => {
                        console.log(this.state.tags);
                    })
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    getQuestionsByUserId = () => {
        this.setState({
            isMyQuestions: true
        })
        let token = localStorage.getItem('token');

        let configReq = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
        };
        axios.get(`${config.localApiUrl}api/questions/user/60771fac598e8f61742a9da3`)
            .then(resp => {
                if (resp.status != 200) {
                    console.log(resp);
                } else {
                    this.setState({
                        tags: resp.data
                    }, () => {
                        console.log(this.state.tags);
                    })
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    getUsers = () => {
        let token = localStorage.getItem('token');

        let configReq = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
        };
        axios.get(`${config.localApiUrl}api/users`)
            .then(resp => {
                if (resp.status != 200) {
                    console.log(resp);
                } else {
                    this.setState({
                        users: resp.data
                    }, () => {
                        console.log(this.state.tags);
                    })
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
   
    deleteTag=async(event)=>{
        let configS={
            headers:{
                'Content-Type':'application/json',
            }
        }
        var index = event.target.value
        
        const result = await axios.delete('https://answernow-server.herokuapp.com/api/tags/'+event.target.id,configS)

    }
    render() {
     
        return (
            <div style={{ width: '100%' }}>
                <div style={{ margin: '1%', float: 'left', width: '20%' }}>
                    <div  elevation={3} style={{ padding: '0.5%', margin: '2%', }}>
                        <div style={{ backgroundColor: '#ff8300',padding: '1%', margin: '1%' }}>
                            <br/>
                            <p style={{ cursor: 'pointer' }} onClick={this.init}><b>All Tags</b></p>
                           
                           
                        </div>
                    </div>
                </div>
                <div style={{ margin: '0 1%', float: 'right', width: '75%' }}>
                    <Paper elevation={4} style={{ padding: '0.5%', margin: '2%', backgroundColor: '#ff8300' }}>
                        <div style={{ padding: '1%', float: 'right'}}>
                            <Button variant="contained" color="black" width='50px' component={Link}
                                to={`${process.env.PUBLIC_URL}/add-tag`}>
                                Add Tag
                    </Button>
                        </div>

                     


                        <div style={{ padding: '3%', paddingTop: '0', clear: 'both' }}>
                            <h5>  {this.state.tags.length} Total Tags</h5>
                            <hr />
                        </div>
                    </Paper>

                    <div className="row p-5" >
                        {
                            this.state.tags.map((q,index) => (
                                
                                <div className="col-md-2 p-2" >    
                                <div  style={{ border:'4px solid black', backgroundColor:'gray',textAlign:'center' }}>  
                                   <b>{q.tag} <button className="btn text-danger" value={index} id={q._id} onClick={this.deleteTag}>X</button></b>
                                </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Question;
