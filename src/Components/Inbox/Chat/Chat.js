
import React, { useState, useEffect, useRef } from 'react';

import { useParams } from "react-router-dom";
import { db } from '../../../firebase';
import { query, onSnapshot, collection, orderBy } from 'firebase/firestore';
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
    const [media, setMedia] = useState([]);
    const [input, setInput] = useState('');
    const [highlight, setHighlight] = useState(false);

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

    const handleFiles = files => {
        let mediaArray = [];
        for (let file of files) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener('load', () => {
                let fileObject = {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    src: reader.result
                }
                mediaArray.push(fileObject);
                setMedia([...media, ...mediaArray])
            })
        }
    }
    
    const handleHighlight = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setHighlight(true);
    }

    const handleUnhighlight = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setHighlight(false);
    }

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let dt = e.dataTransfer;
        let files = dt.files;
        setHighlight(false)
        handleFiles(files);
    }

    return (
        <div className="chat">
            <ChatHeader userData={userData} />

            <div className={highlight ? "chat_body highlight" : "chat_body"} onDragEnter={handleHighlight} onDragOver={handleHighlight} onDragLeave={handleUnhighlight} onDrop={handleDrop}>
                <div className="chat__Messages">
                    {messages.map(message => (
                        <Message message={message.message}/>
                    ))}
                </div>
            </div>

            <ChatFooter media={media} setMedia={setMedia} handleFiles={handleFiles} />
        </div>
    );
}

export default Chat;
