import { deleteWork } from "../services/api.js"
export class Work {
    id
    title
    imageUrl
    categoryId
    userId

    constructor(workJson) {
        this.id = workJson.id;
        this.title = workJson.title;
        this.imageUrl = workJson.imageUrl;
        this.categoryId = workJson.categoryId;
        this.userId = workJson.userId;
    }

    createWorkElement() {
        const workElement = document.createElement("figure");
        const imageWork = document.createElement("img");
        const figcaptionWork = document.createElement("figcaption");

        workElement.id = `work${this.id}`;

        imageWork.src = this.imageUrl;
        imageWork.alt = this.title;

        figcaptionWork.innerText = this.title;

        workElement.appendChild(imageWork);
        workElement.appendChild(figcaptionWork);

        return workElement
    }

    createWorkElementModale() {
        const workElement = document.createElement("figure");
        const imageWork = document.createElement("img");
        const imageTrash = document.createElement("img");

        workElement.id = `modal${this.id}`;

        imageWork.src = this.imageUrl;
        imageWork.alt = this.title;

        imageTrash.src = "./assets/icons/trash.svg";
        imageTrash.id = this.id;
        imageTrash.classList.add("trash");

        imageTrash.addEventListener("click", async function (event) {
            event.preventDefault();
            try {
                await deleteWork(this.id, window.localStorage.getItem("token"))
            } catch (error) {
                const errorMessage = document.querySelector(".error_message");
                errorMessage.innerText = error
            }
            updateDisplay("modal", this.id)
            updateDisplay("work", this.id)
        })

        workElement.appendChild(imageTrash);
        workElement.appendChild(imageWork);

        return workElement
    }
}

function updateDisplay(name, id) {
    const workDelete = document.getElementById(`${name}${id}`);
    workDelete.parentNode.removeChild(workDelete);
}
