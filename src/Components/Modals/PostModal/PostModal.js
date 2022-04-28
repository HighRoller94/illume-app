import React, { useState, useEffect } from 'react'
import { db } from '../../../firebase'
import firebase from 'firebase'
import { useStateValue } from '../../../StateProvider';

import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

import './PostModal.css'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));

function PostModal({ open, setOpen, postId, usernameuid }) {
    const classes = useStyles();
    const [userdata, setUserData] = useState('')
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [{ user }] = useStateValue();
    const [postdata, setPostData] = useState([]);

    useEffect(() => {
        db
            .collection("users")
            .doc(usernameuid)
            .collection("Posts")
            .doc(postId)
            .get()
            .then(doc => {
                const postdata = doc.data()
                setPostData({ ...postdata })
            })
    }, [])

    useEffect(() => {
        let unsubscribe;
        
            unsubscribe = db
                .collection("users")
                .doc(usernameuid)
                .collection("Posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });
        

        return () => {
            unsubscribe();
        };
    }, []);

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

    const handleModalClose = () => {
        setOpen(false);
    };

    const postComment = (event) => {
        event.preventDefault();

        db
            .collection("users")
            .doc(usernameuid)
            .collection("Posts")
            .doc(postId)
            .collection("comments")
            .add({
                username: user.displayName,
                text: comment,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setComment('');
    } 

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
                                <p>{new Date(postdata.timestamp?.toDate()).toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="galmodal_body">
                            <p>{postdata.body}</p>
                        </div>
                        <div className="gal_comments">
                            {comments.map((comment) => (
                                <p><strong>{comment.username}</strong> {comment.text}</p>
                            ))}
                        </div>
                            <form className="gal_commentBox">
                                <input className="gal_input" type="text" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)}/>
                                <button className="gal_button" disabled={!comment} type="submit" onClick={postComment}>
                                    Post
                                </button>
                            </form>
                        </div>
                        <div className="right-col">
                            <img className="modalimage" src={postdata.imageUrl} alt="" />
                        </div>
                    </div>
            </Fade>
        </Modal>
    )
}

export default PostModal
