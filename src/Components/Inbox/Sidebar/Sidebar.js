import React, { useEffect, useState } from 'react';
import { useStateValue } from '../../../StateProvider';
import { db } from '../../../firebase'
import { doc, getDoc } from 'firebase/firestore';

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
        getUserImage();
    }, [])

    const getUserImage = async () => {
        const userRef =  doc(db, "users", `${user.uid}`)
        const unsub = await getDoc(userRef)
            .then((doc) => {
                setProfileImage(doc.data().profileImage)
            })
        return unsub;
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
                <FollowingChat users={users}/>
            </div>
        </div>
    );
}

export default Sidebar