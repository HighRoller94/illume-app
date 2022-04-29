import React from 'react'
import { useStateValue } from '../../StateProvider';
import { Link } from 'react-router-dom'

import './CheckoutProduct.css'

function CheckoutProduct({ storePostId, usernameuid, imageUrl, title, username, price }) {
    const [{ user, basket}, dispatch] = useStateValue();

    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: storePostId,
        })
    }

    return (
        <div className="checkout_storepost">
            <Link to={`/details/${usernameuid}/${storePostId}`}>
                <img className="storepost_image" src={imageUrl} alt="" />   
            </Link>
            <div className="storepost_info">
                <p><strong>{title}</strong></p>
                <p className="storepost_price">£{price}</p>
                <p>{username}</p>
                <button onClick={removeFromBasket}>Remove Item</button>
            </div>
        </div>
    )
}

export default CheckoutProduct
