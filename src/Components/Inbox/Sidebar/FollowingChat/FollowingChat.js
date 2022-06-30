import React, { useEffect, useState } from 'react';
import { db } from '../../../../firebase';
import { useStateValue } from '../../../../StateProvider';

import SidebarChat from '../SidebarChat/SidebarChat';

function FollowingChat() {
    const [users, setUsers] = useState([]);
    const [{ user }] = useStateValue();

    useEffect(() => {

        const unsubscribe = db
            .collection("users")
            .doc(user.uid)
            .collection("Following")
            .where ('uid', '!=', user.uid)
            .onSnapshot((snapshot) =>
                setUsers(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                ))
            return () => {
                unsubscribe();
            }
    }, []);

    return (
        <div>
            {users.map(user => (
                <SidebarChat 
                    key={user.id} 
                    id={user.id}
                    name={user.data.username} 
                    profileImage={user.data.profileImage}
                />
            ))}
        </div>
    )
}

export default FollowingChat
