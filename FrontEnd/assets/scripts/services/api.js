/* index */

export async function getWorks() {
    const reponse = await fetch(`http://localhost:5678/api/works`);
    const works = await reponse.json();
    return works
}

export async function getCategories() {
    const reponse = await fetch(`http://localhost:5678/api/categories`);
    const categories = await reponse.json();
    return categories
}

/*login*/

export async function loginUser(chargeUtile) {
    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    })
    if (!reponse.ok) {
        const errorData = await reponse.json();
        throw errorData.message;
    } else {
        const loginData = await reponse.json();
        return loginData;
    }
}
