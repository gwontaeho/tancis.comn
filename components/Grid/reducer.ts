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

const sort = (_grid: any, content: any) => {
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

    return lodash.orderBy(content, iteratees, orders);
};

const group = (_grid: any, content: any) => {
    const groups = lodash.sortBy(Object.entries<any>(_grid.current._group), [(o: any) => o[1].seq]);

    const getGrouped = (data: any, by: any, prevDepth: any, prevParent: any, prevGroupKey: any): any => {
        if (!by) return sort(_grid, data);

        const depth = prevDepth + 1;
        const parent = [...prevParent, by];

        return Object.entries(lodash.groupBy(data, by[0])).reduce((prev: any, curr: any) => {
            const groupKey = prevGroupKey + "__" + curr[0];

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
                value: curr[0],
                binding: by[0],
                count: curr[1].length,
            };

            if (open) {
                return [...prev, row, ...getGrouped(curr[1], groups[depth], depth, parent, groupKey)];
            } else {
                return [...prev, row];
            }
        }, []);
    };

    return getGrouped(content, groups[0], 0, [], "");
};

/** ## Content Maker */
const createContent = (_grid: any) => {
    /*
        Set Below
        _content, _view, _totalCount, _viewCount
     */

    let content = [..._grid.current._content];
    let view;
    let totalCount;
    let viewCount;

    if (Object.keys(_grid.current._group).length) {
        /* grouped  */
        content = group(_grid, _grid.current._content);
    } else {
        /* not grouped */
        content = sort(_grid, content);
        console.log(content);
        _grid.current._content = content;
    }

    /*  */
    content = content.filter(({ __type }: any) => __type !== "deleted");

    viewCount = content.length;

    // Paging
    if (_grid.current._pagination === "in") {
        content = lodash.chunk(content, _grid.current._size)[_grid.current._page] || [];
    }
    _grid.current._view = content;

    return { viewContent: content, viewCount };
};

/**
 * ## State Initializer
 */
