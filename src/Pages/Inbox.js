import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from "react-router-dom";
import { db } from '../firebase';

import Chat from '../Components/Inbox/Chat/Chat';
import Sidebar from '../Components/Inbox/Sidebar/Sidebar';

function Inbox() {
    const { uid } = useParams();
    const [userData, setUserData] = useState('');

    useEffect(() => {
        getUserData();
    }, [uid])

    const getUserData = async () => {
        const userRef =  doc(db, "users", `${uid}`)
        const unsub = await getDoc(userRef)
            .then((doc) => {
                setUserData(doc.data())
            })
        return unsub;
    }

    return (
        <motion.div
            className="inbox_container"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            >
            <div className="inbox_sidebar">
                <Sidebar />
            </div>
            <div className="inbox_chat">
                <Chat userData={userData} />
            </div>
        </motion.div>
    )
}

export default Inbox
