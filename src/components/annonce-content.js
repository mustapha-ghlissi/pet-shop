import React from 'react';
import { useParams } from "react-router";

import PageAnnonce from './annonce/page-annonce';

function GetIdAnnonce() {

  const { id } = useParams();
  //console.log(id);

  return (
    <div>
      <PageAnnonce annonceId={id} />
    </div>
  );
}

export default GetIdAnnonce;
