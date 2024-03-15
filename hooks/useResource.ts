import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { resourceState } from "../features/recoil";
import { useTheme } from "../hooks";
import { utils } from "../utils";

const RENEWAL_CYCLE = 10000;

type TResource = {
    area: string;
    comnCd?: string;
};
type UseResourceProps = {
    defaultSchema: TResource[];
};

/**
 *
 * @param area
 * @param comnCd
 * @param lang
 * @returns
 */
export const getResourceKey = (area: string, comnCd?: string, lang?: string) => {
    return area + (comnCd ? `:${comnCd}` : "") + (lang ? `;${lang}` : "");
};

const getResourceFromIDB = (key: any) => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("TANCIS");
        request.onupgradeneeded = () => {
            const db = request.result;
            db.createObjectStore("RESOURCE", { keyPath: "key" });
        };

        request.onsuccess = async () => {
            const db = request.result;
            const ts = db.transaction("RESOURCE", "readonly");
            const os = ts.objectStore("RESOURCE");
            const get = os.get(key);

            get.onsuccess = () => {
                resolve(get.result);
            };
        };
    });
};

const addResourceToIDB = (record: any) => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("TANCIS");
        request.onupgradeneeded = () => {
            const db = request.result;
            db.createObjectStore("RESOURCE", { keyPath: "key" });
        };

        request.onsuccess = async () => {
            const db = request.result;
            const ts = db.transaction("RESOURCE", "readwrite");
            const os = ts.objectStore("RESOURCE");

            const add = os.add(record);

            add.onsuccess = () => {
                // @ts-ignore
                resolve();
            };
        };
    });
};

const putResourceToIDB = (record: any) => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("TANCIS");
        request.onupgradeneeded = () => {
            const db = request.result;
            db.createObjectStore("RESOURCE", { keyPath: "key" });
        };

        request.onsuccess = async () => {
            const db = request.result;
            const ts = db.transaction("RESOURCE", "readwrite");
            const os = ts.objectStore("RESOURCE");

            const put = os.put(record);

            put.onsuccess = () => {
                // @ts-ignore
                resolve();
            };
        };
    });
};

/**
 *
 * @param props
 * @returns
 */
export const useResource = (props: UseResourceProps) => {
    const { theme } = useTheme();
    const setRecource = useSetRecoilState(resourceState);

    const { defaultSchema } = props;

    useEffect(() => {
        const promises = defaultSchema.reduce((prev: any, { area, comnCd }) => {
            const promise = new Promise(async (resolve, reject) => {
                const key = getResourceKey(area, comnCd, theme.lang);

                const get = () =>
                    new Promise(async (resolve2, reject2) => {
                        try {
                            const now = new Date();
                            let RESOURCE: any = await getResourceFromIDB(key);

                            let STATUS;
                            if (!RESOURCE) STATUS = "NONE";
                            else if (now.getTime() - RESOURCE.updated.getTime() > RENEWAL_CYCLE) STATUS = "EXPIRATION";
                            else resolve({ [key]: RESOURCE });

                            const code = await utils.getCode({ area, comnCd });
                            const value = Object.values<any>(code.data)?.[0]?.content || [];

                            if (STATUS === "NONE") {
                                const record = { key, value, created: now, updated: now };
                                await addResourceToIDB(record);
                                RESOURCE = record;
                            }
                            if (STATUS === "EXPIRATION") {
                                const record = { ...RESOURCE, value, updated: now };
                                await putResourceToIDB(record);
                                RESOURCE = record;
                            }

                            resolve2(RESOURCE);
                        } catch (error) {
                            reject2();
                        }
                    });

                try {
                    resolve({ [key]: await get() });
                } catch (error) {
                    reject({ [key]: get });
                }
            });

            prev.push(promise);
            return prev;
        }, []);

        (async () => {
            const resource = await Promise.allSettled(promises);
            const fulfilled = resource
                .filter(({ status }) => status === "fulfilled")
                .map(({ value }: any) => value)
                .reduce((prev, curr) => {
                    return { ...prev, ...curr };
                }, {});
            const rejected = resource.filter(({ status }) => status === "rejected");

            setRecource(fulfilled);
        })();
    }, []);

    return null;
};
