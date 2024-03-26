import { v4 as uuid } from "uuid";
import { getView, fun, makeTemplate } from "./utils";

/**
 * ## State Initializer
 * @param param0
 * @returns
 */
const createInitialState = ({ _grid }: any) => {
    const _head = fun(_grid.current._head);
    const _template = makeTemplate(_head);

    return {
        _cols: _grid.current._head.length,
        _head,
        _template,
        _body: fun(_grid.current._body),
        _group: _grid.current._groupSchema && fun(_grid.current._groupSchema),
        _groupFoot: _grid.current._groupFootSchema && fun(_grid.current._groupFootSchema),
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
            next._totalItemCount = _grid.current._totalItemCount;
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
            next._totalItemCount = _grid.current._totalItemCount;
            return next;
        }
        /* Clear data */
        case "clearData": {
            next._test = [];
            next._totalCount = 0;
            next._totalItemCount = 0;
            next._page = 0;
            next._size = 10;
            return next;
        }
        /* Add row  */
        case "add": {
            const { _grid } = action.payload;
            next._test = _grid.current._view;
            next._totalCount = _grid.current._totalCount;
            next._totalItemCount = _grid.current._totalItemCount;
            return next;
        }
        /* Delete row */
        case "delete": {
            const { _grid } = action.payload;
            next._test = _grid.current._view;
            next._totalCount = _grid.current._totalCount;
            next._totalItemCount = _grid.current._totalItemCount;
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
            next._totalItemCount = _grid.current._totalItemCount;
            return next;
        }
        /* Set edit */
        case "setEdit": {
            const { _grid } = action.payload;
            next._body = fun(_grid.current._body);
            next._editingRow = _grid.current._editingRow;
            return next;
        }
        /* Set show */
        case "setShow": {
            const { _grid } = action.payload;
            next._head = fun(_grid.current._head);
            next._body = fun(_grid.current._body);
            return next;
        }
        /* Set Option */
        case "setOption": {
            const { _grid, target } = action.payload;
            next._body = fun(_grid.current._body);
            next._options[target] = _grid.current[`_${target}`];
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
        /* unCheck */
        case "unCheck": {
            const { _grid } = action.payload;
            next._checked = _grid.current._checked;
            return next;
        }
        /* unCheck */
        case "unSelectRow": {
            const { _grid } = action.payload;
            next._selectedRow = _grid.current._selectedRow;
            return next;
        }
        /* unCheck */
        case "unSelectCel": {
            const { _grid } = action.payload;
            next._selectedCel = _grid.current._selectedCel;
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
        /* Set Schema */
        case "setSchema": {
            const { _grid } = action.payload;

            return createInitialState({ _grid });
        }
        default:
            return next;
    }
};

export { createInitialState, reducer };
