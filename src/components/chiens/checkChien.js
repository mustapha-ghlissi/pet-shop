import React from "react";
import {Row, Col, Badge,  CardImg, CardBody, CardTitle, Alert, Button} from "reactstrap";
import {ButtonPrimarySmall} from "../../styles/Buttons";
import FormAddChien from "./formAddChiens";
import FormEditChien from "./formEditChien";
import {deleteChien, getInfoChien} from "../../functions";
import {BlocImage, EleveurCard} from "../eleveurs-liste-content";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen,faTrash } from "@fortawesome/free-solid-svg-icons";

const Info = styled.div`
 color: black;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    margin-right: 2rem;
 span{
 font-size:70%;
 opacity:.7;
 margin-bottom:.5rem;
 }
 span.badge{
 color: black;
    font-size: 1rem;
    opacity:1;
 }
`
class CheckChien extends React.Component {
  constructor(props) {
    super(props);
    this.user = this.props.user;

    this.state = {
      infoChienRenseigner:false,
      editForm: false,
      isLoaded:false,
      addChienForm: false,
      chiensList: [],
      deleteMessage:false,
      idChienEdit: null,
    };

    this.viewEditForm = this.viewEditForm.bind(this);
    this.hideEditForm = this.hideEditForm.bind(this);
    this.viewAddFormChien = this.viewAddFormChien.bind(this);
    this.cancelEditForm = this.cancelEditForm.bind(this);
    this.cancelAddForm = this.cancelAddForm.bind(this);
    this.removeChien = this.removeChien.bind(this);
    this.rebaseInfoChien = this.rebaseInfoChien.bind(this);
  }

  rebaseInfoChien() {
    getInfoChien(this.props.user)
      .then((res) => {
        console.log("GET INFO CHIEN",res);
        if(res.length === 0){
          //console.log("pas de chiens");
          this.setState({
            infoChienRenseigner:false,
            isLoaded:true
          });
        }else if (res != null) {
          this.setState({
            infoChienRenseigner:true,
            isLoaded:true,
            chiensList: res
          });
        }
      });
  }

  hideEditForm() {
    this.setState({
      editForm: false,
      isLoaded:true
    });
  }

  viewAddFormChien() {
    this.setState({
      addChienForm: true
    });
  }

  cancelEditForm() {
    this.setState({
      editForm: false
    });
  }

  cancelAddForm() {
    this.setState({
      addChienForm: false
    });
  }
  viewEditForm(id) {
    //console.log("id edit",id);
    this.setState({
      editForm: true,
      idChienEdit: id
    });
  }


  removeChien(id) {
    deleteChien(id)
      .then((res) => {
        console.log("delete",res);
        if (res.status === 200) {
          this.setState({ deleteMessage: true });
          setTimeout(() => {
            // After 3 seconds set the show value to false
            this.setState({ deleteMessage: false });

            getInfoChien(this.props.user)
              .then((res) => {
                console.log("GET INFO CHIEN",res);
                if(res.length === 0){
                  //console.log("pas de chiens");
                  this.setState({
                    infoChienRenseigner:false,
                    isLoaded:true
                  });
                }else if (res != null) {
                  this.setState({
                    infoChienRenseigner:true,
                    isLoaded:true,
                    chiensList: res
                  });
                }
              });

          }, 1000);
        }
      })
      .catch((e) => console.error(e));
  }

