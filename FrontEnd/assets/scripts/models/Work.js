export class Work {
    id
    title
    imageUrl
    categoryId
    userId

    constructor(workJson){
       this.id = workJson.id;
       this.title = workJson.title;
       this.imageUrl = workJson.imageUrl;
       this.categoryId = workJson.categoryId;
       this.userId = workJson.userId;
    }

    createWorkElement(){
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
}

