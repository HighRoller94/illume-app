import React, { useEffect, useState }from 'react';
import { db } from '../../../firebase';
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion';

import FollowingThumb from './FollowingThumb/FollowingThumb';

import './Following.css'

function Following() {
    const [follows, setFollows] = useState([]);
    const { uid } = useParams()

    useEffect(() => {
        const unsubscribe = 
        db
            .collection("users")
            .doc(uid)
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
