import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'

import JobListings from '../SearchJobs/JobListings/JobListings';

import './SearchJobs.css'

function SearchJobs() {

    const [occupation, setOccupation] = useState('')
    const [location, setLocation] = useState('')
    const [within, setWithin] = useState('')
    const [salary, setSalary] = useState('')

    return (
        <motion.div 
            className="jobscontainer"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            >
            <div className="jobs_header">
                <h1>Search Jobs</h1>
                <Link to="/myjobs">
                    <button className="myjobs">My Listings</button>
                </Link>
            </div>
            <div className="col_container">
                <div className="left_col">
                    <h1>Search</h1>
                    <p>Occupation</p>
                    <input type="text" placeholder="Occupation" onChange={event => setOccupation(event.target.value)} value={occupation} />
                    <p>Location</p>
                    <input type="text" placeholder="Whereabouts?" onChange={event => setLocation(event.target.value)} value={location} />
                    <div className="within">
                        <p className="within_text">Within</p><input type="text" placeholder="2" onChange={event => setWithin(event.target.value)} value={within} />
                        <p className="miles">miles</p>
                        <button>Update</button>
                    </div>
                    <h3>Salary</h3>
                    <div className="salary_buttons">
                        <button>Yearly</button>
                        <button>Daily</button>
                        <button>Hourly</button>
                    </div>
                    <input type="text" placeholder="My first post" onChange={event => setSalary(event.target.value)} value={salary} />
                    <div className="additional_search">
                        <h4>Date Posted</h4>
                        <p>Last 7 days</p>
                        <p>Last 14 days</p>
                        <h4>Job Type</h4>
                        <p>Permanent</p>
                        <p>Temporary</p>
                    </div>
                </div>
                <div className="posts_col">
                    <JobListings />
                </div>
            </div>
        </motion.div>
    )
}

export default SearchJobs
