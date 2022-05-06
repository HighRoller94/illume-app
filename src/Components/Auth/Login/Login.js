import React, { useEffect, useState } from 'react';
import { auth } from '../../../firebase';
import { Link, useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

function Login({ buttontext }) {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passType, setPassType] = useState(false);

    // Logs user into app using firebase auth then redirects to home page

    const Login = e => {
        e.preventDefault()
        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                history.push('/home')
            })
            .catch(error => alert(error.message))
    }   
    
    const toggleVisibility = () => {
        setPassType(!passType)
    }

    useEffect(() => {
        const passwordInput = document.getElementById("password");
        if (passType === true) {
            passwordInput.type = "text";
        } else if (passType === false) {
            passwordInput.type = "password";
        }
    })
    
    return (
        <motion.div 
            className="login"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ delay: 0.1}}
            exit={{ opacity: 0}}>
            <h1>illume</h1>
            <div class="email__field">
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" />
            </div>
            <div className="password__field">
                <input type="password" className="input__password" id="password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
                {passType ? (
                    <VisibilityIcon className="visibility__icon" onClick={toggleVisibility} />
                ) : (
                    <VisibilityOffIcon className="visibility__icon" onClick={toggleVisibility} />
                )}
            </div>
            <button type="submit" onClick={Login}>Login</button>
            <div className="login_text">
                <p>Forgot your password?</p>
                <p>{buttontext}</p>
            </div>
        </motion.div>
    )
}

export default Login