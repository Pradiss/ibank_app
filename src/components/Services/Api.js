import axios from "axios"

export const apiClient = axios.create({
    baseURL: "https://limeiraweb.com.br/pixsenac/cliente"
})
