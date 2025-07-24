// All variables needed
const form = document.querySelector("form");
const emailInput = document.querySelector('input[placeholder="Email"]');
const passwordInput = document.querySelector('input[placeholder="Password"]');
const rememberCheckbox = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById("togglePasswordIcon");

// Checklist elements
const checklistBubble = document.getElementById("checklistBubble");
const checklist = {
  length: document.getElementById("length"),
  uppercase: document.getElementById("uppercase"),
  number: document.getElementById("number"),
  special: document.getElementById("special"),
};

// Email regex pattern for authentication
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Function to check password strength
function checkPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[\W]/.test(password)) score++;
  return score;
}

// Real-time password input behavior
let typingTimeout;
passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;

  // Update checklist
  checklist.length.classList.toggle("valid", password.length >= 8);
  checklist.uppercase.classList.toggle("valid", /[A-Z]/.test(password));
  checklist.number.classList.toggle("valid", /[0-9]/.test(password));
  checklist.special.classList.toggle("valid", /[\W]/.test(password));

  const allValid = Object.values(checklist).every(item =>
    item.classList.contains("valid")
  );

  // Show the checklist bubble if not all valid
  if (!allValid) {
    checklistBubble.classList.remove("hidden");
  }

  // Clear previous timeout
  clearTimeout(typingTimeout);

  // Hide after 1.5s of inactivity or when all valid
  typingTimeout = setTimeout(() => {
    if (allValid || password === "") {
      checklistBubble.classList.add("hidden");
    }
  }, 1500);
});

// Form submit handler
form.addEventListener("submit", (e) => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!emailRegex.test(email)) {
    showBubbleNearInput("❌ Invalid email!", emailInput);
    e.preventDefault();
    return;
  }

  if (checkPasswordStrength(password) < 4) {
    showBubbleNearInput("⚠️ Password too weak", passwordInput);
    e.preventDefault();
    return;
  }

  // Simulate Remember Me with localStorage
  if (rememberCheckbox.checked) {
    localStorage.setItem("rememberedEmail", email);
  } else {
    localStorage.removeItem("rememberedEmail");
  }

  alert("✅ Login successful (simulated)!");
});

// Autofill if remembered
window.addEventListener("DOMContentLoaded", () => {
  const remembered = localStorage.getItem("rememberedEmail");
  if (remembered) {
    emailInput.value = remembered;
    rememberCheckbox.checked = true;
  }
});

// Show floating message beside input
function showBubbleNearInput(message, inputElement) {
  const bubble = document.getElementById("bubbleMessage");
  bubble.textContent = message;

  const rect = inputElement.getBoundingClientRect();
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  bubble.style.top = rect.top + scrollTop + "px";
  bubble.style.left = rect.right + 10 + "px";

  bubble.classList.remove("hidden");
  bubble.classList.add("show");

  setTimeout(() => {
    bubble.classList.remove("show");
    bubble.classList.add("hidden");
  }, 3000);
}

// Toggle show password
toggleIcon.addEventListener("click", () => {
  const isPasswordHidden = passwordInput.type === "password";
  passwordInput.type = isPasswordHidden ? "text" : "password";

  toggleIcon.classList.toggle("bxs-lock", !isPasswordHidden);
  toggleIcon.classList.toggle("bxs-eye-big", isPasswordHidden);

  toggleIcon.style.transform = "translateY(-50%) scale(1.2)";
  toggleIcon.style.opacity = "0.7";
  setTimeout(() => {
    toggleIcon.style.transform = "translateY(-50%) scale(1)";
    toggleIcon.style.opacity = "1";
  }, 150);
});
