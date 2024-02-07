import dayjs from "dayjs";
import React from "react";
import lodash from "lodash";
import { v4 as uuid } from "uuid";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { VariableSizeList as List, areEqual } from "react-window";

import { Button, FormControl, Pagination, Icon } from "@/comn/components";
import { comnUtils } from "@/comn/utils";

const fun = (schema: any) => {
    let t = [];

    for (let i = 0; i < schema.length; i++) {
        if (schema[i].show === false) {
            continue;
        }
        let rowIndex = -1;
        let colspan = schema[i].colspan || 1;
        let _current = 0;

        let head = [];

        for (let col = 0; col < schema[i].cells.length; col++) {
            const cell = schema[i].cells[col];
            let isAdd = true;

            if (_current === 0) {
                rowIndex++;
                if (!head[rowIndex]) head[rowIndex] = Array(colspan);
            }
            if (head[rowIndex][_current] === null) {
                for (let i = _current; i < colspan; i++) {
                    if (head[rowIndex][i] === null) {
                        _current++;
                        if (_current > col - 1) {
                            isAdd = false;
                        }
                    } else break;
                }
            }

            if (isAdd === false) {
                _current = 0;
                col--;
                continue;
            }
            if (_current > colspan - 1) {
                _current = 0;
                continue;
            }

            head[rowIndex][_current] = cell;
            if (cell.colspan !== undefined) {
                for (let i = _current + 1; i < _current + cell.colspan; i++) {
                    head[rowIndex][i] = null;
                }
            }
            if (cell?.rowspan !== undefined) {
                for (let i = rowIndex + 1; i < rowIndex + cell.rowspan; i++) {
                    if (!head[i]) head[i] = Array(colspan);
                    head[i][_current] = null;
                }
            }

            _current += cell.colspan === undefined ? 1 : cell.colspan;
            if (_current > colspan - 1) {
                _current = 0;
            }
        }

        t.push(head);
    }

    let tt = t[0];

    for (let i = 1; i < t.length; i++) {
        for (let j = 0; j < tt.length; j++) {
            tt[j] = [...tt[j], ...(t[i]?.[j] || [])];
        }
    }

    return tt;
};

/**
 * ## Content Maker
 *
 */
const createContent = (_grid: any) => {
    const sort = (data: any) => {
        const [iteratees, orders] = lodash
            .sortBy(Object.entries(_grid.current._sort), [
                (o: any) => {
                    return o[1].seq;
                },
            ])
            .reduce(
                (p: any, c: any) => {
                    return [
                        [...p[0], c[0]],
                        [...p[1], c[1].val],
                    ];
                },
                [[], []],
            );

        return lodash.orderBy(data, iteratees, orders);
    };

    let filteredContent;
    let filteredCount;

    /**
     * 1.
     *
     * Filtering
     */
    filteredContent = _grid.current._content.filter(({ __type }: any) => __type !== "deleted");
    filteredCount = filteredContent.length;

    /**
     * 2.
     *
     * Grouping & Sorting
     */
    if (Object.keys(_grid.current._group).length) {
        const groups = lodash.sortBy(Object.entries<any>(_grid.current._group), [
            (o: any) => {
                return o[1].seq;
            },
        ]);

        const getGrouped = (data: any, by: any, prevDepth: any, prevParent: any, prevGroupKey: any): any => {
            if (!by) return sort(data);

            const depth = prevDepth + 1;
            const parent = [...prevParent, by];

            return Object.entries(lodash.groupBy(data, by[0])).reduce((p: any, c: any) => {
                if (c[0] === "undefined") return c[1];

                const groupKey = prevGroupKey + "__" + c[0];

                if (_grid.current._groupStatus[groupKey] === undefined) {
                    _grid.current._groupStatus[groupKey] = { open: true };
                }

                const open = _grid.current._groupStatus[groupKey].open;

                const row = {
                    __key: uuid(),
                    __type: "group",
                    open,
                    depth,
                    groupKey,
                    value: c[0],
                    binding: by[0],
                    count: c[1].length,
                };

                if (open) {
                    return [...p, row, ...getGrouped(c[1], groups[depth], depth, parent, groupKey)];
                } else {
                    return [...p, row];
                }
            }, []);
        };

        filteredContent = getGrouped(filteredContent, groups[0], 0, [], "");
    } else {
        filteredContent = sort(filteredContent);
    }

    /**
     * 3.
     *
     * Paging
     */
    if (_grid.current._pagination === "in") {
        filteredContent = lodash.chunk(filteredContent, _grid.current._size)[_grid.current._page] || [];
    }

    _grid.current._paged = filteredContent;

    return { filteredContent, filteredCount };
};

