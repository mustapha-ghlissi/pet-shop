import React from "react";
import { ListGroup, ListGroupItem, Container, Row, Col } from "reactstrap";
import styled from "styled-components";
import logo from '../img/fydop-logo-white.png'

const ListGroups = styled(ListGroup)`
  flex-direction: row;
  justify-content: flex-end;
  text-transform: uppercase;
  .list-group-item {
    border: 0;
    background-color:transparent;
    a {
      color: white;
      font-weight: 800;
    }
  }
`;

const TitleCol = styled.p`
  font-weight:600;
  font-size:14px;
  color:black;
`;

const SectionEnd = styled.section`
  background-color:#1ed760;
  padding:1rem 0;
  color:white;
  a{color:white;}
`;
const SectionLinks = styled.section`
 padding:2rem 0;
 background-color:#1ad76036;
 a.list-group-item{
 color:#114e23;
 }
`;

const ListGroupS = styled(ListGroup)`
.list-group-item{
  background-color:transparent;
  border:0;
  font-size:.8rem;
}
`;

class Footer extends React.Component {
  render() {
    return (
      <footer>
      <SectionLinks>
        <Container>
          <Row>
            <Col md="4">
              <TitleCol>
                Chiens de races les plus recherchés
              </TitleCol>
              <ListGroupS>
                <ListGroupItem tag="a" href="/recherche-chien-de-race?race=recxCE4u1NRfgqE4Q">Chien de race - Shiba Inu</ListGroupItem>
                <ListGroupItem tag="a" href="/recherche-chien-de-race?race=recCsb8o01H0JzvpQ">Chien de race - Labrador</ListGroupItem>
                <ListGroupItem tag="a" href="/recherche-chien-de-race?race=recFZ8OYXXJdVfjXy">Chien de race - Bouledogue Français</ListGroupItem>
                <ListGroupItem tag="a" href="/recherche-chien-de-race?race=recOjcL7YiG4MQrzQ">Chien de race - Berger Allemand</ListGroupItem>
                <ListGroupItem tag="a" href="/recherche-chien-de-race?race=recx4GFjfmNHSCgAj">Chien de race - Carlin</ListGroupItem>
              </ListGroupS>
            </Col>

            <Col md="4">
              <TitleCol>
                Eleveurs de chiens de race par région
              </TitleCol>
              <ListGroupS>
                <ListGroupItem tag="a" href="#">Éleveurs chiens de race - Ile-de-France</ListGroupItem>
                <ListGroupItem tag="a" href="#">Éleveurs chiens de race - Auvergne-Rhône-Alpes</ListGroupItem>
                <ListGroupItem tag="a" href="#">Éleveurs chiens de race - Bretagne</ListGroupItem>
                <ListGroupItem tag="a" href="#">Éleveurs chiens de race - Centre-Val de  Loire</ListGroupItem>
                <ListGroupItem tag="a" href="#">Éleveurs chiens de race - Normandie</ListGroupItem>
              </ListGroupS>
            </Col>

            <Col md="4">
              <TitleCol>
                Dernières annonces
              </TitleCol>
              <ListGroupS>
                <ListGroupItem tag="a" href="#">Éleveurs de chiens de race - Il-de-France</ListGroupItem>
                <ListGroupItem tag="a" href="#">Éleveurs de chiens de race - Il-de-France</ListGroupItem>
                <ListGroupItem tag="a" href="#">Éleveurs de chiens de race - Il-de-France</ListGroupItem>
                <ListGroupItem tag="a" href="#">Éleveurs de chiens de race - Il-de-France</ListGroupItem>
              </ListGroupS>
            </Col>
          </Row>
        </Container>
      </SectionLinks>

      <SectionEnd>
        <Container>
          <Row>
          <Col md="2" align="left">
          <img width="100" src={logo} alt="logo fydop"/>
          </Col>
            <Col md="10" align="right">
              <ListGroups>
                <ListGroupItem>
                  <a href="http://www.google.com" target={"blank"}>Contact</a>
                </ListGroupItem>
                <ListGroupItem>
                  <a href="http://www.google.com" target={"blank"}>Mentions légales</a>
                </ListGroupItem>
              </ListGroups>
            </Col>
          </Row>

        </Container>
      </SectionEnd>
    </footer>
    );
  }
}
export default Footer;
