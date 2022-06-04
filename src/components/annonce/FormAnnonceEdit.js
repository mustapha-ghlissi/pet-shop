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
  FormFeedback,
} from "reactstrap";

import AsyncSelect from 'react-select/async';
import Select from 'react-select'
import { editAnnonce, uploadPhotos } from "../../functions.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { LabelS } from "../../styles/Form"
import { ButtonPrimary } from "../../styles/Buttons"
import moment from "moment";


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

class FormAnnonceEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      annonce: this.props.annonce,
      dateNaissance: moment(this.props.annonce.date_naissance).format('DD/M/YYYY'),
      dateDisponibilite: moment(this.props.annonce.date_dispo).format('DD/M/YYYY'),
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
    const ignoredFields = ['photo_1', 'photo_2', 'photo_3'];

    for (const field of formFields) {
      if (field.name !== '' && field.value.trim() === '' && !ignoredFields.includes(field.name)) {
        formErrors[field.name] = 'Ce champs est requis';
      }
    }

    this.setState({
      formErrors
    });

    return Object.keys(formErrors).length === 0;
  }

  getPhotos = (photoFields) => {
    let fields = [];

    for (const photo of photoFields) {
      fields.push({
        id: photo.id,
        filename: photo.filename,
      });
    }

    return fields;
  }

  handleSubmit(event) {
    window.scrollTo(0, 0);
    event.preventDefault();

    const {annonce} = this.state;
    const isValidForm = this.validateForm(event.target);

    if (!isValidForm) {
      return false;
    }

    this.setState({
      isLoading: true,
    });

    const typeAnnonce = event.target.typeAnnonce.value;
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
    let photo_1 = event.target.photo_1.files[0];
    let photo_2 = event.target.photo_2.files[0];
    let photo_3 = event.target.photo_3.files[0];
    const prix = event.target.prix.value;
    const accompte = event.target.accompte.value;

    let newAnnonceTableau = {
      type: typeAnnonce,
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
      prix,
      accompte,
      statut: annonce.statut,
      photo_1: this.getPhotos(annonce.photo1),
      photo_2: this.getPhotos(annonce.photo2),
      photo_3: this.getPhotos(annonce.photo3),
    };

    if(photo_1 === undefined) {
      photo_1 = null;
    }

    if(photo_2 === undefined) {
      photo_2 = null;
    }

    if(photo_3 === undefined) {
      photo_3 = null;
    }

    if (photo_1 || photo_2 || photo_3) {
      uploadPhotos(photo_1, photo_2, photo_3, newAnnonceTableau.photo_1, newAnnonceTableau.photo_2, newAnnonceTableau.photo_3)
      .then((res) => {
          const {images} = res.data;

            //on créer un tableau de valeur
            if (photo_1) {
              newAnnonceTableau = {
                ...newAnnonceTableau,
                photo_1: [images.photo_1],
              };
            }

            if (photo_2) {
              newAnnonceTableau = {
                ...newAnnonceTableau,
                photo_2: [images.photo_2],
              };
            }

            if (photo_3) {
              newAnnonceTableau = {
                ...newAnnonceTableau,
                photo_3: [images.photo_3],
              };
            }

            this.handleEditAnnonce(newAnnonceTableau);

      }).catch((e) => {
        console.error(e)
        this.setState({
          isLoading: false,
        });
      });
    }
    else {
      this.handleEditAnnonce(newAnnonceTableau);
    }
  }

  handleEditAnnonce = (newAnnonceTableau) => {
    const { annonce } = this.state;
    editAnnonce(annonce.idAnnonce, newAnnonceTableau, this.props.userEmail)
    .then((res) => {
      const status = res.status;
      this.setState({
        isLoading: false,
      });
      if (status === 200) {
        this.setState({ successMessage: true });
        setTimeout(() => {
          this.props.hideForm();
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
  }

  filterRaces = (inputRaceValue) => {
    const {racesList} = this.props;

    return racesList.filter((i) =>
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
      annonce,
    } = this.state;


    return (
      <div>
        <Alert color="light">
          <h4 className="text-center mb-5">
            <FontAwesomeIcon icon={faPaw} className="fa-2x" />
            <br />
            Modifier l'annonce
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
            <Col md="1"></Col>
            <Col md="10">
              <Form onSubmit={this.handleSubmit} className="mb-5">
                <FormGroup>
                  <LabelS for="">Type d'annonce</LabelS>
                  <Select
                    styles={{
                      ...customStyles,
                      control: (provided, state) => ({
                        ...provided,
                        borderColor: 'typeAnnonce' in formErrors ? '#dc3545' : state.isFocused || state.menuIsOpen ? '#1ad760' : provided.borderColor,
                        boxShadow: 'none',
                      }),
                    }}
                    name="typeAnnonce"
                    id="typeAnnonce"
                    invalid={true}
                    placeholder="Choisir"
                    defaultValue={{
                      value: annonce.type,
                      label: annonce.type
                    }}
                    options={[
                      { value: 'Vendre une portée (1 ou plusieurs chiots)', label: 'Vendre une portée (1 ou plusieurs chiots)' },
                      { value: 'Mise en réservation future portée (1 ou plusieurs chiots)', label: 'Mise en réservation future portée (1 ou plusieurs chiots)' },
                    ]}
                  />
                  {
                    'typeAnnonce' in formErrors &&
                    <small className="text-danger">
                      {formErrors['typeAnnonce']}
                    </small>
                  }
                </FormGroup>
                <FormGroup>
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
                      defaultValue={this.props.racesList.find(el => el.value === annonce.race)}
                      name="race"
                      id="race"
                      placeholder="Choisir"
                      isClearable
                    />
                    {
                    'race' in formErrors &&
                    <small className="text-danger">
                      {formErrors['race']}
                    </small>
                  }
                </FormGroup>
                <FormGroup>
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
                      defaultValue={annonce.regions.length > 0 && this.props.regionsList.find(el => el.value === annonce.regions[0])}
                      placeholder="Choisir"
                      isClearable
                    />
                    {
                    'regions' in formErrors &&
                    <small className="text-danger">
                      {formErrors['regions']}
                    </small>
                  }
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
                        defaultValue={annonce.lof_dossier}
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
                        defaultValue={annonce.lof_annee}
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
                        defaultValue={annonce.lof_numero}
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
                  <LabelS for="">Naissance de la portée</LabelS>
                  <Input
                    className="form-control"
                    type="date"
                    name="date_naissance"
                    id="date_naissance"
                    onChange={this.handleChangeDateNaissance}
                    defaultValue={moment(annonce.date_naissance).format('YYYY-MM-DD')}
                    invalid={'date_naissance' in formErrors}
                    />
                    {
                      'date_naissance' in formErrors &&
                      <FormFeedback>
                        {formErrors['date_naissance']}
                      </FormFeedback>
                    }
                </FormGroup>
                <FormGroup>
                  <LabelS for="">Disponibilité de la portée</LabelS>
                  <Input
                    className="form-control"
                    type="date"
                    name="date_dispo"
                    id="date_dispo"
                    defaultValue={moment(annonce.date_dispo).format('YYYY-MM-DD')}
                    onChange={this.handleChangeDateDispo}
                    invalid={'date_dispo' in formErrors}
                    />
                    {
                      'date_dispo' in formErrors &&
                      <FormFeedback>
                        {formErrors['date_dispo']}
                      </FormFeedback>
                    }
                </FormGroup>
                <FormGroup>
                  <Row form>
                    <Col md="6">
                      <LabelS for="">Nombre de mâles</LabelS>
                      <Input
                        className="form-control"
                        type="number"
                        name="nb_male"
                        id="nb_male"
                        defaultValue={annonce.nb_male}
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
                      <LabelS for="">Nombre de femelles</LabelS>
                      <Input
                        className="form-control"
                        type="number"
                        name="nb_femelle"
                        id="nb_femelle"
                        defaultValue={annonce.nb_femelle}
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
                  <LabelS className="mt-2" for="">Les chiots seront-ils vaccinés ?</LabelS>

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
                    defaultValue={[
                      { value: 'oui', label: 'Oui' },
                      { value: 'non', label: 'Non' },
                    ].find(el => el.value === annonce.vaccin)}
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
                </FormGroup>
                <FormGroup>
                  <LabelS className="mt-2" for="">Les chiots seront-ils pucés ou tatoués ?</LabelS>
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
                    defaultValue={[
                      { value: 'oui', label: 'Oui' },
                      { value: 'non', label: 'Non' },
                    ].find(el => el.value === annonce.puce)}
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
                </FormGroup>

                <FormGroup className="mt-5">
                  <LabelS for="">Informations parents</LabelS>
                  <hr />
                  <Row form>
                    <Col md={6}>
                      <LabelS for="">Numéro identification de la mère</LabelS>
                      <Input
                        className="form-control"
                        type="text"
                        name="numero_mere"
                        id="numero_mere"
                        defaultValue={annonce.numero_mere}
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
                      <LabelS for="">Numéro identification du père</LabelS>
                      <Input
                        className="form-control"
                        type="text"
                        name="numero_pere"
                        id="numero_pere"
                        defaultValue={annonce.numero_pere}
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
                      <LabelS for="">Prix total TTC</LabelS>
                      <Input
                        className="form-control"
                        type="text"
                        name="prix"
                        id="prix"
                        defaultValue={annonce.prix}
                        onChange={this.handleChange}
                        invalid={'prix' in formErrors}
                        />
                        {
                          'prix' in formErrors &&
                          <FormFeedback>
                            {formErrors['prix']}
                          </FormFeedback>
                        }
                    </Col>
                    <Col md={6}>
                      <LabelS for="">Prix de l'accompte</LabelS>
                      <Input
                        className="form-control"
                        type="text"
                        name="accompte"
                        id="accompte"
                        defaultValue={annonce.accompte}
                        onChange={this.handleChange}
                        invalid={'accompte' in formErrors}
                        />
                        {
                          'accompte' in formErrors &&
                          <FormFeedback>
                            {formErrors['accompte']}
                          </FormFeedback>
                        }
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup className="mt-5">
                  <LabelS for="">Votre annonce </LabelS>
                  <hr />
                  <LabelS for="">Titre</LabelS>
                  <Input
                    className="form-control"
                    type="text"
                    name="titre"
                    id="titre"
                    defaultValue={annonce.titre}
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
                  <LabelS for="">Description</LabelS>
                  <Input
                    className="form-control"
                    type="textarea"
                    name="description"
                    id="description"
                    defaultValue={annonce.description}
                    cols={"6"}
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

export default FormAnnonceEdit;
