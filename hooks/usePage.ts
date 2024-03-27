//@ts-nocheck

import { useEffect } from "react";
import { usePageContext } from "../features/context";
import { api } from "../features/apis";

class Holder {
    isLocked;
    promise;
    reject;
    resolve;
    constructor() {
        this.hold();
    }
    hold() {
        this.isLocked = false;
        this.promise = new Promise((resolve, reject) =>
            Object.assign(this, {
                resolve: () => {
                    resolve(this.hold());
                },
                reject: () => {
                    reject(this.hold());
                },
            }),
        );
    }
    lock() {
        this.isLocked = true;
    }
}

const fetchData = (cache) => {
    if (!cache.has("promise")) {
        cache.set("promise", getPage());
    }
    return cache.get("promise");
};

const getPage = async () => {
    // return await api.get("localhost:9700/ptl/api/v1/ptl/comn/comn/menu/dtl?menuId=menu_ptli0041&scrnId=ptli1001002s");
    // return await api.get("localhost:9400/ptl/api/v1/ptl/comn/comn/menu/dtl?menuId=menu_cgme0111&scrnId=efme0201001q");

    // localhost:9700/ptl/api/v1/ptl/comn/comn/menu/dtl?menuId=menu_ptli0041&scrnId=ptli1001002s

    // menu_cgmi2121
    // efmi0202001s

    return await new Promise((resolve) => {
        // setTimeout(() => resolve(400), 5000);
        setTimeout(() => resolve({ test: "asd" }), 5000);
    });
};

export const usePage = () => {
    const { ref } = usePageContext();

    if (!ref.current.cache) {
        console.log("a/");
        ref.current.cache = new Map();
        ref.current.holder = new Holder();
    }

    const promise = fetchData(ref.current.cache);

    if (promise.status === "fulfilled") {
        if (promise.value === 400) {
            ref.current.holder.resolve();
            throw new Promise((resolve) => {});
        }
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
