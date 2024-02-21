import lodash from "lodash";
import { v4 as uuid } from "uuid";
import { getCount, getView, fun } from "./utils";

/**
 * ## State Initializer
 * @param param0
 * @returns
 */
const createInitialState = ({ _grid, data }: any) => {
    const options = _grid.current._defaultSchema.options || {};

    _grid.current._data = data;
    _grid.current._sort = {};
    _grid.current._rect = [];
    _grid.current._checked = [];
    _grid.current._groupStatus = {};
    _grid.current._selectedRow = null;
    _grid.current._selectedCel = null;

    _grid.current._add = options.add;
    _grid.current._edit = options.edit;
    _grid.current._index = options.index;
    _grid.current._radio = options.radio;
    _grid.current._delete = options.delete;
    _grid.current._checkbox = options.checkbox;
    _grid.current._pagination = options.pagination;
    _grid.current._exportExcel = options.exportExcel;
    _grid.current._importExcel = options.importExcel;
    _grid.current._autoHeight = options.height === "auto";
    _grid.current._height = options.height === "auto" ? 0 : options.height || 400;
    _grid.current._group = Array.isArray(options.group)
        ? options.group.reduce((p: any, c: any, seq: any) => {
              return { ...p, [c]: { seq } };
          }, {})
        : {};

    const _head = _grid.current._defaultSchema.head.map((_: any) => {
        const show = _.show === true ? true : _.show === false ? false : true;
        const cells = _.cells.map((__: any) => {
            return { ...__, show };
        });
        return { ..._, show, cells };
    });
    const _body = _grid.current._defaultSchema.body.map((_: any, i: any) => {
        const head = _grid.current._defaultSchema.head[i];
        const id = head?.id;
        const show = head?.show;

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
                          : _grid.current._defaultSchema.options?.edit === true
                            ? true
                            : false;
            return { ...__, id, show, edit };
        });
        return { ..._, id, show, cells };
    });
    const _headCells = fun(_head);
    const _bodyCells = fun(_body);
    const _template = (() => {
        let w = Array(_headCells[0].length);
        for (let i = 0; i < _headCells.length; i++) {
            for (let j = 0; j < _headCells[i].length; j++) {
                if (w[j] === undefined) w[j] = 100;
                if (_headCells[i]?.[j]?.width !== undefined && _headCells[i]?.[j]?.colspan !== undefined) {
                    for (let k = j; k <= j + _headCells[i]?.[j]?.colspan; k++) {
                        if (k < _headCells[0].length) {
                            w[k] = _headCells[i]?.[j]?.width / _headCells[i]?.[j]?.colspan;
                        }
                    }
                }
                if (_headCells[i]?.[j]?.width !== undefined && _headCells[i]?.[j]?.colspan === undefined) {
                    w[j] = _headCells[i]?.[j].width;
                }
                if (_headCells[i]?.[j]?.show === false) {
                    w[j] = null;
                }
            }
        }
        return w
            .filter((_: any) => _)
            .map((_: any) => {
                if (typeof _ === "number") {
                    return `${_}px`;
                }
                if (typeof _ === "string") {
                    if (_.endsWith("*")) {
                        let t: any = _.slice(0, -1) || 1;
                        return `minmax( ${t * 100}px , ${t}fr)`;
                    }

                    if (_.endsWith("%")) {
                        return _;
                    }
                }
            })
            .join(" ");
    })();

    let _test = [];
    let view: any[] = [];
    let _totalCount;

    if (data) {
        if (!Array.isArray(data?.content)) {
            _test = [];
        } else {
            _test = data.content.map((_: any) => ({ ..._, __key: uuid(), __type: "origin" }));
        }

        _grid.current._origin = _test;
        _grid.current._content = _test;

        view = getView(_grid);
        _totalCount = getCount(_grid);
        _grid.current._originTotalCount = _totalCount;
    }

    return {
        _head,
        _body,
        _headCells,
        _bodyCells,
        _template,
        _totalCount,
        _test: view,
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
        },
    };
};

/**
 * ## Reducer
 * @param state
 * @param action
 * @returns
 */
