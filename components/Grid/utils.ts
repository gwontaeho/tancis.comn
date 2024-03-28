import { v4 as uuid } from "uuid";
import lodash from "lodash";

const makeTemplate = (_head: any) => {
    let w = Array(_head[0].length);
    for (let i = 0; i < _head.length; i++) {
        for (let j = 0; j < _head[i].length; j++) {
            if (w[j] === undefined) w[j] = 100;
            if (_head[i]?.[j]?.width !== undefined && _head[i]?.[j]?.colspan !== undefined) {
                for (let k = j; k <= j + _head[i]?.[j]?.colspan; k++) {
                    if (k < _head[0].length) {
                        w[k] = _head[i]?.[j]?.width / _head[i]?.[j]?.colspan;
                    }
                }
            }
            if (_head[i]?.[j]?.width !== undefined && _head[i]?.[j]?.colspan === undefined) {
                w[j] = _head[i]?.[j].width;
            }
            if (_head[i]?.[j]?.show === false) {
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
};

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
 *
 * @param v
 * @param r
 * @returns
 */
const validateValue = (v: any, r: any) => {
    let errors = [];

    if (Array.isArray(r)) {
        for (let i = 0; i < r?.length; i++) {
            let invalid;
            const { value, type, message } = r[i];
            switch (type) {
                case "required":
                    invalid = !v;
                    break;
                case "min":
                    if (typeof v === "number") invalid = v < value;
                    break;
                case "max":
                    if (typeof v === "number") invalid = v > value;
                    break;
                case "minLength":
                    if (typeof v === "string") invalid = v?.length < value;
                    break;
                case "maxLength":
                    if (typeof v === "string") invalid = v?.length > value;
                    break;
                case "pattern":
                    if (value instanceof RegExp) invalid = !value.test(v);
                    break;
                case "validate":
                    if (typeof value === "function") invalid = !value(v);
                    break;
                case "resource":
                    break;
            }
            if (invalid) errors.push({ type, message, bindingValue: v });
        }
    }

    return { errors, isError: !!errors.length };
};

/**
 * ### Sort Content
 * @param _grid
 * @param content
 * @returns
 */
const sort = (_grid: any) => {
    const [iteratees, orders] = lodash
        .sortBy(Object.entries(_grid.current._sort), [
            ([, { seq }]: any) => {
                return seq;
            },
        ])
        .reduce(
            (prev: any, curr: any) => {
                return [
                    [...prev[0], curr[0]],
                    [...prev[1], curr[1].val],
                ];
            },
            [[], []],
        );
    _grid.current._content = //
        lodash.orderBy(_grid.current._content, iteratees, orders);
};

/**
 * ### Group Content
 * @param _grid
 * @param content
 * @returns
 */
const group = (_grid: any, content: any) => {
    const groups = lodash.sortBy(Object.entries<any>(_grid.current._group), [(o: any) => o[1].seq]);

    const getGroupedContent = (data: any, iteratees: any, depth: any): any => {
        if (!iteratees) return data;
        depth += 1;
        return Object.entries(lodash.groupBy(data, iteratees[0])).reduce((prev: any, curr: any) => {
            return [...prev, ...getGroupedContent(curr[1], groups[depth], depth)];
        }, []);
    };

    const getGroupedView = (data: any, by: any, prevDepth: any, prevParent: any, prevGroupKey: any): any => {
        if (!by) return data;
        const depth = prevDepth + 1;
        const parent = [...prevParent, by];
        return Object.entries(lodash.groupBy(data, by[0])).reduce((prev: any, curr: any) => {
            const groupKey = prevGroupKey + "__" + curr[0];
            if (_grid.current._groupStatus[groupKey] === undefined) {
                _grid.current._groupStatus[groupKey] = { open: true };
            }
            const open = _grid.current._groupStatus[groupKey].open;

            /* Group Aggregate */
            const aggregateFunction = _grid.current._groupSchema
                ?.flatMap(({ cells }: any) => cells)
                .reduce((prev: any, curr: any) => {
                    if (curr.binding && curr.aggregate) {
                        if (
                            !prev.find(
                                ({ binding, aggregate }: any) =>
                                    binding === curr.binding && aggregate === curr.aggregate,
                            )
                        ) {
                            prev.push(curr);
                        }
                    }

                    return prev;
                }, []);

            const aggregate = aggregateFunction?.map((_: any) => {
                const d = curr[1].filter(({ __type }: any) => {
                    return __type !== "deleted";
                });

                let value;
                switch (_.aggregate) {
                    case "SUM":
                        value = d.reduce((prev: any, curr: any) => Number(prev) + Number(curr[_.binding]), 0);
                        break;
                    case "AVERAGE":
                        value =
                            d.reduce((prev: any, curr: any) => Number(prev) + Number(curr[_.binding]), 0) / d.length;
                        break;
                    case "MIN":
                        value = Math.min(...d.map((__: any) => __[_.binding]));
                        break;
                    case "MAX":
                        value = Math.max(...d.map((__: any) => __[_.binding]));
                        break;
                    case "COUNT":
                        value = d.length;
                        break;
                }
                return { ..._, value };
            });

            /* Group Foot Aggregate */
            const foot_aggregateFunction = _grid.current._groupFootSchema
                ?.flatMap(({ cells }: any) => cells)
                .reduce((prev: any, curr: any) => {
                    if (curr.binding && curr.aggregate) {
                        if (
                            !prev.find(
                                ({ binding, aggregate }: any) =>
                                    binding === curr.binding && aggregate === curr.aggregate,
                            )
                        ) {
                            prev.push(curr);
                        }
                    }

                    return prev;
                }, []);
            const foot_aggregate = foot_aggregateFunction?.map((_: any) => {
                const d = curr[1].filter(({ __type }: any) => {
                    return __type !== "deleted";
                });
                let value;
                switch (_.aggregate) {
                    case "SUM":
                        value = d.reduce((prev: any, curr: any) => Number(prev) + Number(curr[_.binding]), 0);
                        break;
                    case "AVERAGE":
                        value =
                            d.reduce((prev: any, curr: any) => Number(prev) + Number(curr[_.binding]), 0) / d.length;
                        break;
                    case "MIN":
                        value = Math.min(...d.map((__: any) => __[_.binding]));
                        break;
                    case "MAX":
                        value = Math.max(...d.map((__: any) => __[_.binding]));
                        break;
                    case "COUNT":
                        value = d.length;
                        break;
                }
                return { ..._, value };
            });
            const GROUP_ROW = [];
            if (_grid.current._groupSchema) {
                const count = curr[1].filter(({ __type }: any) => {
                    return __type !== "deleted";
                }).length;
                const row = {
                    __key: uuid(),
                    __type: "group",
                    open,
                    depth,
                    groupKey,
                    value: curr[0],
                    binding: by[0],
                    count,
                    aggregate,
                };
                if (count) {
                    GROUP_ROW.push(row);
                }
            }

            const GROUP_FOOT_ROW = [];
            if (_grid.current._groupFootSchema) {
                const count = curr[1].filter(({ __type }: any) => {
                    return __type !== "deleted";
                }).length;

                const row = {
                    __key: uuid(),
                    __type: "groupFoot",
                    depth,
                    groupKey,
                    value: curr[0],
                    binding: by[0],
                    count,
                    aggregate: foot_aggregate,
                };
                if (count) {
                    GROUP_FOOT_ROW.push(row);
                }
            }

            if (open) {
                return [
                    ...prev,
                    ...GROUP_ROW,
                    ...getGroupedView(curr[1], groups[depth], depth, parent, groupKey),
                    ...GROUP_FOOT_ROW,
                ];
            } else {
                return [...prev, ...GROUP_ROW, ...GROUP_FOOT_ROW];
            }
        }, []);
    };

    return {
        groupedContent: getGroupedContent(content, groups[0], 0),
        groupedView: getGroupedView(
            content
                .map((_: any) => {
                    const __context = {};

                    if (_grid.current._render?.row) {
                        const render = _grid.current._render?.row?.(_, __context);

                        if (render) {
                        } else {
                            return undefined;
                        }
                    }
                    return { ..._, __context };
                })
                .filter(Boolean),
            groups[0],
            0,
            [],
            "",
        ),
    };
};

/**
 * ## Create View Content
 * @param _grid
 * @returns
 */
const getView = (_grid: any) => {
    sort(_grid);

    let content;
    let view;
    let count;
    let itemCount;

    if (_grid.current._group) {
        const { groupedContent, groupedView } = group(_grid, _grid.current._content);
        content = groupedContent;
        view = groupedView;
    } else {
        content = _grid.current._content;
        view = content
            .map((_: any) => {
                const __context = {};

                if (_grid.current._render?.row) {
                    const render = _grid.current._render?.row?.(_, __context);

                    if (render) {
                    } else {
                        return undefined;
                    }
                }
                return { ..._, __context };
            })
            .filter(Boolean);
    }

    let contentIndex = 0;
    content = content.map((_: any) => {
        let next = _;
        if (_.__type === "deleted") next.__index = -1;
        else next.__index = contentIndex++;
        return next;
    });

    let viewIndex = 0;
    view = view
        .map((_: any) => {
            let next = _;
            if (_.__type === "group" || _.__type === "groupFoot" || _.__type === "deleted") next.__index = -1;
            else next.__index = viewIndex++;
            return next;
        })
        .filter(({ __type }: any) => __type !== "deleted");

    if (_grid.current._pagination === "out") {
        count = _grid.current._data.page.totalElements;
        itemCount = count;
    } else {
        count = _grid.current._content.filter(({ __type }: any) => __type !== "deleted").length;
        itemCount = view.length;
    }

    if (_grid.current._pagination === "in") {
        view = lodash.chunk(view, _grid.current._size)[_grid.current._page] || [];
    }

    _grid.current._content = content;
    _grid.current._view = view;
    _grid.current._totalCount = count;
    _grid.current._totalItemCount = itemCount;
};

const getRef = (schema: any, paging: any, sizing: any) => {
    const { options = {}, head, body, group, groupFoot } = schema;
    const [_page, _setPage] = paging;
    const [_size, _setSize] = sizing;

    return {
        _initialized: false,
        _queue: [],

        _defaultSchema: schema,
        _key: uuid(),

        _page,
        _size,
        _setPage,
        _setSize,

        _data: null,
        _origin: [],
        _content: [],
        _view: [],
        _totalCount: 0,
        _originTotalCount: 0,
        _sort: {},
        _rect: [],
        _checked: [],
        _groupStatus: {},
        _selectedRow: null,
        _selectedCel: null,
        _editingRow: [],

        _sortable: options.sort,
        _add: options.add,
        _edit: options.edit,
        _index: options.index,
        _radio: options.radio,
        _delete: options.delete,
        _checkbox: options.checkbox,
        _pagination: options.pagination,
        _exportExcel: options.exportExcel,
        _importExcel: options.importExcel,
        _autoHeight: options.height === "auto",
        _height: options.height === "auto" ? 0 : options.height || 400,
        _cols: head.length,

        _group:
            Array.isArray(options.group) || options.group === true
                ? (options.group === true ? [""] : options.group).reduce((p: any, c: any, seq: any) => {
                      return { ...p, [c]: { seq } };
                  }, {})
                : {},

        _rule: body
            .flatMap(({ cells }: any) => cells)
            .reduce((prev: any, curr: any) => {
                const ary = getValidationArray(curr);
                if (ary.length) prev[curr.binding] = ary;
                return prev;
            }, {}),
        _head: head.map((_: any) => {
            const show = _.show === true ? true : _.show === false ? false : true;
            const cells = _.cells.map((__: any) => {
                return { ...__, show };
            });
            return { ..._, show, cells };
        }),
        _body: body.map((_: any, i: any) => {
            const col = head[i];
            const id = col?.id;
            const show = col?.show;

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
                              : options?.edit === true
                                ? true
                                : false;
                return { ...__, id, show, edit };
            });
            return { ..._, id, show, cells };
        }),
        _groupSchema: group,
        _groupFootSchema: groupFoot,
    };
};

const getValidationArray = (o: any) => {
    return ["required", "min", "max", "minLength", "maxLength", "pattern", "validate", "area"]
        .map((type) => {
            if (!o[type]) return;

            let value;
            let message;

            if (typeof o[type] === "object") {
                if (o[type].hasOwnProperty("value")) {
                    value = o[type].value;
                } else value = o[type];

                if (o[type].hasOwnProperty("message")) {
                    message = o[type].message;
                }
            } else {
                value = o[type];
            }

            if (!message) {
                switch (type) {
                    case "required":
                        if (o[type] === "string") message = o[type];
                        else message = "msg.com.00005";
                        break;
                    case "min":
                        message = "msg.com.00006";
                        break;
                    case "max":
                        message = "msg.com.00007";
                        break;
                    case "minLength":
                        message = "msg.com.00008";
                        break;
                    case "maxLength":
                        message = "msg.com.00009";
                        break;
                    case "pattern":
                        message = "msg.com.00010";
                        break;
                    case "validate":
                        message = "msg.com.00011";
                        break;
                    default:
                        break;
                }
            }

            if (type === "area") {
                value = o[type] + (o.comnCd ? ":" + o.comnCd : "");
                message = "msg.com.00017";
                type = "resource";
            }

            return { type, value, message };
        })
        .filter(Boolean);
};

export { getView, validateValue, fun, makeTemplate, getValidationArray, getRef };
