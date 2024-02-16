import React from "react";
import { v4 as uuid } from "uuid";
import { FormControlProps } from "@/comn/components";

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

type TGridRef = {
    _initialized: boolean;
    _defaultSchema: TGridSchema;
    _key: string;

    _origin: any[];
    _content: any[];
    _checked: any[];
    _paged: any[];
    _selectedRow: any;
    _selectedCel: any;
    _totalCount: number;
    _originTotalCount: number;

    _head: any;
    _list: any;
};

export const useGrid = (props: UseGridProps) => {
    const { defaultSchema, page = 0, size = 10 } = props;

    const [_page, _setPage] = React.useState(page);
    const [_size, _setSize] = React.useState(size);

    const _grid = React.useRef<any>({
        _initialized: false,
        _defaultSchema: defaultSchema,
        _key: uuid(),
        _page,
        _size,
        _setPage,
        _setSize,

        /**
         * _headRef
         * _listRef
         * _rect
         *
         */

        /** group */
        _group: Array.isArray(defaultSchema.options?.group)
            ? defaultSchema.options?.group.reduce((p: any, c: any, seq: any) => {
                  return { ...p, [c]: { seq } };
              }, {})
            : {},

        /** options */
        _index: defaultSchema.options?.index,
        _checkbox: defaultSchema.options?.checkbox,
        _radio: defaultSchema.options?.radio,
        _edit: defaultSchema.options?.edit,
        _add: defaultSchema.options?.add,
        _delete: defaultSchema.options?.delete,
        _exportExcel: defaultSchema.options?.exportExcel,
        _importExcel: defaultSchema.options?.importExcel,
        _height: defaultSchema.options?.height === "auto" ? 0 : defaultSchema.options?.height || 400,
        _autoHeight: defaultSchema.options?.height === "auto",
        _pagination: defaultSchema.options?.pagination,
    });

    // Set
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

    // Get
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

    // Control
    const addRow = (data?: Record<string, any>) => {
        _grid.current._handleAdd(data);
    };
    const deleteRow = (type: "radio" | "checkbox" | "all" | TRow | TRow[]) => {
        _grid.current._handleDelete(type);
    };
    const updateRow = (row: TRow) => {
        _grid.current._handleUpdate(row);
    };

    const validate = () => {
        // const fieldRuleObject = _grid.current._defaultSchema.body
        //     .flatMap(({ cells }: any) => cells)
        //     .reduce((prev: any, curr: any) => {
        //         let next = prev;
        //         const ary = getValidationArray(curr);
        //         if (ary.length) {
        //             next[curr.binding] = ary;
        //         }
        //         return next;
        //     }, {});
        // return _grid.current._content.reduce((prev: any, row: any) => {
        //     for (const binding in fieldRuleObject) {
        //         const bindingValue = row[binding];
        //         const rowIndex = row["__index"];
        //         const rules = fieldRuleObject[binding];
        //         for (let i = 0; i < rules.length; i++) {
        //             let invalid = false;
        //             const { value, type } = rules[i];
        //             switch (type) {
        //                 case "required":
        //                     invalid = !bindingValue;
        //                     break;
        //                 case "min":
        //                     invalid = bindingValue < value;
        //                     break;
        //                 case "max":
        //                     invalid = bindingValue > value;
        //                     break;
        //                 case "minLength":
        //                     invalid = bindingValue.length < value;
        //                     break;
        //                 case "maxLength":
        //                     invalid = bindingValue.length > value;
        //                     break;
        //                 case "pattern":
        //                     invalid = !value.test(bindingValue);
        //                     break;
        //                 case "validate":
        //                     invalid = !value(bindingValue);
        //                     break;
        //                 case "resource":
        //                     break;
        //             }
        //             if (invalid) {
        //                 prev.push({ ...rules[i], binding, rowIndex, bindingValue });
        //             }
        //         }
        //     }
        //     return prev;
        // }, []);
    };

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
