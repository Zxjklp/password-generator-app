const lengthSlider = document.getElementById("length-slider");
const lengthValue = document.querySelector(".length-value");
const passwordOutput = document.getElementById("password-output");

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

// Initial update and event listener
updateSlider();
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
  const strength = strengthLevels[checkedCount];

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
