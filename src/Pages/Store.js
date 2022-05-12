import React, { useState, useEffect } from 'react';
import { useStateValue } from '../StateProvider';
import { db } from '../firebase';
import { useParams, Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { Avatar } from '@material-ui/core';

import StorePosts from '../Components/Store/StorePosts';
import UploadStorePost from '../Components/Modals/StorePostModal/UploadStorePostModal';

function Store() {

    const { uid } = useParams();
    const [{ user } ] = useStateValue();
    const [profileimage, setProfileImage] = useState("")

    useEffect(() => {
        if (uid) {
            db
                .collection('users')
                .doc(uid)
                .onSnapshot((snapshot) => 
                    setProfileImage(snapshot.data().profileImage))
        }
    }, [uid])

    return (
        <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            >
            <div className="upload_storepost">
                {uid !== user.uid ? (
                    <Link to={`/profile/${uid}`} >
                        <img className="store_avatar" src={profileimage} />
                    </Link>
                ) : (
                    <UploadStorePost username={user.displayName} usernameuid={user.uid}/>
                )}
            </div>
            <div className="store_row">
                <div className="store_posts">
                    <StorePosts />
                </div>
            </div>
        </motion.div>
    )
}

export default Store
