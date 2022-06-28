import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from '../../../firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
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

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((authUser) => {
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
                        navigate('/home')
                    })
                }

    return (
        <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ delay: 0.1}}
            exit={{ opacity: 0}}
            >
            <form className="signup">
                <div className="header__title">
                <h1>Signup to Illume</h1>
                <h3>It's free!</h3>
                </div>
                <div className="sign-up__Form">
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required/>
                    <div className="sign-up__Names">
                        <input type="text" value={firstName} onChange={e => setfirstName(e.target.value)} placeholder="First Name" />
                        <input type="text" value={lastName} onChange={e => setlastName(e.target.value)} placeholder="Last Name" />
                    </div>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
                    <div className="password__field">
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                    </div>
                    
                    <button type="submit" className="signup__btn" onClick={Signup}>Create Account</button>
                </div>
            </form>
        </motion.div>
    )
}

export default Signup
