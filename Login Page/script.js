//all variables needed
const form = document.querySelector("form");
const emailInput = document.querySelector('input[placeholder="Email"]');
const passwordInput = document.querySelector('input[placeholder="Password"]');
const rememberCheckbox = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById("togglePasswordIcon");

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

    // You can redirect or process login here
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

function showBubbleNearInput(message, inputElement) {
    const bubble = document.getElementById("bubbleMessage");
    bubble.textContent = message;

    // Get position of input relative to page
    const rect = inputElement.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    bubble.style.top = rect.top + scrollTop + "px";
    bubble.style.left = rect.right + 10 + "px"; // 10px to the right of input

    bubble.classList.remove("hidden");
    bubble.classList.add("show");

    // Hide after 3 seconds
    setTimeout(() => {
        bubble.classList.remove("show");
        bubble.classList.add("hidden");
    }, 3000);
}

//toggle show password

toggleIcon.addEventListener("click", () => {
    const isPasswordHidden = passwordInput.type === "password";

    // Toggle input type
    passwordInput.type = isPasswordHidden ? "text" : "password";

    // Toggle icon class
    if (isPasswordHidden) {
        toggleIcon.classList.remove("bxs-lock");
        toggleIcon.classList.add("bxs-eye-big");
    } else {
        toggleIcon.classList.remove("bxs-eye-big");
        toggleIcon.classList.add("bxs-lock");
    }
    toggleIcon.style.transform = "translateY(-50%) scale(1.2)";
    toggleIcon.style.opacity = "0.7";

    // Reset after a short delay
    setTimeout(() => {
        toggleIcon.style.transform = "translateY(-50%) scale(1)";
        toggleIcon.style.opacity = "1";
    }, 150);

});

