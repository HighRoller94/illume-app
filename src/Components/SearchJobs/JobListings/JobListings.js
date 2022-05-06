import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';

import Listings from './Listings/Listings';

function JobListings() {
    const [listings, setListings] = useState([])
    const [morelistings, setMoreListings] = useState([])
    const [lastDoc, setLastDoc] = useState();
    const [loading, setLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);

    // sets a ref just to make life easier/avoid repeating code
    const listingRef = db.collectionGroup('Job Listings').orderBy('date_posted', 'desc')
    
    useEffect(() => {
        // loads the initial batch of listings
        listingRef
            .limit(10)
            .get()
            .then(snapshot => {
                setListings(snapshot.docs.map(doc => ({
                    id: doc.id,
                    listing: doc.data()
                })));
                const lastDoc = snapshot.docs[snapshot.docs.length -1]
                setLastDoc(lastDoc)
            })
    }, []);

    const updateState = (snapshot) => {
        // checks whether or not there's another batch of documents
        const isSnapshotEmpty = snapshot.size === 0;

        if (!isSnapshotEmpty) {
            setMoreListings(snapshot.docs.map(doc => ({
                id: doc.id,
                listing: doc.data()
            })));
            setListings((listings) => [ ...listings, ...morelistings])
            const lastDoc = snapshot.docs[snapshot.docs.length -1];
            setLastDoc(lastDoc);
        } else {
            setIsEmpty(true)
        }
        setLoading(false)
    }

    const fetchMoreListings = () => {
        // Fetches the next batch of listings and runs the update state function
        setLoading(true);
            listingRef
                .startAfter(lastDoc)
                .limit(10)
                .get()
                .then(snapshot => {
                    updateState(snapshot);
                })
            
    }

    // if no listings then return loading as visual indicator
    if (listings.length === 0) {
        return <h1>Loading...</h1>
    }

    // Sets the state to either loading or load more posts button (depending on loading state)
    const state = !loading && <button className="more_button" onClick={fetchMoreListings}>See More</button>

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
