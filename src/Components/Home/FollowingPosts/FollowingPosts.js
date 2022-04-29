import React, { useState, useEffect } from 'react'
import { db } from '../../../firebase'
import { useStateValue } from '../../../StateProvider';

import Post from '../../Posts/Post/Post';
import './FollowingPosts.css'

function FollowingPosts() {
    const [posts, setPosts] = useState([])
    const [moreposts, setMorePosts] = useState([])
    const [{ user }] = useStateValue();
    const [lastDoc, setLastDoc] = useState();
    const [loading, setLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);

    // sets a ref just to make life easier/avoid repeating code
    const followingPostsRef = db.collection('users').doc(user.uid).collection('Following Posts').orderBy('timestamp', 'desc')

    useEffect(() => {
        // loads the initial batch of listings
        followingPostsRef
            .limit(10)
            .get()
            .then(snapshot => {
                setPosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    post: doc.data()
                })));
                const lastDoc = snapshot.docs[snapshot.docs.length -1];
                setLastDoc(lastDoc);
            })
    }, []);

    const updateState = (snapshot) => {
        // checks whether or not there's another batch of documents
        const isSnapshotEmpty = snapshot.size === 0;

        if (!isSnapshotEmpty) {
            setMorePosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })));
            setPosts((posts) => [ ...posts, ...moreposts])
            const lastDoc = snapshot.docs[snapshot.docs.length -1];
            setLastDoc(lastDoc);
        } else {
            setIsEmpty(true)
        }
        setLoading(false)
    }

    const fetchMorePosts = () => {
        // Fetches the next batch of listings and runs the update state function
        setLoading(true);
            followingPostsRef
                .startAfter(lastDoc)
                .limit(10)
                .get()
                .then(snapshot => {
                    updateState(snapshot);
                })
            
    }

    // if no posts then return loading as visual indicator
    if (posts.length === 0) {
        return <h1>Loading...</h1>
    }

    // Sets the state to either loading or load more posts button (depending on loading state)
    const state = !loading && <button className="more_button" onClick={fetchMorePosts}>See More</button>

    return (
        <div className="followingposts">
            
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
                    />
            ))}

            {loading && <h2>Loading...</h2>}

            <div className="loading_following">
                {isEmpty ? (
                    <h1>"No more posts :("</h1>
                ):(
                    (state)
                )}
            </div>

        </div>
    )
}



export default FollowingPosts
