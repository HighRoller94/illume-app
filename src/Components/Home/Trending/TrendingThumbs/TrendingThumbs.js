import React, { useState } from 'react';
import ReactPlayer from 'react-player';

import GalleryPostModal from '../../../Modals/GalleryPostModal/GalleryPostModal';

function TrendingThumbs({ username, galleryPostId, usernameuid, imageUrl, media }) {
    const [open, setOpen] = useState(false);
    return (
            <div className="trending_posts">
                <div className="trending_thumbs">
                    {imageUrl ? (
                        
                            <img src={imageUrl} onClick={() => setOpen(true)} alt="" />
                        
                    ) : ( null )}
                    {media ? (
                        <div className="trending_video">
                            <ReactPlayer
                                className="trending-player"
                                url={media}
                                light= { true }
                                width="100%"
                                height="100%"
                                onClick={() => setOpen(true)} 
                            />
                        </div>
                    ) : ( null)}
                </div>
            <GalleryPostModal 
                open={open} 
                setOpen={setOpen} 
                galleryPostId = {galleryPostId} 
                usernameuid = {usernameuid} 
            />
            </div>
    )
}

export default TrendingThumbs
