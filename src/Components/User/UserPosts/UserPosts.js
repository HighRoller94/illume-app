import React, { useEffect, useState } from 'react';
import { useStateValue } from '../../../StateProvider';
import { db } from '../../../firebase';

import Post from '../../Posts/Post/Post';

import './UserPosts.css';

function UserPosts() {
    const [posts, setPosts] = useState([]);
    const [{ user }] = useStateValue();

    useEffect(() => {
        db
            .collection('users')
            .doc(user.uid)
            .collection("Posts")
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setPosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    post: doc.data()
            })));
        })
    }, []);

    return (
        <div className="userposts">

            {posts.map(({ id, post }) => (
                <Post 
                    key={id} 
                    postId={id}
                    user={user}
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
