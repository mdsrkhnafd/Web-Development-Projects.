// DOM Elements
const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");

// Add event listener to the generate button
generateBtn.addEventListener("click", generatePalette);

paletteContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("copy-btn")) {
    const hexValue = event.target.previousElementSibling.textContent;

    navigator.clipboard
      .writeText(hexValue)
      .then(() => showCopyMessage(event.target))
      .catch((err) => console.error(err));
  } else if (event.target.classList.contains("color")) {
    const hexValue =
      event.target.nextElementSibling.querySelector(".hex-value").textContent;

    navigator.clipboard
      .writeText(hexValue)
      .then(() =>
        showCopyMessage(
          event.target.nextElementSibling.querySelector(".copy-btn"),
        ),
      )
      .catch((err) => console.error(err));
  }
});

// Function to show a temporary copy message
function showCopyMessage(element) {
  element.classList.remove("far", "fa-copy");
  element.classList.add("fas", "fa-check");

  element.style.color = "#48bb78"; // Change color to indicate success

  setTimeout(() => {
    element.classList.remove("fas", "fa-check");
    element.classList.add("far", "fa-copy");
    element.style.color = ""; // Reset color
  }, 1500); // Reset after 1.5 seconds
}

// Function to generate a random color palette
function generatePalette() {
  const colors = [];

  for (let i = 0; i < 5; i++) {
    const color = getRandomColor();
    colors.push(color);
  }

  // Update the palette display with the generated colors
  updatePaletteDisplay(colors);
}
// Function to get a random hex color
function getRandomColor() {
  // Hexadecimal characters for colors
  const letters = "0123456789ABCDEF";
  // Start with a '#' for hex color
  let color = "#";
  // Generate a 6-digit hex color code
  for (let i = 0; i < 6; i++) {
    // Append a random character from the letters string to the color
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

// Function to update the palette display with the generated colors
function updatePaletteDisplay(colors) {
  const colorBoxes = document.querySelectorAll(".color-box");
  colorBoxes.forEach((box, index) => {
    const color = colors[index];
    const colorDev = box.querySelector(".color");
    const hexValue = box.querySelector(".hex-value");

    colorDev.style.backgroundColor = color;
    hexValue.textContent = color;
  });
}

// generatePalette();
