import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { query, onSnapshot, collectionGroup, orderBy } from 'firebase/firestore';

import TrendingThumbs from './TrendingThumbs/TrendingThumbs';

function Trending() {
    const [trending, setTrending] = useState([]);

    useEffect(() => {
        const trendingPostsRef = collectionGroup(db, "Gallery Posts");
        const q = query(trendingPostsRef, orderBy("timestamp", "desc"));

        const unsub = onSnapshot(q, (snapshot) =>
            setTrending(snapshot.docs.map((doc) => doc.data())))

        return unsub;
    }, []);

    return (
        <div className="trending">
            <h3>Trending</h3>
            <div className="trending_posts">
                {trending.map(({ id, galpost}) => (
                    <TrendingThumbs
                        key={id}
                        galleryPostId={id}
                        usernameuid={galpost.usernameuid}
                        username={galpost.username}
                        imageUrl={galpost.imageUrl}
                        media={galpost.media}
                    />
                ))}
            </div>
        </div>
    )
}

export default Trending
