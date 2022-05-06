import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { db } from '../firebase';
import { motion } from 'framer-motion';

import SuggestStoreThumb from '../Components/Store/SuggestStoreThumb';

function StorePostInfo() {
    const { uid } = useParams()
    const { storePostId } = useParams()
    const [suggeststoreposts, setSuggestStorePosts] = useState([])
    const [morestoreposts, setMoreStorePosts] = useState([])
    const [postdata, setPostData] = useState('')
    const [{ basket, user }, dispatch] = useStateValue();

    const handleDelete = () => {
        db
            .collection("users")
            .doc(user.uid)
            .collection("Store Posts")
            .doc(storePostId)
            .delete()
    };

    useEffect(() => {
        db
            .collection("users")
            .doc(uid)
            .collection("Store Posts")
            .doc(storePostId)
            .get()
            .then(doc => {
                const data = doc.data()
                setPostData({ ...data })
            })
    }, [storePostId])

    useEffect(() => {

        const unsubscribe =
        db
            .collection("users")
            .doc(uid)
            .collection("Store Posts")
            .limit(4)
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setSuggestStorePosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    suggeststorepost: doc.data()
                })))
            })

            return () => {
                unsubscribe();
            }
    }, [uid])

    useEffect(() => {

        const unsubscribe =
        db
            .collectionGroup("Store Posts")
            .limit(4)
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setMoreStorePosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    morestorepost: doc.data()
                })))
            })

            return () => {
                unsubscribe();
            }
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
                    {suggeststoreposts.map(({ id, suggeststorepost }) => (
                        <SuggestStoreThumb
                            addToBasket = {addToBasket}
                            key = { id }
                            storePostId = { id }
                            username = { suggeststorepost.username }
                            usernameuid = { suggeststorepost.usernameuid}
                            imageUrl = { suggeststorepost.imageUrl }
                            title = { suggeststorepost.title }
                            price = { suggeststorepost.price }
                        />
                    ))}
                </div>
            </div>
            <div className="other_storeposts">
                    <h1>More from the store...</h1>
                    <div className="other_posts">
                        {morestoreposts.map(({ id, morestorepost }) => (
                            <SuggestStoreThumb
                                addToBasket = {addToBasket}
                                key = { id }
                                storePostId = { id }
                                username = { morestorepost.username }
                                usernameuid = { morestorepost.usernameuid}
                                imageUrl = { morestorepost.imageUrl }
                                title = { morestorepost.title }
                                price = { morestorepost.price }
                            />
                        ))}
                    </div>
            </div>
        </motion.div>
    )
}

export default StorePostInfo
