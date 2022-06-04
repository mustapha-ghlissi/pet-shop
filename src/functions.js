import axios from "axios";

import { UPLOAD_URL } from './config/params';

const urlAxiosUser =
  "https://api.airtable.com/v0/appGwVMLkaXyNiFFl/users?api_key=keyOJASKOIpyF1ACT";

  const urlAxiosAnnonce =
  "https://api.airtable.com/v0/appGwVMLkaXyNiFFl/annonce?api_key=keyOJASKOIpyF1ACT";

const urlAxiosElevage =
  "https://api.airtable.com/v0/appGwVMLkaXyNiFFl/elevages?api_key=keyOJASKOIpyF1ACT";

const urlAxiosRegions =
  "https://api.airtable.com/v0/appGwVMLkaXyNiFFl/regions?api_key=keyOJASKOIpyF1ACT";

const urlAxiosChiens =
  "https://api.airtable.com/v0/appGwVMLkaXyNiFFl/chiens?api_key=keyOJASKOIpyF1ACT";

const urlAxiosRaces =
  "https://api.airtable.com/v0/appGwVMLkaXyNiFFl/races?api_key=keyOJASKOIpyF1ACT";

const urlAxiosReservations =
  "https://api.airtable.com/v0/appGwVMLkaXyNiFFl/reservations?api_key=keyOJASKOIpyF1ACT";





// ALL USER FUNTCTIONS
export function checkUserExist(user) {
    return fetch(urlAxiosUser)
      .then((res) => res.json())
      .then((res) => {
        const allUsers = res.records;
        for (var i = 0; i < allUsers.length; i++) {
          if (user === allUsers[i].fields.email) {
            var userExist = 1;
          }
        }

        if (userExist === 1) {
        //ce user existe
          return userExist;
        } else {
            //ce user n'existe pas
            userExist = 0;
          return userExist;
        }
      })
      .catch((error) => console.log(error));
  }

// CREATE USER FUNTCTIONS
export function createUser(user) {
    //console.log("user function",user)

    return axios({
        method: "post",
        url: urlAxiosUser,
        timeout: 1000 * 5, // Wait for 5 seconds
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer keyOJASKOIpyF1ACT"
        },
        data: {
          fields: {
            id_auth0:user.sub,
            id_airtable:user.id_airtable,
            email: user.email,
            nom:user.nom,
            prenom:user.prenom,
            type:user.type,
            date_inscription:user.date_inscription,
            telephone:user.telephone
          }
        }
      })
        .then((response) => {
          return response;
        })
        .catch((err) => {
          return err;
        });
  }




  // GET USER FUNTCTIONS
  export function getUserInfo(user) {
  //console.log("get user Info",user);
    return fetch(urlAxiosUser)
      .then((res) => res.json())
      .then((res) => {
        console.log("alluser function",res)
        const allUsers = res.records;
        for (var i = 0; i < allUsers.length; i++) {
          if (user === allUsers[i].fields.email) {
              return  allUsers[i].fields;
            //Array.prototype.push.apply(userInfos, userNewInfos);
            //console.log("UserInfos function",userInfos)
          }
        }
      })
      .catch((error) => console.log(error));
  }


  //UPDATE USER
  export async function updateUser(idAirtableUserEdit, updateUserTableau) {
    //console.log(updateAppartementTableau);
    //alert(newAppartementTableau.nom);

    try {
      const response = await axios({
        method: "patch",
        url: `https://api.airtable.com/v0/appGwVMLkaXyNiFFl/users/${idAirtableUserEdit}`,
        timeout: 1000 * 5,
        headers : {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer keyOJASKOIpyF1ACT'
          },
        data: {
          fields: {
            nom: updateUserTableau.nom,
            prenom: updateUserTableau.prenom,
            type: updateUserTableau.type,
            telephone: updateUserTableau.telephone,
          }
        }
      });
      return response;
    } catch (err) {
      return err;
    }
  }

