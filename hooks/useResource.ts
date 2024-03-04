import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

import { resourceState } from "../features/recoil";
import { utils, idb } from "@/comn/utils";
import { useTheme } from "@/comn/hooks";

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

export const useResource = (props: UseResourceProps) => {
    /*
        1. 확인
        2. 갱신
    */
    const { defaultSchema } = props;
    const _schema: Record<string, any> = defaultSchema.reduce((prev, { area, comnCd }) => {
        return { ...prev, [getResourceKey(area, comnCd)]: { area, comnCd } };
    }, {});

    const { theme } = useTheme();
    const [, setRecource] = useRecoilState(resourceState);

    // useEffect(() => {
    //     (async () => {
    //         /* Get Resource From IDB */
    //         const getResouceFromIDB = async () => {
    //             return new Promise<any>((resolve) => {
    //                 const request = indexedDB.open("TANCIS");

    //                 request.onupgradeneeded = () => {
    //                     const db = request.result;
    //                     db.createObjectStore("RESOURCE", { keyPath: "key" });
    //                 };

    //                 request.onsuccess = async () => {
    //                     try {
    //                         const db = request.result;
    //                         const ts = db.transaction("RESOURCE", "readonly");
    //                         const os = ts.objectStore("RESOURCE");
    //                         const promises = Object.keys(_schema).map((key) => {
    //                             return new Promise<any>((resolve) => {
    //                                 const idbKey = key + `;${theme.lang}`;
    //                                 const get = os.get(idbKey);

    //                                 get.onsuccess = () => {
    //                                     const record = {
    //                                         key,
    //                                         idbKey,
    //                                         schema: _schema[key],
    //                                         value: get.result,
    //                                     };

    //                                     resolve(record);
    //                                 };
    //                                 get.onerror = () => {
    //                                     /* !!! */
    //                                 };
    //                             });
    //                         });

    //                         resolve(
    //                             (await Promise.allSettled(promises)).map((_) => {
    //                                 if (_.status === "fulfilled") return _.value;
    //                             }),
    //                         );
    //                     } catch (error) {}
    //                 };
    //                 request.onerror = () => {
    //                     /* !!! */
    //                 };
    //             });
    //         };

    //         const current = new Date();
    //         const resourceFromIDB = await getResouceFromIDB();

    //         const hasValue = resourceFromIDB.filter(({ value }: any) => value !== undefined);

    //         const shouldFetch = resourceFromIDB.filter(({ value }: any) => value === undefined);
    //         const shouldUpdate = hasValue.filter(({ value }: any) => current.getTime() - value.updated.getTime() > 500);

    //         let resources = hasValue
    //             .filter(({ value }: any) => current.getTime() - value.updated.getTime() <= 500)
    //             .map(({ value }: any) => value);

    //         console.log(shouldUpdate);

    //         const n = [...shouldFetch, ...shouldUpdate];

    //         if (n.length) {
    //             const nr = (
    //                 await Promise.allSettled(
    //                     n.map(({ schema: { area, comnCd } }: any) => {
    //                         return utils.getCode({ area, comnCd });
    //                     }),
    //                 )
    //             )
    //                 .map((_, index) => {
    //                     const item = n[index];
    //                     if (_.status === "fulfilled") {
    //                         item.value = Object.values<any>(_.value.data)?.[0]?.content || [];
    //                     }
    //                     return item;
    //                 })
    //                 .filter(({ value }) => value !== undefined);

    //             if (nr.length) {
    //                 const addResourceToIDB = () => {
    //                     return new Promise<any>((resolve) => {
    //                         const request = indexedDB.open("TANCIS");
    //                         request.onsuccess = async () => {
    //                             try {
    //                                 const db = request.result;
    //                                 const ts = db.transaction("RESOURCE", "readwrite");
    //                                 const os = ts.objectStore("RESOURCE");
    //                                 const promises = nr.map(({ idbKey, value }) => {
    //                                     return new Promise<any>((resolve) => {
    //                                         const date = new Date();
    //                                         const record = { key: idbKey, created: date, updated: date, value };
    //                                         const add = os.add(record);
    //                                         add.onsuccess = () => resolve(record);
    //                                     });
    //                                 });

    //                                 resolve(
    //                                     (await Promise.allSettled(promises)).map((_) => {
    //                                         if (_.status === "fulfilled") return _.value;
    //                                     }),
    //                                 );
    //                             } catch (error) {}
    //                         };
    //                     });
    //                 };

    //                 resources = [...resources, ...(await addResourceToIDB())];
    //             }
    //         }
    //         console.log(resources);

    //         console.log(
    //             resources.reduce((prev: any, curr: any) => {
    //                 return { ...prev, [curr.key]: curr };
    //             }, {}),
    //         );
    //     })();
    // }, []);

    useEffect(() => {
        // console.log("b");
        // getResouceFromIDB();
        gg();
    }, [theme.lang]);

    const gg = async () => {
        try {
            let keys: any = [];
            const resourceApis = Object.values(_schema).map(({ area, comnCd }) => utils.getCode({ area, comnCd }));

            const r = await Promise.allSettled(resourceApis);

            const next = Object.fromEntries(
                Object.entries(_schema).map(([_, v]: any, i) => {
                    let data = [];
                    let options = [];
                    let reason;

                    const status = r[i].status;
                    if (status === "fulfilled") {
                        keys.push(_);
                        data = Object.values<any>((r[i] as PromiseFulfilledResult<any>).value.data)[0].content || [];
                        options = data.map((code: any) => ({
                            label: utils.getCodeLabel(v.area, code),
                            value: utils.getCodeValue(v.area, code),
                        }));
                    }
                    if (status === "rejected") {
                        reason = (r[i] as PromiseRejectedResult).reason;
                    }
                    return [_, { ...v, status, data, reason, options }];
                }),
            );

            const ir = await Promise.allSettled(
                keys.map((key: any) => {
                    return idb.update("TANCIS", "RESOURCE", key + `;${theme.lang}`, next[key]);
                }),
            );

            const reduced = ir.reduce((p: any, n: any) => {
                return { ...p, [n.value.key]: n.value.updated };
            }, {});

            setRecource((prev: any) => ({ ...prev, ...reduced }));
        } catch (error) {
            console.log(error);
        }
    };

    return {};
};
