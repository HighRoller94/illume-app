import React, { useState, useEffect }from 'react';
import { useStateValue } from '../StateProvider';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../reducer';
import axios from 'axios';
import { db } from '../firebase';

import PaymentProduct from '../Components/Payment/PaymentProduct';

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const navigate = useNavigate();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientsecret, setClientSecret] = useState(true);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        // Generate Stripe secret that allows us to charge users
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects total of payment in a currencies subunits e.g. pence
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientsecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then (({ paymentIntent }) => {
            // paymentIntent = payment confirmation

            db  
                .collection('users')
                .doc(user.uid)
                .collection('Order History')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                })
        
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            })

            navigate(`/orders`)
        })
        
    }

    const handleChange = e => {
        // Listen for changes in card element
        // Display any errors as user types in card details
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

    return (
        <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            >
            <div className="payment">
                <div className="payment_container">
                    <h1>Checkout (<Link to="/checkout">{basket?.length} items</Link>)</h1>
                    <div className="payment_section">
                        <div className="payment_title">
                            <h3>Delivery Address</h3>
                        </div>
                        <div className="payment_address">
                            <p>{user?.email}</p>
                            <p>119 Yeet Ave</p>
                            <p>Yeet City, Yeet</p>
                        </div>
                    </div>
                        <div className="payment_section">
                                <h3>Review Items</h3>
                        </div>
                        <div className="payment_items">
                            {basket.map(item => (
                                <PaymentProduct
                                    id={item.id}
                                    storePostId={item.id}
                                    title={item.title}
                                    body={item.body}
                                    username={item.username}
                                    usernameuid={item.usernameuid}
                                    imageUrl={item.imageUrl}
                                    price={item.price}
                                    colours={item.colours}
                                    sizes={item.sizes}
                                />
                            ))}
                        </div>
                    <div className="payment_payment">
                        <div className="payment_method">
                            <h3>Payment Method</h3>
                        </div>
                        <div className="payment_details">
                                <form onSubmit={handleSubmit}>
                                    <CardElement onChange={handleChange}/>
                                    <div className="payment_price">
                                        <CurrencyFormat
                                            renderText={(value) => (
                                                <h3>Order Total: {value}</h3>
                                            )}
                                            decimalScale={2}
                                            value={getBasketTotal(basket)}
                                            displayType={"text"}
                                            thousandSeperator={true}
                                            prefix={"£"}
                                        />
                                        <button disabled={processing || disabled || succeeded}>
                                            <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                        </button>
                                    </div>

                                    {error && <div>{error}</div>}
                                </form>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Payment
