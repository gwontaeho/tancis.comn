import React from "react";
import { useEffect, useReducer, useRef } from "react";
import lodash from "lodash";

type UseExcelProps = {
    edit?: boolean;
    template?: string;
    schema?: any;
    keys?: any;
    handler?: (data?: any) => { data: Array<any> };
    onSuccess?: (data?: any) => void;
    onError?: (error?: any) => void;
};

type UseExcelReturn = {
    data: any;
    schema: any;
    upload: (...args: any) => void;
    download: () => void;
    setEdit: (edit: boolean) => void;
};

export const useExcel = (props: UseExcelProps): UseExcelReturn => {
    const { edit = true, schema, handler, template, keys, onSuccess, onError } = props;

    const [_data, _setData] = React.useState<Array<any>>([]);
    const [_schema, _setSchema] = React.useState<any>({
        edit: edit,
        schema: schema,
        keys: keys,
        handler: handler,
        onSuccess: onSuccess,
        onError: onError,
    });

    const upload = () => {};
    const download = () => {};
    const setEdit = (edit: boolean) => {
        _setSchema((prev: any) => {
            return { ...prev, edit: edit };
        });
    };

    return { schema: _schema, data: _data, upload, download, setEdit };
};
