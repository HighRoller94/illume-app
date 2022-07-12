import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { useStateValue } from '../../../StateProvider';
import { query, onSnapshot, collection, orderBy } from 'firebase/firestore';

import Listings from '../JobListings/Listings/Listings';

function MyListingPosts() {
    const [{ user }] = useStateValue();
    const [mylistings, setMyListings] = useState([])

    useEffect(() => {
        const getMyJobListings = async () => {
            const listingsRef = collection(db, 'users', user.uid, "Job Listings");
            const q = query(listingsRef, orderBy("date_posted", "desc"));

            const unsub = await onSnapshot(q, (snapshot) => 
                setMyListings(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    listing: doc.data()
                }))))

            return unsub;
        }
        getMyJobListings();
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
