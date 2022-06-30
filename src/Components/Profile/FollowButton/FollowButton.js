import React, { useEffect, useState } from 'react';
import { useStateValue } from '../../../StateProvider';
import { useParams } from "react-router-dom";
import { db } from '../../../firebase';

import { getDoc, doc, deleteDoc, collection, setDoc} from 'firebase/firestore';

function FollowButton() {
    const { uid } = useParams();
    const [{ user }] = useStateValue();
    const [following, setFollowing] = useState(false);
    const [followingData, setFollowingData] = useState('');
    const [followerData, setFollowerData] = useState('');

    useEffect(() => {
        const followRef = doc(db, 'users', `${user.uid}`, "Following", `${uid}`)
        const unsub = getDoc(followRef)
        .then((doc) => {
            if (doc.exists) {
                setFollowing(true)
            }
        })
        return unsub;
    }, [uid]);

    console.log(following)

    const Follow = async () => {
        // Grabbing the user data of the profile visited
        const followingRef = await doc(db, 'users', `${uid}`)
            getDoc(followingRef)
            .then((doc) => {
                setFollowingData(doc.data())
            })
        // Grabbing the user data of the logged in user
        const followerRef = await doc(db, 'users', `${user.uid}`)
            getDoc(followerRef)
            .then((doc) => {
                setFollowerData(doc.data())
            })
        // Adds the data of the logged in user to the profile users list of followers
        // then adds the profile users data to the logged in users list of followed users
        if (followingData) {
            const followingUser = await doc(db, "users", `${user.uid}`, 'Following', `${uid}`)
            await setDoc(followingUser, followingData)
            const followerUser = await doc(db, "users", `${uid}`, 'Followers', `${user.uid}`)
            await setDoc(followerUser, followerData)
        }
        setFollowing(true);
    }
    
    const Unfollow = async () => {
        
        const followingUser = doc(db, "users", `${user.uid}`, 'Following', `${uid}`)
        deleteDoc(followingUser)

        const followerUser = doc(db, "users", `${uid}`, 'Following', `${user.uid}`)
        deleteDoc(followerUser)

        setFollowing(false)
    }

    return (
        <div>
            {!following ? (
                <button
                    className="follow_button" 
                    onClick = {Follow}
                >
                    Follow
                </button>
            ) : (
                <button
                    className="unfollow_button" 
                    onClick = {Unfollow}
                >
                    Unfollow
                </button>
            )}
        </div>
    )
}

export default FollowButton
