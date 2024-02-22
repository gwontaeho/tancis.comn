import { api } from "@/comn";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { TGridSchema } from "@/comn/hooks";
import { TFormSchema } from "@/comn/hooks";

export const BASE = {
    path: `${comnEnvs.base}`,
    nodes: [],
};

export const APIS = {
    getWrhsCdLst: (data: any, page: number, size: number) => {
        return comnUtils.getCode({
            area: "wrhsCd",
            page: page,
            size: size,
            keyword: data.wrhsCd,
            keywordName: data.wrhsNm,
            wrhsOprtTpCd: data.wrhsOprtTpCd,
        });
    },

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
    getCoDclaCdLst: (data: any, page: number, size: number) => {
        return comnUtils.getCode({
            area: "coDclaCd",
            page: page,
            size: size,
            keyword: data.coDclaTpCd,
            keywordName: data.coNm,
            coTin: data.coTin,
        });
    },
    getOrgDeptCdLst: (data: any, page: number, size: number) => {
        return comnUtils.getCode({
            area: "orgDeptCd",
            page: page,
            size: size,
            keyword: data.deptCd,
            keywordName: data.deptNm,
            orgNm: data.orgNm,
        });
    },

    getCstmCdLst: (data: any, page: number, size: number) => {
        return comnUtils.getCode({
            area: "cstmCd",
            page: page,
            size: size,
            keyword: data.cstmOfceCd,
            keywordName: data.cstmNm,
            cstmTpCd: data.cstmTpCd,
        });
    },

    getVhclBodyCdLst: (data: any, page: number, size: number) => {
        return comnUtils.getCode({
            area: "vhclBodyCd",
            page: page,
            size: size,
            keyword: data.vhclBodyTpCd,
            keywordName: data.vhclBodyTpNm,
        });
    },

    getVhclCtgrCdLst: (data: any, page: number, size: number) => {
        return comnUtils.getCode({
            area: "vhclCtgrCd",
            page: page,
            size: size,
            keyword: data.vhclCtgrCd,
            keywordName: data.vhclCtgrNm,
        });
    },

    getVhclClrCdLst: (data: any, page: number, size: number) => {
        return comnUtils.getCode({
            area: "vhclClrCd",
            page: page,
            size: size,
            keyword: data.vhclClrCd,
            keywordName: data.vhclClrNm,
        });
    },

    getVhclFlCdLst: (data: any, page: number, size: number) => {
        return comnUtils.getCode({
            area: "vhclFlCd",
            page: page,
            size: size,
            keyword: data.vhclFlTpCd,
            keywordName: data.vhclFlNm,
        });
    },

    getVhclMkerCdLst: (data: any, page: number, size: number) => {
        return comnUtils.getCode({
            area: "vhclMkerCd",
            page: page,
            size: size,
            keyword: data.vhclMnfcCd,
            keywordName: data.vhclMnfcNm,
        });
    },

    getVhclImpCntyCdLst: (data: any, page: number, size: number) => {
        return comnUtils.getCode({
            area: "vhclImpCntyCd",
            page: page,
            size: size,
            keyword: data.vhclCntyCd,
            keywordName: data.vhclCntyNm,
        });
    },

    getVhclInsrTpCdLst: (data: any, page: number, size: number) => {
        return comnUtils.getCode({
            area: "vhclInsrTpCd",
            page: page,
            size: size,
            keyword: data.vhclInsrTpCd,
            keywordName: data.vhclInsrTpNm,
        });
    },

    getVhclMdlCdLst: (data: any, page: number, size: number) => {
        return comnUtils.getCode({
            area: "vhclMdlCd",
            page: page,
            size: size,
            keyword: data.vhclMdlCd,
            keywordName: data.vhclMdlNm,
            vhclMnfcCd: data.vhclMnfcCd,
        });
    },

    getVhclMdlNoCdLst: (data: any, page: number, size: number) => {
        return comnUtils.getCode({
            area: "vhclMdlNoCd",
            page: page,
            size: size,
            keyword: data.vhclMdlNoCd,
            keywordName: data.vhclMdlNoNm,
            vhclMnfcCd: data.vhclMnfcCd,
            vhclMdlCd: data.vhclMdlCd,
        });
    },

    getVhclHlpnCtgrCdLst: (data: any, page: number, size: number) => {
        return comnUtils.getCode({
            area: "vhclHlpnCtgrCd",
            page: page,
            size: size,
            keyword: data.vhclHlpnCtgrCd,
            keywordName: data.vhclHlpnCtgrNm,
        });
    },

    getVhclPrplTpCdLst: (data: any, page: number, size: number) => {
        return comnUtils.getCode({
            area: "vhclPrplTpCd",
            page: page,
            size: size,
            keyword: data.vhclPrplTpCd,
            keywordName: data.vhclPrplTpNm,
        });
    },

    getVhclTrmssnTpCdLst: (data: any, page: number, size: number) => {
        return comnUtils.getCode({
            area: "vhclTrmssnTpCd",
            page: page,
            size: size,
            keyword: data.vhclTrmssnTpCd,
            keywordName: data.vhclTrmssnTpNm,
        });
    },

    getVhclUseCdLst: (data: any, page: number, size: number) => {
        return comnUtils.getCode({
            area: "vhclUseCd",
            page: page,
            size: size,
            keyword: data.vhclUseCd,
            keywordName: data.vhclUseNm,
        });
    },

    getCoCdDtl: (data: any) => {
        return comnUtils.getCode({
            area: "coCdDtl",
            keyword: data.coTin,
        });
    },

    getHsCdLst: (data: any, page: number, size: number) => {
        return comnUtils.getCode({
            area: "hsCd",
            page: page,
            size: size,
            keyword: data.hsCd,
            keywordName: data.hsDesc,
        });
    },
};

