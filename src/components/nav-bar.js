import React from "react";

import MainNav from "./main-nav";
import AuthNav from "./auth-nav";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars,faSearch,faUsers} from "@fortawesome/free-solid-svg-icons";
import logo from '../img/fydop-logo-white.png'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Container,NavItem
} from "reactstrap";
import styled from 'styled-components'

const LogoS = styled.img`
height:40px;
margin-right:2rem;
`

const NavS = styled(Navbar)`
 background: url('img/back-nav.png'), #1ad760;
border-bottom: 1px solid rgba(255, 255, 255, 0.3);
height:100px;
color:#fff;
position:absolute;
width:100%;
top: 0;
left:0;
a{
  color:#fff;
}
.eleveur{
  margin-right:1rem;
}
@media (max-width: 768px) {
    background-position:14%;
    .navbar-toggler{
    border-color:white;
    svg{color:white;}
    }
    .container{
    background-color: #1ad760;
    margin: 0;
    padding:.5rem;
    z-index: 1;
    }
  }
`
const NavLinkS = styled(NavLink)`
 color: #114e23!important;
border-radius: 1rem;
padding-left: 1rem!important;
padding-right: 1rem!important;
margin-right:2rem;
`



class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <NavS expand="md">
       <Container>
         <NavbarBrand>
         <NavLink
                to="/"
                exact
              >
           <LogoS src={logo} alt=""/>
           </NavLink>
         </NavbarBrand>
         <NavbarToggler onClick={this.toggle}>
           <span><FontAwesomeIcon icon={faBars}  /></span>
         </NavbarToggler>
         <Collapse isOpen={this.state.isOpen} navbar className="justify-content-end">
           <Nav className="navbar-nav" navbar>
             <NavItem>
               <NavLinkS
                 to="/recherche-chien-de-race"
                 exact
                 className="nav-link"
                 activeClassName="router-link-exact-active"
               >
                 <FontAwesomeIcon icon={faSearch}  /> {"  "}
                  <b> Rechercher un chien</b>
               </NavLinkS>
             </NavItem>
             <NavItem>
               <NavLinkS
                 to="/eleveurs-chien-de-race"
                 exact
                 className="nav-link"
                 activeClassName="router-link-exact-active"
               >
                 <FontAwesomeIcon icon={faUsers}  /> {"  "}
                 <b> Tous les éléveurs</b>
               </NavLinkS>
             </NavItem>
           </Nav>
         <Nav className="navbar-nav ml-auto align-items-center" navbar>
            <MainNav />
            <AuthNav/>
           </Nav>
         </Collapse>
      </Container>
      </NavS>
    );
  }
}

export default NavBar;
