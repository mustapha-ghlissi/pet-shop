import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import {newReservation, getThisAnnonce} from "../../functions";
import {
  Row,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Card, CardBody, CardText, Badge, Modal, ModalHeader, Button, ModalBody, FormGroup, Label, Input, Form, ButtonGroup, Alert
} from "reactstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faAngleRight,
  faCalendarCheck,
  faInfoCircle,
  faBuilding,
  faHome
} from "@fortawesome/free-solid-svg-icons";
import {ButtonPrimary, ButtonPrimarySmall} from "../../styles/Buttons";
import {NavLink} from "react-router-dom";
import {ListGroupEleveur} from "../HiwEleveurs";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const Section = styled.section`
margin-top:100px;
background-color:#FFF;
padding:1rem;
`

const Number = styled.div`
display:flex;
flex-direction:row;
justify-content:flex-start;
opacity:.7;
div{
  display:flex;
  margin-right: 5rem;
  svg{margin-right:.5rem;}
  p{
  margin-bottom: 0rem;
  }
}
.badge{
  color: black;
    background-color: WHITE;
    padding: 1rem 1.2rem;
    border-radius: .7rem;
    font-size: 1rem;
    border: 1px solid #b5b5b5;
    margin-right: .5rem;
}
`

const BadgeType = styled.div`
    padding:.5rem .75rem;
    border-radius:0.6rem;
    color:white;
    font-weight: bold;
    z-index: 1;
    width: fit-content;
    &.vente{
    background-color: #1ed760;
    }
    &.reservation{
    background-color: #fbf7e740;
    }
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

const ImgPrincipal = styled.div`
    height: 300px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    background-color: #F5F5F5;
    border-radius: 1rem;
    margin-bottom:2rem;
    position:relative;
    align-items: center;
    
    img{
    top:0;
    right:25%;
    width: auto;
    height:auto;
    max-width: 100%;
    max-height: 100%;
    }
`

const CardForm = styled(Card)`
    box-shadow:0 0.5rem 2.5rem 0.25rem rgb(42 43 45 / 17%);
    border:0;
    &.fixe{
    float: left;
    width: 21.25rem;
    position: fixed;
    top: 0;
    right: 16.5%;
    margin-top: 1rem;
    padding: 0;
    }
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

const ListGroupEleveurS = styled(ListGroupEleveur)`
li.list-group-item{
    background-color: #9b9b9b1c;
    border: 1px solid #cbcbcb;
}
h6{
color:black!important;
font-size:1rem!important;
margin:0;
}
div.number{
width: 60px!important;
height: 45px!important;
}
`

const ModalS = styled(Modal)`
.modal-body{
padding:1rem 2rem;
}
`

const ButtonGroupCheckbox = styled(ButtonGroup)`
button{
  border: 1.5px solid #d9d9d9;
  background-color: #FFF;
  border-radius: .2rem;
  padding:1rem;
  width:13rem;
  overflow: hidden;
  text-align: center;
  font-size:1.2rem;
  color:black;
  font-weight: 400;
  display: flex;
  flex-direction: row;
      align-items: center;
    justify-content: center;
  svg{
  margin-right: .8rem;
  display:block;
  opacity: .5;
  }
  &:not(:disabled):not(.disabled).active,&.active,&:hover,&:focus,&.active:focus{
  background-color: #1ed760;
  border-color: #1ed760;
  outline: 0;
  box-shadow: none!important;
  svg{
  opacity: 1;
  }
  }
}
`
const SuccessMessage = styled.div`
svg,h4{
color:#1ed760;
}
h4{
margin-bottom:2rem;
}
`


