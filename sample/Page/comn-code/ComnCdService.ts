import { api } from "@/comn";
import { utils } from "@/comn/utils";
import { FormSchemaType, WijmoSchemaType } from "@/comn/hooks";

export const APIS = {
    getComnCdLst: (data: any, page: number, size: number) => {
        return utils.getCode({
            comnCd: data.comnCd,
            area: "comnCd",
            page: page,
            size: size,
            keyword: data.cdVldVal,
            keywordName: data.cdVldValNm,
        });
    },

    getCityCdLst: (data: any, page: number, size: number) => {
        return utils.getCode({
            area: "cityCd",
            page: page,
            size: size,
            keyword: data.regnCd,
            keywordName: data.regnNm,
            cntyCd: data.cntyCd,
        });
    },

    getPortCdLst: (data: any, page: number, size: number) => {
        return utils.getCode({
            area: "portCd",
            page: page,
            size: size,
            keyword: data.portAirptCd,
            keywordName: data.regnNm,
            cntyCd: data.cntyCd,
        });
    },

    getCntyCdLst: (data: any, page: number, size: number) => {
        return utils.getCode({
            area: "cntyCd",
            page: page,
            size: size,
            keyword: data.cntyCd,
            keywordName: data.cntyNm,
        });
    },
    getCurrCdLst: (data: any, page: number, size: number) => {
        return utils.getCode({
            area: "currCd",
            page: page,
            size: size,
            keyword: data.currCd,
            keywordName: data.currNm,
        });
    },
    getBnkCdLst: (data: any, page: number, size: number) => {
        return utils.getCode({
            area: "bnkCd",
            page: page,
            size: size,
            keyword: data.cdVldVal,
            keywordName: data.cdVldValNm,
        });
    },
    getPortAirptCdLst: (data: any, page: number, size: number) => {
        return utils.getCode({
            area: "portAirptCd",
            page: page,
            size: size,
            keyword: data.portAirptCd,
            keywordName: data.regnNm,
            cntyCd: data.cntyCd,
        });
    },
    getAirptCdLst: (data: any, page: number, size: number) => {
        return utils.getCode({
            area: "airptCd",
            page: page,
            size: size,
            keyword: data.portAirptCd,
            keywordName: data.regnNm,
            cntyCd: data.cntyCd,
        });
    },
    getCoCdLst: (data: any, page: number, size: number) => {
        return utils.getCode({
            area: "airptCd",
            page: page,
            size: size,
            keyword: data.tin,
            keywordName: data.coNm,
        });
    },
    getPrcssStatCdLst: (data: any, page: number, size: number) => {
        return utils.getCode({
            area: "prcssStatCd",
            page: page,
            size: size,
            keyword: data.item,
            keywordName: data.prcssStatCdNm,
        });
    },
    getOrgCdLst: (data: any, page: number, size: number) => {
        return utils.getCode({
            area: "orgCd",
            page: page,
            size: size,
            keyword: data.orgCd,
            keywordName: data.orgNm,
        });
    },
};

export const SCHEMA_GRID_COMN_CD = (clickEvent: any): WijmoSchemaType => {
    return {
        id: "grid",
        options: { pagination: "in", isReadOnly: true },
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
                        onClick: (ctx: any) => {
                            console.log(ctx);
                            clickEvent(ctx);
                        },
                    },
                ],
            },
            {
                cells: [{ binding: "cdVldVal" }],
            },
            {
                cells: [{ binding: "cdVldValNm" }],
            },
        ],
    };
};

export const SCHEMA_GRID_CNTY_CD = (clickEvent: any): WijmoSchemaType => {
    return {
        id: "grid",
        options: { pagination: "in", isReadOnly: true },
        head: [
            { cells: [{ header: "L_CNTY_CD", binding: "cntyCd" }] },
            { cells: [{ header: "L_CNTY_NM", binding: "cntyNm" }] },
        ],
        body: [
            {
                cells: [
                    {
                        binding: "cntyCd",
                        onClick: (ctx: any) => {
                            clickEvent(ctx);
                        },
                    },
                ],
            },
            {
                cells: [{ binding: "cntyNm" }],
            },
        ],
    };
};

export const SCHEMA_GRID_CITY_CD = (clickEvent: any): WijmoSchemaType => {
    return {
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
                        onClick: (ctx: any) => {
                            clickEvent(ctx);
                        },
                        width: 150,
                    },
                ],
            },
            {
                cells: [{ binding: "regnNm", width: 200 }],
            },
            {
                cells: [{ binding: "cntyCd", width: 150 }],
            },
            {
                cells: [{ binding: "cityStatCd", width: 150 }],
            },
        ],
    };
};

