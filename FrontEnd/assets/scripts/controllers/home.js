import { Category } from "../models/Category.js";
import { getWorks, getCategories } from "../services/api.js";

const tokenConsole = window.localStorage.getItem("token");
console.log(tokenConsole);

const works = await getWorks();
const categories = await getCategories();

//afficher les works
function displayWorks(works) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = null;
    for (const work of works) {

        gallery.appendChild(work.createWorkElement());
    }
}

function displayCategories(categories) {
    const categoriesContainer = document.querySelector(".categories");
    for (const category of categories) {
        const btnCategory = category.getCategoryButtonElement()
        categoriesContainer.appendChild(btnCategory);

        btnCategory.addEventListener("click", () => {
            const buttons = document.querySelectorAll(".btnCategory");
            buttons.forEach(btnCategory => btnCategory.classList.remove("btnCategorySelected"));

            if (category.id == 0) {
                displayWorks(works);
            } else {
                const filteredWorks = works.filter((work) => {
                    return category.id == work.categoryId;
                });
                displayWorks(filteredWorks);
            }
            btnCategory.classList.add("btnCategorySelected");
        })
    }
}

function displayEditMode() {
    const editMode = document.querySelector(".edit-mode");
    editMode.style.display = "flex";
}

function displayEditBtn() {
    const editBtn = document.querySelector(".project-title button");
    editBtn.style.display = "flex";
}

function displayBtnLogin() {
    const loginBtn = document.querySelector(".login-btn");
    loginBtn.innerHTML = `<a>logout</a>`;
    loginBtn.classList.add("logout");
}

displayWorks(works);

const token = window.localStorage.getItem("token");
if (!token) {
    displayCategories([new Category({ id: 0, name: "Tous" }), ...categories]);
} else {
    displayEditMode();
    displayEditBtn();
    displayBtnLogin();

    const logoutBtn = document.querySelector(".logout");
    logoutBtn.addEventListener("click", () => {
        logoutBtn.classList.remove("logout");
        window.localStorage.removeItem("token");
        location.reload();
    })
}

const contactButton = document.querySelector("#contact-btn");

contactButton.addEventListener("click", () => {
    document.querySelector("#contact").scrollIntoView({
        behavior: "smooth"
    })
})

const projectsButton = document.querySelector("#project-btn");

projectsButton.addEventListener("click", () => {
    document.querySelector("#portfolio").scrollIntoView({
        behavior: "smooth"
    })
})



