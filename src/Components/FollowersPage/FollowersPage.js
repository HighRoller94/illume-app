import React, { useEffect, useState }from 'react';
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion';

import FollowersBigThumb from './FollowersBigThumb/FollowersBigThumb';

import './FollowersPage.css'

function FollowersPage() {
    const [followers, setFollowers] = useState([]);
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
            .collection("Followers")
            .onSnapshot(snapshot => {
                setFollowers(snapshot.docs.map(doc => ({
                    id: doc.id,
                    follower: doc.data()
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
            <div className="followers_title">
                {uid !== user.uid ? (
                <Link to={`/profile/${uid}`} >
                    <img className="followers_avatar" src={profileimage} />
                </Link>
                ) : (
                    <h1>Followers</h1>
                )}
            </div>
            <div className="followers_row">
            {
                followers.map(({ id, follower }) => (
                    <FollowersBigThumb 
                        key={id}
                        username={follower.username}
                        uid={follower.uid}
                        firstName={follower.firstName}
                        lastName={follower.lastName}
                        profileImage={follower.profileImage}
                    />
                ))
            }
            </div>
        </motion.div>
    )
}

export default FollowersPage
