import React, { useState, useEffect, useCallback } from 'react'

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import AddPost from '../../../../Images/AddPost.png';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

function AddFacebookpost({ fbUserAccessToken, PAGE_ID }) {
    const [body, setBody] = useState();
    const [imageurl, setImageUrl] = useState();
    const [open, setOpen] = useState(false);
    const [fbPageAccessToken, setFbPageAccessToken] = useState();
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(async () => {
        if (fbUserAccessToken) {
            window.FB.api(
                `/${PAGE_ID}?fields=access_token&access_token=${fbUserAccessToken}`,
                ({ access_token }) => setFbPageAccessToken(access_token)
            );
        }
    }, [fbUserAccessToken]);

    const Post = useCallback(() => {
        if (!imageurl) {
            window.FB.api(
                `/${PAGE_ID}/feed`,
                "POST",
                {
                    access_token: fbPageAccessToken,
                    message: body,
                },
                () => {
                    setBody("");
                    setImageUrl("");
                    setOpen(false);
                }
            );
        } else {
            window.FB.api(
                `/${PAGE_ID}/photos`,
                "POST",
                {
                    access_token: fbPageAccessToken,
                    message: body,
                    url: imageurl
                },
                () => {
                    setBody("");
                    setOpen(false);
                }
            );
        }
    }, [body, fbPageAccessToken]);

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
                        <div className="facebookadd_post">
                            <h2>Add Facebook Post</h2>
                            <input type="text" placeholder="My first post" onChange={event => setBody(event.target.value)} value={body} />
                            <input type="text" placeholder="ImageUrl..." onChange={event => setImageUrl(event.target.value)} value={imageurl} />
                        </div>                        
                        <div className="facebook_postbuttons">
                            <Button 
                                disabled={!body} onClick={Post}>
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

export default AddFacebookpost