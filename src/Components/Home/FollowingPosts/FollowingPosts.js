import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { query, onSnapshot, collection, orderBy } from 'firebase/firestore';
import { useStateValue } from '../../../StateProvider';

import Post from '../../Posts/Post/Post';

function FollowingPosts() {
    const [{ user }] = useStateValue();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        const getFollowingPosts = async () => {
            const followingPostsRef = collection(db, 'users', `${user.uid}`, "Following Posts");
            const q = query(followingPostsRef, orderBy("timestamp", "desc"));
            const unsub = await onSnapshot(q, (snapshot) =>
                setPosts(snapshot.docs.map((doc) => ({ 
                    id: doc.id,
                    post: doc.data()
                }))))
            return unsub;
        }
        
        getFollowingPosts();
    }, []);
    
    if (posts.length === 0) {
        return <h1>Loading...</h1>
    }

    const state = !loading && <button className="more_button">See More</button>

    return (
        <div className="followingposts">
            
            <h1>Following Posts</h1>
            {posts.map(({id, post}) => (
                <Post  
                    postId={id}
                    timestamp={post.timestamp}
                    usernameuid={post.usernameuid} 
                    username={post.username} 
                    body={post.body} 
                    imageUrl={post.imageUrl} 
                />
            ))}

            {loading && <h2>Loading...</h2>}

            <div className="loading_following">
                {isEmpty ? (
                    <h1>"No more posts"</h1>
                ):(
                    (state)
                )}
            </div>

        </div>
    )
}



export default FollowingPosts
