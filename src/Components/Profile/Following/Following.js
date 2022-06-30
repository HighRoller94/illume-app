import React, { useEffect, useState }from 'react';
import { db } from '../../../firebase';
import { useParams, Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { onSnapshot, collection, limit, query } from 'firebase/firestore';

import FollowingThumb from './FollowingThumb/FollowingThumb';

function Following() {
    const [following, setFollowing] = useState([]);
    const { uid } = useParams()

    useEffect(() => {
        const getFollowingUsers = async () => {
            const followingRef = collection(db, 'users', `${uid}`, "Following");
            const q = query(followingRef, limit(6));
            
            const unsub = await onSnapshot(q, (snapshot) =>
                setFollowing(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    follow: doc.data()
                })))
            )
            return unsub;
        }

        getFollowingUsers();
    }, [uid]);

    return (
        
        <motion.div 
            className="following_profile"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            >
            <Link to={`/following/${uid}`} >
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
