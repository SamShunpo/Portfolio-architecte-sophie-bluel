import { loginUser } from "../services/api.js";

const loginForm = document.querySelector(".login-section");
loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const user = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value,
    };
    const chargeUtile = JSON.stringify(user);
    try {
        const loginData = await loginUser(chargeUtile)
        window.localStorage.setItem("token",loginData.token)
        window.location.replace("/")
    } catch (error) {
        const errorMessage = document.querySelector(".error_message");
        errorMessage.innerText = error
    }
});

