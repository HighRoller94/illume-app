import React, { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';
import { useStateValue } from '../../StateProvider';
import { useInitFbSDK } from "../../Functions/Facebook";
import * as queryString from 'query-string';

import UserPosts from '../User/UserPosts/UserPosts';
import FacebookPost from '../Facebook/Facebook/Facebook';
import SideBar from '../Home/SideBar/SideBar';

import Instagram from '../Facebook/Instagram/Instagram';
import Calendar from '../MiniCalendar/MiniCalendar';
import UploadPost from '../Upload/UploadPost/UploadPost';

import logo from '../../Images/logo.png'
import fblogo from '../../Images/fblogo.png'
import instalogo from '../../Images/instalogo.png'

import './Dashboard.css'

function Dashboard() {
    const [{ user }] = useStateValue();
    const [fbUserAccessToken, setFbUserAccessToken] = useState();
    const [fbPageAccessToken, setFbPageAccessToken] = useState();
    const isFbSDKInitialized = useInitFbSDK();
    const PAGE_ID = "109484964743311";

    const logInToFB = useCallback(() => {
        window.FB.login((response) => {
            if (fbUserAccessToken) {
                setFbUserAccessToken(response.authResponse.accessToken); 
            }
        },
        {
            scope: "instagram_basic, pages_show_list, pages_manage_posts",
        });
    }, []);

    useEffect(async () => {
        if (isFbSDKInitialized) {
            window.FB.getLoginStatus((response) => {
                setFbUserAccessToken(response.authResponse?.accessToken);
            });
        }
    }, [isFbSDKInitialized]);

    useEffect(async () => {
        if (fbUserAccessToken) {
            window.FB.api(
                `/${PAGE_ID}?fields=access_token&access_token=${fbUserAccessToken}`,
                ({ access_token }) => setFbPageAccessToken(access_token)
            );
        }
    }, [fbUserAccessToken]);
    
    const code = new URLSearchParams(window.location.search).get('code')
    
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
                        {!fbUserAccessToken ? (
                            <button onClick={logInToFB} className="sociallogin_button" disabled>Log in to Facebook</button>
                        ) : (null)}
                    </div>
                    {fbUserAccessToken ? (
                        <div className="social_container">
                            <div className="facebook_col">
                                <div className="fblogo">
                                    <img src={fblogo} />
                                </div>
                                <FacebookPost fbPageAccessToken={fbPageAccessToken} fbUserAccessToken={fbUserAccessToken} page_id={PAGE_ID} />
                            </div>
                            <div className="insta_col">
                                <div className="instalogo">
                                    <img className="instalogo" src={instalogo} />
                                </div>
                                <Instagram fbUserAccessToken={fbUserAccessToken} />
                            </div>
                        </div>
                        ) : (
                            null
                        )}
                    </div>
                    <div className="widgets">
                        <Calendar />
                    </div>
        </motion.div>
    )
}

export default Dashboard