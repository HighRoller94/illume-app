import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { useParams } from "react-router-dom";
import { query, onSnapshot, collection, orderBy } from 'firebase/firestore';

import GalleryPost from '../Posts/Gallery/GalleryPost';

function GalleryPosts() {
    const [galleryPosts, setGalleryPosts] = useState([]);
    const { uid } = useParams();

    useEffect(() => {
        const galleryPostsRef = collection(db, 'users', `${uid}`, "Gallery Posts");
        const q = query(galleryPostsRef, orderBy("timestamp", "desc"));
        const unsub = onSnapshot(q, (snapshot) =>
            setGalleryPosts(snapshot.docs.map((doc) => ({ 
                id: doc.id,
                post: doc.data()
            }))))
        return unsub;
    }, [uid]);

    return (
        <div className="galleryposts">
            {
            galleryPosts.map(({ id, post }) => (
                <GalleryPost 
                    key = { id } 
                    galleryPostId = { id } 
                    usernameuid = { post.usernameuid } 
                    imageUrl = { post.imageUrl } 
                    media = { post.media }
                    />
                ))
            }
        </div>
    )
}

export default GalleryPosts