// Upload ad photos
export function uploadPhotos(photo_1, photo_2, photo_3, old_photo_1 = null, old_photo_2 = null, old_photo_3 = null) {
  var formData = new FormData();

  formData.append('photo_1', photo_1);
  formData.append('photo_2', photo_2);
  formData.append('photo_3', photo_3);


  if (Array.isArray(old_photo_1)) {
    formData.append('old_photo_1', JSON.stringify(old_photo_1));
  }
  else {
    formData.append('old_photo_1', old_photo_1);
  }

  if (Array.isArray(old_photo_2)) {
    formData.append('old_photo_2', JSON.stringify(old_photo_2));
  }
  else {
    formData.append('old_photo_2', old_photo_2);
  }

  if (Array.isArray(old_photo_3)) {
    formData.append('old_photo_3', JSON.stringify(old_photo_3));
  }
  else {
    formData.append('old_photo_3', old_photo_3);
  }

  return axios.post(UPLOAD_URL, formData);
}



// Create annonce
export function addAnnonce(newAnnonceTableau, emailUser) {
  //alert(newAppartementTableau.nom);
  return axios({
    method: "post",
    url: urlAxiosAnnonce,
    timeout: 1000 * 5, // Wait for 5 seconds
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer keyOJASKOIpyF1ACT"
    },
    data: {
      fields: {
        email_user: emailUser,
        type: newAnnonceTableau.type,
        race: newAnnonceTableau.race,
        regions: newAnnonceTableau.regions,
        naissance_portee: newAnnonceTableau.date_naissance,
        disponibilite_portee: newAnnonceTableau.date_dispo,
        titre: newAnnonceTableau.titre,
        numero_portee_LOF_dossier: newAnnonceTableau.lof_dossier,
        numero_portee_LOF_annee: newAnnonceTableau.lof_annee,
        numero_portee_LOF_numero: newAnnonceTableau.lof_numero,
        numero_mere: newAnnonceTableau.numero_mere,
        numero_pere: newAnnonceTableau.numero_pere,
        nb_males: newAnnonceTableau.nb_male,
        nb_femelle: newAnnonceTableau.nb_femelle,
        chiot_vaccines: newAnnonceTableau.vaccin,
        chiot_puce: newAnnonceTableau.puce,
        description: newAnnonceTableau.description,
        statut: newAnnonceTableau.statut,
        prix_total: newAnnonceTableau.prix,
        prix_accompte: newAnnonceTableau.accompte,
        photo_1: newAnnonceTableau.photo_1,
        photo_2: newAnnonceTableau.photo_2,
        photo_3: newAnnonceTableau.photo_3,
      }
    }
  });
  }

  // Create annonce
export function editAnnonce(idAnnonce, newAnnonceTableau, emailUser) {
  //alert(newAppartementTableau.nom);
  return axios({
    method: "put",
    url: urlAxiosAnnonce,
    timeout: 1000 * 5, // Wait for 5 seconds
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer keyOJASKOIpyF1ACT"
    },
    data: {
      records: [
        {
          id: idAnnonce,
          fields: {
            email_user: emailUser,
            type: newAnnonceTableau.type,
            race: newAnnonceTableau.race,
            regions: newAnnonceTableau.regions,
            naissance_portee: newAnnonceTableau.date_naissance,
            disponibilite_portee: newAnnonceTableau.date_dispo,
            titre: newAnnonceTableau.titre,
            numero_portee_LOF_dossier: newAnnonceTableau.lof_dossier,
            numero_portee_LOF_annee: newAnnonceTableau.lof_annee,
            numero_portee_LOF_numero: newAnnonceTableau.lof_numero,
            numero_mere: newAnnonceTableau.numero_mere,
            numero_pere: newAnnonceTableau.numero_pere,
            nb_males: newAnnonceTableau.nb_male,
            nb_femelle: newAnnonceTableau.nb_femelle,
            chiot_vaccines: newAnnonceTableau.vaccin,
            chiot_puce: newAnnonceTableau.puce,
            description: newAnnonceTableau.description,
            statut: newAnnonceTableau.statut,
            prix_total: newAnnonceTableau.prix,
            prix_accompte: newAnnonceTableau.accompte,
            photo_1: newAnnonceTableau.photo_1,
            photo_2: newAnnonceTableau.photo_2,
            photo_3: newAnnonceTableau.photo_3,
          }
        }
      ]
    }
  });
  }

  //ALL LOCATAIRE FUNCTION