class PageAnnonce extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.annonceId;

    this.state = {
      annonce: [],
      isLoaded: false,
      errorMessage:false,
      successMessage:false,
      hideFormModal:false,
      scroll:false,
      showModal:false,
      habitation:null,
      animaux:null,
      enfant:null,
      nonAnimaux:false,
      ouiAnimaux:false,
      ouiEnfant:false,
      nonEnfant:false,
      appartement:false,
      maison:false
    };

    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleHideModal = this.handleHideModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const nom = event.target.nom.value;
    const email = event.target.email.value;
    const telephone = event.target.telephone.value;
    const ville = event.target.ville.value;
    const message = event.target.message.value;
    const habitation =this.state.habitation;
    const animaux = this.state.animaux;
    const enfant = this.state.enfant;
    const idAnnonce = this.props.annonceId;

    //on créer un tableau de valeur
    const newMessageTableau = {
      nom,
      email,
      telephone,
      ville,
      message,
      habitation,
      animaux,
      enfant,
      idAnnonce
    };
    console.log("tableaiu",newMessageTableau)

    newReservation(newMessageTableau)
      .then((res) => {
        const status = res.status;
        if (status === 200) {
          this.setState({ hideFormModal:true, successMessage: true });
        } else {
          this.setState({ errorMessage: true });
        }
      })
      .catch((e) => {
        console.error(e)
        this.setState({
          isLoading: false,
        });
      });
  }

  handleShowModal(event) {
    this.setState({ showModal: true});
  }
  handleHideModal(event) {
    this.setState({ showModal: false});
  }



  componentDidMount() {
    //console.log(this.props.user.email);
    const id = this.id;
    getThisAnnonce(id)
      .then((res) => {
        //console.log("res", res);
        if (res.status === 200) {
          console.log("res page",res);
          this.setState({ annonce: res.data,isLoaded:true });
        }
      })
      .catch((e) => console.error(e));

    window.addEventListener('scroll', () => {
      let activeClass = 'fixe';
      if(window.scrollY < 500){
        activeClass = 'top';
      }
      this.setState({ activeClass });
    });
  }
  render() {
    const annonce = this.state.annonce;
    if (this.state.isLoaded === true ) {
      return(
        <Section>
        <Container>
          <Row>
            <Col md={"4"}>

              <ImgPrincipal>
                {annonce.fields.photo_1.map((photo, index) => (
                  <>
                  <Zoom className={"button-zoom"}>
                    <img src={photo.url} alt={""}/>
                  </Zoom>
                  </>))}
              </ImgPrincipal>

            </Col>
            <Col md={"4"}>

              <ImgPrincipal>
                {annonce.fields.photo_2.map((photo, index) => (
                  <>
                  <Zoom>
                    <img src={photo.url} alt={""}/>
                  </Zoom>
                  </>))}
              </ImgPrincipal>

            </Col>
            <Col md={"4"}>
              <ImgPrincipal>
                {annonce.fields.photo_3.map((photo, index) => (
                  <>
                  <Zoom>
                    <img src={photo.url} alt={""}/>
                  </Zoom>
                  </>))}
              </ImgPrincipal>

            </Col>
          </Row>
          <Row>
            <Col md={"8"}>
            <h3 className={"mb-2"}>{annonce.fields.titre}</h3>

              <p>
                Proposé par <u>
                <NavLink
                  to={{
                    pathname: `/eleveur-chien-de-race/${annonce.fields.nom_elevage}`
                  }}
                  target="_blank"
                >
                  {annonce.fields.nom_elevage}</NavLink></u>, dans la région de {annonce.fields.nom_region}
              </p>
              <hr className="mt-4 mb-4"/>

              <Number>
                <div>
                  <p>
                    <Badge  pills>
                    {annonce.fields.nb_femelle}
                    </Badge> Femelle(s)
                  </p>
                </div>
                <div>
                  <p>
                    <Badge pills>
                      {annonce.fields.nb_males}
                    </Badge>
                     Male(s)
                  </p>
                </div>
              </Number>

              <hr className="mt-4 mb-4"/>

              <ListGroupCheck horizontal>
                <ListGroupItem>
                  {annonce.fields.chiot_vaccines === "oui" && (
                    <><FontAwesomeIcon icon={faCheckCircle}  /> Chiots vaccinés</>
                  )}
                  {annonce.fields.chiot_vaccines === "non" && (
                    <><FontAwesomeIcon icon={faTimesCircle}  /> Chiots vaccinés</>
                    )}
                </ListGroupItem>
                {/*<ListGroupItem>
                  {annonce.fields.chiot_sterilise === "oui" && (
                    <><FontAwesomeIcon icon={faCheckCircle}  /> Chiots stérilisés</>
                  )}
                  {annonce.fields.chiot_sterilise === "non" && (
                    <><FontAwesomeIcon icon={faTimesCircle}  /> Chiots stérilisés</>
                  )}
                </ListGroupItem>*/}
                <ListGroupItem>
                  {annonce.fields.chiot_puce === "oui" && (
                    <><FontAwesomeIcon icon={faCheckCircle}  /> Chiots pucés / tatoués</>
                  )}
                  {annonce.fields.chiot_puce === "non" && (
                    <><FontAwesomeIcon icon={faTimesCircle}  /> Chiots pucés / tatoués</>
                  )}
                </ListGroupItem>
                <ListGroupItem>
                    <FontAwesomeIcon icon={faCheckCircle}  /> LOF : {annonce.fields.numero_portee_LOF_dossier} {" "} {annonce.fields.numero_portee_LOF_annee} {" "} {annonce.fields.numero_portee_LOF_numero} {" "}
                </ListGroupItem>
              </ListGroupCheck>

              <hr className="mt-4 mb-4"/>

              <BlocDescription>
              <h4 className={"title mb-3"}>Description de l'annonce</h4>
                <p>{annonce.fields.description}</p>
              </BlocDescription>

              <hr className="mt-4 mb-4"/>

              <ListGroupCheck horizontal>
                <ListGroupItem>
                  Informations mère<br/>
                  N° LOF : <b>{annonce.fields.numero_mere}</b> /
                  {annonce.fields.type_mere === "puce" && (
                    <><FontAwesomeIcon icon={faAngleRight}  /> Puce</>
                  )}
                  {annonce.fields.type_mere === "tatouage" && (
                    <><FontAwesomeIcon icon={faAngleRight}  /> Tatouage</>
                  )}
                </ListGroupItem>


              <ListGroupItem>
                Informations père<br/>
                N° LOF : <b>{annonce.fields.numero_mere}</b> /
                {annonce.fields.type_mere === "puce" && (
                  <><FontAwesomeIcon icon={faAngleRight}  /> Puce</>
                )}
                {annonce.fields.type_mere === "tatouage" && (
                  <><FontAwesomeIcon icon={faAngleRight}  /> Tatouage</>
                )}

              </ListGroupItem>
            </ListGroupCheck>
              <hr className="mt-4 mb-4"/>

              <h4 className={"title mb-3"}>Comment se déroule votre réservation </h4>

              <ListGroupEleveurS>
                <ListGroupItem className={"d-flex"}>
                      <div className={"number"}><span className={"number"}> 1 </span></div>
                  <div>
                      <h6>Remplissez vos informations </h6>
                      <p>Lorsque vous faites une demande de réservation, il vous sera demandé de répondre à certaines questions importantes, pour l'achat d'un chiot de race.</p>
                  </div>
                </ListGroupItem>

                <ListGroupItem className={"d-flex"}>
                  <div className={"number"}><span className={"number"}> 2 </span></div>
                  <div>
                  <h6>Échangez avec l'éleveur </h6>
                  <p>Lorsque votre demande est validée par l'éleveur, vous pourrez échanger facilement via notre messagerie interne.</p>
                  </div>
                  </ListGroupItem>

                <ListGroupItem className={"d-flex"}>
                  <div className={"number"}><span className={"number"}> 3 </span></div>
                  <div>
                  <h6>Payez l'accompte</h6>
                  <p>Lorsque vous êtes sûre de votre capacité d'accueil d'un chiot de race, réalisez simplement le paiement de l'accompte de manière sécurisée.
                    Vous serez débité lorsque l'eleveur aura validé votre paiement.</p>
                  </div>
                  </ListGroupItem>

              </ListGroupEleveurS>

            </Col>
            <Col md={"4"} >
              <CardForm className={`${this.state.activeClass}`}>

                <CardBody>
                 <div className={"d-flex justify-content-center"}>
                   <BadgeType className={"vente mb-2"}>
                     En vente
                   </BadgeType>
                 </div>
                  <ListGroupCheck>
                    <ListGroupItem align={"center"}>
                      Date de disponibilités
                      <br/>
                      <span style={{color:'#1ad760'}}><FontAwesomeIcon icon={faCalendarCheck}  /> <b>{annonce.fields.disponibilite_portee}</b></span>
                    </ListGroupItem>
                    <CardText align={"center"}>
                      <small>Date de naissance {"  "}
                      {annonce.fields.naissance_portee}
                      </small>

                    </CardText>
                  </ListGroupCheck>

                  <ListGroupCheck className={"mt-2"}>
                    <ListGroupItem align={"center"} >
                      Prix d'accompte
                      <br/>
                      <span style={{color:'#1ad760'}}><FontAwesomeIcon icon={faInfoCircle}  /> <b> {annonce.fields.prix_accompte} €</b></span>
                    </ListGroupItem>
                    <CardText align={"center"}>
                      <small>Prix total TTC {"  "}
                        {annonce.fields.prix_total} €
                      </small>
                    </CardText>
                  </ListGroupCheck>
                  <hr/>
                  <BlocAction>
                    {/* <ButtonSecondary block>
                      Envoyer un message
                    </ButtonSecondary>
                    <p>ou</p>*/}
                    <ButtonPrimary block onClick={this.handleShowModal}>
                      Demande de réservation
                    </ButtonPrimary>
                    {/*<p><small>Vous ne serez débité qu'en cas d'acceptation</small></p>*/}

                  </BlocAction>
                </CardBody>
              </CardForm>
            </Col>
          </Row>
        </Container>
          <ModalS
            isOpen={this.state.showModal}
            toggle={this.handleHideModal}
            scrollable={"true"}
            fullscreen="md"
            size="lg"
          >
            <ModalHeader className={"text-center"} toggle={this.handleHideModal}>
              Super choix !
            </ModalHeader>

            <ModalBody>
              <Form onSubmit={this.handleSubmit}  className="mb-5">
                {this.state.errorMessage === true && (
                  <Row>
                    <Col md="12">
                      <Alert color="danger">
                        Un problème est survenu veuillez recommencer.
                      </Alert>
                    </Col>
                  </Row>
                )}

                {this.state.hideFormModal === true && (
                  <Row>
                    <Col md="12" align={"center"}>
                      <SuccessMessage>
                      <FontAwesomeIcon icon={faCheckCircle} className={"fa-3x"}  />
                      <h4>Votre demande de réservation a bien été enregistrée</h4>
                      <p>
                        Nous avons bien enregistrée votre demande de réservation. Vous allez recevoir un email de confirmation.
                        L'eleveur reviendra vers vous au plus vite.<br/>
                        Nous vous conseillons en attendant de consulter sur Fydop.fr les autres annonces de portées de chien de race.
                      </p>
                        <NavLink
                          to={{
                            pathname: `/recherche-chien-de-race`
                          }}
                        >
                          <ButtonPrimarySmall>
                            Rechercher un chien de race
                          </ButtonPrimarySmall>
                          </NavLink>

                      </SuccessMessage>
                    </Col>
                  </Row>
                )}

                {this.state.hideFormModal === false && (
                  <>
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="">Nom et prénom</Label>
                          <Input
                            className="form-control"
                            type="text"
                            name="nom"
                            id="nom"
                            onChange={this.handleChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="">Email</Label>
                          <Input
                            className="form-control"
                            type="email"
                            name="email"
                            id="email"
                            onChange={this.handleChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="">Téléphone</Label>
                          <Input
                            className="form-control"
                            type="phone"
                            name="telephone"
                            id="telephone"
                            onChange={this.handleChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="">Ville</Label>
                          <Input
                            className="form-control"
                            type="text"
                            name="ville"
                            id="ville"
                            onChange={this.handleChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="">Votre message</Label>
                          <Input
                            className="form-control"
                            type="textarea"
                            name="message"
                            id="message"
                            onChange={this.handleChange}
                            cols={"5"}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={"12"} align={"left"}>
                        <hr/>
                        <p>
                          Dites-en plus à l'eleveur sur votre projet d'achat de chiot de race, plus vous donnerez d'informations et plus il sera susceptible de confirmer votre demande de réservation.
                        </p>
                      </Col>
                    </Row>
                    <Row form className={"mt-4 mb-4"}>
                      <Col md={12} align={"center"}>
                        <label>Avez-vous déjà des animaux de compagnie ?</label>
                      </Col>
                      <Col md={"12"} align={"center"}>
                        <ButtonGroupCheckbox>
                          <Button
                            name="platform"
                            type="button"
                            onClick={() => this.setState({animaux: "oui",ouiAnimaux:true,nonAnimaux:false})}
                            className={`${this.state.ouiAnimaux ? "active" : ""}`}
                          >
                            <FontAwesomeIcon icon={faCheckCircle}  />
                            Oui
                          </Button>
                          <Button
                            name="platform"
                            type="button"
                            onClick={() => this.setState({animaux: "non",ouiAnimaux:false,nonAnimaux:true})}
                            className={`${this.state.nonAnimaux ? "active" : ""}`}
                          >
                            <FontAwesomeIcon icon={faTimesCircle}  />
                            Non
                          </Button>
                        </ButtonGroupCheckbox>

                      </Col>
                    </Row>
                    <Row form  className={"mt-4 mb-4"} >
                      <Col md={12} align={"center"}>
                        <label>Habitez-vous un appartement ou une maison ?</label>
                      </Col>
                      <Col md={"12"} align={"center"}>
                        <ButtonGroupCheckbox>
                          <Button
                            onClick={() => this.setState({habitation: "appartement",appartement:true,maison:false})}
                            className={`${this.state.appartement ? "active" : ""}`}
                          >
                            <FontAwesomeIcon icon={faBuilding}  />
                            Appartement
                          </Button>
                          <Button
                            onClick={() => this.setState({habitation: "maison",appartement:false,maison:true})}
                            className={`${this.state.maison ? "active" : ""}`}
                          >
                            <FontAwesomeIcon icon={faHome}  />
                            Maison
                          </Button>
                        </ButtonGroupCheckbox>
                      </Col>
                    </Row>
                    <Row form  className={"mt-4"}>
                      <Col md={12} align={"center"}>
                        <label>Avez-vous un des enfants ?</label>
                      </Col>
                      <Col md={"12"} align={"center"}>
                        <ButtonGroupCheckbox>
                          <Button
                            onClick={() => this.setState({enfant: "oui",ouiEnfant:true,nonEnfant:false})}
                            className={`${this.state.ouiEnfant ? "active" : ""}`}
                          >
                            <FontAwesomeIcon icon={faCheckCircle}  />
                            Oui
                          </Button>
                          <Button
                            onClick={() => this.setState({enfant: "non",ouiEnfant:false,nonEnfant:true})}
                            className={`${this.state.nonEnfant ? "active" : ""}`}
                          >
                            <FontAwesomeIcon icon={faTimesCircle}  />
                            Non
                          </Button>
                        </ButtonGroupCheckbox>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={"12"} align={"center"} className={"mt-5"}>
                        <ButtonPrimary
                          color="primary"
                          type="submit"
                        >
                          Envoyez votre demande
                        </ButtonPrimary>
                      </Col>
                    </Row>
                  </>
                )}



            </Form>
            </ModalBody>

          </ModalS>
          </Section>


      )
    }else{
      return(<></>)
    }

  }
}

export default withAuth0(PageAnnonce);
