import React, { useState } from 'react';
import axios from 'axios';
import decode from 'jwt-decode';
import './App.css'
import { useHistory } from "react-router";

export const Login = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleLogin =  async (e)=> {
      e.preventDefault();  
          let config = {
              headers: {
                'Content-Type': 'application/json',
              },
            };
  
            let data = {
              email: username,
              password: password,//
            };
  
            try {
              const response = await axios.post(
                'https://answernow-server.herokuapp.com/api/auth',
                data,
                config
              );
              localStorage.setItem('token', response.data.token);
              console.log(response);
              let decodeduser = decode(response.data.token);
              console.log(decodeduser);
              history.push('/question');
            } catch (e) {
              if(e)
              {
                  window.alert("Invalid Credentials");
              }
            }
       
  }

  return (
      <div className="mainlogin">
            <div className="headerlogin">
            <h3>Login</h3>
        </div>

    <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
      
<form >
            <div className="form-group text-left">
                <label htmlFor="UserName">User Name</label>
                <input type="email" 
                       className="form-control" 
                       id="UName" 
                       value = { username }
                       placeholder="UserName(email)" required
                       onChange={e => setUsername(e.target.value)}
                />
                </div>

                <div className="form-group text-left">
                <label htmlFor="lastName">Password</label>
                <input type="text" 
                       className="form-control" 
                       id="password" 
                       value={password}
                       placeholder="Password" required
                       onChange={e => setPassword(e.target.value)} />
            
                </div>
                <input type="button" value={loading ? "loading.." : "Login"} disabled={loading} onClick={handleLogin} />
   


</form>
     
    </div>
    <br/>
    <p>Forgot your password? <a href="/ForgotPassword">Click here!</a> </p>
    </div>

  )
}

export default Login;
