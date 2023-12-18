import { useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";

type PopupType = {
    id?: string;
    url: string;
    params?: any;
    layout?: "main" | "popup";
    callback?: (data: any) => void;
};

export const usePopup = () => {
    const popupRef = useRef<any>({});

    useEffect(() => {
        return () => {
            closePopup();
        };
    }, []);

    const getParams = () => {
        const qs = window.location.search;
        const params = new URLSearchParams(qs).get("params") || "";
        return JSON.parse(decodeURIComponent(params));
    };

    const closePopup = (id?: string) => {
        if (id === undefined)
            return Object.entries(popupRef.current).map(([_, { popup }]: any) => {
                if (popup.closed) return;
                popup.close();
            });
        popupRef.current[id].popup?.close();
    };

    const openPopup = ({ id = "", layout = "popup", url, params, callback }: PopupType) => {
        const layoutQuery = layout === "popup" ? "ppup=Y" : "";
        const paramsQuery = params ? "params=" + encodeURIComponent(JSON.stringify(params)) : "";
        const features = "width=800,height=600";
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
        if (!window.opener) return;
        window.opener.postMessage(data);
    };

    const close = () => {
        window.close();
    };

    return { openPopup, closePopup, getParams, postMessage, close };
};
