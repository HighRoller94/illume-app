import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { db } from '../../../firebase'
import { useStateValue } from '../../../StateProvider'
import { motion } from 'framer-motion'

import Menu from '@material-ui/core/Menu';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { MenuItem } from '@material-ui/core';

import EditStorePostModal from '../../Modals/StorePostModal/EditStorePostModal'

function MarketplacePost({ storePostId, title, username, usernameuid, imageUrl, price, sizes, colours}) {
    const [{ basket, user }, dispatch] = useStateValue();
    const [anchorEl, setAnchorEl] = useState(null);
    const [editopen, setEditOpen] = useState(false);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: storePostId,
                title: title,
                username: username,
                imageUrl: imageUrl,
                price: price,
                sizes: sizes,
                colours: colours,
            },
        });
    };

    const handleDelete = () => {
        db
            .collection("users")
            .doc(user.uid)
            .collection("Store Posts")
            .doc(storePostId)
            .delete()
    };

    return (
        <div>
            <motion.div 
                className="storepost" 
                layout
                whileHover={{ opacity: 1 }}
                >
                <div className="storepost_options">
                    {usernameuid === user.uid ? (
                            <MoreHorizIcon onClick={handleClick} />
                    ) : null}
                    <Menu
                            className="post_optionsmenu"
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => {setEditOpen(true); setAnchorEl(null)} } style={{ backgroundColor: 'transparent' }} >Edit</MenuItem>
                    </Menu>
                </div>
                <Link to={`/details/${usernameuid}/${storePostId}`}>
                            <img className="storepost_image" src={imageUrl} alt="" />
                </Link>
                <div className="storepost_info">
                    <p><strong>{title}</strong></p>
                    <p className="storepost_price">
                        £{price}
                    </p>
                    <p>{username}</p>
                    
                    {usernameuid === user.uid ? (
                        <button onClick={handleDelete}>Remove Item</button>
                    ) : (
                        <button onClick={addToBasket}>Add to Basket</button>
                    )}
                </div>
            </motion.div>

            <EditStorePostModal
                editopen = { editopen }
                setEditOpen = { setEditOpen}
                storePostId = { storePostId } 
            />
        </div>
    )
}

export default MarketplacePost
