import React, { useEffect, useState } from 'react';
import { useStateValue } from '../../../StateProvider';
import { auth, db } from '../../../firebase'

import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu';

import PersonIcon from '@material-ui/icons/Person';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

import FollowingChat from './FollowingChat/FollowingChat'

import { SearchOutlined } from '@material-ui/icons';

function Sidebar() {
    const [{ user, basket }] = useStateValue();
    const [profileImage, setProfileImage] = useState("");

    useEffect(() => {
        db
            .collection('users')
            .doc(user.uid)
            .onSnapshot((snapshot) => 
                setProfileImage(snapshot.data().profileImage))
    }, [])

    return (
        <div className="sidebar_chat">
            <div className="sidebar_header">
                <div className="sidebar_headerRight">
                    <div className="followers_button"> 
                        <button><PersonIcon /></button>
                    </div>
                </div>
            </div>
        <div className="sidebar_search">
            <div className="sidebar_searchContainer">
                <SearchOutlined />
                <input placeholder="Search or start new chat" type="text" />
            </div>
        </div>
        <div className="sidebar_chats">
            <FollowingChat />
        </div>
    </div>
    );
}

export default Sidebar