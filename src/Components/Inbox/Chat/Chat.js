import { IconButton } from '@material-ui/core';
import { Send, AttachFile, MoreVert } from '@material-ui/icons';
import React, { useState, useEffect, useRef } from 'react';

import { useParams, Link } from "react-router-dom";
import { db } from '../../../firebase';
import { query, onSnapshot, collection, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { useStateValue } from '../../../StateProvider';

import ChatHeader from './ChatHeader/ChatHeader';
import ChatBody from './ChatBody/ChatBody';
import ChatFooter from './ChatFooter/ChatFooter';

import Message from './Message/Message';

function Chat({ userData }) {
    const hiddenFileInput = useRef(null);
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
            <ChatHeader userData={userData} />
            <div className="chat_body">
                <form className="chat__drop" enctype="multipart/form-data">
                    <input type="file" className="photos" multiple="true" style={{ display: "none" }}/>
                    <div className="chat__Messages">
                        {messages.map(message => (
                            <Message message={message.message}/>
                        ))}
                    </div>
                </form>
            </div>
            <div class="chat__FilePreviews">
                <div class="prev-img">
                    <span>&times;</span>
                    <img src="https://picsum.photos/id/237/200/300" alt="asd"/>
                </div>
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
                    <button className="footer__Submit" disabled={!input} onClick={sendMessage} type="submit">
                        <Send />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Chat;
