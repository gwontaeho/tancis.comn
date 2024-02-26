import React from "react";
import Cookies from "js-cookie";
import { RecoilRoot, atom } from "recoil";
import { ModalProps, ToastProps } from "@/comn/components/_";

export const themeState = atom<{ isDark: "true" | "false"; lang: "en" | "ko" | "tz" }>({
    key: "themeState",
    default: {
        isDark:
            localStorage.getItem("isDark") === "true" /** default "false" */
                ? "true"
                : localStorage.getItem("isDark") === "false"
                  ? "false"
                  : window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "true"
                    : "false",
        lang:
            localStorage.getItem("lang") === "en" /** default "ko" */
                ? "en"
                : localStorage.getItem("lang") === "tz"
                  ? "tz"
                  : "ko",
    },
    effects: [
        ({ onSet }) => {
            onSet((n, o: any) => {
                if (n.lang !== o.lang) {
                    localStorage.setItem("lang", n.lang);
                }
                if (n.isDark !== o.isDark) {
                    localStorage.setItem("isDark", n.isDark);
                    if (n.isDark === "true") document.documentElement.classList.add("dark");
                    if (n.isDark === "false") document.documentElement.classList.remove("dark");
                }
            });
        },
    ],
});

export const resourceState = atom<any>({
    key: "resourceState",
    default: {},
});

export const modalState = atom<ModalProps[]>({
    key: "modalState",
    default: [],
});

export const toastState = atom<ToastProps[]>({
    key: "toastState",
    default: [],
});

export const storeState = atom<Record<string, any>>({
    key: "storeState",
    default: {},
});

/** 임시 */
export const authState = atom<Record<string, any>>({
    key: "authState",
    default: Cookies.get("accessToken")
        ? localStorage.getItem("auth")
            ? JSON.parse(localStorage.getItem("auth") as string)
            : {
                  userInfo: {},
                  isSignedIn: false,
                  signedAt: null,
              }
        : {
              userInfo: {},
              isSignedIn: false,
              signedAt: null,
          },
    effects: [
        ({ onSet }) => {
            onSet((n, o) => {
                localStorage.setItem("auth", JSON.stringify(n));
            });
        },
    ],
});

// 임시
export const routeState = atom<string>({
    key: "routeState",
    default: localStorage.getItem("___route") || "",
    effects: [
        ({ onSet }) => {
            onSet((n, o: any) => {
                localStorage.setItem("___route", n);
            });
        },
    ],
});

const RecoilProvider = ({ children }: { children?: React.ReactNode }) => {
    return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilProvider;
