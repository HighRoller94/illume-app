import React from 'react'
import { Link } from 'react-router-dom'

import './ExploreThumbs.css'

function ExploreThumbs({ username, uid, profileImage }) {
    return (
        <div>
            <Link to={`/profile/${uid}`} >
            <div className="explorebigthumb">
                <img className="explorethumb_profileImg" src={profileImage} alt="" />
                <p><strong>{username}</strong></p>
            </div>
        </Link>
        </div>
    )
}

export default ExploreThumbs
