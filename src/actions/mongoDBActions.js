import axios from 'axios';

export async function putFileDB(usernameX,filenameX,moduleappX,dataobjectX, optionsX) {
  var config = {
    method: 'post',
    url: `https://domains.paradigma.global/api/readbyfilename`,
    headers: {'Content-Type': 'application/json'},
    data: {username: usernameX, filename: filenameX}
  };
  let respuesta = ''
  await axios(config)
  .then(function (response) {
    if (response.data.data !== null) {
        var config2 = {
          method: 'post',
          url: `https://domains.paradigma.global/api/modify`,
          headers: {'Content-Type': 'application/json'},
          data: {id: response.data.data._id, username: usernameX, filename: filenameX, moduleapp: moduleappX, dataobject:dataobjectX, options: optionsX}
        };
        axios(config2)
        .then(function (response2) {
          respuesta = JSON.stringify(response2.data)
        })
        .catch(function (error) {
          console.log(error)
          respuesta = JSON.stringify({success: false, message: error, code: 2, data: null})
        });
    }else{
        var config3 = {
          method: 'post',
          url: `https://domains.paradigma.global/api/save`,
          headers: {'Content-Type': 'application/json'},
          data: {username: usernameX, filename: filenameX, moduleapp: moduleappX, dataobject:dataobjectX, options: optionsX}
        };
        axios(config3)
        .then(function (response3) {
          respuesta = JSON.stringify(response3.data)
        })
        .catch(function (error) {
          console.log(error)
          respuesta = JSON.stringify({success: false, message: error, code: 2, data: null})
        });
    }
  })
  .catch(function (error) {
    var config3 = {
      method: 'post',
      url: `https://domains.paradigma.global/api/save`,
      headers: {'Content-Type': 'application/json'},
      data: {username: usernameX, filename: filenameX, moduleapp: moduleappX, dataobject:dataobjectX, options: optionsX}
    };
    axios(config3)
    .then(function (response3) {
      respuesta = JSON.stringify(response3.data)
    })
    .catch(function (error) {
      console.log(error)
      respuesta = JSON.stringify({success: false, message: error, code: 2, data: null})
    });
  });
  return respuesta
}

export async function getFileDB(usernameX,filenameX) {
  var config = {
    method: 'post',
    url: `https://domains.paradigma.global/api/readbyfilename`,
    headers: {'Content-Type': 'application/json'},
    data: {username: usernameX, filename: filenameX}
  };
  let respuesta = ''
  await axios(config)
  .then(function (response) {
    respuesta = JSON.stringify(response.data)
  })
  .catch(function (error) {
    respuesta = JSON.stringify({success: false, message: error, code: 2, data: null})
  });
  return respuesta
}

export async function deleteFileDB(usernameX,filenameX) {
  var config = {
    method: 'post',
    url: `https://domains.paradigma.global/api/remove`,
    headers: {'Content-Type': 'application/json'},
    data: {username: usernameX, filename: filenameX}
  };
  let respuesta = ''
  await axios(config)
  .then(function (response) {
    respuesta = JSON.stringify(response.data)
  })
  .catch(function (error) {
    respuesta = JSON.stringify({success: false, message: error, code: 2, data: null})
  });
  return respuesta
}
