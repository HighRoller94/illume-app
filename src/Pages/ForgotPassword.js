import React, { useState }from 'react'
import { motion } from 'framer-motion';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState('');

    const resetPassword = e => {
        auth
            .sendPasswordResetEmail(email)
            .catch(error => alert(error.message))
    }

    return (
        <motion.div 
            className="forgot__page"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ delay: 0.1}}
            exit={{ opacity: 0}}>
            <h2>Forgot Password</h2>
            <div className="email__field">
                <input type="text" value={email} autocomplete="off" onChange={e => setEmail(e.target.value)} placeholder="Email Address" />
            </div>
            <button type="submit" onClick={resetPassword}>Reset Password</button>
            <Link to="/login"><p>Login</p></Link>
        </motion.div>
    )
}

export default ForgotPassword