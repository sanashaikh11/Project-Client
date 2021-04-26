import React, { PureComponent } from 'react';
import {NavLink} from 'react-router-dom'
export default function Navigation(){
    return(
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/newhome">Registration</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/dinos">Dinos</NavLink></li>
            </ul>
        </nav>
    )
}