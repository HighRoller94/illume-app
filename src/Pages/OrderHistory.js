import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { useStateValue } from '../StateProvider'

import Order from '../Components/OrderHistory/Order/Order'

import './OrderHistory.css'

function OrderHistory() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([])

    useEffect(() => {
        db
            .collection('users')
            .doc(user.uid)
            .collection('Order History')
            .orderBy('created', 'desc')
            .onSnapshot(snapshot => {
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
    }, [])

    return (
        <div className="order_container">
            <h1>My Orders</h1>
            <div className='orders_history'>
                {orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
        </div>
    )
}

export default OrderHistory
