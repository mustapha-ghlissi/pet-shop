import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import {Container, Row, Col, ListGroupItem,ListGroup} from "reactstrap";
import styled from "styled-components";
import Step1 from '../img/eleveur-step1.png';
import Step2 from '../img/eleveur-step2.png';
import Step3 from '../img/eleveur-step3.png';
import { ButtonPrimary } from "../styles/Buttons";


const SectionSelect = styled.section`
  padding:3rem 0;
  margin-bottom:2rem;
  background-color:#f6f6f1;
`;
export const ListGroupEleveur = styled(ListGroup)`
   &&{
 li{
 border:0;
 margin-bottom: 2rem;
 background-color: transparent;
 div.number{
 width: 48px;
    height: 48px;
    border: solid 1px rgba(21, 101, 216, 0.18);
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right:1.5rem;
 }
 span.number{
  background-color: #114e23;
    color: white;
    border-radius: 100%;
    padding: 0.4rem 0;
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h6{
  font-weight:700;
  margin-top:1rem;
  color:#1ad760;
  font-size:1.4rem;
  }
 }
 }
`;


class HiwEleveurs extends React.Component {
  render() {
    const { loginWithRedirect } = this.props.auth0;
  return (
    <SectionSelect>
      <Container>

        <Row>
          <Col md={"12"} className={"text-center mt-3 mb-3"}>
            <h3>3 étapes pour débuter</h3>
          </Col>
        </Row>

        <Row>

          <Col md={"12"}>
            <ListGroupEleveur>
              <ListGroupItem>
                <Row>
                  <Col md={"6"}>
                    <div className={"number"}><span className={"number"}> 1 </span></div>
                    <h6>Créer gratuitement votre profil d'eleveur de chien de race </h6>
                      <p>Compléter vos informations d'éleveurs de chiens de race et obtenez le lien de votre profil. Partagez le ensuite où vous voulez <b>gratuitement</b>.</p>
                  </Col>
                  <Col md={"6"}>
                    <img src={Step1} alt={"step-1"} width={"100%"}/>
                  </Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col md={"6"}>
                    <div className={"number"}><span className={"number"}> 2 </span></div>
                    <h6>Publiez vos annonces de portées en 3 clics </h6>
                    <p>Mettez facilement en ligne vos annonces de portées. Et partagez cette annonce sur vos réseaux sociaux pour centraliser vos demandes de contact.</p>
                  </Col>
                  <Col md={"6"}>
                    <img src={Step2} alt={"step-2"} width={"100%"}/>
                  </Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col md={"6"}>
                    <div className={"number"}><span className={"number"}> 3 </span></div>
                    <h6>Recevez uniquement des contacts qualifiés </h6>
                    <p>Les futurs acheteurs vous donne les informations importants pour l'accueil d'un chien de race. Vous ne recevez que les messages des personnes ayant répondu à toutes les questions.</p>
                  </Col>
                  <Col md={"6"}>
                    <img src={Step3} alt={"step-3"} width={"100%"}/>
                  </Col>
                </Row>
              </ListGroupItem>

            </ListGroupEleveur>
          </Col>
        </Row>
        <Row>
          <Col md="12" align="center" className={"mt-5"}>
              <ButtonPrimary onClick={() => loginWithRedirect({ui_locales: 'fr'})}>
                Créer gratuitement mon profil éleveur
              </ButtonPrimary>
          </Col>
        </Row>
      </Container>
    </SectionSelect>
  );
  }
}

export default withAuth0(HiwEleveurs);
