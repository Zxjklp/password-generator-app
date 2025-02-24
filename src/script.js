const lengthSlider = document.getElementById("length-slider");
const lengthValue = document.querySelector(".length-value");
const passwordOutput = document.getElementById("password-output");
const generateBtn = document.querySelector(".generate-btn");
const copyBtn = document.querySelector(".copy-btn");

// Update the slider fill and value display
function updateSlider() {
  const value = lengthSlider.value;
  const percentage = (value / lengthSlider.max) * 100;
  lengthSlider.style.backgroundSize = `${percentage}% 100%`;
  lengthValue.textContent = value;

  // Toggle grayed-out state
  if (parseInt(value) === 0) {
    passwordOutput.classList.add("grayed-out");
  } else {
    passwordOutput.classList.remove("grayed-out");
  }
}

// Initial slider state
lengthSlider.value = 0;
updateSlider();

// Add event listener
lengthSlider.addEventListener("input", updateSlider);

const strengthText = document.querySelector(".strength-text");
const strengthBars = document.querySelectorAll(".bar");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

const strengthLevels = {
  0: { text: "", color: "", bars: 0 },
  1: { text: "TOO WEAK!", color: "#F64A4A", bars: 1 },
  2: { text: "WEAK", color: "#FB7C58", bars: 2 },
  3: { text: "MEDIUM", color: "#F8CD65", bars: 3 },
  4: { text: "STRONG", color: "#A4FFAF", bars: 4 },
};

function updateStrengthMeter() {
  const checkedCount = Array.from(checkboxes).filter(
    (checkbox) => checkbox.checked
  ).length;
  const passwordLength = parseInt(lengthSlider.value);

  // Determine strength level
  let strengthLevel;
  if (passwordLength === 0) {
    strengthLevel = 0;
  } else if (passwordLength < 8) {
    strengthLevel = 1;
  } else {
    strengthLevel = checkedCount; 
  }

  const strength = strengthLevels[strengthLevel];

  // Update strength text
  strengthText.textContent = strength.text;

  // Update bars
  strengthBars.forEach((bar, index) => {
    if (index < strength.bars) {
      bar.style.backgroundColor = strength.color;
      bar.style.borderColor = strength.color;
    } else {
      bar.style.backgroundColor = "transparent";
      bar.style.borderColor = "var(--color-almost-white)";
    }
  });
}

// Event listeners to checkboxes and initialize strength meter
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", updateStrengthMeter);
});

updateStrengthMeter();

// Add slider input event listener for strength updates
lengthSlider.addEventListener("input", updateStrengthMeter);

// Character sets for password generation
const charSets = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function generatePassword() {
  const length = parseInt(lengthSlider.value);

  // If length is 0, clear the password and return
  if (length === 0) {
    passwordOutput.value = "";
    return;
  }

  // Get selected character sets
  let chars = "";
  if (document.getElementById("uppercase").checked) chars += charSets.uppercase;
  if (document.getElementById("lowercase").checked) chars += charSets.lowercase;
  if (document.getElementById("numbers").checked) chars += charSets.numbers;
  if (document.getElementById("symbols").checked) chars += charSets.symbols;

  // If no character sets selected, return
  if (!chars) {
    passwordOutput.value = "";
    return;
  }

  // Generate password
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  // Update password display
  passwordOutput.value = password;
}

// Add click event listener to generate button
generateBtn.addEventListener("click", generatePassword);

async function copyToClipboard() {
  const password = passwordOutput.value;
  const copiedText = document.querySelector(".copied-text");

  // Don't copy if password is empty or input is grayed out
  if (!password || passwordOutput.classList.contains("grayed-out")) {
    return;
  }

  try {
    await navigator.clipboard.writeText(password);
    // Show copied text
    copiedText.classList.add("active");
    // Hide after 2 seconds
    setTimeout(() => {
      copiedText.classList.remove("active");
    }, 2000);
  } catch (err) {
    console.error("Failed to copy password: ", err);
  }
}

// Add click event listener to copy button
copyBtn.addEventListener("click", copyToClipboard);
