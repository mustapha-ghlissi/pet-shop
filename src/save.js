import {CardBody, CardImg, CardTitle, Col, Container, ListGroup, ListGroupItem, Row} from "reactstrap";
import {Note} from "./components/eleveurs-liste-content";
import {ButtonPrimary} from "./styles/Buttons";
import React from "react";

{/*getInfoThisElevage(this.props.urlEleveur)
    .then((res) => {
      console.log("res", res);
      const result = res[0].fields;
      const chiens = res.fields.chiens;
      const {eleveurInfo} = this.state;
    eleveurInfo.push({ result});
    this.setState(eleveurInfo);

    const {chiensInfo} = this.state;
    chiensInfo.push({chiens});
    this.setState(chiensInfo);
    })
    .catch((e) => console.error(e));
    console.log("eleveurInfo", this.state.eleveurInfo);
    console.log("chiensInfo", this.state.chiensInfo);*/}


<Container>
  <Row>
    <Col md={"12"}>
      <ImgSecondaire>
        <img src="https://picsum.photos/200/300" alt={""}/>
      </ImgSecondaire>
    </Col>
  </Row>
  <Row>
    <Col md={"9"}>
      <h1>{eleveur.result.fields.nom_elevage}</h1>

      <div className={"d-flex flex-row"}>
        <FontAwesomeIcon icon={faMapMarkerAlt} className={"mr-1"}  />
        {eleveur.result.fields.ville}

        {/*{" • "}
                <Note>
                  <FontAwesomeIcon icon={faStar}  />
                  <FontAwesomeIcon icon={faStar}  />
                  <FontAwesomeIcon icon={faStar}  />
                  <FontAwesomeIcon icon={faStar}  />
                  <FontAwesomeIcon icon={faStarHalfAlt}  />
                  <span>(4)</span>
                </Note>
                */}
      </div>

      <hr className="mt-3 mb-3"/>
      <h5>Race(s) elevées</h5>

      <ListGroupCheck horizontal>
        <ListGroupItem>
          <FontAwesomeIcon icon={faDog} className={"mr-2"}  /> Race
        </ListGroupItem>
      </ListGroupCheck>

      <hr className="mt-3 mb-3"/>

      <BlocDescription>
        <h4 className={"title"}>Présentation</h4>

        <p>
          {eleveur.result.fields.description}
        </p>
      </BlocDescription>

      <hr className="mt-3 mb-3"/>

      <h4 className={"title"}>Chiens</h4>
      <Row>
        <BlocChien>
          <CardImg src="https://www.wikichien.fr/wp-content/uploads/sites/4/603900e310549-1024x768.jpeg"/>
          <CardBody>
            <CardTitle><b>Nom du chien</b></CardTitle>
            <ListGroup>
              <ListGroupItem className={"d-flex justify-content-between"}>
                <span>Race</span>
                <span><b>Basenji</b></span>
              </ListGroupItem>
              <ListGroupItem className={"d-flex justify-content-between"}>
                <span>LOF</span>
                <span><b>8768768765</b></span>
              </ListGroupItem>
              <ListGroupItem className={"d-flex justify-content-between"}>
                <span>Couleurs</span>
                <span><b>Noir</b></span>
              </ListGroupItem>
              <ListGroupItem className={"d-flex justify-content-between"}>
                <span>Sexe</span>
                <span><b>Male</b></span>
              </ListGroupItem>
            </ListGroup>
          </CardBody>
        </BlocChien>
        <BlocChien>
          <CardImg src="https://www.wikichien.fr/wp-content/uploads/sites/4/603900e310549-1024x768.jpeg"/>
          <CardBody>
            <CardTitle><b>Nom du chien</b></CardTitle>
            <ListGroup>
              <ListGroupItem className={"d-flex justify-content-between"}>
                <span>Race</span>
                <span><b>Basenji</b></span>
              </ListGroupItem>
              <ListGroupItem className={"d-flex justify-content-between"}>
                <span>LOF</span>
                <span><b>8768768765</b></span>
              </ListGroupItem>
              <ListGroupItem className={"d-flex justify-content-between"}>
                <span>Couleurs</span>
                <span><b>Noir</b></span>
              </ListGroupItem>
              <ListGroupItem className={"d-flex justify-content-between"}>
                <span>Sexe</span>
                <span><b>Male</b></span>
              </ListGroupItem>
            </ListGroup>
          </CardBody>
        </BlocChien>
        <BlocChien>
          <CardImg src="https://www.wikichien.fr/wp-content/uploads/sites/4/603900e310549-1024x768.jpeg"/>
          <CardBody>
            <CardTitle><b>Nom du chien</b></CardTitle>
            <ListGroup>
              <ListGroupItem className={"d-flex justify-content-between"}>
                <span>Race</span>
                <span><b>Basenji</b></span>
              </ListGroupItem>
              <ListGroupItem className={"d-flex justify-content-between"}>
                <span>LOF</span>
                <span><b>8768768765</b></span>
              </ListGroupItem>
              <ListGroupItem className={"d-flex justify-content-between"}>
                <span>Couleurs</span>
                <span><b>Noir</b></span>
              </ListGroupItem>
              <ListGroupItem className={"d-flex justify-content-between"}>
                <span>Sexe</span>
                <span><b>Male</b></span>
              </ListGroupItem>
            </ListGroup>
          </CardBody>
        </BlocChien>
        <BlocChien>
          <CardImg src="https://www.wikichien.fr/wp-content/uploads/sites/4/603900e310549-1024x768.jpeg"/>
          <CardBody>
            <CardTitle><b>Nom du chien</b></CardTitle>
            <ListGroup>
              <ListGroupItem className={"d-flex justify-content-between"}>
                <span>Race</span>
                <span><b>Basenji</b></span>
              </ListGroupItem>
              <ListGroupItem className={"d-flex justify-content-between"}>
                <span>LOF</span>
                <span><b>8768768765</b></span>
              </ListGroupItem>
              <ListGroupItem className={"d-flex justify-content-between"}>
                <span>Couleurs</span>
                <span><b>Noir</b></span>
              </ListGroupItem>
              <ListGroupItem className={"d-flex justify-content-between"}>
                <span>Sexe</span>
                <span><b>Male</b></span>
              </ListGroupItem>
            </ListGroup>
          </CardBody>
        </BlocChien>
      </Row>

      <hr className="mt-3 mb-3"/>

      <h4 className={"title"}>Evaluations</h4>

      <div className={"d-flex flex-row justify-content-between"}>
        <h5>23 commentaires</h5>
        <Note>
          <FontAwesomeIcon icon={faStar}  />
          <FontAwesomeIcon icon={faStar}  />
          <FontAwesomeIcon icon={faStar}  />
          <FontAwesomeIcon icon={faStar}  />
          <FontAwesomeIcon icon={faStarHalfAlt}  />
          <span>4.5/5</span>
        </Note>
      </div>

      <Comment>
        <Row>
          <Col md={6} align={"left"}>
            <h6>
              <b>Cécile Chelim</b><br/>
              <small>Octobre 2021</small>
            </h6>
          </Col>
          <Col md={6} align={"right"}>
            <Note>
              <FontAwesomeIcon icon={faStar}  />
              <FontAwesomeIcon icon={faStar}  />
              <FontAwesomeIcon icon={faStar}  />
            </Note>
          </Col>
          <Col md={12}>
            <p>
              Nous avons passé une excellente journée en compagnie de Pierre qui a vraiment été un skipper en or ! Baignade dans une mer magnifique et ballade parfaite sous le soleil marseillais je vous le recommande sans hésiter
            </p>
          </Col>
        </Row>
      </Comment>
      <Comment>
        <Row>
          <Col md={6} align={"left"}>
            <h6>
              <b>Cécile Chelim</b><br/>
              <small>Octobre 2021</small>
            </h6>
          </Col>
          <Col md={6} align={"right"}>
            <Note>
              <FontAwesomeIcon icon={faStar}  />
              <FontAwesomeIcon icon={faStar}  />
              <FontAwesomeIcon icon={faStar}  />
            </Note>
          </Col>
          <Col md={12}>
            <p>
              Nous avons passé une excellente journée en compagnie de Pierre qui a vraiment été un skipper en or ! Baignade dans une mer magnifique et ballade parfaite sous le soleil marseillais je vous le recommande sans hésiter
            </p>
          </Col>
        </Row>
      </Comment>
      <Comment>
        <Row>
          <Col md={6} align={"left"}>
            <h6>
              <b>Cécile Chelim</b><br/>
              <small>Octobre 2021</small>
            </h6>
          </Col>
          <Col md={6} align={"right"}>
            <Note>
              <FontAwesomeIcon icon={faStar}  />
              <FontAwesomeIcon icon={faStar}  />
              <FontAwesomeIcon icon={faStar}  />
            </Note>
          </Col>
          <Col md={12}>
            <p>
              Nous avons passé une excellente journée en compagnie de Pierre qui a vraiment été un skipper en or ! Baignade dans une mer magnifique et ballade parfaite sous le soleil marseillais je vous le recommande sans hésiter
            </p>
          </Col>
        </Row>
      </Comment>

      <hr className="mt-3 mb-3"/>

      <h4 className={"title"}>Annonces en ligne</h4>

      <p>Liste des annonces</p>

    </Col>

    <Col md={"3"}>
      <CardForm>

        <CardBody>
          <ListGroup>
            <ListGroupItem>
              <p>
                <b>Adresse</b><br/>
                {eleveur.result.fields.adresse}<br/>
                {eleveur.result.fields.code_postal}<br/>
                {eleveur.result.fields.ville}
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <p>
                <b>SIRET</b><br/>
                {eleveur.result.fields.siret}
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <p>
                <b>Site web</b><br/>
                <a href={"http://www.test.fr"} target="blank">{eleveur.result.fields.site}</a>
              </p>
            </ListGroupItem>
          </ListGroup>
          <hr/>
          <BlocAction>
            <ButtonPrimary block>
              Envoyer un message
            </ButtonPrimary>
          </BlocAction>
        </CardBody>
      </CardForm>
    </Col>
  </Row>
</Container>


{chiensId.length > 0 && (
  <p>
    possède {chiensId.length} chien
  </p>
)}


{/* getAllElevage()
      .then((res) => {
        this.setState({
          eleveursList: res.data.records,
          isLoaded:true
        });
        console.log("elevage",this.state.eleveursList);
      })
      .catch((e) => {
        console.error(e)
      });*/}

