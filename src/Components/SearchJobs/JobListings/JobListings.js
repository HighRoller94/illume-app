import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { query, onSnapshot, collectionGroup, orderBy, limit } from 'firebase/firestore';

import Listings from './Listings/Listings';

function JobListings() {
    const [listings, setListings] = useState([])
    const [morelistings, setMoreListings] = useState([])
    const [lastDoc, setLastDoc] = useState();
    const [loading, setLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    
    useEffect(() => {
        const getJobListings = async () => {
            const listingRef = collectionGroup(db, 'Job Listings');
            const q = query(listingRef, orderBy("date_posted", "desc"), limit(10));
    
            const unsub = await onSnapshot(q, (snapshot) => 
                setListings(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    listing: doc.data()
                })))
            )
            return unsub;
        }
        
        getJobListings();
    }, []);

    // if no listings then return loading as visual indicator
    if (listings.length === 0) {
        return <h1>Loading...</h1>
    }

    // Sets the state to either loading or load more posts button (depending on loading state)
    const state = !loading && <button className="more_button">See More</button>

    return (
        <div>
            {listings.map(({ id, listing }) => (
                <Listings 
                    key={id} 
                    listingId={id} 
                    usernameuid={listing.usernameuid} 
                    username={listing.username} 
                    description={listing.description} 
                    position={listing.position}
                    location={listing.location}
                    job_type={listing.job_type}
                    salary={listing.salary}
                    start_date={listing.start_date}
                    date_posted={listing.date_posted}
                />
            ))}

            {loading && <h2>Loading...</h2>}

            <div className="loading">
                {isEmpty ? (
                    <h1>"No more posts :("</h1>
                ):(
                    (state)
                )}
            </div>
        </div>
    )
}

export default JobListings
