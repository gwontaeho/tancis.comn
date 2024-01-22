import React from "react";
import lodash from "lodash";
import { v4 as uuid } from "uuid";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { VariableSizeList as List, areEqual } from "react-window";

import { comnUtils } from "@/comn/utils";
import { Button, FormControl, Pagination } from "@/comn/components";

export const Grid = (props: any) => {
    const {
        /**  */
        _grid,
        data = { content: [], page: { totalElements: 0 } },
        render,
        onCellClick,
        onRowClick,
    } = props;

    const { t } = useTranslation();

    /**
     * head
     */
    const [_head, _setHead] = React.useState(() => {
        return _grid.current._defaultSchema.head.map((_: any) => {
            const maxCols = Math.max(..._.cells.flatMap((cell: any) => cell.colspan || 1));
            const rect = (() => {
                if (typeof _.width === "string" && _.width.endsWith("*")) {
                    const flex = Number(_.width.split("*")[0]) > 0 ? Number(_.width.split("*")[0]) : 1;
                    return {
                        flex,
                        width: undefined,
                        minWidth: _.minWidth || 160 * flex,
                    };
                }
                return {
                    width: _.width || 160,
                    minWidth: _.width || 160,
                };
            })();
            return {
                ..._,
                ...rect,
                __key: uuid(),
                show: typeof _.show === "boolean" ? _.show : true,
                cells: _.cells
                    .map((__: any) => ({ ...__, __key: uuid() }))
                    .reduce(
                        (prev: any, curr: any) => {
                            const { colspan = 1 } = curr;
                            const _ =
                                prev[prev.length - 1].reduce((p: any, c: any) => {
                                    return p + (c.colspan || 1);
                                }, 0) +
                                    colspan >
                                maxCols;
                            if (_) prev[prev.length] = [curr];
                            else prev[prev.length - 1] = [...prev[prev.length - 1], curr];
                            return prev;
                        },
                        [[]],
                    ),
            };
        });
    });

    /**
     * body
     */
    const [_body, _setBody] = React.useState(() => {
        return _grid.current._defaultSchema.body.map((_: any, index: any) => {
            const maxCols = Math.max(..._.cells.flatMap((cell: any) => cell.colspan || 1));
            return {
                ..._,
                __key: uuid(),
                id: _head[index]?.id,
                show: _head[index]?.show,
                flex: _head[index]?.flex,
                width: _head[index]?.width,
                minWidth: _head[index]?.minWidth,
                cells: _.cells
                    .map((__: any) => ({
                        ...__,
                        __key: uuid(),
                        /** edit priority -> cell, option */
                        edit:
                            typeof __.edit === "boolean"
                                ? __.edit
                                : typeof _.edit === "boolean"
                                  ? _.edit
                                  : _grid.current._edit,
                    }))
                    .reduce(
                        (prev: any, curr: any) => {
                            const { colspan = 1 } = curr;
                            const _ =
                                prev[prev.length - 1].reduce((p: any, c: any) => {
                                    return p + (c.colspan || 1);
                                }, 0) +
                                    colspan >
                                maxCols;
                            if (_) prev[prev.length] = [curr];
                            else prev[prev.length - 1] = [...prev[prev.length - 1], curr];
                            return prev;
                        },
                        [[]],
                    ),
            };
        });
    });

    const [_totalCount, _setTotalCount] = React.useState<number>(
        _grid.current._pagination === "in" ? data.content.length : data.page.totalElements,
    );
    const [_page, _setPage] = React.useState<number>(_grid.current._page);
    const [_size, _setSize] = React.useState<number>(_grid.current._size);
    const [_selectedRow, _setSelectedRow] = React.useState<Record<string, any> | null>(null);
    const [_checked, _setChecked] = React.useState<any[]>([]);
    const [_sortBy, _setSortBy] = React.useState<any | null>([null, null]);
    const [_options, _setOptions] = React.useState({
        checkbox: _grid.current._checkbox,
        radio: _grid.current._radio,
        edit: _grid.current._edit,
        add: _grid.current._add,
        delete: _grid.current._delete,
    });

    /** initialize content */
    const [_test, _setTest] = React.useState<any[]>(() => {
        /** origin content */
        const _ = data.content.map((_: any) => ({ ..._, __key: uuid(), __type: "origin" }));

        /** content refs */
        _grid.current._origin = _;
        _grid.current._content = _;

        /** paged */
        const paged =
            _grid.current._pagination === "in" ? lodash.chunk(_, _grid.current._size)[_grid.current._page] : _;
        _grid.current._paged = paged;

        return paged || [];
    });

    /** set paged content */
    React.useEffect(() => {
        if (!_grid.current._initialized) return;
        _grid.current._paged = _test;
    }, [_test]);

    /** on content changed */
    React.useEffect(() => {
        if (!_grid.current._initialized) return;
        _setTest(() => {
            const _ = data.content?.map((_: any) => ({ ..._, __key: uuid(), __type: "origin" }));

            _grid.current._origin = _;
            _grid.current._content = _;

            const paged =
                _grid.current._pagination === "in" ? lodash.chunk(_, _grid.current._size)[_grid.current._page] : _;

            return paged || [];
        });

        _setTotalCount(_grid.current._pagination === "in" ? data.content.length : data.page.totalElements);
    }, [data.content]);

    /** set edit */
    const setEdit = React.useCallback((type: any, target: any, value: any) => {
        /**
         * # type
         * column
         * cell
         *
         * # target
         * column id
         * cell binding
         */

        switch (type) {
            case "column":
                _setBody((prev: any) => {
                    const next = prev.map((col: any) => {
                        const { id } = col;
                        if (id !== target) return col;
                        return {
                            ...col,
                            edit: value,
                            cells: col.cells.map((b: any) => {
                                return b.map((_: any) => {
                                    return { ..._, edit: value };
                                });
                            }),
                        };
                    });
                    return next;
                });
                break;
            case "cell":
                _setBody((prev: any) => {
                    const next = prev.map((col: any) => {
                        return {
                            ...col,
                            cells: col.cells.map((b: any) => {
                                return b.map((_: any) => {
                                    if (_.binding !== target) return _;
                                    return { ..._, edit: value };
                                });
                            }),
                        };
                    });
                    return next;
                });
                break;
        }
    }, []);

    /** set show */
    const setShow = React.useCallback((type: any, target: any, value: any) => {
        /**
         * # type
         * column
         * cell
         *
         * # target
         * column id
         * cell binding
         */

        switch (type) {
            case "column":
                _setHead((prev: any) => {
                    const next = prev.map((col: any) => {
                        const { id } = col;
                        if (id !== target) return col;
                        return {
                            ...col,
                            show: value,
                        };
                    });
                    return next;
                });
                _setBody((prev: any) => {
                    const next = prev.map((col: any) => {
                        const { id } = col;
                        if (id !== target) return col;
                        return {
                            ...col,
                            show: value,
                        };
                    });
                    return next;
                });
                break;
        }
    }, []);

    /** set option */
    const setOption = React.useCallback((target: any, value: any) => {
        _setOptions((prev) => {
            _grid.current[target] = value;
            return { ...prev, [target]: value };
        });

        if (target === "edit") {
            _setBody((prev: any) => {
                const next = prev.map((col: any) => {
                    return {
                        ...col,
                        edit: value,
                        cells: col.cells.map((b: any) => {
                            return b.map((_: any) => {
                                return { ..._, edit: value };
                            });
                        }),
                    };
                });
                return next;
            });
        }
    }, []);

    /** handle update */
    const handleUpdate = React.useCallback((p: any, n: any) => {
        if (!p?.__key) return;

        _grid.current._content = _grid.current._content.map((_: any) => {
            if (_.__key !== p.__key) return _;
            const { __type, __key, ...rest } = n;
            return {
                ..._,
                ...rest,
                __type:
                    _.__type === "origin" || _.__type === "updated"
                        ? Object.keys(rest).every((k) => n[k] === _grid.current._origin[k])
                            ? "origin"
                            : "updated"
                        : _.__type,
            };
        });

        if (_grid.current._paged.find(({ __key }: any) => __key === p.__key)) {
            _setTest((prev) =>
                prev.map((_) => {
                    if (_.__key !== p.__key) return _;
                    const { __type, __key, ...rest } = n;
                    return {
                        ..._,
                        ...rest,
                        __type:
                            _.__type === "origin" || _.__type === "updated"
                                ? Object.keys(rest).every((k) => n[k] === _grid.current._origin[k])
                                    ? "origin"
                                    : "updated"
                                : _.__type,
                    };
                }),
            );
        }
    }, []);

    /**
     * pagination = in
     * handle add
     */
    const handleClickAdd = React.useCallback((data?: any) => {
        if (_grid.current._pagination !== "in") return;

        _grid.current._content = [..._grid.current._content, { __key: uuid(), __type: "added", ...data }];
        const _ = _grid.current._content.filter(({ __type }: any) => __type !== "deleted");
        const paged = lodash.chunk(_, _grid.current._size)[_grid.current._page];

        _setTotalCount(_.length);
        _setTest(paged || []);
    }, []);

    /**
     * pagination = in
     * handle add
     */
    const handleClickDelete = React.useCallback((type: any) => {
        if (_grid.current._pagination !== "in") return;

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

            const _ = _grid.current._content.filter(({ __type }: any) => __type !== "deleted");
            const paged = lodash.chunk(_, _grid.current._size)[_grid.current._page];
            _setTotalCount(_.length);

            if (paged) {
                _setTest(paged);
                return;
            } else {
                if (_grid.current._page === 0) {
                    _setTest([]);
                    return;
                }
                const next = _grid.current._page - 1;
                _grid.current._page = next;
                _setPage(next);
                return;
            }
        }

        if (Array.isArray(type)) {
            if (!type.length) return;
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

            const _ = _grid.current._content.filter(({ __type }: any) => __type !== "deleted");
            const paged = lodash.chunk(_, _grid.current._size)[_grid.current._page];
            _setTotalCount(_.length);

            if (paged) {
                _setTest(paged);
                return;
            } else {
                if (_grid.current._page === 0) {
                    _setTest([]);
                    return;
                }
                const next = _grid.current._page - 1;
                _grid.current._page = next;
                _setPage(next);
                return;
            }
        }

        if (type === "radio") {
            if (!_grid.current._selectedRow) return;
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
            _setSelectedRow(null);

            const _ = _grid.current._content.filter(({ __type }: any) => __type !== "deleted");
            const paged = lodash.chunk(_, _grid.current._size)[_grid.current._page];
            _setTotalCount(_.length);

            if (paged) {
                _setTest(paged);
                return;
            } else {
                if (_grid.current._page === 0) {
                    _setTest([]);
                    return;
                }
                const next = _grid.current._page - 1;
                _grid.current._page = next;
                _setPage(next);
                return;
            }
        }
        if (type === "checkbox") {
            if (!_grid.current._checked.length) return;
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
            _setChecked([]);

            const _ = _grid.current._content.filter(({ __type }: any) => __type !== "deleted");
            const paged = lodash.chunk(_, _grid.current._size)[_grid.current._page];
            _setTotalCount(_.length);

            if (paged) {
                _setTest(paged);
                return;
            } else {
                if (_grid.current._page === 0) {
                    _setTest([]);
                    return;
                }
                const next = _grid.current._page - 1;
                _grid.current._page = next;
                _setPage(next);
                return;
            }
        }
    }, []);

    /** handle page */
    const handleChangePage = React.useCallback((next: any) => {
        _grid.current._checked = [];
        _grid.current._selectedRow = null;

        _grid.current._page = next;

        _setPage(next);
        _setChecked([]);
        _setSelectedRow(null);

        if (_grid.current._pagination === "in") {
            const _ = _grid.current._content.filter(({ __type }: any) => __type !== "deleted");
            const paged = lodash.chunk(_, _grid.current._size)[next];
            _setTest(paged || []);
        }

        if (_grid.current._pagination === "out") {
            _grid.current._setPage(next);
        }
    }, []);

    /** handle size */
    const handleChangeSize = React.useCallback((next: any) => {
        _grid.current._checked = [];
        _grid.current._selectedRow = null;

        _grid.current._page = 0;
        _grid.current._size = next;
        _setPage(0);
        _setSize(next);
        _setChecked([]);
        _setSelectedRow(null);

        if (_grid.current._pagination === "in") {
            const _ = _grid.current._content.filter(({ __type }: any) => __type !== "deleted");
            const paged = lodash.chunk(_, next)[0];
            _setTest(paged || []);
        }

        if (_grid.current._pagination === "out") {
            _grid.current._setPage(0);
            _grid.current._setSize(next);
        }
    }, []);

    /** handle check all */
    const handleCheckAll = React.useCallback((e: any) => {
        if (e.target.checked) {
            _grid.current._checked = _grid.current._paged;
            _setChecked(_grid.current._paged);
        } else {
            _grid.current._checked = [];
            _setChecked([]);
        }
    }, []);

    /** handle check */
    const handleCheck = React.useCallback((e: any, rowProps: any) => {
        if (e.target.checked) {
            _setChecked((prev) => {
                const next = [...prev, rowProps];
                _grid.current._checked = next;
                return next;
            });
        } else {
            _setChecked((prev) => {
                const next = prev.filter(({ __key }) => __key !== rowProps.__key);
                _grid.current._checked = next;
                return next;
            });
        }
    }, []);

    /** handle select */
    const handleSelect = React.useCallback((e: any, rowProps: any) => {
        if (e.target.checked) {
            _grid.current._selectedRow = rowProps;
            _setSelectedRow(rowProps);
        } else {
            _grid.current._selectedRow = null;
            _setSelectedRow(null);
        }
    }, []);

    /** initialize */
    React.useEffect(() => {
        _grid.current._setEdit = setEdit;
        _grid.current._setShow = setShow;
        _grid.current._setOption = setOption;
        _grid.current._handleCheck = handleCheck;
        _grid.current._handleSelect = handleSelect;
        _grid.current._handleUpdate = handleUpdate;
        _grid.current._handleClickAdd = handleClickAdd;
        _grid.current._handleClickDelete = handleClickDelete;
        _grid.current._handleChangePage = handleChangePage;
        _grid.current._handleChangeSize = handleChangeSize;

        _grid.current._initialized = true;
    }, []);

    return (
        <div>
            <div className="flex justify-between mb-2">
                <div className="flex gap-1">
                    <Button>import</Button>
                    <Button>export</Button>
                </div>

                <div className="flex gap-1">
                    <Button onClick={() => handleClickAdd()}>add</Button>
                    <Button onClick={() => handleClickDelete("radio")}>radio delete</Button>
                    <Button onClick={() => handleClickDelete("checkbox")}>checked delete</Button>
                </div>
            </div>

            <div className="w-full mb-2 flex flex-col bg-uf-border">
                {/* head */}
                <div
                    ref={(node) => (_grid.current._head = node)}
                    className="uf-grid-head flex w-full gap-[1px] border-b border-l border-l-uf-card-background sticky top-0 bg-uf-border z-10 overflow-x-auto"
                >
                    {/* checkbox */}
                    {_options.checkbox && (
                        <div className="uf-grid-option">
                            <input
                                type="checkbox"
                                checked={_test.every(({ __key }: any) =>
                                    _checked.some((row: any) => row.__key === __key),
                                )}
                                onChange={handleCheckAll}
                            />
                        </div>
                    )}
                    {/* radio */}
                    {_options.radio && <div className="uf-grid-option" />}
                    {/* index */}
                    <div className="uf-grid-option" />
                    {/* header */}
                    {_head.map((colProps: any, colIndex: any) => {
                        const { show, width, minWidth, flex, cells } = colProps;
                        const colKey = "head." + _grid.current._key + "." + colIndex;

                        /** col */
                        if (!show) return null;
                        return (
                            <div
                                key={colKey}
                                className={classNames("flex flex-col gap-[1px]")}
                                style={{ width, minWidth, flex }}
                            >
                                {cells.map((celProps: any, celIndex: any) => {
                                    const celKey = colKey + "." + celIndex;

                                    /** cel's row */
                                    return (
                                        <div key={celKey} className="flex h-full gap-[1px]">
                                            {celProps.map((bProps: any, bIndex: any) => {
                                                const bKey = celKey + "." + bIndex;

                                                /** cel */
                                                return (
                                                    <div
                                                        key={bKey}
                                                        className="uf-grid-cell bg-uf-card-header"
                                                        style={{
                                                            minWidth: bProps.width,
                                                            maxWidth: bProps.width,
                                                        }}
                                                    >
                                                        {render?.head?.[bProps.binding]?.() ||
                                                            t(bProps.header) ||
                                                            bProps.binding}
                                                        {bProps.required && (
                                                            <span className="text-uf-error ml-0.5">*</span>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
                <List
                    ref={(ref) => (_grid.current._list = ref)}
                    outerRef={(node) => {
                        if (node) {
                            node.onscroll = (event: any) => {
                                _grid.current._head.scrollTo({ left: event.currentTarget.scrollLeft });
                            };
                        }
                    }}
                    itemCount={_test.length > _totalCount ? _totalCount : _test.length}
                    height={400}
                    width="100%"
                    itemData={{
                        _grid,
                        /** option */
                        ..._options,
                        /** handler */
                        render,
                        onCellClick,
                        onRowClick,
                        /** state */
                        _test,
                        _body,
                        _page,
                        _size,
                        _checked,
                        _selectedRow,
                    }}
                    itemSize={(index) =>
                        _grid.current._rect[index]?.["height"] || _grid.current._rect[0]?.["height"] || 0
                    }
                >
                    {Row}
                </List>
            </div>

            <Pagination
                page={_page}
                size={_size}
                onChangePage={handleChangePage}
                onChangeSize={handleChangeSize}
                totalCount={_totalCount}
            />
        </div>
    );
};

/** row */
const Row = React.memo((props: any) => {
    const { data, index, style } = props;

    const {
        _grid,
        /** option */
        checkbox,
        radio,
        /** handler */
        render,
        onCellClick,
        onRowClick,
        /** state */
        _test,
        _body,
        _page,
        _size,
        _checked,
        _selectedRow,
    } = data;

    const rowIndex = index;
    const row = _test[rowIndex];
    const rowKey = _grid.current._key + "." + rowIndex;
    const rowType = row?.__type;
    const contentKey = row?.__key;

    const ref = React.useRef<any>();

    React.useEffect(() => {
        _grid.current._rect[rowIndex] = ref.current.getBoundingClientRect();
        _grid.current._list.resetAfterIndex(rowIndex);
    }, []);

    return (
        <div
            style={{
                ...style,
                // , top: style.height * rowIndex + rowIndex
            }}
        >
            <div
                ref={ref}
                key={rowKey}
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
                            onChange={(e) => _grid.current._handleSelect(e, row)}
                        />
                    </div>
                )}
                <div className="uf-grid-option font-semibold">{_page * _size + rowIndex + 1}</div>
                {/* body columns */}
                {_body.map((colProps: any, colIndex: any) => {
                    const { show, cells, width, minWidth, flex } = colProps;
                    const colKey = rowKey + "." + colIndex;

                    /** col */
                    if (!show) return null;
                    return (
                        <div
                            key={colKey}
                            className={classNames("flex flex-col gap-[1px]")}
                            style={{ width, minWidth, flex }}
                        >
                            {cells.map((cellProps: any, celIndex: any) => {
                                const celKey = colKey + "." + celIndex;

                                /** cel's row */
                                return (
                                    <div key={celKey} className="flex h-full gap-[1px]">
                                        {cellProps.map((bProps: any, bIndex: any) => {
                                            const bKey = celKey + "." + bIndex;
                                            const binding = bProps.binding;
                                            const value = row[binding];
                                            const ov = _grid.current._origin.find(
                                                ({ __key }: any) => __key === contentKey,
                                            )?.[binding];

                                            const o = {
                                                type: bProps.type,
                                                /** text */
                                                mask: bProps.mask,
                                                letterCase: bProps.letterCase,
                                                /** number */
                                                decimalScale: bProps.decimalScale,
                                                thousandSeparator: bProps.thousandSeparator,
                                                /** code */
                                                area: bProps.area,
                                                comnCd: bProps.comnCd,
                                                /** */
                                                options: bProps.options,
                                                /** rules */
                                                min: bProps.min,
                                                max: bProps.max,
                                                minLength: bProps.minLength,
                                                pattern: bProps.pattern,
                                                validate: bProps.validate,
                                                required: bProps.required,
                                                maxLength: bProps.maxLength,
                                            };

                                            const fv = comnUtils.getFormattedValue(value, o);
                                            const uv = comnUtils.getUnformattedValue(value, o);
                                            const vldv = comnUtils.getValidatedValue(uv, o);

                                            /** cel */
                                            return (
                                                <div
                                                    key={bKey}
                                                    {...(vldv && { "aria-invalid": true })}
                                                    className={classNames(
                                                        "uf-grid-cell bg-uf-card-background border-uf-card-background border aria-selected:border-uf-info aria-[invalid=true]:border-uf-error",
                                                        (bProps.align === "start" || bProps.align === "left") &&
                                                            "justify-start",
                                                        (bProps.align === "end" || bProps.align === "start") &&
                                                            "justify-end",
                                                    )}
                                                    style={{
                                                        minWidth: bProps.width,
                                                        maxWidth: bProps.width,
                                                    }}
                                                    onClick={() => {
                                                        if (onCellClick[binding])
                                                            onCellClick[binding]({
                                                                binding: binding,
                                                                value: uv,
                                                                formattedValue: fv,
                                                                rowValues: row,
                                                            });
                                                    }}
                                                >
                                                    {!bProps.edit &&
                                                        (render?.cell?.[binding]?.({
                                                            value: value,
                                                            rowValues: row,
                                                            binding: binding,
                                                        }) ||
                                                            uv)}

                                                    {bProps.edit &&
                                                        (render?.edit?.[binding]?.({
                                                            value: value,
                                                            rowValues: row,
                                                            binding: binding,
                                                        }) || (
                                                            <FormControl
                                                                {...o}
                                                                value={fv}
                                                                onChange={(v) => {
                                                                    _grid.current._handleUpdate(row, {
                                                                        ...row,
                                                                        [binding]: comnUtils.getUnformattedValue(v, o),
                                                                    });
                                                                }}
                                                            />
                                                        ))}
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}, areEqual);
