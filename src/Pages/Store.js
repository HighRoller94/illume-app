import React, { useState, useEffect } from 'react';
import { useStateValue } from '../StateProvider';
import { useParams, Link } from "react-router-dom";
import { db } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';

import UploadStorePost from '../Components/Modals/StorePostModal/UploadStorePostModal';
import { motion } from 'framer-motion';

import StorePosts from '../Components/Store/StorePosts';

function Store() {
    const { uid } = useParams();
    const [{ user } ] = useStateValue();
    const [profileImage, setProfileImage] = useState("")

    useEffect(() => {
        if (uid) {
            const userRef = doc(db, 'users', `${uid}`);
            const unsub = getDoc(userRef)
            .then((doc) => {
                setProfileImage(doc.data().profileImage)
                }
            )
            return unsub;
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
                        <img className="store_avatar" src={profileImage} />
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
