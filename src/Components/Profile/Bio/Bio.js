import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { useStateValue } from '../../../StateProvider';
import { Button } from '@material-ui/core';
import { db } from '../../../firebase';

import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LanguageIcon from '@material-ui/icons/Language';
import EditSharpIcon from '@material-ui/icons/EditSharp';

import BioModal from '../../Modals/BioModal/BioModal';
import FollowButton from '../FollowButton/FollowButton';
import userProfile from '../../../Assets/Images/userProfile.png';


function Bio() {
    const [userdata, setUserData] = useState('');
    const [biodata, setBioData] = useState('');
    const [open, setOpen] = useState(false);
    const { uid } = useParams();
    const [{ user }] = useStateValue();
    const [count, setCount] = useState();

    // Collect the users biography info from the DB

    useEffect(() => {
        db
            .collection('users')
            .doc(uid)
            .get()
            .then(doc => {
                const data = doc.data()
                setUserData({ ...data })
            })
        db
            .collection('users')
            .doc(uid)
            .collection('Additional Info')
            .doc('Bio')
            .get()
            .then(doc => {
                const biodata = doc.data()
                setBioData({ ...biodata })
            })
            setCount(0)
    }, [uid, count])

    function updateBio() {
        setCount(count +1)
    }

    return (
        
        <div className="bio_section">
                <h1 className="bio_username">{userdata.username}</h1>
                {userdata.profileImage ? (
                    <img className="bio_image" src={userdata.profileImage} alt="" />
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
                    <p className="bioBody_info">{biodata.biography}</p>
                    <p className="bioBody_occupation">{biodata.occupation}</p>
                    <p className="bioBody_location">{biodata.location}</p>
                    <Link to={`/gallery/${uid}`} >
                            <p className="bioGallery_link">Gallery</p>
                    </Link>
                    <Link to={`/store/${uid}`} >
                            <p className="bioStore_link">Store</p>
                    </Link>
                </div>
                <div className="social">
                    {biodata.insta ? ( 
                        <a href={biodata.insta} target="_blank" rel="noreferrer"><InstagramIcon style={{ fontSize: '40px', margin: '15px' }} /></a>
                    ) : (null)}
                    {biodata.facebook ? ( 
                        <a href={biodata.facebook} target="_blank" rel="noreferrer"><FacebookIcon style={{ fontSize: '40px', margin: '15px' }}/></a>
                    ) : (null)}
                    {biodata.website ? (
                        <a href={biodata.website} target="_blank" rel="noreferrer"><LanguageIcon style={{ fontSize: '40px', margin: '15px' }}/></a>
                    ) : (null)}
                </div>
                <BioModal updateBio={updateBio} open={open} setOpen={setOpen} />
        </div>
    )
}

export default Bio
