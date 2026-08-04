import axios from "axios";

const API = axios.create({
  baseURL: '$ {import.meta.env.VITE_API_URL} / api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  // Register & Login requests ki token pampakudadhu
  if (
    token &&
    !config.url.includes("login") &&
    !config.url.includes("register")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;