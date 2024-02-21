import lodash from "lodash";
import dayjs from "dayjs";

import { api } from "@/comn";
import {
    formatText,
    formatNumber,
    formatCheckbox,
    formatDate,
    formatTime,
    formatDatetime,
    unformatText,
    unformatNumber,
    unformatCheckbox,
    unformatDate,
    unformatTime,
    unformatDatetime,
    unformatCode,
} from "@/comn/components/_";

/**
 * # Common Environment Variables
 *
 */
export const comnEnvs = {
    base: `${process.env.REACT_APP_BASE}`,
    base_comn: `${process.env.REACT_APP_BASE_COMN}`,
    locale: {
        ko: "ko-KR",
        en: "en-TZ",
        tz: "sw-TZ",
    },
    popup: {
        cityCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/cityCdPpup`,
        comnCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/comnCdPpup`,
        cntyCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/cntyCdPpup`,
        currCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/currCdPpup`,
        bnkCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/bnkCdPpup`,
        portCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/portCdPpup`,
        airptCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/airptCdPpup`,
        portAirptCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/portAirptCdPpup`,
        coCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/coCdPpup`,
        prcssStat: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/prcssStatPpup`,
        orgCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/orgCdPpup`,
        wrhsCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/wrhsCdPpup`,
        coDclaCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/coDclaCdPpup`,
        orgDeptCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/orgDeptCdPpup`,
        cstmCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/cstmCdPpup`,
        vhclBodyCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/vhclBodyCdPpup`,
        vhclCtgrCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/vhclCtgrCdPpup`,
        vhclClrCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/vhclClrCdPpup`,
        vhclFlCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/vhclFlCdPpup`,
        vhclMkerCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/vhclMkerCdPpup`,
        vhclImpCntyCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/vhclImpCntyCdPpup`,
        vhclInsrTpCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/vhclInsrTpCdPpup`,
        vhclMdlCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/vhclMdlCdPpup`,
        vhclMdlNoCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/vhclMdlNoCdPpup`,
        vhclHlpnCtgrCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/vhclHlpnCtgrCdPpup`,
        vhclPrplTpCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/vhclPrplTpCdPpup`,
        vhclTrmssnTpCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/vhclTrmssnTpCdPpup`,
        vhclUseCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/vhclUseCdPpup`,
        CoCdDtl: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/CoCdDtl`,
    },
};

/**
 * # Common Utility Functions
 *
 */
export const comnUtils = {
    /////////////////////////////////////////////////////////////////////
    // Value
    /////////////////////////////////////////////////////////////////////
    /**
     * @param v Value
     * @param o Schema
     * @returns
     */
    getFormattedValue: (v: any, s?: any) => {
        switch (s?.type) {
            case "text":
                return formatText(v, s);
            case "number":
                return formatNumber(v, s);
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
    /**
     *
     * @param v Value
     * @param s Schema
     * @returns
     */
    getUnformattedValue: (v: any, s?: any) => {
        switch (s?.type) {
            case "text":
                return unformatText(v, s);
            case "number":
                return unformatNumber(v, s);
            case "checkbox":
                return unformatCheckbox(v, s);
            case "date":
                return unformatDate(v, s);
            case "time":
                return unformatTime(v, s);
            case "datetime":
                return unformatDatetime(v, s);
            case "code":
                return unformatCode(v, s);
        }
        return v;
    },
    /////////////////////////////////////////////////////////////////////
    // Grid
    /////////////////////////////////////////////////////////////////////
    /**
     *
     * @param content Content
     * @returns
     */
    getGridData: (content: Record<string, any>) => {
        return {
            content,
            __t: new Date(),
            page: { totalElements: content.length },
        };
    },
    /////////////////////////////////////////////////////////////////////
    // Locale
    /////////////////////////////////////////////////////////////////////
    getLocale: () => {
        return localStorage.getItem("lang")?.toString() || "en";
    },
    getLocaleString: () => {
        let locale = localStorage.getItem("lang")?.toString() || "en";
        if (locale === "tz") return comnEnvs.locale.tz;
        else if (locale === "en") return comnEnvs.locale.en;
        else return comnEnvs.locale.ko;
    },
    /////////////////////////////////////////////////////////////////////
    //
    /////////////////////////////////////////////////////////////////////
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
    isEmpty: (arg: any) => {
        if (typeof arg === "number") return false;
        return lodash.isEmpty(arg);
    },
    replaceEmpty: (arg: any, replace: any = "") => {
        if (comnUtils.isUndefined(arg) || comnUtils.isNull(arg)) return replace;
        return arg;
    },
    /////////////////////////////////////////////////////////////////////
    // Date
    /////////////////////////////////////////////////////////////////////
    getDate: (
        args: string | { date?: Date; y?: number; m?: number; d?: number; h?: number; mi?: number } = {
            date: new Date(),
            y: 0,
            m: 0,
            d: 0,
            h: 0,
            mi: 0,
        },
    ): Date => {
        if (args === undefined || args === null) return new Date();

        if (typeof args === "string") {
            return dayjs(args).toDate();
        } else {
            const { date, y, m, d, h, mi } = args;
            let temp = dayjs(date);
            temp = temp
                .set("y", temp.get("y") + (y || 0))
                .set("M", temp.get("M") + (m || 0))
                .set("D", temp.get("D") + (d || 0))
                .set("h", temp.get("h") + (h || 0))
                .set("m", temp.get("m") + (mi || 0));
            return temp.toDate();
        }
    },
    compareDate: (a: any, b: any) => {
        if (typeof a === "string") {
            a = dayjs(a).toDate();
        }
        if (typeof b === "string") {
            b = dayjs(b).toDate();
        }
        a = comnUtils.dateToString(a, "date");
        b = comnUtils.dateToString(b, "date");
        if (a > b) return -1;
        if (a < b) return 1;
        if (a === b) return 0;
    },
    compareTime: (a: any, b: any) => {
        if (typeof a === "string") {
            a = dayjs(a).toDate();
        }
        if (typeof b === "string") {
            b = dayjs(b).toDate();
        }
        a = comnUtils.dateToString(a, "time");
        b = comnUtils.dateToString(b, "time");
        if (a > b) return -1;
        if (a < b) return 1;
        if (a === b) return 0;
    },
    compareDatetime: (a: any, b: any) => {
        if (typeof a === "string") {
            a = dayjs(a).toDate();
        }
        if (typeof b === "string") {
            b = dayjs(b).toDate();
        }
        a = comnUtils.dateToString(a, "datetime");
        b = comnUtils.dateToString(b, "datetime");
        if (a > b) return -1;
        if (a < b) return 1;
        if (a === b) return 0;
    },
    dateToString: (date: Date, format?: any | "date" | "time" | "datetime") => {
        return dayjs(date).format(
            format === undefined || format === "date" ? "YYYY-MM-DD" : format === "time" ? "HH:mm" : "YYYY-MM-DD HH:mm",
        );
    },

    findIndex: (array: Array<any>, obj: any) => {
        return lodash.findIndex(array, obj);
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

    isPopup: () => {
        const search = new URLSearchParams(window.location.search);
        return search.get("ppup") === "Y" ? true : window.opener ? true : false;
    },
    equals: (first: object, second: object) => {
        return lodash.isEqual(first, second);
    },
    postMessage: (data: any) => {
        if (window.opener) {
            window.opener.postMessage(data);
        }

        if (window.parent) {
            window.parent.postMessage(data);
        }
    },
    /////////////////////////////////////////////////////////////////////
    // Resource
    /////////////////////////////////////////////////////////////////////
    /**
     *
     * @param area Area
     * @param comnCd Common Code
     * @param lang Locale
     * @returns
     */
    getResourceKey: (area: string, comnCd?: string, lang?: string) => {
        return area + (comnCd ? `:${comnCd}` : "") + (lang ? `;${lang}` : "");
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
        coTin?: string;
        orgNm?: string;
        cstmTpCd?: string;
        vhclMnfcCd?: string;
        vhclMdlCd?: string;
        wrhsOprtTpCd?: string;
    }) => {
        const {
            comnCd,
            area,
            size = 9999,
            page = 0,
            keyword = "",
            keywordName = "",
            langCd = "",
            cntyCd = "",
            portAirptTpCd = "",
            coTpCd = "",
            coTin = "",
            orgNm = "",
            cstmTpCd = "",
            vhclMnfcCd = "",
            vhclMdlCd = "",
            wrhsOprtTpCd = "",
        } = args;

        let url = "";

        switch (area) {
            case "comnCd":
                url = `/api/v1/ptli/intptl/comnppup/comn-cd?comnCd=${comnCd}&cdVldVal=${keyword}&cdVldValNm=${keywordName}&langCd=${langCd}`;
                break;
            case "cityCd":
                url = `/api/v1/ptli/intptl/comnppup/regn/city-cd?regnCd=${keyword}&regnNm=${keywordName}&cntyCd=${cntyCd}`;
                break;
            case "portCd":
                url = `/api/v1/ptli/intptl/comnppup/regn/port-cd?regnCd=${keyword}&regnNm=${keywordName}&cntyCd=${cntyCd}`;
                break;
            case "cntyCd":
                url = `/api/v1/ptli/intptl/comnppup/cnty-cd?cntyCd=${keyword}&cntyNm=${keywordName}`;
                break;
            case "currCd":
                url = `/api/v1/ptli/intptl/comnppup/curr-cd?currCd=${keyword}&currNm=${keywordName}`;
                break;
            case "bnkCd":
                url = `/api/v1/ptli/intptl/comnppup/comn-cd?comnCd=CO012&cdVldVal=${keyword}&cdVldValNm=${keywordName}`;
                break;
            case "portAirptCd":
                url = `/api/v1/ptli/intptl/comnppup/regn/port-airpt-cd?portAirptTpCd=${portAirptTpCd}&regnCd=${keyword}&regnNm=${keywordName}&cntyCd=${cntyCd}`;
                break;
            case "airptCd":
                url = `/api/v1/ptli/intptl/comnppup/regn/airpt-cd?regnCd=${keyword}&regnNm=${keywordName}&cntyCd=${cntyCd}`;
                break;
            case "coCd":
                url = `/api/v1/ptli/intptl/comnppup/co?coTpCd=${coTpCd}&coTin=${keyword}&coNm=${keywordName}`;
                break;
            case "prcssStatCd":
                url = `/api/v1/ptli/intptl/comnppup/prcss-stat-cd?bsopPrcssStatCd=COM_9000&item=${keyword}&itemNm=${keywordName}`;
                break;
            case "orgCd":
                url = `/api/v1/ptli/intptl/comnppup/org?orgTpCd=01&orgCd=${keyword}&orgNm=${keywordName}`;
                break;
            case "wrhsCd":
                url = `/api/v1/ptli/intptl/comnppup/wrhs?wrhsOprtTpCd=&coDclaCd=${keyword}&wrhsNm=${keywordName}&wrhsOprtTpCd=${wrhsOprtTpCd}`;
                break;
            case "test":
                url = `/api/v1/ptli/intptl/comnppup/dorg?orgTpCd=01&orgCd=${keyword}&orgNm=${keywordName}`;
                break;
            case "coDclaCd":
                url = `/api/v1/ptli/intptl/comnppup/co-dcla-cd?coTin=${coTin}&coDclaTpCd=${keyword}&coNm=${keywordName}`;
                break;
            case "orgDeptCd":
                url = `/api/v1/ptli/intptl/comnppup/org-dept?orgNm=${orgNm}&deptCd=${keyword}&deptNm=${keywordName}`;
                break;
            case "cstmCd":
                url = `/api/v1/ptli/intptl/comnppup/cstm?cstmTpCd=${cstmTpCd}&cstmOfceCd=${keyword}&cstmNm=${keywordName}`;
                break;
            case "vhclBodyCd":
                url = `/api/v1/ptli/intptl/comnppup/vhcl/body?vhclBodyTpCd=${keyword}&vhclBodyTpNm=${keywordName}`;
                break;
            case "vhclCtgrCd":
                url = `/api/v1/ptli/intptl/comnppup/vhcl/ctgr?vhclCtgrCd=${keyword}&vhclCtgrNm=${keywordName}`;
                break;
            case "vhclClrCd":
                url = `/api/v1/ptli/intptl/comnppup/vhcl/clr?vhclClrCd=${keyword}&vhclClrNm=${keywordName}`;
                break;
            case "vhclFlCd":
                url = `/api/v1/ptli/intptl/comnppup/vhcl/fl?vhclFlTpCd=${keyword}&vhclFlNm=${keywordName}`;
                break;
            case "vhclMkerCd":
                url = `/api/v1/ptli/intptl/comnppup/vhcl/mker?vhclMnfcCd=${keyword}&vhclMnfcNm=${keywordName}`;
                break;
            case "vhclImpCntyCd":
                url = `/api/v1/ptli/intptl/comnppup/vhcl/imp-cnty?vhclCntyCd=${keyword}&vhclCntyNm=${keywordName}`;
                break;
            case "vhclInsrTpCd":
                url = `/api/v1/ptli/intptl/comnppup/vhcl/insr-tp?vhclInsrTpCd=${keyword}&vhclInsrTpNm=${keywordName}`;
                break;
            case "vhclMdlCd":
                url = `/api/v1/ptli/intptl/comnppup/vhcl/mdl?vhclMnfcCd=${vhclMnfcCd}&vhclMdlCd=${keyword}&vhclMdlNm=${keywordName}`;
                break;
            case "vhclMdlNoCd":
                url = `/api/v1/ptli/intptl/comnppup/vhcl/mdl-no?vhclMnfcCd=${vhclMnfcCd}&vhclMdlCd=${vhclMdlCd}&vhclMdlNoCd=${keyword}&vhclMdlNoNm=${keywordName}`;
                break;
            case "vhclHlpnCtgrCd":
                url = `/api/v1/ptli/intptl/comnppup/vhcl/hlpn-ctgr?vhclHlpnCtgrCd=${keyword}&vhclHlpnCtgrNm=${keywordName}`;
                break;
            case "vhclPrplTpCd":
                url = `/api/v1/ptli/intptl/comnppup/vhcl/prpl-tp?vhclPrplTpCd=${keyword}&vhclPrplTpNm=${keywordName}`;
                break;
            case "vhclTrmssnTpCd":
                url = `/api/v1/ptli/intptl/comnppup/vhcl/trmssn-tp?vhclTrmssnTpCd=${keyword}&vhclTrmssnTpNm=${keywordName}`;
                break;
            case "vhclUseCd":
                url = `/api/v1/ptli/intptl/comnppup/vhcl/use?vhclUseCd=${keyword}&vhclUseNm=${keywordName}`;
                break;
            case "coCdDtl":
                url = `/api/v1/ptli/intptl/comnppup/co/${keyword}`;
                break;
            case "cgmePrcdCd":
                url = `${process.env.REACT_APP_API_CGME}/api/v1/cgme/comn/cd?area=cgmePrcdCd&comnCd=${comnCd}`;
                break;
            default:
                url = `/api/v1/ptli/intptl/comnppup/comn-cd?comnCd=${comnCd}&cdVldVal=${keyword}&cdVldValNm=${keywordName}&langCd=${langCd}`;
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
            case "coDclaCd":
                return code.coNm;
            case "orgDeptCd":
                return code.deptNm;
            case "cstmCd":
                return code.cstmNm;
            case "vhclBodyCd":
                return code.vhclBodyTpNm;
            case "vhclCtgrCd":
                return code.vhclCtgrNm;
            case "vhclClrCd":
                return code.vhclClrNm;
            case "vhclFlCd":
                return code.vhclFlNm;
            case "vhclMkerCd":
                return code.vhclMnfcNm;
            case "vhclImpCntyCd":
                return code.vhclCntyNm;
            case "vhclInsrTpCd":
                return code.vhclInsrTpNm;
            case "vhclMdlCd":
                return code.vhclMdlNm;
            case "vhclMdlNoCd":
                return code.vhclMdlNoNm;
            case "vhclHlpnCtgrCd":
                return code.vhclHlpnCtgrNm;
            case "vhclPrplTpCd":
                return code.vhclPrplTpNm;
            case "vhclTrmssnTpCd":
                return code.vhclTrmssnTpNm;
            case "vhclUseCd":
                return code.vhclUseNm;
            case "cgmePrcdCd":
                return code.comnCdLbl;
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
            case "coDclaCd":
                return code.coDclaCd;
            case "orgDeptCd":
                return code.deptCd;
            case "cstmCd":
                return code.cstmOfceCd;
            case "vhclBodyCd":
                return code.vhclBodyTpCd;
            case "vhclCtgrCd":
                return code.vhclCtgrCd;
            case "vhclClrCd":
                return code.vhclClrCd;
            case "vhclFlCd":
                return code.vhclFlTpCd;
            case "vhclMkerCd":
                return code.vhclMnfcCd;
            case "vhclImpCntyCd":
                return code.vhclCntyCd;
            case "vhclInsrTpCd":
                return code.vhclInsrTpCd;
            case "vhclMdlCd":
                return code.vhclMdlCd;
            case "vhclMdlNoCd":
                return code.vhclMdlNoCd;
            case "vhclHlpnCtgrCd":
                return code.vhclHlpnCtgrCd;
            case "vhclPrplTpCd":
                return code.vhclPrplTpCd;
            case "vhclTrmssnTpCd":
                return code.vhclTrmssnTpCd;
            case "vhclUseCd":
                return code.vhclUseCd;
            case "cgmePrcdCd":
                return code.comnCdVal;
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
/**
 * # Indexed DB
 */
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
            try {
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
            } catch (error) {
                console.log(error);
            }
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
                 * request update record
                 */
                const getRecord = os.get(key);
                getRecord.onsuccess = () => {
                    const current = new Date();
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
