import { api } from "@/comn";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { WijmoSchemaType } from "@/comn/hooks";
import { TFormSchema } from "@/comn/hooks";

export const BASE = {
    path: `${comnEnvs.base}`,
    nodes: [],
};

export const APIS = {
    getComnCdLst: (data: any, page: number, size: number) => {
        return comnUtils.getCode({
            comnCd: data.comnCd,
            area: "comnCd",
            page: page,
            size: size,
            keyword: data.cdVldVal,
            keywordName: data.cdVldValNm,
            langCd: data.langCd,
        });
    },

    getCityCdLst: (data: any, page: number, size: number) => {
        return comnUtils.getCode({
            area: "cityCd",
            page: page,
            size: size,
            keyword: data.regnCd,
            keywordName: data.regnNm,
            cntyCd: data.cntyCd,
        });
    },

    getPortCdLst: (data: any, page: number, size: number) => {
        return comnUtils.getCode({
            area: "portCd",
            page: page,
            size: size,
            keyword: data.regnCd,
            keywordName: data.regnNm,
            cntyCd: data.cntyCd,
        });
    },

    getCntyCdLst: (data: any, page: number, size: number) => {
        return comnUtils.getCode({
            area: "cntyCd",
            page: page,
            size: size,
            keyword: data.cntyCd,
            keywordName: data.cntyNm,
        });
    },
    getCurrCdLst: (data: any, page: number, size: number) => {
        return comnUtils.getCode({
            area: "currCd",
            page: page,
            size: size,
            keyword: data.currCd,
            keywordName: data.currNm,
        });
    },
    getBnkCdLst: (data: any, page: number, size: number) => {
        return comnUtils.getCode({
            area: "bnkCd",
            page: page,
            size: size,
            keyword: data.cdVldVal,
            keywordName: data.cdVldValNm,
        });
    },
    getPortAirptCdLst: (data: any, page: number, size: number) => {
        return comnUtils.getCode({
            area: "portAirptCd",
            page: page,
            size: size,
            keyword: data.portAirptCd,
            keywordName: data.regnNm,
            cntyCd: data.cntyCd,
            portAirptTpCd: data.portAirptTpCd,
        });
    },
    getAirptCdLst: (data: any, page: number, size: number) => {
        return comnUtils.getCode({
            area: "airptCd",
            page: page,
            size: size,
            keyword: data.portAirptCd,
            keywordName: data.regnNm,
            cntyCd: data.cntyCd,
        });
    },
    getCoCdLst: (data: any, page: number, size: number) => {
        return comnUtils.getCode({
            area: "coCd",
            page: page,
            size: size,
            keyword: data.tin,
            keywordName: data.coNm,
            coTpCd: data.coTpCd,
        });
    },
    getPrcssStatCdLst: (data: any, page: number, size: number) => {
        return comnUtils.getCode({
            area: "prcssStatCd",
            page: page,
            size: size,
            keyword: data.item,
            keywordName: data.itemNm,
        });
    },
    getOrgCdLst: (data: any, page: number, size: number) => {
        return comnUtils.getCode({
            area: "orgCd",
            page: page,
            size: size,
            keyword: data.orgCd,
            keywordName: data.orgNm,
        });
    },
};

export const SCHEMA_GRID_COMN_CD: WijmoSchemaType = {
    id: "grid",
    options: { pagination: "out", isReadOnly: true },
    head: [
        { cells: [{ header: "L_COMN_CD", binding: "comnCd" }] },
        { cells: [{ header: "L_CD_VLD_VAL", binding: "cdVldVal" }] },
        { cells: [{ header: "L_CD_VLD_VAL_NM", binding: "cdVldValNm" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "comnCd",
                    width: 150,
                },
            ],
        },
        {
            cells: [
                {
                    binding: "cdVldVal",
                    width: 150,
                },
            ],
        },
        {
            cells: [{ binding: "cdVldValNm", width: "*" }],
        },
    ],
};

export const SCHEMA_GRID_CNTY_CD: WijmoSchemaType = {
    id: "grid",
    options: { pagination: "out", isReadOnly: true },
    head: [
        { cells: [{ header: "L_CNTY_CD", binding: "cntyCd" }] },
        { cells: [{ header: "L_CNTY_NM", binding: "cntyNm" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "cntyCd",
                    width: 150,
                },
            ],
        },
        {
            cells: [{ binding: "cntyNm", width: "*" }],
        },
    ],
};

export const SCHEMA_GRID_CITY_CD: WijmoSchemaType = {
    id: "grid",
    options: { pagination: "out", isReadOnly: true },
    head: [
        { cells: [{ header: "L_REGN_CD", binding: "regnCd" }] },
        { cells: [{ header: "L_REGN_NM", binding: "regnNm" }] },
        { cells: [{ header: "L_CNTY_CD", binding: "cntyCd" }] },
        { cells: [{ header: "L_CITY_STAT_CD", binding: "cityStatCd" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "regnCd",
                    width: 150,
                },
            ],
        },
        {
            cells: [{ binding: "regnNm", width: 200 }],
        },
        {
            cells: [{ binding: "cntyCd", width: "*" }],
        },
        {
            cells: [{ binding: "cityStatCd", width: 150 }],
        },
    ],
};

