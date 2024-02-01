import React from "react";
import * as XLSX from "xlsx";
import lodash from "lodash";
import { useTranslation } from "react-i18next";
import { comnUtils } from "@/comn/utils";
import { useModal } from "@/comn/hooks";
import { CommonErrors } from "@/comn/components/_";

type UseExcelProps = {
    [id: string]: { edit: boolean };
};

type UseExcelReturn = {
    schema: any;
    validate: (data: Array<any>, schema: any) => void;
    process: (data: Array<any>, handler: (item: any, index: number) => Array<any>) => Array<any>;
    excelToJson: (file: File, index: number) => Promise<ExcelToJsonReturn>;
    dataToExcel: () => any;
    setEdit: (id: string, edit: boolean) => any;
};

type ExcelToJsonReturn = {
    error?: { type: string; message: string; errors: Array<any> };
    data?: Array<any>;
    schema?: any;
};

type ValidateReturn = {
    error?: { type: string; message: string; errors: Array<any> };
};

export const useExcel = (props: UseExcelProps): UseExcelReturn => {
    const { t } = useTranslation(); // Translation Hook !== 언어 변환 Hook ==!
    //const { edit = true } = props;
    const [_schema, _setSchema] = React.useState<any>(props);

    const process = (data: Array<any>, handler: (item: any, index: number) => any) => {
        data.map((item, index) => {
            return handler(item, index) || item;
        });

        return data;
    };

    const validate = (data: Array<any>, schema: any): ValidateReturn => {
        let _schema = setSchemaMatrix(schema);
        if (_schema === null || comnUtils.isEmptyObject(_schema)) {
            return {
                error: { type: "no-schema", message: t("msg.com.00003"), errors: [] },
            };
        }

        const errors = validateBySchema(data, _schema);
        if (comnUtils.isEmptyArray(errors)) {
            return {
                error: { type: "success", message: t("msg.com.00016"), errors: [] },
            };
        } else {
            return {
                error: { type: "fail-validation", message: t("msg.com.00014"), errors: errors },
            };
        }
    };

    const excelToJson = (file: File, index: number = 0) => {
        return new Promise<ExcelToJsonReturn>((resolve, reject) => {
            if (file === undefined || file === null) {
                resolve({
                    error: { type: "no-file", message: t("msg.com.00003"), errors: [] },
                    data: [],
                });
                return;
            }

            const reader = new FileReader();

            reader.onload = (e: any) => {
                const data = e.target.result;
                const readedData = XLSX.read(data, { type: "binary" });
                if (!readedData.Sheets[index]) {
                    reject({
                        error: { type: "no-sheet", message: t("msg.com.00015"), errors: [] },
                        data: [],
                    });
                    return;
                }

                const wsname = readedData.SheetNames[index];
                const ws = readedData.Sheets[wsname];
                const rawData: Array<Array<any>> = XLSX.utils.sheet_to_json(ws, { header: 1 });
                console.log(`sheet name : ${wsname}`);

                if (comnUtils.isEmpty(rawData) || comnUtils.isEmptyArray(rawData)) {
                    reject({
                        error: { type: "no-data", message: t("msg.com.00012"), errors: [] },
                        data: [],
                    });
                    return;
                }

                if (data.length < 2) {
                    reject({
                        error: { type: "no-meta", message: t("msg.com.00015"), errors: [] },
                        data: [],
                    });
                    return;
                }
                let temp: Array<any> = rawData.slice(2);
                let result: Array<any> = [];
                let keys = rawData[0];
                let labels: any = {};

                rawData[0].forEach((item: any, index: number) => {
                    labels[item] = rawData[1][index];
                });

                temp.forEach((item: any) => {
                    let t: { [key: string]: any } = {};
                    keys.forEach((key: any, index: number) => {
                        t[key] = item[index];
                    });
                    result.push(t);
                });

                resolve({
                    error: { type: "success", message: t("msg.com.00016"), errors: [] },
                    data: result,
                    schema: {
                        keys: keys,
                        labels: labels,
                    },
                });
                return;
            };
            reader.readAsBinaryString(file);
        });
    };

    const setSchemaMatrix = (schema: any) => {
        if (schema === undefined || comnUtils.isEmpty(schema) || comnUtils.isEmptyObject(schema)) {
            return null;
        }

        let t: { [key: string]: any } = {};
        if (lodash.isArray(schema)) {
            schema.forEach((item: any) => {
                if (item.cells === undefined || comnUtils.isEmptyArray(item)) return false;
                item.cells.forEach((cell: any) => {
                    if (cell.binding === undefined || comnUtils.isEmpty(cell.binding)) return false;
                    t[cell.binding] = {};
                    if (cell.required !== undefined) t[cell.binding].required = cell.required;
                    if (cell.min !== undefined) t[cell.binding].min = cell.min;
                    if (cell.max !== undefined) t[cell.binding].max = cell.max;
                    if (cell.minLength !== undefined) t[cell.binding].minLength = cell.minLength;
                    if (cell.maxLength !== undefined) t[cell.binding].maxLength = cell.maxLength;
                    if (cell.pattern !== undefined) t[cell.binding].pattern = cell.pattern;
                    if (cell.validate !== undefined) t[cell.binding].validate = cell.validate;
                    if (cell.area !== undefined) t[cell.binding].area = cell.area;
                    if (cell.comnCd !== undefined) t[cell.binding].comnCd = cell.comnCd;
                });
            });
        }
        return t;
    };

    const validateBySchema = (data: Array<any>, schema: any) => {
        let errors: Array<any> = [];
        data.forEach((item: any, index: number) => {
            Object.entries(item).forEach(([k, v]: any) => {
                let r: any = comnUtils.getValidatedValue(v, schema[k]);
                if (r !== undefined)
                    errors.push({ row: index + 3, label: schema.labels[k], ...keyMapping(r, item, schema.keys) });
            });
        });

        return errors;
    };

    const keyMapping = (row: any, item: any, keys: any) => {
        if (row === undefined || row == null) return row;
        if (keys === undefined || keys == null) return row;

        if (keys.key1 !== undefined) row.key1 = item[keys.key1.binding];
        if (keys.key2 !== undefined) row.key2 = item[keys.key2.binding];
        if (keys.key3 !== undefined) row.key3 = item[keys.key3.binding];
        if (keys.key4 !== undefined) row.key4 = item[keys.key4.binding];
        if (keys.key5 !== undefined) row.key5 = item[keys.key5.binding];

        return row;
    };

    const dataToExcel = () => {
        return null;
    };
    const setEdit = (id: string, edit: boolean) => {
        _setSchema((prev: any) => {
            const t = { ...prev };
            t[id].edit = edit;
            return t;
        });
    };

    return { schema: _schema, validate, process, dataToExcel, excelToJson, setEdit };
};
