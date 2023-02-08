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

  let responseArr = response[0][0].split('');
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
    let userInput = document.getElementById("dinoName").value;
    if (userInput.length <= 1) {
      compareUserInput(x);
    } else {
      compareWholeName(x);
    }
  });
}

function compareWholeName(response) {
  let userInput = document.getElementById("dinoName").value;
  let thisResponseName = response[0][0].toString();
  console.log(thisResponseName);
  console.log(userInput);
  if (userInput.toUpperCase() === thisResponseName.toUpperCase()) {
    document.getElementById('response').innerText = `The dino name is: ${response}. You Win!`;
  }
  document.getElementById('userInputForm').reset();
}

function compareUserInput(response) {
  let userInput = document.getElementById("text").value;
  let usedLetters = document.getElementById('response2');
  let i = 0;
  let thisResponse = response.toString().split('');
  console.log(userInput);
  thisResponse.forEach(element => {
    if (element.toUpperCase() === userInput.toUpperCase()) {
      document.getElementById(`${i}`).innerText = element;
    }
    i++;
  });
  if (Array.from(usedLetters.innerText).includes(userInput)) {
    console.log('try again');
  } else {
    usedLetters.innerText += userInput;
    let x = usedLetters.innerText.split('').sort();
    console.log(x);
    document.getElementById('response2').innerText = x.join("  ");
  }
  // usedLetters.innerText += userInput;
  document.getElementById('userInputForm').reset();
}

window.onload = function () {
  getDino();
}
