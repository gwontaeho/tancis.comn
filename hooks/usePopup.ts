import { useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";

type OpenPopupArgs = {
    id?: string;
    url: string;
    params?: any;
    layout?: "main" | "popup";
    size?: "sm" | "md" | "lg";
    callback?: (data: any) => void;
};

type UsePopupReturn = {
    openPopup: (args: OpenPopupArgs) => void;
    closePopup: (id?: string) => void;
    getParams: () => Record<string, any>;
    postMessage: (data: any) => void;
    close: () => void;
};

const PopupSize = {
    sm: { width: 800, height: 600 },
    md: { width: 1000, height: 700 },
    lg: { width: 1200, height: 800 },
};

export const usePopup = (): UsePopupReturn => {
    const popupRef = useRef<any>({});

    useEffect(() => {
        return () => {
            closePopup();
        };
    }, []);

    /**
     *
     * @returns
     */
    const getParams = () => {
        const qs = window.location.search;
        const params = new URLSearchParams(qs).get("params") || "";
        try {
            return JSON.parse(decodeURIComponent(params));
        } catch (error) {}
    };

    const closePopup = (id?: string) => {
        if (id === undefined)
            return Object.entries(popupRef.current).map(([_, { popup }]: any) => {
                if (popup.closed) return;
                popup.close();
            });

        popupRef.current[id]?.popup.close();
    };

    const openPopup = (args: OpenPopupArgs) => {
        const { id = "", layout = "popup", url, params, callback, size = "sm" } = args;

        const layoutQuery = layout === "popup" ? "ppup=Y&" : "";
        const paramsQuery = params ? "params=" + encodeURIComponent(JSON.stringify(params)) : "";
        const features = `width=${PopupSize[size].width},height=${PopupSize[size].height}`;
        const name = id + "__" + uuid();

        const fullUrl = url + "?" + layoutQuery + paramsQuery;

        if (popupRef.current[id]) popupRef.current[id].popup.close();

        const popup = window.open(fullUrl, name, features);
        if (!popup) return;

        popupRef.current[id] = { id, name, popup };

        const handleMessage = (e: any) => {
            if (e.source.name !== popup.name) return;
            if (!callback) return;
            callback(e.data);
        };

        window.addEventListener("message", handleMessage);

        popup.onunload = (e: any) => {
            if (e.target.location.origin === "null") return;
            window.removeEventListener("message", handleMessage);
        };
    };

    const postMessage = (data: any) => {
        if (window.opener) {
            window.opener.postMessage(data);
        }

        if (window.parent) {
            window.parent.postMessage(data);
        }
    };

    const close = () => {
        window.close();
    };

    return { openPopup, closePopup, getParams, postMessage, close };
};
