import React, { useState, useRef, useEffect } from 'react';
import { storage, db } from '../../firebase';
import firebase from 'firebase';
import { useStateValue } from '../../StateProvider';

import { Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import ImageIcon from '@material-ui/icons/Image';
import Fade from '@material-ui/core/Fade';
import AddPost from '../../Assets/Images/AddPost.png';
import ForwardSharpIcon from '@material-ui/icons/ForwardSharp';

import AddStorePostModal from './AddStorePostModal';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function UploadGalleryPost() {
    const [body, setBody] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [{ user }] = useStateValue();
    const [preview, setPreview] = useState();
    const [checked, setChecked] = useState(false);
    const [open, setOpen] = useState(false);
    const [storeopen, setStoreOpen] = useState(false);
    const classes = useStyles();
    const hiddenFileInput = useRef(null);
    const [media, setMedia] = useState();
    
    const handleClose = () => {
        setOpen(false);
        setPreview(null);
        setChecked(false);
        setImage(null);
        setStoreOpen(false);
    };

    const handleChecked = (event) => {
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
        if (media) {
        const uploadTask = storage.ref(`user/${user.uid}/gallerymedia/${media.name}`).put(media);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
            },
            () => {
                storage
                    .ref(`user/${user.uid}/gallerymedia/`)
                    .child(media.name)
                    .getDownloadURL()
                    .then(url => {
                        db
                            .collection("users")
                            .doc(user.uid)
                            .collection("Gallery Posts")
                            .add({
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                body: body,
                                media: url,
                                username: user.displayName,
                                usernameuid: user.uid
                        });
                        setBody("")
                        setImage(null)
                        setMedia(null)
                        setOpen(false)
                    })
            }
        )
        } else {
        const uploadTask = storage.ref(`user/${user.uid}/galleryimages/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
            },
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
                        });
                        setBody("")
                        setImage(null)
                        setOpen(false)
                    })
            }
        )
    }}
    
    useEffect(() => {

        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(image);
            console.log(checked)
        } else {
            setPreview(null);
        }

    }, [image]);


    return (
        <div>
                <Button style={{ backgroundColor: 'transparent' }} onClick={() => setOpen(true)}><img className="gallerypost_button" src={AddPost} alt="" /></Button>
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
                        <div className="modalwindow">
                            <div className="addnewpost">
                                <h2>Upload to Gallery</h2>
                                <input type="text" placeholder="My first post" onChange={event => setBody(event.target.value)} value={body} />
                            </div>
                            <div className="preview">
                            {preview ? (
                                <div className="checkgallery_post">
                                    <img src={preview} />
                                    <p className="checkbox_title"><strong>Store Post</strong></p>
                                    <Checkbox
                                        style={{ marginBottom: '-15px' }}
                                        onClick={handleChecked}
                                        className="checkbox"
                                        color="default"
                                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                                    />
                                </div>
                                ) : (null)}
                            </div>
                            <div className="gallery_postbuttons">
                                <input type="file" onChange={handleChange} style={{ display: "none" }} ref={hiddenFileInput} />
                                <Button onClick={e => hiddenFileInput.current.click()}>
                                    <ImageIcon />
                                </Button>
                                {checked ? (
                                    <Button onClick={() => { handleUpload(); setOpen(false); setStoreOpen(true) }}>
                                        <ForwardSharpIcon />
                                    </Button>
                                    ) : (
                                    <Button disabled={!image && !media} onClick={() => { handleUpload(); setOpen(false); setPreview(null)}}>
                                        <AddCircleIcon />
                                    </Button>
                                )}
                                
                            </div>
                        </div>
                    </Fade>
                </Modal>

                <AddStorePostModal storeopen={storeopen} setStoreOpen={setStoreOpen} preview={preview} image={image} />
            </div>
    )
}

export default UploadGalleryPost
