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
    viewCheckbox,
    localeDate,
    localeDatetime,
    localeTime,
    viewRadio,
    viewSelect,
} from "@/comn/components/_";
import { BOLD_TEXT, COLOR_TEXT, SIZE_TEXT } from "../features/foundation";

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
        dgt3CntyCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/dgt3CntyCdPpup`,
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
        coCdDtl: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/coCdDtl`,
        hsCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/hsCdPpup`,
        postCd: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/postCdPpup`,
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
            case "radio":
                return v;
            default:
                return formatText(v, s);
        }
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
    /**
     * @param v Value
     * @param o Schema
     * @returns
     */
    getViewValue: (v: any, s?: any) => {
        switch (s?.type) {
            case "text":
                return v;
            case "number":
                return v;
            case "checkbox":
                return viewCheckbox(v, { options: s?.options, viewType: s?.viewType });
            case "select":
                return viewSelect(v, { options: s?.options, viewType: s?.viewType });
            case "date":
                return localeDate(v, comnUtils.getLocale());
            case "time":
                return localeTime(v, comnUtils.getLocale());
            case "datetime":
                return localeDatetime(v, comnUtils.getLocale());
            case "radio":
                return viewRadio(v, s);
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
    getLocale: (): "ko" | "en" | "tz" => {
        if (localStorage.getItem("lang")?.toString() === "ko") return "ko";
        else if (localStorage.getItem("lang")?.toString() === "tz") return "tz";
        return "en";
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
    encodeURI: (str: string) => {
        return encodeURIComponent(str);
    },
    decodeURI: (str: string) => {
        return decodeURIComponent(str);
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
    getViewStyle: (
        color: keyof typeof COLOR_TEXT | undefined,
        bold: keyof typeof BOLD_TEXT | undefined,
        fontSize: keyof typeof SIZE_TEXT | undefined,
    ) => {
        let className = "";
        if (color !== undefined) className += " " + COLOR_TEXT[color];
        if (bold !== undefined) className += " " + BOLD_TEXT[bold];
        if (fontSize !== undefined) className += " text-" + fontSize;
        return className;
    },
    getEditStyle: (color: keyof typeof COLOR_TEXT | undefined, bold: keyof typeof BOLD_TEXT | undefined) => {
        let className = "";
        if (color !== undefined) className += " " + COLOR_TEXT[color];
        if (bold !== undefined) className += " " + BOLD_TEXT[bold];
        return className;
    },
    /////////////////////////////////////////////////////////////////////
    // Resource
    /////////////////////////////////////////////////////////////////////
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
        postTpCd?: string;
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
            postTpCd = "",
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
            case "dgt3CntyCd":
                url = `/api/v1/ptli/intptl/comnppup/dgt3-cnty-cd?dgt3CntyCd=${keyword}&cntyNm=${keywordName}`;
                break;
            case "currCd":
                url = `/api/v1/ptli/intptl/comnppup/curr-cd?currCd=${keyword}&currNm=${keywordName}`;
                break;
            case "bnkCd":
                url = `/api/v1/ptli/intptl/comnppup/comn-cd?comnCd=COM0012&cdVldVal=${keyword}&cdVldValNm=${keywordName}`;
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
                url = `/api/v1/ptli/intptl/comnppup/wrhs?coDclaCd=${keyword}&wrhsNm=${keywordName}&wrhsOprtTpCd=${wrhsOprtTpCd}`;
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
            case "cgmiPrcdCd":
                url = `${process.env.REACT_APP_API_CGMI}/api/v1/cgmi/comn/cd?area=cgmiPrcdCd&comnCd=${comnCd}`;
                break;
            case "cgmeLstCd":
                url = `${process.env.REACT_APP_API_CGME}/api/v1/cgme/comn/cd?area=cgmeLstCd&comnCd=${comnCd}`;
                break;
            case "cgmiLstCd":
                url = `${process.env.REACT_APP_API_CGMI}/api/v1/cgmi/comn/cd?area=cgmiLstCd&comnCd=${comnCd}`;
                break;
            case "hsCd":
                url = `${process.env.REACT_APP_API_CLRI}/api/v1/clri/tm/hs/hs-mgmt/popUp?hsCd=${keyword}&hsDesc=${keywordName}`;
                break;
            case "postCd":
                url = `${process.env.REACT_APP_API_ESWO}/api/v1/eswo/comn/post-cd?postTpCd=${postTpCd}&postCd=${keyword}&postNm=${keywordName}`;
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
            case "dgt3CntyCd":
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
            case "cgmiPrcdCd":
            case "cgmeLstCd":
            case "cgmiLstCd":
                return code.comnCdLbl;
            case "hsCd":
                return code.hsDesc;
            case "postCd":
                return code.wardPostNm + ", " + code.dstrPostNm + ", " + code.regnPostNm;
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
            case "dgt3CntyCd":
                return code.dgt3CntyCd;
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
            case "cgmiPrcdCd":
            case "cgmeLstCd":
            case "cgmiLstCd":
                return code.comnCdVal;
            case "hsCd":
                return code.hsCd;
            case "postCd":
                return code.wardPostCd;
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
    // 배열에 추가 ( array , [ item ] )
    addArray: (arr: Array<any>, append: Array<any>) => {
        arr.push(...append);
    },
    // 배열에 필터링 ( array , { a : 1 } )
    // a 가 1 인 데이터만 리턴
    filterArray: (arr: Array<any>, find: { [key: string]: any }) => {
        return lodash.filter(arr, find);
    },
    // 배열에서 검색 ( array , { a : 1 } )
    // a 가 1 인 데이터의 index 를 리턴 ( 없으면 -1 )
    findArray: (arr: Array<any>, find: { [key: string]: any }) => {
        return lodash.findIndex(arr, find);
    },
    // 배열에서 삭제 ( array , { a : 1 } )
    // a 가 1 인 데이터를 찾아서 삭제
    deleteArray: (arr: Array<any>, find: { [key: string]: any }) => {
        lodash.remove(arr, (item) => {
            return lodash.findIndex([item], find) !== -1;
        });
    },
    // 배열 수정 ( array , { a : 1 } , { a : 1 , b : 2 } )
    // a 가 1 인 데이터를 { a : 1 , b : 2 }로 수정
    updateArray: (arr: Array<any>, find: { [key: string]: any }, update: any) => {
        let index = lodash.findIndex(arr, find);
        if (index > -1) {
            arr[index] = update;
        }
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
