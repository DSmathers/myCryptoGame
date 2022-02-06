import { Navbar, Container, Nav, Button, NavDropdown } from 'react-bootstrap'

const NoAuthNavbar = () => {
  return(
    <Navbar collapseOnSelect expand="lg" id="main_navbar" variant="dark">
    <Container id="main_navbar_container">
        <Navbar.Brand href="/" id="main_navbar_logo">Crypto Trading Simulator</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" id="main_navbar_toggle" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto text-center" id="main_navbar_links">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#about">About</Nav.Link>
                <Nav.Link href="#learn">Learn</Nav.Link>
            </Nav>
            <NavDropdown.Divider style={{color: 'white'}} />
            <Nav className="m-1">
               <Nav.Item>
                   <Button href="/login" className="w-100" variant="secondary-outline" id="login_btn">Log In</Button>
               </Nav.Item>
               <Nav.Item>
                   <Button href='/signup' className="w-100" variant="primary" id="signup_btn">Sign Up</Button>
               </Nav.Item>
            </Nav>
        </Navbar.Collapse>
    </Container>
</Navbar>)
};

export default NoAuthNavbar;
