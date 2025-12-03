import axios  from "axios";
import { type InternalAxiosRequestConfig }  from "axios";
import { ACESS_TOKEN } from "../constants";

const api = axios.create({
baseURL: "http://localhost:8000", 
headers: {
"Content-Type": "application/json",
},
});

api.interceptors.request.use(
    (config): InternalAxiosRequestConfig => {
        const token = localStorage.getItem(ACESS_TOKEN)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api;
