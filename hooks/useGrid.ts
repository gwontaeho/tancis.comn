import React from "react";
import { v4 as uuid } from "uuid";
import { FormControlProps } from "../components";

export type TGridSchema = {
    id?: string;
    options?: {
        add?: boolean;
        edit?: boolean;
        delete?: boolean;
        group?: string[];
        radio?: boolean;
        checkbox?: boolean;
        index?: boolean | "DESC" | "ASC";
        importExcel?: boolean;
        exportExcel?: boolean;
        height?: number | "auto";
        pagination?: "in" | "out" | false;
    };
    head: {
        id?: string;
        show?: boolean;
        colspan?: number;
        cells: {
            width?: string | number;
            header?: string;
            binding?: string;
            required?: boolean;
            colspan?: number;
            rowspan?: number;
        }[];
    }[];
    body: {
        edit?: boolean;
        colspan?: number;
        cells: (FormControlProps & {
            /** validation */
            min?: any;
            max?: any;
            minLength?: any;
            maxLength?: any;
            required?: any;
            pattern?: any;
            validate?: any;
            /** */

            binding?: string;
            colspan?: number;
            rowspan?: number;
            align?: "start" | "end" | "left" | "right" | "center";
        })[];
    }[];
};

type TRow = Record<string, any> & {
    __key: string;
    __type: "origin" | "updated" | "deleted";
};

type UseGridProps = {
    defaultSchema: TGridSchema;
    page?: number;
    size?: number;
};

export const useGrid = (props: UseGridProps) => {
    const { defaultSchema, page = 0, size = 10 } = props;

    const [_page, _setPage] = React.useState(page);
    const [_size, _setSize] = React.useState(size);

    const _grid = React.useRef<any>(null);
    if (_grid.current === null) {
        _grid.current = {
            _initialized: false,
            _defaultSchema: defaultSchema,
            _key: uuid(),

            _page,
            _size,
            _setPage,
            _setSize,

            /**
             * _dataCreated         : data created time
             * _dataUpdated         : data updated time
             * _origin              : original data
             * _content             : current data
             * _originTotalCount    : original total count
             * _totalCount          : current total count
             *
             */
        };
    }

    /* SET */
    const setData = (data: any) => {
        _grid.current._setData(data);
    };
    const resetData = () => {
        _grid.current._resetData();
    };
    const setOption = (target: "add" | "delete" | "edit" | "index" | "radio" | "checkbox" | "height", value: any) => {
        _grid.current._setOption(target, value);
    };
    const setEdit = (type: "column" | "cell" | "row", target: string | TRow, value: boolean) => {
        _grid.current._setEdit(type, target, value);
    };
    const setShow = (type: "column", target: string, value: boolean) => {
        _grid.current._setShow(type, target, value);
    };
    const setPage = (next: number) => {
        _grid.current._handlePage(next);
    };
    const setSize = (next: number) => {
        _grid.current._handleSize(next);
    };

    /* GET */
    const getData = () => {
        return _grid.current._content;
    };
    const getOrigin = () => {
        return _grid.current._origin;
    };
    const getChecked = () => {
        return _grid.current._checked;
    };
    const getSelectedRow = () => {
        return _grid.current._selectedRow;
    };
    const getSelectedCell = () => {
        return _grid.current._selectedCel;
    };
    const isChecked = () => {
        return Boolean(_grid.current._checked.length);
    };
    const isSelectedRow = () => {
        return Boolean(_grid.current._selectedRow);
    };
    const isSelectedCell = () => {
        return Boolean(_grid.current._selectedCel);
    };

    /* CONTROL */
    const addRow = (data?: Record<string, any>) => {
        _grid.current._handleAdd(data);
    };
    const deleteRow = (type: "radio" | "checkbox" | "all" | TRow | TRow[]) => {
        _grid.current._handleDelete(type);
    };
    const updateRow = (row: TRow) => {
        _grid.current._handleUpdate(row);
    };
    const validate = (content?: any) => {
        return _grid.current._validate(content);
    };

    /* EXCEL */
    const selectExcel = () => {
        return _grid.current._selectExcel();
    };
    const importExcel = (file?: any) => {
        return _grid.current._importExcel(file);
    };
    const exportExcel = () => {};

    return {
        grid: { _grid },
        page: _page,
        size: _size,

        getData,
        getOrigin,
        getChecked,
        getSelectedRow,
        getSelectedCell,
        isChecked,
        isSelectedRow,
        isSelectedCell,

        addRow,
        deleteRow,
        updateRow,
        setEdit,
        setShow,
        setOption,
        setPage,
        setSize,
        setData,
        resetData,
        validate,

        selectExcel,
        importExcel,
        exportExcel,
    };
};

const getValidationArray = (o: any) => {
    return ["required", "min", "max", "minLength", "maxLength", "pattern", "validate", "area"]
        .map((type) => {
            if (!o[type]) return;

            let value;
            let message;

            if (typeof o[type] === "object") {
                if (o[type].hasOwnProperty("value")) {
                    value = o[type].value;
                } else value = o[type];

                if (o[type].hasOwnProperty("message")) {
                    message = o[type].message;
                }
            } else {
                value = o[type];
            }

            if (!message) {
                switch (type) {
                    case "required":
                        if (o[type] === "string") message = o[type];
                        else message = "msg.com.00005";
                        break;
                    case "min":
                        message = "msg.com.00006";
                        break;
                    case "max":
                        message = "msg.com.00007";
                        break;
                    case "minLength":
                        message = "msg.com.00008";
                        break;
                    case "maxLength":
                        message = "msg.com.00009";
                        break;
                    case "pattern":
                        message = "msg.com.000010";
                        break;
                    case "validate":
                        message = "msg.com.000011";
                        break;
                    default:
                        break;
                }
            }

            if (type === "area") {
                value = o[type] + (o.comnCd ? ":" + o.comnCd : "");
                message = "msg.com.00017";
                type = "resource";
            }

            return { type, value, message };
        })
        .filter(Boolean);
};

// const getValidationObject = (o: any) => {
//     return ["required", "min", "max", "minLength", "maxLength", "pattern", "validate", "area"].reduce(
//         (prev: any, type: any) => {
//             if (o[type]) {
//                 let value;
//                 let message;

//                 if (typeof o[type] === "object") {
//                     if (o[type].hasOwnProperty("value")) {
//                         value = o[type].value;
//                     } else value = o[type];

//                     if (o[type].hasOwnProperty("message")) {
//                         message = o[type].message;
//                     }
//                 } else {
//                     value = o[type];
//                 }

//                 if (!message) {
//                     switch (type) {
//                         case "required":
//                             if (o[type] === "string") message = o[type];
//                             else message = "msg.com.00005";
//                             break;
//                         case "min":
//                             message = "msg.com.00006";
//                             break;
//                         case "max":
//                             message = "msg.com.00007";
//                             break;
//                         case "minLength":
//                             message = "msg.com.00008";
//                             break;
//                         case "maxLength":
//                             message = "msg.com.00009";
//                             break;
//                         case "pattern":
//                             message = "msg.com.000010";
//                             break;
//                         case "validate":
//                             message = "msg.com.000011";
//                             break;
//                         default:
//                             break;
//                     }
//                 }

//                 if (type === "area") {
//                     type = "resource";
//                     value = o[type] + (o.comnCd ? ":" + o.comnCd : "");
//                     message = "msg.com.00017";
//                 }

//                 prev[type] = { type, value, message };
//             }
//             return prev;
//         },
//         {},
//     );
// };
