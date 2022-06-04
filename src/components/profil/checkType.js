import React from "react";
import {Row, Col, ListGroup, ListGroupItem} from "reactstrap";
import FormEditProfil from "./formEditProfil"
import ViewProfil from "./viewProfil"
import styled from "styled-components";

const ListGroupStepEleveur = styled(ListGroup)`
 &&{
     flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
 li{
 background-color: transparent;
 width:30%;
 border:1px solid rgba(0,0,0,.125)!important;
 span.number{
  background-color: #1ed760;
    color: white;
    border-radius: 100%;
    padding: 0.4rem 0;
    width: 1.5rem;
    height: 1.5rem;
    display: inline-block;
    margin: 0;
    text-align: center;
    font-size: .6rem;
    margin-right:.6rem;
    float:left;
  }
  h6{
  font-weight:700;
  margin:0 0 1rem 0;
  }
  p{
  //margin-left:3rem;
  margin-bottom:0;
  }
 }
 }
`


class CheckType extends React.Component {
  constructor(props) {
    super(props);
    this.user = this.props.user;
    this.userInfos = this.props.userInfos;
    this.userAirtableId = this.props.userAirtableId;

    this.state = {
      editForm: false,
      endFirstConnexion:false,
    };
    this.hideEditForm = this.hideEditForm.bind(this);
    this.cancelEditForm = this.cancelEditForm.bind(this);
    this.rebaseInfoUser = this.rebaseInfoUser.bind(this);
  }

  hideEditForm() {
    console.log("hideEditForm check type");
    this.setState({
      endFirstConnexion:true
    });
  }

  cancelEditForm() {
    this.setState({
      editForm: false
    });
  }

  rebaseInfoUser() {
    this.props.rebaseInfoUser();
  }

  render() {
    if (!this.userInfos.nom && this.state.endFirstConnexion === false) {
      return (
        <Row>
          <Col md="12">
            <FormEditProfil
              user={this.props.user}
              userInfos={this.props.userInfos}
              hideForm={this.hideEditForm}
              cancelEditForm={this.cancelEditForm}
              rebaseInfoUser={this.rebaseInfoUser}/>

          </Col>
        </Row>
      );
    } else {
      return (
        <Row>
          <Col md="12" className="mb-4">
              <h3 className={"text-center text-primary"}>Bienvenue :)</h3>
              <ListGroupStepEleveur>
                <ListGroupItem>
                  <h6><span className={"number"}>1</span> Créez GRATUITEMENT votre page d'éleveur</h6>
                  <p>
                    Cliquez dans le menu <b>Elevage</b> pour créer votre profil éleveur
                  </p>
                </ListGroupItem>
                <ListGroupItem>
                  <h6><span className={"number"}>2</span> Ajoutez vos chiens</h6>
                  <p>
                    Cliquez dans le menu <b>Chiens</b> pour créer vos fiches chiens qui s'ajouteeront à votre profil éleveurs
                  </p>

                </ListGroupItem>
                <ListGroupItem>
                  <h6><span className={"number"}>3</span> Ajoutez vos annonces de portées</h6>
                  <p>
                    Cliquez dans le menu <b>Annonces</b> pour créer votre annonce
                  </p>
                </ListGroupItem>

              </ListGroupStepEleveur>
          </Col>
          <Col md="12">
            <ViewProfil
              user={this.props.user}
              userInfos={this.props.userInfos}
              userAirtableId={this.props.userAirtableId}
              rebaseInfoUser={this.rebaseInfoUser}
            />
          </Col>
        </Row>
      );
    }
    }
}

export default CheckType;
