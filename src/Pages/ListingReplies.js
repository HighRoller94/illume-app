import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../StateProvider';

import ReplyThumb from '../Components/SearchJobs/ListingReplies/ReplyThumb';

function ListingReplies() {
    const { listingId } = useParams();
    const [{ user }] = useStateValue();
    const [replies, setReplies] = useState([]);

    useEffect(() => {
        const unsubscribe = 
        db
            .collection("users")
            .doc(user.uid)
            .collection("Job Listings")
            .doc(listingId)
            .collection("Replies")
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setReplies(snapshot.docs.map(doc => ({
                    id: doc.id,
                    reply: doc.data()
                })));
            })

        return () => {
            unsubscribe();
        }

    }, []);

    return (
        <div className="replies_container">
            <h1>Replies</h1>
            {
                
                replies.map(({ id, reply }) => (
                    <ReplyThumb 
                        key={id} 
                        listingId={id} 
                        usernameuid={reply.usernameuid}
                        name={reply.name} 
                        description={reply.description} 
                        timestamp={reply.timestamp}
                    />
                ))
                
                
            }
        </div>
    )
}

export default ListingReplies
