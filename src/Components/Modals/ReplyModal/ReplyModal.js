import React, { useState, useEffect, useRef } from 'react';
import { db, storage } from '../../../firebase';
import firebase from 'firebase'
import { useStateValue } from '../../../StateProvider';
import { useParams } from "react-router-dom";

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

function ReplyModal({ replyopen, setReplyOpen, listingId }) {
    const [{ user }] = useStateValue();
    const { uid } = useParams()
    const [attachment, setAttachment] = useState('');
    const [description, setDescription] = useState('');
    const [experience, setExperience] = useState('')
    const [relevantskills, setRelevantSkills] = useState('');
    const [profileImage, setProfileImage] = useState("");
    const fileInputRef = useRef()
    const classes = useStyles();

    const handleClose = () => {
        setReplyOpen(false);
    };

    useEffect(() => {
        db
            .collection('users')
            .doc(user.uid)
            .onSnapshot((snapshot) => 
                setProfileImage(snapshot.data().profileImage))
    }, [])

    const handleChange = (e) => {
        e.preventDefault();
        fileInputRef.current.click();
    };

    const uploadAttachment = (e) => {
        if (e.target.files[0]) {
            setAttachment(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (!attachment) {
            db
                .collection("users")
                .doc(uid)
                .collection("Job Listings")
                .doc(listingId)
                .collection("Replies")
                .doc(user.uid)
                .set({
                    name: user.displayName,
                    usernameuid: user.uid,
                    description: description,
                    experience: experience,
                    skills: relevantskills,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });
                setDescription('')
                setExperience('')
                setRelevantSkills('')
                setReplyOpen(false)
            } else {
                const uploadTask = storage.ref(`user/${user.uid}/attachments/${attachment.name}`).put(attachment);

                uploadTask.on(
                    "state_changed",
                        () => {
                            // Complete upload function for image
                            storage
                                .ref(`user/${user.uid}/attachments/`)
                                .child(attachment.name)
                                .getDownloadURL()
                                .then(url => {
                                    db
                                        .collection("users")
                                        .doc(uid)
                                        .collection("Job Listings")
                                        .doc(listingId)
                                        .collection("Replies")
                                        .add({
                                            name: user.displayName,
                                            usernameuid: user.uid,
                                            description: description,
                                            experience: experience,
                                            skills: relevantskills,
                                            attachments: url,
                                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                        });
                                    }
                                )}
                                )}
                                // Reset and close upload form when upload complete
                                    setDescription('')
                                    setExperience('')
                                    setRelevantSkills('')
                                    setReplyOpen(false)
    }
    

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
                <div className="reply_modal">
                    <div className="profile_col">
                        <h1>{user.displayName}</h1>
                        <img src={profileImage} />
                        <button onClick={handleChange} >Attach CV</button>
                        <input 
                                type="file" 
                                style={{ display: "none"}} 
                                ref={fileInputRef} 
                                onChange={uploadAttachment}
                            />
                    </div>
                    <div className="info_col">
                        <h1>Reply to Listing</h1>
                        <p>Background</p>
                        <textarea rows="6" cols="6" placeholder="Give a quick description of yourself" onChange={event => setDescription(event.target.value)} value={description} />
                        <p>Relevant Skills</p>
                        <input type="text" placeholder="Relevant skills" onChange={event => setRelevantSkills(event.target.value)} value={relevantskills} />
                        <p>Experience</p>
                        <input type="text" placeholder="Done this before? It's ok if you havn't!" onChange={event => setExperience(event.target.value)} value={experience} />
                        <button type="submit" onClick={handleUpload}>Reply</button>
                    </div>
                </div>
            </Fade>
        </Modal>
    </div>
    )

}

export default ReplyModal
