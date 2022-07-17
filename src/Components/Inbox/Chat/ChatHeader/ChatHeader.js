import React from 'react'
import { useParams, Link } from "react-router-dom";
import { Avatar, IconButton } from '@material-ui/core';
import { Videocam, MoreVert, Phone } from '@material-ui/icons';

function ChatHeader({ userData }) {
    const { uid } = useParams();

    return (
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
    )
}

export default ChatHeader