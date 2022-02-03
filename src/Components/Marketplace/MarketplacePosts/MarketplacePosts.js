import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';

import MarketplacePost from '../MarketplacePost/MarketplacePost';

import './MarketplacePosts.css'

function MarketplacePosts() {
    const [allstoreposts, setAllStorePosts] = useState([])
    
    useEffect(() => {
        const unsubscribe = 
        db
            .collectionGroup('Store Posts')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setAllStorePosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    storepost: doc.data()
            })));
        })
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <div className="marketplace_posts">

            {allstoreposts.map(({ id, storepost }) => (
                <MarketplacePost 
                    key = { id } 
                    storePostId = { id } 
                    title = {storepost.title}
                    price = {storepost.price}
                    username = {storepost.username}
                    usernameuid = { storepost.usernameuid } 
                    imageUrl = { storepost.imageUrl }
                    sizes = { storepost.sizes }
                    colours = { storepost.colours }
                    />
            ))}

        </div>
    )
}

export default MarketplacePosts
