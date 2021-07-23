import React from 'react';
import TopNavigationBar from '../Navigation/Navbar/TopNavigationBar';
import SideBar from '../Navigation/Sidebar/SideBar';

export default (props) => {
    return (
        <React.Fragment>
            <SideBar />
            <TopNavigationBar />
            {props.children}
        </React.Fragment>
    )
}
