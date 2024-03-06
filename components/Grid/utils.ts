import { v4 as uuid } from "uuid";
import lodash from "lodash";

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
                const d = curr[1];

                let value;
                switch (_.aggregate) {
                    case "SUM":
                        value = d.reduce((prev: any, curr: any) => prev + curr[_.binding], 0);
                        break;
                    case "AVERAGE":
                        value = d.reduce((prev: any, curr: any) => prev + curr[_.binding], 0) / d.length;
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

            const row = {
                __key: uuid(),
                __type: "group",
                open,
                depth,
                groupKey,
                value: curr[0],
                binding: by[0],
                count: curr[1].length,
                aggregate,
            };

            if (open) {
                return [...prev, row, ...getGroupedView(curr[1], groups[depth], depth, parent, groupKey)];
            } else {
                return [...prev, row];
            }
        }, []);
    };

    return {
        c: getGroupedContent(content, groups[0], 0),
        v: getGroupedView(
            content.filter((_: any) => {
                if (_grid.current._render?.row) {
                    return _grid.current._render?.row?.(_);
                }
                return _;
            }),
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

    if (Object.keys(_grid.current._group).length) {
        const { c, v } = group(_grid, _grid.current._content);
        content = c;
        view = v;
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
            if (_.__type === "group" || _.__type === "deleted") next.__index = -1;
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

export { getView, validateValue, fun };
