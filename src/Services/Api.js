import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://limeiraweb.com.br/pixsenac/cliente",
});

export const apiLogin = axios.post({
  baseURL: "https://limeiraweb.com.br/pixsenac/login"
})