import React from 'react'
import { Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom'

function SideBarRow({ title, Icon, src, link, img }) {
    return (
        <Link to={link}>
            <div className="sidebar_row">
                {src && <Avatar src={src} />}
                {Icon && <Icon />}
                <h4>{title}</h4>
            </div>
        </Link>
    )
}

export default SideBarRow