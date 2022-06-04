import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import { Container, Row, Col} from "reactstrap";
import styled from "styled-components";
import { ButtonPrimary } from "../styles/Buttons";
import { Title } from "../styles/Typography";

const SectionHeader = styled.div`
  padding-top:8rem;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align:left;
  overflow: hidden;
  z-index:1;
  margin-bottom:3rem;
  p {
    color: black;
  }
`;
const TitleS = styled(Title)`
  color: black;
  text-align:left;
  span {
    color: #1ed760;
  }
   @media (max-width: 768px) {
   padding-top:2rem;
   }
  
  
`;
const Subtitle = styled.p`
  width:80%;
`;
const ImgS = styled.img`
  height:400px;
  border-radius:2rem;
  @media (max-width: 768px) {
   height:200px;
  }
`;



class HeaderEleveur extends React.Component {
  render() {
    const { loginWithRedirect } = this.props.auth0;

    return (

      <SectionHeader>
        <Container>
          <Row>
            <Col md="8">
              <TitleS>
              La plateforme qui vous facilite la <span>vente et la vie </span>
              </TitleS>
              <Subtitle className="lead mt-2">
                  Gérez sur une seule plateforme toutes vos demandes d'informations, vos portées, vos documents...etc. Et c'est <b>100% GRATUIT</b>
              </Subtitle>
              {/*<ListGroupS className="d-flex flex-row justify-content-center">
                <ListGroupItem className="mr-2">
                    <img src={Pattes} width="40" alt=""/><br/>Gérer vos demandes d'informations</ListGroupItem>
                <ListGroupItem><img src={Pattes} width="40" alt=""/><br/> Réservation simple et paiement sécurisé</ListGroupItem>
                <ListGroupItem><img src={Pattes} width="40" alt=""/><br/> Transmission de document sécurisée et simplifiée</ListGroupItem>
              </ListGroupS>*/}
              <ButtonPrimary className="mr-5 mb-3"
              onClick={() =>
                loginWithRedirect({
                  screen_hint: "signup",
                  ui_locales: 'fr'
                })
              }
              >
                Créer mon profil éleveur
              </ButtonPrimary>
            </Col>
            <Col md="4" align="center">
                <ImgS src="https://images.unsplash.com/photo-1559190394-df5a28aab5c5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1035&q=80" alt=""/>
            </Col>
          </Row>
        </Container>
      </SectionHeader>

    );
  }
}

export default withAuth0(HeaderEleveur);


