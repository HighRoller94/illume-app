import React, { useState, useEffect } from 'react';
import { db } from '../firebase';

import { motion } from 'framer-motion';
import { useStateValue } from '../StateProvider';
import { useParams } from "react-router-dom";
import { doc, getDoc } from 'firebase/firestore';

import LatestGallery from '../Components/Profile/LatestGallery/LatestGallery';
import Bio from '../Components/Profile/Bio/Bio';
import UploadPost from '../Components/Home/UploadPost';
import UserPosts from '../Components/Profile/UserPosts/UserPosts';
import Followers from '../Components/Profile/Followers/Followers';
import Following from '../Components/Profile/Following/Following';

function Profile() {
    const { uid } = useParams();
    const [{ user } ] = useStateValue();
    const [userData, setUserData] = useState('');

    useEffect(() => {
        const getUserData = async () => {
            const userRef =  doc(db, "users", `${uid}`)
            const unsub = await getDoc(userRef)
                .then((doc) => {
                    setUserData(doc.data())
                })
            return unsub;
        }
        getUserData();
    }, [uid])

    return (
        <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            >
            <div className="profile_row">
                <div className="left_profile">
                    <Bio userData={userData} />
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
