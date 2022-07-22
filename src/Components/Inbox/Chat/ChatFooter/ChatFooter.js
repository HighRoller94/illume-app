import React, { useState, useRef } from 'react';
import { Send, AttachFile } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { db, storage } from '../../../../firebase';
import { useParams } from "react-router-dom";
import { useStateValue } from '../../../../StateProvider';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

function ChatFooter({ media, setMedia, handleFiles }) {
    const [input, setInput] = useState('');
    const { uid } = useParams();
    const [{ user }] = useStateValue();
    const hiddenFileInput = useRef(null);

    console.log(media)

    const sendMessage = async (e) => {
        e.preventDefault();

        const receiverMessageRef = collection(db, 'users', `${uid}`, "Inbox", `${user.uid}`, "Messages")
        if (!media) {
            addDoc(receiverMessageRef, {
                message: input,
                media: media,
                sender: user.displayName,
                uid: user.uid,
                timestamp: serverTimestamp(),
            })
        } else {
            // This uploads the file to firebase storage
                const storageRef = ref(storage, `user/${user.uid}/inboxMedia/${uid}/${media[0].name}`)
                const uploadTask = uploadBytesResumable(storageRef, media)
                const receiverMessageRef = collection(db, 'users', `${uid}`, "Inbox", `${user.uid}`, "Messages")

                uploadTask.on(
                    "state_changed",
                    () => {
                    // Complete upload function for image
                    getDownloadURL(uploadTask.snapshot.ref)
                    .then((url) => {
                        // Post upload to db, grabbing url from 'getDownloadUrl()'
                        addDoc(receiverMessageRef, {
                            message: input,
                            media: url,
                            sender: user.displayName,
                            uid: user.uid,
                            timestamp: serverTimestamp(),
                    });
                })}
            )
        }
        
        const senderMessageRef = collection(db, 'users', `${user.uid}`, "Inbox", `${uid}`, "Messages")
        addDoc(senderMessageRef, {
            message: input,
            media: media,
            sender: user.displayName,
            uid: user.uid,
            timestamp: serverTimestamp(),
        })

        setInput('');
    };

    const handleRemove = (e) => {
        const targetMedia = e.target.parentElement;
        const targetMediaIndex = targetMedia.dataset.imgindex * 1;
        setMedia(
            [...media.slice(0, targetMediaIndex), ...media.slice(targetMediaIndex + 1)]
        )
    }

    const handleChange = e => {
        let files = e.target.files;
        handleFiles(files)
    }

    return (
        <div>
            <div class="chat__FilePreviews">
                {media.length > 0 && media.map((item, i)  => (
                    <div class="prev-img" key={i} data-imgindex={i} >
                        <span onClick={handleRemove} >&times;</span>
                        <img src={item.src} alt={item.name} />
                    </div>
                ))}
            </div>
            <div className="chat_footer">
                <form className="chat__Form">
                    <input value={input} onChange={e => setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text"
                    />
                    <div className="footer__Options">
                    <input type="file" onChange={handleChange} style={{ display: "none" }} ref={hiddenFileInput} />
                        <IconButton>
                            <AttachFile onClick={e => hiddenFileInput.current.click()}/>
                        </IconButton>
                    </div>
                    <button className="footer__Submit" disabled={!input} onClick={sendMessage} type="submit">
                        <Send />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChatFooter