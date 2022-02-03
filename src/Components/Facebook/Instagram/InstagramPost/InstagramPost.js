import React from 'react'

import './InstagramPost.css'

function InstagramPost({ id, profilepic, instaName, timestamp, likes, picture, message}) {
    return (
        <div className="instapost">
            <div className="instapost_header">
                <img className="instapost_profilePic" src={profilepic} />
                <div className="instapost_title">
                    <h1>{instaName}</h1>
                    <p>Posted at {timestamp}</p>
                </div>
            </div>
                <img className="instapost_image" src={picture} />
            <p className="instapost_body">{message}</p>
            <p className="instapost_likes">{likes} likes</p>
            <form className="instapost_commentBox">
                <input className="instapost_input" type="text" placeholder="Add a comment..." />
                <button className="instapost_button" type="submit" >Post</button>
            </form>
        </div>
    )
}

export default InstagramPost
