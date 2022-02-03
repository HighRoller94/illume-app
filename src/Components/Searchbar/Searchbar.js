import React from 'react'
import SearchOutlined from '@material-ui/icons/Search';

import './Searchbar.css'

function Searchbar() {
    
    return (
            <div className="navbar_search">
                    <div className="navbar_searchContainer">
                        <SearchOutlined />
                        <input className="navbar_searchInput" type="text" placeholder="Search Illume..." />
                    </div>
            </div>
    )
}

export default Searchbar
