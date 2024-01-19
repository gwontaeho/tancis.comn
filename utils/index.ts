import lodash from "lodash";
import dayjs from "dayjs";
import { api } from "@/comn";

export const comnEnvs = {
    base: `${process.env.REACT_APP_BASE}`,
    base_comn: `${process.env.REACT_APP_BASE_COMN}`,
    locale: {
        ko: "ko-KR",
        en: "en-TZ",
        tz: "sw-TZ",
    },
};

export const comnUtils = {
    getLocale: () => {
        return localStorage.getItem("lang")?.toString() || "en";
    },
    getLocaleString: () => {
        let locale = localStorage.getItem("lang")?.toString() || "en";
        if (locale === "tz") return comnEnvs.locale.tz;
        else if (locale === "en") return comnEnvs.locale.en;
        else return comnEnvs.locale.ko;
    },
    isUndefined: (arg: any) => {
        return arg === undefined;
    },
    isNull: (arg: any) => {
        return arg === null || arg === "null";
    },
    isEmptyString: (arg: any) => {
        return arg === "";
    },
    isEmptyArray: (arg: any) => {
        return Array.isArray(arg) && arg.length === 0;
    },
    isEmptyObject: (arg: any) => {
        return lodash.isEmpty(arg);
    },
    replaceEmpty: (arg: any, replace: any = "") => {
        if (comnUtils.isUndefined(arg) || comnUtils.isNull(arg)) {
            return replace;
        }
        return arg;
    },
    getDate: (
        args: string | { date?: Date; y?: number; m?: number; d?: number } = {
            date: new Date(),
            y: 0,
            m: 0,
            d: 0,
        },
    ): Date => {
        if (args === undefined || args === null) return new Date();

        if (typeof args === "string") {
            return dayjs(args).toDate();
        } else {
            const { date, y, m, d } = args;
            let temp = dayjs(date);
            temp = temp
                .set("y", temp.get("y") + (y || 0))
                .set("M", temp.get("M") + (m || 0))
                .set("D", temp.get("D") + (d || 0));
            return temp.toDate();
        }
    },
    findIndex: (array: Array<any>, obj: any) => {
        return lodash.findIndex(array, obj);
    },
    dateToString: (date: Date, format?: any | "date" | "time" | "datetime") => {
        if (date === undefined || date === null) return date;
        return dayjs(date).format(
            format === undefined || format === "date" ? "YYYY-MM-DD" : format === "time" ? "HH:mm" : "YYYY-MM-DD HH:mm",
        );
    },
    toGetParams: (obj: any) => {
        if (lodash.isEmpty(obj)) return obj;

        const _obj = lodash.cloneDeep(obj);
        Object.keys(obj).forEach((key) => {
            if (lodash.isArray(obj[key])) {
                _obj[key] = obj[key].join(",");
            } else {
                _obj[key] = obj[key];
            }
        });

        return _obj;
    },
    toValues: (obj: any) => {
        if (lodash.isEmpty(obj)) return obj;
        const _obj = lodash.cloneDeep(obj);
        Object.keys(obj).forEach((key) => {
            if (typeof obj[key] === "function") {
                _obj[key] = obj[key]();
            } else {
                _obj[key] = obj[key];
            }
        });

        return _obj;
    },
    setValuesFromParams: (form: any, params: any) => {
        form.setValues(params, false);
    },
    isEmpty: (obj: any) => {
        return lodash.isEmpty(obj);
    },
    isPopup: () => {
        const search = new URLSearchParams(window.location.search);
        return search.get("ppup") === "Y" ? true : window.opener ? true : false;
    },
    equals: (first: object, second: object) => {
        return lodash.isEqual(first, second);
    },
    getMockData: ({ totalElements = 99 }) => {
        return {
            page: {
                totalElements,
                page: 0,
                size: 10,
            },
            content: Array(totalElements)
                .fill(null)
                .map((_, i) => ({
                    index: i,
                    q: ["abc", "bob", "tom", "ken"][Math.floor(Math.random() * 4)],
                    id: new Date().getTime() + i,
                    a: "a" + Math.random() * 1000,
                    b: "b" + Math.random() * 1000,
                    c: "c" + Math.random() * 1000,
                    d: "d" + Math.random() * 1000,
                    e: "e" + Math.random() * 1000,
                    f: "f" + Math.random() * 1000,
                    g: "g" + Math.random() * 1000,
                    text: (Math.random() * 1000).toFixed(),
                    number: Math.ceil(Math.random() * 10000000),
                    date: "2022-10-10",
                    time: "11:20:10",
                    datetime: "2022-10-10 10:30:20",
                })),
        };
    },

    getMockDataWithPaging: ({ data = {}, page = 0, size = 10 }: { data: any; page: number; size: number }) => {
        return { ...data, content: lodash.chunk(data.content, size)[page] };
    },
    getMockOptions: (count = 3) => {
        return Array(count)
            .fill(null)
            .map(() => ({ label: (Math.random() * 1000).toFixed(), value: (Math.random() * 1000).toFixed() }));
    },
    getCode: async (args: {
        comnCd?: string;
        keyword?: string;
        keywordName?: string;
        area?: string;
        page?: number;
        size?: number;
        langCd?: string;
        cntyCd?: string;
        portAirptTpCd?: string;
        coTpCd?: string;
    }) => {
        const {
            comnCd,
            area,
            size,
            page = 0,
            keyword = "",
            keywordName = "",
            langCd = "",
            cntyCd = "",
            portAirptTpCd = "",
            coTpCd = "",
        } = args;

        let url = "";
        switch (area) {
            case "comnCd":
                url = `/api/v1/intptl/comnppup/comn-cd?comnCd=${comnCd}&cdVldVal=${keyword}&cdVldValNm=${keywordName}&langCd=${langCd}`;
                break;
            case "cityCd":
                url = `/api/v1/intptl/comnppup/regn/city-cd?regnCd=${keyword}&regnNm=${keywordName}&cntyCd=${cntyCd}`;
                break;
            case "portCd":
                url = `/api/v1/intptl/comnppup/regn/port-cd?regnCd=${keyword}&regnNm=${keywordName}&cntyCd=${cntyCd}`;
                break;
            case "cntyCd":
                url = `/api/v1/intptl/comnppup/cnty-cd?cntyCd=${keyword}&cntyNm=${keywordName}`;
                break;
            case "currCd":
                url = `/api/v1/intptl/comnppup/curr-cd?currCd=${keyword}&currNm=${keywordName}`;
                break;
            case "bnkCd":
                url = `/api/v1/intptl/comnppup/comn-cd?comnCd=CO012&cdVldVal=${keyword}&cdVldValNm=${keywordName}`;
                break;
            case "portAirptCd":
                url = `/api/v1/intptl/comnppup/regn/port-airpt-cd?portAirptTpCd=${portAirptTpCd}&regnCd=${keyword}&regnNm=${keywordName}&cntyCd=${cntyCd}`;
                break;
            case "airptCd":
                url = `/api/v1/intptl/comnppup/regn/airpt-cd?regnCd=${keyword}&regnNm=${keywordName}&cntyCd=${cntyCd}`;
                break;
            case "coCd":
                url = `/api/v1/intptl/comnppup/co?coTpCd=${coTpCd}&coTin=${keyword}&coNm=${keywordName}`;
                break;
            case "prcssStatCd":
                url = `/api/v1/intptl/comnppup/prcss-stat-cd?bsopPrcssStatCd=COM_9000&item=${keyword}&itemNm=${keywordName}`;
                break;
            case "orgCd":
                url = `/api/v1/intptl/comnppup/org?orgTpCd=01&orgCd=${keyword}&orgNm=${keywordName}`;
                break;
            default:
                url = `/api/v1/intptl/comnppup/comn-cd?comnCd=${comnCd}&cdVldVal=${keyword}&cdVldValNm=${keywordName}&langCd=${langCd}`;
                break;
        }

        if (size) url += `&size=${size}`;
        if (page) url += `&page=${page}`;

        return api.get(url);
    },
    getCodeLabel: (area?: string, code?: any) => {
        switch (area) {
            case "comnCd":
                return code.cdVldValNm;
            case "cntyCd":
                return code.cntyNm;
            case "cityCd":
                return code.regnNm;
            case "portCd":
                return code.regnNm;
            case "currCd":
                return code.currNm;
            case "bnkCd":
                return code.cdVldValNm;
            case "portAirptCd":
                return code.regnNm;
            case "airptCd":
                return code.regnNm;
            case "coCd":
                return code.coNm;
            case "prcssStatCd":
                return code.itemNm;
            case "orgCd":
                return code.orgNm;
            default:
                return code.cdVldValNm;
        }
    },
    getCodeValue: (area?: string, code?: any) => {
        switch (area) {
            case "comnCd":
                return code.cdVldVal;
            case "cntyCd":
                return code.cntyCd;
            case "cityCd":
                return code.regnCd;
            case "portCd":
                return code.regnCd;
            case "currCd":
                return code.currCd;
            case "bnkCd":
                return code.cdVldVal;
            case "portAirptCd":
                return code.regnCd;
            case "airptCd":
                return code.regnCd;
            case "coCd":
                return code.coTin;
            case "prcssStatCd":
                return code.item;
            case "orgCd":
                return code.orgCd;
            default:
                return code.cdVldVal;
        }
    },
    getCodeOptions: (area?: string, codes?: any[]) => {
        return (
            codes?.map((code) => {
                return { label: comnUtils.getCodeLabel(area, code), value: comnUtils.getCodeValue(area, code) };
            }) || []
        );
    },
};

