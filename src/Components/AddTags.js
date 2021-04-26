import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios';
import {useHistory} from 'react-router-dom'
const AddTags = ()=>{

    let history = useHistory()

    const{register,handleSubmit,reset}=useForm();

    let config={
        headers:{
            'Content-Type':'application/json',
        }
    }
    const onSubmit = async data=>{
       

        let d={
            tag:data.tag
        }
        const result = await axios.post("https://answernow-server.herokuapp.com/api/tags",d,config);

        console.log(result.data)
        if(result.status===200){
            reset();
            history.push('/tag')
        }
    }

    return(
        <div>
            <h3 style={{textAlign :'center',margin:'30px'}}>Add Tags</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                 <div  style={{ marginLeft:'330px',border:'1px solid black',width:'50%', backgroundColor:'gray',textAlign:'center' }}>
                    <input type="text" {...register('tag',{required:true})} className="form-control"/>
                </div>
                </div>
                <div className="form-group">
                    <input style={{ marginLeft:'640px'}} type="submit"/>
                </div>
            </form>
        </div>
    )
}

export default AddTags;