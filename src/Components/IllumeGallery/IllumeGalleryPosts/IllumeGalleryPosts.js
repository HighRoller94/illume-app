import React, { useState, useEffect } from 'react'
import { db } from '../../../firebase'

import IllumeGalleryPost from '../IllumeGalleryPost/IllumeGalleryPost'

import './IllumeGalleryPosts.css'

function IllumeGalleryPosts() {
    const [illumegalleryposts, setIllumeGalleryPosts] = useState([])
    
    useEffect(() => {
        const unsubscribe = 
        db
            .collectionGroup('Gallery Posts')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setIllumeGalleryPosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    gallerypost: doc.data()
            })));
        })
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <div className="illumegallery_posts">
            
            {illumegalleryposts.map(({ id, gallerypost }) => (
                <IllumeGalleryPost 
                    key = { id } 
                    galleryPostId = { id } 
                    body = {gallerypost.body}
                    imageUrl = {gallerypost.imageUrl}
                    username = {gallerypost.username}
                    usernameuid = {gallerypost.usernameuid}
                    media = {gallerypost.media}
                />
            ))}

        </div>
    )
}

export default IllumeGalleryPosts