type IdbReturn = { key: string; value: any; created: Date; updated: Date } | undefined;
const idb = {
    /**
     * idb select
     * @param dname database name
     * @param sname store name
     * @param key
     * @returns
     */
    get: (dname: string, sname: string, key: string) => {
        return new Promise<IdbReturn>(async (resolve, reject) => {
            const dbs = await indexedDB.databases();
            if (!dbs.find(({ name }) => name === dname)) {
                resolve(undefined);
                return;
            }

            const request = indexedDB.open(dname);

            /**
             * db connected
             */
            request.onsuccess = () => {
                const db = request.result;

                /**
                 * store does not exist
                 */
                if (!db.objectStoreNames.contains(sname)) {
                    resolve(undefined);
                    return;
                }

                const ts = db.transaction(sname, "readwrite");
                const os = ts.objectStore(sname);

                /**
                 * request get record
                 */
                const getRecord = os.get(key);
                getRecord.onsuccess = () => {
                    if (getRecord.result) {
                        resolve(getRecord.result);
                        return;
                    }
                    resolve(undefined);
                    return;
                };
            };
        });
    },
    /**
     * idb insert
     * @param dname database name
     * @param sname store name
     * @param key
     * @param value update value
     * @returns
     */
    create: (dname: string, sname: string, key: string, value: any) => {
        return new Promise<IdbReturn>((resolve, reject) => {
            const request = indexedDB.open(dname);

            request.onupgradeneeded = () => {
                const db = request.result;
                db.createObjectStore(sname, { keyPath: "key" });
            };

            /**
             * db connected
             */
            request.onsuccess = () => {
                const db = request.result;

                /**
                 * store does not exist
                 */
                if (!db.objectStoreNames.contains(sname)) {
                    resolve(undefined);
                    return;
                }

                const ts = db.transaction(sname, "readwrite");
                const os = ts.objectStore(sname);

                /**
                 * request create record
                 */
                const current = new Date();
                const record = { key, value, created: current, updated: current };
                const createRecord = os.add(record);
                createRecord.onsuccess = () => {
                    resolve(record);
                    return;
                };
                createRecord.onerror = () => {
                    resolve(undefined);
                    return;
                };
            };
        });
    },
    /**
     * idb update
     * @param dname database name
     * @param sname store name
     * @param key
     * @param value update value
     * @returns
     */
    update: (dname: string, sname: string, key: string, value: any) => {
        return new Promise<IdbReturn>(async (resolve, reject) => {
            const dbs = await indexedDB.databases();
            if (!dbs.find(({ name }) => name === dname)) {
                resolve(undefined);
                return;
            }

            const request = indexedDB.open(dname);

            /**
             * db connected
             */
            request.onsuccess = () => {
                const db = request.result;

                /**
                 * store does not exist
                 */
                if (!db.objectStoreNames.contains(sname)) {
                    resolve(undefined);
                    return;
                }

                const ts = db.transaction(sname, "readwrite");
                const os = ts.objectStore(sname);

                /**
                 * request update record
                 */
                const getRecord = os.get(key);
                getRecord.onsuccess = () => {
                    if (!getRecord.result) {
                        resolve(undefined);
                        return;
                    }
                    const record = { ...getRecord.result, value, updated: new Date() };
                    const updateRecord = os.put(record);
                    updateRecord.onsuccess = () => {
                        if (updateRecord.result) {
                            resolve(record);
                            return;
                        }
                    };
                };
            };
        });
    },
};

export const envs = comnEnvs;
export const utils = comnUtils;
