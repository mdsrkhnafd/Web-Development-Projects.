// DOM Elements - all the elements we need from HTML
const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length-value");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateButton = document.getElementById("generate-btn");
const copyButton = document.getElementById("copy-btn");
const strengthBar = document.querySelector(".strength-bar");
const strengthText = document.querySelector(".strength-container p");
const strengthLabel = document.getElementById("strength-label");

// Character sets
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

// Update length display when slider changes
lengthSlider.addEventListener("input", () => {
  lengthDisplay.textContent = lengthSlider.value;
});

// Generate password when button is clicked
generateButton.addEventListener("click", makePassword);

function makePassword() {
  const length = Number(lengthSlider.value);
  const includeUppercase = uppercaseCheckbox.checked;
  const includeLowercase = lowercaseCheckbox.checked;
  const includeNumbers = numbersCheckbox.checked;
  const includeSymbols = symbolsCheckbox.checked;

  if (
    !includeUppercase &&
    !includeLowercase &&
    !includeNumbers &&
    !includeSymbols
  ) {
    alert("Please select at least one character type!");
    return;
  }

  const newPassword = createRandomPassword(
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  );

  passwordInput.value = newPassword;
  updateStrengthMeter(newPassword);
}

function updateStrengthMeter(password) {
  const passwordLength = password.length;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*()\-_=+\[\]{}|;:,.<>?\/]/.test(password);

  let strengthScore = 0;

  // here the .min() will get the minimum of the two values - so if the password is 20 characters or more, it will give full 40 points, but if it's shorter, it will give proportionally less points
  // but this will make sure that "at maximum" you will get 40 points for length.
  strengthScore += Math.min(passwordLength * 2, 40); // Max 40 points for length

  if (hasUppercase) strengthScore += 15;
  if (hasLowercase) strengthScore += 15;
  if (hasNumbers) strengthScore += 15;
  if (hasSymbols) strengthScore += 15;

  // enforce for minimum score for every short password
  if (passwordLength < 8) {
    strengthScore = Math.min(strengthScore, 40); // Max 40 points for passwords shorter than 8 characters
  }

  // ensure the width of the strength bar is a valid percentage (0-100%)
  const safeScore = Math.max(5, Math.min(100, strengthScore)); // Ensure score is between 5 and 100
  strengthBar.style.width = safeScore + "%";

  let strengthLabelText = "";
  let barColor = "";

  if (strengthScore < 40) {
    // weak password
    barColor = "#fc8181"; // red
    strengthLabelText = "Weak";
  } else if (strengthScore < 70) {
    // medium password
    barColor = "#fbd38d"; // yellow
    strengthLabelText = "Medium";
  } else {
    // strong password
    barColor = "#68d391"; // green
    strengthLabelText = "Strong";
  }

  strengthBar.style.backgroundColor = barColor;
  strengthText.style.color = barColor;
  strengthLabel.textContent = strengthLabelText;
}

function createRandomPassword(
  length,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols,
) {
  let allCharacters = "";
  // "ABCD...abcd...0123...!@#$..." - we will build this string based on user choices
  if (includeUppercase) allCharacters += uppercaseLetters;
  if (includeLowercase) allCharacters += lowercaseLetters;
  if (includeNumbers) allCharacters += numberCharacters;
  if (includeSymbols) allCharacters += symbolCharacters;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allCharacters.length);
    password += allCharacters[randomIndex];
  }
  return password;
}

// Generate an initial password when the page loads
window.addEventListener("DOMContentLoaded", makePassword);

// Copy password to clipboard
copyButton.addEventListener("click", () => {
  if (!passwordInput.value) return;

  navigator.clipboard
    .writeText(passwordInput.value)
    .then(() => showCopySuccess())
    .catch((err) => {
      console.error("Failed to copy password: ", err);
    });
});

function showCopySuccess() {
  copyButton.classList.remove("far", "fa-copy");
  copyButton.classList.add("fas", "fa-check");

  copyButton.style.color = "#48bb78";

  setTimeout(() => {
    copyButton.classList.remove("fas", "fa-check");
    copyButton.classList.add("far", "fa-copy");
    copyButton.style.color = "";
  }, 1500);
}
