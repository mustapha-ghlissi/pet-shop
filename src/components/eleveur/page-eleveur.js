import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import {
  Row,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Card, CardBody, CardImg, CardTitle,Badge
} from "reactstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faStar, faStarHalfAlt, faDog
} from "@fortawesome/free-solid-svg-icons";
import {ButtonPrimary} from "../../styles/Buttons";
import {Note} from "../eleveurs-liste-content";
import {} from "../../functions";
import {getInfoThisElevage,getThisChien,getThisAnnonce} from "../../functions";

const Section = styled.section`
margin-top:100px;
background-color:#FFF;
padding:1rem;
`

const ListGroupCheck = styled(ListGroup)`
    svg.fa-times-circle{
    opacity:.4;
    }
    svg.fa-check-circle{
    color: #1ed760;
    }
`

const BlocDescription = styled.div`
h4.title{
    font-size: 1.5rem;
    line-height: 2rem;
    color:#343a40;
}
p{
font-size: 1rem;
line-height: 1.8rem;
text-align: justify;
}
`


const ImgSecondaire = styled.div`
    height: 250px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    background-color: #F5F5F5;
    border-radius: 1rem;
    margin-bottom:2rem;
    img{
    width: auto;
    height: auto;
    max-height: 200px;
    max-width: 150%;
    }
`

const CardForm = styled(Card)`
    box-shadow:0 0.5rem 2.5rem 0.25rem rgb(42 43 45 / 17%);
    border:0;
`
const BlocAction = styled.div`
    text-align:center;
    p{
    margin-bottom:0;
    }
    .btn{
    width:100%;
    }
`
const Comment = styled.div`
margin:2rem 0;
    p{
    font-size: 1rem;
    opacity: .8;
    }
`
const BlocChien = styled(Card)`
max-width: 28%;
margin:1rem 1rem;
li.list-group-item{
padding: 0.5rem;
font-size: 1rem;
}
`


class PageEleveur extends React.Component {
  constructor(props) {
    super(props);
    this.url = this.props.urlEleveur;

    this.state = {
      eleveurInfo: [],
      isLoaded: false,
      chiensId:[],
      chiensInfo:[],
      annoncesId:[],
      annoncesInfo:[],
      possedeAnnonce:false,
      possedeChien:false,
    };
  }

  componentDidMount() {

    getInfoThisElevage(this.props.urlEleveur)
      .then(res => {
        //console.log("res",res);
        this.setState(prevState => ({
          eleveurInfo: res
        }));
        console.log("eleveurInfo table",this.state.eleveurInfo);

        if(this.state.eleveurInfo.chiens !== undefined){
          this.setState(prevState => ({
            chiensId: res.chiens,
            possedeChien:true
          }));
        }

        if(this.state.eleveurInfo.annonce !== undefined){
          this.setState(prevState => ({
            annoncesId: res.annonce,
            possedeAnnonce:true
          }));
        }

        console.log("chiensId table",this.state.chiensId);
        console.log("annoncesId table",this.state.annoncesId);

        //si des chiens existe on récupère les infos des chiens
        if(this.state.chiensId.length > 0){
          const chiens = [];
          for (var i = 0; i < this.state.chiensId.length; i++) {
            getThisChien(this.state.chiensId[i])
              .then(res => {
                //console.log("res chien", res.data);
                chiens.push(res.data);
              })
              .catch((e) => console.error(e));
          }
          this.setState(prevState => ({
            chiensInfo: chiens
          }));
          console.log("chiensInfo table",this.state.chiensInfo);
        }

        //si des annonces existe on récupère les infos des annonces
        if(this.state.annoncesId.length > 0){
          const annonces = [];
          for (var z = 0; z < this.state.annoncesId.length; z++) {
            getThisAnnonce(this.state.annoncesId[z])
              .then(res => {
                //console.log("res annonces", res.data);
                annonces.push(res.data);
              })
              .catch((e) => console.error(e));
          }
          this.setState(prevState => ({
            annoncesInfo: annonces
          }));
          console.log("annoncesInfo table",this.state.annoncesInfo);
        }

      })
      .catch((e) => console.error(e));

    }

