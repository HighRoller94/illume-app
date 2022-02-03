import React from 'react';
import { Link } from 'react-router-dom';

import illumeLogo from '../../../Images/illumeLogo.svg'

import './LandingNav.css'

function Navbar() {
    return (
        <div className="landingnav">
                <div className="landing_container">
                    <Link to='/'>
                        <img className="nav_logo" src={illumeLogo} alt="" />
                    </Link>
                    <ul className="landingnav_left">
                        <Link to='/illume'>
                            <span className="landing_leftop">Home</span>
                        </Link>
                        <Link to='/about'>
                            <span className="landing_leftop">About</span>
                        </Link>
                    </ul>
                    <ul className="landingnav_right">
                        <Link to='/login'>
                            <span className="landing_rightop">Login</span>
                        </Link>
                        <Link to='/login'>
                            <button className="signup-cta">Sign Up</button>
                        </Link>
                    </ul>
                </div>
        </div>
    )
}

export default Navbar
