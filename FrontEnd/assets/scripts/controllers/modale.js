import { getWorks, deleteWork } from "../services/api.js";

const works = await getWorks();

const dialogElement = document.querySelector("dialog");

document.querySelector("#open-modal").addEventListener("click", () => dialogElement.showModal());

document.querySelector(".hide-modal").addEventListener("click", () => dialogElement.close());

dialogElement.addEventListener("click", (event) => {
    if (event.target == dialogElement){
        dialogElement.close();
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

        workElement.appendChild(imageTrash);
        workElement.appendChild(imageWork);
        gallery.appendChild(workElement);
    }
}

displayWorksModale(works);

// Delete Work
export function updateDisplay(name,id){
    const workDelete = document.getElementById(`${name}${id}`);
    workDelete.parentNode.removeChild(workDelete);
}

const trashButtons = document.querySelectorAll(".trash");
const userToken = window.localStorage.getItem("token");

trashButtons.forEach(trashButton => {
    trashButton.addEventListener("click", async function(event) {
        event.preventDefault();
        try {
            await deleteWork(trashButton.id,userToken)
        } catch (error) {
            const errorMessage = document.querySelector(".error_message");
            errorMessage.innerText = error
        }
        updateDisplay("modal",trashButton.id)
        const deleteAction = new CustomEvent("deleteElement", {detail: {deleteId: trashButton.id}});
        window.dispatchEvent(deleteAction);
    })
})





