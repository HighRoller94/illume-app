import React, { useEffect, useState } from 'react';
import { db } from '../../../../firebase';
import { Link, useLocation } from 'react-router-dom';
import { useStateValue } from '../../../../StateProvider';
import { query, onSnapshot, collection, orderBy } from 'firebase/firestore';

import { Avatar } from '@material-ui/core';

function SidebarChat({ id, name, profileImage }) {
    const { pathname } = useLocation();
    const [messages, setMessages] = useState("");
    const [{ user }] = useStateValue();

    useEffect(() => {
        if (id) {
            getMessages();
        }
    }, [id])

    const getMessages = async () => {
        const messagesRef = collection(db, "users", `${user.uid}`, "Inbox", `${id}`, "Messages");
        const q = query(messagesRef, orderBy("timestamp", "desc"));
        const unsub = onSnapshot(q, (snapshot) =>
            setMessages(snapshot.docs.map((doc) => doc.data())))
        return unsub;
    }

    return (
        <Link to={`/messages/${id}`}>
            <div className={pathname === `/messages/${id}` ? "activeSidebarChat": "sidebarChat"}>
                <div>
                    <Avatar className="avatar" src={profileImage} />
                </div>
                <div className="sidebarInfo">
                    <h2>{name}</h2>
                    <p className="sidebarMessage">{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    );
}

export default SidebarChat
