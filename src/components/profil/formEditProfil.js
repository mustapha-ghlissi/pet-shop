import React from "react";
import {
  Form,
  FormGroup,
  Button,
  Label,
  Input,
  Row,
  Col,
  Alert, FormText
} from "reactstrap";
import { getUserInfo,updateUser} from "../../functions.js";
import styled from "styled-components";

const AlertS = styled(Alert)`
 color: #424244;
`

const options = [
  {
    label: "Eleveur de chiens de race",
    value: "Eleveur",
  },
  {
    label: "En recherche de chien de race",
    value: "Acheteur",
  }
];


class FormEditProfil extends React.Component {
  constructor(props) {
    super(props);
    this.user = this.props.user;
    this.userInfos= this.props.userInfos;
    this.userAirtableId= this.props.userAirtableId;

    this.state = {
      nom: "",
      prenom: "",
      telephone: "",
      type: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideEditForm = this.hideEditForm.bind(this);
    this.rebaseInfoElevageView = this.rebaseInfoElevageView.bind(this);
    //console.log("form edit profil",this.props.userAirtableId)
  }
  hideEditForm() {
    this.setState({
      editForm: false
    });
  }

  rebaseInfoElevageView() {
    this.props.rebaseInfoElevageView();
  }

  componentDidMount() {
    //on recupère les infos de ce user
    if(this.props.userInfos.nom !== undefined){
      //console.log("existe");
      getUserInfo(this.props.userInfos.email).then((res) => {
        if(!res.nom){

        }else{
          this.setState({
            nom: res.nom,
            prenom: res.prenom,
            telephone: res.telephone,
            type: res.type
          });
        }
      });
    }else{
     // console.log("pas de nom")
    }
  }

  handleChange(value) {
    this.setState({
      nom: value.nom,
      prenom: value.prenom,
      telephone: value.telephone,
      type: value.type
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const idAirtableUserEdit = this.props.userInfos.id_airtable;
    const nom = e.target.nom.value;
    const prenom = e.target.prenom.value;
    const type = e.target.type.value;
    const telephone = e.target.telephone.value;

    //console.log("type",type)

    //on créer un tableau de valeur
    const updateUserTableau = {
      nom: nom,
      prenom: prenom,
      type: type,
      telephone: telephone
    };

    updateUser(idAirtableUserEdit, updateUserTableau)
      .then((res) => {
        const status = res.status;
        console.log(res);
        if (status === 200) {
          this.setState({ successMessage: true });
          setTimeout(() => { this.props.rebaseInfoUser();; }, 1000);
          setTimeout(() => { this.props.hideForm(); }, 1500);


        } else {
          this.setState({ errorMessage: true });
        }
      })
      .catch((e) => console.error(e));
  }



  render() {

    return (
      <div>
        <AlertS color="light">
          {this.state.successMessage === true && (
            <Row>
              <Col md="12">
                <Alert color="success">
                  Votre profil à bien été mis à jour
                </Alert>
              </Col>
            </Row>
          )}

          {this.state.errorMessage === true && (
            <Row>
              <Col md="12">
                <Alert color="error">
                  Un problème est survenu veuillez recommencer.
                </Alert>
              </Col>
            </Row>
          )}

          <Row>
            <Col md="12">
              <Form onSubmit={this.handleSubmit}  className="mb-5">
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="">Nom</Label>
                      <Input
                        className="form-control"
                        type="text"
                        name="nom"
                        id="nom"
                        onChange={(e) => this.handleChange(e.target.value)}
                        value={this.state.nom}
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
                        onChange={(e) => this.handleChange(e.target.value)}
                        value={this.state.prenom}
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
                        type="phone"
                        name="telephone"
                        id="telephone"
                        onChange={(e) => this.handleChange(e.target.value)}
                        value={this.state.telephone}
                      />
                    </FormGroup>
                    <FormText>Non diffusé sur la plateforme</FormText>
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
                        onChange={(e) => this.handleChange(e.target.value)}
                        placeholder={this.props.user.email}
                      />
                      <FormText>Non diffusé sur la plateforme</FormText>
                    </FormGroup>
                  </Col>
                </Row>
              <FormGroup className={"mt-3"}>
                  <Label for="">Vous êtes</Label>
                  <Input
                    type="select"
                    name="type"
                    id="type"
                    onChange={(e) => this.handleChange(e.target.value)}
                    value={this.state.type}
                  >
                    {options.map((option) => (
                      <option value={option.value}>{option.label}</option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Button
                    type="submit"
                    color="primary"
                    className="mt-3 btn-block"
                  >
                    Mettre à jour
                  </Button>

                  <Button
                    outline
                    color="grey"
                    className="mt-3 btn-block"
                    onClick={this.props.cancelEditForm}
                  >
                    Annuler
                  </Button>

                </FormGroup>
              </Form>

            </Col>
          </Row>
        </AlertS>
      </div>
    );
  }
}

export default FormEditProfil;
