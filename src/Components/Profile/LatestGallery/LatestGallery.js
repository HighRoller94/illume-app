import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import LatestGalleryThumbs from './LatestGalleryThumbs/LatestGalleryThumbs';

function LatestGallery() {
    const [latestgalleryposts, setLatestGalleryPosts] = useState([]);
    const { uid } = useParams();

    useEffect(() => {
        const unsubscribe = 
        db
            .collection('users')
            .doc(uid)
            .collection('Gallery Posts')
            .limit(3)
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setLatestGalleryPosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    latestgallerypost: doc.data()
            })));
        })

        return () => {
            unsubscribe();
        }
        
    }, [uid]);

    return (
        <motion.div 
        className="latestgalposts"
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        >
            <h4>Latest Gallery Posts</h4>
            <div className="latestgalthumbs">
                {latestgalleryposts.map(({ id, latestgallerypost }) => (
                    <LatestGalleryThumbs 
                        key = { id }
                        galleryPostId = { id }
                        usernameuid = { latestgallerypost.usernameuid }
                        username = { latestgallerypost.username }
                        body = { latestgallerypost.body }
                        imageUrl = { latestgallerypost.imageUrl }
                        />
                ))}
            </div>
        </motion.div>
    )
}

export default LatestGallery