  render() {
    const {
      eleveurInfo,
      chiensInfo,
      chiensId,
      annoncesId,
      annoncesInfo,
      possedeChien,
      possedeAnnonce
    } = this.state;

    var newsTable = [{
      title: 'first title',
      date: 'first news date'
    },
      {
        title: 'second title',
        date: 'second news date'
      },
      {
        title: 'third title',
        date: 'third news date'
      }
    ]

    const news = newsTable.map((newsItem) =>
      <div  className="panel-list">{newsItem.title}</div>
    );
    const chiens = chiensInfo.map((chienItem) =>
      <div  className="panel-list">{chienItem.nom}</div>
    );

    return(
      <Section>
        <Container>
          <Row>
            <Col md={"12"}>
              <ImgSecondaire>
                <img src="https://picsum.photos/200/300" alt={""}/>
              </ImgSecondaire>
            </Col>
          </Row>
          <Row>
            <Col md={"9"}>
              {news}
              {chiens}
              <h1>{eleveurInfo.nom_elevage}</h1>

              <div className={"d-flex flex-row"}>
                <FontAwesomeIcon icon={faMapMarkerAlt} className={"mr-1"}  />
                {eleveurInfo.ville}

                {/*{" • "}
                <Note>
                  <FontAwesomeIcon icon={faStar}  />
                  <FontAwesomeIcon icon={faStar}  />
                  <FontAwesomeIcon icon={faStar}  />
                  <FontAwesomeIcon icon={faStar}  />
                  <FontAwesomeIcon icon={faStarHalfAlt}  />
                  <span>(4)</span>
                </Note>
                */}
              </div>

              <hr className="mt-3 mb-3"/>
              <h5>Race(s) elevées</h5>

              <ListGroupCheck horizontal>
                <ListGroupItem>
                  <FontAwesomeIcon icon={faDog} className={"mr-2"}  /> Race
                </ListGroupItem>
              </ListGroupCheck>

              <hr className="mt-3 mb-3"/>

              <BlocDescription>
                <h4 className={"title"}>Présentation</h4>

                <p>
                  {eleveurInfo.description}
                </p>
              </BlocDescription>

              <hr className="mt-3 mb-3"/>

              {possedeChien === true && (
                <>
                  {this.state.chiensInfo.map((item, i) => (
                    <li key={i}>
                      <p>chiens : {item.name}</p>
                    </li>
                  ))}
                  {annoncesInfo.map((item, i) => (
                    <li key={i}>
                      <p>annonce : {item.name}</p>
                    </li>
                  ))}

                  {chiensId.length > 0 && (
                    <h4 className={"title"}>Chiens {" "}
                      <Badge className={"light"}>
                        {chiensId.length}
                      </Badge>
                    </h4>

                  )}
                </>
              )}

              <Row>
                <Col md={"12"}>

                </Col>
                {possedeChien === true && (
                  <p>

                    possede un hcien
                    {chiensInfo.map((chien, index) => (
                      <>
                        <p>{chien.fields.nom}</p>
                      </>
                    ))}
                  </p>
                )}


                <BlocChien>
                  <CardImg src="https://www.wikichien.fr/wp-content/uploads/sites/4/603900e310549-1024x768.jpeg"/>
                  <CardBody>
                    <CardTitle><b>Nom du chien</b></CardTitle>
                    <ListGroup>
                      <ListGroupItem className={"d-flex justify-content-between"}>
                        <span>Race</span>
                        <span><b>Basenji</b></span>
                      </ListGroupItem>
                      <ListGroupItem className={"d-flex justify-content-between"}>
                        <span>LOF</span>
                        <span><b>8768768765</b></span>
                      </ListGroupItem>
                      <ListGroupItem className={"d-flex justify-content-between"}>
                        <span>Couleurs</span>
                        <span><b>Noir</b></span>
                      </ListGroupItem>
                      <ListGroupItem className={"d-flex justify-content-between"}>
                        <span>Sexe</span>
                        <span><b>Male</b></span>
                      </ListGroupItem>
                    </ListGroup>
                  </CardBody>
                </BlocChien>
                <BlocChien>
                  <CardImg src="https://www.wikichien.fr/wp-content/uploads/sites/4/603900e310549-1024x768.jpeg"/>
                  <CardBody>
                    <CardTitle><b>Nom du chien</b></CardTitle>
                    <ListGroup>
                      <ListGroupItem className={"d-flex justify-content-between"}>
                        <span>Race</span>
                        <span><b>Basenji</b></span>
                      </ListGroupItem>
                      <ListGroupItem className={"d-flex justify-content-between"}>
                        <span>LOF</span>
                        <span><b>8768768765</b></span>
                      </ListGroupItem>
                      <ListGroupItem className={"d-flex justify-content-between"}>
                        <span>Couleurs</span>
                        <span><b>Noir</b></span>
                      </ListGroupItem>
                      <ListGroupItem className={"d-flex justify-content-between"}>
                        <span>Sexe</span>
                        <span><b>Male</b></span>
                      </ListGroupItem>
                    </ListGroup>
                  </CardBody>
                </BlocChien>
                <BlocChien>
                  <CardImg src="https://www.wikichien.fr/wp-content/uploads/sites/4/603900e310549-1024x768.jpeg"/>
                  <CardBody>
                    <CardTitle><b>Nom du chien</b></CardTitle>
                    <ListGroup>
                      <ListGroupItem className={"d-flex justify-content-between"}>
                        <span>Race</span>
                        <span><b>Basenji</b></span>
                      </ListGroupItem>
                      <ListGroupItem className={"d-flex justify-content-between"}>
                        <span>LOF</span>
                        <span><b>8768768765</b></span>
                      </ListGroupItem>
                      <ListGroupItem className={"d-flex justify-content-between"}>
                        <span>Couleurs</span>
                        <span><b>Noir</b></span>
                      </ListGroupItem>
                      <ListGroupItem className={"d-flex justify-content-between"}>
                        <span>Sexe</span>
                        <span><b>Male</b></span>
                      </ListGroupItem>
                    </ListGroup>
                  </CardBody>
                </BlocChien>
              </Row>

              <hr className="mt-3 mb-3"/>

              <h4 className={"title"}>Commentaires</h4>

              <div className={"d-flex flex-row justify-content-between"}>
                <h5>23 commentaires</h5>
                <Note>
                  <FontAwesomeIcon icon={faStar}  />
                  <FontAwesomeIcon icon={faStar}  />
                  <FontAwesomeIcon icon={faStar}  />
                  <FontAwesomeIcon icon={faStar}  />
                  <FontAwesomeIcon icon={faStarHalfAlt}  />
                  <span>4.5/5</span>
                </Note>
              </div>

              <Comment>
                <Row>
                  <Col md={6} align={"left"}>
                    <h6>
                      <b>Cécile Chelim</b><br/>
                      <small>Octobre 2021</small>
                    </h6>
                  </Col>
                  <Col md={6} align={"right"}>
                    <Note>
                      <FontAwesomeIcon icon={faStar}  />
                      <FontAwesomeIcon icon={faStar}  />
                      <FontAwesomeIcon icon={faStar}  />
                    </Note>
                  </Col>
                  <Col md={12}>
                    <p>
                      Nous avons passé une excellente journée en compagnie de Pierre qui a vraiment été un skipper en or ! Baignade dans une mer magnifique et ballade parfaite sous le soleil marseillais je vous le recommande sans hésiter
                    </p>
                  </Col>
                </Row>
              </Comment>
              <Comment>
                <Row>
                  <Col md={6} align={"left"}>
                    <h6>
                      <b>Cécile Chelim</b><br/>
                      <small>Octobre 2021</small>
                    </h6>
                  </Col>
                  <Col md={6} align={"right"}>
                    <Note>
                      <FontAwesomeIcon icon={faStar}  />
                      <FontAwesomeIcon icon={faStar}  />
                      <FontAwesomeIcon icon={faStar}  />
                    </Note>
                  </Col>
                  <Col md={12}>
                    <p>
                      Nous avons passé une excellente journée en compagnie de Pierre qui a vraiment été un skipper en or ! Baignade dans une mer magnifique et ballade parfaite sous le soleil marseillais je vous le recommande sans hésiter
                    </p>
                  </Col>
                </Row>
              </Comment>
              <Comment>
                <Row>
                  <Col md={6} align={"left"}>
                    <h6>
                      <b>Cécile Chelim</b><br/>
                      <small>Octobre 2021</small>
                    </h6>
                  </Col>
                  <Col md={6} align={"right"}>
                    <Note>
                      <FontAwesomeIcon icon={faStar}  />
                      <FontAwesomeIcon icon={faStar}  />
                      <FontAwesomeIcon icon={faStar}  />
                    </Note>
                  </Col>
                  <Col md={12}>
                    <p>
                      Nous avons passé une excellente journée en compagnie de Pierre qui a vraiment été un skipper en or ! Baignade dans une mer magnifique et ballade parfaite sous le soleil marseillais je vous le recommande sans hésiter
                    </p>
                  </Col>
                </Row>
              </Comment>

              <hr className="mt-3 mb-3"/>

              <h4 className={"title"}>Annonces en ligne</h4>

              <p>Liste des annonces</p>

            </Col>

            <Col md={"3"}>
              <CardForm>

                <CardBody>
                  <ListGroup>
                    <ListGroupItem>
                      <p>
                        <b>Adresse</b><br/>
                        {/* {eleveurInfo.adresse}<br/>*/}
                        {eleveurInfo.code_postal}<br/>
                        {eleveurInfo.ville}
                      </p>
                    </ListGroupItem>
                    <ListGroupItem>
                      <p>
                        <b>SIRET</b><br/>
                        {eleveurInfo.siret}
                      </p>
                    </ListGroupItem>
                    <ListGroupItem>
                      <p>
                        <b>Facebook</b><br/>
                        <a href={'http://www.facebook.com/' + eleveurInfo.facebook} target="blank">{eleveurInfo.facebook}</a>
                      </p>
                    </ListGroupItem>
                  </ListGroup>
                  <hr/>
                  <BlocAction>
                    <ButtonPrimary block>
                      Envoyer un message
                    </ButtonPrimary>
                  </BlocAction>
                </CardBody>
              </CardForm>
            </Col>
          </Row>
        </Container>


        {possedeAnnonce === true && (
          <p>
            {annoncesId.length > 0 && (
              <p>
                possède {annoncesId.length} annonces
              </p>
            )}
          </p>
        )}
      </Section>
    )

  }
}

export default withAuth0(PageEleveur);
