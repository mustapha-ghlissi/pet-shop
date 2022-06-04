import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  CardImg,CardBody,CardSubtitle,CardTitle
} from "reactstrap";
import styled from "styled-components";
import {Titleh2} from "../styles/Typography";
import {allAnnonces} from '../functions'
import{BadgeType,ListAnnonce,NbChiots,BlocImage,NavLinkAnnonce,Annonce,InfoEleveur} from "./annonces-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw,faUser } from "@fortawesome/free-solid-svg-icons";
import {ButtonPrimary} from "../styles/Buttons";


const SectionSelect = styled.section`
  padding:2rem 0;
  }
`;



class DernieresAnnonces extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      annoncesList: [],
      isLoaded: false
    };
  } //end props

  componentDidMount() {
    allAnnonces()
      .then((res) => {
        //console.log("res", res.data.records);
        this.setState({ annoncesList: res.data.records, isLoaded: true });
      })
      .catch((e) => console.error(e));
  }

  render() {
    return (
      <SectionSelect>
        <Container>
          <Row>
            <Col md={12} align={"center"}>
              <Titleh2>Dernières annonces</Titleh2>
              <br/>
            </Col>
          </Row>
          <Row>
            <Col>
            {this.state.isLoaded === true && (
                <ListAnnonce>
                  <Row>
                  {this.state.annoncesList.slice(0, 3).map((annonce, index) => (
                      <Col lg={4} md={6}>
                        <NavLinkAnnonce
                          to={{
                            pathname: `/chiot-de-race-a-vendre/${annonce.fields.id}`
                          }}
                          target="_blank"
                        >
                          <Annonce>
                            {annonce.fields.type === "Vendre une portée (1 ou plusieurs chiots)" && (
                              <BadgeType className={"vente"}>
                                En vente
                              </BadgeType>
                            )}
                            {annonce.fields.type === "Mise en réservation future portée (1 ou plusieurs chiots)" && (
                              <BadgeType className={"reservation"}>
                                Réservation
                              </BadgeType>
                            )}
                            <BlocImage>
                              {/*{annonce.fields.photo_1.map((photo, index) => (
                                <>
                                  <CardImg
                                    alt="Card image cap"
                                    src={photo.url}
                                    top
                                    width="100%"
                                  />
                                </>))}*/}
                              <CardImg
                                alt="Card image cap"
                                src="https://picsum.photos/200/300"
                                top
                                width="100%"
                              />
                            </BlocImage>
                            <CardBody>
                              <NbChiots>
                                <FontAwesomeIcon icon={faPaw}  />
                                {annonce.fields.nb_femelle} femelles / {annonce.fields.nb_males} males
                              </NbChiots>
                              <CardTitle tag="h5">
                                {annonce.fields.titre}
                              </CardTitle>
                              <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6"
                              >
                                Prix {annonce.fields.prix_total}€
                              </CardSubtitle>
                              <InfoEleveur>
                                <FontAwesomeIcon icon={faUser}  />{annonce.fields.nom_elevage} • {annonce.fields.regions}
                              </InfoEleveur>
                            </CardBody>
                          </Annonce>
                        </NavLinkAnnonce>
                      </Col>
                  ))}
                  </Row>
                </ListAnnonce>
            )}
            </Col>
          </Row>
          <Row>
            <Col md="12" align="center" className={"mt-4"}>
              <NavLink to="/recherche-chien-de-race">
                <ButtonPrimary>
                  Voir toutes les annonces
                </ButtonPrimary>
              </NavLink>
            </Col>
          </Row>
        </Container>
      </SectionSelect>

    );
  }
}

export default withAuth0(DernieresAnnonces);
