import React, { useState }from 'react'
import ReactPlayer from "react-player";

import LandingPostModal from '../LandingPostModal/LandingPostModal'

import './Post.css'

function Post({ imageUrl, body, username, media, usernameuid, galleryPostId}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="post_thumbs">
            <div className="thumb">
                {imageUrl ? (
                    <img src={imageUrl} onClick={() => setOpen(true)}/>
                ) : (
                    <div className="landingpost_video">
                            <ReactPlayer
                                className="react-player"
                                url={media}
                                light= { true }
                                width="100%"
                                height="100%"
                                onClick={() => setOpen(true)} 
                            />
                        </div>
                )}
            </div>

            <LandingPostModal 
                open={open} 
                setOpen={setOpen} 
                galleryPostId = {galleryPostId} 
                usernameuid = {usernameuid} 
            />

        </div>
    )
}

export default Post
