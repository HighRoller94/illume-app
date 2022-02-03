import React, { useState, useEffect } from 'react'
import { useStateValue } from '../../StateProvider';
import { useParams, Link } from 'react-router-dom'
import { db } from '../../firebase'


import UploadGalleryPost from '../Upload/UploadGalleryPost/UploadGalleryPost';
import { motion } from 'framer-motion';

import GalleryPosts from '../Posts/GalleryPosts';


import './Gallery.css'

function Gallery() {
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
            <div className="upload_gallerypost">
                {uid !== user.uid ? (
                    <Link to={`/profile/${uid}`} >
                        <img className="gallery_avatar" src={profileimage} />
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
