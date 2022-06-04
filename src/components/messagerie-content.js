import React from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,Alert
} from "reactstrap";
import styled from "styled-components";
import classnames from "classnames";
import Message from "./messages/messages"


const AlertS = styled(Alert)`
 color: #424244;
`


export const NavLinkDashboard = styled(Nav)`
  && {
    border: 0;
  }
`;
export const NavItemS = styled(NavItem)`
  && {
    border: 0;
    &:hover,
    &:focus {
      border: 0;
    }
  }
`;

export const NavLinkS = styled(NavLink)`
  && {
    border: 0;
    color: black;
    &:hover,
    &:focus {
      border: 0;
      cursor: pointer;
    }
    &.active {
      color: #1ed760 !important;
      font-weight: bold;
      background-color: transparent;
    }
  }
`;

const Content = styled.div`
  && {
    background-color:#F5F5F5;
    padding-top:8rem;
    min-height: 100vh !important;
    margin-top: 3rem;
  }
`;

class MessagerieContent extends React.Component {
  constructor(props) {
    super(props);
    this.user = this.props.user;
    this.state = {
      isLoaded: false,
      userInfos: [],
      activeTab: '1'
    };
    this.toggle = this.toggle.bind(this);


  }


  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({activeTab: tab});
    }
  }


  render() {
    return(
      <>
        <>
          <Content className="content">
            <Container>
              <Row>
                <Col md="3">
                  <NavLinkDashboard tabs className="flex-column">
                    <NavItemS>

                      <NavLinkS
                        className={classnames({ active: this.state.activeTab === "1" })}
                        onClick={() => {
                          this.toggle("1");
                        }}
                      >
                        Boite de réception
                      </NavLinkS>
                    </NavItemS>
                    <NavItemS>

                      <NavLinkS
                        className={classnames({ active: this.state.activeTab === "2" })}
                        onClick={() => {
                          this.toggle("2");
                        }}
                      >
                        Non lus
                      </NavLinkS>
                    </NavItemS>
                    <NavItemS>
                      <NavLinkS
                        className={classnames({ active: this.state.activeTab === "3" })}
                        onClick={() => {
                          this.toggle("3");
                        }}
                      >
                        Favoris
                      </NavLinkS>
                    </NavItemS>
                    <NavItemS>
                      <NavLinkS
                        className={classnames({ active: this.state.activeTab === "4" })}
                        onClick={() => {
                          this.toggle("4");
                        }}
                      >
                        Envoyés
                      </NavLinkS>
                    </NavItemS>
                  </NavLinkDashboard>
                </Col>
                <Col md="9">
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <Row>
                        <Col md="12">
                          <h4 className="mb-5">Vos messages</h4>
                        </Col>
                        <Col md="12">
                          <AlertS color="light">
                            <Message/>
                          </AlertS>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row>
                        <Col md="12">
                          <h4 className="mb-5">Vos messages - Non lus</h4>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="3">
                      <Row>
                        <Col md="12">
                          <h4 className="mb-5">Vos messages - Favoris</h4>
                        </Col>
                      </Row>
                    </TabPane>

                    <TabPane tabId="4">
                      <Row>
                        <Col md="12">
                          <h4 className="mb-5">Vos messages - Envoyés</h4>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </Col>
              </Row>
            </Container>
          </Content>
        </>
      </>
    )
  }
}


export default MessagerieContent;
