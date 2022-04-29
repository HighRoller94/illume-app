import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useStateValue } from '../../../StateProvider'

import { storage, db } from '../../../firebase'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { makeStyles } from '@material-ui/core/styles'

import './BioModal.css'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));


function BioModal({ open, setOpen }) {
    const [insta, setInsta] = useState('')
    const [facebook, setFacebook] = useState('')
    const [website, setWebsite] = useState('')
    const [biodata, setBioData] = useState('')
    const [biography, setBio] = useState('')
    const [userdata, setUserData] = useState('')
    const classes = useStyles()
    const [occupation, setOccupation] = useState('')
    const [location, setLocation] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [imagepreview, setImagePreview] = useState()
    const fileInputRef = useRef()
    const [{ user }] = useStateValue()
    const { uid } = useParams()
    
    useEffect(() => {
        db
            .collection('users')
            .doc(uid)
            .get()
            .then(doc => {
                const data = doc.data()
                setUserData({ ...data })
            })
        db
            .collection('users')
            .doc(uid)
            .collection('Additional Info')
            .doc('Bio')
            .get()
            .then(doc => {
                const biodata = doc.data()
                setBioData({ ...biodata })
            })
    }, [])
    
    const UpdateImage = (e) => {
        if (profileImage) {
        const uploadTask = storage.ref(`user/${user.uid}/profileimages/${profileImage.name}`).put(profileImage);
            uploadTask.on(
                "state_changed",
                () => {
                    storage
                        .ref(`user/${user.uid}/profileimages/`)
                        .child(profileImage.name)
                        .getDownloadURL()
                        .then(url => {
                            db
                                .collection("users")
                                .doc(user.uid)
                                .update({
                                    profileImage: url,
                                })
                            
                        })
                }
            )
        } else {

        }
    }

    const Update = () => {
        db
            .collection("users")
            .doc(user.uid)
            .collection("Additional Info")
            .doc("Bio")
            .set({
                biography: biography || biodata.biography || '',
                occupation: occupation || biodata.occupation || '',
                location: location || biodata.location || '',
                facebook: facebook || biodata.facebook || '',
                insta: insta || biodata.insta || ''
            })
    }

    const handleClose = () => {
        setOpen(false);
        setImagePreview(null);
    };

    const handleChange = (e) => {
        e.preventDefault();
        fileInputRef.current.click();
    };

    const uploadImage = (e) => {
        const file = e.target.files[0];
        if (file && file.type.substr(0,5) === "image") {
            setProfileImage(e.target.files[0]);
        }
    }

    useEffect(() => {

        if (profileImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(profileImage);
        } else {
            setImagePreview(null);
        }

    }, [profileImage]);

    return (
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
                    <div className="biographymodal">
                        <h1>{userdata.username}</h1>
                        {imagepreview ? (
                            <img className="biography_image" src={imagepreview} />
                            ) : (
                            <img className="biography_image" src={userdata.profileImage} />
                        )}
                        <button className="changeimage_button" onClick={handleChange} >Change Profile Picture</button>
                        <input 
                                type="file" 
                                style={{ display: "none"}} 
                                ref={fileInputRef} 
                                accept="image/*"
                                onChange={uploadImage}
                            />
                        <input type="text" placeholder="Tell us about yourself" onChange={event => setBio(event.target.value)} value={biography} />
                        <input type="text" placeholder="Where do you work?" onChange={event => setOccupation(event.target.value)} value={occupation} />
                        <input type="text" placeholder="Where are you based?" onChange={event => setLocation(event.target.value)} value={location} />
                        <h4>Socials</h4>
                        <input type="text" placeholder="Got an insta?" onChange={event => setInsta(event.target.value)} value={insta} />
                        <input type="text" placeholder="Got an facebook?" onChange={event => setFacebook(event.target.value)} value={facebook} />
                        <input type="text" placeholder="Got an website?" onChange={event => setWebsite(event.target.value)} value={website} />
                        <div className="bio_buttons">
                            <button className="biobuttons" onClick={() => { Update(); UpdateImage(); handleClose(); }}>Update</button>
                            <button className="biobuttons" onClick={() => { handleClose(); }}>Close</button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default BioModal
