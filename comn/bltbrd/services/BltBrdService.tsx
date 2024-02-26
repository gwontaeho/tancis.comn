import { api } from "@/comn";
import { comnEnvs, comnUtils } from "@/comn/utils";
import { TFormSchema, TGridSchema } from "@/comn/hooks";

export const BASE = {
    path: `${comnEnvs.base_comn}/comn/bltbrd`,
    api: `${process.env.REACT_APP_API_SAMPLE}/api/v1/comn/bltbrd`,
    nodes: [
        { path: "/", label: "L_BLTBRD" },
        { path: "/comn/bltbrd", label: "L_BLTBRD" },
    ],
};

export const URLS = {
    bltbrdLst: `${BASE.path}/bltbrdLst`,
    bltbrdEdit: `${BASE.path}/bltbrdEdit`,
    bltbrdDtl: `${BASE.path}/bltbrdDtl`,
    bltbrdRgsr: `${BASE.path}/bltbrdRgsr`,
};

export const APIS = {
    getBltbrdList: (data: any, page: number, size: number) => {
        return api.get(`${BASE.api}?page=${page}&size=${size}`, {
            params: data,
        });
    },
    getBltbrd: (id: any) => {
        return api.get(`${BASE.api}/${id}`);
    },
    saveBltbrd: (data: any) => {
        return api.post(`${BASE.api}`, {
            ...data,
        });
    },
    deleteBltbrd: (ids: any) => {
        return api.delete(`${BASE.api}/${ids}`);
    },
};

export const SF_BLTBRD_SRCH: TFormSchema = {
    id: "form_bltbrdSrch",
    schema: {
        ttle: { type: "text", label: "L_TTLE" },
        cn: { type: "text", label: "L_CN" },
        frstRgsrDtmRnge: {
            type: "daterange",
            label: "L_RGSR_DT",
            start: { name: "strtDt" },
            end: { name: "endDt" },
            rangeButton: 0,
            controlSize: 10,
        },
    },
};

export const SF_BLTBRD: TFormSchema = {
    id: "form_bltbrd",
    schema: {
        ttle: { type: "text", label: "L_TTLE", required: true },
        cn: { type: "editor", label: "L_CN", required: true, height: 300 },
        selcNo: { type: "number", label: "L_SELC_NO", edit: false },
        frstRegstId: { type: "text", label: "L_FRST_REGST_ID", edit: false },
        frstRgsrDtm: { type: "text", label: "L_FRST_RGSR_DTM", edit: false },
    },
};

export const SG_BLTBRD_LIST: TGridSchema = {
    id: "grid_bltbrdList",
    options: { pagination: "out", index: true },
    head: [
        { cells: [{ header: "L_TTLE", binding: "ttle", width: "*" }] },
        { cells: [{ header: "L_SELC_NO", binding: "selcNo", width: 100 }] },
        { cells: [{ header: "L_FRST_REGST_ID", binding: "frstRegstId", width: 150 }] },
        { cells: [{ header: "L_FRST_RGSR_DTM", binding: "frstRgsrDtm", width: 250 }] },
    ],
    body: [
        { cells: [{ binding: "ttle", align: "left" }] },
        { cells: [{ binding: "selcNo" }] },
        { cells: [{ binding: "frstRegstId" }] },
        { cells: [{ binding: "frstRgsrDtm" }] },
    ],
};