export const SCHEMA_GRID_PORT_CD = (clickEvent: any): WijmoSchemaType => {
    return {
        id: "grid",
        options: { pagination: "out", isReadOnly: true },
        head: [
            { cells: [{ header: "L_PORT_CD", binding: "portAirptCd" }] },
            { cells: [{ header: "L_REGN_NM", binding: "regnNm" }] },
            { cells: [{ header: "L_CNTY_CD", binding: "cntyCd" }] },
        ],
        body: [
            {
                cells: [
                    {
                        binding: "portAirptCd",
                        onClick: (ctx: any) => {
                            clickEvent(ctx);
                        },
                    },
                ],
            },
            {
                cells: [{ binding: "regnNm" }],
            },
            {
                cells: [{ binding: "cntyCd" }],
            },
        ],
    };
};

export const SCHEMA_GRID_CURR_CD = (clickEvent: any): WijmoSchemaType => {
    return {
        id: "grid",
        options: { pagination: "in", isReadOnly: true },
        head: [
            { cells: [{ header: "L_CURR_CD", binding: "currCd" }] },
            { cells: [{ header: "L_CURR_NM", binding: "currNm" }] },
        ],
        body: [
            {
                cells: [
                    {
                        binding: "currCd",
                        onClick: (ctx: any) => {
                            clickEvent(ctx);
                        },
                    },
                ],
            },
            {
                cells: [{ binding: "currNm" }],
            },
        ],
    };
};

export const SCHEMA_GRID_BNK_CD = (clickEvent: any): WijmoSchemaType => {
    return {
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
                        onClick: (ctx: any) => {
                            clickEvent(ctx);
                        },
                    },
                ],
            },
            {
                cells: [{ binding: "cdVldValNm" }],
            },
        ],
    };
};

export const SCHEMA_FORM_COMN_CD: FormSchemaType = {
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

export const SCHEMA_FORM_CNTY_CD: FormSchemaType = {
    id: "form",
    schema: {
        cntyCd: { type: "text", label: "L_CNTY_CD" },
        cntyNm: { type: "text", label: "L_CNTY_NM" },
    },
};

export const SCHEMA_FORM_CITY_CD: FormSchemaType = {
    id: "form",
    schema: {
        cntyCd: { type: "code", label: "L_CNTY_CD", area: "cntyCd", required: true, popupSize: "sm" },
        regnNm: { type: "text", label: "L_REGN_NM" },
        regnCd: {
            type: "text",
            label: "L_REGN_CD",
        },
    },
};

export const SCHEMA_FORM_PORT_CD: FormSchemaType = {
    id: "form",
    schema: {
        cntyCd: { type: "code", label: "L_CNTY_CD", area: "cntyCd", required: true },
        regnNm: { type: "text", label: "L_REGN_NM" },
        portAirptCd: { type: "text", label: "L_PORT_CD" },
    },
};

export const SCHEMA_FORM_AIRPT_CD: FormSchemaType = {
    id: "form",
    schema: {
        cntyCd: { type: "code", label: "L_CNTY_CD", area: "cntyCd" },
        regnNm: { type: "text", label: "L_REGN_NM" },
        portAirptCd: { type: "text", label: "L_PORT_CD" },
    },
};

export const SCHEMA_FORM_PORT_AIRPT_CD: FormSchemaType = {
    id: "form",
    schema: {
        portAirptTpCd: {
            type: "select",
            label: "L_PORT_AIRPT_TP",
            required: true,
            select: true,
            options: [
                { label: "L_PORT", value: "PORT" },
                { label: "L_AIRPT", value: "AIRPT" },
            ],
        },
        cntyCd: { type: "code", label: "L_CNTY_CD", area: "cntyCd" },
        regnNm: { type: "text", label: "L_REGN_NM" },
        portAirptCd: { type: "text", label: "L_PORT_AIRPT_CD" },
    },
};

export const SCHEMA_FORM_CURR_CD: FormSchemaType = {
    id: "form",
    schema: {
        currCd: { type: "text", label: "L_CURR_CD" },
        currNm: { type: "text", label: "L_CURR_NM" },
    },
};

export const SCHEMA_FORM_BNK_CD: FormSchemaType = {
    id: "form",
    schema: {
        cdVldVal: { type: "text", label: "L_BNK_CD" },
        cdVldValNm: { type: "text", label: "L_BNK_NM" },
    },
};

export const SCHEMA_FORM_CO_CD: FormSchemaType = {
    id: "form",
    schema: {
        tin: { type: "text", label: "L_TIN" },
        coNm: { type: "text", label: "L_CO_NM" },
        coTpCd: {
            type: "select",
            label: "L_CO_PT",
            required: true,
            select: true,
            options: [
                { label: "L_CO", value: "C" },
                { label: "L_PSN", value: "P" },
            ],
        },
    },
};

export const SCHEMA_FORM_PRCSS_STAT_CD: FormSchemaType = {
    id: "form",
    schema: {
        item: { type: "text", label: "L_PRCSS_STAT_CD" },
        prcssStatCdNm: { type: "text", label: "L_PRCSS_STAT" },
    },
};

export const SCHEMA_FORM_ORG_CD: FormSchemaType = {
    id: "form",
    schema: {
        orgCd: { type: "text", label: "L_ORG_CD" },
        orgNm: { type: "text", label: "L_ORG_NM" },
    },
};
