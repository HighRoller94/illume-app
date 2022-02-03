import React, { useState, useEffect } from 'react';
import { db } from '../../../../firebase';

import SidebarChat from '../SidebarChat/SidebarChat';

function Rooms() {
    const [rooms, setRooms] = useState([]);

    const createChat = () => {
        const roomName = prompt("Please enter room name");

        if (roomName) {
            db.collection('rooms').add({
                roomname: roomName,
            });
        }
    };

    useEffect(() => {
        db 
            .collection("rooms")
            .onSnapshot((snapshot) =>
                setRooms(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
            ))
    }, [])

    return (
            <div>
            <div onClick={createChat} className="addnewChat">
                <h3>Add new room</h3>
            </div>
            {rooms.map(room => (
                    <SidebarChat 
                        key={room.id} 
                        id={room.id}
                        name={room.data.username} 
                        profileImage={room.data.profileImage}
                    />
            ))}
        </div>
    )
}

export default Rooms
