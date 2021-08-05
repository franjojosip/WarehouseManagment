import React from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { inject } from 'mobx-react';
import SideBarViewStore from "./SideBarViewStore";
import "./SideBar.css"
import { getUser } from '../../LocalStorage';

@inject(
    i => ({
        viewStore: new SideBarViewStore(i.rootStore)
    })
)
class SideBar extends React.Component {
    render() {
        const { route, onNavigate } = this.props.viewStore;
        const loggedUser = getUser();
        let isLoggedAdmin = loggedUser && loggedUser.role.toLowerCase() == "administrator";

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
                <SideNav.Nav defaultSelected={route} style={{ marginTop: 20 }}>
                    <NavItem eventKey="home">
                        <NavIcon style={{ paddingTop: 5 }}>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText style={textStyle}>
                            Naslovnica
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="warehouses">
                        <NavIcon style={{ paddingTop: 5 }}>
                            <i className="fa fa-fw fa-warehouse" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText style={textStyle}>
                            Skladište
                        </NavText>
                        {
                            isLoggedAdmin ?
                                <NavItem eventKey="warehouse">
                                    <NavText style={textStyle}>
                                        Pregled skladišta
                                    </NavText>
                                </NavItem>
                                : null
                        }
                        <NavItem eventKey="stock">
                            <NavText style={textStyle}>
                                Stanje skladišta
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="entry">
                            <NavText style={textStyle}>
                                Unos u skladište
                            </NavText>
                        </NavItem>
                    </NavItem>
                    {
                        isLoggedAdmin ?
                            <NavItem eventKey="products">
                                <NavIcon style={{ paddingTop: 5 }}>
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
                            : null
                    }
                    {
                        isLoggedAdmin ?
                            <NavItem eventKey="cities">
                                <NavIcon style={{ paddingTop: 5 }}>
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
                            : null
                    }
                    {
                        isLoggedAdmin ?
                            <NavItem eventKey="users">
                                <NavIcon style={{ paddingTop: 5 }}>
                                    <i className="fa fa-fw fa-users" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText style={textStyle}>
                                    Korisnici
                                </NavText>
                                <NavItem eventKey="user">
                                    <NavText style={textStyle}>
                                        Pregled korisnika
                                    </NavText>
                                </NavItem>
                            </NavItem>
                            : null
                    }<NavItem eventKey="reciepts">
                        <NavIcon style={{ paddingTop: 5 }}>
                            <i className="fa fa-fw fa-receipt" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText style={textStyle}>
                            Preuzimanja
                        </NavText>
                        <NavItem eventKey="reciept">
                            <NavText style={textStyle}>
                                Pregled preuzimanja
                            </NavText>
                        </NavItem>
                    </NavItem>
                    <NavItem eventKey="stocktakings">
                        <NavIcon style={{ paddingTop: 5 }}>
                            <i className="fa fa-fw fa-cubes" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText style={textStyle}>
                            Inventure
                        </NavText>
                        <NavItem eventKey="stocktaking">
                            <NavText style={textStyle}>
                                Pregled inventura
                            </NavText>
                        </NavItem>
                    </NavItem>
                    {
                        isLoggedAdmin ?
                            <NavItem eventKey="notifications">
                                <NavIcon style={{ paddingTop: 5 }}>
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
                                <NavItem eventKey="schedule">
                                    <NavText style={textStyle}>
                                        Osvježenje obavijesti
                                    </NavText>
                                </NavItem>
                            </NavItem>
                            : null
                    }
                </SideNav.Nav>
            </SideNav>

        );
    }
}

export default SideBar;