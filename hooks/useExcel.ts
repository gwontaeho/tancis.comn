import React from "react";
import * as XLSX from "xlsx";
import lodash from "lodash";
import { useTranslation } from "react-i18next";
import { comnUtils } from "@/comn/utils";
import { useRecoilState } from "recoil";
import { resourceState } from "@/comn/features/recoil";
import { useModal, useResource } from "@/comn/hooks";
import { CommonErrors } from "@/comn/components/_";

type UseExcelProps = {
    [id: string]: { edit: boolean };
};

type UseExcelReturn = {
    schema: any;
    process: (data: Array<any>, handler: (item: any, index: number) => Array<any>) => Array<any>;
    excelToJson: (file: File, index: number) => Promise<ExcelToJsonReturn>;
    dataToExcel: () => any;
    setEdit: (id: string, edit: boolean) => any;
    validateForGrid: (...args: any) => any;
};

type ExcelToJsonReturn = {
    result: "success" | "fail";
    error?: { type: string; message: string; errors: Array<any> };
    data?: Array<any>;
    schema?: any;
};

type ValidateReturn = {
    error?: { type: string; message: string; errors: Array<any> };
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
const validateBySchema = (data: any, schema: any, resource: any, keys?: any) => {
    let errors: Array<any> = [];
    let _data = data.data;
    let _labels = data.schema.labels;

    //console.log(keys);

    _data.forEach((item: any, index: number) => {
        Object.entries(item).forEach(([k, v]: any) => {
            let r: any = getValidatedValue(v, schema[k], resource);
            if (r !== undefined)
                errors.push({
                    row: index + 1,
                    label: _labels[k],
                    ...keyMapping(r, item, keys),
                });
        });
    });

    return errors;
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

export const validateForGrid = (data: any, schema: any, resource: any, keys?: any) => {
    let _schema = setSchemaMatrix(schema);
    if (_schema === null || comnUtils.isEmptyObject(_schema)) {
        return {
            result: "fail",
            error: { type: "no-schema", message: "msg.com.00003", errors: [] },
        };
    }

    const errors = validateBySchema(data, _schema, resource, keys);
    if (comnUtils.isEmptyArray(errors)) {
        return {
            result: "success",
            error: { type: "success", message: "msg.com.00016", errors: [] },
        };
    } else {
        return {
            result: "fail",
            error: { type: "fail-validation", message: "msg.com.00014", errors: errors, head: keys },
        };
    }
};

const getValidatedValue = (v: any, o?: any, resource?: any) => {
    const t = getValidateObject(o);

    if (o?.required) {
        if (!v) {
            return { type: "required", message: t.required.message, schema: t };
        }
    }
    if (o?.min) {
        if (v < t.min.value) {
            return { type: "min", message: t.min.message, schema: t };
        }
    }
    if (o?.max) {
        if (v > t.max.value) {
            return { type: "max", message: t.max.message, schema: t };
        }
    }
    if (o?.minLength) {
        if (v?.length < t.minLength.value) {
            return { type: "minLength", message: t.minLength.message, schema: t };
        }
    }
    if (o?.maxLength) {
        if (v?.length > t.maxLength.value) {
            return { type: "maxLength", message: t.maxLength.message, schema: t };
        }
    }
    if (o?.pattern) {
        if (!t.pattern.value.test(v)) {
            return { type: "pattern", message: t.pattern.message, schema: t };
        }
    }
    if (o?.validate) {
        if (!t.validate.value(v)) {
            return { type: "validate", message: t.validate.message, schema: t };
        }
    }
    if (o?.area && resource?.[t.area.value] && resource[t.area.value].options) {
        let index = lodash.findIndex(resource[t.area.value].options, { value: v });
        if (index === -1) {
            return { type: "resource", message: t.area.message, schema: t };
        }
    }
};

const getValidateObject = (o?: any) => {
    let t: any = {};

    if (o === undefined || o === null) return o;
    if (o.required !== undefined && typeof o.required !== "object") {
        t.required = {
            value: o.required,
            message: "msg.com.00005",
            type: "required",
        };
    }
    if (o.min !== undefined && typeof o.min !== "object") {
        t.min = {
            value: o.min,
            message: "msg.com.00006",
            type: "min",
        };
    }
    if (o.max !== undefined && typeof o.max !== "object") {
        t.max = {
            value: o.max,
            message: "msg.com.00007",
            type: "max",
        };
    }
    if (o.minLength !== undefined && typeof o.minLength !== "object") {
        t.minLength = {
            value: o.minLength,
            message: "msg.com.00008",
            type: "minLength",
        };
    }

    if (o.maxLength !== undefined && typeof o.maxLength !== "object") {
        t.maxLength = {
            value: o.maxLength,
            message: "msg.com.00009",
            type: "maxLength",
        };
    }

    if (o.pattern !== undefined && o.pattern instanceof RegExp) {
        t.pattern = {
            value: o.pattern,
            message: "msg.com.00010",
            type: "pattern",
        };
    }

    if (o.validate !== undefined && typeof o.validate !== "object") {
        t.validate = {
            value: o.validate,
            message: "msg.com.00011",
            type: "validate",
        };
    }

    if (o.area !== undefined && typeof o.area !== "object") {
        t.area = {
            value: o.area + (o.comnCd ? ":" + o.comnCd : ""),
            message: "msg.com.00017",
            type: "resource",
        };
    }

    return t;
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

    const excelToJson = (file: File, index: number = 0) => {
        return new Promise<ExcelToJsonReturn>((resolve, reject) => {
            if (file === undefined || file === null) {
                console.error(`file is not exist`);
                reject({
                    result: "fail",
                    error: { type: "no-file", message: t("msg.com.00003", { 0: t("L_EXCL") }), errors: [] },
                    data: [],
                });
                return;
            }

            const reader = new FileReader();

            reader.onload = (e: any) => {
                const data = e.target.result;
                const readedData = XLSX.read(data, { type: "binary" });

                if (!readedData.SheetNames[index]) {
                    console.error(`sheet is not exist. [ sheet index :  ${index} ]`);
                    reject({
                        result: "fail",
                        error: { type: "no-sheet", message: t("msg.com.00015"), errors: [] },
                        data: [],
                    });
                    return;
                }

                const wsname = readedData.SheetNames[index];
                const ws = readedData.Sheets[wsname];
                const rawData: Array<Array<any>> = XLSX.utils.sheet_to_json(ws, { header: 1 });

                if (comnUtils.isEmpty(rawData) || comnUtils.isEmptyArray(rawData)) {
                    console.error(`data is not exist`);
                    reject({
                        result: "fail",
                        error: { type: "no-data", message: t("msg.com.00012"), errors: [] },
                        data: [],
                    });
                    return;
                }

                if (data.length < 2) {
                    reject({
                        result: "fail",
                        error: { type: "no-schema", message: t("msg.com.00015"), errors: [] },
                        data: rawData.slice(2),
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
                    result: "success",
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

    return { schema: _schema, process, dataToExcel, excelToJson, setEdit, validateForGrid };
};
