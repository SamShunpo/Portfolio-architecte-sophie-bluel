export class Category {
    id
    name

    constructor(categoryJson){
        this.id = categoryJson.id;
        this.name = categoryJson.name;
    }

    getCategoryOptionElement() {
        const optionCategory = document.createElement("option");
        optionCategory.value = this.id;
        optionCategory.innerText = this.name;

        return optionCategory
    }

    getCategoryButtonElement() {
        const btnCategory = document.createElement("button");
        btnCategory.innerText = this.name;
        

        btnCategory.classList = "btnCategory";
        if (this.id == 0) {
            btnCategory.classList.add("btnCategorySelected");
        }

        return btnCategory
    }
}