import React from 'react'
import './Home.css'
import { motion } from 'framer-motion'

import FollowingPosts from '../User/FollowingPosts/FollowingPosts'
import Following from '../Following/Following'
import Followers from '../Followers/Followers'
import UploadPost from '../Upload/UploadPost/UploadPost'
import Trending from '../Trending/Trending'
import SideBar from '../Home/SideBar/SideBar'
import OptionsSideBar from '../Home/OptionsSideBar/OptionsSideBar'

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
