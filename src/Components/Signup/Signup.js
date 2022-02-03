import React, { useState, useEffect, useRef } from 'react';
import { db, auth, storage } from '../../firebase';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';

import './Signup.css';


function Signup() {
    const history = useHistory();
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [username, setUsername] = useState('');

    useEffect(() => {
        const unsubscribe = 

        auth
            .onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
        })

        return () => {
            unsubscribe();
        }

    }, [user, username]);

    const Signup = (e) => {
        e.preventDefault()

        auth
        .createUserWithEmailAndPassword(email, password).then((authUser) => {
                db
                    .collection("users")
                    .doc(authUser.user.uid)
                    .set ({
                        firstName: firstName,
                        lastName: lastName,
                        username: username,
                        email: email,
                        uid: authUser.user.uid,
                        })
                            return authUser.user.updateProfile({
                                displayName: username
                            })
                    })
                    .then((authUser) => {
                        history.push('/home')
                    })
                }

    return (
        <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ delay: 0.1}}
            exit={{ opacity: 0}}
            >
            <div className="stepone">
                        <form                        >
                            <div className="header_title">
                            <h1>Signup to Illume</h1>
                            <h3>It's free!</h3>
                            </div>
                            <div className="stepone_form">
                                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="John Smith" required/>
                                <div className="names">
                                    <input type="text" value={firstName} onChange={e => setfirstName(e.target.value)} placeholder="John" />
                                    <input type="text" value={lastName} onChange={e => setlastName(e.target.value)} placeholder="Smith" />
                                </div>
                                <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                                
                                <button type="submit" className="signup_button" onClick={Signup}>Create Account</button>
                    
                            </div>
                        </form>
            </div>
        </motion.div>
    )
}

export default Signup
