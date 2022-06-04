import React from "react";
import {
  Form,
  FormGroup,
  Button,
  Label,
  Input,
  Row,
  Col,
  Alert,
  InputGroup,InputGroupText,FormText
} from "reactstrap";
import { getInfoElevage,updateInfoElevage} from "../../functions.js";
import styled from "styled-components";

const AlertS = styled(Alert)`
 color: #424244;
`



class FormEditElevage extends React.Component {
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
      airtable_elevage_id:""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {
    //on recupère les infos de ce user
    getInfoElevage(this.props.user).then((res) => {
      console.log("get user info forme edit ELEVAGE",res);
      if(res != null){
        this.setState({
          nom_elevage: res[0].nom_elevage,
          adresse: res[0].adresse,
          cp: res[0].cp,
          ville: res[0].ville,
          region: res[0].region,
          siret:res[0].siret,
          description:res[0].description,
          facebook:res[0].facebook,
          airtable_elevage_id:res[0].airtable_id_elevage
        });
      }
    });
  }

  handleChange(value) {
    this.setState({
      nom_elevage: value.nom_elevage,
      adresse: value.adresse,
      cp: value.cp,
      ville: value.ville,
      region: value.region,
      siret:value.siret,
      description:value.description,
      facebook:value.facebook
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
      const region= e.target.region.value;
      const siret=e.target.siret.value;
      const description=e.target.description.value;
      const facebook=e.target.facebook.value;
      const idElevageAModifier=this.state.airtable_elevage_id

    //on créer un tableau de valeur
    const updateElevageTableau = {
      email:email_user,
      nom_elevage: nom_elevage,
      adresse: adresse,
      cp: cp,
      ville: ville,
      region: region,
      siret:siret,
      description:description,
      facebook:facebook
    };

    updateInfoElevage(updateElevageTableau,idElevageAModifier)
      .then((res) => {
        const status = res.status;
        console.log(res);
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
              <Form onSubmit={this.handleSubmit}  className="mb-5">
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="">Nom de votre élevage  </Label>

                      <Input
                        className="form-control"
                        type="text"
                        name="nom_elevage"
                        id="nom_elevage"
                        onChange={this.handleChange}
                        value={this.state.nom_elevage}
                      />
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
                        value={this.state.adresse}
                      />
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
                        value={this.state.cp}
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
                        value={this.state.ville}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="">Région</Label>
                      <Input
                        type="select"
                        name="region"
                        id="region"
                        onChange={this.handleChange}
                      >
                        {/*{regionList.map((region) => (
                          <option value={region.value}>{region.Name}</option>
                        ))}*/}
                      </Input>
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
                        value={this.state.siret}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="">Page facebook</Label>

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
                          value={this.state.facebook}
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
                    value={this.state.description}
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

export default FormEditElevage;
