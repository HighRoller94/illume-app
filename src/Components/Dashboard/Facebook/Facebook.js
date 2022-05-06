import React, { useState, useEffect }from "react";

import FacebookPost from './FacebookPost/FacebookPost';
import AddFacebookPost from './AddFacebookPost/AddFacebookPostModal';

function Facebook() {
    const PAGE_ID = "";
    const [posts, setPosts] = useState([]);
    const [profilepic, setProfilePic] = useState();
    const [fbName, setFbName] = useState();
    const [pageid, setPageId] = useState();
    
    useEffect(() => {
        async function fetchData() {
            window.FB.api(
                `/me?fields=accounts`,
                "GET",
                function(response) {
                    setPageId(response.accounts.data[0].id)
                }
            )
        }
        fetchData();
    }, [])

    useEffect(() => {
        async function fetchPosts() {
            window.FB.api(
                `/${PAGE_ID}/feed?fields=message, full_picture, created_time`,
                "GET",
                {limit: 6},
                function(response) {
                    if (response) {
                        const data = response.data
                        setPosts(data);
                    }
                }
            )
        }
        fetchPosts();
    }, [])

    useEffect(() => {
        window.FB.api(
            `/${PAGE_ID}/?fields=name,picture`,
            "GET",
            function(response) {
                    setProfilePic(response.picture.data.url)
                    setFbName(response.name)
            }
        )
    }, [])
    
    return (
        <div className="facebook">
            <div className="facebook_col">
                <AddFacebookPost PAGE_ID={PAGE_ID}/>
            </div>
            <div>
                <div>
                    {posts.map((post) => (
                        <FacebookPost
                            fbName = {fbName}
                            profilepic = {profilepic}
                            date = {post.created_time}
                            message = {post.message}
                            picture = {post.full_picture}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Facebook;