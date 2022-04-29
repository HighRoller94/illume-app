import React, { useState, useRef, useEffect } from 'react';
import { storage, db } from '../../firebase';
import firebase from 'firebase'
import { useStateValue } from '../../StateProvider';
import ReactPlayer from "react-player";

import { Button } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddPost from '../../../Images/AddPost.png';

import './UploadPost.css'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
}));

function UploadPost() {
    const [body, setBody] = useState('');
    const [preview, setPreview] = useState();
    const [image, setImage] = useState();
    const [{ user }] = useStateValue();
    const hiddenFileInput = useRef(null);
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    const [progress, setProgress] = useState(0);
    const [media, setMedia] = useState();

    const handleClose = () => {
        // Will close modal
            setOpen(false);
            setPreview(null);
    };

    const handleChecked = (event) => {
        // Checks if the gallery post box is also checked
        setChecked(event.target.checked);
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.substr(0,5) === "image") {
            setImage(e.target.files[0]);
        } else {
            setMedia(e.target.files[0]);
        }}

    const handleUpload = () => {
        // If there's no image will post normal post
        if (!image && !media) {
            db
                .collection("users")
                .doc(user.uid)
                .collection("Posts")
                .add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    body: body,
                    username: user.displayName,
                    usernameuid: user.uid
                });
                setBody("")
                handleClose();
        } else {
            // If image is uploaded continue with alternate function
            if (media) {
                const uploadTask = storage.ref(`user/${user.uid}/postmedia/${media.name}`).put(media);
                uploadTask.on (
                    "state_changed",
                    (snapshot) => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        setProgress(progress);
                    },
                    (error) => {
                        console.log(error)
                        alert(error.message)
                    },
                    () => {
                        storage
                            .ref(`user/${user.uid}/postmedia/`)
                            .child(media.name)
                            .getDownloadURL()
                            .then(url => {
                                db
                                    .collection("users")
                                    .doc(user.uid)
                                    .collection("Posts")
                                    .add({
                                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                        body: body,
                                        username: user.displayName,
                                        usernameuid: user.uid,
                                        media: url
                                    });
                            })
                            setProgress(0);
                            setBody("");
                            setMedia(null);
                            handleClose();
                    }
                )
            } else {
            // This uploads the file to firebase storage
            const uploadTask = storage.ref(`user/${user.uid}/postimages/${image.name}`).put(image);
            uploadTask.on(
            "state_changed",
            (snapshot) => {
                //Setting the progress visuals for upload
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error)
                alert(error.message);
            },
                () => {
                    
                    // Complete upload function for image
                    storage
                        .ref(`user/${user.uid}/postimages/`)
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            // Post upload to db, grabbing url from 'getDownloadUrl()'
                            db
                                .collection("users")
                                .doc(user.uid)
                                .collection("Posts")
                                .add({
                                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                    body: body,
                                    username: user.displayName,
                                    usernameuid: user.uid,
                                    imageUrl: url
                                });
                            }
                        )}
                        )}
                        // Reset and close upload form when upload complete
                        
                            setProgress(0);
                            setBody("");
                            setImage(null);
                            setOpen(false);
        }
    }

    const checkedGalleryPost = () => {
        // If box is checked will also run this function and upload to gallery
        if (checked) {
        const uploadTask = storage.ref(`user/${user.uid}/galleryimages/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            () => {
                storage
                        .ref(`user/${user.uid}/galleryimages/`)
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            db
                                .collection("users")
                                .doc(user.uid)
                                .collection("Gallery Posts")
                                .add({
                                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                    body: body,
                                    imageUrl: url,
                                    username: user.displayName,
                                    usernameuid: user.uid
                                })
                        })
            }  
        )
        }
    }
    
    useEffect(() => {
        // Sets the image preview (if one is found)
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(image);
        } else {
            setPreview(null)
        }
    }, [image]);

    return (
        <div>
                <div className="uploadbutton">
                    <Button style={{ backgroundColor: 'transparent' }} className="uploadbutton" onClick={() => setOpen(true)}>
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
                    <div className="uploadwindow">
                        <div className="addnewpost">
                            <h2>Add New Post</h2>
                            <input type="text" placeholder="What's on your mind?" onChange={event => setBody(event.target.value)} value={body} />
                        </div>
                        <div className="preview">
                            {media ? (
                                <ReactPlayer
                                    className="preview_player"
                                    url={media}
                                    width="600px"
                                    height="400px"
                                    controls={true}
                                />
                            ) : (null)}
                            {preview ? (
                                <div className="checkgallery_post">
                                    <img src={preview} />
                                    <p><strong>Upload to Gallery</strong></p>
                                    <Checkbox
                                        onClick={handleChecked}
                                        className="checkbox"
                                        color="default"
                                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                                    />
                                </div>
                            ) : (null)}
                        </div>
                        {progress ? (
                            <progress value={progress} max="100" />
                        ) : (null)}
                        <input type="file" onChange={handleChange} style={{ display: "none" }} ref={hiddenFileInput} />
                        <div className="postbuttons">
                            <Button onClick={e => hiddenFileInput.current.click()}>
                                <ImageIcon />
                            </Button>
                            <Button 
                                disabled={!body} onClick={() => { handleUpload(); checkedGalleryPost(); }}>
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

export default UploadPost
