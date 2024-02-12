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
        const workElement = document.createElement("figure");
        const imageWork = document.createElement("img");
        const figcaptionWork = document.createElement("figcaption");
        
        workElement.id = `work${work.id}`;

        imageWork.src = work.imageUrl;
        imageWork.alt = work.title;

        figcaptionWork.innerText = work.title;

        workElement.appendChild(imageWork);
        workElement.appendChild(figcaptionWork);
        gallery.appendChild(workElement);
    }
}

function displayCategories(categories) {
    const categoriesContainer = document.querySelector(".categories");
    for (const category of categories) {
        const btnCategory = document.createElement("button");
        btnCategory.innerText = category.name;
        categoriesContainer.appendChild(btnCategory);

        btnCategory.classList = "btnCategory";
        if (category.id == 0) {
            btnCategory.classList.add("btnCategorySelected");
        }

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
    displayCategories([{ id: 0, name: "Tous" }, ...categories]);
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






