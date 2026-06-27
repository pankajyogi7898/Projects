import axios from "axios"


const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})


export async function register({ username, email, password }) {
    const response = await api.post("/api/auth/register", {
        username, email, password
    })
    return response.data
}

export async function login({ username, email, password }) {
    const response = await api.post("/api/auth/login", {
        username, email, password
    })
    return response.data
}

export async function getMe() {
    const response = await api.get("/api/auth/getMe")
    return response.data
}
export async function logoutUser() {
    const response = await api.get("/api/auth/logoutUser")
    return response.data
}