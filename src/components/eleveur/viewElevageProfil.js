import React from "react";
import {
  FormGroup,
  Button,
  Row,
  Col,
  Alert, ListGroupItem, ListGroup,Badge
} from "reactstrap";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import FormEditElevage from "./formEditElevage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import {getInfoElevage} from "../../functions";
import {ButtonPrimarySmall} from "../../styles/Buttons";
import AsyncSelect from 'react-select/async';

const AlertS = styled(Alert)`
 color: #424244;
`


class ViewElevageProfil extends React.Component {
  constructor(props) {
    super(props);
    this.user = this.props.user;
    this.userInfos = this.props.userInfos;
    this.userAirtableId = this.props.userAirtableId;

    this.state = {
      editForm: false,
      infoElevage: [],
      race: null,
      racesList: null,
      nomElevage:null
    };
    this.viewEditForm = this.viewEditForm.bind(this);
    this.hideEditForm = this.hideEditForm.bind(this);
    this.cancelEditForm = this.cancelEditForm.bind(this);
  }

  viewEditForm() {
    this.setState({
      editForm: true
    });
  }

  hideEditForm() {
    this.setState({
      editForm: false
    });
    window.location.reload(true);
  }

  cancelEditForm() {
    this.setState({
      editForm: false
    });
  }

  componentDidMount() {
    //on check si le user a déjà rentrée des informations d'élevage
    getInfoElevage(this.props.user)
      .then((res) => {
        if(res.length > 0){
          this.setState({
            infoElevage: res,
            isLoaded: true,
            nomElevage: res[0].nom_elevage
          });
        }
        //console.log("infoElevageRenseigner", this.state.nomElevage);
      });
  }

  render() {
    return (
      <div>
        <Row className={"mb-4"}>
          <Col md="6">
            <h5>
              Votre élevage{" "}
              <Badge color="primary">1</Badge>{" "}
            </h5>
          </Col>
          <Col md={"6"} align={"right"}>
            {
              this.state.infoElevage.map(item => (
                <>
                  {item.statut === "En modération" && (
                    <p>
                      <Badge color={"light"} className={"p-3"}>
                        <FontAwesomeIcon icon={faInfoCircle} className="mr-3" />
                        Votre profil éleveur est en cours de modération
                      </Badge>
                    </p>
                  )}
                  {item.statut === "En ligne" && (
                    <NavLink
                      to={{
                        pathname: `/eleveur-chien-de-race/${item.url_elevage}`
                      }}
                      target="_blank"
                    >
                      <ButtonPrimarySmall>Voir mon profil d'eleveur en ligne</ButtonPrimarySmall>
                    </NavLink>
                  )}
                </>
              ))}
          </Col>
        </Row>

        <AlertS color="light">
          <Row>
            <Col md={"12"}>
              {this.state.editForm === true && (
                <FormEditElevage
                  user={this.props.user}
                  userInfos={this.props.userInfos}
                  onUpdate={this.hideEditForm}
                  hideForm={this.hideEditForm}
                  cancelEditForm={this.cancelEditForm}
                />
              )}
              {this.state.editForm === false && (
                <>
                  <Row form>
                    <Col md={12}>
                      {
                        this.state.infoElevage.map(item => (
                          <>
                            <ListGroup>
                              <ListGroupItem className={"d-flex justify-content-between"}>
                                <span>Nom Elevage</span>
                                <span><b>{item.nom_elevage}</b></span>
                              </ListGroupItem>
                              <ListGroupItem className={"d-flex justify-content-between"}>
                                <span>Adresse</span>
                                <span className={"text-right"}>
                                  <b>
                                    {item.adresse}{" "}<br/>
                                    {item.cp}{" "}{item.ville}{" "}{item.region}
                                  </b>
                                </span>
                              </ListGroupItem>
                              <ListGroupItem className={"d-flex justify-content-between"}>
                                <span>SIRET</span>
                                <span><b>{item.siret}</b></span>
                              </ListGroupItem>
                              <ListGroupItem className={"d-flex justify-content-between"}>
                                <span>Page Facebook</span>
                                <span><b>
                                  <a href={'http://www.facebook.com/' + item.facebook} target="blank">{item.facebook}</a>
                                </b></span>
                              </ListGroupItem>
                            </ListGroup>

                            <ListGroup>
                              <ListGroupItem className={"mt-5"}>
                                <span><b>Présentation</b></span><br/>
                                <span>{item.description}</span>
                              </ListGroupItem>
                            </ListGroup>
                          </>
                        ))
                      }
                      <FormGroup>
                        <Button
                          type="submit"
                          color="primary"
                          outline
                          className="mt-3"
                          onClick={this.viewEditForm}
                        >
                          Modifier
                        </Button>
                      </FormGroup>
                    </Col>

                    <Col md={"12"}>
                      <hr/>
                      <ListGroup>
                        <ListGroupItem className={"mt-5"}>
                          <span><b>Photos de présentation</b></span><br/>
                        </ListGroupItem>
                      </ListGroup>

                      <ListGroup>
                        <ListGroupItem className={"mt-5"}>
                          <span><b>Races</b></span><br/>
                          <FormGroup>
                            <AsyncSelect
                              cacheOptions
                              loadOptions={this.loadRacesOptions}
                              defaultOptions
                              onInputChange={this.handleRaceInputChange}
                              name="race"
                              id="race"
                              placeholder="Choisir"
                            />
                          </FormGroup>

                        </ListGroupItem>
                      </ListGroup>
                    </Col>
                  </Row>


                </>
              )}

            </Col>
          </Row>
        </AlertS>
      </div>
    );
  }
}

export default ViewElevageProfil;
