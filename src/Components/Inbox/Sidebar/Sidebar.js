import React, { useEffect, useState, Component } from 'react';
import "./Sidebar.css";

import PersonIcon from '@material-ui/icons/Person';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

import FollowingChat from './FollowingChat/FollowingChat'
import Rooms from './Rooms/Rooms'

import { SearchOutlined } from '@material-ui/icons';

class Sidebar extends Component {

    state = {
        visible: false,
    }

    render () {
        return (
            <div className="sidebar_chat">
                <div className="sidebar_header">
                    <div className="sidebar_headerRight">
                        <div className="followers_button"> 
                        {this.state.visible ? (
                            <button onClick={() => {this.setState({ visible: !this.state.visible });}} ><PeopleAltIcon /></button>
                        ) : (
                            <button onClick={() => {this.setState({ visible: !this.state.visible });}} ><PersonIcon /></button>
                        )}
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
                {this.state.visible ? <Rooms /> : <FollowingChat />}
            </div>
        </div>
        );
    }
}

export default Sidebar