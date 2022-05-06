import React from 'react';

function FacebookPost({ message, picture, fbName, profilepic, date }) {
    return (
        <div className="facebookpost">
            <div className="facebookpost_header">
                <img className="facebook_profilepic" src={profilepic} />
                <div className="facebook_title">
                    <h1>{fbName}</h1>
                    <p>Posted at {date}</p>
                </div>
            </div>
            <img className="facebookpost_image" src={picture} />
            <p className="facebookpost_body">{message}</p>
            <form className="facebookpost_commentBox">
                <input className="facebookpost_input" type="text" placeholder="Add a comment..." />
                <button className="facebookpost_button" type="submit" >Post</button>
            </form>
        </div>
    )
}

export default FacebookPost