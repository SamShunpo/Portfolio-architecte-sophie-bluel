// index 

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

// login

export async function loginUser(chargeUtile) {
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    })
    if (!response.ok) {
        const errorData = await response.json();
        throw errorData.message;
    } else {
        const loginData = await response.json();
        return loginData;
    }
}

// delete works

export async function deleteWork(id, token){
    const response = await fetch(`http://localhost:5678/api/works/${id}`,{
        method: "DELETE",
        headers: {Authorization : `Bearer ${token}`},
    })
    if (!response.ok) {
        const errorData = await response();
        throw errorData.message;
    } 
}