import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { query, onSnapshot, collectionGroup, orderBy } from 'firebase/firestore';

import Post from '../Posts/Post/Post';

function IllumeGalleryPosts() {
    const [illumeGalleryPosts, setIllumeGalleryPosts] = useState([]);

    useEffect(() => {
        const getGalleryPosts = async () => {
            const galleryPosts = collectionGroup(db, "Gallery Posts");
            const q = query(galleryPosts, orderBy("timestamp", "desc"));

            const unsub = await onSnapshot(q, (snapshot) => 
                setIllumeGalleryPosts(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    post: doc.data()
                }))))

            return unsub;
        }

        getGalleryPosts();
    }, []);

    return (
        <div className="illume__GalleryPosts">
            {illumeGalleryPosts?.map(({id, post}) => (
                <Post
                    key={id} 
                    postId={id}
                    timestamp={post.timestamp} 
                    usernameuid={post.usernameuid} 
                    username={post.username} 
                    body={post.body} 
                    imageUrl={post.imageUrl} 
                    media={post.media}
                />
            ))}
        </div>
    )
}

export default IllumeGalleryPosts