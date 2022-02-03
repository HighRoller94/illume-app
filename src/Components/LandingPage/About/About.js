import React, { useRef, useEffect } from 'react'
import Aos from 'aos';
import Fade from 'react-reveal/Fade'

import profilescreen from '../../../Images/profilescreen.png'

import jobs from '../../../Images/jobs.png'
import profile from '../../../Images/profile.png'
import store from '../../../Images/store.png'

import gallery from '../../../Images/gallery.png'
import logo from '../../../Images/logo.png'
import fb from '../../../Images/fb.png'
import insta from '../../../Images/insta.png'
import message from '../../../Images/message.png'

import down from '../../../Images/down.png'

import "aos/dist/aos.css";
import './About.css'

function About() {
    const projects = useRef(null)
    const secondprojects = useRef(null)
    const testimonials = useRef(null)

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    
    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    const scrollToProjects = () => { 
        projects.current.scrollIntoView({ behavior: "smooth" })   
    }

    const scrollToSecondProjects = () => { 
        secondprojects.current.scrollIntoView({ behavior: "smooth" })   
    }

    const scrollToTestimonials = () => { 
        testimonials.current.scrollIntoView({ behavior: "smooth" })   
    }

    return (
        <div className="about">
            <div className="about_container">
                    <div className="about_header">
                    <Fade delay={400} bottom>
                        <h1>About Illume</h1>
                        <p>
                            Illume is aimed at providing creatives, freelancers and small businesses a way to network and grow their business. 
                            From Illume you can control your main social medias - Facebook, Instagram and Illume itself. Post to all three 
                            within seconds without ever leaving the site. Build a profile, stay connected.
                        </p>
                    </Fade>
                    <Fade delay={400} bottom>
                        <img src={profilescreen} alt="profilescreenshot" />
                    </Fade>
                    </div>
                <Fade delay={2000}>
                    <div className="scroll_down">
                        <button className="pagedown" onClick={scrollToProjects}>
                            <img className="down" src={down} alt="" />
                        </button>
                    </div>
                </Fade>
            </div>
            <div ref={projects} className="about_secondcontainer">
                <div data-aos="fade-up" className="project_header">
                    <h1>All in one place</h1>
                    <p>
                        Living in a social media dominated world means that creatives and freelancers are forced to divvy up their
                        time managing several apps at once. Illume makes it easier by having everything in one place, and more.
                    </p>
                </div>
                <div data-aos="fade-up" data-aos-duration="4000" className="icons_container">
                    <div className="job_icon">
                        <img className="jobs_icon" src={jobs} alt="Jobs" />
                        <h4>Search Jobs/Listings</h4>
                        <p>Find your ideal project</p>
                    </div>
                    <div className="job_icon">
                        <img className="profile_icon" src={profile} alt="Jobs" />
                        <h4>Manage your presence</h4>
                        <p>Build a profile, stay connected</p>
                    </div>
                    <div className="job_icon">
                        <img className="store_icon" src={store} alt="Jobs" />
                        <h4>Build your store</h4>
                        <p>Share your work</p>
                    </div>
                </div>
                <Fade delay={2000}>
                    <div className="scroll_down">
                        <button className="pagedown" onClick={scrollToSecondProjects}>
                            <img className="down" src={down} alt="" />
                        </button>
                    </div>
                </Fade>
            </div>
            <div ref={secondprojects} className="about_thirdcontainer">
                <div data-aos="fade-up" className="secondproject_header">
                    <h1>Search listings, partner with projects</h1>
                    <p>
                        With Illume, users can post their own project or job listings and reply to others instantly, encouraging a growing 
                        community of creatives. They can also search for available jobs with Illume search, and find their ideal placements.
                    </p>
                </div>
                <div data-aos="fade-up" data-aos-duration="4000" className="projecticons_container">
                        <div className="job_icon">
                            <img className="gallery_icon" src={gallery} alt="Jobs" />
                            <h4>Create a gallery</h4>
                            <p>Display your portfolio</p>
                        </div>
                        <div className="socialmedia_logos">
                            <div className="job_icon">
                                <div className="illume_logos">
                                    <img src={logo} alt="Jobs" />
                                </div>
                                <img className="media_icons" src={fb} alt="Jobs" />
                                <img className="media_icons" src={insta} alt="Jobs" />
                                <h4>Control your social media</h4>
                                <p>Using our primed and ready dashboard</p>
                            </div>
                        </div>
                        <div className="job_icon">
                            <img className="message_icon"src={message} alt="Jobs" />
                            <h4>Keep in touch</h4>
                            <p>With Illume messenger</p>
                        </div>
                    </div>
                    <div className="aboutfooter">
                        <h3 onClick={scrollToTop}>Back to top</h3>
                    </div>
            </div>
        </div>
    )
}

export default About
