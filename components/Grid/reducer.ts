import dayjs from "dayjs";
import lodash from "lodash";
import { v4 as uuid } from "uuid";

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

    // Filtering
    filteredContent = _grid.current._content;
    filteredCount = filteredContent.length;

    // Grouping & Sorting
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
    _grid.current._content = filteredContent;
    filteredContent = _grid.current._content.filter(({ __type }: any) => __type !== "deleted");
    // .map((_: any, i: any) => {
    //     return { ..._, __index: i };
    // });

    // Paging
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

    _grid.current._checked = [];
    _grid.current._selectedRow = null;
    _grid.current._selectedCel = null;
    _grid.current._rect = [];
    _grid.current._groupStatus = {};
    _grid.current._sort = {};

    const { filteredContent, filteredCount } = createContent(_grid);

    let _totalCount = (_grid.current._pagination === "in" ? filteredCount : data?.page?.totalElements) || 0;
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

            let nextState = { ...state };
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
            _grid.current._checked = [];
            _grid.current._selectedRow = null;

            if (_grid.current._pagination === "out") {
                nextState._page = _grid.current._page;
                nextState._size = _grid.current._size;
            } else if (_grid.current._pagination === "in") {
                _grid.current._page = 0;
                nextState._page = 0;
            }

            const { filteredContent, filteredCount } = createContent(_grid);

            if (_grid.current._pagination === "out") {
                _totalCount = data?.page?.totalElements || 0;
            } else if (_grid.current._pagination === "in") {
                _totalCount = filteredCount;
            }

            _grid.current._totalCount = _totalCount;
            _grid.current._originTotalCount = _totalCount;

            nextState._test = filteredContent;
            nextState._totalCount = _totalCount;
            nextState._checked = [];
            nextState._selectedRow = null;

            return nextState;
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
            const { key } = action.payload;

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
            const { _grid, event, condition } = action.payload;

            let _checked;

            if (event.target.checked) {
                if (condition) {
                    _checked = _grid.current._paged.filter((_: any) => {
                        return condition(_);
                    });
                } else {
                    _checked = _grid.current._paged;
                }
            } else {
                _checked = [];
            }

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

            const { filteredContent } = createContent(_grid);

            let nextState = {
                ...state,
                _test: filteredContent,
                _page: next,
                _checked: [],
                _selectedRow: null,
            };

            return nextState;
        }
        case "handleChangeSize": {
            const { _grid, next } = action.payload;

            const { filteredContent } = createContent(_grid);

            let nextState = {
                ...state,
                _test: filteredContent,
                _page: 0,
                _size: next,
                _checked: [],
                _selectedRow: null,
            };

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

export { createContent, createInitialState, reducer };
