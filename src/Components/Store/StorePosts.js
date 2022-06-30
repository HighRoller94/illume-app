import React, { useState, useEffect } from 'react';
import { useStateValue } from '../../StateProvider';
import { db } from '../../firebase';
import { useParams } from "react-router-dom";
import { query, onSnapshot, collection, orderBy } from 'firebase/firestore';

import StorePost from '../Posts/StorePost/StorePost';

function StorePosts() {
    const [storeposts, setStorePosts] = useState([]);
    const [{ user }] = useStateValue();
    const { uid } = useParams();

    useEffect(() => {
        const storePostsRef = collection(db, 'users', `${uid}`, 'Store Posts')
        const q = query(storePostsRef, orderBy("timestamp", "desc"));
        const unsub = onSnapshot(q, (snapshot) => 
            setStorePosts(snapshot.docs.map((doc) => ({
                id: doc.id,
                post: doc.data()
            }))))
        return unsub;
    }, [uid]);

    return (
        <div className="storeposts">
            {
                storeposts.map(({ id, post }) => (
                    <StorePost 
                        key={id} 
                        storePostId={id} 
                        user={user} 
                        usernameuid={post.usernameuid} 
                        username={post.username} 
                        title={post.title} 
                        imageUrl={post.imageUrl}
                        price={post.price} 
                        sizes={post.sizes}
                        colours={post.colours}
                        />
                ))
            }
        </div>
    )
}

export default StorePosts