export function checkAnnonceUser(user) {
  const emailUser = user;
  //console.log("email", emailUser);

  return fetch(urlAxiosAnnonce)
    .then((res) => res.json())
    .then((res) => {
      const allAnnonces = res.records;
      //console.log("allAnnonces", res);
      for (var i = 0; i < allAnnonces.length; i++) {
        if (emailUser === allAnnonces[i].fields.email_user) {
          //des annonces existent
          var possedeUneAnnonce = 1;
        }
      }

      if (possedeUneAnnonce >= 1) {
        //console.log("possde", possedeUnLocataire);
        return possedeUneAnnonce;
      } else {
        possedeUneAnnonce = 0;
        return possedeUneAnnonce;
      }
    })
    .catch((error) => console.log(error));
}

export function getAnnonceUser(user) {
  const emailUser = user;
  const annonceUserInfos = [];

  return fetch(urlAxiosAnnonce)
    .then((res) => res.json())
    .then((res) => {
      const allAnnonces = res.records;
      //console.log("ceccile", res);

      for (var i = 0; i < allAnnonces.length; i++) {
        if (emailUser === allAnnonces[i].fields.email_user) {
          var newAnnonceInfos = [
            {
              idAnnonce: allAnnonces[i].fields.id,
              type: allAnnonces[i].fields.type,
              race: allAnnonces[i].fields.race,
              nom_race: allAnnonces[i].fields.name_race,
              regions: allAnnonces[i].fields.regions,
              statut: allAnnonces[i].fields.statut,
              lof_dossier: allAnnonces[i].fields.numero_portee_LOF_dossier,
              lof_annee: allAnnonces[i].fields.numero_portee_LOF_annee,
              lof_numero: allAnnonces[i].fields.numero_portee_LOF_numero,
              numero_mere: allAnnonces[i].fields.numero_mere,
              numero_pere: allAnnonces[i].fields.numero_pere,
              date_naissance: allAnnonces[i].fields.naissance_portee,
              date_dispo: allAnnonces[i].fields.disponibilite_portee,
              nb_male: allAnnonces[i].fields.nb_males,
              nb_femelle: allAnnonces[i].fields.nb_femelle,
              vaccin: allAnnonces[i].fields.chiot_vaccines,
              puce: allAnnonces[i].fields.chiot_puce,
              sterilisation: allAnnonces[i].fields.chiot_sterilise,
              titre: allAnnonces[i].fields.titre,
              description: allAnnonces[i].fields.description,
              photo1: allAnnonces[i].fields.photo_1,
              photo2: allAnnonces[i].fields.photo_2,
              photo3: allAnnonces[i].fields.photo_3,
              prix: allAnnonces[i].fields.prix_total,
              accompte: allAnnonces[i].fields.prix_accompte
            }
          ];
          Array.prototype.push.apply(annonceUserInfos, newAnnonceInfos);
        }
      }
      return annonceUserInfos;
    })
    .catch((error) => console.log(error));
}

