import React from "react";
import { Route, Switch } from "react-router-dom";

import { NavBar, Footer, Loading } from "./components";
import { Home, Profile,Eleveurs,EleveursListe,Annonces,PageAnnonce,Messagerie,PageEleveur } from "./views";
import { withAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./auth/protected-route";

import "./app.css";

class App extends React.Component {
  render() {
    const { isLoading } = this.props.auth0;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <div id="app" className="">
        <NavBar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/eleveurs" exact component={Eleveurs} />
              <Route path="/recherche-chien-de-race" exact component={Annonces} />
              <Route path="/eleveurs-chien-de-race" exact component={EleveursListe} />
              <Route path="/chiot-de-race-a-vendre/:id"  component={PageAnnonce}/>
              <Route path="/eleveur-chien-de-race/:url"  component={PageEleveur}/>
              <ProtectedRoute path="/profile" component={Profile} />
              <ProtectedRoute path="/messagerie" component={Messagerie} />
            </Switch>
        <Footer />
      </div>
    );
  }
}

export default withAuth0(App);
