import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { useParams } from "react-router-dom";
import { query, onSnapshot, collection, orderBy, limit } from 'firebase/firestore';

import LatestGalleryThumbs from './LatestGalleryThumbs/LatestGalleryThumbs';

function LatestGallery() {
    const [latestGalleryPosts, setLatestGalleryPosts] = useState([]);
    const { uid } = useParams();

    useEffect(() => {
        const getLatestGalleryPosts = async () => {
            const latestGalleryPostsRef = collection(db, "users", `${uid}`, 'Gallery Posts')
            const q = query(latestGalleryPostsRef, orderBy("timestamp", "desc"), limit(3))
            const unsub = onSnapshot(q, (snapshot) => 
                setLatestGalleryPosts(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    post: doc.data()
                }))))
            return unsub;
        }
        
        getLatestGalleryPosts();
    }, [uid]);

    return (
        <div>
            {latestGalleryPosts.length > 1 ? (
                <div>
                    <h4>Latest Gallery Posts</h4>
                    <div className="latestgalthumbs">
                    {latestGalleryPosts.map(({ id, post }) => (
                        <LatestGalleryThumbs 
                            key = { id }
                            galleryPostId = { id }
                            usernameuid = { post.usernameuid }
                            username = { post.username }
                            body = { post.body }
                            imageUrl = { post.imageUrl }
                        />
                    ))}
                    </div>
                </div>
            ) : (
                null
            )} 
            
        </div>
    )
}

export default LatestGallery
