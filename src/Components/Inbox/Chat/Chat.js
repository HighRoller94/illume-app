import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';

import { useParams, Link } from "react-router-dom";
import { db } from '../../../firebase';
import firebase from 'firebase';
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
                        <Avatar src={profileImage} />
                        <div className="chat_headerInfo">
                            <h2>{userName}</h2>
                        </div>
                    </div>
                </Link>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat_body">
                {messages.map((message) => (
                    <p className={`chat_message ${message.sender === user.displayName && "chat_receiver"}`}>
                        <span className="chat_name">{message.sender}</span>
                        {message.message}
                        <span className="chat_timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}
                
            </div>

            <div className="chat_footer">
                
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text"
                    />
                    <button onClick={sendMessage}
                    type="submit">
                        Send
                    </button>
                </form>
                
            </div>
        </div>
    );
}

export default Chat;
