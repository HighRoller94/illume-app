import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactPlayer from "react-player";

import GalleryPostModal from '../Gallery/GalleryPostModal'

import './IllumeGalleryPost.css'

function IllumeGalleryPost({ media, galleryPostId, imageUrl, username, usernameuid }) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <motion.div 
                className="gallerypost"
                layout
                whileHover={{ opacity: 1 }}
                >
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
            </motion.div>

            <GalleryPostModal 
                open={open} 
                setOpen={setOpen} 
                galleryPostId = {galleryPostId} 
                usernameuid = {usernameuid} 
            />

        </div>
    )
}

export default IllumeGalleryPost
