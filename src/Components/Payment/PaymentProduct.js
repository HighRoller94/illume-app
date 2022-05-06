import React from 'react'
import{ Link } from 'react-router-dom'

import { useStateValue } from '../../StateProvider';

function PaymentProduct({ storePostId, usernameuid, imageUrl, title, username, price, sizes, colours, hideButton }) {
    const [{ user, basket}, dispatch] = useStateValue();

    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: storePostId,
        })
    }
    
    return (
        <div className="paymentproduct">
                <Link to={`/details/${usernameuid}/${storePostId}`}>
                    <img className="paymentproduct_image" src={imageUrl} alt="" />
                </Link>
            <div className="paymentproduct_info">
                <h3><strong>{title}</strong></h3>
                <p className="paymentproduct_price">£{price}</p>
                <p>{sizes}</p>
                <p>{colours}</p>
                <p><strong>{username}</strong></p>
            </div>
            {!hideButton && (
                <div className="payment_buttons">
                <button onClick={removeFromBasket}>Remove Item</button>
                </div>
            )}
        </div>
    )
}

export default PaymentProduct
