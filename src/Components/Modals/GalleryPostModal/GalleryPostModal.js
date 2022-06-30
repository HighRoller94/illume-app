import React, { useState, useEffect } from 'react'
import { db } from '../../../firebase'
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { query, onSnapshot, collection, orderBy, getDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';

import { useStateValue } from '../../../StateProvider';

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

function GalleryPostModal({ open, setOpen, galleryPostId, usernameuid  }) {
    const classes = useStyles();
    const [userdata, setUserData] = useState('')
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [{ user }] = useStateValue();
    const [postdata, setPostData] = useState([]);

    useEffect(() => {
        const postRef = doc(db, 'users', `${usernameuid}`, "Gallery Posts", `${galleryPostId}`);
        const unsub = getDoc(postRef)
            .then((doc) => {
                let postdata = doc.data()
                setPostData({ ...postdata })
            }
        )
        return unsub;
    }, [])

    useEffect(() => {
        const postCommentsRef = collection(db, 'users', `${usernameuid}`, "Gallery Posts", `${galleryPostId}`, "comments");
        const q = query(postCommentsRef, orderBy("timestamp", "asc"));
        const unsub = onSnapshot(q, (snapshot) =>
            setComments(snapshot.docs.map((doc) => doc.data())))
        return unsub;
    }, [galleryPostId]);

    useEffect(() => {
        const userRef = doc(db, 'users', `${usernameuid}`);
        const unsub = getDoc(userRef)
        .then((doc) => {
            setUserData(doc.data())
            }
        )
        return unsub;
    }, [])

    const handleModalClose = () => {
        setOpen(false);
    };

    const postComment = (event) => {
        event.preventDefault();
        const postRef = collection(db, "users", `${usernameuid}`, "Gallery Posts", `${galleryPostId}`, "comments");
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
                            <Link to={`profile/${usernameuid}`}>
                                <div className="avatar_container">
                                    <img src={userdata?.profileImage} alt="" />
                                    <div className="avatar_header">
                                        <h3>{userdata?.username}</h3>
                                        <p>{new Date(postdata?.timestamp?.toDate()).toLocaleString()}</p>
                                    </div>
                                    </div>
                            </Link>
                        <div className="galmodal_body">
                            <p>{postdata?.body}</p>
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
                        {postdata?.imageUrl ? (
                            <div className="right-col">
                                <img className="modalimage" src={postdata?.imageUrl} alt="" />
                            </div>
                        ) : (
                            <div className="modalplayer">
                                <ReactPlayer
                                    className="reactmodal_player"
                                    url={postdata?.media}
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

export default GalleryPostModal
