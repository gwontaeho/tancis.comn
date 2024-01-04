import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({ baseURL: process.env.REACT_APP_API_COMN });

api.interceptors.request.use(
    (config) => {
        const lang = localStorage.getItem("lang")?.toUpperCase() || "EN";
        const accessToken = Cookies.get("accessToken");
        const refreshToken = Cookies.get("refreshToken");

        config.headers["Accept-Language"] = lang;
        if (accessToken) config.headers.Authorization = "Bearer " + accessToken;
        if (refreshToken) config.headers["RefreshToken"] = "Bearer " + refreshToken;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default api;
