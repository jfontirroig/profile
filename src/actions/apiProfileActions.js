import axios from 'axios';

export async function apiProfileProfile(username) {
  var config = {
    method: 'get',
    url: `https://domains.paradigma.global/api-profile/.well-known/profile/${username}`,
    headers: {}
  };
  let respuesta = ''
  await axios(config)
  .then(function (response) {
    console.log(response.data)
    respuesta = JSON.stringify(response.data)
  })
  .catch(function (error) {
    console.log(error);
    respuesta = JSON.stringify({error:error})
  });
  return respuesta
}

export async function apiProfileDidWeb(username,stxaddress) {
  var config = {
    method: 'get',
    url: `https://domains.paradigma.global/api-profile/.well-known/did.json/${username},${stxaddress}`,
    headers: {}
  };
  let respuesta = ''
  await axios(config)
  .then(function (response) {
    console.log(response.data)
    respuesta = JSON.stringify(response.data)
  })
  .catch(function (error) {
    console.log(error);
    respuesta = JSON.stringify({error:error})
  });
  return respuesta
}
