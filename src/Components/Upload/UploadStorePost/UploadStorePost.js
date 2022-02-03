import React, { useEffect, useRef, useState } from 'react'
import { db, storage } from '../../../firebase'
import firebase from 'firebase'
import { useStateValue } from '../../../StateProvider'

import { Button } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import ImageIcon from '@material-ui/icons/Image'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import AddPost from '../../../Images/AddPost.png'

import './UploadStorePost.css';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));

function UploadStorePost() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)
    const [price, setPrice] = useState('')
    const [sizes, setSizes] = useState('')
    const [stock, setStock] = useState('')
    const [colours, setColours] = useState('')
    const [{ user }] = useStateValue()
    const [preview, setPreview] = useState()
    const [open, setOpen] = useState(false)
    const classes = useStyles()
    const hiddenFileInput = useRef(null)

    const handleClose = () => {
        setOpen(false);
        setPreview(null);
        setImage(null);
    };


    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        const uploadTask = storage.ref(`user/${user.uid}/storeimages/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            () => {
                storage
                    .ref(`user/${user.uid}/storeimages/`)
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db
                            .collection("users")
                            .doc(user.uid)
                            .collection("Store Posts")
                            .add({
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                title: title,
                                description: description,
                                stock: stock,
                                colours: colours,
                                sizes: sizes,
                                imageUrl: url,
                                price: Number(price),
                                username: user.displayName,
                                usernameuid: user.uid,
                        })
                        setTitle("")
                        setImage(null)
                    })
                }
        )
    }
    
    useEffect(() => {

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
            <div>
                <Button style={{ backgroundColor: 'transparent' }} onClick={() => setOpen(true)}><img className="storepost_button" src={AddPost} alt="" /></Button>
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
                    <div className="modal">
                        <h2 className="modal_header">Add to Store</h2>
                        <input type="text" className="mainstore_input" placeholder="Title..." onChange={event => setTitle(event.target.value)} value={title} />
                        <input type="text" className="mainstore_input" placeholder="Description..." onChange={event => setDescription(event.target.value)} value={description} />
                        {preview ? (
                            <div className="preview">
                                    <div>
                                        <img className="storepost_preview" src={preview} />
                                    </div>
                                    <div className="store_inputs">
                                        <input type="text" placeholder="Price in pounds..." onChange={event => setPrice(event.target.value)} value={price} />
                                        <input type="text" placeholder="Sizes Available..." onChange={event => setSizes(event.target.value)} value={sizes} />
                                    </div>
                                    <div className="store_inputs">
                                        <input type="text" placeholder="In Stock..." onChange={event => setStock(event.target.value)} value={stock} />
                                        <input type="text" placeholder="Colours available..." onChange={event => setColours(event.target.value)} value={colours} />
                                    </div>
                            </div>
                        ) : (null)}
                        <input type="file" onChange={handleChange} style={{ display: "none" }} ref={hiddenFileInput} />
                        <div className="storepost_buttons">
                            <Button onClick={e => hiddenFileInput.current.click()}>
                                    <ImageIcon />
                            </Button>
                            <Button disabled={!image} onClick={() => { handleUpload(); setOpen(false)} }>
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

export default UploadStorePost
