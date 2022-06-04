import React from "react";
import {
  Link
} from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Container, Row, Col,Card, CardTitle } from "reactstrap";
import styled from "styled-components";
import { ButtonPrimary } from "../styles/Buttons";
import { Titleh2 } from "../styles/Typography";


const SectionSelect = styled.section`
  padding:3rem 0;
  background-color:#f6f6f1;
`;




const CardRace = styled(Link)`
text-align:center;
text-transform:uppercase;
color:black;
width:33%;
.card{
    padding:1.5rem 2rem;
    margin:1.2rem;
    border:2px dashed #ddd;
    text-align:center;
    img{
        max-width: 60%;
        width:auto;
        height:auto;
        max-height: 100px;
    }
    font-weight:800;
    &:hover{
        transition:all ease .3s;
        background-color:#c2ffd8;
        border:2px solid #1ed760;
        color:black;
    }
    
}
@media (max-width: 768px) {
    width:100%;
    .card{
        display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    img{
           width: 150px;
    height: auto;
    max-height: 100px;
    }
    }
  }
`;



const Race = (props) => {
  return (
      <SectionSelect>
        <Container>
          <Row>
              <Col md="12" align="center">
                  <Titleh2>Quelle race recherchez-vous ?</Titleh2>
              </Col>
            <Col md="12" className="d-flex flex-row justify-content-center align-items-center flex-wrap mt-3">
                <CardRace>
                    <Card>
                      <div className="text-center">
                        <img src="https://www.wikichien.fr/wp-content/uploads/sites/4/image_chien_chihuahua-1-810x550.jpg" alt="Baseniji"/>
                      </div>
                    <CardTitle>
                        Chihuahua
                    </CardTitle>
                    </Card>
                </CardRace>
                <CardRace>
                    <Card>
                      <div className="text-center">
                    <img src="https://www.wikichien.fr/wp-content/uploads/sites/4/chien_cavalier-king-charles-810x550.jpg" alt="Baseniji"/>
                      </div>
                      <CardTitle>
                        Cavalier King Charles
                    </CardTitle>
                    </Card>
                </CardRace>
                <CardRace>
                    <Card>
                      <div className="text-center">
                    <img src="https://www.wikichien.fr/wp-content/uploads/sites/4/photo_chien-bouledogue-francaisss-810x550.jpg" alt="Baseniji"/>
                      </div>
                      <CardTitle>
                        Bouledogue Français
                    </CardTitle>
                    </Card>
                </CardRace>
                <CardRace>
                    <Card>
                      <div className="text-center">
                    <img src="https://www.wikichien.fr/wp-content/uploads/sites/4/carlin-images-photos-animal-000189_1-0-1-810x550.jpg" alt="Baseniji"/>
                      </div>
                      <CardTitle>
                        Carlin
                    </CardTitle>
                    </Card>
                </CardRace>
                <CardRace>
                    <Card>
                      <div className="text-center">
                    <img src="https://www.wikichien.fr/wp-content/uploads/sites/4/golden-retriever-images-photos-animal-000063_1-0-810x550.jpg" alt="Baseniji"/>
                      </div>
                      <CardTitle>
                        Golden Retriever
                    </CardTitle>
                    </Card>
                </CardRace>
                <CardRace>
                    <Card>
                      <div className="text-center">
                        <img src="https://www.wikichien.fr/wp-content/uploads/sites/4/2015/09/breed_picture-100132.png" alt="Baseniji"/>
                      </div>
                      <CardTitle>
                        Shiba Inu
                    </CardTitle>
                    </Card>
                </CardRace>
            </Col>
          </Row>
          <Row>
              <Col md="12" align="center" className={"mt-4"}>
                <NavLink to="/recherche-chien-de-race">
                  <ButtonPrimary>
                    Recherchez un chien
                  </ButtonPrimary>
                </NavLink>
              </Col>
          </Row>
        </Container>
      </SectionSelect>
  );
};

export default Race;
