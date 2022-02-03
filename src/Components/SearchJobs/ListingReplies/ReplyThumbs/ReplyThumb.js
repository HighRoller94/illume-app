import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import ListingReplyModal from '../ListingReplyModal/ListingReplyModal'

import './ReplyThumb.css'

function ReplyThumb({ usernameuid, name, listingId, description, timestamp }) {
    const [replyopen, setReplyOpen] = useState(false);

    const handleReplyOpen = () => {
        setReplyOpen(true)
    }
    
    return (
        <div className="reply_thumb">
            <div className="reply_row">
                <h1>{name}</h1>
                <p>{moment(timestamp.toDate()).calendar()}</p>
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
