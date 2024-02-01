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
                    error: { type: "no-file", message: "msg.com.00003", errors: [] },
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

    return { schema: _schema, process, dataToExcel, excelToJson, setEdit };
};
