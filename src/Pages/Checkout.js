import React, { useState, useEffect }from 'react';
import { useStateValue } from '../StateProvider';
import { db } from '../firebase';
import { motion } from 'framer-motion';

import Subtotal from '../Components/Checkout/Subtotal';
import CheckoutProduct from '../Components/Checkout/CheckoutProduct';

function Checkout() {
    const [{ user, basket }, dispatch] = useStateValue();
    
    return (
        <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            >
            <div className="checkout_container">
                    <div className="checkout_left">
                        <h2 className="checkout_title">
                            Your current basket
                        </h2>
                        <div className="checkout_items">
                            {basket.map(item => (
                                <CheckoutProduct
                                    storePostId = {item.id}
                                    title = {item.title}
                                    imageUrl = {item.imageUrl}
                                    username = {item.username}
                                    price = {item.price}
                                    usernameuid = {item.usernameuid}
                                />
                            ))}
                        </div>
                    </div>
                <div className="checkout_right">
                    <Subtotal />
                </div>
            </div>
        </motion.div>
    );
}

export default Checkout
