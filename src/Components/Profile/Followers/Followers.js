import React, { useEffect, useState }from 'react';
import { db } from '../../../firebase';
import { useParams, Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { onSnapshot, collection, limit, query } from 'firebase/firestore';

import FollowerThumb from './FollowerThumb/FollowerThumb'

function Followers() {
    const [followers, setFollowers] = useState([]);
    const { uid } = useParams()

    useEffect(() => {
        const getFollowerUsers = async () => {
            const followingRef = collection(db, 'users', `${uid}`, "Following");
            const q = query(followingRef, limit(6));
            
            const unsub = await onSnapshot(q, (snapshot) =>
                setFollowers(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    follow: doc.data()
                })))
            )
            return unsub;
        }

        getFollowerUsers();
    }, [uid]);

    return (
        <motion.div 
            className="followers_profile"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            >
            <Link to={`/followers/${uid}`} >
                <h2 className="followers_header">Followers</h2>
            </Link>
                <div className="followers_thumbs">
                {
                    followers.map(({ id, follow }) => (
                        <FollowerThumb
                            key={id}
                            username={follow.username}
                            uid={follow.uid}
                            firstName={follow.firstName}
                            lastName={follow.lastName}
                            profileImage={follow.profileImage} />
                    ))
                }
                </div>
            
        </motion.div>
    )
}

export default Followers
