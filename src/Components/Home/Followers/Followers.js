import React, { useEffect, useState }from 'react';
import { db } from '../../../firebase';
import { useStateValue } from '../../../StateProvider';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

import FollowerThumb from './FollowerThumb/FollowerThumb'

function Followers() {
    const [follows, setFollows] = useState([]);
    const [{ user }] = useStateValue();

    useEffect(() => {
        const unsubscribe = 
        db
            .collection("users")
            .doc(user.uid)
            .collection("Followers")
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
                    follows.map(({ id, follow }) => (
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
