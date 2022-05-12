import React, { useEffect, useState }from 'react';
import { db } from '../firebase';
import { useStateValue } from '../StateProvider';
import { useParams, Link } from "react-router-dom";
import { motion } from 'framer-motion';

import FollowingBigThumb from '../Components/FollowingPage/FollowingBigThumb';

function FollowingPage() {
    const [follows, setFollows] = useState([]);
    const { uid } = useParams()
    const [{ user } ] = useStateValue();
    const [profileimage, setProfileImage] = useState("")
    
    useEffect(() => {
        if (uid) {
            db
                .collection('users')
                .doc(uid)
                .onSnapshot((snapshot) => 
                    setProfileImage(snapshot.data().profileImage))
        }
    }, [uid])

    useEffect(() => {
        const unsubscribe = 
        db
            .collection("users")
            .doc(uid)
            .collection("Following")
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
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            >
            <div className="following_title">
                {uid !== user.uid ? (
                <Link to={`/profile/${uid}`} >
                    <img className="following_avatar" src={profileimage} />
                </Link>
                ) : (
                    <h1>Following</h1>
                )}
            </div>
            <div className="following_row">
            {
                follows.map(({ id, follow }) => (
                    <FollowingBigThumb 
                        key={id}
                        username={follow.username}
                        uid={follow.uid}
                        firstName={follow.firstName}
                        lastName={follow.lastName}
                        profileImage={follow.profileImage}
                    />
                ))
            }
            </div>
        </motion.div>
    )
}

export default FollowingPage
