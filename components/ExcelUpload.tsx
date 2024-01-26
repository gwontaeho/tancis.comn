import React from "react";
import * as XLSX from "xlsx";
import { Icon } from "@/comn/components";
import { Button } from "@/comn/components";
import { comnEnvs, comnUtils } from "@/comn/utils";
import { useTranslation } from "react-i18next";
import { useModal } from "@/comn/hooks";
import lodash from "lodash";

type ExcelUploadProps = {
    edit?: boolean;
    schema?: any;
    handler?: (args: any) => {};
    onSuccess?: (args: any) => {};
    onError?: (args: any) => {};
};

export const ExcelUpload = (props: ExcelUploadProps) => {
    const { edit, schema, handler, onSuccess, onError } = props;
    const input = React.useRef<HTMLInputElement>(null);
    const modal = useModal();
    const { t } = useTranslation();
    const meta = React.useRef<any>({});

    const setSchemaMatrix = (schema: any) => {
        if (schema === undefined || comnUtils.isEmpty(schema) || comnUtils.isEmptyObject(schema)) {
            meta.current.schema = null;
            return;
        }

        let t: { [key: string]: any } = {};
        if (lodash.isArray(schema)) {
            schema.map((item: any) => {
                if (item.cells === undefined || comnUtils.isEmptyArray(item)) return false;
                item.cells.map((cell: any) => {
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

    const uploadExcel = (target?: HTMLInputElement | null) => {
        if (target === null || target === undefined) return;
        const files = target.files || [];
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
                console.warn("There is no data in the uploaded Excel.");
                if (onSuccess) onSuccess(parsedData);
                return;
            }
            setSchemaMatrix(schema);
            validateBySchema(parsedData);
        };
        reader.readAsBinaryString(f);
    };

    const validateBySchema = (data: Array<any>) => {
        let errors: Array<any> = [];
        data.forEach((item: any, index: number) => {
            Object.entries(item).map(([k, v]: any) => {
                let r = comnUtils.getValidatedValue(v, meta.current.schema[k]);
                if (r !== undefined) errors.push({ row: index + 1, label: meta.current.labels[k], ...r });
            });
        });

        console.log(errors);
    };

    const parseData = (data: Array<Array<any>>) => {
        if (comnUtils.isEmpty(data) || comnUtils.isEmptyArray(data)) return [];
        if (data.length < 2) {
            console.error(new Error("Grid meta, header information is'not exist."));
            return [];
        }
        let temp = data.slice(2);
        let result: Array<any> = [];
        meta.current.keys = data[0];
        meta.current.labels = {};
        data[0].map((item, index) => {
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

    return edit === true ? (
        <>
            <Button variant="secondary">Template</Button>
            <div className="uf-form-control min-w-fit">
                <div className="uf-form-control-main">
                    <div className="w-full relative flex items-center">
                        <div className="w-full">
                            <div>
                                <label>
                                    <div className="input uf-button bg-uf-main cursor-pointer">
                                        <Icon icon={"fileSearch"} />
                                    </div>
                                    <input hidden={true} type="file" ref={input} accept=".xlsx, .xls" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Button
                variant="warning"
                onClick={() => {
                    const value = input.current?.value;
                    if (comnUtils.isEmpty(value)) {
                        modal.openModal({
                            content: t("msg.com.00003", { 0: t("Excel") }),
                        });
                        return;
                    } else {
                        modal.openModal({
                            content: t("msg.com.00004", { 0: t("Excel") }),
                            onConfirm: () => {
                                uploadExcel(input.current);
                            },
                        });
                    }
                }}
            >
                Upload
            </Button>
        </>
    ) : (
        <></>
    );
};
