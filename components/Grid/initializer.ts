import React from "react";
import lodash from "lodash";

import { reducer, createInitialState } from "./reducer";

/**
 * ## Grid Initialize Hook
 */
const useInitialize = (props: any) => {
    const { _grid, data, render } = props;

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
            dispatch({ type: "handleCheckAll", payload: { _grid, event, condition: render?.checkbox } });
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
        _grid.current._handleSort = (binding: any) => {
            dispatch({ type: "sort", payload: { _grid, binding } });
        };
        _grid.current._handleGroup = (groupKey: any, open: any) => {
            dispatch({ type: "group", payload: { _grid, groupKey, open } });
        };
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
        _grid.current._handlePage = (next: any) => {
            _grid.current._page = next;
            _grid.current._checked = [];
            _grid.current._selectedRow = null;

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

        _grid.current._initialized = true;

        return () => {};
    }, []);

    return { state, dispatch };
};

export { useInitialize };
