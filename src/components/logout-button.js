// src/components/login-button.js

import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import {
  NavItem,Tooltip
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEnvelope, faPowerOff} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";



const LinkLogOut = styled(NavItem)`
align-items: center;
svg {
  color: #fff;
  margin-right: 0.3rem;
}
`;

const LinkProfil = styled(NavLink)`
  background-color: #fbf7e740;
  border-radius: 0.8rem;
  padding:1.2rem 2rem!important;
  margin-right:2rem;
  h6 {
    margin-bottom: 0;
  }
`;


class LogoutButton extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);
    this.state = {
      tooltipOpen: false,
      tooltipOpen2: false,
      tooltipOpen3: false
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }
  toggle2() {
    this.setState({
      tooltipOpen2: !this.state.tooltipOpen2
    });
  }
  toggle3() {
    this.setState({
      tooltipOpen3: !this.state.tooltipOpen3
    });
  }


  render() {
    const { logout } = this.props.auth0;
    const { user } = this.props.auth0;

    return (
      <>
      <div className="d-flex justify-content-end align-items-center">

                  <NavItem>
                    <LinkProfil
                      to="/profile"
                      activeClassName="router-link-exact-active"
                      id="tooltipProfil"
                    >
                      <span className="user-info">
                        <h6 className="d-inline-block pr-3">{user.name}</h6>{" "}
                        <img
                          src={user.picture}
                          alt="Profile"
                          className="nav-user-profile d-inline-block rounded-circle ml-3"
                          width="30"
                        />
                      </span>
                    </LinkProfil>
                    <Tooltip placement="bottom" isOpen={this.state.tooltipOpen3} target="tooltipProfil" toggle={this.toggle3}>
                      Votre profil
                    </Tooltip>
                  </NavItem>
              <LinkLogOut>
                <NavLink
                  to="/messagerie"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" id="tooltipMessagerie"/>
                  <Tooltip placement="bottom" isOpen={this.state.tooltipOpen} target="tooltipMessagerie" toggle={this.toggle}>
                    Messagerie
                  </Tooltip>
                </NavLink>


                <NavLink
                  className="ml-2"
                  to="#"
                  id="qsLogoutBtn"
                  onClick={() =>
                    logout({
                      returnTo: window.location.origin,
                    })
                  }
                >
                  <FontAwesomeIcon icon={faPowerOff} className="mr-2" id="tooltipLogout" />
                  <Tooltip placement="bottom" isOpen={this.state.tooltipOpen2} target="tooltipLogout" toggle={this.toggle2}>
                    Deconnexion
                  </Tooltip>
                </NavLink>
              </LinkLogOut>
                </div>
      </>
    );
  }
}

export default withAuth0(LogoutButton);
