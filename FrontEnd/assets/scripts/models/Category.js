export class Category {
    id
    name

    constructor(categoryJson){
        this.id = categoryJson.id;
        this.name = categoryJson.name;
    }

    getCategories() {
        const optionCategory = document.createElement("option");
        optionCategory.value = this.id;
        optionCategory.innerText = this.name;

        return optionCategory
    }
}