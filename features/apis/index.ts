import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({ baseURL: process.env.REACT_APP_API_PTLI });

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

api.defaults.paramsSerializer = (paramObj) => {
    const params = new URLSearchParams();
    for (const key in paramObj) {
        if (paramObj[key] !== undefined) {
            if (Array.isArray(paramObj[key])) {
                paramObj[key].map((item: any) => {
                    params.append(key, item);
                });
            } else {
                params.append(key, paramObj[key]);
            }
        }
    }

    return params.toString();
};

export default api;
