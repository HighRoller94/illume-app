import React, { useState, useEffect } from 'react'
import { db } from '../../../../firebase'

import Post from './Post/Post'

import './LandingHomePosts.css'

function LandingHomePosts() {
    const [latestposts, setLatestPosts] = useState([])

    useEffect(() => {
        const unsubscribe = 
        db
            .collectionGroup('Gallery Posts')
            .orderBy('timestamp', 'desc')
            .limit(4)
            .onSnapshot(snapshot => {
                setLatestPosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    post: doc.data()
                })));
            })

        return () => {
            unsubscribe();
        }

    }, []);

    return (
        <div className="latest">
            {latestposts.map(({ id, post}) => (
                    <Post
                        key={id}
                        galleryPostId={id}
                        username={post.username}
                        imageUrl={post.imageUrl}
                        media={post.media}
                        usernameuid={post.usernameuid}
                    />
                ))
                }
        </div>
    )
}

export default LandingHomePosts
