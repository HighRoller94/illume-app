import React, { useEffect, useState }from 'react';
import { db } from '../../../firebase';
import { useStateValue } from '../../../StateProvider';
import { onSnapshot, collection, limit, query } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

import FollowerThumb from './FollowerThumb/FollowerThumb'

function Followers() {
    const [followers, setFollowers] = useState([]);
    const [{ user }] = useStateValue();

    useEffect(() => {
        const getFollowers = async () => {
            const followersRef = collection(db, 'users', `${user.uid}`, "Followers");
            const q = query(followersRef, limit(6));
    
            const unsub = onSnapshot(q, (snapshot) =>
                setFollowers(snapshot.docs.map((doc) => doc.data())))
    
            return unsub;
        }
        
        getFollowers();
    }, []);

    return (
        <motion.div 
            className="followers"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            >
            <Link to={`/followers/${user.uid}`} >
                <h2 className="followers_header">Followers</h2>
            </Link>
                <div className="followers_thumbs">
                {
                    followers.map((follow) => (
                        <FollowerThumb
                            key={follow.username}
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
