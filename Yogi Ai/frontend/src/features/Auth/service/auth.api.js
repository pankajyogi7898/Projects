import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export function register(username, email, password) {
    const response = api.post("/api/auth/register", {
        username, email, password
    })
    return response
}
export function login(email, password) {
    const response = api.post("/api/auth/login", {
        email, password
    })
    return response
}
export function getMe() {
    const response = api.get("/api/auth/get-me")
    return response
}