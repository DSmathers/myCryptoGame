import React from 'react'
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'

const Landing_Head = () => {
    const navigate = useNavigate();
  return (
    <Navbar collapseOnSelect expand="lg" id="main_navbar" variant="dark" bg="dark">
    <Container id="main_navbar_container">
        <Navbar.Brand href="/" id="main_navbar_logo">Crypto Trading Simulator</Navbar.Brand>

            <Nav className="m-1" id="header_nav_auth">
               <Nav.Item id="nav_logout_btn">
                   <Button onClick={() => navigate('/watchlist')} id="play_button">Play Now</Button>
               </Nav.Item>
            </Nav>
    </Container>
</Navbar>
  )
}

export default Landing_Head