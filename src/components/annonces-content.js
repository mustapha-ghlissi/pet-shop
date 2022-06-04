import React from "react";
import { NavLink } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Form,
  FormGroup,
  Label, Card, CardImg, CardBody, CardSubtitle, CardTitle
} from "reactstrap";
import AsyncSelect from 'react-select/async';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt, faPaw, faUser,faFrown} from "@fortawesome/free-solid-svg-icons";
import { allAnnonces, getRaces, getRegions } from '../functions';

export const customStylesSelect = {
  menu: (provided) => ({
    ...provided,
    zIndex: 999
  }),
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

const Section = styled.section`
margin-top:100px;
background-color:#F5F5F5;
padding:1rem;
`

export const ListAnnonce = styled.div`
margin-top:2rem;
margin-bottom:2rem;
@media (max-width: 768px) {
    max-width:80%;
    margin:0 auto;
  }
`
export const Annonce = styled(Card)`
.card-title{
color:#114e23;
min-height:50px;
}
@media (max-width: 768px) {
    margin-bottom:2rem;
}

&:hover{
text-decoration:none!important;
}
`
export const NavLinkAnnonce = styled(NavLink)`
&:hover{
text-decoration:none!important;
}
`
export const NbChiots = styled.p`
color:#6c757d!important;
font-size:1rem;
display:flex;
align-items: center;
svg{
margin-right: .5rem;
}
`

export const InfoEleveur = styled.p`
color:#6c757d!important;
font-size:.8rem;
display:flex;
align-items: center;
svg{
margin-right: .5rem;
}
`
export const BadgeType = styled.div`
position:absolute;
    top: .75rem;
    left: .75rem;
    padding:.5rem .75rem;
    border-radius:0.6rem;
    color:white;
    font-weight: bold;
    z-index: 1;
    &.vente{
      background-color: #1ed760;
    }
    &.reservation{
      background-color: #fbf7e740;
    }
`
export const BlocImage = styled.div`
height:180px;
width:100%;
position:relative;
overflow:hidden;
display:flex;
justify-content: center;
align-items: center;
background-color:#F5F5F5;
img{

width:auto;
max-width: 100%;
height:auto;
min-height:150px;
}
@media (max-width: 768px) {
    height:200px;
    background-color:#F5F5F5;
    text-align: center;
    img{
    height: auto;
    width: 50%;
    left: 25%;
    min-height: 80%;
    top: 5%;
    
    }
}


`

class AnnoncesContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      annoncesList: [],
      racesList: [],
      regionsList: [],
      isLoaded: false,
      isLoading: false,
      inputRegionValue: '',
      inputRaceValue: '',
      filters: {}
    };
  } //end props

  componentDidMount() {
    let currentLocation = window.location.href;
    let url = new URL(currentLocation);
    let params = new URLSearchParams(url.search);
    let urlParams = ['race', 'region'];
    let nextLocation = url.origin + url.pathname;
    let filterFields = {};
    let formula = null;
    let paramsModified = false;

    for (var key of params.keys()) {
      if (!urlParams.includes(key)) {
        params.delete(key);

        if (!paramsModified) {
          paramsModified = true;
        }
      }
    }

    if (paramsModified) {
      nextLocation += `?${params.toString()}`;
      window.history.replaceState(filterFields, 'Fydop', nextLocation);
    }

    if (params.has('race') && params.get('race').trim().length > 0) {
      filterFields.race = params.get('race');
    }

    if (params.has('region') && params.get('region').trim().length > 0) {
      filterFields.region = params.get('region');
    }

    this.setState({
      filters: filterFields
    });

    if (Object.keys(filterFields).length > 0) {
      formula = this.getFormula(filterFields);
    }

    // Fetch data in concurrent mode
    Promise.all([allAnnonces(formula), getRaces(), getRegions()])
      .then((results) => {
        const annonces = results[0].data.records;
        const races = results[1].data.records;
        const regions = results[2].data.records;

        this.setState({
          annoncesList: annonces,
          racesList: this.getRaces(races),
          regionsList: this.getRegions(regions),
        });

        if (results[1].data.offset !== undefined && results[1].data.offset) {
          this.getMoreRaces(results[1].data.offset);
        }
        else {
          this.setState({
            isLoaded: true,
          });
        }

      }).catch((e) => {
        this.setState({
          isLoaded: true,
        });
        console.error(e)
      });
  }

  getMoreRaces = (offset) => {
    let {
      racesList
    } = this.state;

    getRaces(offset).then(res => {

      this.setState({
        racesList: [
          ...racesList,
          ...this.getRaces(res.data.records)
        ]
      })

      if (res.data.offset !== undefined && res.data.offset) {
        this.getMoreRaces(res.data.offset);
      }
      else {
        this.setState({
          isLoaded: true,
        })
      }

    }).catch(e => {
      console.error(e)
      this.setState({
        isLoaded: true,
      })
    })
  }

  getRegions = (regions) => {
    let regionsList = [
      {
        value: 'tous',
        label: 'Toutes les régions'
      }
    ];

    for (const region of regions) {
      regionsList.push({
        value: region.fields.Name,
        label: region.fields.Name
      });
    }

    return regionsList;
  }

  getRaces = (races) => {
    let racesList = [
      {
        value: 'tous',
        label: 'Toutes les races'
      }
    ];

    for (const race of races) {
      racesList.push({
        value: race.id,
        label: race.fields.Name
      });
    }

    return racesList;
  }

  filterRaces = (inputRaceValue) => {
    const { racesList } = this.state;
    console.log(inputRaceValue);
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
    const { regionsList } = this.state;
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

  generateFilterWhereField(field, data){
    var filter = "{" + field + "} = \"" + data + "\"";
    return filter;
  }

  generateAndFilter(fields){
    var filter = "AND(";
    for(const [key, value] of Object.entries(fields)){
      filter += this.generateFilterWhereField(key, value);
      filter += ',';
    }
    return filter.substring(0,filter.length-1) + ")";
  }

  getFormula = (filterFields) => {
    let formula = "filterByFormula=";
    if (Object.keys(filterFields).length > 1) {
      formula += this.generateAndFilter(filterFields);
    }
    else {
      let key = Object.entries(filterFields)[0][0];
      let value = Object.entries(filterFields)[0][1];
      formula += this.generateFilterWhereField(key, value);
    }

    return encodeURI(formula);
  }

  onFilter = (option, inputName) => {

    let {filters} = this.state;
    let filterFields = {};
    let formula = null;
    let currentLocation = window.location.href;
    let url = new URL(currentLocation);
    let params = new URLSearchParams(url.search);
    let nextLocation = url.origin + url.pathname;

    this.setState({
      isLoading: true,
    })

    filterFields = {
      ...filters,
    }

    // If user clears select value
    if (!option) {

      // Remove the current select value
      delete filterFields[inputName];

      // Remove url param if exists
      if (params.has(inputName)) {
        params.delete(inputName);
      }

      // If there is params in the query string so return the next location with encoded params
      if (Object.keys(filterFields).length > 0) {
        nextLocation += `?${params.toString()}`;
      }

      // While it is a clear, we can replace the current history ! (You can use push also)
      window.history.replaceState(filterFields, 'Fydop', nextLocation);

      // If no filters retrieve the full list of annonces
      if (Object.keys(filterFields).length === 0) {
        allAnnonces()
          .then((res) => {
            this.setState({
              annoncesList: res.data.records,
              isLoading: false,
              filters: filterFields
            });
          })
          .catch((e) => {
            console.error(e)
            this.setState({
              isLoading: false
            })
          });

        return false;
      }
    }
    else {

      // If user select a value from the selects filter, then the form will be submitted, url params will updated too
      // Add te new filter option to the filters array
      filterFields[inputName] = option.value;

      // Append it or update it in the url params
      if (params.has(inputName)) {
        params.set(inputName, filterFields[inputName]);
      } else {
        params.append(inputName, filterFields[inputName]);
      }

      // Set the next location and push it to history
      nextLocation += `?${params.toString()}`;
      window.history.pushState(filterFields, 'Fydop', nextLocation);
    }

    // Set the new filters array in the state
    this.setState({
      filters: filterFields
    });

    if (option && option.value === 'tous') {
      delete filterFields[inputName];
    }

    // Generate Formula Filter
    if (Object.keys(filterFields).length > 0) {
      formula = this.getFormula(filterFields);
    }

    // Filter annonces
    allAnnonces(formula)
      .then((res) => {
        this.setState({
          annoncesList: res.data.records,
          isLoading: false
        });
      })
      .catch((e) => {
        console.error(e)
        this.setState({
          isLoading: false
        })
      });
  }

  getDefaultRace = () => {
    const {
      filters, racesList
    } = this.state;

    if (!('race' in filters)) {
      return {
        value: 'tous',
        label: 'Toutes les races'
      }
    }

    return racesList.find(element => element.value === filters.race);
  }

  getDefaultRegion = () => {
    const {
      filters, regionsList
    } = this.state;

    if (!('regions' in filters)) {
      return {
        value: 'tous',
        label: 'Toutes les régions'
      }
    }

    return regionsList.find(element => element.value === filters.region);
  }

  render() {
    console.log("annonces",this.state.annoncesList)
    return (
      <>
        <Section>
          <Container>
            <Form id="form-filter">
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for=""><b>Race de chien </b></Label>
                    <AsyncSelect
                      styles={customStylesSelect}
                      cacheOptions
                      loadOptions={this.loadRacesOptions}
                      defaultOptions
                      onInputChange={this.handleRaceInputChange}
                      onChange={(option) => this.onFilter(option, 'race')}
                      name="race"
                      id="race"
                      value={this.getDefaultRace()}
                      placeholder="Choisir"
                      isClearable
                    />

                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for=""><b>Régions</b></Label>
                    <AsyncSelect
                      styles={customStylesSelect}
                      cacheOptions
                      loadOptions={this.loadRegionsOptions}
                      defaultOptions
                      onInputChange={this.handleRegionInputChange}
                      onChange={(option) => this.onFilter(option, 'regions')}
                      name="regions"
                      id="regions"
                      value={this.getDefaultRegion()}
                      placeholder="Choisir"
                      isClearable
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </Container>
        </Section>

        <section>
          <Container>
            <Row>
              <Col>
                {this.state.isLoaded === true && (

                  <ListAnnonce>
                    <Row>
                      {this.state.annoncesList.length  === 0 && (
                        <Col md={12} align={"center"}>
                        <p>
                          <FontAwesomeIcon icon={faFrown} />
                          Aucune annonce pour cette recherche</p>
                        </Col>
                      )}
                      {this.state.annoncesList.map((annonce, index) => (
                        <>
                        {annonce.fields.statut === "En ligne" && (
                            <Col lg={4} md={6} className="mb-3">
                              <NavLinkAnnonce
                                to={{
                                  pathname: `/chiot-de-race-a-vendre/${annonce.fields.id}`
                                }}
                                target="_blank"
                              >
                                <Annonce>
                                  <BadgeType className={"vente"}>
                                    En vente
                                  </BadgeType>
                                  <BlocImage>
                                    {annonce.fields.photo_1.map((photo, index) => (
                                      <>
                                        <CardImg
                                          alt="chiot de race"
                                          src={photo.url}
                                          top
                                          width="100%"
                                        />
                                      </>))}

                                  </BlocImage>
                                  <CardBody>
                                    <NbChiots>
                                      <FontAwesomeIcon icon={faPaw} />
                                      {annonce.fields.nb_femelle} femelles / {annonce.fields.nb_males} males
                                    </NbChiots>
                                    <CardTitle tag="h5">
                                      {annonce.fields.titre}
                                    </CardTitle>
                                    <CardSubtitle
                                      className="mb-2 text-muted"
                                      tag="h6"
                                    >
                                      Prix {annonce.fields.prix_total} {" "}€
                                    </CardSubtitle>
                                    <InfoEleveur>
                                      <div>
                                        <FontAwesomeIcon icon={faUser} />{annonce.fields.nom_elevage}
                                      </div>
                                      <div><FontAwesomeIcon icon={faMapMarkerAlt} />{annonce.fields.nom_region}</div>
                                    </InfoEleveur>
                                  </CardBody>
                                </Annonce>
                              </NavLinkAnnonce>
                            </Col>
                          )}
</>
                      ))}
                    </Row>
                  </ListAnnonce>
                )}
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}

export default AnnoncesContent;
