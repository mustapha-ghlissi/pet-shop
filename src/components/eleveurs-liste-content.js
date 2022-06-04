import React from "react";
import { NavLink } from "react-router-dom";
import {
  Col,
  Container, Badge, Card, CardImg, CardBody, CardSubtitle, CardTitle, Form, Row, FormGroup, Label
} from "reactstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import {getRaces, getRegions, getAllElevage} from '../functions';
import AsyncSelect from "react-select/async";
import {customStylesSelect} from "./annonces-content"



const Section = styled.section`
margin-top:100px;
background-color:#F5F5F5;
padding:2rem 0;
&.white{
background-color:#FFF;
margin-top:20px;
}
`
export const ListEleveur = styled.div`
  display: flex;
    flex-wrap: wrap;
`
export const NavLinkEleveur = styled(NavLink)`
&&{
:hover{
  cursor:pointer;
  text-decoration: none;
  .card{
  border-color:#1ed760;
  }
}
}
`

export const EleveurCard = styled(Card)`
display:flex;
flex-direction: row;
align-items:start;
min-width: 100%;
color:#114e23;
margin-bottom:2rem;
transition:all .5s ease;
.card-img{
margin-right:2rem;
}
.card-subtitle{
display: flex;
flex-direction: row;
}
`
export const Note = styled.div`
svg{
color:#f1d505;
}
`
export const BlocImage = styled.div`
height: 140px;
width: 140px;
position: relative;
overflow: hidden;
`

class EleveursListeContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      eleveursList: [],
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

    if (Object.keys(filterFields).length > 0 && filterFields.type === 'tous') {
      delete filterFields.type;
    }

    if (Object.keys(filterFields).length > 0) {
      formula = this.getFormula(filterFields);
    }

    // Fetch data in concurrent mode
    Promise.all([getAllElevage(formula), getRaces(), getRegions()])
      .then((results) => {
        const eleveurs = results[0].data.records;
        const races = results[1].data.records;
        const regions = results[2].data.records;

        this.setState({
          eleveursList: eleveurs,
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
  }//end component did mount

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
    //console.log(inputRaceValue);
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
        getAllElevage()
          .then((res) => {
            this.setState({
              eleveursList: res.data.records,
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
    getAllElevage(formula)
      .then((res) => {
        this.setState({
          eleveursList: res.data.records,
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
        <Section className={"white"}>
          <Container>
            {this.state.isLoaded === true && (
              <ListEleveur>
                {this.state.eleveursList.map((eleveur, index) => (
                <>
                {eleveur.fields.statut === "En ligne" && (
                  <>
                    <>
                      <Col md={"6"}>
                        <NavLinkEleveur
                          to={{
                            pathname: `/eleveur-chien-de-race/${eleveur.fields.url_elevage}`
                          }}
                          target="_blank"
                        >
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
                              <CardTitle tag="h5" className={"mb-4"}>
                                {eleveur.fields.nom_elevage}
                              </CardTitle>
                              <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6"
                              >
                                <FontAwesomeIcon icon={faMapMarkerAlt} className={"mr-1"}  />
                                {eleveur.fields.ville}

                                {/*<Note>
                                  <FontAwesomeIcon icon={faStar}  />
                                  <FontAwesomeIcon icon={faStar}  />
                                  <FontAwesomeIcon icon={faStar}  />
                                  <FontAwesomeIcon icon={faStar}  />
                                  <FontAwesomeIcon icon={faStarHalfAlt}  />
                                  <span>(4)</span>
                                </Note>*/}
                              </CardSubtitle>

                              <div className={"d-flex flex-row align-items-center"}>
                                <small>Race(s) :</small>
                                {" "}

                                <Badge color={"light"} className={"mr-2"}>Labrador</Badge>
                                <Badge color={"light"} className={"mr-2"}>Labrador</Badge>
                              </div>
                            </CardBody>
                          </EleveurCard>
                        </NavLinkEleveur>
                      </Col>
                    </>
                  </>
                  )}
                  </>
              ))}
              </ListEleveur>
            )}

          </Container>
        </Section>
      </>
    );
  }
}

export default EleveursListeContent;
