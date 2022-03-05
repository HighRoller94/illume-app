import React, { useState } from 'react';
import { auth } from '../../firebase';
import { Link, useHistory } from 'react-router-dom'


import illumeLogo from '../../Images/illumeLogo.svg'

import './Login.css';

function Login({ buttontext }) {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const Login = e => {
        e.preventDefault()

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                history.push('/home')
            })
            .catch(error => alert(error.message))
    }   

    return (
            <div>
                    <div className="login">
                        
                            <Link to='/illume'>
                                <img className="login_logo" src={illumeLogo} alt="Illume" />
                            </Link>
                            <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" />
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="*******" />
                            <button type="submit" onClick={Login} className="login_button">Login</button>
                            <div className="login_text">
                                <p>Forgot your password?</p>
                                <p>{buttontext}</p>
                            </div>
                    </div>
                
            </div>
    )
}

export default Login
