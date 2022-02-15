import React from 'react';
import { Navbar, Container, Nav, Button, NavDropdown } from 'react-bootstrap'
import { useUserAuth } from '../../../Contexts/AuthContext';

const AuthNavbar = () => {
    const { logOut } = useUserAuth();
    const handleLogout = (e:React.MouseEvent | React.KeyboardEvent) => {
        e.preventDefault();
        logOut();
    }
  return (
    <Navbar collapseOnSelect expand="lg" id="main_navbar" variant="dark">
    <Container id="main_navbar_container">
        <Navbar.Brand href="/" id="main_navbar_logo">Crypto Trading Simulator</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" id="main_navbar_toggle" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto text-center" id="main_navbar_links">
                <Nav.Link href="/market">Market</Nav.Link>
                <Nav.Link href="/wallet">Wallet</Nav.Link>
                <Nav.Link href="/watchlist">Watchlist</Nav.Link>
            </Nav>
            <NavDropdown.Divider style={{color: 'white'}} />
            <Nav className="m-1" id="header_nav_auth">
               <Nav.Item id="nav_logout_btn">
                   <Button onClick={handleLogout} variant="primary-outline" id="logout_btn">Log Out</Button>
               </Nav.Item>
            </Nav>
        </Navbar.Collapse>
    </Container>
</Navbar>);
};

export default AuthNavbar;
