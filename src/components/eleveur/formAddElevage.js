import React from "react";
import {
  Form,
  FormGroup,
  Button,
  Label,
  Input,
  Row,
  Col,
  Alert, InputGroup, InputGroupText, FormText
} from "reactstrap";
import { addElevage,getRegions2} from "../../functions.js";
import styled from "styled-components";
import Select from 'react-select'

const AlertS = styled(Alert)`
 color: #424244;
`



class FormAddElevage extends React.Component {
  constructor(props) {
    super(props);
    this.user = this.props.user;
    this.userInfos= this.props.userInfos;
    this.userAirtableId= this.props.userAirtableId;

    this.state = {
      nom_elevage: "",
      adresse: "",
      cp: "",
      ville: "",
      region: "",
      siret:"",
      description:"",
      facebook:"",
      regionsList: [],
      selectedRegion: '',
      regionRetenu: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  componentDidMount() {

    getRegions2()
      .then((res) => {
        console.log("GET INFO REGIONS",res);
        if (res != null) {
          this.setState({
            regionsList: res
          });
        }
      });

  }



  handleChange(value,selectedOption) {
    this.setState({
      nom_elevage: value.nom_elevage,
      adresse: value.adresse,
      cp: value.cp,
      ville: value.ville,
      siret:value.siret,
      description:value.description,
      facebook:value.site,
      //regionChoisi:selectedOption,
    });
  }

  handleSubmit(e) {
    window.scrollTo(0, 0);

    e.preventDefault();
    const email_user = this.props.userInfos.email;
    const nom_elevage = e.target.nom_elevage.value;
    const adresse = e.target.adresse.value;
    const cp= e.target.cp.value;
    const ville= e.target.ville.value;
    const siret=e.target.siret.value;
    const description=e.target.description.value;
    const facebook=e.target.facebook.value;
    //const region= this.state.regionChoisi;

    //on créer un tableau de valeur
    const newElevageTableau = {
      email:email_user,
      nom_elevage: nom_elevage,
      adresse: adresse,
      cp: cp,
      ville: ville,
      siret:siret,
      description:description,
      facebook:facebook,
      //region:region
    };

    addElevage(newElevageTableau)
      .then((res) => {
        const status = res.status;
        //console.log(res);
        if (status === 200) {
          this.setState({ successMessage: true });
          setTimeout(() => { this.props.hideForm(true); }, 2000);

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
                  Votre profil d'éleveur à bien été mis à jour
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
              <h6>Créez votre page éleveur</h6>
              <Form onSubmit={this.handleSubmit}  className="mb-5">
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="">Nom de votre élevage</Label>
                      <InputGroup>
                        <InputGroupText>
                          https://www.fydop.fr/eleveurs
                        </InputGroupText>
                        <Input
                          className="form-control"
                          type="text"
                          name="nom_elevage"
                          id="nom_elevage"
                          onChange={this.handleChange}
                          placeholder="nom de votre elevage"
                          required
                        />
                        <InputGroupText>
                          .fr
                        </InputGroupText>
                      </InputGroup>
                      <FormText>Il s'agit du nom qui s'affichera dans l'URL de votre page d'eleveur</FormText>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="">Adresse</Label>
                      <Input
                        className="form-control"
                        type="text"
                        name="adresse"
                        id="adresse"
                        onChange={this.handleChange}
                        required
                      />
                      <FormText>Cette information ne sera pas affichée sur votre page éleveur.</FormText>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="">Code postal</Label>
                      <Input
                        className="form-control"
                        type="text"
                        name="cp"
                        id="cp"
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
                </Row>

                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for=""><b>Régions</b></Label>
                      <Select
                        value={this.selectedOption}
                        options={this.state.regionsList}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="">Siret</Label>
                      <Input
                        className="form-control"
                        type="text"
                        name="siret"
                        id="siret"
                        onChange={this.handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="">Page Facebook</Label>
                      <InputGroup>
                        <InputGroupText>
                          https://www.facebook.com/
                        </InputGroupText>
                        <Input
                          className="form-control"
                          type="text"
                          name="facebook"
                          id="facebook"
                          onChange={this.handleChange}
                        />
                      </InputGroup>


                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label className="mt-4" for="">Présentation de votre élevage</Label>
                  <Input
                    className="form-control"
                    type="textarea"
                    name="description"
                    id="description"
                    rows="10"
                    onChange={this.handleChange}
                    required
                  />
                  <br/>
                  <Label for="exampleFile">
                    Illustration 1
                  </Label>
                  <Input
                    id="photo1"
                    name="photo1"
                    type="file"
                  />
                  <Label for="exampleFile">
                    Illustration 2
                  </Label>
                  <Input
                    id="photo2"
                    name="photo2"
                    type="file"
                  />
                  <Label for="exampleFile">
                    Illustration  3
                  </Label>
                  <Input
                    id="photo3"
                    name="photo3"
                    type="file"
                  />

                </FormGroup>
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

export default FormAddElevage;
