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
        const { options = {}, head, body } = defaultSchema;

        _grid.current = {
            _initialized: false,
            _defaultSchema: defaultSchema,
            _key: uuid(),

            _page,
            _size,
            _setPage,
            _setSize,

            _data: null,
            _origin: [],
            _content: [],
            _view: [],
            _originTotalCount: 0,
            _totalCount: 0,
            _sort: {},
            _rect: [],
            _checked: [],
            _groupStatus: {},
            _selectedRow: null,
            _selectedCel: null,
            _editingRow: [],

            _add: options.add,
            _edit: options.edit,
            _index: options.index,
            _radio: options.radio,
            _delete: options.delete,
            _checkbox: options.checkbox,
            _pagination: options.pagination,
            _exportExcel: options.exportExcel,
            _importExcel: options.importExcel,
            _autoHeight: options.height === "auto",
            _height: options.height === "auto" ? 0 : options.height || 400,
            _cols: head.length,

            _group: Array.isArray(options.group)
                ? options.group.reduce((p: any, c: any, seq: any) => {
                      return { ...p, [c]: { seq } };
                  }, {})
                : {},

            _rule: defaultSchema.body
                .flatMap(({ cells }: any) => cells)
                .reduce((prev: any, curr: any) => {
                    const ary = getValidationArray(curr);
                    if (ary.length) prev[curr.binding] = ary;
                    return prev;
                }, {}),

            _head: head.map((_: any) => {
                const show = _.show === true ? true : _.show === false ? false : true;
                const cells = _.cells.map((__: any) => {
                    return { ...__, show };
                });
                return { ..._, show, cells };
            }),
            _body: body.map((_: any, i: any) => {
                const col = head[i];
                const id = col?.id;
                const show = col?.show;

                const cells = _.cells.map((__: any) => {
                    const edit =
                        __.edit === true
                            ? true
                            : __.edit === false
                              ? false
                              : _.edit === true
                                ? true
                                : _.edit === false
                                  ? false
                                  : options?.edit === true
                                    ? true
                                    : false;
                    return { ...__, id, show, edit };
                });
                return { ..._, id, show, cells };
            }),
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
    const setEdit = (
        type: "column" | "cell" | "row" | "rowCell",
        target: string | TRow | { row: string | TRow; cell: string },
        value: boolean,
    ) => {
        _grid.current._setEdit(type, target, value);
    };
    const setShow = (type: "column", target: string, value: boolean) => {
        _grid.current._setShow(type, target, value);
    };
    const setPage = (next: number) => {
        _grid.current._handlePage?.(next);
    };
    const setSize = (next: number) => {
        _grid.current._handleSize?.(next);
    };

    /* GET */
    const getData = () => {
        return _grid.current._content;
    };
    const getOrigin = () => {
        return _grid.current._origin;
    };
    const getChecked = () => {
        return _grid.current._checked.length
            ? _grid.current._content.filter(({ __key }: any) => _grid.current._checked.includes(__key))
            : [];
    };
    const getSelectedRow = () => {
        return (
            _grid.current._selectedRow &&
            _grid.current._content.find(({ __key }: any) => __key === _grid.current._selectedRow)
        );
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
    const validate = () => {
        return _grid.current._validate();
    };
    const scrollToRow = (row: any) => {
        return _grid.current._scrollToRow(row);
    };

    /* EXCEL */
    const selectExcel = () => {
        return _grid.current._selectExcel();
    };
    const importExcel = (file?: any) => {
        return _grid.current._importExcel(file);
    };
    const exportExcel = () => {
        return _grid.current._exportExcel();
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
        scrollToRow,

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

const getValidationObject = (o: any) => {
    return ["required", "min", "max", "minLength", "maxLength", "pattern", "validate", "area"].reduce(
        (prev: any, type: any) => {
            if (o[type]) {
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
                    type = "resource";
                    value = o[type] + (o.comnCd ? ":" + o.comnCd : "");
                    message = "msg.com.00017";
                }

                prev[type] = { type, value, message };
            }
            return prev;
        },
        {},
    );
};
