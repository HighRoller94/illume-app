import React, { useState, useRef, useEffect } from 'react';
import { storage, db } from '../../../firebase';
import firebase from 'firebase/compat/app'
import { useStateValue } from '../../../StateProvider';
import { getDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';

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

function EditStorePostModal({ editopen, setEditOpen, storePostId }) {
    const classes = useStyles();
    const [preview, setPreview] = useState();
    const [image, setImage] = useState();
    const [{ user }] = useStateValue();
    const hiddenFileInput = useRef(null);
    const [updatedtitle, setUpdatedTitle] = useState('');
    const [updateddesc, setUpdatedDescription] = useState('');
    const [updatedstock, setUpdatedStock] = useState('');
    const [updatedcolours, setUpdatedColours] = useState('');
    const [updatedsizes, setUpdatedSizes] = useState('');
    const [updatedprice, setUpdatedPrice] = useState('');

    const [progress, setProgress] = useState(0);
    const [postdata, setPostData] = useState([]);

    useEffect(() => {
        // Load existing post data using postId
        const postRef = doc(db, 'users', `${user.uid}`, "Store Posts", `${storePostId}`);
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
        // If no image upload post
        if (!image) {
            const postRef = doc(db, 'users', `${user.uid}`, "Store Posts", `${storePostId}`)
            updateDoc(postRef, {
                timestamp: serverTimestamp(),
                title: updatedtitle || postdata.title,
                description: updateddesc || postdata.description,
                stock: updatedstock || postdata.stock,
                colours: updatedcolours || postdata.colours,
                sizes: updatedsizes || postdata.sizes,
                price: Number(updatedprice || postdata.price),
                username: user.displayName,
                usernameuid: user.uid,
            })
            handleClose();
        } else {
            // If image is uploaded continue with alternate function
            
            // This uploads the file to firebase storage
            const uploadTask = storage.ref(`user/${user.uid}/storepostimages/${image.name}`).put(image);
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
                        .ref(`user/${user.uid}/storepostimages/`)
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            // Post upload to db, grabbing url from 'getDownloadUrl()'
                            db
                                .collection("users")
                                .doc(user.uid)
                                .collection("Store Posts")
                                .doc(storePostId)
                                .update({
                                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                    title: updatedtitle || postdata.title,
                                    description: updateddesc || postdata.description,
                                    stock: updatedstock || postdata.stock,
                                    colours: updatedcolours || postdata.colours,
                                    sizes: updatedsizes || postdata.sizes,
                                    price: Number(updatedprice || postdata.price),
                                    username: user.displayName,
                                    usernameuid: user.uid,
                                    imageUrl: url,
                                    username: user.displayName,
                                    usernameuid: user.uid,
                                });
                            }
                        )}
                        )}
                        // Reset and close upload form when upload complete
                        setUpdatedTitle("");
                        setImage(null);
                        setEditOpen(false)
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
                    <div className="modal">
                        <h2 className="modal_header">Edit Store Post</h2>
                        <input type="text" className="mainstore_input" placeholder={postdata.title} onChange={event => setUpdatedTitle(event.target.value)} value={updatedtitle} />
                        <input type="text" className="mainstore_input" placeholder={postdata.description} onChange={event => setUpdatedDescription(event.target.value)} value={updateddesc} />
                        {preview || postdata.imageUrl ? (
                            <div className="preview">
                                    <div>
                                        <img className="storepost_preview" src={preview || postdata.imageUrl } />
                                    </div>
                                    <div className="store_inputs">
                                        <input type="text" placeholder={postdata.price} onChange={event => setUpdatedPrice(event.target.value)} value={updatedprice} />
                                        <input type="text" placeholder={postdata.sizes} onChange={event => setUpdatedSizes(event.target.value)} value={updatedsizes} />
                                    </div>
                                    <div className="store_inputs">
                                        <input type="text" placeholder={postdata.stock} onChange={event => setUpdatedStock(event.target.value)} value={updatedstock} />
                                        <input type="text" placeholder={postdata.colours} onChange={event => setUpdatedColours(event.target.value)} value={updatedcolours} />
                                    </div>
                            </div>
                        ) : (null)}
                        <input type="file" onChange={handleChange} style={{ display: "none" }} ref={hiddenFileInput} />
                        <div className="storepost_buttons">
                            <Button onClick={e => hiddenFileInput.current.click()}>
                                    <ImageIcon />
                            </Button>
                            <Button disabled={!postdata.imageUrl} onClick={() => { handleEdit(); }}>
                                <AddCircleIcon />
                            </Button>
                        </div>
                    </div>
                    </Fade>
                </Modal>
        </div>
    )
}

export default EditStorePostModal
