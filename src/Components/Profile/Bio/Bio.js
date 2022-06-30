import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { useStateValue } from '../../../StateProvider';
import { Button } from '@material-ui/core';
import { db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';

import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LanguageIcon from '@material-ui/icons/Language';
import EditSharpIcon from '@material-ui/icons/EditSharp';

import BioModal from '../../Modals/BioModal/BioModal';
import FollowButton from '../FollowButton/FollowButton';
import userProfile from '../../../Assets/Images/userProfile.png';


function Bio() {
    const [userData, setUserData] = useState('');
    const [bioData, setBioData] = useState('');
    const [open, setOpen] = useState(false);
    const { uid } = useParams();
    const [{ user }] = useStateValue();
    const [count, setCount] = useState();

    // Collect the users biography info from the DB

    useEffect(() => {
        const getUserData = async () => {
            const userRef =  doc(db, "users", `${uid}`)
            const unsub = await getDoc(userRef)
                .then((doc) => {
                    setUserData(doc.data())
                })
            return unsub;
        }
        const getBioData = async () => {
            const bioRef = doc(db, "users", `${uid}`, "Additional Info", "Bio")
            const unsub = await getDoc(bioRef)
                .then((doc) => {
                    setBioData(doc.data())
                    setCount(0)
                })
            return unsub;
        }

        getUserData();
        getBioData();
    }, [uid, count])

    function updateBio() {
        setCount(count +1)
    }

    return (
        
        <div className="bio_section">
                <h1 className="bio_username">{userData?.username}</h1>
                {userData?.profileImage ? (
                    <img className="bio_image" src={userData?.profileImage} alt="" />
                ) : (
                    <img className="bio_image" src={userProfile} alt="" />
                )}
                <div className="follow">
                    {uid !== user.uid ? (
                        <FollowButton />
                    ) : ( 
                        <Button>
                            <EditSharpIcon onClick={() => setOpen(true)}/>
                        </Button>
                    )}
                </div>
                <div className="bio_info">
                    <p className="bioBody_info">{bioData?.biography}</p>
                    <p className="bioBody_occupation">{bioData?.occupation}</p>
                    <p className="bioBody_location">{bioData?.location}</p>
                    <Link to={`/gallery/${uid}`} >
                            <p className="bioGallery_link">Gallery</p>
                    </Link>
                    <Link to={`/store/${uid}`} >
                            <p className="bioStore_link">Store</p>
                    </Link>
                </div>
                <div className="social">
                    {bioData?.insta ? ( 
                        <a href={bioData?.insta} target="_blank" rel="noreferrer"><InstagramIcon style={{ fontSize: '40px', margin: '15px' }} /></a>
                    ) : (null)}
                    {bioData?.facebook ? ( 
                        <a href={bioData?.facebook} target="_blank" rel="noreferrer"><FacebookIcon style={{ fontSize: '40px', margin: '15px' }}/></a>
                    ) : (null)}
                    {bioData?.website ? (
                        <a href={bioData?.website} target="_blank" rel="noreferrer"><LanguageIcon style={{ fontSize: '40px', margin: '15px' }}/></a>
                    ) : (null)}
                </div>
                <BioModal userData={userData} bioData={bioData} updateBio={updateBio} open={open} setOpen={setOpen} />
        </div>
    )
}

export default Bio
