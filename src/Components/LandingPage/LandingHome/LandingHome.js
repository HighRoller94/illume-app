import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import ReactPlayer from "react-player";

import Aos from 'aos';

import down from '../../../Images/down.png'
import medias from '../../../Images/medias.png'
import image1 from '../../../Images/image1.png'

import profilescreen from '../../../Images/profilescreen.png'

import LandingHomePosts from './LandingHomePosts/LandingHomePosts'

import "aos/dist/aos.css";
import './LandingHome.css'

function LandingHome() {
    const online = useRef(null)
    const socials = useRef(null)
    const click = useRef(null)
    const latest = useRef(null)

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    
    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    const scrollToOnline = () => { 
        online.current.scrollIntoView({ behavior: "smooth" })   
    }

    const scrollToSocials = () => { 
        socials.current.scrollIntoView({ behavior: "smooth" })   
    }

    const scrollToClick = () => { 
        click.current.scrollIntoView({ behavior: "smooth" })   
    }

    const scrollToLatest = () => { 
        latest.current.scrollIntoView({ behavior: "smooth" })   
    }

    return (
        
            <div className="landing">
                <div className="landinghome" >
                    <div className="landing_container">
                        <Fade delay={200} left>
                            <div className="landingHome_left">
                                <h1>ILLUME</h1>
                                <h2>A NEW SOCIAL PRESENCE</h2>
                                <p>Watch the promo</p>
                                <Link to="/login">
                                    <button className="create_account">Create an Account</button>
                                </Link>
                            </div>
                        </Fade>
                        <Fade delay={1000} right >
                            <div className="landingHome_right">
                            <div className="vid_container">
                                <div className="video">
                                    <ReactPlayer
                                        className="landing-player"
                                        url="https://firebasestorage.googleapis.com/v0/b/illume-68c8e.appspot.com/o/user%2Fg7aqz7KrDuZmFqZet2O2jpzVL7I2%2Fpostmedia%2FComp%201_8.mp4?alt=media&token=b44ecb6a-4dc5-4d1a-b243-c01e840297a0"
                                        light={ true }
                                        width="85%"
                                        height="85%"
                                        controls={true}
                                    />
                                </div>
                            </div>
                        </div>
                        </Fade>
                    </div>
                    <Fade delay={2000}>
                        <div className="landing_button">
                            <button className="pagedown" onClick={scrollToOnline}>
                                <img className="down" src={down} alt="" />
                            </button>
                        </div>
                    </Fade>
                </div>
                <div ref={online} className="presence_container">
                    <h1 data-aos="fade-up" >A new online presence</h1>
                    <div className="presence" data-aos="fade-up" data-aos-duration="4000" >
                        <p>Manage your presence and stay connected with the new all-in-one app for creatives, freelancers and small businesses.</p>
                        <img src={profilescreen} alt="profilescreenshot" />
                    </div>
                    <Fade delay={500}>
                        <div className="landing_button">
                            <button className="pagedown" onClick={scrollToSocials}>
                                <img className="down" src={down} alt="" />
                            </button>
                        </div>
                    </Fade>
                </div>
                <div ref={socials} className="socials">
                    <div data-aos="fade-up" className="socials_container">
                        <div data-aos="fade-up" data-aos-duration="4000" className="socials_left">
                            <img src={medias} alt="" />
                        </div>
                        <div className="socials_right">
                            <h2>All of your social media in one place</h2>
                            <p>Illume connects to your Facebook and Instagram for a seamless connection, allowing you to post to all three from one place</p>
                        </div>
                    </div>
                    <Fade delay={500}>
                        <div className="landing_button">
                            <button className="pagedown" onClick={scrollToClick}>
                                <img className="down" src={down} alt="" />
                            </button>
                        </div>
                    </Fade>
                </div>
                <div ref={click} className="allinaclick">
                    <div data-aos="fade-up" className="all_container">
                        <div className="all_left">
                            <h1>Upload to a gallery, create a store</h1>
                            <h3>ALL IN A CLICK</h3>
                        </div>
                        <div data-aos="fade-up" data-aos-duration="4000" className="all_right">
                            <img src={image1} alt="" />
                        </div>
                    </div>
                    <Fade delay={500}>
                        <div className="landing_button">
                            <button className="pagedown" onClick={scrollToLatest}>
                                <img className="down" src={down} alt="" />
                            </button>
                        </div>
                    </Fade>
                </div>
                <div ref={latest} data-aos="fade-up" data-aos-duration="4000" className="latest_gallery">
                    <h4 data-aos="fade-up">Latest from the Illume Gallery</h4>
                    <p data-aos="fade-up">Check out the latest gallery uploads from Illume users!</p>
                    <div className="latest_container">
                        <div >
                        <LandingHomePosts />
                        </div>
                    </div>
                </div>
                <div className="homefooter">
                    <h3 onClick={scrollToTop}>Back to top</h3>
                </div>
            </div>
    )
}

export default LandingHome