/**
 * ## State Initializer
 */
const createInitialState = ({ _grid, data }: any) => {
    const _head = _grid.current._defaultSchema.head.map((_: any) => {
        return {
            ..._,
            cells: _.cells.map((__: any) => {
                return { ...__, show: _.show === true ? true : _.show === false ? false : true };
            }),
        };
    });
    const _body = _grid.current._defaultSchema.body.map((_: any, i: any) => {
        return {
            ..._,
            id: _grid.current._defaultSchema.head[i]?.id,
            show:
                _grid.current._defaultSchema.head[i]?.show === true
                    ? true
                    : _grid.current._defaultSchema.head[i]?.show === false
                      ? false
                      : true,
            cells: _.cells.map((__: any) => {
                return {
                    ...__,
                    id: _grid.current._defaultSchema.head[i]?.id,
                    show:
                        _grid.current._defaultSchema.head[i]?.show === true
                            ? true
                            : _grid.current._defaultSchema.head[i]?.show === false
                              ? false
                              : true,
                    edit:
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
                                    : false,
                };
            }),
        };
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
                }
            })
            .join(" ");
    })();

    /**
     * Content Setting
     */
    let _test;
    let __t;

    if (!Array.isArray(data?.content)) {
        _test = [];
    } else {
        _test = data.content.map((_: any) => ({ ..._, __key: uuid(), __type: "origin" }));
    }

    if (!dayjs(data?.__t).isValid()) {
        __t = dayjs(data?.__t).toDate();
    } else {
        __t = new Date();
    }

    _grid.current._dataCreated = __t;
    _grid.current._dataUpdated = __t;
    _grid.current._origin = _test;
    _grid.current._content = _test;

    const { filteredContent } = createContent(_grid);

    let _totalCount = (_grid.current._pagination === "in" ? filteredContent.length : data?.page?.totalElements) || 0;
    _grid.current._totalCount = _totalCount;
    _grid.current._originTotalCount = _totalCount;

    return {
        _head,
        _body,
        _sort: {},
        _group: {},
        _headCells,
        _bodyCells,
        _template,
        _totalCount,
        _selectedRow: null,
        _selectedCel: null,
        _editingRow: [],
        _checked: [],
        _test: filteredContent,
        _page: _grid.current._page,
        _size: _grid.current._size,
        _options: {
            height: _grid.current._height,
            index: _grid.current._index,
            checkbox: _grid.current._checkbox,
            radio: _grid.current._radio,
            edit: _grid.current._edit,
            add: _grid.current._add,
            delete: _grid.current._delete,
            exportExcel: _grid.current._exportExcel,
            importExcel: _grid.current._importExcel,
        },
    };
};

/**
 * ## Reducer
 */
