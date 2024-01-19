import { api } from "@/comn";
import { comnEnvs, comnUtils } from "@/comn/utils";
import { cgmUtils, cgmEnvs } from "@/tra/tancis/cgme/comn"; // 시스템 공통 유틸
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
