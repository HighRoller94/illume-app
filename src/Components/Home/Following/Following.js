import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { onSnapshot, collection, limit, query } from 'firebase/firestore';
import { useStateValue } from '../../../StateProvider';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

import FollowingThumb from './FollowingThumb/FollowingThumb';

function Following() {
    const [following, setFollowing] = useState([]);
    const [{ user }] = useStateValue();

    useEffect(() => {
        const followingRef = collection(db, 'users', `${user.uid}`, "Following");
        const q = query(followingRef, limit(6));

        const unsub = onSnapshot(q, (snapshot) =>
            setFollowing(snapshot.docs.map((doc) => doc.data())))

        return unsub;
    }, []);

    return (
        
        <motion.div 
            className="following"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            >
            <Link to={`/following/${user.uid}`} >
                <h2 className="following_header">Following</h2>
            </Link>
                <div className="following_thumbs">
                {
                    following.map(({ id, follow }) => (
                        <FollowingThumb
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

export default Following
