import { getWorks } from "../services/api.js";

const works = await getWorks();

const btnOpenModal = document.querySelector("#open-modal");
const closeModal = document.querySelector(".hide-modal");

btnOpenModal.addEventListener("click", () => modal.showModal());

closeModal.addEventListener("click", ()=> modal.close());


function displayWorksModale(works) {
    const gallery = document.querySelector(".gallery-modal");
    gallery.innerHTML = null;
    for (const work of works) {
        const workElement = document.createElement("figure");
        const imageWork = document.createElement("img");
        const imageTrash = document.createElement("img");

        imageWork.src = work.imageUrl;
        imageWork.alt = work.title;

        imageTrash.src = "./assets/icons/trash.png";
        imageTrash.classList.add("trash");

        workElement.appendChild(imageTrash);
        workElement.appendChild(imageWork);
        gallery.appendChild(workElement);
    }
}

displayWorksModale(works);


