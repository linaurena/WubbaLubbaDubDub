let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
let API = 'https://rickandmortyapi.com/api/character/';

function fetchData(url, callback) {
  let xhttp = new XMLHttpRequest();

  xhttp.open('GET', url, true);
  
  xhttp.onreadystatechange = (event) => {
    if(xhttp.readyState === 4) {
      if(xhttp.status === 200) {
        callback(null, JSON.parse(xhttp.responseText));
      } else {
        const error = new Error('Error en ' + url);

        return callback(error, null);
      }
    }
  }

  xhttp.send();
}

fetchData(API, (errorCount, dataCount) => {
  if(errorCount) return console.error(errorCount);

  fetchData(API + dataCount.results[0].id, (errorId, dataId) => {
    if(errorId) return console.error(errorId);

    fetchData(dataId.origin.url, (errorUrl, dataUrl) => {
      if(errorUrl) return console.error(errorUrl);

      console.log(dataCount.info.count);
      console.log(dataId.name);
      console.log(dataUrl.dimension);
    });
  });
});