export const SCHEMA_GRID_COMN_CD: TGridSchema = {
    id: "grid",
    options: { pagination: "out", edit: false, index: true },
    head: [
        { cells: [{ header: "L_COMN_CD", binding: "comnCd", width: 150 }] },
        { cells: [{ header: "L_CD_VLD_VAL", binding: "cdVldVal", width: 150 }] },
        { cells: [{ header: "L_CD_VLD_VAL_NM", binding: "cdVldValNm", width: "*" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "comnCd",
                },
            ],
        },
        {
            cells: [
                {
                    binding: "cdVldVal",
                },
            ],
        },
        {
            cells: [{ binding: "cdVldValNm" }],
        },
    ],
};

export const SCHEMA_GRID_CNTY_CD: TGridSchema = {
    id: "grid",
    options: { pagination: "out", edit: false, index: true },
    head: [
        { cells: [{ header: "L_CNTY_CD", binding: "cntyCd", width: 150 }] },
        { cells: [{ header: "L_CNTY_NM", binding: "cntyNm", width: "*" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "cntyCd",
                },
            ],
        },
        {
            cells: [{ binding: "cntyNm" }],
        },
    ],
};

export const SCHEMA_GRID_CITY_CD: TGridSchema = {
    id: "grid",
    options: { pagination: "out", edit: false, index: true },
    head: [
        { cells: [{ header: "L_REGN_CD", binding: "regnCd", width: 150 }] },
        { cells: [{ header: "L_REGN_TP_CD", binding: "regnTpCdNm", width: 150 }] },
        { cells: [{ header: "L_REGN_NM", binding: "regnNm", width: "*" }] },
        { cells: [{ header: "L_CNTY_CD", binding: "cntyCd", width: 200 }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "regnCd",
                },
            ],
        },
        {
            cells: [{ binding: "regnTpCdNm" }],
        },
        {
            cells: [{ binding: "regnNm" }],
        },
        {
            cells: [{ binding: "cntyCd" }],
        },
    ],
};

