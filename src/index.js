import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import DinoIpsumGenerator from './js/dinoIpsumGenerator.js';

function getDino() {
  let promise = new Promise(function (resolve, reject) {
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
  promise.then(function (response) {
    printDinos(response);
    callCompareUserInput(response);
  }, function (errorMEssage) {
    printError(errorMEssage);
  });
}

function printDinos(response) {
  console.log(response[0][0].split(''));
  let ul = document.getElementById('response');
  let i = 0;

  let responseArr = response[0].toString().split('');
  for (let x = 0; x < responseArr.length; x++) {
    let pEl = document.createElement('p');
    let pEl2 = document.createElement('p');
    pEl.innerText = `_`;
    pEl2.innerText = ' ';
    pEl.setAttribute("id", `${i}`);
    // pEl.setAttribute("class", "hidden");
    ul.append(pEl);
    ul.append(pEl2);
    i++;
  }
  return (response[0].toString().split(''));
}

function printError(error) {
  console.log(error);
}

function callCompareUserInput(x) {
  document.getElementById('userInputForm').addEventListener("submit", function (e) {
    e.preventDefault();
    compareUserInput(x);
  });
}

function compareUserInput(response) {
  let userInput = document.getElementById("text").value;
  let i = 0;
  let thisResponse = response.toString().split('');
  console.log(userInput);
  thisResponse.forEach(element => {
    if (element.toUpperCase() === userInput.toUpperCase()) {
      console.log(i)
      console.log('hi')
      document.getElementById(`${i}`).innerText = element;
    }
    i++;
  });
}

window.onload = function () {
  getDino();
  // let button = document.getElementById("submit");
  // button.onclick = function() {
  //   compareUserInput();
  // }
}
