import React, { useState, useEffect } from 'react'
import { db } from '../../../firebase'
import { useStateValue } from '../../../StateProvider';
import { query, onSnapshot, collection, orderBy, getDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';

import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));

function PostModal({ open, setOpen, postId, usernameuid }) {
    const classes = useStyles();
    const [userData, setUserData] = useState('')
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [{ user }] = useStateValue();
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        const postRef = doc(db, 'users', `${usernameuid}`, "Posts", `${postId}`);
        const unsub = getDoc(postRef)
            .then((doc) => {
                setPostData(doc.data())
            }
        )
        return unsub;
    }, [])

    useEffect(() => {
        const userRef = doc(db, 'users', `${usernameuid}`);
        const unsub = getDoc(userRef)
        .then((doc) => {
            setUserData(doc.data())
            }
        )
        return unsub;
    }, [])

    useEffect(() => {
        const postCommentsRef = collection(db, 'users', `${usernameuid}`, "Posts", `${postId}`, "comments");
        const q = query(postCommentsRef, orderBy("timestamp", "asc"));
        const unsub = onSnapshot(q, (snapshot) =>
            setComments(snapshot.docs.map((doc) => doc.data())))
        return unsub;
    }, []);

    const handleModalClose = () => {
        setOpen(false);
    };

    const postComment = (event) => {
        event.preventDefault();

        const postRef = collection(db, "users", `${usernameuid}`, "Posts", `${postId}`, "comments");
        addDoc(postRef, {
            username: user.displayName,
            text: comment,
            timestamp: serverTimestamp(),
        })
        .then(() => {
            setComment('');
        })
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
                            <img src={userData?.profileImage} alt="" />
                            <div className="avatar_header">
                                <h3>{userData?.username}</h3>
                                <p>{new Date(postData?.timestamp?.toDate()).toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="galmodal_body">
                            <p>{postData?.body}</p>
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
                            <img className="modalimage" src={postData?.imageUrl} alt="" />
                        </div>
                    </div>
            </Fade>
        </Modal>
    )
}

export default PostModal