  componentDidMount() {
    //on check si le user a déjà de chiens
    getInfoChien(this.props.user)
      .then((res) => {
        console.log("GET INFO CHIEN",res);
        if(res.length === 0){
          //console.log("pas de chiens");
          this.setState({
            infoChienRenseigner:false,
            isLoaded:true
          });
        }else if (res != null) {
          this.setState({
            infoChienRenseigner:true,
            isLoaded:true,
            chiensList: res
          });
        }
      });
  }
  render() {
    return(
      <>
        <Row className={"mb-4"}>
          <Col md="6">
            <h5>
              Chiens de votre élevage <Badge color={"primary"}>{this.state.chiensList.length}</Badge>
            </h5>
          </Col>
          <Col md="6" align={"right"}>
            <ButtonPrimarySmall onClick={this.viewAddFormChien}>+ Ajouter</ButtonPrimarySmall>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {this.state.infoChienRenseigner === false && (
              <FormAddChien
                user={this.props.user}
                onUpdate={this.hideEditForm}
                hideForm={this.hideEditForm}
                cancelAddForm={this.cancelAddForm}
                rebaseInfoChien={this.rebaseInfoChien}
              />
            )}
            {this.state.addChienForm === true && (
              <FormAddChien
                user={this.props.user}
                onUpdate={this.hideEditForm}
                hideForm={this.hideEditForm}
                cancelEditForm={this.cancelEditForm}
                cancelAddForm={this.cancelAddForm}
                rebaseInfoChien={this.rebaseInfoChien}
              />
            )}
            {this.state.editForm === true && (
              <FormEditChien
                user={this.props.user}
                id={this.state.idChienEdit}
                onUpdate={this.hideEditForm}
                hideForm={this.hideEditForm}
                cancelEditForm={this.cancelEditForm}
                rebaseInfoChien={this.rebaseInfoChien}
              />
            )}
            {this.state.infoChienRenseigner === true && this.state.addChienForm === false && this.state.editForm === false &&  (
              <Row>
                <Col md="12">
                  {this.state.deleteMessage === true && (
                    <Col md="12">
                      <Alert color="danger">
                        Votre chien à bien été supprimée
                      </Alert>
                    </Col>
                  )}
                  <>
                    {this.state.chiensList.map((chien, index) => (
                      <>
                        <EleveurCard>
                          <BlocImage>
                            <CardImg
                              alt="Card image cap"
                              src="https://picsum.photos/200/300"
                              top
                              width="100%"
                            />
                          </BlocImage>
                          <CardBody>
                            <div className={"d-flex flex-row justify-content-between align-items-start"}>
                              <CardTitle tag="h5" className={"mb-4"}>
                                {chien.nom_chien}
                              </CardTitle>
                              <div>
                                <Button
                                  color="primary"
                                  size="sm"
                                  outline
                                  className="mr-1"
                                  onClick={() =>
                                    this.viewEditForm(
                                      chien.id_chien
                                    )
                                  }
                                >
                                  <FontAwesomeIcon icon={faPen} />
                                </Button>{" "}
                                <Button
                                  color="danger"
                                  size="sm"
                                  outline
                                  onClick={() =>
                                    this.removeChien(
                                      chien.id_chien
                                    )
                                  }
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </Button>
                              </div>
                            </div>

                            <div className={"d-flex flex-row justify-content-flex-start"}>
                              <Info>
                                <span>Race</span>
                                <Badge color={"light"} className={"mr-2"}>Labrador</Badge>
                              </Info>

                              <Info>
                                <span>Type</span>
                                <Badge color={"light"} className={"mr-2"}>{chien.type}</Badge>
                              </Info>

                              <Info>
                                <span>Couleurs</span>
                                {!chien.couleurs && (
                                  "--"
                                )}
                                {chien.couleurs}
                              </Info>

                              <Info>
                                <span>Date naissance</span>
                                {!chien.date_naissance && (
                                  "--"
                                )}
                                {chien.date_naissance}
                              </Info>

                              <Info>
                                <span>LOF</span>
                                {!chien.lof && (
                                  "--"
                                )}
                                {chien.lof}
                              </Info>
                              <Info>
                                <span>Puce</span>
                                {!chien.puce && (
                                  "--"
                                )}
                                {chien.puce}
                              </Info>
                              <Info>
                                <span>N° origine</span>
                                {!chien.origine && (
                                  "--"
                                )}
                                {chien.origine}
                              </Info>
                            </div>
                          </CardBody>
                        </EleveurCard>
                      </>
                    ))}
                  </>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
        </>

    )
  }
}

export default CheckChien;
