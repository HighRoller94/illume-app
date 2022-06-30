import React, { useState, useRef, useEffect } from 'react';
import { storage, db } from '../../../firebase';
import firebase from 'firebase/compat/app'
import { getDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { useStateValue } from '../../../StateProvider';

import { Button } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
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

function EditGalleryPostModal({ editopen, setEditOpen, galleryPostId }) {

    const classes = useStyles();
    const [preview, setPreview] = useState();
    const [image, setImage] = useState();
    const [{ user }] = useStateValue();
    const hiddenFileInput = useRef(null);
    const [updatedbody, setUpdatedBody] = useState('');
    const [progress, setProgress] = useState(0);
    const [postdata, setPostData] = useState([]);

    useEffect(() => {
        // Load existing post data using postId
        const postRef = doc(db, 'users', `${user.uid}`, "Gallery Posts", `${galleryPostId}`);
        const unsub = getDoc(postRef)
        .then((doc) => {
            setPostData(doc.data())
            }
        )
        return unsub;
    }, [])

    const handleClose = () => {
        // Will close modal
            setEditOpen(false);
            setPreview(null);
    };

    const handleChange = (e) => {
        // Picks the first file selected (if updating image)
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleEdit = () => {
            // This uploads the file to firebase storage
            if (!image) {
                const postRef = doc(db, 'users', `${user.uid}`, "Gallery Posts", `${galleryPostId}`)
                updateDoc(postRef, {
                    timestamp: serverTimestamp(),
                    body: updatedbody,
                    username: user.displayName,
                    usernameuid: user.uid
                })
                handleClose();
            } else {
            const uploadTask = storage.ref(`user/${user.uid}/gallerypostimages/${image.name}`).put(image);
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
                        .ref(`user/${user.uid}/gallerypostimages/`)
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            // Post upload to db, grabbing url from 'getDownloadUrl()'
                            db
                                .collection("users")
                                .doc(user.uid)
                                .collection("Gallery Posts")
                                .doc(galleryPostId)
                                .update({
                                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                    body: updatedbody || postdata.body,
                                    username: user.displayName,
                                    usernameuid: user.uid,
                                    imageUrl: url
                                });
                            }
                        )}
                        )
                        // Reset and close upload form when upload complete
                        
                            setProgress(0);
                            setUpdatedBody("");
                            setImage(null);
                            setEditOpen(false)
                }
    };
    
    useEffect(() => {
        // Sets the image preview (if one is found)
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(image);
        } else {
            setPreview(null);
        }
    }, [image]);

    return (
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
                    <div className="modalwindow">
                        <div className="addnewpost">
                            <h2>Edit Post</h2>
                            <input type="text" placeholder={postdata.body} onChange={event => setUpdatedBody(event.target.value)} value={updatedbody} />
                        </div>
                        <div className="preview">
                            {preview || postdata.imageUrl ? (
                                <div className="checkgallery_post">
                                    <img src={preview || postdata.imageUrl} />
                                </div>
                            ) : (
                                null
                            )}
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
                                disabled={!postdata.imageUrl && !postdata.media} onClick={() => { handleEdit(); }}>
                                <AddCircleIcon />
                            </Button>
                        </div>
                    </div>
                    </Fade>
                </Modal>
        </div>
    )
}

export default EditGalleryPostModal
