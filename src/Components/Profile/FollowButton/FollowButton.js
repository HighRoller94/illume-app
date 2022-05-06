import React, { useEffect, useState } from 'react';
import { useStateValue } from '../../../StateProvider';
import { useParams } from 'react-router-dom'
import { db } from '../../../firebase';

function FollowButton() {
    const { uid } = useParams();
    const [{ user }] = useStateValue();
    const [following, setFollowing] = useState('');
    
    useEffect(() => {
        db
            .collection("users")
            .doc(user.uid)
            .collection("Following")
            .doc(uid)
            .get()
            .then(doc => {
                if (doc.exists) {
                    setFollowing(true)
                }
            })
    }, [uid]);

    const Follow = async () => {
        const following = db.collection("users").doc(uid) 
        const userdata = await following.get().then((doc) => doc.data())
        const follower = db.collection("users").doc(user.uid) 
        const docdata = await follower.get().then((doc) => doc.data())

        if (userdata) {
                db
                    .collection("users")
                    .doc(user.uid)
                    .collection("Following")
                    .doc(uid)
                    .set({ ...userdata })
                db
                    .collection("users")
                    .doc(uid)
                    .collection("Followers")
                    .doc(user.uid)
                    .set({ ...docdata })
            
                    setFollowing(true)
        }
            
            const posts = db
                .collection("users")
                .doc(uid)
                .collection("Posts")
                .orderBy('timestamp', 'desc')
                .limit(20)
                .get()
            
            const collection = await posts.then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        const writeBatch = db.batch();
                        const destination = db.collection("users").doc(user.uid).collection("Following Posts")
                        writeBatch.set(destination.doc(doc.id), doc.data());
                        writeBatch.commit();
                    })
            })
        }
    
    const Unfollow = async () => {
        db
            .collection("users")
            .doc(user.uid)
            .collection("Following")
            .doc(uid)
            .delete()
        
        db
            .collection("users")
            .doc(uid)
            .collection("Followers")
            .doc(user.uid)
            .delete()
            
        const deleteFollowingPosts = 
        
            db
                .collection("users")
                .doc(user.uid)
                .collection("Following Posts")
                .where("usernameuid", "==", uid)
                deleteFollowingPosts.get().then(function(snapshot) {
                    snapshot.forEach(function(doc) {
                        doc.ref.delete();
            });

            setFollowing(false)
        });
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
