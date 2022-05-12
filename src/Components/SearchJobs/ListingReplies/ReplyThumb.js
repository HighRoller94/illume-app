import React, { useState } from 'react'
import { Link } from "react-router-dom";

import ListingReplyModal from '../../Modals/ListingReplyModal/ListingReplyModal'

function ReplyThumb({ usernameuid, name, listingId, description, timestamp }) {
    const [replyopen, setReplyOpen] = useState(false);

    const handleReplyOpen = () => {
        setReplyOpen(true)
    }
    
    return (
        <div className="reply_thumb">
            <div className="reply_row">
                <h1>{name}</h1>
                <p>{timestamp}</p>
                <div className="view_reply">
                <button className="details_button" type="submit" onClick={handleReplyOpen}>View Reply</button>
                </div>
            </div>
            <div className="reply_desc">
                <p>{description}</p>
            </div>

            <ListingReplyModal 
                usernameuid = { usernameuid }
                listingId = { listingId }
                replyopen = { replyopen }
                setReplyOpen = { setReplyOpen }
            />

        </div>
    )
}

export default ReplyThumb
