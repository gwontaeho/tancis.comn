import { api } from "@/comn";
import { comnEnvs, comnUtils } from "@/comn/utils";
import { TFormSchema } from "@/comn/hooks";
import { WijmoSchemaType } from "@/comn/hooks";

export const BASE = {
    path: `${comnEnvs.base_comn}/comn/lbl`,
    api: `${process.env.REACT_APP_API_PTLE}/api/v1/comn/comn/lbl-lang`,
    nodes: [
        { path: "/", label: "L_LBL_MGMT" },
        { path: "/comn/lbl", label: "L_LBL_MGMT" },
    ],
};

export const URLS = {
    lblLangLst: `${BASE.path}/lblLangLst`,
    LblLangEdit: `${BASE.path}/LblLangEdit`,
    lblLangDtl: `${BASE.path}/LblLangDtl`,
    lblLangRgsr: `${BASE.path}/lblLangRgsr`,
};

export const APIS = {
    getLblLangList: (data: any, page: number, size: number) => {
        return api.get(`${BASE.api}?page=${page}&size=${size}`, {
            params: comnUtils.toGetParams(data),
        });
    },
    getLblLang: (id: any) => {
        return api.get(`${BASE.api}/${id}`);
    },
    saveLblLang: (data: any) => {
        return api.post(`${BASE.api}`, {
            ...data,
        });
    },
    deleteLblLang: (dclrNos: any) => {
        return api.delete(`${BASE.api}/${dclrNos}`);
    },
};

export const SF_LBL_LANG_SRCH: TFormSchema = {
    id: "form_LblLangSrch",
    schema: {
        lblId: { type: "text", label: "L_LBL_ID", letterCase: "upper" },
        lblNm: { type: "text", label: "L_LBL_NM" },
    },
};

export const SF_LBL_LANG: TFormSchema = {
    id: "form_LblLang",
    schema: {
        lblId: { type: "text", label: "L_LBL_ID", letterCase: "upper", required: true, minLength: 3 },
        lblNmKo: { type: "text", label: "L_LBL_NM_KO", controlSize: 10, required: true },
        lblNmEn: { type: "text", label: "L_LBL_NM_EN", controlSize: 10, required: true },
        lblNmTz: { type: "text", label: "L_LBL_NM_TZ", controlSize: 10, required: true },
        bsopClsfCd: {
            type: "select",
            label: "L_BSOP_CLSF_CD",
            required: true,
            options: [
                { label: "Common", value: "COM" },
                { label: "Portal", value: "PTL" },
                { label: "Cargo", value: "CGM" },
                { label: "Clearance", value: "CLR" },
                { label: "Single Window", value: "ESW" },
            ],
        },
        lblTpCd: {
            type: "select",
            label: "L_LBL_TP_CD",
            select: false,
            required: true,
            options: [
                { label: "Label", value: "L" },
                { label: "Title", value: "T" },
                { label: "Button", value: "B" },
            ],
        },
        frstRegstId: { type: "text", label: "L_FRST_REGST_ID" },
        frstRgsrDtm: { type: "text", label: "L_FRST_RGSR_DTM" },
    },
};

export const SG_LBL_LANG_LIST: WijmoSchemaType = {
    id: "grid_LblLangList",
    options: { pagination: "out", isReadOnly: true, checkbox: true },
    head: [
        { cells: [{ header: "L_LBL_ID", binding: "lblId" }] },
        { cells: [{ header: "L_LBL_NM_EN", binding: "lblNmEn" }] },
        { cells: [{ header: "L_LBL_NM_TZ", binding: "lblNmTz" }] },
        { cells: [{ header: "L_LBL_NM_KO", binding: "lblNmKo" }] },
        { cells: [{ header: "L_FRST_REGST_ID", binding: "frstRegstId" }] },
        { cells: [{ header: "L_FRST_RGSR_DTM", binding: "frstRgsrDtm" }] },
    ],
    body: [
        {
            cells: [{ binding: "lblId", width: 200 }],
        },
        {
            cells: [{ binding: "lblNmEn", width: 200 }],
        },
        {
            cells: [{ binding: "lblNmTz", width: 200 }],
        },
        {
            cells: [{ binding: "lblNmKo", width: "*" }],
        },
        {
            cells: [{ binding: "frstRegstId", width: 150 }],
        },
        {
            cells: [{ binding: "frstRgsrDtm", width: 150 }],
        },
    ],
};

export {};
