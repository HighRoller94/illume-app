import React from 'react'
import { useStateValue } from '../../../../StateProvider';

const Message = ({ message }) => {
    const [{ user }] = useStateValue();

    return (
        <p className={`chat_message ${message.sender === user.displayName && "chat_receiver"}`}>
            <span className="chat_name">{message.sender}</span>
            {message.message}
            <span className="chat_timestamp">{new Date(message.timestamp?.toDate()).toLocaleString()}</span>
        </p>
    )
}

export default Message