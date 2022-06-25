import React, { useState, useEffect } from 'react'
import { useStateValue } from '../../../StateProvider'
import { db } from '../../../firebase'

import ChatIcon from '@material-ui/icons/Chat';
import DashboardIcon from '@material-ui/icons/Dashboard';
import StorefrontIcon from '@material-ui/icons/Storefront';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

import logo from '../../../Assets/Images/logo.png'

import SideBarRow from './SideBarRow'

function SideBar() {
    const [{ user }] = useStateValue()

    const [profileImage, setProfileImage] = useState("");
    useEffect(() => {
        db
            .collection('users')
            .doc(user.uid)
            .onSnapshot((snapshot) => 
                setProfileImage(snapshot.data().profileImage))
    }, [])
    
    return (
        <div className="sidebar">
            <SideBarRow link={`/profile/${user.uid}`} title={user.displayName} src={profileImage}/>
            <SideBarRow link={'/explore'} src={logo} title="Explore"/>
            <SideBarRow link={'/dashboard'} Icon={DashboardIcon} title="Dashboard"/>
            <SideBarRow link={`/inbox/${user.uid}`} Icon={ChatIcon} title="Inbox"/>
            <SideBarRow link={'/marketplace'} Icon={StorefrontIcon} title="Marketplace"/>
            <SideBarRow link={'/illumegallery'} Icon={PhotoLibraryIcon} title="Illume Gallery"/>
        </div>
    )
}

export default SideBar