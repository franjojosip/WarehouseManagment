import React from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { inject } from 'mobx-react';
import SideBarViewStore from "./SideBarViewStore";
import "./SideBar.css"

@inject(
    i => ({
        viewStore: new SideBarViewStore(i.rootStore)
    })
)
class SideBar extends React.Component {
    render() {
        const { selectedRoute, onNavigate } = this.props.viewStore;

        let textStyle = {
            color: "black",
            textAlign: "center",
            marginTop: 10
        };
        return (
            <SideNav
                className="sideNavbar"
                onSelect={(route) => {
                    if (route && route.length > 0) {
                        onNavigate(route);
                    }
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected={selectedRoute}>
                    <NavItem eventKey="home">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText className="dropdown-toggle" style={textStyle}>
                            Naslovnica
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="warehouses">
                        <NavIcon>
                            <i className="fa fa-fw fa-warehouse" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText style={textStyle}>
                            Skladište
                        </NavText>
                        <NavItem eventKey="warehouse">
                            <NavText style={textStyle}>
                                Pregled Skladišta
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="stock">
                            <NavText style={textStyle}>
                                Stanje Skladišta
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="entry">
                            <NavText style={textStyle}>
                                Unos u skladište
                            </NavText>
                        </NavItem>
                    </NavItem>
                    <NavItem eventKey="products">
                        <NavIcon>
                            <i className="fa fa-fw fa-boxes" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText style={textStyle}>
                            Proizvodi
                        </NavText>
                        <NavItem eventKey="product">
                            <NavText style={textStyle}>
                                Pregled proizvoda
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="category">
                            <NavText style={textStyle}>
                                Kategorije
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="subcategory">
                            <NavText style={textStyle}>
                                Potkategorije
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="packaging">
                            <NavText style={textStyle}>
                                Ambalaža
                            </NavText>
                        </NavItem>
                    </NavItem>
                    <NavItem eventKey="cities">
                        <NavIcon>
                            <i className="fa fa-fw fa-city" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText style={textStyle}>
                            Gradovi
                        </NavText>
                        <NavItem eventKey="city">
                            <NavText style={textStyle}>
                                Pregled gradova
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="location">
                            <NavText style={textStyle}>
                                Lokacije
                            </NavText>
                        </NavItem>
                    </NavItem>
                    <NavItem eventKey="user">
                        <NavIcon>
                            <i className="fa fa-fw fa-users" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText style={textStyle}>
                            Korisnici
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="reciept">
                        <NavIcon>
                            <i className="fa fa-fw fa-receipt" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText style={textStyle}>
                            Preuzimanja
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="stocktaking">
                        <NavIcon>
                            <i className="fa fa-fw fa-cubes" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText style={textStyle}>
                            Inventura
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="notifications">
                        <NavIcon>
                            <i className="fa fa-fw fa-bell" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText style={textStyle}>
                            Obavijesti
                        </NavText>
                        <NavItem eventKey="notificationlog">
                            <NavText style={textStyle}>
                                Dnevnik obavijesti
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="notificationsettings">
                            <NavText style={textStyle}>
                                Postavke obavijesti
                            </NavText>
                        </NavItem>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>

        );
    }
}

export default SideBar;