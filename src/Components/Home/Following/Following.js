import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { useStateValue } from '../../../StateProvider';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

import FollowingThumb from './FollowingThumb/FollowingThumb';

function Following() {
    const [follows, setFollows] = useState([]);
    const [{ user }] = useStateValue();

    useEffect(() => {
        const unsubscribe = 
        db
            .collection("users")
            .doc(user.uid)
            .collection("Following")
            .limit(6)
            .onSnapshot(snapshot => {
                setFollows(snapshot.docs.map(doc => ({
                    id: doc.id,
                    follow: doc.data()
                })))
            }) 
        return () => {
            unsubscribe();
        }
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
                    follows.map(({ id, follow }) => (
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
