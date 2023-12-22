import { api } from '@/comn'
import { utils } from '@/comn/utils'
import { FormSchemaType, WijmoSchemaType } from '@/comn/hooks'

export const APIS = {
    getComnCdLst: (data: any, page: number, size: number) => {
        return utils.getCode({
            comnCd: data.comnCd,
            area: 'comnCd',
            page: page,
            size: size,
            keyword: data.cdVldVal,
            keywordName: data.cdVldValNm,
        })
    },

    getCityCdLst: (data: any, page: number, size: number) => {
        return utils.getCode({
            area: 'cityCd',
            page: page,
            size: size,
            keyword: data.cntyCd,
            keywordName: data.regnNm,
        })
    },

    getCntyCdLst: (data: any, page: number, size: number) => {
        return api.get(`/ptl-com/comn/cnty-cds?page=${page}&size=${size}`, {
            params: data,
        })
    },
    getCurrCdLst: (data: any, page: number, size: number) => {
        return api.get(`/ptl-com/comn/curr-cds?page=${page}&size=${size}`, {
            params: data,
        })
    },
    getBnkCdLst: (data: any, page: number, size: number) => {
        return api.get(`/ptl-com/comn/comn-cds?comnCd=CO012&page=${page}&size=${size}`, {
            params: data,
        })
    },
}

export const SCHEMA_GRID_COMN_CD = (clickEvent: any): WijmoSchemaType => {
    return {
        id: 'grid',
        options: { pagination: 'in', isReadOnly: true },
        head: [
            { cells: [{ header: 'L_COMN_CD', binding: 'comnCd' }] },
            { cells: [{ header: 'L_CD_VLD_VAL', binding: 'cdVldVal' }] },
            { cells: [{ header: 'L_CD_VLD_VAL_NM', binding: 'cdVldValNm' }] },
        ],
        body: [
            {
                cells: [
                    {
                        binding: 'comnCd',
                        onClick: (ctx: any) => {
                            console.log(ctx)
                            clickEvent(ctx)
                        },
                    },
                ],
            },
            {
                cells: [{ binding: 'cdVldVal' }],
            },
            {
                cells: [{ binding: 'cdVldValNm' }],
            },
        ],
    }
}

export const SCHEMA_GRID_CNTY_CD = (clickEvent: any): WijmoSchemaType => {
    return {
        id: 'grid',
        options: { pagination: 'in', isReadOnly: true },
        head: [
            { cells: [{ header: 'L_CNTY_CD', binding: 'cntyCd' }] },
            { cells: [{ header: 'L_CNTY_NM', binding: 'cntyNm' }] },
        ],
        body: [
            {
                cells: [
                    {
                        binding: 'cntyCd',
                        onClick: (ctx: any) => {
                            clickEvent(ctx)
                        },
                    },
                ],
            },
            {
                cells: [{ binding: 'cntyNm' }],
            },
        ],
    }
}

export const SCHEMA_GRID_CITY_CD = (clickEvent: any): WijmoSchemaType => {
    return {
        id: 'grid',
        options: { pagination: 'in', isReadOnly: true },
        head: [
            { cells: [{ header: 'L_REGN_CD', binding: 'regnCd' }] },
            { cells: [{ header: 'L_REGN_NM', binding: 'regnNm' }] },
            { cells: [{ header: 'L_CNTY_CD', binding: 'cntyCd' }] },
            { cells: [{ header: 'L_CITY_STAT_CD', binding: 'cityStatCd' }] },
        ],
        body: [
            {
                cells: [
                    {
                        binding: 'regnCd',
                        onClick: (ctx: any) => {
                            clickEvent(ctx)
                        },
                    },
                ],
            },
            {
                cells: [{ binding: 'regnNm' }],
            },
            {
                cells: [{ binding: 'cntyCd' }],
            },
            {
                cells: [{ binding: 'cityStatCd' }],
            },
        ],
    }
}

export const SCHEMA_GRID_CURR_CD = (clickEvent: any): WijmoSchemaType => {
    return {
        id: 'grid',
        options: { pagination: 'in', isReadOnly: true },
        head: [
            { cells: [{ header: 'L_CURR_CD', binding: 'currCd' }] },
            { cells: [{ header: 'L_CURR_NM', binding: 'currNm' }] },
        ],
        body: [
            {
                cells: [
                    {
                        binding: 'currCd',
                        onClick: (ctx: any) => {
                            clickEvent(ctx)
                        },
                    },
                ],
            },
            {
                cells: [{ binding: 'currNm' }],
            },
        ],
    }
}

export const SCHEMA_GRID_BNK_CD = (clickEvent: any): WijmoSchemaType => {
    return {
        id: 'grid',
        options: { pagination: 'in', isReadOnly: true },
        head: [
            { cells: [{ header: 'L_CD_VLD_VAL', binding: 'cdVldVal' }] },
            { cells: [{ header: 'L_CD_VLD_VAL_NM', binding: 'cdVldValNm' }] },
        ],
        body: [
            {
                cells: [
                    {
                        binding: 'cdVldVal',
                        onClick: (ctx: any) => {
                            clickEvent(ctx)
                        },
                    },
                ],
            },
            {
                cells: [{ binding: 'cdVldValNm' }],
            },
        ],
    }
}

export const SCHEMA_FORM_COMN_CD: FormSchemaType = {
    id: 'form',
    schema: {
        comnCd: { type: 'text', label: 'L_COMN_CD', required: true },
        cdVldVal: { type: 'text', label: 'L_CD_VLD_VAL' },
        cdVldValNm: { type: 'text', label: 'L_CD_VLD_VAL_NM' },
        langCd: {
            type: 'select',
            label: 'L_LANG_CD',
            required: true,
            options: [
                { label: 'L_SW', value: 'SW' },
                { label: 'L_EN', value: 'EN' },
                { label: 'L_KO', value: 'KO' },
            ],
        },
    },
}

export const SCHEMA_FORM_CNTY_CD: FormSchemaType = {
    id: 'form',
    schema: {
        cntyCd: { type: 'text', label: 'L_CNTY_CD' },
        cntyNm: { type: 'text', label: 'L_CNTY_NM' },
    },
}

export const SCHEMA_FORM_CITY_CD: FormSchemaType = {
    id: 'form',
    schema: {
        cntyCd: { type: 'select', label: 'L_CNTY_CD', area: 'cntyCd' },
        regnNm: { type: 'text', label: 'L_REGN_NM' },
    },
}

export const SCHEMA_FORM_CURR_CD: FormSchemaType = {
    id: 'form',
    schema: {
        currCd: { type: 'text', label: 'L_CURR_CD' },
        currNm: { type: 'text', label: 'L_CURR_NM' },
    },
}

export const SCHEMA_FORM_BNK_CD: FormSchemaType = {
    id: 'form',
    schema: {
        cdVldVal: { type: 'text', label: 'L_BNK_CD' },
        cdVldValNm: { type: 'text', label: 'L_BNK_NM' },
    },
}
