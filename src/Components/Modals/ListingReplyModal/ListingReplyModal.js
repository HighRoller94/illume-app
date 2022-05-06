import React, { useState, useEffect, useRef } from 'react';
import { db, storage } from '../../../firebase';
import { useStateValue } from '../../../StateProvider';
import { useParams, Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

function ListingReplyModal({ usernameuid, replyopen, setReplyOpen }) {
    const [{ user }] = useStateValue()
    const { listingId } = useParams()
    const [profileImage, setProfileImage] = useState("");
    const [replydata, setReplyData] = useState([])
    const fileInputRef = useRef()
    const classes = useStyles();

    const handleClose = () => {
        setReplyOpen(false);
    };

    useEffect( () => {
        db
            .collection("users")
            .doc(user.uid)
            .collection("Job Listings")
            .doc(listingId)
            .collection("Replies")
            .doc(usernameuid)
            .get()
            .then(doc => {
                const data = doc.data()
                setReplyData({ ...data })
            })
    }, [usernameuid])

    useEffect(() => {
        db
            .collection('users')
            .doc(usernameuid)
            .onSnapshot((snapshot) => 
                setProfileImage(snapshot.data().profileImage))
    }, [usernameuid])

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={replyopen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
                >
                <Fade in={replyopen}>
                    <div className="listingreply_modal">
                        <div className="reply_profile">
                            <h1>{replydata.name}</h1>
                            <img src={profileImage} alt="" />
                            <button>View CV</button>
                        </div>
                        <div className="reply_details">
                            <h4>Message</h4>
                            <p className="reply_desc">{replydata.description}</p>
                            <h4>Relevant Skills</h4>
                            <p className="reply_skills">{replydata.skills}</p>
                            <h4>Experience</h4>
                            <p className="reply_exp">{replydata.experience}</p>
                            <Link to={`/profile/${usernameuid}`}>
                                <button className="view_profile">View Profile</button>
                            </Link>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default ListingReplyModal
