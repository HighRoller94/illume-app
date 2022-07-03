import { Avatar, IconButton } from '@material-ui/core';
import { Send, Videocam, AttachFile, MoreVert, Phone } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';

import { useParams, Link } from "react-router-dom";
import { db } from '../../../firebase';
import { query, onSnapshot, collection, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { useStateValue } from '../../../StateProvider';

import Message from './Message/Message';

function Chat({ userData }) {
    const { uid } = useParams();
    const [{ user }] = useStateValue();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        if (uid) {
            getMyMessages();
        } 
    }, [uid])

    const getMyMessages = async () => {
        const myMessagesRef = collection(db, 'users', `${user.uid}`, "Inbox", `${uid}`, "Messages")
        const q = query(myMessagesRef, orderBy("timestamp", "asc"))
        const unsub = await onSnapshot(q, (snapshot) =>
            setMessages(snapshot.docs.map((doc) => ({ 
                id: doc.id,
                message: doc.data()
            }))))
        return unsub;
    }

    const sendMessage = async (e) => {
        e.preventDefault();

        const receiverMessageRef = collection(db, 'users', `${uid}`, "Inbox", `${user.uid}`, "Messages")
        addDoc(receiverMessageRef, {
            message: input,
            sender: user.displayName,
            uid: user.uid,
            timestamp: serverTimestamp(),
        })

        const senderMessageRef = collection(db, 'users', `${user.uid}`, "Inbox", `${uid}`, "Messages")
        addDoc(senderMessageRef, {
            message: input,
            sender: user.displayName,
            uid: user.uid,
            timestamp: serverTimestamp(),
        })

        setInput('');
    };


    return (
        <div className="chat">
            <div className="chat_header">
                <Link to={`/profile/${uid}`}>
                    <div className="chat_headerlink">
                        <Avatar className="chat__HeaderAvatar" src={userData?.profileImage} />
                        <h2 className="chat__HeaderName">{userData?.username}</h2>
                    </div>
                </Link>
                <div className="chat_headerRight">
                    <IconButton>
                        <Phone />
                    </IconButton>
                    <IconButton>
                        <Videocam />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                {messages.map(message => (
                    <Message message={message.message}/>
                ))}
            </div>
            <div className="chat_footer">
                <form className="chat__Form">
                    <input value={input} onChange={e => setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text"
                    />
                    <div className="footer__Options">
                        <IconButton>
                            <AttachFile />
                        </IconButton>
                    </div>
                    <button className="footer__Submit" onClick={sendMessage} type="submit">
                        <Send />
                    </button>
                </form>
                
            </div>
        </div>
    );
}

export default Chat;
