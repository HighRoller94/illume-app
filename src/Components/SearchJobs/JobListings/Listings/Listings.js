import React from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

function Listings({ usernameuid, position, description, job_type, location, listingId, created_at }) {
    return (
        <motion.div 
            className="listing_thumb"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            layout
            >
            <div className="listing_row">
                <h1>{position}</h1>
                <p>{job_type}</p>
                <div className="location">
                    <p>{location}</p>
                    <Link to={`/jobdetails/${usernameuid}/${listingId}`}>
                        <button className="details_button">View Listing</button>
                    </Link>
                </div>
            </div>
            <div className="thumb_description">
                <p>{description}</p>
            </div>
        </motion.div>
    )
}

export default Listings
