import { api } from "@/comn";
import { comnEnvs, comnUtils } from "@/comn/utils";
import { TFormSchema } from "@/comn/hooks";
import { WijmoSchemaType } from "@/comn/hooks";

export const BASE = {
    path: `${comnEnvs.base_comn}/comn/msg`,
    api: `${process.env.REACT_APP_API_PTLE}/api/v1/comn/comn/msg-lang`,
    nodes: [
        { path: "/", label: "L_MSG_MGMT" },
        { path: "/comn/msg", label: "L_MSG_MGMT" },
    ],
};

export const URLS = {
    msgLangLst: `${BASE.path}/msgLangLst`,
    MsgLangEdit: `${BASE.path}/MsgLangEdit`,
    msgLangDtl: `${BASE.path}/MsgLangDtl`,
    msgLangRgsr: `${BASE.path}/msgLangRgsr`,
};

export const APIS = {
    getMsgLangList: (data: any, page: number, size: number) => {
        return api.get(`${BASE.api}?page=${page}&size=${size}`, {
            params: comnUtils.toGetParams(data),
        });
    },
    getMsgLang: (id: any) => {
        return api.get(`${BASE.api}/${id}`);
    },
    saveMsgLang: (data: any) => {
        return api.post(`${BASE.api}`, {
            ...data,
        });
    },
    deleteMsgLang: (dclrNos: any) => {
        return api.delete(`${BASE.api}/${dclrNos}`);
    },
};

export const SF_MSG_LANG_SRCH: TFormSchema = {
    id: "form_MsgLangSrch",
    schema: {
        msgId: { type: "text", label: "L_MSG_ID", letterCase: "upper" },
        msgCn: { type: "text", label: "L_MSG_CN" },
    },
};

export const SF_MSG_LANG: TFormSchema = {
    id: "form_MsgLang",
    schema: {
        msgId: {
            type: "text",
            label: "L_MSG_ID",
            readOnly: true,
            placeholder: "자동생성",
        },
        msgCnKo: { type: "text", label: "L_MSG_CN_KO", controlSize: 10, required: true },
        msgCnEn: { type: "text", label: "L_MSG_CN_EN", controlSize: 10, required: true },
        msgCnTz: { type: "text", label: "L_MSG_CN_TZ", controlSize: 10, required: true },
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
        frstRegstId: { type: "text", label: "L_FRST_REGST_ID" },
        frstRgsrDtm: { type: "text", label: "L_FRST_RGSR_DTM" },
    },
};

export const SG_MSG_LANG_LIST: WijmoSchemaType = {
    id: "grid_MsgLangList",
    options: { pagination: "out", isReadOnly: true, checkbox: true },
    head: [
        { cells: [{ header: "L_MSG_ID", binding: "msgId" }] },
        { cells: [{ header: "L_MSG_CN_EN", binding: "msgCnEn" }] },
        { cells: [{ header: "L_MSG_CN_TZ", binding: "msgCnTz" }] },
        { cells: [{ header: "L_MSG_CN_KO", binding: "msgCnKo" }] },
        { cells: [{ header: "L_FRST_REGST_ID", binding: "frstRegstId" }] },
        { cells: [{ header: "L_FRST_RGSR_DTM", binding: "frstRgsrDtm" }] },
    ],
    body: [
        {
            cells: [{ binding: "msgId", width: 200 }],
        },
        {
            cells: [{ binding: "msgCnEn", width: 200 }],
        },
        {
            cells: [{ binding: "msgCnTz", width: 200 }],
        },
        {
            cells: [{ binding: "msgCnKo", width: "*" }],
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
