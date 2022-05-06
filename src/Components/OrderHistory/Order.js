import React from 'react';
import CurrencyFormat from 'react-currency-format';

import PaymentProduct from '../Payment/PaymentProduct';

function Order({ order }) {
    return (
        <div className="order">
            <h2>Order</h2>
            <p>{order.data.created}</p>
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
