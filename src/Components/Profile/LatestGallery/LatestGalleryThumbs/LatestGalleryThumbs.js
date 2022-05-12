import React from 'react'
import { Link } from "react-router-dom";

function LatestGalleryThumbs({imageUrl, id, usernameuid}) {
    return (
        <Link to={`/gallery/${usernameuid}`} >
            <div className="galthumbs">
                <img className="latest_img" src={imageUrl} />
            </div>
        </Link>
    )
}

export default LatestGalleryThumbs
