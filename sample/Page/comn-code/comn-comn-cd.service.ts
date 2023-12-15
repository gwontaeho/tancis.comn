import { api } from "@/comn";
import { FormSchemaType } from "@/comn/hooks";

export const APIS = {
    getCommonCodeList: (data: any, page: number, size: number) => {
        return api.get(`/ptl-com/comn/comn-cds?page=${page}&size=${size}`, {
            params: data,
        });
    },
};

export const SCHEMA_GRID: any = {
    id: "grid",
    options: { pagination: "in", download: false },
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

export const SCHEMA_FORM: FormSchemaType = {
    id: "form",
    schema: {
        comnCd: { type: "text", label: "L_COMN_CD", required: true, readOnly: true },
        cdVldVal: { type: "text", label: "L_CD_VLD_VAL", required: true },
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
