import React from 'react'
import { Link } from 'react-router-dom'

import './FollowersBigThumb.css'

function FollowersBigThumb({ username, uid, profileImage }) {
    return (
        <Link to={`/profile/${uid}`} >
            <div className="followersbigthumb">
                <img className="followers_profileImg" src={profileImage} alt="" />
                <p><strong>{username}</strong></p>
            </div>
        </Link>
    )
}

export default FollowersBigThumb
