import React  from "react";
import PageEleveur from "./eleveur/page-eleveur";
import { useParams} from "react-router";

function GetUrlElevage() {

  const { url } = useParams();


  return (
    <div>
      <PageEleveur urlEleveur={url}  />
    </div>
  );
}

export default GetUrlElevage;
