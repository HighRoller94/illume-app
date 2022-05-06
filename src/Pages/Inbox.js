import React, { useState } from 'react';
import { motion } from 'framer-motion';

import Chat from '../Components/Inbox/Chat/Chat';
import Sidebar from '../Components/Inbox/Sidebar/Sidebar';

function Inbox() {
    
    return (
        <motion.div
            className="inbox_container"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            >
                <div className="inbox_sidebar">
                    <Sidebar />
                </div>
                <div className="inbox_chat">
                    <Chat />
                </div>
            
        </motion.div>
    )
}

export default Inbox
