import React from 'react'
import Calendar from 'react-calendar';
import { motion } from 'framer-motion';
import { db } from '../../firebase';
import firebase from 'firebase'
import { useStateValue } from '../../StateProvider';
import schedule from 'node-schedule'

import './BigCalendar.css'

function BigCalendar() {
    const [{ user }] = useStateValue();

    const someDate = new Date('July 29, 2021 21:35:00');
    const date = someDate.toString();


    schedule.scheduleJob(date, () => {
        db
                .collection("users")
                .doc(user.uid)
                .collection("Posts")
                .add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    body: 'Hey!',
                    username: user.displayName,
                    usernameuid: user.uid
                });
    })


    
    return (
        <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            >
            <div className="schedule">
                <div className="schedule_sidebar">
                    <h1>Posts</h1>
                    
                </div>
                <div className="calendar_main">
                    <Calendar />
                </div>
            </div>
        </motion.div>
    )
}

export default BigCalendar 
