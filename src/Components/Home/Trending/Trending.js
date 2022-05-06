import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';

import TrendingThumbs from './TrendingThumbs/TrendingThumbs';

function Trending() {
    const [latestgalposts, setLatestGalPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = 
        db
            .collectionGroup('Gallery Posts')
            .orderBy('timestamp', 'desc')
            .limit(6)
            .onSnapshot(snapshot => {
                setLatestGalPosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    galpost: doc.data()
                })));
            })

        return () => {
            unsubscribe();
        }

    }, []);


    return (
        <div className="trending">
            <h3>Latest</h3>
            <div className="trending_posts">
                { 
                
                    latestgalposts.map(({ id, galpost}) => (
                        <TrendingThumbs
                            key={id}
                            galleryPostId={id}
                            usernameuid={galpost.usernameuid}
                            username={galpost.username}
                            imageUrl={galpost.imageUrl}
                            media={galpost.media}
                        />
                    ))
                
                }
            </div>
        </div>
    )
}

export default Trending