const createInitialState = ({ _grid, data }: any) => {
    const options = _grid.current._defaultSchema.options || {};

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

    _grid.current._origin = _test;
    _grid.current._content = _test;

    const { viewContent, viewCount } = createContent(_grid);

    let _totalCount = (_grid.current._pagination === "in" ? viewCount : data?.page?.totalElements) || 0;
    _grid.current._totalCount = _totalCount;
    _grid.current._originTotalCount = _totalCount;

    return {
        _head,
        _body,
        _headCells,
        _bodyCells,
        _template,
        _totalCount,
        _test: viewContent,
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

            const { viewContent, viewCount } = createContent(_grid);

            if (_grid.current._pagination === "out") {
                _totalCount = data?.page?.totalElements || 0;
            } else if (_grid.current._pagination === "in") {
                _totalCount = viewCount;
            }

            _grid.current._totalCount = _totalCount;
            _grid.current._originTotalCount = _totalCount;

            nextState._test = viewContent;
            nextState._totalCount = _totalCount;
            nextState._checked = [];
            nextState._selectedRow = null;

            return nextState;
        }

        /* Set Data Origin */
        case "resetData": {
            const { _grid } = action.payload;

            _grid.current._content = _grid.current._origin;
            _grid.current._totalCount = _grid.current._originTotalCount;

            return {
                ...state,
                _totalCount: _grid.current._originTotalCount,
                _test: createContent(_grid).viewContent,
            };
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

        /* Delete Row */
        case "delete": {
            const { _grid, type } = action.payload;
            if (_grid.current._pagination === "out" || !type) return state;
            let nextState = { ...state };
            let toBeDeleted: any[] = [];
            /* Selected Row */
            if (type === "radio") {
                if (!_grid.current._selectedRow) return state;
                toBeDeleted.push(_grid.current._selectedRow);
            }
            /* Checked Row */
            if (type === "checkbox") {
                if (!_grid.current._checked.length) return state;
                toBeDeleted = [...toBeDeleted, ..._grid.current._checked];
            }
            /* Selected & Checked Row */
            if (type === "all") {
                if (!_grid.current._selectedRow && !_grid.current._checked.length) return state;
                if (_grid.current._selectedRow) toBeDeleted.push(_grid.current._selectedRow);
                if (_grid.current._checked.length) toBeDeleted = [...toBeDeleted, ..._grid.current._checked];
            }
            /* One Row */
            if (typeof type === "object" && type.__key) {
                toBeDeleted.push(type.__key);
            }
            /* Multiple Row */
            if (Array.isArray(type)) {
                toBeDeleted = [...toBeDeleted, ...type.map(({ __key }) => __key)];
            }

            _grid.current._content = _grid.current._content
                .map((_: any) => {
                    if (toBeDeleted.includes(_.__key)) {
                        if (_.type === "added") return;
                        return { ..._, __type: "deleted" };
                    } else return _;
                })
                .filter((_: any) => _ !== undefined);

            const { viewContent, viewCount } = createContent(_grid);

            _grid.current._checked = [];
            _grid.current._selectedCel = null;
            _grid.current._selectedRow = null;
            _grid.current._totalCount = viewCount;
            nextState._checked = [];
            nextState._selectedCel = null;
            nextState._selectedRow = null;
            nextState._totalCount = viewCount;
            nextState._test = viewContent;
            return nextState;
        }

        /* Add Row  */
        case "add": {
            const { _grid, data } = action.payload;
            if (_grid.current._pagination === "out") return state;
            _grid.current._content = [..._grid.current._content, { ...data, __key: uuid(), __type: "added" }];

            const { viewContent, viewCount } = createContent(_grid);

            _grid.current._totalCount = viewCount;
            return { ...state, _test: viewContent, _totalCount: viewCount };
        }

        /* Update Row */
        case "update": {
            const { _grid, data } = action.payload;
            if (!data?.__key) return state;

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

            return { ...state, _test: createContent(_grid).viewContent };
        }
        /* Group */
        case "group": {
            const { _grid, groupKey, open } = action.payload;
            _grid.current._groupStatus[groupKey] = { ..._grid.current._groupStatus[groupKey], open };
            return { ...state, _test: createContent(_grid).viewContent };
        }
        /* Sort */
        case "sort": {
            const { _grid, binding } = action.payload;
            let _sort = _grid.current._sort;
            const prev = _sort[binding];
            if (prev) {
                const pval = prev.val;
                const pseq = prev.seq;
                if (pval === "asc") {
                    _sort[binding] = { seq: pseq, val: "desc" };
                }
                if (pval === "desc") {
                    delete _sort[binding];
                }
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
            const { viewContent } = createContent(_grid);
            return { ...state, _sort, _test: viewContent };
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
            _checked = event.target.checked ? [..._checked, rowKey] : _checked.filter((_: any) => _ !== rowKey.__key);
            _grid.current._checked = _checked;
            return { ...state, _checked };
        }
        /* Handle Check All Row (Checkbox) */
        case "handleCheckAll": {
            const { _grid, event, condition } = action.payload;
            let _checked = [];
            if (event.target.checked) {
                _checked = condition
                    ? _grid.current._view
                          .filter((_: any) => {
                              return condition(_);
                          })
                          .map(({ __key }: any) => __key)
                    : _grid.current._view.map(({ __key }: any) => __key);
            }
            _grid.current._checked = _checked;
            return { ...state, _checked };
        }

        case "handleChangePage": {
            const { _grid, next } = action.payload;
            const { viewContent } = createContent(_grid);

            let nextState = {
                ...state,
                _test: viewContent,
                _page: next,
                _checked: [],
                _selectedRow: null,
            };

            return nextState;
        }
        case "handleChangeSize": {
            const { _grid, next } = action.payload;
            const { viewContent } = createContent(_grid);

            let nextState = {
                ...state,
                _test: viewContent,
                _page: 0,
                _size: next,
                _checked: [],
                _selectedRow: null,
            };

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

export { createContent, createInitialState, reducer };
