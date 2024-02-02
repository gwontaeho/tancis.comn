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
        checkbox?: boolean;
        radio?: boolean;
        index?: boolean | "DESC" | "ASC";
        importExcel?: boolean;
        exportExcel?: boolean;
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
            /** */
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

export const useGrid = (props: UseGridProps) => {
    const { defaultSchema } = props;

    const [_page, _setPage] = React.useState(0);
    const [_size, _setSize] = React.useState(10);

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

        /** head ref for sync scroll */
        _head: null,
        _list: null,
        _headRects: [],

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
        // _handleClickAdd
        // _handleClickDelete
        // _handleChangePage
        // _handleChangeSize
    });

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
    const updateRow = (row: TRow) => {
        _grid.current._handleUpdate(row);
    };
    const addRow = (data?: Record<string, any>) => {
        _grid.current._handleClickAdd?.(data);
    };
    const deleteRow = (type: "radio" | "checkbox" | "all" | TRow | TRow[]) => {
        _grid.current._handleClickDelete?.(type);
    };
    const setOption = (target: "add" | "delete" | "edit" | "index" | "radio" | "checkbox", value: any) => {
        _grid.current._setOption?.(target, value);
    };
    const setEdit = (type: "column" | "cell" | "row", target: string | TRow, value: boolean) => {
        _grid.current._setEdit?.(type, target, value);
    };
    const setShow = (type: "column", target: string, value: boolean) => {
        _grid.current._setShow?.(type, target, value);
    };
    const setPage = (next: number) => {
        _grid.current._handleChangePage(next);
    };
    const setSize = (next: number) => {
        _grid.current._handleChangeSize(next);
    };
    const resetData = () => {
        _grid.current._resetData();
    };
    const setData = (data: any) => {
        _grid.current._setData(data);
    };

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
    };
};
