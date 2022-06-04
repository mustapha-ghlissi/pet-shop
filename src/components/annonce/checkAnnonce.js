import React from "react";
import { Row, Col } from "reactstrap";
import { checkAnnonceUser, getAnnonceUser, getRaces, getRegions } from "../../functions";
import FormAnnonceAdd from "./formAnnonceAdd";
import ListAnnonce from "./listAnnonce";

class CheckAnnonce extends React.Component {
  constructor(props) {
    super(props);
    this.user = this.props.user;
    this.userInfos = this.props.userInfos;
    this.userAirtableId = this.props.userAirtableId;

    this.state = {
      annonceUser: false,
      annonceUserList: [],
      isLoaded: false,
      racesList: [],
      regionsList: [],
    };
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  showForm() {
    this.setState({
      annonceUser: false
    });
  }

  hideForm() {
    this.setState({
      annonceUser: true
    });
    getAnnonceUser(this.props.user.email)
      .then((res) => {
        if (res != null) {
          this.setState({ annonceUserList: res});
        }
      })
      .catch((e) => console.error(e));
  }

  removeItem() {
    //console.log("removeItem from parent");
    getAnnonceUser(this.user.email)
      .then((res) => {
        //console.log("res get depuis check", res);
        if (res != null) {
          this.setState({ annonceUserList: res});
          //console.log("statedepuis check", this.state.appartementUserList);
        }
      })
      .catch((e) => console.error(e));
  }

  componentWillMount() {
      const userEmail = this.user.email;
      Promise.all([checkAnnonceUser(userEmail), getRaces(), getRegions()])
      .then((results) => {
        //console.log(results);
        const res = results[0];
        const races = results[1].data.records;
        const regions = results[2].data.records;


        this.setState({
          racesList: this.getRaces(races),
          regionsList: this.getRegions(regions),
        });

        if (res > 0) {
          this.setState({ annonceUser: true });
          //on charge la liste des appartements du user
          getAnnonceUser(userEmail)
            .then((res) => {
              console.log("res get annonce user check", res);
              if (res != null) {
                this.setState({ annonceUserList: res });
              }

              if (results[1].data.offset !== undefined && results[1].data.offset) {
                this.getMoreRaces(results[1].data.offset);
              }
              else {
                this.setState({
                  isLoaded: true,
                });
              }

            })
            .catch((e) => {
              console.error(e)
              this.setState({
                isLoaded: true,
              });
            });
        }
        else {
          if (results[1].data.offset !== undefined && results[1].data.offset) {
            this.getMoreRaces(results[1].data.offset);
          }
          else {
            this.setState({
              isLoaded: true,
            });
          }
        }

      }).catch((e) => {
        console.error(e)
        this.setState({
          isLoaded: true,
        });
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
    let regionsList = [];

    for (const region of regions) {
      regionsList.push({
        value: region.id,
        label: region.fields.Name
      });
    }

    return regionsList;
  }

  getRaces = (races) => {
    let racesList = [];

    for (const race of races) {
      racesList.push({
        value: race.id,
        label: race.fields.Name
      });
    }

    return racesList;
  }

  render() {
    const userEmail = this.props.user.email;
    const {
      annonceUserList,
      userInfos,
      racesList,
      regionsList,
    } = this.state;

    if (this.state.annonceUser === true ) {
      return (
        <Row>
          <Col md="12">
            <ListAnnonce
              showForm={this.showForm}
              user={userEmail}
              annonces={annonceUserList}
              removeItem={this.removeItem}
              hideForm={this.hideForm}
              viewPageAnnonce={this.viewPageAnnonce}
              racesList={racesList}
              regionsList={regionsList}
            />
          </Col>
        </Row>
      );
    } else if (this.state.annonceUser === false) {
      return (
        <Row>
          <Col md="12">
            <FormAnnonceAdd
              user={this.props.user}
              userInfos={userInfos}
              userAirtableId={this.props.userAirtableId }
              racesList={racesList}
              regionsList={regionsList}
              onUpdate={this.hideForm}
              hideForm={this.hideForm}
            />
          </Col>
        </Row>
      );
    }
  }
}

export default CheckAnnonce;
