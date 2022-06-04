import React, { Fragment } from "react";

import { withAuth0 } from "@auth0/auth0-react";
import { ProfilContent } from "../components";

class Profile extends React.Component {
  render() {
    const { user } = this.props.auth0;
    //console.log("user id auth",user.sub);

    return (
      <Fragment>
        <ProfilContent user={user}/>
      </Fragment>
      
    );
  }
}

export default withAuth0(Profile);
