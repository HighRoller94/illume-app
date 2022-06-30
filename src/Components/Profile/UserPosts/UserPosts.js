import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { db } from '../../../firebase';
import { query, onSnapshot, collection, orderBy } from 'firebase/firestore';

import Post from '../../Posts/Post/Post';

function UserPosts() {
    const [posts, setPosts] = useState([]);
    const { uid } = useParams()

    useEffect(() => {
        const getUserPosts = async () => {
            const postsRef = collection(db, 'users', `${uid}`, "Posts");
            const q = query(postsRef, orderBy("timestamp", "desc"));
            const unsub = await onSnapshot(q, (snapshot) =>
                setPosts(snapshot.docs.map((doc) => ({ 
                    id: doc.id,
                    post: doc.data()
                }))))
            return unsub;
        }
        
        getUserPosts();
    }, [uid]);

    return (
        <div className="userposts">

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

        </div>
    )
}

export default UserPosts
