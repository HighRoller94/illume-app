import React from 'react'
import { Link } from 'react-router-dom'

import './SideBarRow.css'

function SideBarRow({ title, Icon, link }) {
    return (
        <Link to={link}>
            <div className="optionssidebar_row">
                <h5>{title}</h5>
                {Icon && <Icon />}
            </div>
        </Link>
    )
}

export default SideBarRow
