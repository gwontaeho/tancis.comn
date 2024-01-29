import React from "react";
import { v4 as uuid } from "uuid";

export const useGrid = (props: any) => {
    const { defaultSchema } = props;

    const [_page, _setPage] = React.useState(0);
    const [_size, _setSize] = React.useState(10);

    const _grid = React.useRef<any>({
        _defaultSchema: defaultSchema,
        _key: uuid(),
        _initialized: false,
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
        _group: Array.isArray(defaultSchema.options.group)
            ? defaultSchema.options.group.reduce((p: any, c: any, seq: any) => {
                  return { ...p, [c]: { seq } };
              }, {})
            : {},
        _groupStatus: {},

        /** sort */
        _sort: {},

        /** options */
        _index: defaultSchema.options.index,
        _checkbox: defaultSchema.options.checkbox,
        _radio: defaultSchema.options.radio,
        _edit: defaultSchema.options.edit,
        _add: defaultSchema.options.add,
        _delete: defaultSchema.options.delete,
        _exportExcel: defaultSchema.options.exportExcel,
        _importExcel: defaultSchema.options.importExcel,

        /** paging */
        _pagination: defaultSchema.options.pagination,
        _page,
        _size,
        _setPage,
        _setSize,

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
    const getSelectedCel = () => {
        return _grid.current._selectedCel;
    };
    const updateRow = (n: any) => {
        _grid.current._handleUpdate(n);
    };
    const addRow = (data?: any) => {
        _grid.current._handleClickAdd?.(data);
    };
    const deleteRow = (type: any) => {
        _grid.current._handleClickDelete?.(type);
    };
    const setOption = (target: any, value: any) => {
        _grid.current._setOption?.(target, value);
    };
    const setEdit = (type: any, target: any, value: any) => {
        _grid.current._setEdit?.(type, target, value);
    };
    const setShow = (type: any, target: any, value: any) => {
        _grid.current._setShow?.(type, target, value);
    };
    const setPage = (next: any) => {
        _grid.current._handleChangePage(next);
    };
    const setSize = (next: any) => {
        _grid.current._handleChangeSize(next);
    };
    const resetData = () => {
        _grid.current._resetData();
    };

    return {
        grid: { _grid },
        page: _page,
        size: _size,
        getData,
        getOrigin,
        getSelectedRow,
        getSelectedCel,
        getChecked,
        addRow,
        deleteRow,
        updateRow,
        setEdit,
        setShow,
        setOption,
        setPage,
        setSize,
        resetData,
    };
};
