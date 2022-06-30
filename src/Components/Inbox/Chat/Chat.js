import { Avatar, IconButton } from '@material-ui/core';
import { Send, Videocam, AttachFile, MoreVert, Phone } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';

import { useParams, Link } from "react-router-dom";
import { db } from '../../../firebase';
import firebase from 'firebase/compat/app'
import { useStateValue } from '../../../StateProvider';

function Chat() {
    const { uid } = useParams();
    const [{ user }] = useStateValue();

    const [profileImage, setProfileImage] = useState("");
    const [userName, setUserName] = useState("");
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        if (uid) {
            db
                .collection('users')
                .doc(uid)
                .onSnapshot((snapshot) => 
                    setUserName(snapshot.data().username));
            db
                .collection('users')
                .doc(uid)
                .onSnapshot((snapshot) => 
                    setProfileImage(snapshot.data().profileImage));
            db
                .collection('users')
                .doc(user.uid)
                .collection('Inbox')
                .doc(uid)
                .collection('Messages')
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => 
                    setMessages(snapshot.docs.map((doc) => doc.data()))
            )
        } 
    }, [uid])

    const sendMessage = async (e) => {
        e.preventDefault();

        db
            .collection('users')
            .doc(uid)
            .collection('Inbox')
            .doc(user.uid)
            .collection('Messages')
            .add({
                message: input,
                sender: user.displayName,
                uid: user.uid,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })

        db
            .collection('users')
            .doc(user.uid)
            .collection('Inbox')
            .doc(uid)
            .collection('Messages')
            .add({
                message: input,
                sender: user.displayName,
                uid: user.uid,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })

        setInput('');
    };


    return (
        <div className="chat">
            <div className="chat_header">
                <Link to={`/profile/${uid}`}>
                    <div className="chat_headerlink">
                        <Avatar className="chat__HeaderAvatar" src={profileImage} />
                        <h2 className="chat__HeaderName">{userName}</h2>
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
                {messages.map((message, id) => (
                    <p className={`chat_message ${message.sender === user.displayName && "chat_receiver"}`}>
                        <span className="chat_name">{message.sender}</span>
                        {message.message}
                        <span className="chat_timestamp">{new Date(message.timestamp?.toDate()).toLocaleString()}</span>
                    </p>
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
                    <button className="footer__Submit" onClick={sendMessage}
                    type="submit">
                        <Send />
                    </button>
                </form>
                
            </div>
        </div>
    );
}

export default Chat;
