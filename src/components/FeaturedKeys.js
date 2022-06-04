import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col,ListGroup, ListGroupItem } from "reactstrap";
import styled from "styled-components";
import { ButtonPrimary } from "../styles/Buttons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch,faComments,faCheckSquare,faDog,faShieldAlt,faLock} from "@fortawesome/free-solid-svg-icons";


const SectionSelect = styled.section`
  padding:2rem 0;
  h4{
  color:#114e23;
  margin-bottom:2rem;
  }
`;

const ListGroupFeature = styled(ListGroup)`
li{
display:flex;
background-color:transparent;
border:0;
padding:0 3rem;
margin:1.5rem 0;
  svg{
      font-size: 2rem;
      margin-right: 1.5rem;
      color:#677785;
  }
  p{
    font-size: 1rem;
    line-height: 1.5rem;
    color: #677785;
    text-align: left;
  }
  &:last-child{
  justify-content: center;
  }
}

`;


class FeaturedKeys extends React.Component {
  render() {
    const { loginWithRedirect } = this.props.auth0;
    return (
      <SectionSelect>
        <Container>

          <Row className={"d-flex align-items-stretch"}>
            <Col md={"6"} align={"center"} className={"d-flex flex-column"}>
              <h4>Je recherche un chien de race</h4>
              <ListGroupFeature>
                <ListGroupItem>
                  <FontAwesomeIcon icon={faSearch} />
                  <p>Consultez toutes les annonces de vente de chiots de race depuis le moteur de recherche. Effectuez votre recherche selon vos critères, race de chiens, région de l'éleveurs...etc</p>
                </ListGroupItem>
                <ListGroupItem>
                  <FontAwesomeIcon icon={faComments}  />
                  <p>Contactez gratuitement les éleveurs de chiens de race et posez leur toutes vos questions pratiques concernant les chiots et leur vente, via notre messagerie intégrée.</p>
                </ListGroupItem>
                <ListGroupItem>
                  <FontAwesomeIcon icon={faCheckSquare}  />
                  <p>
                    Réservez un chiot de race directement en ligne de manière sécurisée en quelques clics. Vous ne serez débité qu’en cas d’acceptation de votre demande de réservation par l'éleveur de chien.</p>
                </ListGroupItem>
                <ListGroupItem>
                  <NavLink to="/recherche-chien-de-race">
                    <ButtonPrimary>
                      Recherchez un chien de race
                    </ButtonPrimary>
                  </NavLink>
                </ListGroupItem>
              </ListGroupFeature>
            </Col>
            <Col md={"6"} align={"center"}  className={"d-flex flex-column"}>
              <h4>Je suis éleveur de chiens de race</h4>
              <ListGroupFeature>
                <ListGroupItem>
                  <FontAwesomeIcon icon={faDog}  />
                  <p>
                    Créez gratuitement une annonce pour vendre vos chiots de race. Bénficiez d'un accompagnement par nos équipes pour compléter et mettre en avant votre annonce.</p>
                </ListGroupItem>
                <ListGroupItem>
                  <FontAwesomeIcon icon={faShieldAlt}  />
                  <p>Recevez vos demandes d'informations sur votre messagerie sécurisée. Plus besoin de répondre par mail, sms ou sur les réseaux sociaux, tout est au même endroit.</p>
                </ListGroupItem>
                <ListGroupItem>
                  <FontAwesomeIcon icon={faLock}  />
                  <p>Gérez vos réservations et vente de chiots simplement. Recevez vos paiements d'accompte en ligne et transmettez les documents d'après vente en un seul clic.</p>
                </ListGroupItem>
                <ListGroupItem>
                  <ButtonPrimary onClick={() => loginWithRedirect({ui_locales: 'fr'})}>
                    Créer gratuitement mon profil éleveur
                  </ButtonPrimary>
                </ListGroupItem>
              </ListGroupFeature>
            </Col>
          </Row>
        </Container>
      </SectionSelect>
    );
  }
}

export default withAuth0(FeaturedKeys);
