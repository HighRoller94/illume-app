import React, { useState, useEffect } from 'react'
import { db } from '../../../firebase'
import { useParams, useHistory, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useStateValue } from '../../../StateProvider';
import { moment } from 'moment'

import EditListingModal from '../JobListings/EditListingModal/EditListingModal'
import ReplyModal from '../ReplyModal/ReplyModal'

import './JobDetails.css'

function JobDetails() {
    const history = useHistory();
    const [{ user }] = useStateValue()
    const { uid } = useParams()
    const { listingId } = useParams()
    const [postdata, setPostData] = useState([])
    const [editopen, setEditOpen] = useState(false);
    const [replyopen, setReplyOpen] = useState(false);

    useEffect( () => {
        db
            .collection("users")
            .doc(uid)
            .collection("Job Listings")
            .doc(listingId)
            .get()
            .then(doc => {
                const data = doc.data()
                setPostData({ ...data })
            })
    }, [])

    const handleOpen = () => {
        setEditOpen(true)
    }

    const handleReplyOpen = () => {
        setReplyOpen(true)
    }
    
    const handleDelete = () => {
        db
            .collection("users")
            .doc(user.uid)
            .collection("Job Listings")
            .doc(listingId)
            .delete()

            history.push('/myjobs')
    };

    return (
        <motion.div 
            className="container"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            >
                <div className="jobinfo">
                    <h1>{postdata.position}</h1>
                    <p>{postdata.description}</p>
                </div>
                <div className="job_breakdown">
                    <div className="breakdown_buttons">
                        {postdata.usernameuid === user.uid ? (
                        <div className="listing_buttons">
                            <Link to={`/listingreplies/${listingId}`}>
                                <button className="edit_listing">View Replies</button>
                            </Link>
                            <button className="edit_listing" type="submit" onClick={handleOpen}>Edit Listing</button>
                            <button className="edit_listing" type="submit" onClick={handleDelete}>Delete Listing</button>
                        </div>
                        ) : 
                        <button className="reply_listing" type="submit" onClick={handleReplyOpen} >Reply to Listing</button>
                        }
                        
                    </div>
                    <div className="breakdown">
                        <h1>Salary</h1>
                        <p>Annually</p>
                        <p>{postdata.salary}</p>
                        <h1>Location</h1>
                        <p>{postdata.location}</p>
                        <h1>Job Type</h1>
                        <p>{postdata.job_type}</p>
                        <h1>Date Posted</h1>
                        <p>{new Date(postdata.date_posted?.toDate()).toUTCString()}</p>
                        <h1>Start Date</h1>
                        <p>ASAP</p>
                        <h1>Listed By</h1>
                        <p>{postdata.posted_by}</p>
                    </div>
                    
                </div>

                <EditListingModal
                    editopen = { editopen }
                    setEditOpen = { setEditOpen }
                    listingId = { listingId }
                />
                
                <ReplyModal 
                    replyopen = { replyopen }
                    listingId = { listingId }
                    setReplyOpen = { setReplyOpen }
                />

        </motion.div>
    )
}

export default JobDetails
