import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import styled from "styled-components";
import { ButtonPrimary } from "../styles/Buttons";
import { Title } from "../styles/Typography";
import Dogs from '../img/dogs.png'

const SectionHeader = styled.div`
  margin-top:8rem;
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
  @media (max-width: 768px) {
    margin-top:7rem;
    margin-bottom:1rem;
    p.lead{
    margin-top:0!important;
    }
  }
`;
const TitleS = styled(Title)`
  color: black;
  text-align:left;
  padding-top:8rem;
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
  margin-top:3rem;
  @media (max-width: 768px) {
    width:100%;
  }
`;


const HeaderHome = (props) => {
  return (
      <SectionHeader>
        <Container>
          <Row>
            <Col md="6">
              <TitleS>
                Trouvez simplement votre <span>chien de race</span>
              </TitleS>
              <Subtitle className="lead mt-3 mb-3">
                Contactez directement les éleveurs de chiens de race français et <b>réservez votre chiots de race</b>.
              </Subtitle>
              <NavLink to="/recherche-chien-de-race">
              <ButtonPrimary>
                Recherchez un chien
              </ButtonPrimary>
              </NavLink>
            </Col>
            <Col md="6">
              <ImgS src={Dogs} alt=""/>
            </Col>
          </Row>
        </Container>
      </SectionHeader>
  );
};

export default HeaderHome;
