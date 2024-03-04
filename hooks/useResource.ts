import { useRef, useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";

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

const getResouceFromIDB = async (schema: Record<string, any>, lang: string) => {
    return new Promise<any>((resolve) => {
        const request = indexedDB.open("TANCIS");
        request.onsuccess = async () => {
            const db = request.result;
            const ts = db.transaction("RESOURCE", "readonly");
            const os = ts.objectStore("RESOURCE");
            const promises = Object.keys(schema).map((key) => {
                return new Promise<any>((resolve) => {
                    const idbKey = key + `;${lang}`;
                    const get = os.get(idbKey);

                    get.onsuccess = () => resolve({ key, idbKey, schema: schema[key], value: get.result });
                    get.onerror = () => resolve({ key, idbKey, schema: schema[key], value: undefined });
                });
            });

            resolve(
                (await Promise.allSettled(promises)).map((_) => {
                    if (_.status === "fulfilled") return _.value;
                }),
            );
        };
        request.onerror = () => {
            /* !!! */
        };
    });
};

export const useResource = (props: UseResourceProps) => {
    /*
        1. 확인
        2. 갱신
    */
    const { defaultSchema } = props;
    const { theme } = useTheme();
    const setRecource = useSetRecoilState(resourceState);
    const [_schema, _setSchema] = useState<Record<string, any>>(() => {
        return defaultSchema.reduce((prev, { area, comnCd }) => {
            return { ...prev, [getResourceKey(area, comnCd)]: { area, comnCd } };
        }, {});
    });

    const initialized = useRef(false);
    if (initialized.current === false) {
        (async () => {
            const a = await getResouceFromIDB(_schema, theme.lang);

            const noValue = a.filter(({ value }: any) => value === undefined);
            // const apis = noValue.map(({schema}:any) => )

            console.log(noValue);
        })();

        initialized.current = true;
    }

    useEffect(() => {
        console.log("b");
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

    return { resource: _schema };
};
