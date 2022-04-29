import React from 'react'

import MyListingPosts from '../Components/SearchJobs/MyListings/MyListingPosts/MyListingPosts'
import AddJobListing from '../Components/SearchJobs/JobListings/AddJobListing'
import { motion } from 'framer-motion'

import './MyListings.css'

function MyListings() {
    return (
        <motion.div 
            className="mylistings_container"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            >
            <h1>My Listings</h1>
            <AddJobListing />
            <MyListingPosts />
        </motion.div>
    )
}

export default MyListings
