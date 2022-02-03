import React, { useState, useEffect } from 'react'
import { db } from '../../../../../firebase'
import firebase from 'firebase'

import ReactPlayer from "react-player";

import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

import './LandingPostModal.css'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));

function LandingPostModal({ usernameuid, galleryPostId, open, setOpen }) {
    const classes = useStyles();
    const [postdata, setPostData] = useState('');
    const [userdata, setUserData] = useState('')

    const handleModalClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        db
            .collection("users")
            .doc(usernameuid)
            .collection("Gallery Posts")
            .doc(galleryPostId)
            .get()
            .then(doc => {
                const postdata = doc.data()
                setPostData({ ...postdata })
            })
    }, [])

    useEffect(() => {
        db
            .collection('users')
            .doc(usernameuid)
            .get()
            .then(doc => {
                const data = doc.data()
                setUserData({ ...data })
            })
    }, [])

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className="gallerymodal">
                        <div className="left-col">
                            
                                <div className="avatar_container">
                                    <img src={userdata.profileImage} alt="" />
                                    <div className="avatar_header">
                                        <h3>{userdata.username}</h3>
                                        <p>{new Date(postdata.timestamp?.toDate()).toUTCString()}</p>
                                    </div>
                                    </div>
                            
                        <div className="galmodal_body">
                            <p>{postdata.body}</p>
                        </div>
                        </div>
                        {postdata.imageUrl ? (
                        
                            <div className="right-col">
                                <img className="modalimage" src={postdata.imageUrl} alt="" />
                            </div>
                    
                        ) : (
                            <div className="modalplayer">
                                <ReactPlayer
                                    className="reactmodal_player"
                                    url={postdata.media}
                                    width="100%"
                                    height="70%"
                                    controls={true}
                                />
                            </div>
                        )}
                        
                    </div>
            </Fade>
        </Modal>
    )
}

export default LandingPostModal

