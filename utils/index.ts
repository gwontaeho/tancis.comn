import lodash from "lodash";
import dayjs from "dayjs";
import { api } from "@/comn";
import {
    /**  */
    formatText,
    formatNumber,
    formatCheckbox,
    formatDate,
    formatTime,
    formatDatetime,
    /** */
    unformatText,
    unformatNumber,
    unformatCheckbox,
    unformatDate,
    unformatTime,
    unformatDatetime,
} from "@/comn/components/_";

export const comnEnvs = {
    base: `${process.env.REACT_APP_BASE}`,
    base_comn: `${process.env.REACT_APP_BASE_COMN}`,
    locale: {
        ko: "ko-KR",
        en: "en-TZ",
        tz: "sw-TZ",
    },
};

type ValidateReturn = {
    error?: { type: string; message: string; errors: Array<any> };
};

export const comnUtils = {
    keyMapping: (row: any, item: any, keys: any) => {
        if (row === undefined || row == null) return row;
        if (keys === undefined || keys == null) return row;

        if (keys.key1 !== undefined) row.key1 = item[keys.key1.binding];
        if (keys.key2 !== undefined) row.key2 = item[keys.key2.binding];
        if (keys.key3 !== undefined) row.key3 = item[keys.key3.binding];
        if (keys.key4 !== undefined) row.key4 = item[keys.key4.binding];
        if (keys.key5 !== undefined) row.key5 = item[keys.key5.binding];

        return row;
    },

    validateBySchema: (data: any, schema: any, resource: any, keys?: any) => {
        let errors: Array<any> = [];
        let _data = data.data;
        let _labels = data.schema.labels;

        //console.log(keys);

        _data.forEach((item: any, index: number) => {
            Object.entries(item).forEach(([k, v]: any) => {
                let r: any = comnUtils.getValidatedValue(v, schema[k], resource);
                if (r !== undefined)
                    errors.push({
                        row: index + 1,
                        label: _labels[k],
                        ...comnUtils.keyMapping(r, item, keys),
                    });
            });
        });

        return errors;
    },
    setSchemaMatrix: (schema: any) => {
        if (schema === undefined || comnUtils.isEmpty(schema) || comnUtils.isEmptyObject(schema)) {
            return null;
        }

        let t: { [key: string]: any } = {};
        if (lodash.isArray(schema)) {
            schema.forEach((item: any) => {
                if (item.cells === undefined || comnUtils.isEmptyArray(item)) return false;
                item.cells.forEach((cell: any) => {
                    if (cell.binding === undefined || comnUtils.isEmpty(cell.binding)) return false;
                    t[cell.binding] = {};
                    if (cell.required !== undefined) t[cell.binding].required = cell.required;
                    if (cell.min !== undefined) t[cell.binding].min = cell.min;
                    if (cell.max !== undefined) t[cell.binding].max = cell.max;
                    if (cell.minLength !== undefined) t[cell.binding].minLength = cell.minLength;
                    if (cell.maxLength !== undefined) t[cell.binding].maxLength = cell.maxLength;
                    if (cell.pattern !== undefined) t[cell.binding].pattern = cell.pattern;
                    if (cell.validate !== undefined) t[cell.binding].validate = cell.validate;
                    if (cell.area !== undefined) t[cell.binding].area = cell.area;
                    if (cell.comnCd !== undefined) t[cell.binding].comnCd = cell.comnCd;
                });
            });
        }
        return t;
    },
    validateForGrid: (data: any, schema: any, resource: any, keys?: any) => {
        let _schema = comnUtils.setSchemaMatrix(schema);
        if (_schema === null || comnUtils.isEmptyObject(_schema)) {
            return {
                result: "fail",
                error: { type: "no-schema", message: "msg.com.00003", errors: [] },
            };
        }

        const errors = comnUtils.validateBySchema(data, _schema, resource, keys);
        if (comnUtils.isEmptyArray(errors)) {
            return {
                result: "success",
                error: { type: "success", message: "msg.com.00016", errors: [] },
            };
        } else {
            return {
                result: "fail",
                error: { type: "fail-validation", message: "msg.com.00014", errors: errors, head: keys },
            };
        }
    },
    getViewValue: (v: any, o?: any, l?: any) => {
        switch (o?.type) {
            case "text":
                return formatText(v, o);
            case "number":
                return formatNumber(v, o);
            case "checkbox":
                return unformatCheckbox(v, o);
            case "date":
                return unformatDate(v, o);
            case "time":
                return unformatTime(v, o);
            case "datetime":
                return unformatDatetime(v, o);
        }
        return v;
    },
    getFormattedValue: (v: any, o?: any) => {
        switch (o?.type) {
            case "text":
                return formatText(v, o);
            case "number":
                return formatNumber(v, o);
            case "checkbox":
                return formatCheckbox(v);
            case "date":
                return formatDate(v);
            case "time":
                return formatTime(v);
            case "datetime":
                return formatDatetime(v);
        }
        return v;
    },
    getUnformattedValue: (v: any, o?: any) => {
        switch (o?.type) {
            case "text":
                return unformatText(v, o);
            case "number":
                return unformatNumber(v, o);
            case "checkbox":
                return unformatCheckbox(v, o);
            case "date":
                return unformatDate(v, o);
            case "time":
                return unformatTime(v, o);
            case "datetime":
                return unformatDatetime(v, o);
        }
        return v;
    },
    getValidatedValue: (v: any, o?: any, resource?: any) => {
        const t = comnUtils.getValidateObject(o);
        if (o?.required) {
            if (!v) {
                return { message: t.required.message, type: "required", schema: t };
            }
        }
        if (o?.min) {
            if (v < t.min.value) {
                return { message: t.min.message, type: "min", schema: t };
            }
        }
        if (o?.max) {
            if (v > t.max.value) {
                return { message: t.max.message, type: "max", schema: t };
            }
        }
        if (o?.minLength) {
            if (v?.length < t.minLength.value) {
                return { message: t.minLength.message, type: "minLength", schema: t };
            }
        }
        if (o?.maxLength) {
            if (v?.length > t.maxLength.value) {
                return { message: t.maxLength.message, type: "maxLength", schema: t };
            }
        }
        if (o?.pattern) {
            if (!t.pattern.value.test(v)) {
                return { message: t.pattern.message, type: "pattern", schema: t };
            }
        }
        if (o?.validate) {
            if (!t.validate.value(v)) {
                return { message: t.validate.message, type: "validate", schema: t };
            }
        }

        if (o?.area && resource?.[t.area.value] && resource[t.area.value].options) {
            let index = lodash.findIndex(resource[t.area.value].options, { value: v });
            if (index === -1) {
                return { message: t.area.message, type: "resource", schema: t };
            }
        }
    },
    //#endregion
    getValidateObject: (o?: any) => {
        let t: any = {};

        if (o === undefined || o === null) return o;
        if (o.required !== undefined && typeof o.required !== "object") {
            t.required = {
                value: o.required,
                message: "msg.com.00005",
                type: "required",
            };
        }
        if (o.min !== undefined && typeof o.min !== "object") {
            t.min = {
                value: o.min,
                message: "msg.com.00006",
                type: "min",
            };
        }
        if (o.max !== undefined && typeof o.max !== "object") {
            t.max = {
                value: o.max,
                message: "msg.com.00007",
                type: "max",
            };
        }
        if (o.minLength !== undefined && typeof o.minLength !== "object") {
            t.minLength = {
                value: o.minLength,
                message: "msg.com.00008",
                type: "minLength",
            };
        }

        if (o.maxLength !== undefined && typeof o.maxLength !== "object") {
            t.maxLength = {
                value: o.maxLength,
                message: "msg.com.00009",
                type: "maxLength",
            };
        }

        if (o.pattern !== undefined && o.pattern instanceof RegExp) {
            t.pattern = {
                value: o.pattern,
                message: "msg.com.00010",
                type: "pattern",
            };
        }

        if (o.validate !== undefined && typeof o.validate !== "object") {
            t.validate = {
                value: o.validate,
                message: "msg.com.00011",
                type: "validate",
            };
        }

        if (o.area !== undefined && typeof o.area !== "object") {
            t.area = {
                value: o.area + (o.comnCd ? ":" + o.comnCd : ""),
                message: "msg.com.00017",
                type: "resource",
            };
        }

        return t;
    },
    //#region locale
    getLocale: () => {
        return localStorage.getItem("lang")?.toString() || "en";
    },
    getLocaleString: () => {
        let locale = localStorage.getItem("lang")?.toString() || "en";
        if (locale === "tz") return comnEnvs.locale.tz;
        else if (locale === "en") return comnEnvs.locale.en;
        else return comnEnvs.locale.ko;
    },
    //#endregion

    //#region empty
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
    //#endregion

    getGridData: (content: any) => {
        return {
            //
            content,
            __t: new Date(),
            page: { totalElements: Array.isArray(content) ? content.length : 0 },
        };
    },
    getResourceKey: (area: string, comnCd?: string, lang?: string) => {
        return area + (comnCd ? `:${comnCd}` : "") + (lang ? `;${lang}` : "");
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
                    q: ["Maru", "Sam", "Tom", "Ken"][Math.floor(Math.random() * 4)],
                    w: ["005", "011", "414"][Math.floor(Math.random() * 3)],
                    ww: ["77", "22"][Math.floor(Math.random() * 2)],
                    id: new Date().getTime() + i,
                    a: "a" + Math.random() * 1000,
                    b: "b" + Math.random() * 1000,
                    c: "c" + Math.random() * 1000,
                    d: "d" + Math.random() * 1000,
                    e: "e" + Math.random() * 1000,
                    f: "f" + Math.random() * 1000,
                    g: "g" + Math.random() * 1000,
                    text: ["Maru", "Sam", "Tom", "Ken"][Math.floor(Math.random() * 4)],
                    number: Math.ceil(Math.random() * 1000),
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
            case "wrhsCd":
                url = `/api/v1/intptl/comnppup/wrhs?wrhsOprtTpCd=&coDclaCd=${keyword}&wrhsNm=${keywordName}`;
                break;
            case "test":
                url = `/api/v1/intptl/comnppup/dorg?orgTpCd=01&orgCd=${keyword}&orgNm=${keywordName}`;
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
            case "wrhsCd":
                return code.wrhsNm;
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
            case "wrhsCd":
                return code.coDclaCd;
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
export const idb = {
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
            // const dbs = await indexedDB.databases();
            // if (!dbs.find(({ name }) => name === dname)) {
            //     resolve(undefined);
            //     return;
            // }
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
                // if (!db.objectStoreNames.contains(sname)) {
                //     resolve(undefined);
                //     return;
                // }

                const ts = db.transaction(sname, "readwrite");
                const os = ts.objectStore(sname);

                /**
                 * request update record
                 */
                const getRecord = os.get(key);
                getRecord.onsuccess = () => {
                    const current = new Date();
                    // if (!getRecord.result) {
                    //     console.log("f");
                    //     resolve(undefined);
                    //     return;
                    // }
                    const record = { key, created: current, ...getRecord.result, value, updated: current };
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

export default { envs, utils, idb };
