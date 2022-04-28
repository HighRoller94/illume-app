import React from 'react'
import './Home.css'
import { motion } from 'framer-motion'

import FollowingPosts from '../Components/User/FollowingPosts/FollowingPosts'
import Following from '../Components/Following/Following'
import Followers from '../Components/Followers/Followers'
import UploadPost from '../Components/Upload/UploadPost/UploadPost'
import Trending from '../Components/Trending/Trending'
import SideBar from '../Components/Home/SideBar/SideBar'
import OptionsSideBar from '../Components/Home/OptionsSideBar/OptionsSideBar'

function Home() {

    return (
        <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            >
            <div className="home_row">
                <div className="left_options">
                    <SideBar />
                </div>
                <div className="leftCol_home">
                    <Following />
                    <Followers />
                </div>
                <div className="centerCol_home">
                    <UploadPost />
                    <FollowingPosts />
                </div>
                <div className="rightCol_home">
                    <Trending />
                </div>
                <div className="options">
                    <OptionsSideBar />
                </div>
            </div>
        </motion.div>
    )
}

export default Home
