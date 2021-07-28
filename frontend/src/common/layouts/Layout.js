import React from 'react';
import TopNavigationBar from '../Navigation/Navbar/TopNavigationBar';
import SideBar from '../Navigation/Sidebar/SideBar';
import Loading from './Loading';

export default (props) => {
    return (
        <React.Fragment>
            <SideBar />
            <TopNavigationBar />
            <Loading visible={props.isLoaderVisible} />
            <div className="layout" style={{ marginLeft: 60, marginTop: 60 }}>
                {props.children}
            </div>
        </React.Fragment>
    )
}
