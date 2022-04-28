import React from 'react';
import { Link } from 'react-router-dom';
import './FollowingThumb.css';

function FollowingThumb({ username, uid, profileImage }) {

    return (
        <Link to={`/profile/${uid}`}>
            <div className="followingthumb">
                <img className="following_image" src={profileImage} alt="" />
                <p>{username}</p>
            </div>
        </Link>
    )
}

export default FollowingThumb
