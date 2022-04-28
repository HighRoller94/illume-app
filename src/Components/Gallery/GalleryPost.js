import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '../../firebase';
import ReactPlayer from "react-player";
import { useStateValue } from '../../StateProvider';

import Menu from '@material-ui/core/Menu';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { MenuItem } from '@material-ui/core';

import GalleryPostModal from '../GalleryPostModal/GalleryPostModal';
import EditGalleryPostModal from './EditGalleryPostModal';

import './GalleryPost.css'

function GalleryPost({ galleryPostId, usernameuid, imageUrl, media }) {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [{ user }] = useStateValue();
    const [editopen, setEditOpen] = useState(false);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDelete = () => {
        db
            .collection("users")
            .doc(user.uid)
            .collection("Gallery Posts")
            .doc(galleryPostId)
            .delete()
    };

    return (
        <div>
            <motion.div 
                className="gallerypost"
                layout
                whileHover={{ opacity: 1 }}
                >
                <div id="options">
                    {usernameuid === user.uid ? (
                            <MoreHorizIcon onClick={handleClick} />
                    ) : null}
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
                    {imageUrl ? (
                        <div>
                            <img className="gallerypost_image" src={imageUrl} onClick={() => setOpen(true)} alt="" />
                        </div>
                    ) : ( null )}
                    {media ? (
                        <div className="gallerypost_video">
                            <ReactPlayer
                                className="react-player"
                                url={media}
                                light= { true }
                                width="100%"
                                height="100%"
                                onClick={() => setOpen(true)} 
                            />
                        </div>
                    ) : ( null)}
                </div>
            </motion.div>
            
            <GalleryPostModal 
                open={open} 
                setOpen={setOpen} 
                galleryPostId = {galleryPostId} 
                usernameuid = {usernameuid} 
            />

            <EditGalleryPostModal
                editopen = { editopen }
                setEditOpen = { setEditOpen}
                galleryPostId = { galleryPostId } 
            />

            </div>
        
    )
}

export default GalleryPost
