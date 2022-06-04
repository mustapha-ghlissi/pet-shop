import React from "react";
import HeaderHome from "./HeaderHome";
import Hiw from "./Hiw";
import Race from "./Race";
import FeaturedKeys from "./FeaturedKeys";
import DernieresAnnonces from "./DernieresAnnonces";

class HomeContent extends React.Component {
  render() {
    return (
      <>
        <HeaderHome />
        <Race/>
        <DernieresAnnonces/>
        <Hiw />
        <FeaturedKeys/>
      </>
    );
  }
}

export default HomeContent;
