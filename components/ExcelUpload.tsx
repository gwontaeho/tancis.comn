import React, { useState } from "react";
import { Button } from "@/comn/components";
import {} from "@/comn/components";
import { useTranslation } from "react-i18next";
import { useModal, useTheme } from "@/comn/hooks";

type ExcelUploadProps = {
    edit?: boolean;
    template?: any;
    onChange?: (args: any) => {};
    onUpload?: (args: any) => {};
};

export const ExcelUpload = (props: ExcelUploadProps) => {
    const { edit, template, onUpload } = props;
    const { t } = useTranslation(); // Translation Hook !== 언어 변환 Hook ==!
    const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!
    const input = React.useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState("");
    const { theme } = useTheme();

    /*
    
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
                console.warn(t("msg.com.00012"));
                modal.openModal({ content: t("msg.com.00012") });
                if (onError) onError({ type: "nodata", message: t("msg.com.00012"), errors: [] });
                return;
            }
            try {
                setSchemaMatrix(schema);
            } catch (err) {
                modal.openModal({ content: t("msg.com.00013") });
                if (onError) {
                    onError({
                        type: "fail-parse-schema",
                        message: t("msg.com.00013"),
                        errors: [],
                    });
                }
                console.warn(t("msg.com.00013"), err);
                return;
            }

            const errors = validateBySchema(parsedData);
            if (errors.length > 0) {
                const result = {
                    type: "fail-validation",
                    message: t("msg.com.00014"),
                    errors: errors,
                    head: keys,
                };
                modal.openModal({
                    content: t("msg.com.00014"),
                    onCancel: () => {
                        modal.openModal({
                            content: <CommonErrors {...result} />,
                            draggable: true,
                            size: "lg",
                            title: "Error List",
                        });
                    },
                });

                if (onError) onError(result);
                console.warn(t("msg.com.00014"));
                return;
            }

            if (handler) {
                let _errors: Array<any> = [];
                parsedData.map((item, index) => {
                    const { data, error } = handler(item, index);
                    if (error !== undefined) {
                        _errors.push(error);
                    }
                    return data;
                });

                console.log(_errors);

                if (_errors.length > 0) {
                    if (onError) {
                        onError({
                            type: "fail-handler",
                            message: t("msg.com.0001"),
                            errors: _errors,
                        });
                    }
                    return;
                }
                if (onSuccess) {
                    onSuccess(parsedData);
                    return;
                }
            }
            if (onSuccess) {
                console.log(parsedData);
                onSuccess(parsedData);
            }
        };
        reader.readAsBinaryString(f);
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
            console.error(new Error("Grid meta, header information is'not exist."));
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
    */

    return edit === true ? (
        <>
            <div className="flex border rounded divide-x overflow-hidden">
                <div className="[&_*]:border-none [&_*]:rounded-none">
                    <Button variant="secondary">
                        <a href={`${process.env.PUBLIC_URL}/assets/${template}_${theme.lang.toLocaleLowerCase()}.xlsx`}>
                            {t("B_TMPL")}
                        </a>
                    </Button>
                </div>
                <div className="[&_*]:border-none [&_*]:rounded-none min-w-fit">
                    <div className="w-full relative flex items-center">
                        <div className="min-w-fit">
                            <label>
                                <div className={"input " + (fileName === "" ? "hidden" : "max-w-fit")}>{fileName}</div>
                                <input
                                    hidden={true}
                                    type="file"
                                    ref={input}
                                    accept=".xlsx, .xls"
                                    className="w-5"
                                    onChange={(e: any) => {
                                        if (e.target.files[0]?.name) {
                                            setFileName(e.target.files[0].name);
                                        } else {
                                            setFileName("");
                                        }
                                    }}
                                />
                            </label>
                        </div>
                        <button
                            type="button"
                            className="uf-right-button"
                            onClick={() => {
                                input.current?.click();
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-3 h-3"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="[&_*]:border-none [&_*]:rounded-none">
                    <Button
                        variant="warning"
                        onClick={() => {
                            if (input.current && input.current.files && input.current.files.length > 0) {
                                modal.openModal({
                                    content: t("msg.com.00004", { 0: t("L_EXCL") }),
                                    onConfirm: () => {
                                        if (onUpload && input && input.current && input.current.files)
                                            onUpload(input.current.files[0] || null);
                                    },
                                });
                            } else {
                                modal.openModal({
                                    content: t("msg.com.00003", { 0: t("L_EXCL") }),
                                });
                            }
                        }}
                    >
                        {t("B_UPLD")}
                    </Button>
                </div>
            </div>
        </>
    ) : (
        <></>
    );
};
