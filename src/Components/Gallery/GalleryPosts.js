import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { useParams } from "react-router-dom";

import GalleryPost from '../Posts/Gallery/GalleryPost';

function GalleryPosts() {
    const [galleryposts, setGalleryPosts] = useState([]);
    const { uid } = useParams();

    useEffect(() => {
        const unsubscribe = 
        db
            .collection('users')
            .doc(uid)
            .collection('Gallery Posts')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setGalleryPosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    gallerypost: doc.data()
            })));
        })
        return () => {
            unsubscribe();
        }
    }, [uid]);

    return (
            
                <div className="galleryposts">
                    {
                    galleryposts.map(({ id, gallerypost }) => (
                        <GalleryPost 
                            key = { id } 
                            galleryPostId = { id } 
                            usernameuid = { gallerypost.usernameuid } 
                            imageUrl = { gallerypost.imageUrl } 
                            media = { gallerypost.media }
                            />
                        ))
                    }
                </div>
            
    )
}

export default GalleryPosts
