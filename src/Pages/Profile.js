import React from 'react';

import { motion } from 'framer-motion';
import { useStateValue } from '../StateProvider';
import { useParams } from 'react-router-dom'

import LatestGallery from '../Components/Profile/LatestGallery/LatestGallery';
import Bio from '../Components/Profile/Bio/Bio';
import UploadPost from '../Components/Home/UploadPost';
import UserPosts from '../Components/Profile/UserPosts/UserPosts';
import Followers from '../Components/Profile/Followers/Followers';
import Following from '../Components/Profile/Following/Following';

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
                    <UserPosts />
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
