import React from 'react'
import moment from 'moment'
import CurrencyFormat from 'react-currency-format'

import './Order.css'

import PaymentProduct from '../../PaymentProduct/PaymentProduct'

function Order({ order }) {
    return (
        <div className="order">
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
            <p className="order_id">
                <small>{order.id}</small>
            </p>
            {order.data.basket?.map(item => (
                <PaymentProduct
                    id={item.id}
                    title={item.title}
                    imageUrl={item.imageUrl}
                    price={item.price}
                    sizes={item.sizes}
                    colour={item.colours}
                    username={item.username}
                    hideButton
                />
            ))}
            <CurrencyFormat
                renderText={(value) => (
                    <h3 className="order_total">Order Total: {value}</h3>
                )}
                decimalScale={2}
                value={order.data.amount / 100}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"£"}
            />
        </div>
    )
}

export default Order
