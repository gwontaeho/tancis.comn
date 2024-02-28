import React from "react";
import lodash from "lodash";
import { read, utils } from "xlsx";
import { v4 as uuid } from "uuid";
import { getView } from "./utils";
import { reducer, createInitialState } from "./reducer";

/**
 * ## Grid Initialize Hook
 * @param props
 * @returns
 */
const useInitialize = (props: any) => {
    const { _grid, data, render, onRowCheck, onRowSelect } = props;
    if (_grid.current._render === undefined) {
        _grid.current._render = render;
    }
    if (_grid.current._onRowCheck === undefined) {
        _grid.current._onRowCheck = onRowCheck;
    }
    if (_grid.current._onRowSelect === undefined) {
        _grid.current._onRowSelect = onRowSelect;
    }

    const __t = data?.__t?.getTime();
    const [state, dispatch] = React.useReducer(reducer, { _grid, data }, createInitialState);

    React.useEffect(() => {
        if (!_grid.current._initialized) return;
        if (!Array.isArray(data?.content)) return;
        if (data.content.length === 0 && _grid.current._content?.length === 0) return;
        _grid.current._setData(data);
    }, [__t]);

    React.useEffect(() => {
        /* Set data  */
        _grid.current._setData = (data: any) => {
            if (!Array.isArray(data?.content)) return;
            _grid.current._data = data;
            const content = data.content.map((_: any) => ({ ..._, __key: uuid(), __type: "origin" }));
            if (_grid.current._pagination === "in") _grid.current._page = 0;
            _grid.current._content = content;
            _grid.current._origin = content;
            getView(_grid);
            _grid.current._originTotalCount = _grid.current._totalCount;
            dispatch({ type: "setData", payload: { _grid } });
        };
        /* Set data to origin */
        _grid.current._resetData = () => {
            _grid.current._content = _grid.current._origin;
            _grid.current._totalCount = _grid.current._originTotalCount;
            getView(_grid);
            dispatch({ type: "resetData", payload: { _grid } });
        };
        /* Handle add row */
        _grid.current._handleAdd = (data?: any) => {
            if (_grid.current._pagination === "out") return;
            _grid.current._content = [..._grid.current._content, { ...data, __key: uuid(), __type: "added" }];
            getView(_grid);
            dispatch({ type: "add", payload: { _grid } });
        };
        /* Handle delete row */
        _grid.current._handleDelete = (type: any) => {
            if (_grid.current._pagination === "out" || !type) return;
            let targets: any[] = [];
            switch (type) {
                case "radio":
                    if (!_grid.current._selectedRow) return;
                    targets.push(_grid.current._selectedRow);
                    break;
                case "checkbox":
                    if (!_grid.current._checked.length) return;
                    targets = [...targets, ..._grid.current._checked];
                    break;
                case "all":
                    if (!_grid.current._selectedRow && !_grid.current._checked.length) return;
                    if (_grid.current._selectedRow) targets.push(_grid.current._selectedRow);
                    if (_grid.current._checked.length) targets = [...targets, ..._grid.current._checked];
                    break;
                default:
                    if (typeof type === "object" && type.__key) targets.push(type.__key);
                    if (Array.isArray(type)) targets = [...targets, ...type.map(({ __key }: any) => __key)];
            }
            _grid.current._content = _grid.current._content
                .map((_: any) => {
                    if (targets.includes(_.__key)) {
                        if (_.__type === "added") return;
                        return { ..._, __type: "deleted" };
                    } else return _;
                })
                .filter((_: any) => _ !== undefined);
            _grid.current._checked = [];
            _grid.current._selectedCel = null;
            _grid.current._selectedRow = null;
            getView(_grid);
            dispatch({ type: "delete", payload: { _grid, type } });
        };
        /* Handle update row */
        _grid.current._handleUpdate = (data: any) => {
            if (!data?.__key) return;
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
            getView(_grid);
            dispatch({ type: "update", payload: { _grid } });
        };
        /* Handle Sort */
        _grid.current._handleSort = (binding: any) => {
            if (!binding) return;
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
            getView(_grid);
            dispatch({ type: "sort", payload: { _grid, binding } });
        };
        /* Handle Group */
        _grid.current._handleGroup = (groupKey: string, open: boolean) => {
            if (!groupKey) return;
            _grid.current._groupStatus[groupKey] = { ..._grid.current._groupStatus[groupKey], open };
            getView(_grid);
            dispatch({ type: "group", payload: { _grid } });
        };
        /* Set edit */
        _grid.current._setEdit = (type: any, target: any, value: any) => {
            switch (type) {
                case "column":
                    _grid.current._body = _grid.current._body.map((_: any) => {
                        if (_.id !== target) return _;
                        const cells = _.cells.map((__: any) => {
                            return { ...__, edit: value };
                        });
                        return { ..._, cells };
                    });
                    break;
                case "cell":
                    _grid.current._body = _grid.current._body.map((_: any) => {
                        const cells = _.cells.map((__: any) => {
                            if (__.binding !== target) return __;
                            return { ...__, edit: value };
                        });
                        return { ..._, cells };
                    });
                    break;
                case "row": {
                    const key =
                        typeof target === "object" && !!target?.__key
                            ? target.__key
                            : typeof target === "string"
                              ? target
                              : undefined;
                    if (key) {
                        const row = _grid.current._editingRow.find((r: any) => r.key === key && r.cell === undefined);
                        if (typeof value === "boolean") {
                            _grid.current._editingRow = row
                                ? _grid.current._editingRow.map((_: any) => {
                                      if (_.key !== key) return _;
                                      if (_.cell !== undefined) return _;
                                      return { ..._, edit: value };
                                  })
                                : [..._grid.current._editingRow, { key, edit: value }];
                        }
                    }
                    break;
                }
                case "rowCell": {
                    const { row, cell } = target;
                    const rowKey =
                        typeof row === "object" && !!row?.__key ? row.__key : typeof row === "string" ? row : undefined;
                    if (rowKey) {
                        const row = _grid.current._editingRow.find((r: any) => r.key === rowKey && r.cell === cell);
                        if (typeof value === "boolean") {
                            _grid.current._editingRow = row
                                ? _grid.current._editingRow.map((_: any) => {
                                      if (_.key !== rowKey) return _;
                                      if (_.cell !== cell) return _;
                                      return { ..._, edit: value };
                                  })
                                : [..._grid.current._editingRow, { key: rowKey, edit: value, cell }];
                        }
                    }
                    break;
                }
            }
            dispatch({ type: "setEdit", payload: { _grid } });
        };
        /* Set show */
        _grid.current._setShow = (type: any, target: any, value: any) => {
            switch (type) {
                case "column": {
                    _grid.current._head = _grid.current._head.map((_: any) => {
                        if (_.id !== target) return _;
                        return {
                            ..._,
                            show: value,
                            cells: _.cells.map((__: any) => {
                                return { ...__, show: value };
                            }),
                        };
                    });
                    _grid.current._body = _grid.current._body.map((_: any) => {
                        if (_.id !== target) return _;
                        return {
                            ..._,
                            show: value,
                            cells: _.cells.map((__: any) => {
                                return { ...__, show: value };
                            }),
                        };
                    });
                }
            }
            dispatch({ type: "setShow", payload: { _grid } });
        };
        /* Set option */
        _grid.current._setOption = (target: any, value: any) => {
            switch (target) {
                case "height": {
                    if (value === "auto") {
                        _grid.current._height = _grid.current._listInner.clientHeight;
                        _grid.current._autoHeight = true;
                    } else {
                        _grid.current._height = value;
                        _grid.current._autoHeight = false;
                    }
                    break;
                }
                case "edit": {
                    _grid.current._edit = value;
                    _grid.current._body = _grid.current._body.map((_: any) => {
                        return {
                            ..._,
                            edit: value,
                            cells: _.cells.map((__: any) => {
                                return { ...__, edit: value };
                            }),
                        };
                    });
                    break;
                }
                default:
                    _grid.current[target] = value;
                    break;
            }
            dispatch({ type: "setOption", payload: { _grid, target } });
        };
        /* Handle Click Cell */
        _grid.current._handleClickCel = (payload: any) => {
            const { key, binding, value, formattedValue, rowValues, onCellClick } = payload;
            if (onCellClick)
                onCellClick({
                    binding,
                    value,
                    formattedValue,
                    rowValues,
                });
            if (_grid.current._selectedCel?.__key !== key) {
                _grid.current._selectedCel = {
                    value,
                    binding,
                    rowValues,
                    formattedValue,
                    __key: key,
                };
                dispatch({ type: "handleClickCel", payload: { _grid } });
            }
        };
        /* Handle Select Row (Radio)  */
        _grid.current._handleSelect = (event: any, rowKey: any) => {
            _grid.current._selectedRow = rowKey;

            if (_grid.current._onRowSelect) {
                _grid.current._onRowSelect(_grid.current._content.find(({ __key }: any) => __key === rowKey));
            }

            dispatch({ type: "handleSelect", payload: { _grid } });
        };
        /* Handle Check Row (Checkbox) */
        _grid.current._handleCheck = (event: any, rowKey: any) => {
            let _checked = [..._grid.current._checked];
            _checked = event.target.checked ? [..._checked, rowKey] : _checked.filter((_: any) => _ !== rowKey);
            _grid.current._checked = _checked;

            if (_grid.current._onRowCheck) {
                _grid.current._onRowCheck(
                    _grid.current._content.find(({ __key }: any) => __key === rowKey),
                    event.target.checked,
                );
            }

            dispatch({ type: "handleCheck", payload: { _grid } });
        };
        /* Handle Check All Row (Checkbox) */
        _grid.current._handleCheckAll = (event: any) => {
            let _checked = [];
            if (event.target.checked) {
                _checked = render?.checkbox
                    ? _grid.current._view.filter((_: any) => render?.checkbox(_)).map(({ __key }: any) => __key)
                    : _grid.current._view.map(({ __key }: any) => __key);
            }
            _grid.current._checked = _checked;
            dispatch({ type: "handleCheckAll", payload: { _grid } });
        };
        /* Handle Change Page */
        _grid.current._handlePage = (next: any) => {
            _grid.current._page = next;
            _grid.current._checked = [];
            _grid.current._selectedRow = null;
            _grid.current._selectedCel = null;
            if (_grid.current._pagination === "out") {
                _grid.current._setPage(next);
            } else if (_grid.current._pagination === "in") {
                getView(_grid);
                dispatch({ type: "handleChangePage", payload: { _grid } });
            }
        };
        /* Handle Change Size */
        _grid.current._handleSize = (next: any) => {
            _grid.current._page = 0;
            _grid.current._size = next;
            _grid.current._checked = [];
            _grid.current._selectedRow = null;
            _grid.current._selectedCel = null;
            if (_grid.current._pagination === "out") {
                _grid.current._setPage(0);
                _grid.current._setSize(next);
            } else if (_grid.current._pagination === "in") {
                getView(_grid);
                dispatch({ type: "handleChangeSize", payload: { _grid } });
            }
        };
        /* Readjust */
        _grid.current._readjustHeight = lodash.debounce(() => {
            if (_grid.current._height === _grid.current._listInner.clientHeight) return;
            _grid.current._height = _grid.current._listInner.clientHeight;
            dispatch({ type: "readjustHeight", payload: { _grid } });
        }, 10);

        // _grid.current._scrollToRow = (row: any) => {
        //     _grid.current._listRef.scrollToItem(row, "center");
        // };

        _grid.current._validate = () => {
            console.log(_grid.current);

            const _head = _grid.current._head;
            const labels: { [key: string]: any } = {};
            _head.map((item: any) => {
                item.cells?.map((_item: any) => {
                    labels[_item.binding] = _item.header;
                });
            });

            const errors = _grid.current._content
                .filter((_: any) => {
                    return _.__type !== "deleted";
                })
                .reduce((prev: any, row: any) => {
                    for (const binding in _grid.current._rule) {
                        const bindingValue = row[binding];
                        const rules = _grid.current._rule[binding];

                        for (let i = 0; i < rules.length; i++) {
                            let invalid = false;
                            const { value, type } = rules[i];
                            switch (type) {
                                case "required":
                                    invalid = !bindingValue;
                                    break;
                                case "min":
                                    invalid = bindingValue < value;
                                    break;
                                case "max":
                                    invalid = bindingValue > value;
                                    break;
                                case "minLength":
                                    invalid = bindingValue.length < value;
                                    break;
                                case "maxLength":
                                    invalid = bindingValue.length > value;
                                    break;
                                case "pattern":
                                    invalid = !value.test(bindingValue);
                                    break;
                                case "validate":
                                    invalid = !value(bindingValue);
                                    break;
                                case "resource":
                                    break;
                            }
                            if (invalid) {
                                prev.push({
                                    ...rules[i],
                                    binding,
                                    label: labels[binding],
                                    value: bindingValue,
                                    row: row.__index + 1,
                                });
                            }
                        }
                    }
                    return prev;
                }, []);

            return { errors };
        };

        _grid.current._importExcel = () => {
            return new Promise((resolve) => {
                const input = document.createElement("input");
                input.type = "file";
                input.onchange = async () => {
                    if (!input.files) return;
                    const file = input.files[0];
                    const buffer = await file.arrayBuffer();
                    const wb = read(buffer);
                    const ws = wb.Sheets[wb.SheetNames[0]];
                    const raw = utils.sheet_to_json(ws).map(({ __rowNum__, ..._ }: any) => _);
                    const header = raw.shift() || {};
                    resolve(raw);
                };
                input.click();
            });
        };

        /* Initialize Grid */
        _grid.current._initialized = true;
        return () => {};
    }, []);

    return { state, dispatch };
};

export { useInitialize };

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
                        message = "msg.com.000010";
                        break;
                    case "validate":
                        message = "msg.com.000011";
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
