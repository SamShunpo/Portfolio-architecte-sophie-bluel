import { Category } from "../models/Category.js";
import { getWorks, deleteWork, getCategories, createWork } from "../services/api.js";

const works = await getWorks();
const categories = await getCategories();

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
        const { workElement, imageTrash} = work.createWorkElementModale()
        gallery.appendChild(workElement);

        trashImage(work, window.localStorage.getItem("token"), imageTrash)
    }
}

function trashImage (work, token, imageTrash){
    imageTrash.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            await deleteWork(work.id, token)
        } catch (error) {
            const errorMessage = document.querySelector(".error_message");
            errorMessage.innerText = error
        }
        updateDisplay("modal", work.id)
        updateDisplay("work", work.id)
    })
}

function updateDisplay(name, id) {
    const workDelete = document.getElementById(`${name}${id}`);
    workDelete.parentNode.removeChild(workDelete);
}

displayWorksModale(works);


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


// FORM
// file uploader

const inputPhoto = document.getElementById('file-input');
const inputContainer = document.querySelector(".input-file");
let inputPhotoValidity = false
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
    const imageContainer = document.querySelector(".picture-container");

    imageContainer.innerHTML = "";
    inputContainer.style.display = "flex";

    resetInputContainer();

    if (file.type.match("image.*") && file.size < MAX_SIZE) {
        reader.onload = (e) => {
            const imageSelected = document.createElement("img");

            imageSelected.src = e.target.result;
            imageSelected.classList.add("picture");

            imageContainer.appendChild(imageSelected);
            inputContainer.style.display = "none";

            imageSelected.addEventListener("click", () => {
                inputPhoto.click();
            })
        };
        inputPhotoValidity = true
        reader.readAsDataURL(file);

    } else {
        if (!file.type.match("image.*")) {
            showError(ERRORS.format);
            inputPhotoValidity = false
        }
        if (file.size >= MAX_SIZE) {
            showError(ERRORS.size);
            inputPhotoValidity = false
        }
    }
};


// Dropdown create work

const defaultCategory = new Category({ id: 0, name: "" })

function dropdownOption(categories) {
    const selectButton = document.querySelector("#category");
    for (const category of categories) {

        selectButton.appendChild(category.getCategoryOptionElement());
    }
}

dropdownOption([defaultCategory, ...categories]);


// check validity inputs

const formValidity = document.querySelector("#form-works");
const submitButton = document.querySelector("#submit-form");
const inputCategoryValidity = document.querySelector("#category");
const inputTitleValidity = document.querySelector("#title");

formValidity.addEventListener("change", () => {
    if (inputPhotoValidity === true && inputCategoryValidity.value >= 1 && inputTitleValidity.checkValidity() === true) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
});


// create Work

const form = document.getElementById("form-works");

form.addEventListener("submit", async (event) => {
    event.preventDefault()
    const formData = new FormData()
    const title = document.querySelector("#title").value;
    const image = document.querySelector("#file-input").files[0];
    const category = document.querySelector("#category").value;

    formData.append("title", title);
    formData.append("image", image);
    formData.append("category", parseInt(category));

    try {
        const work = await createWork(formData, window.localStorage.getItem("token"));

        const gallery = document.querySelector(".gallery");
        const galleryModal = document.querySelector(".gallery-modal");

        gallery.appendChild(work.createWorkElement());

        const { workElement, imageTrash } = work.createWorkElementModale()
        galleryModal.appendChild(workElement);

        dialogElement.close()
        changeModal("form-works")

        trashImage(work, window.localStorage.getItem("token"), imageTrash)

    } catch (error) {
        const errorMessage = document.querySelector("#output")
        errorMessage.innerText = error
    }
})


// reset form

function resetForm(form) {
    const submitButton = document.querySelector("#submit-form");
    const errorMessage = document.querySelector("#output")
        
    errorMessage.innerText = ""
    submitButton.disabled = true;
    document.getElementById(form).reset();

}

function changeModal(form) {
    const imageContainer = document.querySelector(".picture-container");

    resetForm(form);
    resetInputContainer()
    deleteDiv.style.display = "flex";
    createDiv.style.display = "none";
    imageContainer.innerHTML = "";
    inputContainer.style.display = "flex";
}