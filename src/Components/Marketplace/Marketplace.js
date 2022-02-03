import React, { useState, useEffect } from 'react'
import MarketplacePosts from './MarketplacePosts/MarketplacePosts'

import './Marketplace.css'

function Marketplace() {

    return (
        <div className="marketplace">
            <h1>Marketplace</h1>
            <MarketplacePosts />
        </div>
    )
}

export default Marketplace
