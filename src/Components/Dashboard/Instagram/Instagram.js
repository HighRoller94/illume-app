import React, { useEffect, useState } from "react";

import InstagramPost from "./InstagramPost/InstagramPost";
import AddInstagramPost from "./AddInstagramPost/AddInstagramPost";

import './Instagram.css'

function Instagram ({ fbUserAccessToken }) {

    const PAGE_ID = ""
    const [imageUrl, setImageUrl] = useState("");
    const [profilepic, setProfilePic] = useState();
    const [instaname, setInstaName] = useState();
    const [postCaption, setPostCaption] = useState("");
    const [posts, setPosts] = useState([])

    const getFacebookPages = () => {
        return new Promise((resolve) => {
        window.FB.api(
            "me/accounts",
            { access_token: fbUserAccessToken },
            (response) => {
            resolve(response.data);
            }
        );
        });
    };

    const getInstagramAccountId = (facebookPageId) => {
        return new Promise((resolve) => {
        window.FB.api(
            facebookPageId,
            {
            access_token: fbUserAccessToken,
            fields: "instagram_business_account",
            },
            (response) => {
            resolve(response.instagram_business_account.id);
            }
        );
        });
    };
    
    useEffect(() => {
        window.FB.api(
            `/${PAGE_ID}?fields=profile_picture_url, name`,
            "GET",
            function(response) {
                setInstaName(response.name)
                setProfilePic(response.profile_picture_url)
            }
        )
    }, [])


    useEffect(() => {
        window.FB.api(
            `/${PAGE_ID}/media?fields=caption,media_url,timestamp,like_count,id`,
            "GET",
            {limit: 6},
            function(response) {
                const data = response.data
                setPosts(data);
            }
        )
    }, [])

    const createMediaObjectContainer = (instagramAccountId) => {
        return new Promise((resolve) => {
        window.FB.api(
            `${instagramAccountId}/media`,
            "POST",
            {
            access_token: fbUserAccessToken,
            image_url: imageUrl,
            caption: postCaption,
            },
            (response) => {
            resolve(response.id);
            }
        );
        });
    };

 
    const publishMediaObjectContainer = (
        instagramAccountId,
        mediaObjectContainerId
    ) => {
        return new Promise((resolve) => {
        window.FB.api(
            `${instagramAccountId}/media_publish`,
            "POST",
            {
            access_token: fbUserAccessToken,
            creation_id: mediaObjectContainerId,
            },
            (response) => {
            resolve(response.id);
            }
        );
        });
    };

    const shareInstagramPost = async () => {

        const facebookPages = await getFacebookPages();
        const instagramAccountId = await getInstagramAccountId(facebookPages[0].id);
        const mediaObjectContainerId = await createMediaObjectContainer(
        instagramAccountId
        );

        await publishMediaObjectContainer(
        instagramAccountId,
        mediaObjectContainerId
        );

        setImageUrl("");
        setPostCaption("");
    };

    return (
        
        <div className="instagram">
            <div className="insta-col">
                <AddInstagramPost />
            </div>
            <div className="instaposts">
                {posts.map((post) => (
                    <InstagramPost
                        id = {post.id}
                        profilepic = {profilepic}
                        instaName = {instaname}
                        timestamp = {post.timestamp}
                        likes = {post.like_count}
                        picture = {post.media_url}
                        message = {post.caption}
                        />
                ))}
            </div>
        </div>
    );
}

export default Instagram;