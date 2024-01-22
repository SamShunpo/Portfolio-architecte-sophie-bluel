import { getWorks } from "../services/api.js";

const works = await getWorks()

//afficher les works
function afficherWorks(works) {
    const gallery = document.querySelector(".gallery");
    for (const work of works) {
        
        const workElement = document.createElement("figure");
        const imageWork = document.createElement("img");
        const figcaptionWork = document.createElement("figcaption");
        
        imageWork.src = work.imageUrl;
        imageWork.alt = work.title;

        figcaptionWork.innerText = work.title;

        workElement.appendChild(imageWork);
        workElement.appendChild(figcaptionWork);
        gallery.appendChild(workElement);
    }
}

afficherWorks(works)