export const SCHEMA_GRID_PORT_CD: WijmoSchemaType = {
    id: "grid",
    options: { pagination: "out", isReadOnly: true },
    head: [
        { cells: [{ header: "L_PORT_CD", binding: "regnCd" }] },
        { cells: [{ header: "L_REGN_NM", binding: "regnNm" }] },
        { cells: [{ header: "L_CNTY_CD", binding: "cntyCd" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "regnCd",
                    width: 150,
                },
            ],
        },
        {
            cells: [{ binding: "regnNm", width: "*" }],
        },
        {
            cells: [{ binding: "cntyCd", width: 150 }],
        },
    ],
};

export const SCHEMA_GRID_AIRPT_CD: WijmoSchemaType = {
    id: "grid",
    options: { pagination: "out", isReadOnly: true },
    head: [
        { cells: [{ header: "L_AIRPT_CD", binding: "regnCd" }] },
        { cells: [{ header: "L_REGN_NM", binding: "regnNm" }] },
        { cells: [{ header: "L_CNTY_CD", binding: "cntyCd" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "regnCd",
                    width: 150,
                },
            ],
        },
        {
            cells: [{ binding: "regnNm", width: "*" }],
        },
        {
            cells: [{ binding: "cntyCd", width: 150 }],
        },
    ],
};

export const SCHEMA_GRID_PORT_AIRPT_CD: WijmoSchemaType = {
    id: "grid",
    options: { pagination: "out", isReadOnly: true },
    head: [
        { cells: [{ header: "L_PORT_AIRPT_CD", binding: "regnCd" }] },
        { cells: [{ header: "L_REGN_NM", binding: "regnNm" }] },
        { cells: [{ header: "L_CNTY_CD", binding: "cntyCd" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "regnCd",
                    width: 150,
                },
            ],
        },
        {
            cells: [{ binding: "regnNm", width: "*" }],
        },
        {
            cells: [{ binding: "cntyCd", width: 150 }],
        },
    ],
};

export const SCHEMA_GRID_CURR_CD: WijmoSchemaType = {
    id: "grid",
    options: { pagination: "out", isReadOnly: true },
    head: [
        { cells: [{ header: "L_CURR_CD", binding: "currCd" }] },
        { cells: [{ header: "L_CURR_NM", binding: "currNm" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "currCd",
                    width: 150,
                },
            ],
        },
        {
            cells: [{ binding: "currNm", width: "*" }],
        },
    ],
};

export const SCHEMA_GRID_BNK_CD: WijmoSchemaType = {
    id: "grid",
    options: { pagination: "in", isReadOnly: true },
    head: [
        { cells: [{ header: "L_CD_VLD_VAL", binding: "cdVldVal" }] },
        { cells: [{ header: "L_CD_VLD_VAL_NM", binding: "cdVldValNm" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "cdVldVal",
                    width: 200,
                },
            ],
        },
        {
            cells: [{ binding: "cdVldValNm", width: "*" }],
        },
    ],
};

export const SCHEMA_GRID_CO_CD: WijmoSchemaType = {
    id: "grid",
    options: { pagination: "out", isReadOnly: true },
    head: [
        { cells: [{ header: "L_TIN", binding: "coTin" }] },
        { cells: [{ header: "L_CO_NM", binding: "coNm" }] },
        { cells: [{ header: "L_CO_ADDR", binding: "coAddr" }] },
        { cells: [{ header: "L_CO_STAT", binding: "coStatCdNm" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "coTin",
                    width: 150,
                },
            ],
        },
        {
            cells: [{ binding: "coNm", width: 150 }],
        },
        {
            cells: [{ binding: "coAddr", width: "*" }],
        },
        {
            cells: [{ binding: "coStatCdNm", width: 100 }],
        },
    ],
};

export const SCHEMA_GRID_PRCSS_STAT_CD: WijmoSchemaType = {
    id: "grid",
    options: { pagination: "out", isReadOnly: true },
    head: [
        { cells: [{ header: "L_BSOP_PRCSS_STAT", binding: "prcssStatCdNm" }] },
        { cells: [{ header: "L_PRCSS_STAT_CD", binding: "item" }] },
        { cells: [{ header: "L_PRCSS_STAT", binding: "itemNm" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "prcssStatCdNm",
                    width: 250,
                },
            ],
        },
        {
            cells: [{ binding: "item", width: 150 }],
        },
        {
            cells: [{ binding: "itemNm", width: "*" }],
        },
    ],
};

