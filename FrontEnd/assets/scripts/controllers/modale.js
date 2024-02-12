import { getWorks, deleteWork, getCategories } from "../services/api.js";

const works = await getWorks();

const dialogElement = document.querySelector("dialog");
const openModal = document.querySelector("#open-modal");
const hideModal = document.querySelector(".hide-modal");

openModal.addEventListener("click", () => dialogElement.showModal());
hideModal.addEventListener("click", () => {
    dialogElement.close();
    changeModal("form-works");
});

dialogElement.addEventListener("click", (event) => {
    if (event.target == dialogElement) {
        dialogElement.close();
        changeModal("form-works");
    }
});


// Display Work

function displayWorksModale(works) {
    const gallery = document.querySelector(".gallery-modal");
    gallery.innerHTML = null;
    for (const work of works) {
        const workElement = document.createElement("figure");
        const imageWork = document.createElement("img");
        const imageTrash = document.createElement("img");

        workElement.id = `modal${work.id}`;

        imageWork.src = work.imageUrl;
        imageWork.alt = work.title;

        imageTrash.src = "./assets/icons/trash.svg";
        imageTrash.id = work.id;
        imageTrash.classList.add("trash");

        imageTrash.addEventListener("click", async function (event) {
            event.preventDefault();
            try {
                await deleteWork(work.id, window.localStorage.getItem("token"))
            } catch (error) {
                const errorMessage = document.querySelector(".error_message");
                errorMessage.innerText = error
            }
            updateDisplay("modal", work.id)
            updateDisplay("work", work.id)
        })

        workElement.appendChild(imageTrash);
        workElement.appendChild(imageWork);
        gallery.appendChild(workElement);
    }
}

displayWorksModale(works);

// Delete Work
function updateDisplay(name, id) {
    const workDelete = document.getElementById(`${name}${id}`);
    workDelete.parentNode.removeChild(workDelete);
}

// Create Work change screen

const deleteDiv = document.querySelector("#dialog-delete");
const createDiv = document.querySelector("#dialog-create");
const returnArrow = document.querySelector(".return-arrow");
const addWorkBtn = document.querySelector("#add-work-btn");

addWorkBtn.addEventListener("click", () => {
    deleteDiv.style.display = "none";
    createDiv.style.display = "flex";
    returnArrow.style.display = "block";
})

returnArrow.addEventListener("click", () => {
    returnArrow.style.display = "none";
    changeModal("form-works");
})

// Dropdown create work

const categories = await getCategories();
const selectButton = document.querySelector("#category");
for (const category of categories) {
    const optionCategory = document.createElement("option");
    optionCategory.value = category.id;
    optionCategory.innerText = category.name;
    selectButton.appendChild(optionCategory);
}


// file uploader

const inputPhoto = document.getElementById('file-input');
const image = document.getElementById('picture');
const inputContainer = document.querySelector(".input-file");
const MAX_SIZE = 4000000;
const ERRORS = {
    format: "Format de fichier non accepté (jpg, png)",
    size: "Fichier trop volumineux (max 4mo)"
};

function showError(message) {
    let errorMessage = inputContainer.querySelector(".error-message");
    if (!errorMessage) {
        errorMessage = document.createElement("p");
        errorMessage.className = "error-message";
        inputContainer.appendChild(errorMessage);
    }
    errorMessage.innerText = message;
    errorMessage.style.color = "red";
}

function resetInputContainer() {
    const errorMessage = inputContainer.querySelector(".error-message");
    if (errorMessage) {
        inputContainer.removeChild(errorMessage);
    }
}

inputPhoto.onchange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    resetInputContainer();

    if (file.type.match("image.*") && file.size < MAX_SIZE) {
        reader.onload = (e) => {
            image.src = e.target.result;
            inputContainer.style.display = "none";
        };

        reader.readAsDataURL(file);
    } else {
        if (!file.type.match("image.*")) {
            showError(ERRORS.format);
        }
        if (file.size >= MAX_SIZE) {
            showError(ERRORS.size);
        }
    }
};

image.addEventListener("click", () => {
    inputPhoto.click();
})


// reset form

function resetForm(form) {
    document.getElementById(form).reset();
}

function changeModal(form) {
    resetForm(form);
    resetInputContainer()
    deleteDiv.style.display = "flex";
    createDiv.style.display = "none";
    image.src = "";
    inputContainer.style.display = "flex";
}