export const SCHEMA_GRID_PORT_CD: TGridSchema = {
    id: "grid",
    options: { pagination: "out", edit: false, index: true },
    head: [
        { cells: [{ header: "L_PORT_CD", binding: "regnCd", width: 150 }] },
        { cells: [{ header: "L_REGN_NM", binding: "regnNm", width: "*" }] },
        { cells: [{ header: "L_CNTY_CD", binding: "cntyCd", width: 150 }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "regnCd",
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

export const SCHEMA_GRID_AIRPT_CD: TGridSchema = {
    id: "grid",
    options: { pagination: "out", edit: false, index: true },
    head: [
        { cells: [{ header: "L_AIRPT_CD", binding: "regnCd", width: 150 }] },
        { cells: [{ header: "L_REGN_NM", binding: "regnNm", width: "*" }] },
        { cells: [{ header: "L_CNTY_CD", binding: "cntyCd", width: 150 }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "regnCd",
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

export const SCHEMA_GRID_PORT_AIRPT_CD: TGridSchema = {
    id: "grid",
    options: { pagination: "out", edit: false, index: true },
    head: [
        { cells: [{ header: "L_PORT_AIRPT_CD", binding: "regnCd", width: 150 }] },
        { cells: [{ header: "L_REGN_NM", binding: "regnNm", width: "*" }] },
        { cells: [{ header: "L_CNTY_CD", binding: "cntyCd", width: 150 }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "regnCd",
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

export const SCHEMA_GRID_CURR_CD: TGridSchema = {
    id: "grid",
    options: { pagination: "out", edit: false, index: true },
    head: [
        { cells: [{ header: "L_CURR_CD", binding: "currCd", width: 150 }] },
        { cells: [{ header: "L_CURR_NM", binding: "currNm", width: "*" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "currCd",
                },
            ],
        },
        {
            cells: [{ binding: "currNm" }],
        },
    ],
};

export const SCHEMA_GRID_BNK_CD: TGridSchema = {
    id: "grid",
    options: { pagination: "in", edit: false, index: true },
    head: [
        { cells: [{ header: "L_CD_VLD_VAL", binding: "cdVldVal", width: 200 }] },
        { cells: [{ header: "L_CD_VLD_VAL_NM", binding: "cdVldValNm", width: "*" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "cdVldVal",
                },
            ],
        },
        {
            cells: [{ binding: "cdVldValNm" }],
        },
    ],
};

export const SCHEMA_GRID_CO_CD: TGridSchema = {
    id: "grid",
    options: { pagination: "out", edit: false, index: true },
    head: [
        { cells: [{ header: "L_TIN", binding: "coTin", width: 150 }] },
        { cells: [{ header: "L_CO_NM", binding: "coNm", width: 150 }] },
        { cells: [{ header: "L_CO_ADDR", binding: "coAddr", width: "*" }] },
        { cells: [{ header: "L_CO_STAT", binding: "coStatCdNm", width: 100 }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "coTin",
                },
            ],
        },
        {
            cells: [{ binding: "coNm" }],
        },
        {
            cells: [{ binding: "coAddr" }],
        },
        {
            cells: [{ binding: "coStatCdNm" }],
        },
    ],
};

export const SCHEMA_GRID_PRCSS_STAT_CD: TGridSchema = {
    id: "grid",
    options: { pagination: "out", edit: false, index: true },
    head: [
        { cells: [{ header: "L_BSOP_PRCSS_STAT", binding: "prcssStatCdNm", width: 250 }] },
        { cells: [{ header: "L_PRCSS_STAT_CD", binding: "item", width: 150 }] },
        { cells: [{ header: "L_PRCSS_STAT", binding: "itemNm", width: "*" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "prcssStatCdNm",
                },
            ],
        },
        {
            cells: [{ binding: "item" }],
        },
        {
            cells: [{ binding: "itemNm" }],
        },
    ],
};

export const SCHEMA_GRID_ORG_CD: TGridSchema = {
    id: "grid",
    options: { pagination: "out", edit: false, index: true },
    head: [
        { cells: [{ header: "L_ORG_CD", binding: "orgCd", width: 150 }] },
        { cells: [{ header: "L_ORG_NM", binding: "orgNm", width: 200 }] },
        { cells: [{ header: "L_ORG_ADDR", binding: "orgAddr", width: "*" }] },
        { cells: [{ header: "L_RPRS_TLPN_NO", binding: "rprsTelno", width: 200 }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "orgCd",
                },
            ],
        },
        {
            cells: [{ binding: "orgNm" }],
        },
        {
            cells: [{ binding: "orgAddr" }],
        },
        {
            cells: [{ binding: "rprsTelno" }],
        },
    ],
};

export const SCHEMA_GRID_WRHS_CD: TGridSchema = {
    id: "grid",
    options: { pagination: "out", edit: false, index: true },
    head: [
        { cells: [{ header: "L_WRHS_CD", binding: "coDclaCd", width: 150 }] },
        { cells: [{ header: "L_WRHS_NM", binding: "wrhsNm", width: "*" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "coDclaCd",
                },
            ],
        },
        {
            cells: [{ binding: "wrhsNm" }],
        },
    ],
};

export const SCHEMA_GRID_CO_DCLA_CD: TGridSchema = {
    id: "grid",
    options: { pagination: "out" },
    head: [
        { cells: [{ header: "L_TIN", binding: "coTin", width: 200 }] },
        { cells: [{ header: "L_CO_NM", binding: "coNm", width: "*" }] },
        { cells: [{ header: "L_CO_DCLA_CD", binding: "coDclaCd", width: 200 }] },
        { cells: [{ header: "L_CO_DCLA_TP_NM", binding: "coDclaTpNm", width: 200 }] },
        { cells: [{ header: "L_RPRS_TELNO", binding: "rprsTelno", width: 200 }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "coTin",
                },
            ],
        },
        {
            cells: [{ binding: "coNm" }],
        },
        {
            cells: [{ binding: "coDclaCd" }],
        },
        {
            cells: [{ binding: "coDclaTpNm" }],
        },
        {
            cells: [{ binding: "rprsTelno" }],
        },
    ],
};

export const SCHEMA_GRID_ORG_DEPT_CD: TGridSchema = {
    id: "grid",
    options: { pagination: "out", edit: false, index: true },
    head: [
        { cells: [{ header: "L_ORG_NM", binding: "orgNm", width: 200 }] },
        { cells: [{ header: "L_DEPT_CD", binding: "deptCd", width: 150 }] },
        { cells: [{ header: "L_DEPT_NM", binding: "deptNm", width: 200 }] },
        { cells: [{ header: "L_DEPT_DESC", binding: "deptDesc", width: "*" }] },
    ],
    body: [
        {
            cells: [{ binding: "orgNm" }],
        },
        {
            cells: [
                {
                    binding: "deptCd",
                },
            ],
        },
        {
            cells: [{ binding: "deptNm" }],
        },
        {
            cells: [{ binding: "deptDesc" }],
        },
    ],
};

export const SCHEMA_GRID_CSTM_CD: TGridSchema = {
    id: "grid",
    options: { pagination: "out", edit: false, index: true },
    head: [
        { cells: [{ header: "L_CSTM_CD", binding: "cstmOfceCd", width: 150 }] },
        { cells: [{ header: "L_CSTM_TP_CD", binding: "cstmTpCd", width: 150 }] },
        { cells: [{ header: "L_CSTM_TP_NM", binding: "coTpCdNm", width: 200 }] },
        { cells: [{ header: "L_CSTM_NM", binding: "cstmNm", width: 200 }] },
        { cells: [{ header: "L_CSTM_ADDR", binding: "cstmAddr", width: 200 }] },
        { cells: [{ header: "L_CSTM_DESC", binding: "cstmDesc", width: "*" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "cstmOfceCd",
                },
            ],
        },
        {
            cells: [{ binding: "cstmTpCd" }],
        },
        {
            cells: [{ binding: "cstmTpCdNm" }],
        },
        {
            cells: [{ binding: "cstmNm" }],
        },
        {
            cells: [{ binding: "cstmAddr" }],
        },
        {
            cells: [{ binding: "cstmDesc" }],
        },
    ],
};

export const SCHEMA_GRID_VHCL_BODY_CD: TGridSchema = {
    id: "grid",
    options: { pagination: "out", edit: false, index: true },
    head: [
        { cells: [{ header: "L_VHCL_BODY_TP_CD", binding: "vhclBodyTpCd", width: 150 }] },
        { cells: [{ header: "L_VHCL_BODY_TP_NM", binding: "vhclBodyTpNm", width: "*" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "vhclBodyTpCd",
                },
            ],
        },
        {
            cells: [{ binding: "vhclBodyTpNm" }],
        },
    ],
};

export const SCHEMA_GRID_VHCL_CTGR_CD: TGridSchema = {
    id: "grid",
    options: { pagination: "out", edit: false, index: true },
    head: [
        { cells: [{ header: "L_VHCL_CTGR_CD", binding: "vhclCtgrCd", width: 150 }] },
        { cells: [{ header: "L_VHCL_CTGR_NM", binding: "vhclCtgrNm", width: "*" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "vhclCtgrCd",
                },
            ],
        },
        {
            cells: [{ binding: "vhclCtgrNm" }],
        },
    ],
};

export const SCHEMA_GRID_VHCL_CLR_CD: TGridSchema = {
    id: "grid",
    options: { pagination: "out", edit: false, index: true },
    head: [
        { cells: [{ header: "L_VHCL_CLR_CD", binding: "vhclClrCd", width: 150 }] },
        { cells: [{ header: "L_VHCL_CLR_NM", binding: "vhclClrNm", width: "*" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "vhclClrCd",
                },
            ],
        },
        {
            cells: [{ binding: "vhclClrNm" }],
        },
    ],
};

export const SCHEMA_GRID_VHCL_FL_CD: TGridSchema = {
    id: "grid",
    options: { pagination: "out", edit: false, index: true },
    head: [
        { cells: [{ header: "L_VHCL_FL_TP_CD", binding: "vhclFlTpCd", width: 150 }] },
        { cells: [{ header: "L_VHCL_FL_NM", binding: "vhclFlNm", width: "*" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "vhclFlTpCd",
                },
            ],
        },
        {
            cells: [{ binding: "vhclFlNm" }],
        },
    ],
};

export const SCHEMA_GRID_VHCL_IMP_CNTY_CD: TGridSchema = {
    id: "grid",
    options: { pagination: "out", edit: false, index: true },
    head: [
        { cells: [{ header: "L_VHCL_CNTY_CD", binding: "vhclCntyCd", width: 150 }] },
        { cells: [{ header: "L_VHCL_CNTY_NM", binding: "vhclCntyNm", width: "*" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "vhclCntyCd",
                },
            ],
        },
        {
            cells: [{ binding: "vhclCntyNm" }],
        },
    ],
};

export const SCHEMA_GRID_VHCL_INSR_TP_CD: TGridSchema = {
    id: "grid",
    options: { pagination: "out", edit: false, index: true },
    head: [
        { cells: [{ header: "L_VHCL_INSR_TP_CD", binding: "vhclInsrTpCd", width: 150 }] },
        { cells: [{ header: "L_VHCL_INSR_TP_NM", binding: "vhclInsrTpNm", width: "*" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "vhclInsrTpCd",
                },
            ],
        },
        {
            cells: [{ binding: "vhclInsrTpNm" }],
        },
    ],
};

export const SCHEMA_GRID_VHCL_MKER_CD: TGridSchema = {
    id: "grid",
    options: { pagination: "out", edit: false, index: true },
    head: [
        { cells: [{ header: "L_VHCL_MNFC_CD", binding: "vhclMnfcCd", width: 150 }] },
        { cells: [{ header: "L_VHCL_MNFC_NM", binding: "vhclMnfcNm", width: "*" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "vhclMnfcCd",
                },
            ],
        },
        {
            cells: [{ binding: "vhclMnfcNm" }],
        },
    ],
};

export const SCHEMA_GRID_VHCL_MDL_CD: TGridSchema = {
    id: "grid",
    options: { pagination: "out", edit: false, index: true },
    head: [
        { cells: [{ header: "L_VHCL_MDL_CD", binding: "vhclMdlCd", width: 150 }] },
        { cells: [{ header: "L_VHCL_MDL_NM", binding: "vhclMdlNm", width: "*" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "vhclMdlCd",
                },
            ],
        },
        {
            cells: [{ binding: "vhclMdlNm" }],
        },
    ],
};

export const SCHEMA_GRID_VHCL_MDL_NO_CD: TGridSchema = {
    id: "grid",
    options: { pagination: "out", edit: false, index: true },
    head: [
        { cells: [{ header: "L_VHCL_MDL_NO_CD", binding: "vhclMdlNoCd", width: 150 }] },
        { cells: [{ header: "L_VHCL_MDL_NO_NM", binding: "vhclMdlNoNm", width: "*" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "vhclMdlNoCd",
                },
            ],
        },
        {
            cells: [{ binding: "vhclMdlNoNm" }],
        },
    ],
};

export const SCHEMA_GRID_VHCL_HLPN_CTGR_CD: TGridSchema = {
    id: "grid",
    options: { pagination: "out", edit: false, index: true },
    head: [
        { cells: [{ header: "L_VHCL_HLPN_CTGR_CD", binding: "vhclHlpnCtgrCd", width: 150 }] },
        { cells: [{ header: "L_VHCL_HLPN_CTGR_NM", binding: "vhclHlpnCtgrNm", width: "*" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "vhclHlpnCtgrCd",
                },
            ],
        },
        {
            cells: [{ binding: "vhclHlpnCtgrNm" }],
        },
    ],
};

export const SCHEMA_GRID_VHCL_PRPL_TP_CD: TGridSchema = {
    id: "grid",
    options: { pagination: "out", edit: false, index: true },
    head: [
        { cells: [{ header: "L_VHCL_PRPL_TP_CD", binding: "vhclPrplTpCd", width: 150 }] },
        { cells: [{ header: "L_VHCL_PRPL_TP_NM", binding: "vhclPrplTpNm", width: "*" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "vhclPrplTpCd",
                },
            ],
        },
        {
            cells: [{ binding: "vhclPrplTpNm" }],
        },
    ],
};

export const SCHEMA_GRID_VHCL_TRMSSN_TP_CD: TGridSchema = {
    id: "grid",
    options: { pagination: "out", edit: false, index: true },
    head: [
        { cells: [{ header: "L_VHCL_TRMSSN_TP_CD", binding: "vhclTrmssnTpCd", width: 150 }] },
        { cells: [{ header: "L_VHCL_TRMSSN_TP_NM", binding: "vhclTrmssnTpNm", width: "*" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "vhclTrmssnTpCd",
                },
            ],
        },
        {
            cells: [{ binding: "vhclTrmssnTpNm" }],
        },
    ],
};

export const SCHEMA_GRID_VHCL_USE_CD: TGridSchema = {
    id: "grid",
    options: { pagination: "out", edit: false, index: true },
    head: [
        { cells: [{ header: "L_VHCL_USE_CD", binding: "vhclUseCd", width: 150 }] },
        { cells: [{ header: "L_VHCL_USE_NM", binding: "vhclUseNm", width: "*" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "vhclUseCd",
                },
            ],
        },
        {
            cells: [{ binding: "vhclUseNm" }],
        },
    ],
};

export const SCHEMA_FORM_COMN_CD_SRCH = {
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
        regnTpCd: {
            type: "select",
            label: "L_REGN_TP_CD",
            options: [
                { label: "IATA", value: "01" },
                { label: "UN/LOCODE", value: "02" },
            ],
        },
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

export const SCHEMA_FORM_WRHS_CD_SRCH: TFormSchema = {
    id: "form",
    schema: {
        wrhsCd: { type: "text", label: "L_WRHS_CD" },
        wrhsNm: { type: "text", label: "L_WRHS_NM" },
    },
};

export const SCHEMA_FORM_CO_DCLA_CD_SRCH: TFormSchema = {
    id: "form",
    schema: {
        coTin: { type: "text", label: "L_TIN" },
        coNm: { type: "text", label: "L_CO_NM" },
        coDclaTpCd: {
            all: true,
            type: "select",
            label: "L_CO_DCLA_TP_CD",
            options: [
                { label: "L_AE", value: "AE" },
                { label: "L_AIR", value: "AL" },
                { label: "L_CT", value: "CT" },
                { label: "L_FF", value: "FF" },
                { label: "L_WE", value: "WE" },
            ],
        },
    },
};

export const SCHEMA_FORM_ORG_DEPT_CD_SRCH: TFormSchema = {
    id: "form",
    schema: {
        deptCd: { type: "text", label: "L_DEPT_CD" },
        deptNm: { type: "text", label: "L_DEPT_NM" },
        orgNm: { type: "text", label: "L_ORG_NM" },
    },
};

export const SCHEMA_FORM_CSTM_CD_SRCH: TFormSchema = {
    id: "form",
    schema: {
        cstmOfceCd: { type: "text", label: "L_CSTM_CD" },
        cstmNm: { type: "text", label: "L_CSTM_NM" },
        cstmTpCd: {
            type: "select",
            label: "L_CSTM_TP_CD",
            all: true,
            options: [
                { label: "L_AR", value: "AR" },
                { label: "L_SE", value: "SE" },
                { label: "L_LA", value: "LA" },
                { label: "L_SL", value: "SL" },
                { label: "L_SA", value: "SA" },
            ],
        },
    },
};

export const SCHEMA_FORM_VHCL_BODY_CD_SRCH: TFormSchema = {
    id: "form",
    schema: {
        vhclBodyTpCd: { type: "text", label: "L_VHCL_BODY_TP_CD" },
        vhclBodyTpNm: { type: "text", label: "L_VHCL_BODY_TP_NM" },
    },
};

export const SCHEMA_FORM_VHCL_CTGR_CD_SRCH: TFormSchema = {
    id: "form",
    schema: {
        vhclCtgrCd: { type: "text", label: "L_VHCL_CTGR_CD" },
        vhclCtgrNm: { type: "text", label: "L_VHCL_CTGR_NM" },
    },
};

export const SCHEMA_FORM_VHCL_CLR_CD_SRCH: TFormSchema = {
    id: "form",
    schema: {
        vhclClrCd: { type: "text", label: "L_VHCL_CLR_CD" },
        vhclClrNm: { type: "text", label: "L_VHCL_CLR_NM" },
    },
};

export const SCHEMA_FORM_VHCL_FL_CD_SRCH: TFormSchema = {
    id: "form",
    schema: {
        vhclFlTpCd: { type: "text", label: "L_VHCL_FL_TP_CD" },
        vhclFlNm: { type: "text", label: "L_VHCL_FL_NM" },
    },
};

export const SCHEMA_FORM_VHCL_IMP_CNTY_CD_SRCH: TFormSchema = {
    id: "form",
    schema: {
        vhclCntyCd: { type: "text", label: "L_VHCL_CNTY_CD" },
        vhclCntyNm: { type: "text", label: "L_VHCL_CNTY_NM" },
    },
};

export const SCHEMA_FORM_VHCL_INSR_TP_CD_SRCH: TFormSchema = {
    id: "form",
    schema: {
        vhclInsrTpCd: { type: "text", label: "L_VHCL_INSR_TP_CD" },
        vhclInsrTpNm: { type: "text", label: "L_VHCL_INSR_TP_NM" },
    },
};

export const SCHEMA_FORM_VHCL_MKER_CD_SRCH: TFormSchema = {
    id: "form",
    schema: {
        vhclMnfcCd: { type: "text", label: "L_VHCL_MNFC_CD" },
        vhclMnfcNm: { type: "text", label: "L_VHCL_MNFC_NM" },
    },
};

export const SCHEMA_FORM_VHCL_MDL_CD_SRCH: TFormSchema = {
    id: "form",
    schema: {
        vhclMdlCd: { type: "text", label: "L_VHCL_MDL_CD" },
        vhclMdlNm: { type: "text", label: "L_VHCL_MDL_NM" },
    },
};

export const SCHEMA_FORM_VHCL_MDL_NO_CD_SRCH: TFormSchema = {
    id: "form",
    schema: {
        vhclMdlNoCd: { type: "text", label: "L_VHCL_MDL_NO_CD" },
        vhclMdlNoNm: { type: "text", label: "L_VHCL_MDL_NO_NM" },
    },
};

export const SCHEMA_FORM_VHCL_HLPN_CTGR_CD_SRCH: TFormSchema = {
    id: "form",
    schema: {
        vhclHlpnCtgrCd: { type: "text", label: "L_VHCL_HLPN_CTGR_CD" },
        vhclHlpnCtgrNm: { type: "text", label: "L_VHCL_HLPN_CTGR_NM" },
    },
};

export const SCHEMA_FORM_VHCL_PRPL_TP_CD_SRCH: TFormSchema = {
    id: "form",
    schema: {
        vhclPrplTpCd: { type: "text", label: "L_VHCL_PRPL_TP_CD" },
        vhclPrplTpNm: { type: "text", label: "L_VHCL_PRPL_TP_NM" },
    },
};

export const SCHEMA_FORM_VHCL_TRMSSN_TP_CD_SRCH: TFormSchema = {
    id: "form",
    schema: {
        vhclTrmssnTpCd: { type: "text", label: "L_VHCL_TRMSSN_TP_CD" },
        vhclTrmssnTpNm: { type: "text", label: "L_VHCL_TRMSSN_TP_NM" },
    },
};

export const SCHEMA_FORM_VHCL_USE_CD_SRCH: TFormSchema = {
    id: "form",
    schema: {
        vhclUseCd: { type: "text", label: "L_VHCL_USE_CD" },
        vhclUseNm: { type: "text", label: "L_VHCL_USE_NM" },
    },
};

export const SCHEMA_CO_CD_DTL: TFormSchema = {
    id: "form",
    schema: {
        coTin: { type: "text", label: "L_CO_TIN" },
        coTpCdNm: { type: "text", label: "L_CO_TP_CD_NM" },
        coNm: { type: "text", label: "L_CO_NM" },
        coAddr: { type: "text", label: "L_CO_ADDR" },
        rprsTelno: { type: "text", label: "L_RPRS_TELNO" },
        rRprsFaxNo: { type: "text", label: "L_RPRS_FAX_NO" },
        rprsEml: { type: "text", label: "L_RPRS_EML" },
        prcssStatCdNm: { type: "text", label: "L_PRCSS_STAT_CD_NM" },
    },
};

export const SF_HS_CD_SRCH: TFormSchema = {
    id: "form_HsCdSrch",
    schema: {
        hsCd: {
            type: "text",
            label: "L_HS",
            area: "hsCd",
            controlSize: 4,
            rightButton: { icon: "search" },
            placeholder: "0000.00.00.0000",
            mask: [/\d/, /\d/, /\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/],
        },
        hsDesc: { type: "text", label: "L_HS_DESC", area: "hsDesc", controlSize: 4 },
    },
};

export const SG_HS_CD_LST: TGridSchema = {
    id: "grid",
    options: { pagination: "out", index: true },
    head: [
        { cells: [{ header: "L_HS_CD", binding: "hsCd", width: 150 }] },
        { cells: [{ header: "L_VERSION", binding: "histSrno", width: 100 }] },
        { cells: [{ header: "L_HS_DESC", binding: "hsDesc", width: "*" }] },
        { cells: [{ header: "L_QTY", binding: "itmQtyUtCd", width: 150 }] },
        { cells: [{ header: "L_APPD_YN", binding: "useYn", width: 80 }] },
    ],
    body: [
        {
            cells: [{ binding: "hsCd" }],
        },
        {
            cells: [{ binding: "histSrno" }],
        },
        {
            cells: [{ binding: "hsDesc" }],
        },
        {
            cells: [{ binding: "itmQtyUtCd" }],
        },
        {
            cells: [{ binding: "useYn" }],
        },
    ],
};
