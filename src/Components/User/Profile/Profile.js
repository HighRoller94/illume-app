import React from 'react';

import { motion } from 'framer-motion';
import { useStateValue } from '../../../StateProvider';
import { useParams } from 'react-router-dom'

import LatestGallery from '../LatestGallery/LatestGallery';
import Bio from '../Bio/Bio';
import UploadPost from '../../Upload/UploadPost/UploadPost';
import ProfilePosts from '../ProfilePosts/ProfilePosts';
import Followers from '../Followers/Followers';
import Following from '../Following/Following';

import './Profile.css';


function Profile() {
    const { uid } = useParams();
    const [{ user } ] = useStateValue();

    return (
        <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            >
            <div className="profile_row">
                <div className="left_profile">
                    <Bio />
                </div>
                <div className="center_profile">
                    <div>
                        {uid !== user.uid ? (
                            <LatestGallery />
                        ) : (
                            <UploadPost />
                        )}
                    
                    </div>
                    <div className="profile_posts">
                    <ProfilePosts />
                    </div>
                </div>
                <div className="rightCol_profile">
                    <Followers />
                    <Following />
                </div>
            </div>
        </motion.div>
    )
}

export default Profile
