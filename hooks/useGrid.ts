import { useMemo, useRef, useState } from "react";
import { FormControlProps } from "../components";
import { getRef } from "../components/Grid/utils";

type TGridOptions = {
    add?: boolean;
    edit?: boolean;
    delete?: boolean;
    group?: boolean | string[];
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
    text?: string;
    aggregate?: "SUM" | "AVERAGE" | "MIN" | "MAX" | "COUNT";
    align?: "start" | "end" | "left" | "right" | "center";
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
    excel?: string;
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
    groupFoot?: TGridGroupColumn[];
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
    exportExcel: (arg?: any) => any;
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
            exportExcel: (arg) => {
                return _exec(() => _grid.current._exportExcel(arg ? arg : {}));
            },
        };
    }, []);

    obj.grid = { _grid };
    obj.page = _paging[0];
    obj.size = _sizing[0];

    return obj;
};
