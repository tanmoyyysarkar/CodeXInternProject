const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const strengthBar = document.getElementById("strengthBar");
const passwordInput = document.getElementById("password");
const showPasswordCheckbox = document.getElementById("showPassword");
const strengthMessage = document.getElementById("strengthMessage");
const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const rememberCheckbox = document.getElementById("rememberMe");

//Function to check the strength of the password, score (0-4)
const checkPasswordStrength =(password)=>{
    let score = 0;
    if(password.length >= 8) score++;
    if(/[A-Z]/.test(password)) score++;
    if(/[0-9]/.test(password)) score++;
    if(/[\W]/.test(password)) score++;
    return score;
}

//password strength bar functionality
passwordInput.addEventListener("input", ()=>{
    const password = passwordInput.value;
    const score = checkPasswordStrength(password);
    strengthBar.value = score;

    let widthPercent = (score/4) * 100;
    let message = "";
    let color = "";

    switch (score) {
        case 0:
        case 1:
        message = "Very Weak";
        color = "red";
        break;
        case 2:
        message = "Weak";
        color = "orange";
        break;
        case 3:
        message = "Good";
        color = "#00cdff";
        break;
        case 4:
        message = "Strong";
        color = "#00e540";
        break;
    }
    strengthMessage.textContent = message;
    strengthBar.style.width = widthPercent + "%";
    strengthBar.style.backgroundColor = color;
});

//hide and show password function
showPasswordCheckbox.addEventListener("change", ()=>{
    passwordInput.type = showPasswordCheckbox.checked ? "text" : "password";
});

//input validation function
form.addEventListener("submit", (e)=>{
    const email = emailInput.value.trim();
    if(!emailRegex.test(email)){
        alert("Please enter a valid email!");
        e.preventDefault();
    }else if(checkPasswordStrength(passwordInput.value) <= 2){
        alert("Please use a stronger password");
        e.preventDefault();
    }
})

//simulating remember me fucntionality using local storage
form.addEventListener("submit", (e)=>{
    if(rememberCheckbox.checked){
        localStorage.setItem("rememberedEmail", emailInput.value.trim());
    }
    else{
        localStorage.removeItem("rememberedEmail");
    }
})

window.addEventListener("DOMContentLoaded",()=>{
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if(rememberedEmail){
        emailInput.value = rememberedEmail;
        rememberCheckbox.checked = true;
    }
})

