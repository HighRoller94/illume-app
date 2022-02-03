import React, { useState, useRef } from 'react';
import { db } from '../../../firebase';
import firebase from 'firebase'
import { useStateValue } from '../../../StateProvider';

import { Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddPost from '../../../Images/AddPost.png';

import './AddJobListing.css'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
}));

function AddJobListing() {
    const [position, setPosition] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [jobtype, setJobType] = useState('');
    const [salary, setSalary] = useState('');
    const [{ user }] = useStateValue();
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpload = () => {

            db
                .collection("users")
                .doc(user.uid)
                .collection("Job Listings")
                .add({
                    posted_by: user.displayName,
                    usernameuid: user.uid,
                    position: position,
                    location: location,
                    description: description,
                    job_type: jobtype,
                    salary: salary,
                    date_posted: firebase.firestore.FieldValue.serverTimestamp(),
                });
                setDescription("")
                setLocation("")
                setPosition("")
                setJobType("")
                setSalary("")
    }

    return (
        <div>
            <div className="addjob">
                <Button style={{ backgroundColor: 'transparent' }} classname="addjobbutton" onClick={() => setOpen(true)}>
                    <img className="homepost_button" src={AddPost} alt=""/>
                </Button>
            </div>
                <div>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}
                    >
                    <Fade in={open}>
                        <div className="listing_modal">
                            <div className="new_listing">
                                <h2>Add New Listing</h2>
                                <p>Position</p>
                                <input type="text" placeholder="What's the position?" onChange={event => setPosition(event.target.value)} value={position} />
                                <p>Location</p>
                                <input type="text" placeholder="Where is it based?" onChange={event => setLocation(event.target.value)} value={location} />
                                <p>Description</p>
                                <textarea rows="5" cols="5" placeholder="Breakdown of the position" onChange={event => setDescription(event.target.value)} value={description} />
                                <div className="secondary_details">
                                    <div className="details">
                                        <p>Job Type</p>
                                        <input type="text" placeholder="Permanent" onChange={event => setJobType(event.target.value)} value={jobtype} />
                                    </div>
                                    <div className="details">
                                        <p>Salary</p>
                                        <input type="text" placeholder="Salary" onChange={event => setSalary(event.target.value)} value={salary} />
                                    </div>
                                </div>
                            </div>
                            <div className="listing_add">
                                <Button 
                                    disabled={!position} onClick={() => { handleUpload(); setOpen(false); }}>
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

export default AddJobListing
