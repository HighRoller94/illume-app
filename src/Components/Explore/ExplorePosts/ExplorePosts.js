import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase'
import Post from '../../Posts/Post/Post'
import Masonry from 'react-masonry-css'

import './ExplorePosts.css'

function ExplorePosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        db
            .collectionGroup('Posts')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setPosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    post: doc.data()
            })));
        })
    }, []);

    return (
        <div className="explore_posts">
            <Masonry
            breakpointCols={3}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {posts.map(({ id, post }) => (
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
            </Masonry>
        </div>
    )
}

export default ExplorePosts
