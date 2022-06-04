import React from "react";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Badge,
  Button,
  Alert
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { deleteAnnonce } from "../../functions.js";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash,faEye } from "@fortawesome/free-solid-svg-icons";
import {ButtonPrimarySmall} from "../../styles/Buttons"
import FormAnnonceEdit from './FormAnnonceEdit';

const ButtonName = styled(Button)`
  && {
  text-align:left;
    background-color: transparent;
    border: 0;
    color: #2941ab;
    padding: 0;
    &:hover {
      cursor: pointer;
      h6 {
        color: #1ed760 !important;
      }
    }
  }
`;

export const Name = styled.h3`
  && {
    margin: 0;
    color: #2941ab !important;
    font-weight: 600;
  }
`;

export const ListDetail = styled.ul`
  && {
    display: flex;
    flex-direction: row;
    justify-content: start;
    padding: 0;
  }
`;

export const ListGroupItems = styled(ListGroupItem)`
  && {
    padding: 2rem;
  }
`;
export const ImgAnnonce = styled.img`
  width:70px;
  border-radius:.3rem;
  display: block;
    margin-right: 2rem;
`;



export const ListDetailItem = styled.li`
  && {
    display: flex;
    margin-right: 3rem;
    flex-direction: column;
    padding: 0;
    p {
      margin-bottom: 0;
      span {
        opacity: 0.8;
        font-size: 80%;
      }
    }
  }
`;

class ListAnnonce extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      annonceUserList: this.props.annonces,
      deleteMessage: false,
      showFormEdit: false,
      selectedAnnonce: null,
      showPageAnnonce: false,
      idAnnonceView: null
    };
    this.removeAnnonce = this.removeAnnonce.bind(this);
    this.editAnnonce = this.editAnnonce.bind(this);
    this.hideEditForm = this.hideEditForm.bind(this);
    this.hidePageAnnonce= this.hidePageAnnonce.bind(this);

  } //end props

  hideEditForm() {
    this.setState({ showFormEdit: false });
    this.props.hideForm();
  }


  hidePageAnnonce(value) {
    this.setState({
      showModalAnnonce: false
    });
  }

  removeAnnonce(id) {
    deleteAnnonce(id)
      .then((res) => {
        console.log("delete",res);
        if (res.status === 200) {
          this.setState({ deleteMessage: true });
          this.props.removeItem();
          setTimeout(() => {
            // After 3 seconds set the show value to false
            this.setState({ deleteMessage: false });
          }, 1000);
        }
      })
      .catch((e) => console.error(e));
  }

  editAnnonce(selectedAnnonce) {
    //console.log("edit");
    this.setState({ selectedAnnonce, showFormEdit: true });
  }

  render() {

    const {
      showFormEdit,
      selectedAnnonce,
    } = this.state;

    const {
      racesList,
      regionsList,
    } = this.props;

    if (showFormEdit) {
      return (
        <FormAnnonceEdit
          hideForm={this.hideEditForm}
          userEmail={this.props.user}
          annonce={selectedAnnonce}
          racesList={racesList}
          regionsList={regionsList}
        />
      );
    }

    return (
      <Row>
        <Col md="6">
          <h5>
            Liste annonce{" "}
            <Badge color="primary">{this.props.annonces.length}</Badge>{" "}
          </h5>
        </Col>
        <Col md="6" align="right">
          <ButtonPrimarySmall color="primary" size="sm" onClick={this.props.showForm}>
            + Ajouter une annonce
          </ButtonPrimarySmall>
        </Col>
        {this.state.deleteMessage === true && (
          <Col md="12">
            <Alert color="danger">
              Votre annonce à bien été supprimée
            </Alert>
          </Col>
        )}
        <Col md="12" className="my-4">
          <ListGroup>
            {this.props.annonces.map((annonceUser, index) => (
              <>
                <ListGroupItems key={annonceUser.annonceUserId}>
                  <Row>
                    <Col md="12" align="right">
                      {annonceUser.statut === "En ligne" && (
                        <NavLink
                          color="primary"
                          size="sm"
                          outline
                          className="mr-1"
                          to={{
                            pathname: `/chiot-de-race-a-vendre/${annonceUser.idAnnonce}`
                          }}
                          target="_blank"
                        >
                          <Button
                            color="secondary"
                            size="sm"
                            outline
                            className="mr-1"
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </Button>
                        </NavLink>
                      )}
                      {"  "}
                      <Button
                        color="primary"
                        size="sm"
                        outline
                        className="mr-1"
                        onClick={() =>
                          this.editAnnonce(annonceUser)
                        }
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </Button>{" "}
                      <Button
                        color="danger"
                        size="sm"
                        outline
                        onClick={() =>
                          this.removeAnnonce(
                            annonceUser.idAnnonce
                          )
                        }
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </Col>
                    <Col md="12" align="left" className={"d-flex flex-row align-items-start"}>
                      <ImgAnnonce src={annonceUser.photo1[0].url} alt={"photo"}/>
                      <div>
                      <ButtonName>
                        <Name>{annonceUser.titre}</Name>
                      </ButtonName>

                        <ListDetail>
                          <ListDetailItem>
                            <p>
                              <span>Statut</span>
                            </p>
                            {annonceUser.statut === "En modération" && (
                              <Badge
                                color="warning"
                              >
                                {annonceUser.statut}
                              </Badge>
                            )}
                            {annonceUser.statut === "En ligne" && (
                              <Badge
                                color="primary"
                              >
                                {annonceUser.statut}
                              </Badge>

                            )}
                            {annonceUser.statut === "Expiree" && (
                              <Badge
                                color="secondary"
                              >
                                {annonceUser.statut}
                              </Badge>
                            )}
                          </ListDetailItem>
                          <ListDetailItem>
                            <p>
                              <span>Race</span>
                            </p>
                            <p>{annonceUser.nom_race}</p>
                          </ListDetailItem>
                          <ListDetailItem>
                            <p>
                              <span>Type</span>
                            </p>
                            <p>
                              {annonceUser.type === "Vendre une portée (1 ou plusieurs chiots)" && (
                                <Badge
                                  color="primary"
                                >
                                  Vente
                                </Badge>
                              )}

                              {annonceUser.type === "Mise en réservation future portée (1 ou plusieurs chiots)" && (
                                <Badge
                                  color="secondary"
                                >
                                  Réservation
                                </Badge>
                              )}
                            </p>
                          </ListDetailItem>
                          <ListDetailItem>
                            <p>
                              <span>N° LOF</span>
                            </p>
                            <p>{annonceUser.lof_dossier} {"  "}{annonceUser.lof_annee} {"  "}{annonceUser.lof_numero} {"  "}</p>
                          </ListDetailItem>
                          <ListDetailItem>
                            <p>
                              <span>Nb chiots</span>
                            </p>
                            <p>{annonceUser.nb_male} males / {annonceUser.nb_femelle} femelles</p>
                          </ListDetailItem>
                        </ListDetail>

                      </div>

                    </Col>

                  </Row>
                </ListGroupItems>
              </>
            ))}
          </ListGroup>
        </Col>
      </Row>
    );
  }
}

export default ListAnnonce;
