import React, { useState } from "react";
import axios from 'axios';
import decode from 'jwt-decode';
import { useHistory } from "react-router";


export const RegistrationForm = props => {
    const [state , setState] = useState({
        firstName: "",
        lastName: "",
        email : "",
        password : ""
    });

    const history = useHistory();

    const {firstName, lastName, email, password } = state;

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = async (e) => {
        e.preventDefault();

        if(state.password === state.confirmPassword) {
            console.log("You are logged in");   
            let config = {
                headers: {
                  'Content-Type': 'application/json',
                },
              };
    
              let data = {
                name: firstName + " " + lastName,
                email: email,
                password: password,
              };
    
              try {
                const response = await axios.post(
                  'https://answernow-server.herokuapp.com/api/users',
                  data,
                  config
                );

                history.push('/login');
                // localStorage.setItem('token', response.data.token);
                console.log(response);
                // let decodeduser = decode(response.data.token);
                // console.log(decodeduser);
              } catch (e) {

                if(e)
                {
                    window.alert("Email is already used. Try with new email");
                }
              }
        } else {
            console.log(state.password);
            console.log(state.confirmPassword);
            console.log('Passwords do not match');
        }
    }

    return (
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
            <div className="form-group text-left">
                <label htmlFor="firstName">First Name</label>
                <input type="text" 
                       className="form-control" 
                       id="firstName" 
                       placeholder="Enter your First Name"
                       onChange={handleChange}
                />
                </div>

                <div className="form-group text-left">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" 
                       className="form-control" 
                       id="lastName" 
                       placeholder="Enter your Last Name"
                       onChange={handleChange}
                />
                </div>
                
                <div className="form-group text-left">
                <label htmlFor="email">Email ID</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailNote" 
                       placeholder="Enter email"
                       onChange={handleChange}
                />
                <small id="emailNote" className="form-text text-muted">Your email is safe with us</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="password">Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        aria-describedby="passwordNote"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                    />
                    <small id="passwordNote" className="form-text text-muted">Password is encrypted</small>
                </div>
                
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Register
                </button>
               
            </form>
        </div>
    )
}



export default RegistrationForm

