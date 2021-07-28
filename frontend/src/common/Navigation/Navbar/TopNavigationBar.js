import React from 'react';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import "./TopNavigationBar.css"
import { inject, observer } from 'mobx-react';
import AuthenticationViewStore from "../../../modules/Auth/stores/AuthenticationViewStore";
import logo from "./logout.png"


@inject(
    i => ({
        viewStore: new AuthenticationViewStore(i.rootStore)
    })
)
class TopNavigationBar extends React.Component {
    render() {

        const { onLogout } = this.props.viewStore;
        return (
            <Navbar>
                <Nav.Link style={{ float: "left", color: "white" }} href="">Dobrodošao nazad, Mark Otto !</Nav.Link>
                <Nav.Link id="link" onClick={() => onLogout()}>
                    Odjavi se
                    <img src={logo}></img>
                </Nav.Link>
            </Navbar>
        );
    }
}

export default TopNavigationBar;