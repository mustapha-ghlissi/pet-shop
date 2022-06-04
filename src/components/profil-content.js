import React from "react";
import { checkUserExist, createUser, getUserInfo } from '../functions.js'
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col
} from "reactstrap";
import Loading from "./loading";
import styled from "styled-components";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import CheckType from "./profil/checkType"
import CheckAnnonce from "./annonce/checkAnnonce"
import CheckElevage from "./eleveur/checkElevage"
import CheckChien from "./chiens/checkChien"

const SectionLoader = styled.div`
  min-height:100vh;
`;


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
  }
`;

const InformationBloc = styled.div`
  && {
    border: 1px solid #1ed760;
    border-radius: 0.4rem;
    padding: 1rem;
    margin-bottom:2rem;
    background-color:#1ad76021;
    h6{
    margin-bottom:0;
    }
    svg{
    color:#1ed760;
    }
  }
`



class ProfilContent extends React.Component {
  constructor(props) {
    super(props);
    this.user = this.props.user;
    this.state = {
      isLoaded: false,
      userInfos: [],
      activeTab: '1',
    };
    this.toggle = this.toggle.bind(this);
    this.rebaseInfoUser = this.rebaseInfoUser.bind(this);


    checkUserExist(this.props.user.email)
        .then((res) => {
          //console.log("reponse check", res);
          if (res === 0) {
            //le user n'existe pas donc on va le créer
            //console.log("n'existe pas");
            createUser(this.props.user)
              .then((res) => {
                getUserInfo(this.props.user.email)
                  .then((res) => {
                    if (res != null) {
                      console.log("profil content", res)
                      this.setState({ userInfos: res, isLoaded: true });
                    }
                  })
                  .catch((e) => console.error(e));
              })
              .catch((e) => console.error(e));
          }else{
            getUserInfo(this.props.user.email)
              .then((res) => {
                if (res != null) {
                  console.log("profil content", res)
                  this.setState({ userInfos: res, isLoaded: true });
                }
              })
              .catch((e) => console.error(e));
          }
        })
        .catch((e) => console.error(e));



    //console.log("profil content user", this.props.user);
    console.log("profil content userInfo", this.state.userInfos);
  }


  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  rebaseInfoUser() {
    getUserInfo(this.props.user.email)
      .then((res) => {
        if (res != null) {
          console.log("profil content rebase", res)
          this.setState({ userInfos: res, isLoaded: true });
        }
      })
      .catch((e) => console.error(e));
  }

  render() {
    const { isLoaded } = this.state;
    //console.log("render profil content userInfos airtableId", userInfos.UserIdAirtable);
    //console.log("render profil content user", user);
    if (isLoaded === true) {
      return (
        <Content className="content">
          <Container>
            <Row>
              <Col md="2">
                <NavLinkDashboard tabs className="flex-column">
                  <NavItemS>

                    <NavLinkS
                      className={classnames({ active: this.state.activeTab === "1" })}
                      onClick={() => {
                        this.toggle("1");
                      }}
                    >
                      Votre profil
                    </NavLinkS>
                  </NavItemS>
                  <NavItemS>

                    <NavLinkS
                      className={classnames({ active: this.state.activeTab === "2" })}
                      onClick={() => {
                        this.toggle("2");
                      }}
                    >
                      Elevage
                    </NavLinkS>
                  </NavItemS>
                  <NavItemS>
                    <NavLinkS
                      className={classnames({ active: this.state.activeTab === "3" })}
                      onClick={() => {
                        this.toggle("3");
                      }}
                    >
                      Vos chiens
                    </NavLinkS>
                  </NavItemS>
                  <NavItemS>
                    <NavLinkS
                      className={classnames({ active: this.state.activeTab === "4" })}
                      onClick={() => {
                        this.toggle("4");
                      }}
                    >
                      Annonces
                    </NavLinkS>
                  </NavItemS>

                </NavLinkDashboard>
              </Col>
              <Col md="10">
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Col md="12">
                        <h4>Profil</h4>
                      </Col>
                      <Col md="12">
                        <CheckType  user={this.props.user} userInfos={this.state.userInfos} userAirtableId={this.state.userInfos.id_airtable} rebaseInfoUser={this.rebaseInfoUser} />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col md="12">
                        <h4>Elevage</h4>
                      </Col>
                      <Col md="12" className="">
                        <InformationBloc className={"d-flex flex-row justify-content-start align-items-center"}>
                         <div> <FontAwesomeIcon icon={faInfoCircle} className="fa-2x mr-3" /></div>
                          <div>
                            <h6>C'est ici que vous paramétrez les informations qui s'afficheront dans votre fiche éleveur.</h6>
                          </div>
                        </InformationBloc>
                        <CheckElevage user={this.props.user} userInfos={this.state.userInfos} userAirtableId={this.state.userInfos.id_airtable} />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="3">
                    <Row>
                      <Col md="6">
                        <h4>Vos chiens</h4>
                      </Col>
                      <Col md="12">
                        <InformationBloc className={"d-flex flex-row justify-content-start align-items-center"}>
                          <div> <FontAwesomeIcon icon={faInfoCircle} className="fa-2x mr-3" /></div>
                          <div>
                            <h6>Ajoutez ici les chiens de votre élevage, ils s'afficheront automatiquement dans votre fiche eleveur.</h6>
                          </div>
                        </InformationBloc>
                        <CheckChien user={this.props.user} userInfos={this.state.userInfos} userAirtableId={this.state.userInfos.id_airtable} />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="4">
                    <Row>
                      <Col md="12">
                        <h4>Annonces</h4>
                      </Col>
                      <Col md="12">
                        <InformationBloc className={"d-flex flex-row justify-content-start align-items-center"}>
                          <div> <FontAwesomeIcon icon={faInfoCircle} className="fa-2x mr-3" /></div>
                          <div>
                            <h6>Ajoutez vos annonces de portées ici. La première est gratuite :)</h6>
                          </div>
                        </InformationBloc>
                        <CheckAnnonce user={this.props.user} userInfos={this.state.userInfos} userAirtableId={this.state.userInfos.id_airtable} />
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>
              </Col>
            </Row>
          </Container>
        </Content>
      );
    } else {
      return (
        <SectionLoader>
          <Loading />
        </SectionLoader>
      )
    }
  }
}


export default ProfilContent;
