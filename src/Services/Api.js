import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://limeiraweb.com.br/pixsenac/cliente",
});

export const apiLogin = axios.create({
  baseURL: "https://limeiraweb.com.br/pixsenac/login",
});

export const apiRegisterKey = axios.create({
  baseURL: "https://limeiraweb.com.br/pixsenac/chave",
})