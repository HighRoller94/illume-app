import React, { useState, useEffect } from 'react';
import { db } from '../../../../firebase';
import { useStateValue } from '../../../../StateProvider';


import Listings from '../../JobListings/Listings/Listings';

import './MyListingPosts.css'

function MyListingPosts() {
    const [{ user }] = useStateValue();
    const [mylistings, setMyListings] = useState([])

    useEffect(() => {
        db
            .collection('users')
            .doc(user.uid)
            .collection('Job Listings')
            .orderBy('date_posted', 'desc')
            .onSnapshot(snapshot => {
                setMyListings(snapshot.docs.map(doc => ({
                    id: doc.id,
                    listing: doc.data()
                })));
            })
    }, []);


    return (
        <div>
            
            {
                mylistings.map(({ id, listing }) => (
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
                ))
            }
        </div>
    )
}

export default MyListingPosts