const reducer = (state: any, action: any) => {
    switch (action.type) {
        /**
         * Set Data
         */
        case "setData": {
            const { _grid, data } = action.payload;

            let content;
            let _totalCount;

            if (Array.isArray(data)) {
                content = data;
            } else if (typeof data === "object" && Array.isArray(data.content)) {
                content = data.content;
            } else {
                return state;
            }

            content = content.map((_: any) => ({
                ..._,
                __key: uuid(),
                __type: "origin",
            }));

            _grid.current._dataUpdated = new Date();
            _grid.current._origin = content;
            _grid.current._content = content;

            const { filteredContent, filteredCount } = createContent(_grid);

            if (_grid.current._pagination === "out") {
                _totalCount = data?.page?.totalElements || 0;
            } else {
                _totalCount = filteredCount;
            }

            _grid.current._totalCount = _totalCount;
            _grid.current._originTotalCount = _totalCount;

            return { ...state, _totalCount, _test: filteredContent };
        }
        /**
         * Reset to Origin
         *
         */
        case "resetData": {
            const { _grid } = action.payload;

            _grid.current._content = _grid.current._origin;
            _grid.current._totalCount = _grid.current._originTotalCount;

            return {
                ...state,
                _totalCount: _grid.current._originTotalCount,
                _test: createContent(_grid).filteredContent,
            };
        }
        /**
         * Change Show
         */
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
        /**
         * Change Option
         */
        case "setOption": {
            const { _grid, target, value } = action.payload;

            let _options = { ...state._options };
            let _body = [...state._body];

            if (target === "height") {
                if (value === "auto") {
                    _grid.current._height = _grid.current._listInner.clientHeight;
                    _grid.current._autoHeight = true;
                    _options.height = _grid.current._listInner.clientHeight;
                } else {
                    _grid.current._height = value;
                    _grid.current._autoHeight = false;
                    _options.height = value;
                }
            }

            if (target === "edit") {
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

        /**
         * Delete
         *
         */
        case "delete": {
            const { _grid, type } = action.payload;
            if (_grid.current._pagination === "out" || !type) return state;

            let nextState = { ...state };

            if (type === "radio") {
                if (!_grid.current._selectedRow) return state;
                _grid.current._content = _grid.current._content
                    .map((_: any) => {
                        if (_.__key === _grid.current._selectedRow.__key) {
                            if (_.__type === "added") return undefined;
                            return { ..._, __type: "deleted" };
                        } else {
                            return _;
                        }
                    })
                    .filter((_: any) => _ !== undefined);

                _grid.current._selectedRow = null;
                nextState = { ...nextState, _selectedRow: null };
            }

            if (type === "checkbox") {
                if (!_grid.current._checked.length) return state;

                _grid.current._content = _grid.current._content
                    .map((_: any) => {
                        if (_grid.current._checked.map((_: any) => _.__key).includes(_.__key)) {
                            if (_.__type === "added") return undefined;
                            return { ..._, __type: "deleted" };
                        } else {
                            return _;
                        }
                    })
                    .filter((_: any) => _ !== undefined);

                _grid.current._checked = [];
                nextState = { ...nextState, checked: null };
            }

            if (type === "all") {
                const c = _grid.current._checked;
                const s = _grid.current._selectedRow;
                const a = [...c, s].filter((_) => _);
                if (!a.length) return state;

                _grid.current._content = _grid.current._content
                    .map((_: any) => {
                        if (a.map((_: any) => _.__key).includes(_.__key)) {
                            if (_.__type === "added") return undefined;
                            return { ..._, __type: "deleted" };
                        } else {
                            return _;
                        }
                    })
                    .filter((_: any) => _ !== undefined);

                _grid.current._selectedRow = null;
                _grid.current._checked = [];

                nextState = { ...nextState, _selectedRow: null, _checked: [] };
            }

            if (typeof type === "object" && type.__key) {
                _grid.current._content = _grid.current._content
                    .map((_: any) => {
                        if (_.__key === type.__key) {
                            if (_.__type === "added") return undefined;
                            return { ..._, __type: "deleted" };
                        } else {
                            return _;
                        }
                    })
                    .filter((_: any) => _ !== undefined);

                _grid.current._selectedRow = null;
                _grid.current._checked = [];
            }

            if (Array.isArray(type)) {
                _grid.current._content = _grid.current._content
                    .map((_: any) => {
                        if (type.map((_: any) => _.__key).includes(_.__key)) {
                            if (_.__type === "added") return undefined;
                            return { ..._, __type: "deleted" };
                        } else {
                            return _;
                        }
                    })
                    .filter((_: any) => _ !== undefined);

                _grid.current._selectedRow = null;
                _grid.current._checked = [];
            }

            const { filteredContent, filteredCount } = createContent(_grid);

            _grid.current._selectedCel = null;
            _grid.current._totalCount = filteredCount;

            nextState._selectedCel = null;
            nextState._test = filteredContent;
            nextState._totalCount = filteredCount;

            return nextState;
        }
        /**
         * Add
         */
        case "add": {
            const { _grid, data } = action.payload;
            if (_grid.current._pagination === "out") return state;

            _grid.current._content = [..._grid.current._content, { ...data, __key: uuid(), __type: "added" }];

            const { filteredContent, filteredCount } = createContent(_grid);
            _grid.current._totalCount = filteredCount;
            return { ...state, _test: filteredContent, _totalCount: filteredCount };
        }
        /**
         * Update Row Data
         */
        case "update": {
            const { _grid, data } = action.payload;

            if (!data?.__key) break;

            _grid.current._content = _grid.current._content.map((_: any) => {
                if (_.__key !== data.__key) return _;
                const { __type, __key, ...rest } = data;
                return {
                    ..._,
                    ...rest,
                    __type:
                        _.__type === "origin" || _.__type === "updated"
                            ? Object.keys(rest).some((k) => {
                                  return data[k] !== _grid.current._origin.find((o: any) => o.__key === data.__key)[k];
                              })
                                ? "updated"
                                : "origin"
                            : _.__type,
                };
            });

            return { ...state, _test: createContent(_grid).filteredContent };
        }
        /**
         * Toggle Group
         */
        case "group": {
            const { _grid, groupKey, open } = action.payload;
            _grid.current._groupStatus[groupKey] = { ..._grid.current._groupStatus[groupKey], open };

            return { ...state, _test: createContent(_grid).filteredContent };
        }
        /**
         * Sort
         */
        case "sort": {
            const { _grid, binding } = action.payload;

            let _sort = _grid.current._sort;

            /** prev */
            const prev = _sort[binding];

            if (prev) {
                const pval = prev.val;
                const pseq = prev.seq;

                if (pval === "asc") {
                    _sort[binding] = {
                        seq: pseq,
                        val: "desc",
                    };
                }

                if (pval === "desc") {
                    delete _sort[binding];
                }
            } else {
                const seqs = Object.entries(_sort)
                    .map(([__, v]: any) => v?.seq)
                    .filter((_) => _ !== undefined);
                const nseq = seqs.length === 0 ? 0 : Math.max(...seqs) + 1;
                _sort[binding] = {
                    seq: nseq,
                    val: "asc",
                };
            }

            _sort = Object.fromEntries(
                lodash
                    .sortBy(Object.entries(_sort), [
                        (a: any) => {
                            return a[1].seq;
                        },
                    ])
                    .map(([k, v]: any, i: any) => {
                        return [k, { ...v, seq: i }];
                    }),
            );

            _grid.current._sort = _sort;

            return { ...state, _sort, _test: createContent(_grid).filteredContent };
        }
        /**
         * Handler
         *
         */
        case "handleClickCel": {
            const { _grid, key, binding, value, formattedValue, rowValues, onCellClick } = action.payload;

            if (onCellClick)
                onCellClick({
                    binding,
                    value,
                    formattedValue,
                    rowValues,
                });

            _grid.current._selectedCel = {
                binding,
                value,
                formattedValue,
                rowValues,
            };

            return { ...state, _selectedCel: key };
        }
        case "handleCheck": {
            const { _grid, event, rowProps } = action.payload;
            let _checked = [...state._checked];

            if (event.target.checked) {
                _checked = [..._checked, rowProps];
            } else {
                _checked = _checked.filter(({ __key }: any) => __key !== rowProps.__key);
            }

            _grid.current._checked = _checked;
            return { ...state, _checked };
        }
        case "handleCheckAll": {
            const { _grid, event } = action.payload;

            let _checked = event.target.checked ? _grid.current._paged : [];

            _grid.current._checked = _checked;
            return { ...state, _checked };
        }
        case "handleSelect": {
            const { _grid, event, rowProps } = action.payload;
            _grid.current._selectedRow = rowProps;

            return { ...state, _selectedRow: rowProps };
        }
        case "handleChangePage": {
            const { _grid, next } = action.payload;

            if (_grid.current._pagination === "out") {
                _grid.current._setPage(next);
            }

            _grid.current._page = next;
            _grid.current._checked = [];
            _grid.current._selectedRow = null;

            let nextState = { ...state, _page: next, _checked: [], _selectedRow: null };
            if (_grid.current._pagination === "in") {
                nextState._test = createContent(_grid).filteredContent;
            }
            return nextState;
        }
        case "handleChangeSize": {
            const { _grid, next } = action.payload;

            if (_grid.current._pagination === "out") {
                _grid.current._setPage(0);
                _grid.current._setSize(next);
            }

            _grid.current._page = 0;
            _grid.current._size = next;
            _grid.current._checked = [];
            _grid.current._selectedRow = null;

            let nextState = { ...state, _page: 0, _size: next, _checked: [], _selectedRow: null };
            if (_grid.current._pagination === "in") {
                nextState._test = createContent(_grid).filteredContent;
            }
            return nextState;
        }

        /**
         * Readjust Height
         */
        case "readjustHeight": {
            const { value } = action.payload;
            return { ...state, _options: { ...state._options, height: value } };
        }

        default:
            return state;
    }
};

/**
 * ## Grid Initialize Hook
 */
const useInitailize = (props: any) => {
    const { _grid, data } = props;

    const __t = data?.__t?.getTime();
    const [state, dispatch] = React.useReducer(reducer, { _grid, data }, createInitialState);

    React.useEffect(() => {
        if (!_grid.current._initialized) return;
        if (!Array.isArray(data.content)) return;
        if (data.content.length === 0 && state._test.length === 0) return;

        dispatch({ type: "setData", payload: { _grid, data } });
    }, [__t]);

    React.useEffect(() => {
        _grid.current._setData = (data: any) => {
            dispatch({ type: "setData", payload: { _grid, data } });
        };
        _grid.current._resetData = () => {
            dispatch({ type: "resetData", payload: { _grid } });
        };
        _grid.current._setEdit = (type: any, target: any, value: any) => {
            dispatch({ type: "setEdit", payload: { type, target, value } });
        };
        _grid.current._setShow = (type: any, target: any, value: any) => {
            dispatch({ type: "setShow", payload: { type, target, value } });
        };
        _grid.current._setOption = (target: any, value: any) => {
            dispatch({ type: "setOption", payload: { _grid, target, value } });
        };
        _grid.current._handleCheck = (event: any, rowProps: any) => {
            dispatch({ type: "handleCheck", payload: { _grid, event, rowProps } });
        };
        _grid.current._handleCheckAll = (event: any) => {
            dispatch({ type: "handleCheckAll", payload: { _grid, event } });
        };
        _grid.current._handleSelect = (event: any, rowProps: any) => {
            dispatch({ type: "handleSelect", payload: { _grid, event, rowProps } });
        };
        _grid.current._handleUpdate = (data: any) => {
            dispatch({ type: "update", payload: { _grid, data } });
        };
        _grid.current._handleAdd = (data: any) => {
            dispatch({ type: "add", payload: { _grid, data } });
        };
        _grid.current._handleDelete = (type: any) => {
            dispatch({ type: "delete", payload: { _grid, type } });
        };
        _grid.current._handlePage = (next: any) => {
            dispatch({ type: "handleChangePage", payload: { _grid, next } });
        };
        _grid.current._handleSize = (next: any) => {
            dispatch({ type: "handleChangeSize", payload: { _grid, next } });
        };
        _grid.current._handleSort = (binding: any) => {
            dispatch({ type: "sort", payload: { _grid, binding } });
        };
        _grid.current._handleGroup = (groupKey: any, open: any) => {
            dispatch({ type: "group", payload: { _grid, groupKey, open } });
        };
        _grid.current._handleClickCel = (payload: any) => {
            dispatch({ type: "handleClickCel", payload: { _grid, ...payload } });
        };

        _grid.current._readjustHeight = lodash.debounce(() => {
            if (_grid.current._height === _grid.current._listInner.clientHeight) return;

            _grid.current._height = _grid.current._listInner.clientHeight;
            dispatch({ type: "readjustHeight", payload: { value: _grid.current._listInner.clientHeight } });
        }, 10);

        _grid.current._initialized = true;

        return () => {};
    }, []);

    return { state, dispatch };
};
/**
 * # Grid
 */
export const Grid = (props: any) => {
    const { _grid, render, onCellClick, onRowClick } = props;

    const { t } = useTranslation();
    const { state } = useInitailize(props);

    const { _headCells, _template, _options, _checked, _page, _size, _totalCount, _test } = state;

    return (
        <div className="flex flex-col w-full">
            {/* Top Buttons */}
            <div className="flex justify-between">
                <div className="flex gap-1 [&_*]:mb-2">
                    {_options.importExcel && <Button>Import</Button>}
                    {_options.exportExcel && <Button>Export</Button>}
                </div>

                <div className="flex gap-1 [&_*]:mb-2">
                    {_options.add && <Button onClick={() => _grid.current._handleAdd()}>Add</Button>}
                    {_options.delete && <Button onClick={() => _grid.current._handleDelete("all")}>Delete</Button>}
                </div>
            </div>

            {/* Grid Main */}
            <div className="w-full mb-2 flex flex-col bg-uf-border">
                {/* Head */}
                <div
                    ref={(node) => (_grid.current._head = node)}
                    className="uf-grid-head flex w-full gap-[1px] border-b border-l border-l-uf-card-background sticky top-0 bg-uf-border z-10 overflow-x-auto"
                >
                    {Object.keys(_grid.current._groupStatus).length > 0 && <div className="uf-grid-option" />}
                    {_options.checkbox && (
                        <div className="uf-grid-option">
                            <input
                                type="checkbox"
                                checked={_test.every(({ __key }: any) =>
                                    _checked.some((row: any) => row.__key === __key),
                                )}
                                onChange={(event) => _grid.current._handleCheckAll(event)}
                            />
                        </div>
                    )}
                    {_options.radio && <div className="uf-grid-option" />}
                    {_options.index && <div className="uf-grid-option" />}
                    <div className="grid w-full gap-[1px]" style={{ gridTemplateColumns: _template }}>
                        {_headCells.map((row: any, rowIndex: any) => {
                            return row.map((cel: any, colIndex: any) => {
                                if (!cel) return null;
                                if (cel.show === false) return null;

                                return (
                                    <div
                                        key={_grid.current._key + ".gh." + rowIndex + "." + colIndex}
                                        className="p-1 bg-uf-card-header min-h-[2.5rem] flex items-center justify-center"
                                        style={{
                                            gridRow: `${rowIndex + 1} / span ${cel.rowspan ?? 1}`,
                                            gridColumn: `${colIndex + 1} / span ${cel.colspan ?? 1}`,
                                        }}
                                    >
                                        {render?.head?.[cel.binding]?.({
                                            id: cel.id,
                                            binding: cel.binding,
                                            header: t(cel.header),
                                        }) ||
                                            t(cel.header) ||
                                            cel.binding}

                                        {cel.required && <span className="text-uf-error">*</span>}
                                    </div>
                                );
                            });
                        })}
                    </div>
                </div>
                {/* Body */}
                <List
                    ref={(ref) => {
                        _grid.current._list = ref;
                    }}
                    innerRef={(node) => {
                        if (node) {
                            _grid.current._listInner = node;
                        }
                    }}
                    outerRef={(node) => {
                        if (node) {
                            _grid.current._listOuter = node;

                            node.onscroll = (event: any) => {
                                _grid.current._head.scrollTo({ left: event.currentTarget.scrollLeft });
                            };
                        }
                    }}
                    onItemsRendered={() => {
                        if (_grid.current._autoHeight) {
                            _grid.current._readjustHeight?.();
                        }
                    }}
                    itemCount={_test.length > _totalCount ? _totalCount : _test.length}
                    height={_options.height}
                    width="100%"
                    itemData={{
                        _grid,
                        state,
                        render,
                        onCellClick,
                        onRowClick,
                    }}
                    itemSize={(index) =>
                        _grid.current._rect[index]?.["height"] + 1 || _grid.current._rect[0]?.["height"] + 1 || 0
                    }
                >
                    {Row}
                </List>
            </div>

            {/* Pagination */}
            {_grid.current._pagination && (
                <Pagination
                    page={_page}
                    size={_size}
                    onChangePage={(next) => _grid.current._handlePage(next)}
                    onChangeSize={(next) => _grid.current._handleSize(next)}
                    totalCount={_totalCount}
                />
            )}
        </div>
    );
};

/** row */
const Row = React.memo((props: any) => {
    const { data, index: rowIndex, style } = props;

    const { _grid, state, render, onCellClick, onRowClick, test22 } = data;
    const {
        _test,
        _bodyCells,
        _options,
        _checked,
        _selectedRow,
        _selectedCel,
        _totalCount,
        _page,
        _size,
        _template,
        _editingRow,
    } = state;
    const { checkbox, radio, index } = _options;

    const row = _test[rowIndex];

    const rowKey = _grid.current._key + "." + rowIndex;
    const rowType = row?.__type;
    const contentKey = row?.__key;

    const ref = React.useRef<any>();

    React.useEffect(() => {
        const ro = new ResizeObserver((entries) => {
            requestAnimationFrame(() => {
                entries.forEach((value) => {
                    if (value.contentRect.height === 0) return;
                    if (_grid.current._rect[rowIndex]?.height !== value.contentRect.height) {
                        _grid.current._rect[rowIndex] = value.contentRect;
                        _grid.current._list.resetAfterIndex(rowIndex);
                        if (_grid.current._autoHeight) {
                            _grid.current._readjustHeight();
                        }
                    }
                });
            });
        });

        ro.observe(ref.current);

        return () => {
            ro.disconnect();
        };
    }, []);

    return (
        <div style={{ ...style }}>
            {rowType === "group" && (
                <div ref={ref} className="flex items-center h-[2.5rem] border-l border-l-uf-card-background">
                    {row.depth > 0 && <div style={{ width: `${row.depth * 2}rem` }} />}
                    <button
                        className="flex items-center justify-center w-[2rem] h-full"
                        onClick={() => _grid.current._handleGroup(row.groupKey, !row.open)}
                    >
                        <Icon icon="down" size="xs" className={classNames({ "rotate-180": row.open })} />
                    </button>
                    <div className="px-1">{`${row.binding}가 ${row.value}이고 ${row.count}개`}</div>
                </div>
            )}
            {rowType !== "group" && (
                <div
                    ref={ref}
                    onClick={() => {
                        if (onRowClick) onRowClick(row);
                    }}
                    className={classNames(
                        "flex w-full min-w-full gap-[1px] border-l bg-uf-border",
                        rowType === "added"
                            ? "border-l-uf-success"
                            : rowType === "updated"
                              ? "border-l-uf-warning"
                              : "border-l-uf-card-background",
                    )}
                >
                    {Object.keys(_grid.current._groupStatus).length > 0 && (
                        <div className="min-w-[2rem] max-w-[2rem]" />
                    )}
                    {checkbox && (
                        <div className="uf-grid-option">
                            <input
                                type="checkbox"
                                checked={_checked.some(({ __key }: any) => __key === contentKey)}
                                onChange={(e) => _grid.current._handleCheck(e, row)}
                            />
                        </div>
                    )}
                    {radio && (
                        <div className="uf-grid-option">
                            <input
                                type="radio"
                                checked={_selectedRow?.__key === row?.__key}
                                onChange={(event) => _grid.current._handleSelect(event, row)}
                            />
                        </div>
                    )}
                    {index && (
                        <div className="uf-grid-option font-semibold">
                            {index === "DESC" ? _totalCount - (_page * _size + rowIndex) : _page * _size + rowIndex + 1}
                        </div>
                    )}
                    {/* body columns */}
                    <div className="grid w-full gap-[1px]" style={{ gridTemplateColumns: _template }}>
                        {_bodyCells.map((_: any, rowIndex: any) => {
                            return _.map((cel: any, colIndex: any) => {
                                if (!cel) return null;
                                if (cel.show === false) return null;

                                const { binding, align, rowspan, colspan, edit, ...rest } = cel;

                                const celKey = contentKey + ".gb." + rowIndex + "." + colIndex;
                                const value = row[binding];

                                const fv = comnUtils.getFormattedValue(value, rest);
                                const uv = comnUtils.getUnformattedValue(value, rest);
                                const vldv = comnUtils.getValidatedValue(uv, rest);
                                const isEdit = _editingRow.includes(contentKey) ? true : edit;

                                const celContext = {
                                    binding,
                                    value: uv,
                                    rowValues: row,
                                    formattedValue: fv,
                                };

                                const formControlProps = {
                                    ...rest,
                                    rightButton: cel.rightButton && {
                                        ...cel.rightButton,
                                        onClick: cel.rightButton.onClick && (() => cel.rightButton.onClick(celContext)),
                                    },
                                    leftButton: cel.leftButton && {
                                        ...cel.leftButton,
                                        onClick: cel.leftButton.onClick && (() => cel.leftButton.onClick(celContext)),
                                    },
                                };

                                return (
                                    <div
                                        key={celKey}
                                        className={classNames(
                                            "p-1 bg-uf-card-background min-h-[2.5rem] flex items-center border border-uf-card-background aria-selected:border-uf-info aria-[invalid=true]:border-uf-error",
                                            (align === "start" || align === "left") && "justify-start text-left",
                                            (align === "end" || align === "right") && "justify-end text-right",
                                            (align === "center" || align === undefined) && "justify-center text-center",
                                        )}
                                        {...(vldv && { "aria-invalid": true })}
                                        {...(_selectedCel === celKey && { "aria-selected": true })}
                                        style={{
                                            gridRow: `${rowIndex + 1} / span ${rowspan ?? 1}`,
                                            gridColumn: `${colIndex + 1} / span ${colspan ?? 1}`,
                                        }}
                                        onClick={() => {
                                            _grid.current._handleClickCel({
                                                ...celContext,
                                                key: celKey,
                                                onCellClick: onCellClick?.[binding],
                                            });
                                        }}
                                    >
                                        {!isEdit &&
                                            (render?.cell?.[binding]?.({
                                                value: value,
                                                rowValues: row,
                                                binding: binding,
                                            }) || (
                                                <FormControl
                                                    {...formControlProps}
                                                    edit={false}
                                                    value={fv}
                                                    onChange={(v) => {
                                                        _grid.current._handleUpdate({
                                                            ...row,
                                                            [binding]: comnUtils.getUnformattedValue(
                                                                v,
                                                                formControlProps,
                                                            ),
                                                        });
                                                    }}
                                                />
                                            ))}
                                        {isEdit &&
                                            (render?.edit?.[binding]?.({
                                                value: value,
                                                rowValues: row,
                                                binding: binding,
                                            }) || (
                                                <FormControl
                                                    {...formControlProps}
                                                    value={fv}
                                                    onChange={(v) => {
                                                        _grid.current._handleUpdate({
                                                            ...row,
                                                            [binding]: comnUtils.getUnformattedValue(
                                                                v,
                                                                formControlProps,
                                                            ),
                                                        });
                                                    }}
                                                />
                                            ))}
                                    </div>
                                );
                            });
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}, areEqual);
