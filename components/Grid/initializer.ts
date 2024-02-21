import React from "react";
import lodash from "lodash";
import { read, utils } from "xlsx";
import { reducer, createInitialState } from "./reducer";

/**
 * ## Grid Initialize Hook
 * @param props
 * @returns
 */
const useInitialize = (props: any) => {
    const { _grid, data, render } = props;

    const __t = data?.__t?.getTime();

    const [state, dispatch] = React.useReducer(reducer, { _grid, data }, createInitialState);

    React.useEffect(() => {
        if (!_grid.current._initialized) return;
        if (!Array.isArray(data?.content)) return;
        if (data.content.length === 0 && _grid.current._content.length === 0) return;

        dispatch({ type: "setData", payload: { _grid, data } });
    }, [__t]);

    React.useEffect(() => {
        /* Set Data */
        _grid.current._setData = (data: any) => {
            if (!Array.isArray(data?.content)) return;
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

        /* Handle Select Row (Radio)  */
        _grid.current._handleSelect = (event: any, rowKey: any) => {
            dispatch({ type: "handleSelect", payload: { _grid, event, rowKey } });
        };
        /* Handle Check Row (Checkbox) */
        _grid.current._handleCheck = (event: any, rowKey: any) => {
            dispatch({ type: "handleCheck", payload: { _grid, event, rowKey } });
        };
        /* Handle Check All Row (Checkbox) */
        _grid.current._handleCheckAll = (event: any) => {
            dispatch({ type: "handleCheckAll", payload: { _grid, event, condition: render?.checkbox } });
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
                    binding,
                    value,
                    formattedValue,
                    rowValues,
                    __key: key,
                };

                dispatch({ type: "handleClickCel", payload: { key } });
            }
        };

        /* Handle Add Row */
        _grid.current._handleAdd = (data: any) => {
            if (_grid.current._pagination === "out") return;
            dispatch({ type: "add", payload: { _grid, data } });
        };
        /* Handle Delete Row */
        _grid.current._handleDelete = (type: any) => {
            if (_grid.current._pagination === "out" || !type) return;
            dispatch({ type: "delete", payload: { _grid, type } });
        };
        _grid.current._handleUpdate = (data: any) => {
            if (!data?.__key) return;
            dispatch({ type: "update", payload: { _grid, data } });
        };

        _grid.current._handleSort = (binding: any) => {
            dispatch({ type: "sort", payload: { _grid, binding } });
        };
        _grid.current._handleGroup = (groupKey: any, open: any) => {
            dispatch({ type: "group", payload: { _grid, groupKey, open } });
        };

        _grid.current._handlePage = (next: any) => {
            _grid.current._page = next;
            _grid.current._checked = [];
            _grid.current._selectedRow = null;
            _grid.current._selectedCel = null;
            if (_grid.current._pagination === "out") {
                _grid.current._setPage(next);
            } else if (_grid.current._pagination === "in") {
                dispatch({ type: "handleChangePage", payload: { _grid, next } });
            }
        };
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
                dispatch({ type: "handleChangeSize", payload: { _grid, next } });
            }
        };

        _grid.current._readjustHeight = lodash.debounce(() => {
            if (_grid.current._height === _grid.current._listInner.clientHeight) return;

            _grid.current._height = _grid.current._listInner.clientHeight;
            dispatch({ type: "readjustHeight", payload: { value: _grid.current._listInner.clientHeight } });
        }, 10);

        _grid.current._validate = (content: any) => {
            if (content !== undefined && !Array.isArray(content)) return;

            const fieldRuleObject = _grid.current._defaultSchema.body
                .flatMap(({ cells }: any) => cells)
                .reduce((prev: any, curr: any) => {
                    let next = prev;
                    const ary = getValidationArray(curr);
                    if (ary.length) next[curr.binding] = ary;

                    return next;
                }, {});

            const errors = (content || _grid.current._content).reduce((prev: any, row: any) => {
                for (const binding in fieldRuleObject) {
                    const bindingValue = row[binding];
                    const rules = fieldRuleObject[binding];
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
                            prev.push({ ...rules[i], binding, value: bindingValue });
                        }
                    }
                }
                return prev;
            }, []);

            return { errors };
        };

        _grid.current._selectExcel = () => {
            return new Promise((resolve) => {
                const input = document.createElement("input");
                input.type = "file";
                input.onchange = async () => {
                    if (!input.files) return;

                    const file = input.files[0];
                    const name = file.name;
                    const buffer = await file.arrayBuffer();

                    _grid.current._excel = { file, name, buffer };
                    resolve({ file, name, buffer });
                };
                input.click();
            });
        };

        _grid.current._importExcel = (f: any) => {
            const file = f || _grid.current._excel;

            if (!file?.buffer) {
                /* alert no excel */
                return;
            }

            const { buffer } = file;
            const wb = read(buffer);
            /* SheetNames[0] get first worksheet */
            const ws = wb.Sheets[wb.SheetNames[0]];
            const raw = utils.sheet_to_json(ws);
            const header = raw.shift() || {};

            const key = Object.keys(header);
            const label = Object.values(header);

            return raw;
        };

        _grid.current._exportExcel = () => {};

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
