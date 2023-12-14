import { api } from "@/comn";
import { FormSchemaType } from "@/comn/hooks";

export const APIS = {
    getCommonCodeList: (data: any, page: number, size: number) => {
        return api.get(`/ptl-com/comn/comnCds?page=${page}&size=${size}`, {
            params: data,
        });
    },
};

export const SCHEMA_GRID = {
    __grid__: "grid",
    options: { checkbox: true, pagination: true, isReadOnly: true },
    head: [
        { cells: [{ header: "id", binding: "id" }] },
        { cells: [{ header: "textField", binding: "textField" }] },
    ],
    body: [
        { cells: [{ binding: "id", link: (data: any) => console.log(data), width: "*" }] },
        { cells: [{ binding: "textField" }] },
    ],
};
