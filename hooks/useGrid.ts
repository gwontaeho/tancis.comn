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

            binding: string;
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

        _origin: [],
        _content: [],
        _checked: [],
        _paged: [],
        _selectedRow: null,
        _selectedCel: null,
        _totalCount: 0,
        _originTotalCount: 0,

        /** head ref for sync scroll */
        _head: null,
        _list: null,

        /** rows rect */
        _rect: [],

        /** group */
        _group: Array.isArray(defaultSchema.options?.group)
            ? defaultSchema.options?.group.reduce((p: any, c: any, seq: any) => {
                  return { ...p, [c]: { seq } };
              }, {})
            : {},
        _groupStatus: {},

        /** sort */
        _sort: {},

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

        /** paging */
        _pagination: defaultSchema.options?.pagination,
        _page,
        _size,
        _setPage,
        _setSize,

        // _setData
        // _setEdit
        // _setShow
        // _setOption
        // _resetData
        // _handleUpdate
        // _handleAdd
        // _handleDelete
        // _handlePage
        // _handleSize
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

    const validate = () => {};

    return {
        grid: { _grid },
        page: _page,
        size: _size,
        getData,
        getOrigin,
        getSelectedRow,
        getSelectedCell,
        getChecked,
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
        isChecked,
        isSelectedRow,
        isSelectedCell,
    };
};
