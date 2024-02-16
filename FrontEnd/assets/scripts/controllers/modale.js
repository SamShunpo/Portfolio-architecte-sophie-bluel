import { getWorks, deleteWork, getCategories, createWork} from "../services/api.js";

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

function dropdownOption(categories) {
    const selectButton = document.querySelector("#category");
    for (const category of categories) {
        const optionCategory = document.createElement("option");
        optionCategory.value = category.id;
        optionCategory.innerText = category.name;
        selectButton.appendChild(optionCategory);
    }
}

dropdownOption([{ id: 0, name: "" }, ...categories])


// file uploader

const inputPhoto = document.getElementById('file-input');
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
    const imageContainer = document.querySelector(".picture-container");

    imageContainer.innerHTML = "";

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




// reset form

function resetForm(form) {
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

// create Work


const form = document.getElementById("form-works");

form.addEventListener("submit", async (event) => {
    event.preventDefault()
    const formData = new FormData()
    const title = document.querySelector("#title").value;
    const image = document.querySelector("#file-input").files[0];
    const category = document.querySelector("#category").value;

    formData.append("title",title);
    formData.append("image",image);
    formData.append("category",parseInt(category));

    try {
        const work = await createWork(formData, window.localStorage.getItem("token"));

        const gallery = document.querySelector(".gallery");
        gallery.appendChild(work.getHtml());

    } catch (error) {
        // todo gérer l'erreur
    }
})
