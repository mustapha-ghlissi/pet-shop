import React from "react";
import {
  Form,
  FormGroup,
  Button,
  Label,
  Input,
  Row,
  Col,
  Alert
} from "reactstrap";
import styled from "styled-components";
import {addChiens} from "../../functions";
import moment from "moment";

const AlertS = styled(Alert)`
 color: #424244;
`


class FormAddChien extends React.Component {
  constructor(props) {
    super(props);
    this.user = this.props.user;
    this.userInfos= this.props.userInfos;
    this.userAirtableId= this.props.userAirtableId;

    this.state = {
      successMessage:false,
      errorMessage:false,
      dateNaissance: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeDateNaissance = this.handleChangeDateNaissance.bind(this);

  }

  handleChangeDateNaissance(event) {
    var str = document.getElementById("naissance").value;
    var dateNaissanceFormatted = moment(str).format("DD/M/YYYY");
    console.log("dateNaissanceFormatted", dateNaissanceFormatted);
    this.setState({ dateNaissance: dateNaissanceFormatted });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    //console.log("submit");
    event.preventDefault();
    const user = this.props.user.email;
    const nom = event.target.nom.value;
    const type = event.target.type.value;
    const couleurs = event.target.couleurs.value;
    const puce = event.target.puce.value;
    const lof = event.target.lof.value;
    const tares = event.target.tares.value;
    const origine = event.target.origine.value;
    const date = this.state.dateNaissance;

    //on créer un tableau de valeur
    const newChienTableau = {
      nom: nom,
      type: type,
      couleurs: couleurs,
      puce: puce,
      lof: lof,
      tares: tares,
      date:date,
      origine:origine
    };

    addChiens(newChienTableau,user)
      .then((res) => {
        const status = res.status;
        console.log(res);
        if (status === 200) {
          this.setState({ successMessage: true });
          setTimeout(() => { this.props.cancelAddForm(true); this.props.rebaseInfoChien(); }, 2000);
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
                  Votre ajout a bien été effectué
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
              <h6>Ajoutez un chien</h6>
              <Form onSubmit={this.handleSubmit}  className="mb-5">
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="">Nom du chien</Label>
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
                      <Label for="">Type</Label>
                      <Input
                        type="select"
                        name="type"
                        id="type"
                        onChange={this.handleChange}
                      >
                        <option value={"male"}>Mâle</option>
                        <option value={"femelle"}>Femelle</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="">Couleurs</Label>
                      <Input
                        className="form-control"
                        type="text"
                        name="couleurs"
                        id="couleurs"
                        onChange={this.handleChange}

                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="">N° Puce</Label>
                      <Input
                        className="form-control"
                        type="text"
                        name="puce"
                        id="puce"
                        onChange={this.handleChange}

                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="">LOG</Label>
                      <Input
                        type="select"
                        name="lof"
                        id="lof"
                        onChange={this.handleChange}
                      >
                        <option value={"oui"}>Oui</option>
                        <option value={"non"}>Non</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="">N° Origine</Label>
                      <Input
                        className="form-control"
                        type="text"
                        name="origine"
                        id="origine"
                        onChange={this.handleChange}

                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="">Date de naissance</Label>
                      <Input
                        className="form-control"
                        type="date"
                        name="naissance"
                        id="naissance"
                        onChange={this.handleChangeDateNaissance}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="">Tares</Label>
                      <Input
                        className="form-control"
                        type="textarea"
                        name="tares"
                        id="tares"
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Button
                    type="submit"
                    color="primary"
                    className="mt-3 btn-block"
                  >
                    Valider
                  </Button>

                  <Button
                    outline
                    color="grey"
                    className="mt-3 btn-block"
                    onClick={this.props.cancelAddForm}
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

export default FormAddChien;
