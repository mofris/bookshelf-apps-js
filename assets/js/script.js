pwShowHide = document.querySelectorAll(".pw-hide");

pwShowHide.forEach((icon) => {
    icon.addEventListener("click", () => {
        let getPwInput = icon.parentElement.querySelector("input");
        if (getPwInput.type === "password") {
            getPwInput.type = "text";
            icon.classList.replace("uil-eye-slash", "uil-eye");
        } else {
            getPwInput.type = "password";
            icon.classList.replace("uil-eye", "uil-eye-slash");
        }
    });
});

window.addEventListener('load', function () {
    if (typeof (Storage) !== 'undefined') {
        localStorage.setItem("username", "faris");
        localStorage.setItem("password", "12345678");
    } else {
        alert('Browser yang Anda gunakan tidak mendukung Web Storage');
    }
});

const formLogin = document.getElementById("form-login");
const loginError = document.getElementById("login-error");
errorText = document.getElementById("login-error");

if (localStorage.getItem("loggedIn") === "true") {
    window.location.href = "dashboard.html";
}

formLogin.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === localStorage.getItem("username") && password === localStorage.getItem("password")) {
        localStorage.setItem("loggedIn", "true");

        window.location.href = "dashboard.html";
    } else {
        errorText.classList.remove("error-message")
        errorText.classList.add("show-error")
    }
});