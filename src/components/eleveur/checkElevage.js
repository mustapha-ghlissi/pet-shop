import React from "react";
import { Row, Col } from "reactstrap";
import {getInfoElevage} from "../../functions";
import FormEditElevage from "./formEditElevage";
import FormAddElevage from "./formAddElevage";
import ViewElevageProfil from "./viewElevageProfil";

class CheckElevage extends React.Component {
  constructor(props) {
    super(props);
    this.user = this.props.user;
    this.userInfos = this.props.userInfos;
    this.userAirtableId = this.props.userAirtableId;

    this.state = {
      infoElevageRenseigner:false,
      editForm: false,
      isLoaded:false,
      racesList: [],
    };

    this.viewEditForm = this.viewEditForm.bind(this);
    this.hideEditForm = this.hideEditForm.bind(this);
  }

  viewEditForm() {
    this.setState({
      editForm: true,
      isLoaded:true
    });
  }

  hideEditForm() {
    this.setState({
      editForm: false
    });
    window.location.reload(true);
  }


  componentDidMount() {
    //on check si le user a déjà rentrée des informations d'élevage
    getInfoElevage(this.props.user)
      .then((res) => {
        //console.log("elevage",res.length);
        if(res.length === 0){
          //console.log("pas d'élevage");
          this.setState({
            infoElevageRenseigner:false,
            isLoaded:true
          });
        }else if (res != null) {
          this.setState({
            infoElevageRenseigner:true,
            isLoaded:true
          });
        }
        //console.log("infoElevageRenseigner", this.state.elevageInfo);
      });

  }



  render() {

    //si le user n'a pas renseigné d'elevage on affiche le formulaire d'ajout d'élevage
    if (this.state.infoElevageRenseigner === false && this.state.isLoaded === true) {
      return (
        <Row>
          <Col md="12">
            <FormAddElevage
              user={this.props.user}
              userInfos={this.props.userInfos}
              userAirtableId={this.props.userAirtableId}
              onUpdate={this.hideEditForm}
              hideForm={this.hideEditForm}
            />
          </Col>
        </Row>
      );
    }else if (this.state.isLoaded === true){
      return (
        <Row>
          <Col md="12">
            <ViewElevageProfil
              user={this.props.user}
              userInfos={this.props.userInfos}
              userAirtableId={this.props.userAirtableId}
              onUpdate={this.hideEditForm}
              hideForm={this.hideEditForm}
            />
          </Col>
          {this.state.editForm === true && (
            <FormEditElevage
              user={this.props.user}
              userInfos={this.props.userInfos}
              userAirtableId={this.props.userAirtableId}
              onUpdate={this.hideEditForm}
              hideForm={this.hideEditForm}
            />
          )}
        </Row>
      );
    }else{
    return(
      <></>
    )
    }
  }
}

export default CheckElevage;
