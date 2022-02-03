import React, { useState } from 'react'

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import AddPost from '../../../../Images/AddPost.png';

import './AddInstagramPost.css'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

function AddInstagramPost({ fbUserAccessToken }) {
    const classes = useStyles();
    const [imageurl, setImageUrl] = useState("");
    const [body, setBody] = useState("");
    const [open, setOpen] = useState(false);


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

    const createMediaObjectContainer = (instagramAccountId) => {
        return new Promise((resolve) => {
        window.FB.api(
            `${instagramAccountId}/media`,
            "POST",
            {
            access_token: fbUserAccessToken,
            image_url: imageurl,
            caption: body,
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
        setBody("");
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <img className="homepost_button" src={AddPost} onClick={ () => setOpen(true) }alt=""/>
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                >
                    <Fade in={open}>
                    <div className="modalwindow">
                        <div className="addinsta_post">
                            <h2>Add Instagram Post</h2>
                            <input type="text" placeholder="My first post" onChange={event => setBody(event.target.value)} value={body} />
                            <input type="text" placeholder="ImageUrl..." onChange={event => setImageUrl(event.target.value)} value={imageurl} />
                        </div>                        
                        <div className="insta_postbuttons">
                            <Button disabled={!body} onClick={shareInstagramPost}>
                            <AddCircleIcon />
                            </Button>
                        </div>
                    </div>
                    </Fade>
                </Modal>
            </div>
        </div>
    )
}

export default AddInstagramPost
