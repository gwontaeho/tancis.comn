import { useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSetRecoilState } from "recoil";
import lodash from "lodash";
import { authState } from "@/comn/features/recoil";
import { useToast } from "@/comn/hooks";

const api = axios.create({ baseURL: process.env.REACT_APP_API_PTLI });

api.interceptors.request.use(
    (config) => {
        const lang = localStorage.getItem("lang")?.toUpperCase() || "EN";
        const authorization = Cookies.get("authorization");
        const refreshauthorization = Cookies.get("refreshauthorization");
        config.headers["Accept-Language"] = lang;
        if (authorization) config.headers.Authorization = "Bearer " + authorization;
        if (refreshauthorization) config.headers["refreshauthorization"] = "Bearer " + refreshauthorization;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

/* 
        : 임시
*/
api.interceptors.response.use((response) => {
    const { authorization } = response.headers;
    if (authorization) {
        const token = authorization.startsWith("Bearer ") ? authorization.substr(7) : authorization;
        Cookies.set("authorization", token, { expires: 30 });
    }
    return response;
});

api.defaults.paramsSerializer = (paramObj) => {
    const params = new URLSearchParams();

    for (const key in paramObj) {
        if (paramObj[key] !== undefined) {
            if (Array.isArray(paramObj[key])) {
                paramObj[key].map((item: any) => {
                    params.append(key, item);
                });
            } else if (paramObj[key] === null) {
                params.append(key, "");
            } else {
                params.append(key, paramObj[key]);
            }
        }
    }

    return params.toString();
};

/* 
        : 임시
*/
const ApiProvider = ({ children }: { children?: React.ReactNode }) => {
    const setAuth = useSetRecoilState(authState);
    const { showToast } = useToast();
    const _ = useRef(false);

    useEffect(() => {
        api.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                const status = error.response?.status;

                /* Network Error */
                if (status === undefined) {
                }

                /*  */
                if (typeof status === "number") {
                    console.log(`%c::${status}`, "color:red");
                }

                /* unauthorization */
                if (error.response?.status === 401) {
                    if (Cookies.get("authorization")) {
                        alert("401");
                        Cookies.remove("authorization");
                        Cookies.remove("refreshauthorization");
                        setAuth({
                            userInfo: {},
                            isSignedIn: false,
                            signedAt: null,
                        });

                        /* 임시 */
                    } else if (error.response?.data?.errorCode?.content === "NO_USER") {
                        console.log(error.response?.data?.errorCode?.content);
                    } else {
                        showToast({ content: "로그인이 필요한 요청입니다", type: "error" });
                    }
                }

                return Promise.reject(error);
            },
        );
    }, []);

    return <>{children}</>;
};

export { api };
export default ApiProvider;
