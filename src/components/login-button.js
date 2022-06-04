// src/components/login-button.js

import React from "react";
import { withAuth0 } from "@auth0/auth0-react";

class LoginButton extends React.Component {
  render() {

    return (
      <>
        {/* <ButtonWhite
      size="md"
      onClick={() => loginWithRedirect({ui_locales: 'fr'})}
      >
                 Inscription / Connexion
               </ButtonWhite>*/}
               </>

    );
  }
}

export default withAuth0(LoginButton);
