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
 * ### Sort Content
 * @param _grid
 * @param content
 * @returns
 */
const sort = (_grid: any, content: any) => {
    const [iteratees, orders] = lodash.sortBy(Object.entries(_grid.current._sort), [([, { seq }]: any) => seq]).reduce(
        (prev: any, curr: any) => {
            return [
                [...prev[0], curr[0]],
                [...prev[1], curr[1].val],
            ];
        },
        [[], []],
    );
    return lodash.orderBy(content, iteratees, orders);
};

/**
 * ### Group Content
 * @param _grid
 * @param content
 * @returns
 */
const group = (_grid: any, content: any) => {
    const groups = lodash.sortBy(Object.entries<any>(_grid.current._group), [(o: any) => o[1].seq]);
    const getGrouped = (data: any, by: any, prevDepth: any, prevParent: any, prevGroupKey: any): any => {
        // if (!by) return sort(_grid, data);
        if (!by) return data;
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

/**
 * ## Create View Content
 * @param _grid
 * @returns
 */
const getView = (_grid: any) => {
    let view = sort(_grid, _grid.current._content);
    _grid.current._content = view;
    view = view.filter(({ __type }: any) => __type !== "deleted");
    if (Object.keys(_grid.current._group).length) view = group(_grid, view);
    if (_grid.current._pagination === "in") view = lodash.chunk(view, _grid.current._size)[_grid.current._page] || [];
    _grid.current._view = view;
    return view;
};

/**
 * ## Get Count
 * @param _grid
 * @returns
 */
const getCount = (_grid: any) => {
    const count =
        _grid.current._pagination === "out"
            ? _grid.current._data.page.totalElements
            : _grid.current._content.filter(({ __type }: any) => __type !== "deleted").length;
    _grid.current._totalCount = count;
    return count;
};

export { getView, getCount, fun };
