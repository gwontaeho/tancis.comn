import React from "react";
import Cookies from "js-cookie";
import { RecoilRoot, atom, useRecoilSnapshot } from "recoil";
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

export const authState = atom<Record<string, any>>({
    key: "authState",
    default: {
        user: "",
        isSignedIn: !!Cookies.get("accessToken"),
    },
});

const DebugObserver = () => {
    const snapshot = useRecoilSnapshot();

    React.useEffect(() => {
        console.debug("The following atoms were modified:");
        Array.from(snapshot.getNodes_UNSTABLE({ isModified: true })).forEach((node) => {
            console.debug(node.key, snapshot.getLoadable(node));
        });
    }, [snapshot]);

    return null;
};

const RecoilProvider = ({ children }: { children?: React.ReactNode }) => {
    return (
        <RecoilRoot>
            <DebugObserver />
            {children}
        </RecoilRoot>
    );
};

export default RecoilProvider;
