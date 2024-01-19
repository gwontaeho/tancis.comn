import React from "react";
import lodash from "lodash";
import { v4 as uuid } from "uuid";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { Button, FormControl, Pagination } from "@/comn/components";

export const Grid = (props: any) => {
    const { _grid, data = { content: [], page: { totalElements: 0 } }, render } = props;

    const { t } = useTranslation();

    const _setTotalCount = React.useRef<any>();

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
                        flex, //
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

        return paged;
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
            /** origin content */
            const _ = data.content?.map((_: any) => ({ ..._, __key: uuid(), __type: "origin" }));

            /** content refs */
            _grid.current._origin = _;
            _grid.current._content = _;

            /** paged */
            const paged =
                _grid.current._pagination === "in" ? lodash.chunk(_, _grid.current._size)[_grid.current._page] : _;

            return paged || [];
        });
    }, [data.content]);

    /** on paging, on sizing */
    React.useEffect(() => {
        if (!_grid.current._initialized) return;

        // if (_grid.current._pagination === "in") {
        //     const _ = _grid.current._content.filter(({ __type }: any) => __type !== "deleted");
        //     const paged = lodash.chunk(_, _size)[_page];
        //     _setTest(paged || []);
        // }

        // _grid.current._checked = [];
        // _grid.current._selectedRow = null;
        // _setChecked([]);
        // _setSelectedRow(null);
    }, [_page, _size]);

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
    const handleClickAdd = React.useCallback(() => {
        if (_grid.current._pagination !== "in") return;

        _grid.current._content = [..._grid.current._content, { __key: uuid(), __type: "added" }];
        const _ = _grid.current._content.filter(({ __type }: any) => __type !== "deleted");
        const paged = lodash.chunk(_, _grid.current._size)[_grid.current._page];

        _setTotalCount.current?.(_.length);
        _setTest(paged || []);
    }, []);

    /**
     * pagination = in
     * handle add
     */
    const handleClickDelete = React.useCallback((type: any) => {
        if (_grid.current._pagination !== "in") return;

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
            _setTotalCount.current?.(_.length);

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
            _setTotalCount.current?.(_.length);

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

    /** set method */
    React.useEffect(() => {
        _grid.current._handleChangePage = handleChangePage;
        _grid.current._handleChangeSize = handleChangeSize;
        _grid.current._setEdit = setEdit;
        _grid.current._setShow = setShow;
        _grid.current._setOption = setOption;
        _grid.current._handleUpdate = handleUpdate;
        _grid.current._handleClickAdd = handleClickAdd;
        _grid.current._handleClickDelete = handleClickDelete;

        _grid.current._initialized = true;
    }, []);

    return (
        <div className="[&_.cell]:justify-center [&_.cell]:min-h-[2.5rem] [&_.cell]:flex [&_.cell]:items-center [&_.cell]:px-1">
            <div className="flex justify-between mb-2">
                <div className="flex gap-1">
                    <Button>import</Button>
                    <Button>export</Button>
                </div>

                <div className="flex gap-1">
                    <Button onClick={handleClickAdd}>add</Button>
                    <Button onClick={() => handleClickDelete("radio")}>radio delete</Button>
                    <Button onClick={() => handleClickDelete("checkbox")}>checked delete</Button>
                </div>
            </div>

            <div className="w-full mb-2 border overflow-x-auto bg-uf-border max-h-[1000px]">
                {/* head */}
                <div className="flex w-full gap-[1px] border-b border-l border-l-uf-card-background sticky top-0 bg-uf-border z-10">
                    {/* checkbox */}
                    {_options.checkbox && (
                        <div className="flex items-center justify-center min-w-[2rem] bg-uf-card-background">
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
                    {_options.radio && (
                        <div className="flex items-center justify-center min-w-[2rem] bg-uf-card-background" />
                    )}
                    {/* index */}
                    <div className="flex items-center justify-center min-w-[2rem] bg-uf-card-background" />

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
                                                        className="cell bg-uf-card-header flex-1"
                                                        style={{ minWidth: bProps.width, maxWidth: bProps.width }}
                                                    >
                                                        {render?.head?.[bProps.binding]?.() ||
                                                            bProps.binding ||
                                                            t(bProps.header)}
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

                {/* body */}
                <div className="flex flex-col w-full gap-[1px]">
                    {_test.map((rowProps: any, rowIndex: any) => {
                        const rowKey = _grid.current._key + "." + rowIndex;
                        const rowType = rowProps.__type;
                        const contentKey = rowProps.__key;

                        return (
                            /** row */
                            <div
                                key={rowKey}
                                className={classNames(
                                    "flex w-full gap-[1px] border-l",
                                    rowType === "added"
                                        ? "border-l-uf-success"
                                        : rowType === "updated"
                                          ? "border-l-uf-warning"
                                          : "border-l-uf-card-background",
                                )}
                            >
                                {_options.checkbox && (
                                    <div className="flex items-center justify-center bg-uf-card-header min-w-[2rem]">
                                        <input
                                            type="checkbox"
                                            checked={_checked.some(({ __key }) => __key === contentKey)}
                                            onChange={(e) => handleCheck(e, rowProps)}
                                        />
                                    </div>
                                )}
                                {_options.radio && (
                                    <div className="flex items-center justify-center bg-uf-card-header min-w-[2rem]">
                                        <input
                                            type="radio"
                                            checked={_selectedRow?.__key === rowProps.__key}
                                            onChange={(e) => handleSelect(e, rowProps)}
                                        />
                                    </div>
                                )}
                                <div className="flex items-center justify-center bg-uf-card-header min-w-[2rem] font-semibold">
                                    {_page * _size + rowIndex + 1}
                                </div>
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

                                                            /** cel */
                                                            return (
                                                                <div
                                                                    key={bKey}
                                                                    className="cell flex-1 bg-uf-card-background border-uf-card-background border aria-selected:border-uf-info"
                                                                    style={{
                                                                        minWidth: bProps.width,
                                                                        maxWidth: bProps.width,
                                                                    }}
                                                                >
                                                                    {!bProps.edit &&
                                                                        (render?.cell?.[bProps.binding]?.() ||
                                                                            rowProps[bProps.binding])}
                                                                    {bProps.edit &&
                                                                        (render?.edit?.[bProps.binding]?.() || (
                                                                            <FormControl
                                                                                type={bProps.type}
                                                                                mask={bProps.mask}
                                                                                decimalScale={bProps.decimalScale}
                                                                                thousandSeparator={
                                                                                    bProps.thousandSeparator
                                                                                }
                                                                                // value={rowProps[bProps.binding]}
                                                                                // onValueChange={({ data }) => {
                                                                                //     handleUpdate(rowProps, {
                                                                                //         ...rowProps,
                                                                                //         [bProps.binding]: data,
                                                                                //     });
                                                                                // }}
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
                        );
                    })}
                </div>
            </div>

            <GridPagination
                setTotalCount={_setTotalCount}
                page={_page}
                size={_size}
                totalCount={_grid.current._pagination === "in" ? data.content.length : data.page.totalElements}
                onChangePage={handleChangePage}
                onChangeSize={handleChangeSize}
            />
        </div>
    );
};

const GridPagination = (props: any) => {
    const { page, size, onChangePage, onChangeSize, totalCount, setTotalCount } = props;

    const [_totalCount, _setTotalCount] = React.useState(totalCount);
    React.useEffect(() => {
        setTotalCount.current = _setTotalCount;
    }, []);

    return (
        <Pagination
            page={page}
            size={size}
            onChangePage={onChangePage}
            onChangeSize={onChangeSize}
            totalCount={_totalCount}
        />
    );
};
