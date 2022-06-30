import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { useStateValue } from '../StateProvider';
import { db } from '../firebase';
import { motion } from 'framer-motion';
import { collection, query, onSnapshot, collectionGroup, getDoc, doc, deleteDoc, limit, orderBy } from 'firebase/firestore'
import SuggestStoreThumb from '../Components/Store/SuggestStoreThumb';

function StorePostInfo() {
    const { uid } = useParams()
    const { storePostId } = useParams()
    const [suggestStorePosts, setSuggestStorePosts] = useState([])
    const [moreStorePosts, setMoreStorePosts] = useState([])
    const [postdata, setPostData] = useState('')
    const [{ basket, user }, dispatch] = useStateValue();

    const handleDelete = () => {
        const postRef = doc(db, 'users', `${user.uid}`, "Store Posts", `${storePostId}`)
        deleteDoc(postRef)
    };

    useEffect(() => {
        const postRef = doc(db, 'users', `${uid}`, "Store Posts", `${storePostId}`)
        const unsub = getDoc(postRef)
        .then((doc) => {
            setPostData(doc.data())
        })
        return unsub;
    }, [storePostId])

    useEffect(() => {
        const storePostsRef = collection(db, 'users', `${uid}`, "Store Posts")
        const q = query(storePostsRef, orderBy("timestamp", "desc"), limit(4))
        const unsub = onSnapshot(q, (snapshot) => 
            setSuggestStorePosts(snapshot.docs.map((doc) => ({
                id: doc.id,
                post: doc.data()
            }))))
        return unsub;
    }, [uid])

    useEffect(() => {
        const allStorePosts = collectionGroup(db, "Store Posts")
        const q = query(allStorePosts, orderBy("timestamp", "desc"), limit(4));
        const unsub = onSnapshot(q, (snapshot) => 
            setMoreStorePosts(snapshot.docs.map((doc) => ({
                id: doc.id,
                post: doc.data()
            }))))
        return unsub;
    }, [])

    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: storePostId,
                title: postdata.title,
                username: postdata.username,
                imageUrl: postdata.imageUrl,
                price: postdata.price,
                sizes: postdata.sizes,
                colours: postdata.colours,
            },
        });
    };

    return (
        <motion.div 
        className="storedetails"
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        >
            <div className="storedetails_container">
                <div className="storedetails_row">
                    <div className="image_col">
                        <img className="storedetails_image" src={postdata.imageUrl} />
                    </div>
                    <div className="storepost_details">
                        <h1>{postdata.title}</h1>
                        <p className="storepost_price"><strong>£{postdata.price}</strong></p>
                        <p>In Stock: {postdata.stock}</p>
                        <p>Sizes: {postdata.sizes}</p>
                        <p>Colours: {postdata.colours}</p>
                        <h2>Description:</h2>
                        <p>{postdata.description}</p>
                    </div>
                    <div className="storedetails_buttons">
                        {postdata.usernameuid === user.uid ? (
                            <button className="storebuttons" onClick={handleDelete}>Remove Item</button>
                        ) : (
                            <button className="storebuttons" onClick={addToBasket}>Add to Basket</button>
                        )}
                        <Link to={`/messages/${postdata.usernameuid}`}>
                            <button className="store_contactbutton">Contact Seller</button>
                        </Link>
                    </div>
                </div>
                <h2>More from <Link to={`/store/${postdata.usernameuid}`}>
                    {postdata.username}...</Link></h2>
                <div className="storepost_suggestions">
                    {suggestStorePosts.map(({ id, post }) => (
                        <SuggestStoreThumb
                            addToBasket = {addToBasket}
                            key = { id }
                            storePostId = { id }
                            username = { post.username }
                            usernameuid = { post.usernameuid}
                            imageUrl = { post.imageUrl }
                            title = { post.title }
                            price = { post.price }
                        />
                    ))}
                </div>
            </div>
            <div className="other_storeposts">
                    <h1>More from the store...</h1>
                    <div className="other_posts">
                        {moreStorePosts.map(({ id, post }) => (
                            <SuggestStoreThumb
                                addToBasket = {addToBasket}
                                key = { id }
                                storePostId = { id }
                                username = { post.username }
                                usernameuid = { post.usernameuid}
                                imageUrl = { post.imageUrl }
                                title = { post.title }
                                price = { post.price }
                            />
                        ))}
                    </div>
            </div>
        </motion.div>
    )
}

export default StorePostInfo
