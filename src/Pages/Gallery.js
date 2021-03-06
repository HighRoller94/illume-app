import React, { useState, useEffect } from 'react';
import { useStateValue } from '../StateProvider';
import { useParams, Link } from "react-router-dom";
import { db } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';

import UploadGalleryPost from '../Components/Gallery/UploadGalleryPost';
import { motion } from 'framer-motion';

import GalleryPosts from '../Components/Gallery/GalleryPosts';

function Gallery() {
    const { uid } = useParams();
    const [{ user } ] = useStateValue();
    const [profileImage, setProfileImage] = useState()
    
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
            <div className="upload_gallerypost">
                {uid !== user.uid ? (
                    <Link to={`/profile/${uid}`} >
                        <img className="gallery_avatar" src={profileImage} />
                    </Link>
                ) : (
                    <UploadGalleryPost username={user.displayName} usernameuid={user.uid}/>
                )}
            </div>
            <div className="gallery_row">
                <GalleryPosts/>
            </div>
        </motion.div>
    )
}

export default Gallery
