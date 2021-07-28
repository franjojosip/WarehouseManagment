import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import "./TopNavigationBar.css"
import { inject } from 'mobx-react';
import AuthenticationViewStore from "../../../modules/Auth/stores/AuthenticationViewStore";
import logo from "./logout.png"
import { getUser } from '../../LocalStorage';


@inject(
    i => ({
        viewStore: new AuthenticationViewStore(i.rootStore)
    })
)
class TopNavigationBar extends React.Component {
    render() {
        const { onLogout } = this.props.viewStore;
        let user = getUser();
        return (
            <Navbar>
                <Nav.Link style={{ float: "left", color: "white" }} href="">Dobrodošao nazad, {user.fname} {user.lname}!</Nav.Link>
                <Nav.Link id="link" onClick={() => onLogout()}>
                    Odjavi se
                    <img src={logo}></img>
                </Nav.Link>
            </Navbar>
        );
    }
}

export default TopNavigationBar;