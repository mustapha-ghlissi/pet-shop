import React from "react";
import {
  FormGroup,
  Button,
  Label,
  Input,
  Row,
  Col,
  Alert,Badge
} from "reactstrap";
import styled from "styled-components";
import FormEditProfil from "./formEditProfil";

const AlertS = styled(Alert)`
 color: #424244;
`


class ViewProfil extends React.Component {
  constructor(props) {
    super(props);
    this.user = this.props.user;
    this.userInfos= this.props.userInfos;
    this.userAirtableId= this.props.userAirtableId;

    this.state = {
      editForm: false,
    };
    this.viewEditForm = this.viewEditForm.bind(this);
    this.hideEditForm = this.hideEditForm.bind(this);
    this.cancelEditForm = this.cancelEditForm.bind(this);
    this.rebaseInfoUser = this.rebaseInfoUser.bind(this);
  }

  rebaseInfoUser() {
    this.props.rebaseInfoUser();
  }

  viewEditForm() {
    this.setState({
      editForm: true
    });
  }
  hideEditForm() {
    this.setState({
      editForm: false
    });
  }
  cancelEditForm() {
    this.setState({
      editForm: false
    });
  }



  render() {

    return (
      <div>
        <AlertS color="light">
          <Row>
            <Col md="12">
                <legend>
                  Informations personnelles
                </legend>
                <hr/>
                {this.state.editForm === true && (
                  <FormEditProfil
                    user={this.props.user}
                    userInfos={this.props.userInfos}
                    onUpdate={this.hideEditForm}
                    hideForm={this.hideEditForm}
                    cancelEditForm={this.cancelEditForm}
                    rebaseInfoUser={this.rebaseInfoUser}/>
                )}
                {this.state.editForm === false && (
                  <>
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="">Nom</Label>
                          <Input
                            className="form-control"
                            type="text"
                            name="nom"
                            id="nom"
                            value={this.props.userInfos.nom}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="">Prénom</Label>
                          <Input
                            className="form-control"
                            type="text"
                            name="prenom"
                            id="prenom"
                            value={this.props.userInfos.prenom}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="">Téléphone</Label>
                          <Input
                            className="form-control"
                            type="text"
                            name="telephone"
                            id="telephone"
                            value={this.props.userInfos.telephone}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="">Email</Label>
                          <Input
                            disabled
                            className="form-control"
                            type="text"
                            name="email"
                            id="email"
                            value={this.props.userInfos.email}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <Label for="">Vous êtes : </Label><br/>
                      <h4><Badge color={"success"}>{this.props.userInfos.type}</Badge></h4>
                    </FormGroup>
                    <FormGroup>
                      <Button
                        type="submit"
                        color="primary"
                        outline
                        className="mt-3"
                        onClick={this.viewEditForm}
                      >
                        Modifier
                      </Button>
                    </FormGroup>
                  </>
                )}

            </Col>
          </Row>
        </AlertS>
      </div>
    );
  }
}

export default ViewProfil;
