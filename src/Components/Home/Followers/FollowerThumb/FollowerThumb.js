import React from 'react';
import { Link } from "react-router-dom";

function FollowerThumb({ username, uid, profileImage }) {
    return (
        <div>
            <Link to={`/profile/${uid}`}>
            <div className="followerthumb">
                <img className="follower_image" src={profileImage} alt="" />
                <p>{username}</p>
            </div>
        </Link>
        </div>
    )
}

export default FollowerThumb
