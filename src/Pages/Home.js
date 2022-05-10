import React from 'react';
import { motion } from 'framer-motion';

import FollowingPosts from '../Components/Home/FollowingPosts/FollowingPosts';
import Following from '../Components/Home/Following/Following';
import Followers from '../Components/Home/Followers/Followers';
import UploadPost from '../Components/Home/UploadPost';
import Trending from '../Components/Home/Trending/Trending';
import SideBar from '../Components/Layout/LeftSidebar/SideBar';
import OptionsSideBar from '../Components/Layout/RightSidebar/SideBar';

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
