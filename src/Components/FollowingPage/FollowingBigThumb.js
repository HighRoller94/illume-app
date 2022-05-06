import React from 'react';
import { Link } from 'react-router-dom';

function FollowingBigThumb({ username, uid, profileImage }) {
    return (
        <Link to={`/profile/${uid}`} >
            <div className="followingbigthumb">
                <img className="following_profileImg" src={profileImage} alt="" />
                <p><strong>{username}</strong></p>
            </div>
        </Link>
    )
}

export default FollowingBigThumb
