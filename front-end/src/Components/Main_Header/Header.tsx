import { Navbar, Container, Nav, Button, NavDropdown } from 'react-bootstrap'
import { useUserAuth } from '../../Contexts/AuthContext';
import './Header.css'
import AuthNavbar from './navbar/AuthNavbar';
import NoAuthNavbar from './navbar/NoAuthNavbar';




const Header = () => {
    let { isAuthenticated } = useUserAuth()
  return (
     <header id="home_header">
         {isAuthenticated?<AuthNavbar />:<NoAuthNavbar />}
     </header>
  );
};



export default Header;
