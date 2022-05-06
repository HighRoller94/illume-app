import React, { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion';
import { useStateValue } from '../StateProvider';
import * as queryString from 'query-string';

import UserPosts from '../Components/Profile/UserPosts/UserPosts';
import FacebookPost from '../Components/Dashboard/Facebook/FacebookPost/FacebookPost';
import SideBar from '../Components/Layout/LeftSidebar/SideBar';

import Instagram from '../Components/Dashboard/Instagram/Instagram';
import Calendar from '../Components/Dashboard/MiniCalendar/MiniCalendar';
import UploadPost from '../Components/Home/UploadPost';

import logo from '../Assets/Images/logo.png'
import fblogo from '../Assets/Images/fblogo.png'
import instalogo from '../Assets/Images/instalogo.png'

function Dashboard() {
    const [{ user }] = useStateValue();

    return (
        <motion.div
            className="dashboard"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            >
                <div className="sidebar">
                    <SideBar />
                </div>
                <div className="illume_col">
                    <div className="illumelogo">
                        <img src={logo} alt="Illume Logo" />
                        <UploadPost />
                    </div>
                    <UserPosts />
                </div>
                <div className="social">
                    <div className="social_login">
                        <button className="sociallogin_button" disabled>Log in to Facebook</button>
                    </div>  
                        <div className="social_container">
                            <div className="facebook_col">
                                <div className="fblogo">
                                    <img src={fblogo} />
                                </div>
                                <FacebookPost />
                            </div>
                            <div className="insta_col">
                                <div className="instalogo">
                                    <img className="instalogo" src={instalogo} />
                                </div>
                                <Instagram  />
                            </div>
                        </div>
                    </div>
                    <div className="widgets">
                        <Calendar />
                    </div>
        </motion.div>
    )
}

export default Dashboard