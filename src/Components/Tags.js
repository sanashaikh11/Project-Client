import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';


export default function Tags(){

    const[tags,SetTags]=useState([])

    let configS={
        headers:{
            'Content-Type':'application/json',
        }
    }
    useEffect(()=>{
        fetch("https://answernow-server.herokuapp.com/api/tags",configS)
        .then(response=>response.json()
        .then(data=>{
            SetTags(data)
            console.log(data)
        }))
    },[])


    const deleteTag=async(index)=>{
        console.log(index)
        var d = Object.assign([],tags)
        d.splice(index,1)
        SetTags(d)

        console.log(d[index]._id)
        const tagID = d[index]._id
        const result = await axios.delete("https://answernow-server.herokuapp.com/api/tags/"+ d[index]._id,configS)

        console.log(result.status)

    }
    return(


        <div style={{ width: '100%' }}>
                <div style={{ margin: '1%', float: 'left', width: '20%' }}>
                    <Paper elevation={3} style={{ padding: '0.5%', margin: '2%', }}>
                        
                    </Paper>
                </div>
                <div style={{ margin: '0 1%', float: 'right', width: '75%' }}>
                    <Paper elevation={3} style={{ padding: '0.5%', margin: '2%' }}>
                        <div style={{ padding: '1%', float: 'right' }}>
                            <Button variant="contained" color="primary" component={Link}
                                to={`${process.env.PUBLIC_URL}/add-tag`}>
                                Add Tag
                    </Button>
                        </div>

                     


                        <div style={{ padding: '3%', paddingTop: '0', clear: 'both' }}>
                           
                            <hr />
                        </div>
                    </Paper>
                    <div className="row p-5" >
                        
                                {
                                    tags.map((tag,index)=>(
                                    <p key={index}>{tag.tag}<button className="btn text-danger" id={tag._id} value={index} onClick={deleteTag.bind(this,index)}>X</button></p>
                                    ))
                                }
                                </div>
                            ))
                        }
                    </div>





        {/* <div className="row p-5" >
        <div  className="col-md-2 p-2">
            {
                tags.map((tag,index)=>(
                <p key={index}>{tag.tag}<button className="btn text-danger" id={tag._id} value={index} onClick={deleteTag.bind(this,index)}>X</button></p>
                ))
            }
            </div>
        </div> */}

        ))
                        }
                    </div>
                
           
        )
    }