export function deleteAnnonce(id) {
  //console.log("id delete",id);
  return axios({
    method: "delete",
    url: `https://api.airtable.com/v0/appGwVMLkaXyNiFFl/annonce/${id}`,
    headers: {
      Authorization: "Bearer keyOJASKOIpyF1ACT",
      "Content-Type": "application/json"
    }
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}


// GET ALL ANNONCES FUNTCTIONS
export function allAnnonces(filterByFormula = null) {
  return axios({
    method: "get",
    url: !filterByFormula ? urlAxiosAnnonce : urlAxiosAnnonce + '&' + filterByFormula,
    timeout: 1000 * 5, // Wait for 5 seconds
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer keyOJASKOIpyF1ACT"
    }
  });
}

export function getThisAnnonce(id) {
  //console.log("id delete",id);
  return axios({
    method: "get",
    url: `https://api.airtable.com/v0/appGwVMLkaXyNiFFl/annonce/${id}`,
    headers: {
      Authorization: "Bearer keyOJASKOIpyF1ACT",
      "Content-Type": "application/json"
    }
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}



//GET INFO ELEVAGE
export function getInfoElevage(user) {
  const emailUser = user.email;
  const elevageUserInfos = [];

  return fetch(urlAxiosElevage)
    .then((res) => res.json())
    .then((res) => {
      const allElevages = res.records;
      //console.log("allElevages ceccile", res);

      for (var i = 0; i < allElevages.length; i++) {
        if (emailUser === allElevages[i].fields.email) {
          var newElevageInfos = [
            {
              nom_elevage:allElevages[i].fields.nom_elevage,
              adresse:allElevages[i].fields.adresse,
              cp:allElevages[i].fields.code_postal,
              ville:allElevages[i].fields.ville,
              region:allElevages[i].fields.region,
              siret:allElevages[i].fields.siret,
              description:allElevages[i].fields.description,
              facebook:allElevages[i].fields.facebook,
              airtable_id_elevage:allElevages[i].id,
              statut:allElevages[i].fields.statut,
              url_elevage:allElevages[i].fields.url_elevage,
            }
          ];
          Array.prototype.push.apply(elevageUserInfos, newElevageInfos);
        }
      }
      return elevageUserInfos;
    })
    .catch((error) => console.log(error));
}
//GET INFO ELEVAGE
export function getInfoThisElevage(url) {
  const elevageInfos = [];

  return fetch(urlAxiosElevage)
    .then((res) => res.json())
    .then((res) => {
      const allElevages = res.records;
      //console.log("allElevages ceccile", res);
      for (var i = 0; i < allElevages.length; i++) {
        if (url === allElevages[i].fields.url_elevage) {
          //console.log("allElevages[i].fields",allElevages[i].fields);
          return allElevages[i].fields;
        }
      }
      return elevageInfos;
    })
    .catch((error) => console.log(error));
}



// GET ALL ANNONCES FUNTCTIONS
export function getAllElevage(filterByFormula = null) {
  return axios({
    method: "get",
    url: !filterByFormula ? urlAxiosElevage :  + '&' + filterByFormula,
    timeout: 1000 * 5, // Wait for 5 seconds
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer keyOJASKOIpyF1ACT"
    }
  });
}


//UPDATE USER
export async function updateInfoElevage(updateElevageTableau,idElevageAModifier) {
  //console.log(updateAppartementTableau);
  //alert(newAppartementTableau.nom);

  try {
    const response = await axios({
      method: "patch",
      url: `https://api.airtable.com/v0/appGwVMLkaXyNiFFl/elevages/${idElevageAModifier}`,
      timeout: 1000 * 5,
      headers : {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer keyOJASKOIpyF1ACT'
      },
      data: {
        fields: {
          nom_elevage: updateElevageTableau.nom_elevage,
          adresse: updateElevageTableau.adresse,
          code_postal: updateElevageTableau.cp,
          ville: updateElevageTableau.ville,
          siret: updateElevageTableau.siret,
          description: updateElevageTableau.description,
          facebook: updateElevageTableau.facebook,
        }
      }
    });
    return response;
  } catch (err) {
    return err;
  }
}



export function addElevage(updateUserElevageTableau) {

  return axios({
    method: "post",
    url: urlAxiosElevage,
    timeout: 1000 * 5, // Wait for 5 seconds
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer keyOJASKOIpyF1ACT"
    },
    data: {
      fields: {
        email: updateUserElevageTableau.email,
        nom_elevage: updateUserElevageTableau.nom_elevage,
        adresse: updateUserElevageTableau.adresse,
        code_postal: updateUserElevageTableau.cp,
        ville: updateUserElevageTableau.ville,
        siret: updateUserElevageTableau.siret,
        description: updateUserElevageTableau.description,
        facebook: updateUserElevageTableau.facebook,
        statut:"En modération",
        //nom_region: updateUserElevageTableau.region,
      }
    }
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
}


//GET INFO ELEVAGE
export function getInfoChien(user) {
  const emailUser = user.email;
  const chiensUserInfos = [];

  return fetch(urlAxiosChiens)
    .then((res) => res.json())
    .then((res) => {
      const allChiens = res.records;
      //console.log("allElevages ceccile", res);

      for (var i = 0; i < allChiens.length; i++) {
        if (emailUser === allChiens[i].fields.email_user) {
          var newChienInfos = [
            {
              id_chien:allChiens[i].id,
              nom_chien:allChiens[i].fields.nom,
              race:allChiens[i].fields.race,
              type:allChiens[i].fields.type,
              couleurs:allChiens[i].fields.couleurs,
              puce:allChiens[i].fields.puce,
              lof:allChiens[i].fields.lof,
              tares:allChiens[i].fields.tares,
              origine:allChiens[i].fields.numero_origine,
              date_naissance:allChiens[i].fields.date_naissance,
            }
          ];
          Array.prototype.push.apply(chiensUserInfos, newChienInfos);
        }
      }
      return chiensUserInfos;
    })
    .catch((error) => console.log(error));
}


//ADD CHIENS
export function addChiens(newChienTableau,emailUser) {
  return axios({
    method: "post",
    url: urlAxiosChiens,
    timeout: 1000 * 5, // Wait for 5 seconds
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer keyOJASKOIpyF1ACT"
    },
    data: {
      fields: {
        nom: newChienTableau.nom,
        email_user: emailUser,
        couleurs: newChienTableau.couleurs,
        puce: newChienTableau.puce,
        tares: newChienTableau.tares,
        date_naissance:newChienTableau.date,
        type:newChienTableau.type,
        lof:newChienTableau.lof,
        numero_origine:newChienTableau.origine
      }
    }
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
}



export function getThisChien(id) {
  //console.log("id delete",id);
  return axios({
    method: "get",
    url: `https://api.airtable.com/v0/appGwVMLkaXyNiFFl/chiens/${id}`,
    headers: {
      Authorization: "Bearer keyOJASKOIpyF1ACT",
      "Content-Type": "application/json"
    }
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export function deleteChien(id) {
  //console.log("id delete",id);
  return axios({
    method: "delete",
    url: `https://api.airtable.com/v0/appGwVMLkaXyNiFFl/chiens/${id}`,
    headers: {
      Authorization: "Bearer keyOJASKOIpyF1ACT",
      "Content-Type": "application/json"
    }
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

//UPDATE USER
export async function updateInfoChien(updateChienTableau,idChienAModifier) {
  //console.log(updateAppartementTableau);
  //alert(newAppartementTableau.nom);

  try {
    const response = await axios({
      method: "patch",
      url: `https://api.airtable.com/v0/appGwVMLkaXyNiFFl/chiens/${idChienAModifier}`,
      timeout: 1000 * 5,
      headers : {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer keyOJASKOIpyF1ACT'
      },
      data: {
        fields: {
          nom: updateChienTableau.nom,
          couleurs: updateChienTableau.couleurs,
          puce: updateChienTableau.puce,
          tares: updateChienTableau.tares,
          date_naissance:updateChienTableau.date,
          type:updateChienTableau.type,
          lof:updateChienTableau.lof,
          numero_origine:updateChienTableau.origine
        }
      }
    });
    return response;
  } catch (err) {
    return err;
  }
}

// Retrieve List of reces
export function getRaces(offset = null, sortBy = 'Name') {

  let sort = "sort[0][field]=" + sortBy + "&sort[0][direction]=asc";

  if (offset) {
    sort += `&offset=${offset}`;
  }

  sort = encodeURI(sort);

  return axios({
    method: "get",
    url: urlAxiosRaces + '&' + sort,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer keyOJASKOIpyF1ACT"
    }
  });
}

// GET ALL getRegions FUNTCTIONS
export function getRegions(sortBy = 'Name') {

  let sort = "sort[0][field]=" + sortBy + "&sort[0][direction]=asc";

  sort = encodeURI(sort);

  return axios({
    method: "get",
    url: urlAxiosRegions + '&' + sort,
    timeout: 1000 * 5, // Wait for 5 seconds
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer keyOJASKOIpyF1ACT"
    }
  });
}

//GET INFO REGIONS
export function getRegions2() {
  const AllRegions = [];

  return fetch(urlAxiosRegions)
    .then((res) => res.json())
    .then((res) => {
      const regions = res.records;
      //console.log("all regions ceccile", res);

      for (var i = 0; i < regions.length; i++) {
          var newRegionInfos = [
            {
              value:regions[i].fields.Name,
              label:regions[i].fields.Name,
            }
          ];
          Array.prototype.push.apply(AllRegions, newRegionInfos);

      }
      return AllRegions;
    })
    .catch((error) => console.log(error));
}

//ADD CHIENS
export function newReservation(newMessageTableau) {
  return axios({
    method: "post",
    url: urlAxiosReservations,
    timeout: 1000 * 5, // Wait for 5 seconds
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer keyOJASKOIpyF1ACT"
    },
    data: {
      fields: {
        id_annonce: newMessageTableau.idAnnonce,
        email_acheteur: newMessageTableau.email,
        nom: newMessageTableau.nom,
        telephone: newMessageTableau.telephone,
        reponse_habitation: newMessageTableau.habitation,
        reponse_enfant: newMessageTableau.enfant,
        reponse_animaux: newMessageTableau.animaux,
        message: newMessageTableau.message,

      }
    }
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
}

