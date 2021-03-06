import React from 'react';
import { useStateValue } from '../../../StateProvider';

import SettingsIcon from '@material-ui/icons/Settings';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import StorageIcon from '@material-ui/icons/Storage';

import SideBarRow from './SideBarRow';

function OptionsSideBar() {
    const [{ user }] = useStateValue()
    return (
        <div className="optionssidebar">
            <SideBarRow link={'/orders'} Icon={ShoppingBasketIcon} title="My Orders"/>
            <SideBarRow link={'/myjobs'} Icon={StorageIcon} title="Listings"/>
            <SideBarRow link={`/account`} Icon={AccountCircleIcon} title="Account"/>
            <SideBarRow link={`/profile/${user.uid}`} Icon={SettingsIcon} title="Settings"/>
        </div>
    )
}

export default OptionsSideBar