import React, { useEffect, useState, useCallback } from 'react'
import { Link, NavLink, useLocation, useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { auth, db } from '../../firebase'
import { motion } from 'framer-motion'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import Searchbar from './Searchbar/Searchbar';

import userProfile from '../../Assets/Images/userProfile.png'

function Navbar() {
    const { pathname } = useLocation();
    const history = useHistory();
    const [profileImage, setProfileImage] = useState("");
    const [fbUserAccessToken, setFbUserAccessToken] = useState();
    const [fbPageAccessToken, setFbPageAccessToken] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    const [basketcount, setBasketCount] = useState('');
    // Current logged in 
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

        <div className="navbar">
            <div className="navbar_container">
                <div className="nav_left">
                    <div className="logo">
                        <NavLink to='/home' >
                            <h1 className="navbar_logo">illume</h1>
                        </NavLink>
                    </div>
                    <Searchbar />
                </div>
                <motion.div className="nav_right" layout>
                    <div className={pathname === "/home" ? "active__option": "inactive__option"} component={Link} to="/home">
                        <NavLink to="/home" ><span>Home</span></NavLink>
                    </div>
                    <div className={pathname === "/jobs" ? "active__option": "inactive__option"} component={Link} to="/jobs">
                        <NavLink to="/jobs" ><span>Jobs</span></NavLink>
                    </div>
                    <div className={pathname === `/gallery/${user.uid}` ? "active__option": "inactive__option"} component={Link} to={`/gallery/${user.uid}`}>
                        <NavLink to={`/gallery/${user.uid}`} ><span>Gallery</span></NavLink>
                    </div>
                    <div className={pathname === `/store/${user.uid}` ? "active__option": "inactive__option"} component={Link} to={`/store/${user.uid}`}>
                        <NavLink to={`/store/${user.uid}`} ><span>Store</span></NavLink>
                    </div>
                    <div className={pathname === `/profile/${user.uid}` ? "active__option": "inactive__option"} component={Link} to={`/profile/${user.uid}`}>
                        <NavLink to={`/profile/${user.uid}`} ><span>Profile</span></NavLink>
                    </div>
                    <div component={Link} to="/checkout">
                        {basket.length > 0 ? ( 
                        <NavLink to='/checkout'>
                            <motion.div 
                                initial={{ scale: 1.2, opacity: 1, duration: 1.5 }}
                                transition={{ delay: 0.5 }}
                                animate={{ scale: 1, opacity: 0.5 }}
                                className="navbar_optionBasket"><ShoppingBasketIcon />
                                <span className="navbar_basketCount">{basket?.length}</span>
                            </motion.div>
                        </NavLink> 
                    ) : (null)}
                    </div>
                    {profileImage ? (
                        <Avatar className="nav_avatar" onClick={handleClick} src={profileImage} />
                    ) : (
                        <Avatar className="nav_avatar" onClick={handleClick} src={userProfile} />
                    )}
                    
                    <Menu
                        className="nav__menu"
                        anchorEl={anchorEl}
                        keepMounted
                        disableScrollLock={false}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem className="menu__item"onClick={handleClose}>Account</MenuItem>
                        <MenuItem className="menu__item"onClick={() => {handleAuthentication(); fbLogOut();}}>Logout</MenuItem>
                    </Menu>
                </motion.div>
            </div>
        </div>
    )
}

export default Navbar
