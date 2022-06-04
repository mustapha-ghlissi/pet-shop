import { NavLink } from "react-router-dom";
import React from "react";
import {
  NavItem
} from "reactstrap";
import { ButtonWhite } from "../styles/Buttons";
import { withAuth0 } from "@auth0/auth0-react";

class MainNav extends React.Component {


  render() {
    const { isAuthenticated } = this.props.auth0;

    if(isAuthenticated === false){
      return(
          <>
             <NavItem className="eleveur">
               <NavLink
                to="/eleveurs"
                exact
                className="nav-link"
                activeClassName="router-link-exact-active"
              >
                 <ButtonWhite size="md">
                   JE SUIS ÉLEVEUR
                 </ButtonWhite>
                 </NavLink>
             </NavItem>
     </>
      )
    }else{
      return(<></>)
    }
  }
}

export default withAuth0(MainNav);
