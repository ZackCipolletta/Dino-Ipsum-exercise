import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import DinoIpsumGenerator from './js/dinoIpsumGenerator.js';

function getDino() {
  let promise = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    const url = `https://dinoipsum.com/api/?format=json&paragraphs=1&words=1`;
    request.addEventListener("loadend", function () {
      const response = JSON.parse(this.responseText);
      if (this.status === 200) {
        resolve(response);
      } else {
        reject([this, response])
      }
    });
    request.open("GET", url, true);
    request.send();
  });
  promise.then(function(response) {
    printDinos(response);
  }, function(errorMEssage) {
    printError(errorMEssage);
  });
}

function printDinos(response) {
  console.log(response[0].toString().split(''));
  let ul = document.getElementById('response');
  let i = 0;

  let responseArr = response[0].toString().split('');
  responseArr.forEach(element => {
    let pEl = document.createElement('p');
    pEl.innerText = element;
    pEl.setAttribute("id", `${i}`)
    pEl.setAttribute("class", "hidden")
    ul.append(pEl);
    i++
  });
  return (response[0].toString().split(''));
}

function printError(error) {
  console.log(error);
}

function compareUserInput(response) {
  let userInput = document.getElementById("text");
  let i = 0;
  console.log(response)
  response.forEach(element => {
    i++
    if(element.toUpperCase() === userInput.toUpperCase()) {
      document.getElementById(`${i}`).removeAttribute("class")
    }
  })

  }

window.onload = function() {
  getDino();
  let button = document.getElementById("submit");
  button.onclick = function() {
    compareUserInput();
  }
}
