import React, { useState, useEffect }from 'react'
import { useStateValue } from '../StateProvider';
import Subtotal from '../Components/Checkout/Subtotal/Subtotal';
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import { db } from '../firebase';
import { motion } from 'framer-motion';

import './Checkout.css'


function Checkout() {
    const [basketitems, setBasketItems] = useState([]);
    const [{ user, basket }, dispatch] = useStateValue();
    
    useEffect(() => {
        const unsubscribe = 
        db
            .collection('users')
            .doc(user.uid)
            .collection("Basket")
            .onSnapshot(snapshot => {
                setBasketItems(snapshot.docs.map(doc => ({
                    id: doc.id,
                    basketitem: doc.data()
            })));
        })
        return () => {
            unsubscribe();
        }
        
    }, []);
    
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
