import React, { useState, useEffect } from 'react';
import { useStateValue } from '../../StateProvider';
import { db } from '../../firebase';
import { useParams } from "react-router-dom";

import StorePost from '../Posts/StorePost/StorePost';
function StorePosts() {
    const [storeposts, setStorePosts] = useState([]);
    const [{ user }] = useStateValue();
    const { uid } = useParams();

    useEffect(() => {
        const unsubscribe = 
        db
            .collection('users')
            .doc(uid)
            .collection('Store Posts')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setStorePosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    storepost: doc.data()
            })));
        })

        return () => {
            unsubscribe();
        }
        
    }, [uid]);

    return (
        <div className="storeposts">

            {
                storeposts.map(({ id, storepost }) => (
                    <StorePost 
                        key={id} 
                        storePostId={id} 
                        user={user} 
                        usernameuid={storepost.usernameuid} 
                        username={storepost.username} 
                        title={storepost.title} 
                        imageUrl={storepost.imageUrl}
                        price={storepost.price} 
                        sizes={storepost.sizes}
                        colours={storepost.colours}
                        />
                ))
            }

        </div>
    )
}

export default StorePosts
