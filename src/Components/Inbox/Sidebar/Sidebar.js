import React, { useEffect, useState } from 'react';
import { useStateValue } from '../../../StateProvider';
import { auth, db } from '../../../firebase'
import { collection, getDocs } from "firebase/firestore"; 

import userProfile from '../../../Assets/Images/userProfile.png';
import newMessage from '../../../Assets/Icons/newMessage.svg';

import Avatar from '@material-ui/core/Avatar';

import PersonIcon from '@material-ui/icons/Person';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

import FollowingChat from './FollowingChat/FollowingChat'

import { SearchOutlined } from '@material-ui/icons';

function Sidebar() {
    const [{ user, basket }] = useStateValue();
    const [profileImage, setProfileImage] = useState("");
    const [status, setStatus] = useState(true);
    const [messageUsers, setMessageUsers] = useState([]);
    const [users, setUsers] = useState([]);

    const toggleStatus = () => {
        setStatus(!status)
    }

    useEffect(() => {
        db.collection('users').doc(user.uid)
            .onSnapshot((snapshot) => 
                setProfileImage(snapshot.data().profileImage)
            )

        getInboxMessages();
    }, [])

    
    const getInboxMessages = () => {
        const subColRef = collection(db, "users", `${user.uid}`, "Inbox")
        getDocs(subColRef).then((snapshot) => {
            console.log(snapshot.docs)
        })

    }

    return (
        <div className="sidebar_Chat">
            <div className="sidebar_head">
                <div className="sidebar_heading">
                    {profileImage ? (
                        <Avatar className="avatar" src={profileImage} />
                    ) : (
                        <Avatar className="avatar" src={userProfile} />
                    )}
                    <div className="sidebar__User">
                        <h1>{user.displayName}</h1>
                        {status ? (
                            <div onClick={toggleStatus} className="user__Status">
                                <div className="user__Available"/>
                                <p>Available</p>
                            </div>
                        ) : (
                            <div onClick={toggleStatus} className="user__Status">
                                <div className="user__Unavailable"/>
                                <p>Unavailable</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search inbox" type="text" />
                </div>
            </div>
            <div className="sidebar_chats">
                <FollowingChat />
            </div>
        </div>
    );
}

export default Sidebar