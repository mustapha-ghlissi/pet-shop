import React from "react";
import HeaderEleveur from "./HeaderEleveur";
import HiwEleveur from "./HiwEleveurs";
import FeaturedKeys from "./FeaturedKeys";

class HomeEleveursContent extends React.Component {
  render() {
    return (
      <>
       <HeaderEleveur />
       <HiwEleveur/>
       <FeaturedKeys />
      </>
    );
  }
}

export default HomeEleveursContent;
