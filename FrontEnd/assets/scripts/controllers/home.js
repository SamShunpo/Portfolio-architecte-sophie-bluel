// récupération des works depuis API
const reponse = await fetch(`http://localhost:5678/api/works`);
const works = await reponse.json();
console.log (works)

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
