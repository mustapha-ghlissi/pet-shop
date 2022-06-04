import React from "react";
import {
  Row,
  Col,
  Container,
} from "reactstrap";
import styled from "styled-components";
import { Titleh2 } from "../styles/Typography";
import Search from "../img/search.png"
import Follow from "../img/follow.png"
import Reserved from "../img/reserved.png"

const Section = styled.section`
  background-color:#f6f6f1;
  padding:3rem 0;
`;

const ListHiw = styled.ol`
    margin-left: auto;
    margin-right: auto;
    display: flex;
    width: 100%;
    flex: 0 1 auto;
    flex-direction: row;
    padding:0;
    flex-wrap: wrap;
    li{
    font-weight: 400;
    font-size: 20px;
    line-height: 1.25;
    position: relative;
    color: #333330;
    margin-bottom: 20px;
    counter-increment: numbered;
    display: flex;
    align-items: baseline;
    justify-content: center;
    padding-top: 150px;
    margin: 0 1.5rem;
    text-align: center;
    width:29%;

      &:before{
        content: counter(numbered) ".";
        color: #ff5c57;
        font-family: Arial,Helvetica,sans-serif;
        font-weight: 500;
        font-size: 36px;
        line-height: 1.05;
        margin-right: 10px;
      }
      img{
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%);
        display: inline-block;
        max-width: 100%;
        max-height: 100px;
        margin: auto;
      }

      p{
        line-height:1.5em;
        span{
          color:#1ed760;
          font-weight:600;
        }
      }
      
    }
  }
  @media (max-width: 768px) {
    justify-content: center;
    li{
     width:100%;
     margin-bottom:2rem;
      &:before{
          font-size: 20px;
        }
    }
  }
`;




const Hiw = (props) => {
  return (
    <Section className="mt-5 mb-5">
      <Container>
        <Row>
          <Col md="12" align="center">
            <Titleh2>Comment ça marche ?</Titleh2>
            <br/><br/>
          </Col>
          <Col md="12">
            <ListHiw>
              <li>
                <img src={Search} alt="" />
                <p>Trouvez facilement et gratuitement des <span>éleveurs qualifiés</span> et <span>reconnues</span></p>
              </li>
              <li>
              <img src={Follow} alt="" />
              <p>Abonnez-vous aux éleveurs de votre choix pour être tenu au courant des <span>prochaines portées</span></p>
              </li>
              <li>
              <img src={Reserved} alt="" />
                <p><span>Réservez votre chiot</span> en ligne de manière 100% sécurisée</p>
              </li>
            </ListHiw>
          </Col>
        </Row>
      </Container>
    </Section>
  );
};

export default Hiw;
