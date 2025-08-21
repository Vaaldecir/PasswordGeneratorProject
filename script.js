// @ts-nocheck

const passwordGroupNumber = document.querySelector(".toggle-tab");
const generatePassword = document.querySelector(".generate-button");
const passwordResult = document.querySelector(".password");
const copyPassword = document.querySelector(".fa-regular");

const vowels = ["a", "e", "i", "o", "u", "y"];
const consonants = [
  "b",
  "c",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "m",
  "n",
  "p",
  "q",
  "r",
  "s",
  "t",
  "v",
  "w",
  "x",
  "z",
];
const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const basePattern = ["c", "v", "c", "c", "v", "c"];

passwordResult.innerText = randomPassword();

passwordGroupNumber.addEventListener("click", (e) => {
  if (e.target.classList.contains("tab")) {
    const clickedBtn = e.target.closest(".tab");

    document.querySelectorAll(".tab").forEach((btn) => {
      if (btn === clickedBtn) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }
});

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomPassword() {
  let password = "";

  for (const letterType of basePattern) {
    if (letterType === "c") {
      password += pickRandom(consonants);
    } else if (letterType === "v") {
      password += pickRandom(vowels);
    }
  }

  const digit = pickRandom(digits);

  const insertIndex = Math.floor(Math.random() * (password.length + 1));
  let passwordDigit =
    password.slice(0, insertIndex) + digit + password.slice(insertIndex);

  const letterIndexes = [];
  for (let i = 0; i < passwordDigit.length; i++) {
    if (isNaN(passwordDigit[i])) {
      letterIndexes.push(i);
    }
  }

  const upperIndex = pickRandom(letterIndexes);

  passwordDigit =
    passwordDigit.slice(0, upperIndex) +
    passwordDigit[upperIndex].toUpperCase() +
    passwordDigit.slice(upperIndex + 1);
  return passwordDigit;
}

generatePassword.addEventListener("click", () => {
  const activeTab = document.querySelector(".active");
  const numberOfGroups = parseInt(activeTab.dataset.groups);
  let password = "";

  for (let i = 0; i < numberOfGroups; i++) {
    password += randomPassword();
    if (i < numberOfGroups - 1) {
      password += "-";
    }
  }

  passwordResult.innerText = password;
});

copyPassword.addEventListener("click", () => {
  const password = passwordResult.innerText;

  navigator.clipboard
    .writeText(password)
    .then(() => {
      copyPassword.classList.remove("fa-clone");
      copyPassword.classList.add("fa-square-check");

      copyPassword.style.transform = "scale(1.2)";

      setTimeout(() => {
        copyPassword.classList.remove("fa-square-check");
        copyPassword.classList.add("fa-clone");
        copyPassword.style.transform = "scale(1)";
      }, 1500);
    })
    .catch((err) => {
      alert("Erreur lors de la copie: ", err);
    });

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { x: 0.6, y: 0.6 },
  });
});
