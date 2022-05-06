import React from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../firebase';

import { useStateValue } from '../../StateProvider'

function SuggestStoreThumb({ username, usernameuid, imageUrl, price, title, storePostId }) {
    const [{ basket, user }, dispatch] = useStateValue();

    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: storePostId,
                title: title,
                username: username,
                imageUrl: imageUrl,
                price: price,
            },
        });
    };

    const handleDelete = () => {
        db
            .collection("users")
            .doc(user.uid)
            .collection("Store Posts")
            .doc(storePostId)
            .delete()
    };

    return (
        <div className="storethumbs">
            
                <div className="storethumb">
                    <Link to={`/details/${usernameuid}/${storePostId}`} >
                        <img className="storethumb_img" src={imageUrl} />
                    </Link>
                    <p><strong>{title}</strong></p>
                    <p>£{price}</p>
                    {usernameuid === user.uid ? (
                        <button className="storethumb_button" onClick={handleDelete}>Remove Item</button>
                    ) : (
                        <button className="storethumb_button" onClick={addToBasket}>Add to Basket</button>
                    )}
                </div>
            
        </div>  
    )
}

export default SuggestStoreThumb