const reducer = (state: any, action: any) => {
    switch (action.type) {
        /* Set data  */
        case "setData": {
            const { _grid, data } = action.payload;
            let nextState = { ...state };
            _grid.current._data = data;
            console.log(data);
            if (_grid.current._pagination === "in") {
                _grid.current._page = 0;
                nextState._page = 0;
            } else if (_grid.current._pagination === "out") {
                nextState._page = _grid.current._page;
                nextState._size = _grid.current._size;
            }
            const content = data.content.map((_: any) => ({ ..._, __key: uuid(), __type: "origin" }));
            _grid.current._content = content;
            _grid.current._origin = content;
            const view = getView(_grid);
            const count = getCount(_grid);
            _grid.current._checked = [];
            _grid.current._selectedRow = null;
            _grid.current._selectedCel = null;
            _grid.current._originTotalCount = count;
            nextState._test = view;
            nextState._totalCount = count;
            nextState._checked = [];
            nextState._selectedRow = null;
            nextState._selectedCel = null;
            return nextState;
        }
        /* Set data to origin */
        case "resetData": {
            const { _grid } = action.payload;
            let nextState = { ...state };
            const originTotalCount = _grid.current._originTotalCount;
            _grid.current._content = _grid.current._origin;
            _grid.current._totalCount = originTotalCount;
            nextState._test = getView(_grid);
            nextState._totalCount = originTotalCount;
            return nextState;
        }
        /* Add row  */
        case "add": {
            const { _grid, data } = action.payload;
            let nextState = { ...state };
            _grid.current._content = [..._grid.current._content, { ...data, __key: uuid(), __type: "added" }];
            nextState._test = getView(_grid);
            nextState._totalCount = getCount(_grid);
            return nextState;
        }
        /* Delete row */
        case "delete": {
            const { _grid, type } = action.payload;
            let nextState = { ...state };
            let toBeDeleted: any[] = [];
            if (type === "radio") {
                if (!_grid.current._selectedRow) return state;
                toBeDeleted.push(_grid.current._selectedRow);
            }
            if (type === "checkbox") {
                if (!_grid.current._checked.length) return state;
                toBeDeleted = [...toBeDeleted, ..._grid.current._checked];
            }
            if (type === "all") {
                if (!_grid.current._selectedRow && !_grid.current._checked.length) return state;
                if (_grid.current._selectedRow) toBeDeleted.push(_grid.current._selectedRow);
                if (_grid.current._checked.length) toBeDeleted = [...toBeDeleted, ..._grid.current._checked];
            }
            if (typeof type === "object" && type.__key) {
                toBeDeleted.push(type.__key);
            }
            if (Array.isArray(type)) {
                toBeDeleted = [...toBeDeleted, ...type.map(({ __key }) => __key)];
            }
            _grid.current._content = _grid.current._content
                .map((_: any) => {
                    if (toBeDeleted.includes(_.__key)) {
                        if (_.__type === "added") return;
                        return { ..._, __type: "deleted" };
                    } else return _;
                })
                .filter((_: any) => _ !== undefined);
            _grid.current._checked = [];
            _grid.current._selectedCel = null;
            _grid.current._selectedRow = null;
            nextState._checked = [];
            nextState._selectedCel = null;
            nextState._selectedRow = null;
            nextState._test = getView(_grid);
            nextState._totalCount = getCount(_grid);
            return nextState;
        }

        /* Update row */
        case "update": {
            const { _grid, data } = action.payload;
            let nextState = { ...state };
            _grid.current._content = _grid.current._content.map((_: any) => {
                if (_.__key !== data.__key) return _;
                const { __type, __key, ...rest } = data;
                let type = _.__type;
                if (type === "origin" || type === "updated") {
                    const origin = _grid.current._origin.find((o: any) => o.__key === __key);
                    type = Object.keys(rest).some((k) => data[k] !== origin[k]) ? "updated" : "origin";
                }
                return { ..._, ...rest, __type: type };
            });
            nextState._test = getView(_grid);
            return nextState;
        }

        /* Sort */
        case "sort": {
            const { _grid, binding } = action.payload;
            let nextState = { ...state };
            let _sort = _grid.current._sort;
            const prev = _sort[binding];
            if (prev) {
                const pval = prev.val;
                const pseq = prev.seq;
                if (pval === "asc") _sort[binding] = { seq: pseq, val: "desc" };
                if (pval === "desc") delete _sort[binding];
            } else {
                const seqs = Object.entries(_sort)
                    .map(([__, v]: any) => v?.seq)
                    .filter((_) => _ !== undefined);
                const nseq = seqs.length === 0 ? 0 : Math.max(...seqs) + 1;
                _sort[binding] = { seq: nseq, val: "asc" };
            }
            _sort = Object.fromEntries(
                lodash
                    .sortBy(Object.entries(_sort), [(a: any) => a[1].seq])
                    .map(([k, v]: any, i: any) => [k, { ...v, seq: i }]),
            );
            _grid.current._sort = _sort;
            nextState._sort = _sort;
            nextState._test = getView(_grid);
            return nextState;
        }

        /* Group Toggle */
        case "group": {
            const { _grid, groupKey, open } = action.payload;
            let nextState = { ...state };
            _grid.current._groupStatus[groupKey] = { ..._grid.current._groupStatus[groupKey], open };
            nextState._test = getView(_grid);
            return nextState;
        }

        /* Set Show Option */
        case "setShow": {
            const { type, target, value } = action.payload;
            switch (type) {
                case "column": {
                    let _head = state._head.map((_: any) => {
                        if (_.id !== target) return _;
                        return {
                            ..._,
                            show: value,
                            cells: _.cells.map((__: any) => {
                                return { ...__, show: value };
                            }),
                        };
                    });

                    let _body = state._body.map((_: any) => {
                        if (_.id !== target) return _;
                        return {
                            ..._,
                            show: value,
                            cells: _.cells.map((__: any) => {
                                return { ...__, show: value };
                            }),
                        };
                    });

                    return { ...state, _head, _body, _headCells: fun(_head), _bodyCells: fun(_body) };
                }
                default:
                    return state;
            }
        }

        /* Set Option */
        case "setOption": {
            const { _grid, target, value } = action.payload;

            let _options = { ...state._options };
            let _body = [...state._body];

            switch (target) {
                case "height": {
                    if (value === "auto") {
                        _grid.current._height = _grid.current._listInner.clientHeight;
                        _grid.current._autoHeight = true;
                        _options.height = _grid.current._listInner.clientHeight;
                    } else {
                        _grid.current._height = value;
                        _grid.current._autoHeight = false;
                        _options.height = value;
                    }
                    break;
                }
                case "edit": {
                    _body = _body.map((_: any) => {
                        return {
                            ..._,
                            edit: value,
                            cells: _.cells.map((__: any) => {
                                return { ...__, edit: value };
                            }),
                        };
                    });
                    _grid.current._edit = value;
                    _options.edit = value;
                    break;
                }
                default:
                    _grid.current[target] = value;
                    _options[target] = value;
                    break;
            }

            return { ...state, _options, _body, _bodyCells: fun(_body) };
        }
        /**
         * Change Edit
         */
        case "setEdit": {
            const { type, target, value } = action.payload;

            switch (type) {
                case "column": {
                    const _body = state._body.map((_: any) => {
                        if (_.id !== target) return _;
                        return {
                            ..._,
                            cells: _.cells.map((__: any) => {
                                return { ...__, edit: value };
                            }),
                        };
                    });
                    return { ...state, _body, _bodyCells: fun(_body) };
                }
                case "cell": {
                    const _body = state._body.map((_: any) => {
                        return {
                            ..._,
                            cells: _.cells.map((__: any) => {
                                if (__.binding !== target) return __;
                                return { ...__, edit: value };
                            }),
                        };
                    });
                    return { ...state, _body, _bodyCells: fun(_body) };
                }
                case "row": {
                    const key =
                        typeof target === "object" && !!target?.__key
                            ? target.__key
                            : typeof target === "string"
                              ? target
                              : undefined;

                    if (!key) return { ...state };

                    let _editingRow = [...state._editingRow];
                    if (value) {
                        if (!_editingRow.find((r: any) => r.__key === key)) {
                            _editingRow = [..._editingRow, key];
                        }
                    } else {
                        _editingRow = _editingRow.filter((r: any) => r !== key);
                    }
                    return { ...state, _editingRow };
                }

                default:
                    return state;
            }
        }

        /* Handle Select Cell  */
        case "handleClickCel": {
            const { key } = action.payload;
            return { ...state, _selectedCel: key };
        }
        /* Handle Select Row (Radio) */
        case "handleSelect": {
            const { _grid, event, rowKey } = action.payload;
            _grid.current._selectedRow = rowKey;
            return { ...state, _selectedRow: rowKey };
        }
        /* Handle Check Row (Checkbox) */
        case "handleCheck": {
            const { _grid, event, rowKey } = action.payload;
            let _checked = [...state._checked];
            _checked = event.target.checked ? [..._checked, rowKey] : _checked.filter((_: any) => _ !== rowKey);
            _grid.current._checked = _checked;
            return { ...state, _checked };
        }
        /* Handle Check All Row (Checkbox) */
        case "handleCheckAll": {
            const { _grid, event, condition } = action.payload;
            let _checked = [];
            if (event.target.checked) {
                _checked = condition
                    ? _grid.current._view.filter((_: any) => condition(_)).map(({ __key }: any) => __key)
                    : _grid.current._view.map(({ __key }: any) => __key);
            }
            _grid.current._checked = _checked;
            return { ...state, _checked };
        }
        /* Handle Change Page */
        case "handleChangePage": {
            const { _grid, next } = action.payload;
            let nextState = { ...state };
            nextState._test = getView(_grid);
            nextState._page = next;
            nextState._checked = [];
            nextState._selectedRow = null;
            nextState._selectedCel = null;
            return nextState;
        }
        /* Handle Change Size */
        case "handleChangeSize": {
            const { _grid, next } = action.payload;
            let nextState = { ...state };
            nextState._test = getView(_grid);
            nextState._page = 0;
            nextState._size = next;
            nextState._checked = [];
            nextState._selectedRow = null;
            nextState._selectedCel = null;
            return nextState;
        }

        /* Readjust Row Height */
        case "readjustHeight": {
            const { value } = action.payload;
            return { ...state, _options: { ...state._options, height: value } };
        }

        default:
            return state;
    }
};

export { createInitialState, reducer };
