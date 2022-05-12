import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { db } from '../../../firebase';

import Post from '../../Posts/Post/Post';

function UserPosts() {
    const [posts, setPosts] = useState([]);
    const { uid } = useParams()

    useEffect(() => {
        db
            .collection('users')
            .doc(uid)
            .collection("Posts")
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setPosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    post: doc.data()
            })));
        })
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
