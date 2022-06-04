import React, { Fragment } from "react";

import { withAuth0 } from "@auth0/auth0-react";
import { AnnoncesContent } from "../components";

class Annonces extends React.Component {
  render() {
    const { user } = this.props.auth0;
    //console.log("user id auth",user.sub);

    return (
      <Fragment>
        <AnnoncesContent user={user}/>
      </Fragment>

    );
  }
}

export default withAuth0(Annonces);
