import React, { useEffect, useState, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { auth, db } from '../../firebase'
import { motion } from 'framer-motion'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import MenuIcon from '@material-ui/icons/Menu';
import userProfile from '../../Images/userProfile.png'
import { useInitFbSDK } from "../../Functions/Facebook";


import './Navbar.css'
import menu from '../../Images/menu.svg'

import Searchbar from '../Searchbar/Searchbar';
import illumeLogo from '../../Images/illumeLogo.svg'

function Navbar() {
    const history = useHistory();
    const [profileImage, setProfileImage] = useState("");
    const [fbUserAccessToken, setFbUserAccessToken] = useState();
    const [fbPageAccessToken, setFbPageAccessToken] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    const isFbSDKInitialized = useInitFbSDK();
    const [basketcount, setBasketCount] = useState('');
    // current logged in 
    const [{ user, basket }] = useStateValue();
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAuthentication = () => {
        auth.signOut()
        .then(auth => {
            history.push('/login')
        })
    }
    
    const fbLogOut = useCallback(() => {
        if (fbUserAccessToken) {
            window.FB.logout(() => {
                setFbUserAccessToken(null);
                setFbPageAccessToken(null);
                });
        }
    }, []);

    useEffect(() => {
        db
            .collection('users')
            .doc(user.uid)
            .collection("Basket")
            .get()
            .then(snapshot => 
                setBasketCount(snapshot.size));
    }, [basketcount])

    useEffect(() => {
            db
                .collection('users')
                .doc(user.uid)
                .onSnapshot((snapshot) => 
                    setProfileImage(snapshot.data().profileImage))
    }, [])

    return (

        <div>
            <div className="navbar">
                    <div className="logo">
                        <Link to='/dashboard' >
                            <img className="navbar_logo" src={illumeLogo} alt="" />
                        </Link>
                    </div>
                    <Searchbar />
                    <motion.div className="nav_right" layout>
                        <Link to="/jobs" ><span className="navbar_option">Jobs</span></Link>
                        <Link to="/home" ><span className="navbar_option">Home</span></Link>
                        <Link to={`/gallery/${user.uid}`} ><span className="navbar_option">Gallery</span></Link>
                        <Link to={`/store/${user.uid}`} ><span className="navbar_option">Store</span></Link>
                        <Link to={`/profile/${user.uid}`} ><span className="navbar_option">Profile</span></Link>
                        {basket.length > 0 ? ( 
                            <Link to='/checkout'>
                                <motion.div 
                                    initial={{ scale: 1.2, opacity: 1, duration: 1.5 }}
                                    transition={{ delay: 0.5 }}
                                    animate={{ scale: 1, opacity: 0.5 }}
                                    className="navbar_optionBasket"><ShoppingBasketIcon />
                                    <span className="navbar_basketCount">{basket?.length}</span>
                                </motion.div>
                            </Link> 
                        ) : (null)}
                        {profileImage ? (
                            <Avatar className="nav_avatar" onClick={handleClick} src={profileImage} />
                        ) : (
                            <Avatar className="nav_avatar" onClick={handleClick} src={userProfile} />
                        )}
                        
                        <Menu
                            id="simple-menu"
                            className="nav_menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Account</MenuItem>
                            <MenuItem onClick={() => {handleAuthentication(); fbLogOut();}}>Logout</MenuItem>
                        </Menu>
                </motion.div>
            </div>
        </div>
    )
}

export default Navbar
