import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { query, onSnapshot, collectionGroup, orderBy, limit } from 'firebase/firestore';

import TrendingThumbs from './TrendingThumbs/TrendingThumbs';

function Trending() {
    const [trendingPosts, setTrendingPosts] = useState([]);

    useEffect(() => {
        const trendingPostsRef = collectionGroup(db, "Gallery Posts");
        const q = query(trendingPostsRef, orderBy("timestamp", "desc"), limit(6));

        const unsub = onSnapshot(q, (snapshot) =>
            setTrendingPosts(snapshot.docs.map((doc) => ({
                id: doc.id,
                post: doc.data()
            }))))

        return unsub;
        
    }, []);
    console.log(trendingPosts)
    return (
        <div className="trending">
            <h3>Trending</h3>
            <div className="trending_posts">
                {trendingPosts.map(({id, post}) => (
                    <TrendingThumbs
                        galleryPostId={id}
                        usernameuid={post.usernameuid}
                        imageUrl={post.imageUrl}
                        media={post.media}
                    />
                ))}
            </div>
        </div>
    )
}

export default Trending
