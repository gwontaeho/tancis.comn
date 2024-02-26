import { v4 as uuid } from "uuid";
import { getView } from "./utils";

/**
 * ## State Initializer
 * @param param0
 * @returns
 */
const createInitialState = ({ _grid, data }: any) => {
    if (Array.isArray(data?.content)) {
        _grid.current._data = data;
        const origin = data.content.map((_: any) => ({ ..._, __key: uuid(), __type: "origin" }));
        _grid.current._origin = origin;
        _grid.current._content = origin;
        getView(_grid);
        _grid.current._originTotalCount = _grid.current._totalCount;
    }

    return {
        _cols: _grid.current._head.length,
        _head: _grid.current._head,
        _body: _grid.current._body,
        _groupSchema: _grid.current._groupSchema,
        _test: _grid.current._view,
        _totalCount: _grid.current._totalCount,
        _totalItemCount: _grid.current._totalItemCount,
        _editingRow: [],
        _page: _grid.current._page,
        _size: _grid.current._size,
        _sort: _grid.current._sort,
        _checked: _grid.current._checked,
        _selectedRow: _grid.current._selectedRow,
        _selectedCel: _grid.current._selectedCel,
        _options: {
            add: _grid.current._add,
            edit: _grid.current._edit,
            index: _grid.current._index,
            radio: _grid.current._radio,
            delete: _grid.current._delete,
            height: _grid.current._height,
            checkbox: _grid.current._checkbox,
            exportExcel: _grid.current._exportExcel,
            importExcel: _grid.current._importExcel,
            pagination: _grid.current._pagination,
        },
    };
};

/**
 * ## Reducer
 * @param state
 * @param action
 * @returns
 */
const reducer = (prev: any, action: any) => {
    const next = { ...prev };
    switch (action.type) {
        /* Set data  */
        case "setData": {
            const { _grid } = action.payload;
            next._page = _grid.current._page;
            next._size = _grid.current._size;
            next._test = _grid.current._view;
            next._totalCount = _grid.current._totalCount;
            next._checked = [];
            next._selectedRow = null;
            next._selectedCel = null;
            return next;
        }
        /* Set data to origin */
        case "resetData": {
            const { _grid } = action.payload;
            next._test = _grid.current._view;
            next._totalCount = _grid.current._totalCount;
            return next;
        }
        /* Add row  */
        case "add": {
            const { _grid } = action.payload;
            next._test = _grid.current._view;
            next._totalCount = _grid.current._totalCount;
            return next;
        }
        /* Delete row */
        case "delete": {
            const { _grid } = action.payload;
            next._test = _grid.current._view;
            next._totalCount = _grid.current._totalCount;
            next._checked = _grid.current._checked;
            next._selectedCel = _grid.current._selectedCel;
            next._selectedRow = _grid.current._selectedRow;
            return next;
        }
        /* Update row */
        case "update": {
            const { _grid } = action.payload;
            next._test = _grid.current._view;
            return next;
        }
        /* Sort */
        case "sort": {
            const { _grid } = action.payload;
            next._sort = _grid.current._sort;
            next._test = _grid.current._view;
            return next;
        }
        /* Group Toggle */
        case "group": {
            const { _grid } = action.payload;
            next._test = _grid.current._view;
            return next;
        }
        /* Set edit */
        case "setEdit": {
            const { _grid } = action.payload;
            next._body = _grid.current._body;
            next._editingRow = _grid.current._editingRow;
            return next;
        }
        /* Set show */
        case "setShow": {
            const { _grid } = action.payload;
            next._head = _grid.current._head;
            next._body = _grid.current._body;
            return next;
        }
        /* Set Option */
        case "setOption": {
            const { _grid, target } = action.payload;
            next._body = _grid.current._body;
            next._options[target] = _grid.current[target];
            return next;
        }
        /* Handle Select Cell  */
        case "handleClickCel": {
            const { _grid } = action.payload;
            next._selectedCel = _grid.current._selectedCel;
            return next;
        }
        /* Handle Select Row (Radio) */
        case "handleSelect": {
            const { _grid } = action.payload;
            next._selectedRow = _grid.current._selectedRow;
            return next;
        }
        /* Handle Check Row (Checkbox) */
        case "handleCheck": {
            const { _grid } = action.payload;
            next._checked = _grid.current._checked;
            return next;
        }
        /* Handle Check All Row (Checkbox) */
        case "handleCheckAll": {
            const { _grid } = action.payload;
            next._checked = _grid.current._checked;
            return next;
        }
        /* Handle Change Page */
        case "handleChangePage": {
            const { _grid } = action.payload;
            next._test = _grid.current._view;
            next._page = _grid.current._page;
            next._checked = [];
            next._selectedRow = null;
            next._selectedCel = null;
            return next;
        }
        /* Handle Change Size */
        case "handleChangeSize": {
            const { _grid } = action.payload;
            next._test = _grid.current._view;
            next._size = _grid.current._size;
            next._page = 0;
            next._checked = [];
            next._selectedRow = null;
            next._selectedCel = null;
            return next;
        }
        /* Readjust Row Height */
        case "readjustHeight": {
            const { _grid } = action.payload;
            next._options.height = _grid.current._height;
            return next;
        }
        default:
            return next;
    }
};

export { createInitialState, reducer };
