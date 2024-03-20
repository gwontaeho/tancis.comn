import { useMemo, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { FormControlProps } from "../components";

type TGridOptions = {
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
type TGridGroupCell = {
    binding?: string;
    colspan?: number;
    rowspan?: number;
    aggregate?: "SUM" | "AVERAGE" | "MIN" | "MAX" | "COUNT";
};
type TGridGroupColumn = {
    colspan?: number;
    cells: TGridGroupCell[];
};
type TGridHeadCell = {
    width?: string | number;
    header?: string;
    binding?: string;
    required?: boolean;
    colspan?: number;
    rowspan?: number;
};
type TGridHeadColumn = {
    id?: string;
    show?: boolean;
    colspan?: number;
    cells: TGridHeadCell[];
};
type TGridBodyCell = FormControlProps & {
    header?: string;
    /** */
    binding?: string;
    colspan?: number;
    rowspan?: number;
    align?: "start" | "end" | "left" | "right" | "center";
};
type TGridBodyColumn = {
    edit?: boolean;
    colspan?: number;
    cells: TGridBodyCell[];
};

export type TGridSchema = {
    id?: string;
    options?: TGridOptions;
    group?: TGridGroupColumn[];
    head: TGridHeadColumn[];
    body: TGridBodyColumn[];
};

type TRowKey = "string";
type TRowType = "origin" | "updated" | "deleted" | "added";

type TRow = Record<string, any> & {
    __key: TRowKey;
    __type: TRowType;
};

type UseGridProps = {
    defaultSchema: TGridSchema;
    page?: number;
    size?: number;
};

const getRef = (schema: any, paging: any, sizing: any) => {
    const { options = {}, head, body, group } = schema;
    const [_page, _setPage] = paging;
    const [_size, _setSize] = sizing;

    return {
        _initialized: false,
        _queue: [],

        _defaultSchema: schema,
        _key: uuid(),

        _page,
        _size,
        _setPage,
        _setSize,

        _data: null,
        _origin: [],
        _content: [],
        _view: [],
        _totalCount: 0,
        _originTotalCount: 0,
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
        _rule: body
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
        _groupSchema: group,
    };
};

type UseGridReturn = {
    grid: any;
    page: number;
    size: number;
    setSchema: (schema: TGridSchema) => void;
    setOption: (target: "add" | "delete" | "edit" | "index" | "radio" | "checkbox" | "height", value: any) => void;
    setEdit: (
        type: "column" | "cell" | "row" | "rowCell",
        target: string | TRow | { row: string | TRow; cell: string },
        value: boolean,
    ) => void;
    setShow: (type: "column", target: string, value: boolean) => void;
    unCheck: () => void;
    unSelectRow: () => void;
    unSelectCell: () => void;
    getData: (options?: { excludes: TRowType[] }) => any[];
    getViewData: () => any[];
    getDeletedData: () => any[];
    getAddedData: () => any[];
    getUpdatedData: () => any[];
    getOrigin: () => any[];
    getChecked: () => any[];
    getSelectedRow: () => any;
    getSelectedCell: () => any;
    isChecked: () => boolean;
    isSelectedRow: () => boolean;
    isSelectedCell: () => boolean;
    validate: () => any;
    addRow: (data?: Record<string, any>) => void;
    deleteRow: (type: "radio" | "checkbox" | "all" | TRow | TRow[]) => void;
    updateRow: (row: TRow) => void;
    setData: (data: any) => void;
    resetData: () => void;
    clearData: () => void;
    getSize: () => number;
    getPage: () => number;
    setPage: (next: number) => void;
    setSize: (next: number) => void;
    importExcel: (arg?: any) => any;
    exportExcel: () => any;
};

export const useGrid = (props: UseGridProps): UseGridReturn => {
    const { defaultSchema, page = 0, size = 10 } = props;

    const _paging = useState(page);
    const _sizing = useState(size);

    const _grid = useRef<any>(null);
    if (_grid.current === null) {
        _grid.current = getRef(defaultSchema, _paging, _sizing);
    }

    const obj = useMemo<UseGridReturn>(() => {
        const _exec = (fn: any) => {
            if (_grid.current._initialized === false) {
                _grid.current._queue.push(fn);
            } else return fn();
        };

        return {
            grid: null,
            page: 0,
            size: 10,
            setSchema: (schema) => {
                _grid.current = { ..._grid.current, ...getRef(schema, _paging, _sizing) };
                _grid.current._initialized = true;
                _grid.current._setSchema();
            },
            setOption: (target, value) => {
                _exec(() => _grid.current._setOption(target, value));
            },
            setEdit: (type, target, value) => {
                _exec(() => _grid.current._setEdit(type, target, value));
            },
            setShow: (type, target, value) => {
                _exec(() => _grid.current._setShow(type, target, value));
            },
            unCheck: () => {
                _exec(() => _grid.current._unCheck());
            },
            unSelectRow: () => {
                _exec(() => _grid.current._unSelectRow());
            },
            unSelectCell: () => {
                _exec(() => _grid.current._unSelectCel());
            },
            getData: (options) => {
                if (options) {
                    if (Array.isArray(options.excludes)) {
                        return _grid.current._content.filter(({ __type }: any) => {
                            return !options.excludes.includes(__type);
                        });
                    }
                }
                return _grid.current._content;
            },
            getViewData: () => {
                return _grid.current._content.filter((_: any) => {
                    return _.__type !== "deleted";
                });
            },
            getDeletedData: () => {
                return _grid.current._content.filter((_: any) => {
                    return _.__type === "deleted";
                });
            },
            getAddedData: () => {
                return _grid.current._content.filter((_: any) => {
                    return _.__type === "added";
                });
            },
            getUpdatedData: () => {
                return _grid.current._content.filter((_: any) => {
                    return _.__type === "updated";
                });
            },
            getOrigin: () => {
                return _grid.current._origin;
            },
            getChecked: () => {
                return _grid.current._checked.length
                    ? _grid.current._content.filter(({ __key }: any) => _grid.current._checked.includes(__key))
                    : [];
            },
            getSelectedRow: () => {
                return (
                    _grid.current._selectedRow &&
                    _grid.current._content.find(({ __key }: any) => __key === _grid.current._selectedRow)
                );
            },
            getSelectedCell: () => {
                return _grid.current._selectedCel;
            },
            isChecked: () => {
                return Boolean(_grid.current._checked.length);
            },
            isSelectedRow: () => {
                return Boolean(_grid.current._selectedRow);
            },
            isSelectedCell: () => {
                return Boolean(_grid.current._selectedCel);
            },
            validate: () => {
                return _exec(() => _grid.current._validate());
            },
            addRow: (data) => {
                _exec(() => _grid.current._handleAdd(data));
            },
            deleteRow: (type) => {
                _exec(() => _grid.current._handleDelete(type));
            },
            updateRow: (row) => {
                _exec(() => _grid.current._handleUpdate(row));
            },
            setData: (data) => {
                _exec(() => _grid.current._setData(data));
            },
            resetData: () => {
                _exec(() => _grid.current._resetData());
            },
            clearData: () => {
                _exec(() => _grid.current._clearData());
            },
            getSize: () => {
                return _grid.current._size;
            },
            getPage: () => {
                return _grid.current._page;
            },
            setPage: (next) => {
                _exec(() => _grid.current._handlePage?.(next));
            },
            setSize: (next) => {
                _exec(() => _grid.current._handleSize?.(next));
            },
            importExcel: (arg) => {
                return _exec(() => _grid.current._importExcel(arg));
            },
            exportExcel: () => {
                return _exec(() => _grid.current._exportExcel());
            },
        };
    }, []);

    obj.grid = { _grid };
    obj.page = _paging[0];
    obj.size = _sizing[0];

    return obj;
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
                        message = "msg.com.00010";
                        break;
                    case "validate":
                        message = "msg.com.00011";
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
