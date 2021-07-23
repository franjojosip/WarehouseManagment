import React from 'react';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import "./TopNavigationBar.css"
import logo from "./logout.png"


class TopNavigationBar extends React.Component {
    render() {

        return (
            <Navbar>
                <Nav.Link style={{ float: "left", color: "white" }} href="">Dobrodošao nazad, Mark Otto !</Nav.Link>
                <Nav.Link id="link" href="/login">
                    Odjavi se
                    <img src={logo}></img>
                </Nav.Link>
            </Navbar>
        );
    }
}

export default TopNavigationBar;