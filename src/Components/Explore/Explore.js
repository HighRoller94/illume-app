import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { motion } from 'framer-motion';

import ExploreThumbs from './ExploreThumbs/ExploreThumbs'
import ExplorePosts from './ExplorePosts/ExplorePosts'

import './Explore.css';

function Explore() {
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])
    const [lastDoc, setLastDoc] = useState()

    // Queries users from db
    useEffect(() => {
        const unsubscribe = 
        db
            .collection("users")
            .onSnapshot(snapshot => {
                setUsers(snapshot.docs.map(doc => ({
                    id: doc.id,
                    user: doc.data()
                })))
            }) 
        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <motion.div
            className="explore_container"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            >
            <h1>Explore Illume</h1>
                <ExplorePosts />
            <div className="explore_users">
                <h1>Explore Users</h1>
            </div>
            <div className="explore_profileThumbs">
                { users.map(({ id, user }) => (
                    <ExploreThumbs
                        key={id}
                        username={user.username}
                        uid={user.uid}
                        profileImage={user.profileImage}
                        />
                ))
            }
            </div>
        </motion.div>
    )
}

export default Explore
