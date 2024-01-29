export async function getWorks(){
    const reponse = await fetch(`http://localhost:5678/api/works`);
    const works = await reponse.json();
    return works
}

export async function getCategories(){
    const reponse = await fetch(`http://localhost:5678/api/categories`);
    const categories = await reponse.json();
    return categories
}

export async function loginUser(){
    const loginForm = document.querySelector(".login-section");
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const user ={
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
        };
        const chargeUtile = JSON.stringify(user);

        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: chargeUtile
        })
        .then (response => response.json())
        .then (data => {
            console.log(data);
        })
    });
}
