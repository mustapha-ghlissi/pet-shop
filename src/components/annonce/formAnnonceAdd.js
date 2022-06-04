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
  FormFeedback, InputGroupText, InputGroup,
} from "reactstrap";

import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { addAnnonce, uploadPhotos } from "../../functions.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { LabelS } from "../../styles/Form"
import { ButtonPrimary } from "../../styles/Buttons"
import moment from "moment";
import {getAnnonceUser} from "../../functions"


const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted #1ad760',
    color: state.isSelected || state.isFocused ? '#fff' : provided.color,
    backgroundColor: state.isSelected || state.isFocused ? '#1ad760' : provided.backgroundColor,
    padding: 10,
  }),
  control: (provided, state) => ({
    // none of react-select's styles are passed to <Control />
    ...provided,
    borderColor: state.isFocused || state.menuIsOpen ? '#1ad760' : provided.borderColor,
    boxShadow: 'none',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

class FormAnnonceAdd extends React.Component {
  constructor(props) {
    super(props);
    this.user = this.props.user;
    this.userInfos = this.props.userInfos;
    this.userAirtableId = this.props.userAirtableId;

    this.state = {
      annonceUserList: [],
      dateNaissance: null,
      dateDisponibilite: null,
      inputRaceValue: '',
      inputRegionValue: '',
      formErrors: {},
      race: null,
      isLoading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDateNaissance = this.handleChangeDateNaissance.bind(this);
    this.handleChangeDateDispo = this.handleChangeDateDispo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const user = this.props.user;
    getAnnonceUser(user)
      .then((res) => {
        //console.log("appartement user", res);
        if (res != null) {
          this.setState({ annonceUserList: res });
          //console.log("state", this.state.appartementUserList);
        }
      })
      .catch((e) => console.error(e));
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleChangeDateNaissance(event) {
    var str = document.getElementById("date_naissance").value;
    var dateNaissanceFormatted = moment(str).format("DD/M/YYYY");
    console.log("dateNaissanceFormatted", dateNaissanceFormatted);
    this.setState({ dateNaissance: dateNaissanceFormatted });
  }

  handleChangeDateDispo(event) {
    var str = document.getElementById("date_dispo").value;
    var dateDispoFormatted = moment(str).format("DD/M/YYYY");
    console.log("dateDispoFormatted", dateDispoFormatted);
    this.setState({ dateDisponibilite: dateDispoFormatted });
  }

  validateForm = (formFields) => {

    let formErrors = {};
    for (const field of formFields) {
      if (field.name !== '' && field.value.trim() === '') {
        formErrors[field.name] = 'Ce champs est requis';
      }
    }

    this.setState({
      formErrors
    });

    return Object.keys(formErrors).length === 0;
  }

  handleSubmit(event) {
    window.scrollTo(0, 0);
    event.preventDefault();

    const isValidForm = this.validateForm(event.target);

    if (!isValidForm) {
      return false;
    }

    this.setState({
      isLoading: true,
    });

    const race = event.target.race.value;
    const regions = event.target.regions.value;
    const lof_dossier = event.target.lof_dossier.value;
    const lof_annee = event.target.lof_annee.value;
    const lof_numero = event.target.lof_numero.value;
    const numero_mere = event.target.numero_mere.value;
    const numero_pere = event.target.numero_pere.value;
    const date_naissance = this.state.dateNaissance;
    const date_dispo = this.state.dateDisponibilite;
    const nb_male = event.target.nb_male.value;
    const nb_femelle = event.target.nb_femelle.value;
    const vaccin = event.target.vaccin.value;
    const puce = event.target.puce.value;
    const titre = event.target.titre.value;
    const description = event.target.description.value;
    const photo_1 = event.target.photo_1.files[0];
    const photo_2 = event.target.photo_2.files[0];
    const photo_3 = event.target.photo_3.files[0];
    const prix = event.target.prix.value;
    const accompte = event.target.accompte.value;


    uploadPhotos(photo_1, photo_2, photo_3)
      .then((res) => {
          const {images} = res.data;

            //on créer un tableau de valeur
            const newAnnonceTableau = {
              race,
              regions: [regions],
              lof_dossier,
              lof_annee,
              lof_numero,
              numero_mere,
              numero_pere,
              date_naissance,
              date_dispo,
              nb_male,
              nb_femelle,
              vaccin,
              puce,
              titre,
              description,
              photo_1: [images.photo_1],
              photo_2: [images.photo_2],
              photo_3: [images.photo_3],
              prix,
              accompte,
              statut: 'En modération',
            };

          addAnnonce(newAnnonceTableau,this.props.user.email)
          .then((res) => {
            const status = res.status;
            this.setState({
              isLoading: false,
            });
            if (status === 200) {
              this.setState({ successMessage: true });
              setTimeout(() => {
                this.setState({ hideForm: true });
              }, 1000);
              setTimeout(() => {
                this.props.onUpdate(this.state.hideForm);
              }, 1000);

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

      }).catch((e) => {
        console.error(e)
        this.setState({
          isLoading: false,
        });
      });
  }

  filterRaces = (inputRaceValue) => {
    const {racesList} = this.props;
    return racesList && racesList.filter((i) =>
      i.label.toLowerCase().includes(inputRaceValue.toLowerCase())
    );
  };

  loadRacesOptions = (inputRaceValue, callback) => {
    setTimeout(() => {
      callback(this.filterRaces(inputRaceValue));
    }, 1000);
  };

  handleRaceInputChange = (newValue) => {
    this.setState({ inputRaceValue: newValue });
    return newValue;
  };

  filterRegions = (inputRegionValue) => {
    const {regionsList} = this.props;
    return regionsList && regionsList.filter((i) =>
      i.label.toLowerCase().includes(inputRegionValue.toLowerCase())
    );
  };

  loadRegionsOptions = (inputRegionValue, callback) => {
    setTimeout(() => {
      callback(this.filterRegions(inputRegionValue));
    }, 1000);
  };

  handleRegionInputChange = (newValue) => {
    this.setState({ inputRegionValue: newValue });
    return newValue;
  };

  render() {

    const {
      formErrors,
      isLoading,
    } = this.state;

    return (
      <div>
        <Alert color="light">
          <h4 className="text-center mb-5">
            <FontAwesomeIcon icon={faPaw} className="fa-2x mr-3" />
            Créer une annonce
            <br/>
            <small>Tous les champs sont obligatoires</small>
          </h4>
          {this.state.successMessage === true && (
            <Row>
              <Col md="12">
                <Alert color="success">
                  Votre annonce à bien été ajouté
                </Alert>
              </Col>
            </Row>
          )}

          {this.state.errorMessage === true && (
            <Row>
              <Col md="12">
                <Alert color="danger">
                  Un problème est survenu veuillez recommencer.
                </Alert>
              </Col>
            </Row>
          )}

          <Row>
            <Col md="12">
              <Form onSubmit={this.handleSubmit} className="mb-5">
                <FormGroup>
                  <Row form>
                    <Col md="6">

                  <LabelS for="">Race</LabelS>
                  <AsyncSelect
                      styles={{
                        ...customStyles,
                        control: (provided, state) => ({
                          ...provided,
                          borderColor: 'race' in formErrors ? '#dc3545' : state.isFocused || state.menuIsOpen ? '#1ad760' : provided.borderColor,
                          boxShadow: 'none',
                        }),
                      }}
                      cacheOptions
                      loadOptions={this.loadRacesOptions}
                      defaultOptions
                      onInputChange={this.handleRaceInputChange}
                      name="race"
                      id="race"
                      placeholder="Choisir"
                    />
                    {
                    'race' in formErrors &&
                    <small className="text-danger">
                      {formErrors['race']}
                    </small>
                  }
                    </Col>
                      <Col md="6">

                  <LabelS for="">Région</LabelS>
                  <AsyncSelect
                      styles={{
                        ...customStyles,
                        control: (provided, state) => ({
                          ...provided,
                          borderColor: 'regions' in formErrors ? '#dc3545' : state.isFocused || state.menuIsOpen ? '#1ad760' : provided.borderColor,
                          boxShadow: 'none',
                        }),
                      }}
                      cacheOptions
                      loadOptions={this.loadRegionsOptions}
                      defaultOptions
                      onInputChange={this.handleRegionInputChange}
                      name="regions"
                      id="regions"
                      placeholder="Choisir"
                    />
                    {
                    'regions' in formErrors &&
                    <small className="text-danger">
                      {formErrors['regions']}
                    </small>
                  }
                      </Col>
                  </Row>
                </FormGroup>

                <FormGroup>
                  <LabelS for="">N° de portée LOF</LabelS>
                  <Row form>
                    <Col md="4">
                      <Input
                        className="form-control"
                        type="text"
                        placeholder='Dossier'
                        name="lof_dossier"
                        id="lof_dossier"
                        onChange={this.handleChange}
                        invalid={'lof_dossier' in formErrors}
                      />
                      {
                        'lof_dossier' in formErrors &&
                        <FormFeedback>
                          {formErrors['lof_dossier']}
                        </FormFeedback>
                      }
                    </Col>
                    <Col md="4">
                      <Input
                        className="form-control"
                        type="text"
                        placeholder='Année'
                        name="lof_annee"
                        id="lof_annee"
                        onChange={this.handleChange}
                        invalid={'lof_annee' in formErrors}
                        />
                        {
                          'lof_annee' in formErrors &&
                          <FormFeedback>
                            {formErrors['lof_annee']}
                          </FormFeedback>
                        }
                    </Col>
                    <Col md="4">
                      <Input
                        className="form-control"
                        type="text"
                        placeholder='Numéro'
                        name="lof_numero"
                        id="lof_numero"
                        onChange={this.handleChange}
                        invalid={'lof_numero' in formErrors}
                        />
                        {
                          'lof_numero' in formErrors &&
                          <FormFeedback>
                            {formErrors['lof_numero']}
                          </FormFeedback>
                        }
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row form>
                    <Col md="6">
                  <label for="">Naissance de la portée</label>
                  <Input
                    className="form-control"
                    type="date"
                    name="date_naissance"
                    id="date_naissance"
                    Naissance de la portée
                    invalid={'date_naissance' in formErrors}
                    />
                    {
                      'date_naissance' in formErrors &&
                      <FormFeedback>
                        {formErrors['date_naissance']}
                      </FormFeedback>
                    }
                    </Col>
                      <Col md="6">
                      <label for="">Disponibilité de la portée</label>
                      <Input
                        className="form-control"
                        type="date"
                        name="date_dispo"
                        id="date_dispo"
                        onChange={this.handleChangeDateDispo}
                        invalid={'date_dispo' in formErrors}
                        />
                        {
                          'date_dispo' in formErrors &&
                          <FormFeedback>
                            {formErrors['date_dispo']}
                          </FormFeedback>
                        }
                      </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row form>
                    <Col md="6">
                      <label for="">Nombre de mâles</label>
                      <Input
                        className="form-control"
                        type="number"
                        name="nb_male"
                        id="nb_male"
                        onChange={this.handleChange}
                        invalid={'nb_male' in formErrors}
                        />
                        {
                          'nb_male' in formErrors &&
                          <FormFeedback>
                            {formErrors['nb_male']}
                          </FormFeedback>
                        }
                    </Col>
                    <Col md="6">
                      <label for="">Nombre de femelles</label>
                      <Input
                        className="form-control"
                        type="number"
                        name="nb_femelle"
                        id="nb_femelle"
                        onChange={this.handleChange}
                        invalid={'nb_femelle' in formErrors}
                        />
                        {
                          'nb_femelle' in formErrors &&
                          <FormFeedback>
                            {formErrors['nb_femelle']}
                          </FormFeedback>
                        }
                    </Col>
                  </Row>
                </FormGroup>

                <FormGroup className="mt-5">
                  <LabelS for="">Informations chiots</LabelS>
                  <hr />
                  <Row form>
                    <Col md={6}>
                      <label className="mt-2" for="">Les chiots seront-ils vaccinés ?</label>
                      <Select
                        styles={{
                          ...customStyles,
                          control: (provided, state) => ({
                            ...provided,
                            borderColor: 'vaccin' in formErrors ? '#dc3545' : state.isFocused || state.menuIsOpen ? '#1ad760' : provided.borderColor,
                            boxShadow: 'none',
                          }),
                        }}
                        name="vaccin"
                        id="vaccin"
                        placeholder="Choisir"
                        options={[
                          { value: 'oui', label: 'Oui' },
                          { value: 'non', label: 'Non' },
                        ]}
                      />
                      {
                        'vaccin' in formErrors &&
                        <small className="text-danger">
                          {formErrors['vaccin']}
                        </small>
                      }
                    </Col>
                    <Col md={6}>
                      <label className="mt-2" for="">Les chiots seront-ils pucés ou tatoués ?</label>
                      <Select
                        styles={{
                          ...customStyles,
                          control: (provided, state) => ({
                            ...provided,
                            borderColor: 'puce' in formErrors ? '#dc3545' : state.isFocused || state.menuIsOpen ? '#1ad760' : provided.borderColor,
                            boxShadow: 'none',
                          }),
                        }}
                        name="puce"
                        id="puce"
                        placeholder="Choisir"
                        options={[
                          { value: 'oui', label: 'Oui' },
                          { value: 'non', label: 'Non' },
                        ]}
                      />
                      {
                        'puce' in formErrors &&
                        <small className="text-danger">
                          {formErrors['puce']}
                        </small>
                      }
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup className="mt-5">
                  <LabelS for="">Informations parents</LabelS>
                  <hr />
                  <Row form>
                    <Col md={6}>
                      <label for="">Numéro identification de la mère</label>
                      <Input
                        className="form-control"
                        type="text"
                        name="numero_mere"
                        id="numero_mere"
                        onChange={this.handleChange}
                        invalid={'numero_mere' in formErrors}
                        />
                        {
                          'numero_mere' in formErrors &&
                          <FormFeedback>
                            {formErrors['numero_mere']}
                          </FormFeedback>
                        }
                    </Col>
                    <Col md={6}>
                      <label for="">Numéro identification du père</label>
                      <Input
                        className="form-control"
                        type="text"
                        name="numero_pere"
                        id="numero_pere"
                        onChange={this.handleChange}
                        invalid={'numero_pere' in formErrors}
                        />
                        {
                          'numero_pere' in formErrors &&
                          <FormFeedback>
                            {formErrors['numero_pere']}
                          </FormFeedback>
                        }
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup className="mt-5">
                  <LabelS for="">Prix</LabelS>
                  <hr />
                  <Row form>
                    <Col md={6}>
                      <label for="">Prix total TTC</label>
                      <InputGroup>
                        <Input
                          className="form-control"
                          type="text"
                          name="prix"
                          id="prix"
                          onChange={this.handleChange}
                          invalid={'prix' in formErrors}
                        />
                        {
                          'prix' in formErrors &&
                          <FormFeedback>
                            {formErrors['prix']}
                          </FormFeedback>
                        }
                        <InputGroupText>
                          €
                        </InputGroupText>
                      </InputGroup>

                    </Col>
                    <Col md={6}>
                      <label for="">Prix de l'accompte</label>
                      <InputGroup>
                        <Input
                          className="form-control"
                          type="text"
                          name="accompte"
                          id="accompte"
                          onChange={this.handleChange}
                          invalid={'accompte' in formErrors}
                        />
                        {
                          'accompte' in formErrors &&
                          <FormFeedback>
                            {formErrors['accompte']}
                          </FormFeedback>
                        }
                        <InputGroupText>
                          €
                        </InputGroupText>
                      </InputGroup>

                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup className="mt-5">
                  <LabelS for="">Votre annonce </LabelS>
                  <hr />
                  <label for="">Titre</label>
                  <Input
                    className="form-control"
                    type="text"
                    name="titre"
                    id="titre"
                    onChange={this.handleChange}
                    invalid={'titre' in formErrors}
                    />
                    {
                      'titre' in formErrors &&
                      <FormFeedback>
                        {formErrors['titre']}
                      </FormFeedback>
                    }
                </FormGroup>
                <FormGroup>
                  <label for="">Description</label>
                  <Input
                    className="form-control"
                    type="textarea"
                    name="description"
                    id="description"
                    rows="10"
                    onChange={this.handleChange}
                    invalid={'description' in formErrors}
                    />
                    {
                      'description' in formErrors &&
                      <FormFeedback>
                        {formErrors['description']}
                      </FormFeedback>
                    }
                </FormGroup>
                <FormGroup className="mt-5">
                  <LabelS for="">Photos</LabelS>
                  <hr />
                  <Row form>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="exampleFile">
                          Photo 1
                        </Label>
                        <Input
                          id="photo_1"
                          name="photo_1"
                          type="file"
                          accept='image/png,image/jpeg,image/jpg,image/gif'
                          invalid={'photo_1' in formErrors}
                        />
                        {
                          'photo_1' in formErrors &&
                          <FormFeedback>
                            {formErrors['photo_1']}
                          </FormFeedback>
                        }
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="exampleFile">
                          Photo 2
                        </Label>
                        <Input
                          id="photo_2"
                          name="photo_2"
                          type="file"
                          accept='image/png,image/jpeg,image/jpg,image/gif'
                          invalid={'photo_2' in formErrors}
                        />
                        {
                          'photo_2' in formErrors &&
                          <FormFeedback>
                            {formErrors['photo_2']}
                          </FormFeedback>
                        }
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="exampleFile">
                          Photo 3
                        </Label>
                        <Input
                          id="photo_3"
                          name="photo_3"
                          type="file"
                          accept='image/png,image/jpeg,image/jpg,image/gif'
                          invalid={'photo_3' in formErrors}
                        />
                        {
                          'photo_3' in formErrors &&
                          <FormFeedback>
                            {formErrors['photo_3']}
                          </FormFeedback>
                        }
                      </FormGroup>
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup className="text-right">
                  <Button
                    outline
                    color="secondary"
                    onClick={this.props.hideForm}
                    className="mr-3"
                  >
                    Annuler
                  </Button>
                  <ButtonPrimary
                    type="submit"
                    color="primary"
                    disabled={isLoading}
                  >
                    Valider
                  </ButtonPrimary>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Alert>
      </div>
    );
  }
}

export default FormAnnonceAdd;
