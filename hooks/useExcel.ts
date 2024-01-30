import React from "react";
import * as XLSX from "xlsx";
import lodash from "lodash";
import { useTranslation } from "react-i18next";
import { comnUtils } from "@/comn/utils";
import { useModal } from "@/comn/hooks";
import { CommonErrors } from "@/comn/components/_";

type UseExcelProps = {
    edit?: boolean;
    template?: string;
    schema?: any;
    keys?: any;
    handler?: (data?: any, index?: number) => { data: Array<any> };
    onSuccess?: (data?: any) => void;
    onError?: (error?: any) => void;
};

type UseExcelReturn = {
    data: any;
    schema: any;
    uploadExcel: (...args: any) => void;
    downloadExcel: () => void;
    setEdit: (edit: boolean) => void;
};

export const useExcel = (props: UseExcelProps): UseExcelReturn => {
    const { edit = true, schema, handler, template, keys, onSuccess, onError } = props;
    const [_data, _setData] = React.useState<Array<any>>([]);
    const input = React.useRef<HTMLInputElement>(null);
    const modal = useModal();
    const { t } = useTranslation();
    const meta = React.useRef<any>({});

    const [_schema, _setSchema] = React.useState<any>({
        edit: edit,
        schema: schema,
        keys: keys,
        input: input,
        handler: handler,
        onSuccess: onSuccess,
        onError: onError,
    });

    const setSchemaMatrix = (schema: any) => {
        if (schema === undefined || comnUtils.isEmpty(schema) || comnUtils.isEmptyObject(schema)) {
            meta.current.schema = null;
            return;
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
                });
            });
            meta.current.schema = t;
        }
    };

    const validateBySchema = (data: Array<any>) => {
        let errors: Array<any> = [];
        data.forEach((item: any, index: number) => {
            Object.entries(item).forEach(([k, v]: any) => {
                let r: any = comnUtils.getValidatedValue(v, meta.current.schema[k]);
                if (r !== undefined)
                    errors.push({ row: index + 3, label: meta.current.labels[k], ...keyMapping(r, item, keys) });
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

    const parseData = (data: Array<Array<any>>) => {
        if (comnUtils.isEmpty(data) || comnUtils.isEmptyArray(data)) return [];
        if (data.length < 2) {
            console.warn(new Error("Grid meta, header information is'not exist."));
            return [];
        }
        let temp = data.slice(2);
        let result: Array<any> = [];
        meta.current.keys = data[0];
        meta.current.labels = {};
        data[0].forEach((item, index) => {
            meta.current.labels[item] = data[1][index];
        });

        temp.forEach((item: any) => {
            let t: { [key: string]: any } = {};
            meta.current.keys.forEach((key: any, index: number) => {
                t[key] = item[index];
            });
            result.push(t);
        });

        return result;
    };

    const uploadExcel = () => {
        if (input === null || input === undefined || input.current === undefined || input.current === null) return;
        const files = input.current.files || [];
        const f = files[0];
        const reader = new FileReader();

        reader.onload = (e: any) => {
            const data = e.target.result;
            const readedData = XLSX.read(data, { type: "binary" });
            const wsname = readedData.SheetNames[0];
            const ws = readedData.Sheets[wsname];
            const rawData: Array<Array<any>> = XLSX.utils.sheet_to_json(ws, { header: 1 });
            const parsedData = parseData(rawData);

            if (comnUtils.isEmptyArray(parsedData)) {
                modal.openModal({
                    content: t("msg.com.00012"),
                    onCancel: () => {
                        if (onError) onError({ type: "nodata", message: t("msg.com.00012"), errors: [], head: keys });
                    },
                });
                console.warn(t("msg.com.00012"));
                return;
            }
            try {
                setSchemaMatrix(schema);
            } catch (err) {
                modal.openModal({
                    content: t("msg.com.00013"),
                    onCancel: () => {
                        if (onError) {
                            onError({
                                type: "error-parse-schema",
                                message: t("msg.com.00013"),
                                errors: [],
                                head: keys,
                            });
                        }
                    },
                });

                console.warn(t("msg.com.00013"), err);
                return;
            }

            const errors = validateBySchema(parsedData);
            if (errors.length > 0) {
                modal.openModal({
                    content: t("msg.com.00014"),
                    onCancel: () => {
                        if (onError) {
                            onError({
                                type: "fail-validation",
                                message: t("msg.com.00014"),
                                errors: errors,
                                head: keys,
                            });
                        }
                    },
                });
                console.warn(t("msg.com.00014"));
                return;
            }

            if (handler) {
                parsedData.map((item, index) => {
                    return handler(item, index) || item;
                });
            }

            if (onSuccess) {
                onSuccess(parsedData);
            }

            _setData(parsedData);
        };
        reader.readAsBinaryString(f);
    };

    const downloadExcel = () => {
        //
    };
    const setEdit = (edit: boolean) => {
        _setSchema((prev: any) => {
            return { ...prev, edit: edit };
        });
    };

    return { schema: _schema, data: _data, uploadExcel, downloadExcel, setEdit };
};
