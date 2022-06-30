import React, { useEffect, useState } from 'react';
import { db } from '../../../../firebase';
import { Link, useLocation } from 'react-router-dom';
import { useStateValue } from '../../../../StateProvider';

import { Avatar } from '@material-ui/core';

function SidebarChat({ id, name, profileImage }) {
    const { pathname } = useLocation();
    
    const [messages, setMessages] = useState("");
    const [{ user }] = useStateValue();

    useEffect(() => {
        if (id) {
            db
            .collection('users')
            .doc(user.uid)
            .collection('Inbox')
            .doc(id)
            .collection('Messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => 
                setMessages(snapshot.docs.map((doc) => doc.data()))
            );
        }
    }, [id])

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
