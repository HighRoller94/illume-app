import React, { useState, useEffect } from 'react';
import { db } from '../../../../firebase';
import firebase from 'firebase/compat/app';
import { useStateValue } from '../../../../StateProvider';

import { Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
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

function EditListingModal({ editopen, setEditOpen, listingId }) {
    const [updatedposition, setUpdatedPosition] = useState('');
    const [updatedlocation, setUpdatedLocation] = useState('');
    const [updateddescription, setUpdatedDescription] = useState('');
    const [updatedjobtype, setUpdatedJobType] = useState('');
    const [updatedsalary, setUpdatedSalary] = useState('');
    const [{ user }] = useStateValue();
    const classes = useStyles();
    const [postdata, setPostData] = useState([]);

    useEffect(() => {
        // Load existing post data using listingId
        db
            .collection("users")
            .doc(user.uid)
            .collection("Job Listings")
            .doc(listingId)
            .get()
            .then(doc => {
                const postdata = doc.data()
                setPostData({ ...postdata })
            })
    }, [listingId])

    const handleClose = () => {
        setEditOpen(false);
    };

    const handleEdit = () => {
            db
                .collection("users")
                .doc(user.uid)
                .collection("Job Listings")
                .doc(listingId)
                .update({
                    posted_by: user.displayName,
                    usernameuid: user.uid,
                    position: updatedposition || postdata.position,
                    location: updatedlocation || postdata.location,
                    description: updateddescription || postdata.description,
                    job_type: updatedjobtype || postdata.job_type,
                    salary: updatedsalary || postdata.salary,
                    date_posted: firebase.firestore.FieldValue.serverTimestamp(),
                });
                setUpdatedDescription("")
                setUpdatedLocation("")
                setUpdatedPosition("")
                setUpdatedJobType("")
                setUpdatedSalary("")
                setEditOpen(false)
    }

    return (
        <div>
                <div>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={editopen}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}
                    >
                    <Fade in={editopen}>
                        <div className="listing_modal">
                            <div className="new_listing">
                                <h2>Edit Listing</h2>
                                <p>Position</p>
                                <input type="text" placeholder={postdata.position} onChange={event => setUpdatedPosition(event.target.value)} value={updatedposition} />
                                <p>Location</p>
                                <input type="text" placeholder={postdata.location} onChange={event => setUpdatedLocation(event.target.value)} value={updatedlocation} />
                                <p>Description</p>
                                <textarea rows="5" cols="5" placeholder={postdata.description} onChange={event => setUpdatedDescription(event.target.value)} value={updateddescription} />
                                <div className="secondary_details">
                                    <div className="details">
                                        <p>Job Type</p>
                                        <input type="text" placeholder={postdata.job_type} onChange={event => setUpdatedJobType(event.target.value)} value={updatedjobtype} />
                                    </div>
                                    <div className="details">
                                        <p>Salary</p>
                                        <input type="text" placeholder={postdata.salary} onChange={event => setUpdatedSalary(event.target.value)} value={updatedsalary} />
                                    </div>
                                </div>
                            </div>
                            <div className="listing_add">
                                <Button 
                                    disabled={!postdata.position} onClick={() => { handleEdit(); }}>
                                    <AddCircleIcon />
                                </Button>
                            </div>
                        </div>
                    </Fade>
                </Modal>
            </div>            
        </div>
    )
}

export default EditListingModal
