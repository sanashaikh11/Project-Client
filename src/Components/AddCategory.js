import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios';
import {useHistory} from 'react-router-dom'
const AddCategories = ()=>{

    let history = useHistory()

    const{register,handleSubmit,reset}=useForm();

    let config={
        headers:{
            'Content-Type':'application/json',
        }
    }
    const onSubmit = async data=>{
       

        let d={
            Categoryname:data.category
        }
        const result = await axios.post("https://answernow-server.herokuapp.com/api/category",d,config);

        console.log(result.data)
        if(result.status===200){
            reset();
            history.push('/category')
        }
    }

    return(
        <div  style={{margin:'50px',marginLeft:'30%',width:'30%', background:'#99ffeb'}}>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    
                    <label>Add a Category</label>
                    <br></br>
                    <input style={{width:'300px'}} type="text" {...register('category',{required:true})} className="form-control" placeholder='Category'/>
                </div>
                <div className="form-group">
                    <input type="submit"/>
                </div>
            </form>
        </div>
    )
}

export default AddCategories;