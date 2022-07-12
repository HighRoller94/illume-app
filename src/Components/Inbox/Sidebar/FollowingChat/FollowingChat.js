import React, { useEffect, useState } from 'react';
import { db } from '../../../../firebase';
import { useStateValue } from '../../../../StateProvider';
import { collection, onSnapshot } from 'firebase/firestore';

import SidebarChat from '../SidebarChat/SidebarChat';

function FollowingChat() {
    const [users, setUsers] = useState([]);
    const [{ user }] = useStateValue();

    useEffect(() => {
        getUserMessages();
    }, []);

    const getUserMessages = async () => {
        const userMessagesRef = collection(db, 'users', user.uid, 'Following')
        const unsub = await onSnapshot(userMessagesRef, (snapshot) => 
            setUsers(snapshot.docs.map((doc) => ({
                id: doc.id,
                user: doc.data()
            }))))
        return unsub;
    }

    console.log(users)
    return (
        <div>
            {users.map(({id, user}) => (
                <SidebarChat 
                    key={user.id} 
                    id={id}
                    name={user.username} 
                    profileImage={user.profileImage}
                />
            ))}
        </div>
    )
}

export default FollowingChat
