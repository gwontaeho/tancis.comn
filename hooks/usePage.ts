//@ts-nocheck

import { api } from "../features/apis";

const cache = new Map();

export function fetchData() {
    if (!cache.has("promise")) {
        cache.set("promise", get());
    }
    return cache.get("promise");
}

async function get() {
    // return await api.get("localhost:9700/ptl/api/v1/ptl/comn/comn/menu/dtl?menuId=menu_ptli0041&scrnId=ptli1001002s");
    // return await api.get("localhost:9400/ptl/api/v1/ptl/comn/comn/menu/dtl?menuId=menu_cgme0111&scrnId=efme0201001q");

    // localhost:9700/ptl/api/v1/ptl/comn/comn/menu/dtl?menuId=menu_ptli0041&scrnId=ptli1001002s

    // menu_cgmi2121
    // efmi0202001s

    await new Promise((resolve, reject) => {
        // resolve();
        setTimeout(resolve, 1000);
    });

    return null;
}

export const usePage = () => {
    const promise = fetchData();

    if (promise.status === "fulfilled") {
        return promise.value;
    } else if (promise.status === "rejected") {
        throw promise.reason;
    } else if (promise.status === "pending") {
        throw promise;
    } else {
        promise.status = "pending";
        promise.then(
            (result) => {
                promise.status = "fulfilled";
                promise.value = result;
            },
            (reason) => {
                promise.status = "rejected";
                promise.reason = reason;
            },
        );
        throw promise;
    }
};
