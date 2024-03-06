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
    const setRecource = useSetRecoilState(resourceState);

    useEffect(() => {
        (async () => {
            let resources: any[] = [];
            const current = new Date();

            const resourceFromIDB = await new Promise<any>((resolve1) => {
                const request = indexedDB.open("TANCIS");
                request.onupgradeneeded = () => {
                    const db = request.result;
                    db.createObjectStore("RESOURCE", { keyPath: "key" });
                };
                request.onsuccess = async () => {
                    try {
                        const db = request.result;
                        const ts = db.transaction("RESOURCE", "readonly");
                        const os = ts.objectStore("RESOURCE");

                        const promises = Object.keys(_schema).map((key) => {
                            return new Promise<any>((resolve2) => {
                                const idbKey = key + `;${theme.lang}`;
                                const get = os.get(idbKey);

                                get.onsuccess = () => {
                                    const record = {
                                        key,
                                        idbKey,
                                        schema: _schema[key],
                                        value: get.result,
                                    };

                                    resolve2(record);
                                };
                                get.onerror = () => {
                                    /* !!! */
                                };
                            });
                        });
                        resolve1(
                            (await Promise.allSettled(promises)).map((_) => {
                                if (_.status === "fulfilled") return _.value;
                            }),
                        );
                    } catch (error) {}
                };
                request.onerror = () => {
                    /* !!! */
                };
            });

            const hasValue = resourceFromIDB.filter(({ value }: any) => value !== undefined);

            resources.push(
                ...hasValue
                    .filter(({ value }: any) => {
                        return current.getTime() - value.updated.getTime() <= RENEWAL_CYCLE;
                    })
                    .map(({ value }: any) => value),
            );

            const shouldCreate = resourceFromIDB
                .filter(({ value }: any) => value === undefined)
                .map((_: any) => ({ ..._, type: "create" }));

            const shouldUpdate = hasValue
                .filter(({ value }: any) => {
                    return current.getTime() - value.updated.getTime() > RENEWAL_CYCLE;
                })
                .map((_: any) => ({ ..._, type: "update" }));

            const shouldFetch = [...shouldCreate, ...shouldUpdate];

            if (shouldFetch.length) {
                const settled = (
                    await Promise.allSettled(
                        shouldFetch.map(({ schema: { area, comnCd } }: any) => {
                            return utils.getCode({ area, comnCd });
                        }),
                    )
                )
                    .map((_, index) => {
                        const item = { ...shouldFetch[index] };
                        if (_.status === "fulfilled") {
                            item.value = Object.values<any>(_.value.data)?.[0]?.content || [];
                        } else {
                            item.value = undefined;
                        }
                        return item;
                    })
                    .filter(({ value }) => value !== undefined);

                if (settled.length) {
                    resources.push(
                        ...(await new Promise<any>((resolve) => {
                            const request = indexedDB.open("TANCIS");
                            request.onsuccess = async () => {
                                try {
                                    const db = request.result;
                                    const ts = db.transaction("RESOURCE", "readwrite");
                                    const os = ts.objectStore("RESOURCE");

                                    const promises = settled.map(({ idbKey, value, type }) => {
                                        return new Promise<any>((resolve) => {
                                            if (type === "create") {
                                                const record = {
                                                    key: idbKey,
                                                    created: current,
                                                    updated: current,
                                                    value,
                                                };
                                                const add = os.add(record);
                                                add.onsuccess = () => resolve(record);
                                            }

                                            if (type === "update") {
                                                const get = os.get(idbKey);
                                                get.onsuccess = () => {
                                                    const record = { ...get.result, updated: current, value };
                                                    const put = os.put(record);
                                                    put.onsuccess = () => resolve(record);
                                                };
                                            }
                                        });
                                    });

                                    resolve(
                                        (await Promise.allSettled(promises)).map((_) => {
                                            if (_.status === "fulfilled") return _.value;
                                        }),
                                    );
                                } catch (error) {}
                            };
                        })),
                    );
                }
            }

            setRecource((prev: any) => ({
                ...prev,
                ...resources.reduce((prev: any, curr: any) => {
                    return { ...prev, [curr.key]: curr };
                }, {}),
            }));
        })();
    }, [theme.lang]);

    return null;
};