export const SCHEMA_GRID_ORG_CD: WijmoSchemaType = {
    id: "grid",
    options: { pagination: "out", isReadOnly: true },
    head: [
        { cells: [{ header: "L_ORG_CD", binding: "orgCd" }] },
        { cells: [{ header: "L_ORG_NM", binding: "orgNm" }] },
        { cells: [{ header: "L_ORG_ADDR", binding: "orgAddr" }] },
        { cells: [{ header: "L_RPRS_TLPN_NO", binding: "rprsTlphNo" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "orgCd",
                    width: 150,
                },
            ],
        },
        {
            cells: [{ binding: "orgNm", width: 200 }],
        },
        {
            cells: [{ binding: "orgAddr", width: "*" }],
        },
        {
            cells: [{ binding: "rprsTlphNo", width: 200 }],
        },
    ],
};

export const SCHEMA_FORM_COMN_CD_SRCH: TFormSchema = {
    id: "form",
    schema: {
        comnCd: { type: "text", label: "L_COMN_CD", required: true },
        cdVldVal: { type: "text", label: "L_CD_VLD_VAL" },
        cdVldValNm: { type: "text", label: "L_CD_VLD_VAL_NM" },
        langCd: {
            type: "select",
            label: "L_LANG_CD",
            required: true,
            options: [
                { label: "L_SW", value: "SW" },
                { label: "L_EN", value: "EN" },
                { label: "L_KO", value: "KO" },
            ],
        },
    },
};

export const SCHEMA_FORM_CNTY_CD_SRCH: TFormSchema = {
    id: "form",
    schema: {
        cntyCd: { type: "text", label: "L_CNTY_CD" },
        cntyNm: { type: "text", label: "L_CNTY_NM" },
    },
};

export const SCHEMA_FORM_CITY_CD_SRCH: TFormSchema = {
    id: "form",
    schema: {
        cntyCd: { type: "code", label: "L_CNTY_CD", area: "cntyCd", popupSize: "sm" },
        regnNm: { type: "text", label: "L_REGN_NM" },
        regnCd: {
            type: "text",
            label: "L_REGN_CD",
        },
    },
};

export const SCHEMA_FORM_PORT_CD_SRCH: TFormSchema = {
    id: "form",
    schema: {
        cntyCd: { type: "code", label: "L_CNTY_CD", area: "cntyCd" },
        regnNm: { type: "text", label: "L_REGN_NM" },
        regnCd: { type: "text", label: "L_PORT_CD" },
    },
};

export const SCHEMA_FORM_AIRPT_CD_SRCH: TFormSchema = {
    id: "form",
    schema: {
        cntyCd: { type: "code", label: "L_CNTY_CD", area: "cntyCd" },
        regnNm: { type: "text", label: "L_REGN_NM" },
        regnCd: { type: "text", label: "L_AIRPT_CD" },
    },
};

export const SCHEMA_FORM_PORT_AIRPT_CD_SRCH: TFormSchema = {
    id: "form",
    schema: {
        portAirptTpCd: {
            type: "select",
            label: "L_PORT_AIRPT_TP",
            required: true,
            options: [
                { label: "L_PORT", value: "PORT" },
                { label: "L_AIRPT", value: "AIRPT" },
            ],
        },
        cntyCd: { type: "code", label: "L_CNTY_CD", area: "cntyCd" },
        regnNm: { type: "text", label: "L_REGN_NM" },
        regnCd: { type: "text", label: "L_PORT_AIRPT_CD" },
    },
};

export const SCHEMA_FORM_CURR_CD_SRCH: TFormSchema = {
    id: "form",
    schema: {
        currCd: { type: "text", label: "L_CURR_CD" },
        currNm: { type: "text", label: "L_CURR_NM" },
    },
};

export const SCHEMA_FORM_BNK_CD_SRCH: TFormSchema = {
    id: "form",
    schema: {
        cdVldVal: { type: "text", label: "L_BNK_CD" },
        cdVldValNm: { type: "text", label: "L_BNK_NM" },
    },
};

export const SCHEMA_FORM_CO_CD_SRCH: TFormSchema = {
    id: "form",
    schema: {
        coTin: { type: "text", label: "L_TIN" },
        coNm: { type: "text", label: "L_CO_NM" },
        coTpCd: {
            type: "select",
            label: "L_CO_PT",
            required: true,
            options: [
                { label: "L_CO", value: "C" },
                { label: "L_PSN", value: "P" },
            ],
        },
    },
};

export const SCHEMA_FORM_PRCSS_STAT_CD_SRCH: TFormSchema = {
    id: "form",
    schema: {
        item: { type: "text", label: "L_PRCSS_STAT_CD" },
        itemNm: { type: "text", label: "L_PRCSS_STAT" },
    },
};

export const SCHEMA_FORM_ORG_CD_SRCH: TFormSchema = {
    id: "form",
    schema: {
        orgCd: { type: "text", label: "L_ORG_CD" },
        orgNm: { type: "text", label: "L_ORG_NM" },
    },
};
