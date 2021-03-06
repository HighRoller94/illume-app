import React, { useEffect, useState } from 'react';
import ReactPlayer from "react-player";
import { db } from '../../../firebase';
import { query, onSnapshot, collection, orderBy, addDoc, serverTimestamp, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { Link } from "react-router-dom";
import { useStateValue } from '../../../StateProvider';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { MenuItem } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import { motion } from 'framer-motion';

import PostModal from '../../Modals/PostModal/PostModal';
import EditPostModal from '../../Modals/PostModal/EditPostModal';

function Post({ username, usernameuid, postId, body, imageUrl, timestamp, media }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [userimage, setUserImage] = useState('');
    const [{ user }] = useStateValue();
    const [open, setOpen] = useState(false);
    const [editopen, setEditOpen] = useState(false);

    useEffect(() => {
        if (postId) {
            const postCommentsRef = collection(db, "users", `${usernameuid}`, "Posts", `${postId}`, "comments");
            const q = query(postCommentsRef, orderBy("timestamp", "asc"));
            const unsub = onSnapshot(q, (snapshot) =>
                setComments(snapshot.docs.map((doc) => doc.data())))
            return unsub;
        }
    }, [postId]);

    useEffect(() => {
        if (usernameuid) {
            const imageRef = doc(db, "users", `${usernameuid}`)
            const unsub = getDoc(imageRef)
            .then((doc) => {
                let userImage = doc.data().profileImage
                setUserImage(userImage)
            })
            return unsub;
        }
    }, [usernameuid])

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
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = (e) => {
        e.preventDefault()
        const postRef = doc(db, "users", `${user.uid}`, "Posts", `${postId}`)
        deleteDoc(postRef)
    };

    return (
        <div>
            <motion.div 
                    className="post"
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0}}
                    layout
                    >
                    <div className="post">
                        <div className="post_header">
                            <Link to={`/profile/${usernameuid}`}>
                                <img className="post_avatar" alt="" src={userimage} />
                            </Link>
                        <div className="post_username">
                            <Link to={`/profile/${usernameuid}`}>
                                <h3 className="username">{username}</h3>
                            </Link>
                            <p>{new Date(timestamp?.toDate()).toLocaleString()}</p>
                        </div>
                        {usernameuid === user.uid ? (
                            <MoreHorizIcon onClick={handleClick} />
                        ) : null}
                    </div>
                    <div>
                        <Menu
                            className="post_optionsmenu"
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => {setEditOpen(true); setAnchorEl(null)} } style={{ backgroundColor: 'transparent' }} >Edit</MenuItem>
                            <MenuItem onClick={handleDelete} style={{ backgroundColor: 'transparent' }} >Delete</MenuItem>
                        </Menu>
                    </div>
                    {imageUrl ? (
                        <div>
                            <img className="post_image" src={imageUrl} onClick={() => setOpen(true)} alt="" />
                        </div>
                    ) : ( null )}
                    {media ? (
                        <div className="post_video">
                            <ReactPlayer
                                className="react-player"
                                url={media}
                                width="100%"
                                height="100%"
                                controls={true}
                            />
                        </div>
                    ) : ( null)}
                    <h4 className="post_text">{body}</h4>
                    <div className="post_comments">
                        {comments.map((comment) => (
                            <p><strong>{comment.username}</strong> {comment.text}</p>
                        ))}
                    </div>
                    <form className="post_commentBox">
                        <input type="text" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
                        <button disabled={!comment} type="submit" onClick={postComment}>
                            Post
                        </button>
                    </form>
                </div>
            </motion.div>

            <PostModal 
                open = { open }
                setOpen = { setOpen }
                postId = { postId }
                usernameuid = { usernameuid }
            />

            <EditPostModal
                usernameuid = { usernameuid }
                editopen = { editopen }
                setEditOpen = { setEditOpen }
                postId = { postId }
            />
        </div>
    )
}

export default Post
