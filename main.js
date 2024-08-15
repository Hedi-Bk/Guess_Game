//Setting game Name

let gameName = "Guess The Word ";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Created By ~Hedi~ `;

//Setting game Options
let numberOfTries = 5;
let numberOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;

//Manage Word
let wordToGuess = "";
const words = ["123456", "mohame", "allaho"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
console.log(wordToGuess);
let messageErea = document.querySelector(".message");

//Manage Hints
document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click", getHint);

function generateInput() {
  const inputContainer = document.querySelector(".inputs");
  //Create Main Tyr Div
  for (let i = 1; i <= numberOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i} </span>`;

    if (i !== 1) tryDiv.classList.add("disabled-inputs");
    //Create Main Tyr Div
    for (let j = 1; j <= numberOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `Guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", 1);
      tryDiv.appendChild(input);
    }
    inputContainer.appendChild(tryDiv);
  }
  //Focus On First Input In First Tyr Element
  inputContainer.children[0].children[1].focus();
  //Disable All Inputs Except First One
  let inputsInDisabledDiv = document.querySelectorAll(".disabled-inputs input");
  inputsInDisabledDiv.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");
  //Convvert Inputs To Uppercase
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextInput = inputs[index + 1];
      //Check If There Is Next Input
      if (nextInput) nextInput.focus();
    });
    input.addEventListener("keydown", function (event) {
      const indexeMyIpnut = Array.from(inputs).indexOf(event.target); //this
      if (event.key === "ArrowRight" && Array.from(inputs)[indexeMyIpnut + 1]) {
        Array.from(inputs)[indexeMyIpnut + 1].focus();
      }
      if (event.key === "ArrowLeft" && indexeMyIpnut - 1 >= 0) {
        Array.from(inputs)[indexeMyIpnut - 1].focus();
      }
      if (event.key === "Enter") {
        guessButton.click();
      }
    });
  });
}

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);

function handleGuesses() {
  let successGuess = true;
  for (let i = 1; i <= numberOfLetters; i++) {
    let inputField = document.querySelector(`#Guess-${currentTry}-letter-${i}`);
    //console.log(inputField);
    let letter = inputField.value.toLowerCase();
    let actualLetter = wordToGuess[i - 1];

    if (actualLetter === letter) {
      inputField.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter != "") {
      successGuess = false;
      inputField.classList.add("not-in-place");
    } else {
      inputField.classList.add("no");
      successGuess = false;
    }
  }
  //Check If User Win Or Lose
  if (successGuess) {
    messageErea.innerHTML = `You Win The Worde Is <span> ${wordToGuess} </span>`;
    let allTries = document.querySelectorAll(".inputs  div");
    //Add Disabled Class To All Inputs
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
    //Disable Guess Button
    guessButton.disabled = true;
    getHintButton;
  } else {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-inputs");
    const currentTryInputs = document.querySelectorAll(
      `.try-${currentTry} input`
    );
    currentTryInputs.forEach((input) => (input.disabled = true));

    currentTry++;

    const nextTryInpuuts = document.querySelectorAll(
      `.try-${currentTry} input`
    );
    nextTryInpuuts.forEach((input) => (input.disabled = false));

    let el = document.querySelector(`.try-${currentTry}`);
    if (el) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("disabled-inputs");
      el.children[1].focus();
    } else {
      //Disable Guess Button
      guessButton.disabled = true;
      messageErea.innerHTML = `You Lose The Word Is <span> ${wordToGuess}  </span>  `;
      let mt = document.createElement("div");
    }
  }
}

function getHint() {
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector(".hint span").innerHTML = numberOfHints;
  }
  if (numberOfHints === 0) {
    getHintButton.disabled = true;
    getHintButton.disabled = true;
  }
  const enabledInputs = document.querySelectorAll("input:not([disabled])");
  console.log(enabledInputs);

  let emptyEnabledInputs = Array.from(enabledInputs).filter(
    (input) => input.value === ""
  );

  if (emptyEnabledInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
    const randomInput = emptyEnabledInputs[randomIndex];
    const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
    if (indexToFill !== -1) {
      randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }
  }
}
function handleBacksapce(event) {
  if (event.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(event.target); //document.activeElement
    if (currentIndex > 0) {
      inputs[currentIndex - 1].focus();
      inputs[currentIndex].value = "";
      inputs[currentIndex - 1].value = "";
    }
  }
}
document.addEventListener("keydown", handleBacksapce);

window.onload = function () {
  generateInput();
};
