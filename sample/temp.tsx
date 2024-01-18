import React, { useEffect, useRef, useState, memo, cloneElement } from "react";
import { v4 as uuid } from "uuid";
import classNames from "classnames";
import lodash from "lodash";
import { useStore, useTheme } from "@/comn/hooks";
import dayjs from "dayjs";
import constants from "@/comn/constants";
import { comnUtils, utils } from "@/comn/utils";
import { Page, Group, Pagination, FormControl, Icon, Layout, Button } from "@/comn/components";
import { InputText } from "../components/_";

const COLS: any = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    7: "grid-cols-7",
    8: "grid-cols-8",
    9: "grid-cols-9",
    10: "grid-cols-10",
    11: "grid-cols-11",
};

const SPANS: any = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
    7: "col-span-7",
    8: "col-span-8",
    9: "col-span-9",
    10: "col-span-10",
    11: "col-span-11",
    12: "col-span-12",
};

const schema1 = {
    id: "grid2",
    options: { checkbox: true, pagination: "in", add: true, remove: true, group: "q", edit: true },
    head: [
        {
            width: "*",
            cells: [{ id: "q", colspan: 2, required: true }, { id: "d", header: "adad" }, { id: "ab" }],
        },
        { width: 100, cells: [{ id: "b" }] },
        {
            width: 300,
            cells: [{ id: "c", colspan: 2 }, { id: "c", width: 200 }, { id: "c" }],
        },
        // { width: 300, cells: [{ id: "e" }] },
        // { width: 300, cells: [{ id: "f" }] },
        // { cells: [{ id: "g" }] },
    ],
    body: [
        {
            cells: [{ binding: "q", required: true }],
        },
        {
            cells: [{ binding: "q", edit: false }],
        },
        {
            cells: [{ binding: "a", colspan: 2, link: () => {} }, { binding: "c", type: "text" }, { binding: "d" }],
        },
        // {
        //     cells: [{ id: "test", binding: "e", edit: false }],
        // },
        // {
        //     cells: [{ binding: "f", type: "date" }],
        // },
        // {
        //     cells: [{ binding: "g" }],
        // },
    ],
};

type TData = {
    content: Record<string, any>;
    page: {
        number: number;
        size: number;
        totalElements: number;
        totalPages: number;
    };
};

const Grid = (props: any) => {
    const {
        id, // grid id
        head,
        body,
        options,
        page,
        size,
        setPage,
        setSize,
        data,
        refs,

        render,
    } = props;
    const { mRef, originRef, contentRef, selectedRef, checkedRef, pagedRef, paginationRef } = refs;
    const { pagination, group, edit = false } = options;

    const { theme } = useTheme();
    const _keyBase = useRef(uuid()).current;
    const _selectedCelRef = useRef<any>();
    const _setTotalCount = useRef<any>();

    /**
     * head
     */
    const [_head, _setHead] = useState(() => {
        return head.map((_: any) => {
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
    const [_body, _setBody] = useState(() => {
        return body.map((_: any, index: any) => {
            const maxCols = Math.max(..._.cells.flatMap((cell: any) => cell.colspan || 1));
            return {
                ..._,
                __key: uuid(),
                flex: _head[index]?.flex,
                width: _head[index]?.width,
                minWidth: _head[index]?.minWidth,
                cells: _.cells
                    .map((__: any) => ({
                        ...__,
                        __key: uuid(),
                        /** edit priority -> cell, option */
                        edit: typeof __.edit === "boolean" ? __.edit : edit,
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

    const [_content, _setContent] = useState<any[]>(() => {
        const _ = data.content.map((_: any) => {
            return { ..._, __key: uuid(), __type: "origin" };
        });
        originRef.current = _;
        contentRef.current = _;
        return _;
    });
    const [_page, _setPage] = useState<number>(page);
    const [_size, _setSize] = useState<number>(size);
    const [_selectedRow, _setSelectedRow] = useState<Record<string, any> | null>(null);
    const [_editing, _setEditing] = useState<string>();
    const [_checked, _setChecked] = useState<any[]>([]);
    const [_sortBy, _setSortBy] = useState<any | null>([null, null]);

    /** initialize content */
    const [_test, _setTest] = useState<any[]>(() => {
        /** origin content */
        const _ = data.content.map((_: any) => ({ ..._, __key: uuid(), __type: "origin" }));

        /** content refs */
        originRef.current = _;
        contentRef.current = _;

        /** sort */
        // const sortedContent =
        //     _sortBy[0] === null
        //         ? _content
        //         : _sortBy[1] === "asc"
        //           ? lodash.sortBy(_content, [_sortBy[0]])
        //           : lodash.sortBy(_content, [_sortBy[0]]).reverse();

        /** paged */
        const paged = pagination === "in" ? lodash.chunk(_, size)[page] : _;

        return paged;
    });

    // const _sort = (d: any, b: any) => {};

    /** set method */
    useEffect(() => {
        mRef.current.handleUpdate = handleUpdate;
        mRef.current.handleClickAdd = handleClickAdd;
        mRef.current.handleClickDelete = handleClickDelete;
    }, []);

    useEffect(() => {
        pagedRef.current = _test;
    }, [_test]);

    /** on content changed */
    useEffect(() => {
        _setTest(() => {
            /** origin content */
            const _ = data.content.map((_: any) => ({ ..._, __key: uuid(), __type: "origin" }));

            /** content refs */
            originRef.current = _;
            contentRef.current = _;

            /** paged */
            const paged = pagination === "in" ? lodash.chunk(_, size)[page] : _;

            return paged || [];
        });
    }, [data.content]);

    /** on paging, on sizing */
    useEffect(() => {
        const _ = contentRef.current.filter(({ __type }: any) => __type !== "deleted");
        const paged = pagination === "in" ? lodash.chunk(_, _size)[_page] : _;
        paginationRef.current.page = _page;
        paginationRef.current.size = _size;
        _setTest(paged || []);
        _setChecked([]);
        _setSelectedRow(null);
    }, [_page, _size]);

    /** on select row (radio) */
    useEffect(() => {
        selectedRef.current = _selectedRow;
    }, [_selectedRow]);

    /** on check row (checkbox) */
    useEffect(() => {
        checkedRef.current = _checked;
    }, [_checked]);

    /** handle update */
    const handleUpdate = (p: any, n: any) => {
        if (!p?.__key) return;

        contentRef.current = contentRef.current.map((_: any) => {
            if (_.__key !== p.__key) return _;
            const { __type, __key, ...rest } = n;
            return {
                ..._,
                ...rest,
                __type:
                    _.__type === "origin" || _.__type === "updated"
                        ? Object.keys(rest).every((k) => n[k] === originRef[k])
                            ? "origin"
                            : "updated"
                        : _.__type,
            };
        });

        if (pagedRef.current.find(({ __key }: any) => __key === p.__key)) {
            _setTest((prev) =>
                prev.map((_) => {
                    if (_.__key !== p.__key) return _;
                    const { __type, __key, ...rest } = n;
                    return {
                        ..._,
                        ...rest,
                        __type:
                            _.__type === "origin" || _.__type === "updated"
                                ? Object.keys(rest).every((k) => n[k] === originRef[k])
                                    ? "origin"
                                    : "updated"
                                : _.__type,
                    };
                }),
            );
        }
    };

    /** handle add */
    const handleClickAdd = () => {
        contentRef.current = [...contentRef.current, { __key: uuid(), __type: "added" }];
        const _ = contentRef.current.filter(({ __type }: any) => __type !== "deleted");
        const paged = pagination === "in" ? lodash.chunk(_, paginationRef.current.size)[paginationRef.current.page] : _;
        _setTotalCount.current?.(_.length);
        _setTest(paged || []);
    };

    /** handle delete */
    const handleClickDelete = (type: any) => {
        if (type === "radio") {
            if (!selectedRef.current) return;
            contentRef.current = contentRef.current
                .map((_: any) => {
                    if (_.__key === selectedRef.current.__key) {
                        if (_.__type === "added") return undefined;
                        return { ..._, __type: "deleted" };
                    } else {
                        return _;
                    }
                })
                .filter((_: any) => _ !== undefined);
            _setSelectedRow(null);

            const _ = contentRef.current.filter(({ __type }: any) => __type !== "deleted");
            const paged =
                pagination === "in" ? lodash.chunk(_, paginationRef.current.size)[paginationRef.current.page] : _;
            _setTotalCount.current?.(_.length);
            _setTest(paged || []);
            return;
        }
        if (type === "checkbox") {
            if (!checkedRef.current.length) return;
            contentRef.current = contentRef.current
                .map((_: any) => {
                    if (checkedRef.current.map((_: any) => _.__key).includes(_.__key)) {
                        if (_.__type === "added") return undefined;
                        return { ..._, __type: "deleted" };
                    } else {
                        return _;
                    }
                })
                .filter((_: any) => _ !== undefined);
            _setChecked([]);

            const _ = contentRef.current.filter(({ __type }: any) => __type !== "deleted");
            const paged =
                pagination === "in" ? lodash.chunk(_, paginationRef.current.size)[paginationRef.current.page] : _;
            _setTotalCount.current?.(_.length);
            _setTest(paged || []);
            return;
        }
    };

    console.log(_head);

    return (
        <div className="[&_.cell]:justify-center [&_.cell]:min-h-[2.5rem] [&_.cell]:flex [&_.cell]:items-center [&_.cell]:px-1">
            <div className="flex justify-between mb-2">
                <div className="flex gap-1">
                    <Button>import</Button>
                    <Button>export</Button>
                </div>

                <div className="flex gap-1">
                    <Button onClick={handleClickAdd}>add</Button>
                    <Button onClick={() => handleClickDelete("radio")}>delete</Button>
                    <Button onClick={() => handleClickDelete("checkbox")}>delete</Button>
                </div>
            </div>

            <div className="w-full mb-2 border overflow-x-auto bg-uf-border max-h-[1000px]">
                {/* head */}
                <div className="flex w-max gap-[1px] border-b border-l border-l-uf-card-background sticky top-0 bg-uf-border z-10">
                    {/* checkbox */}
                    <div className="flex items-center justify-center min-w-[2rem] bg-uf-card-background">
                        <input
                            type="checkbox"
                            checked={_test.every(({ __key }: any) => _checked.some((row: any) => row.__key === __key))}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    _setChecked(_test);
                                } else {
                                    _setChecked([]);
                                }
                            }}
                        />
                    </div>
                    {/* radio */}
                    <div className="flex items-center justify-center min-w-[2rem] bg-uf-card-background" />
                    {/* index */}
                    <div className="flex items-center justify-center min-w-[2rem] bg-uf-card-background" />
                    {/* header */}
                    {_head.map((colProps: any, colIndex: any) => {
                        const { width, minWidth, flex, cells } = colProps;
                        const colKey = "head." + _keyBase + "." + colIndex;

                        /** col */
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
                                                    <div key={bKey} className="cell bg-uf-card-header flex-1">
                                                        {bProps.id}
                                                        {bProps.required && (
                                                            <span className="text-uf-error ml-0.5">*</span>
                                                        )}
                                                        {/* {id === _sortBy[0] && (
                                                            <Icon
                                                                icon="up"
                                                                size="xs"
                                                                className={classNames(
                                                                    "absolute top-1/2 -translate-y-1/2 left-full translate-x-1",
                                                                    _sortBy[1] === "desc" && "rotate-180",
                                                                )}
                                                            />
                                                        )} */}
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
                        const rowKey = _keyBase + "." + rowIndex;
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
                                <div className="flex items-center justify-center bg-uf-card-header min-w-[2rem]">
                                    <input
                                        type="checkbox"
                                        checked={_checked.some(({ __key }) => __key === contentKey)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                _setChecked((prev) => [...prev, rowProps]);
                                            } else {
                                                _setChecked((prev) => prev.filter(({ __key }) => __key !== contentKey));
                                            }
                                        }}
                                    />
                                </div>
                                <div className="flex items-center justify-center bg-uf-card-header min-w-[2rem]">
                                    <input
                                        type="radio"
                                        checked={_selectedRow?.__key === rowProps.__key}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                _setSelectedRow(rowProps);
                                            } else {
                                                _setSelectedRow(null);
                                            }
                                        }}
                                    />
                                </div>
                                <div className="flex items-center justify-center bg-uf-card-header min-w-[2rem] font-semibold">
                                    {_page * _size + rowIndex + 1}
                                </div>
                                {_body.map((colProps: any, colIndex: any) => {
                                    const { cells, width, minWidth, flex } = colProps;
                                    const colKey = rowKey + "." + colIndex;
                                    console.log(colProps);
                                    return (
                                        /** col */
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
                                                                    style={{ maxWidth: bProps.width }}
                                                                >
                                                                    {bProps.edit ? (
                                                                        <FormControl
                                                                            value={rowProps[bProps.binding]}
                                                                            onChange={(arg: any) => {
                                                                                handleUpdate(rowProps, {
                                                                                    ...rowProps,
                                                                                    [bProps.binding]: arg.target
                                                                                        ? arg.target.value
                                                                                        : arg,
                                                                                });
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        rowProps[bProps.binding]
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                );
                                            })}

                                            {/* {cells.map(
                                                (
                                                    {
                                                        id,
                                                        __key,
                                                        type = "text",
                                                        binding,
                                                        colspan = 0,
                                                        link,
                                                        width,
                                                        edit,

                                                        min,
                                                        max,
                                                        minLength,
                                                        pattern,
                                                        validate,
                                                        required,
                                                        maxLength,
                                                        ...rest
                                                    }: any,
                                                    cellIndex: any,
                                                ) => {
                                                    const celKey =
                                                        _keyBase + "." + rowIndex + "." + colIndex + "." + cellIndex;
                                                    const cellData = row[binding];

                                                    const invalid = (() => {
                                                        switch (type) {
                                                            case "number": {
                                                                if (typeof min === "number") {
                                                                }
                                                                if (typeof max === "number") {
                                                                }
                                                                break;
                                                            }
                                                            case "text": {
                                                                if (typeof minLength === "number") {
                                                                }
                                                                if (typeof maxLength === "number") {
                                                                }
                                                                break;
                                                            }
                                                            default:
                                                        }
                                                        if (typeof required === "boolean") {
                                                            return !cellData;
                                                        }
                                                        if (pattern instanceof RegExp) {
                                                        }
                                                        if (validate) {
                                                        }
                                                        return null;
                                                    })();

                                                    return (
                                                        <div
                                                            key={celKey}
                                                            style={{ width }}
                                                            className={classNames(
                                                                "cell bg-uf-card-background border aria-selected:border-uf-info",
                                                                SPANS[colspan],
                                                                invalid
                                                                    ? "border-uf-error"
                                                                    : originRef.current?.find(
                                                                            ({ __key }: any) => __key === row.__key,
                                                                        )?.[binding] !== cellData
                                                                      ? "border-uf-warning"
                                                                      : "border-uf-card-background",
                                                            )}
                                                            onClick={(e) => {
                                                                if (_selectedCelRef.current) {
                                                                    _selectedCelRef.current.removeAttribute(
                                                                        "aria-selected",
                                                                    );
                                                                }
                                                                _selectedCelRef.current = e.currentTarget;
                                                                e.currentTarget.ariaSelected = "true";
                                                            }}
                                                        >
                                                            {!edit &&
                                                                (!!render[id] ? (
                                                                    render[id](row)
                                                                ) : (
                                                                    <p
                                                                        className={classNames(
                                                                            "select-none break-all",
                                                                            link &&
                                                                                "underline text-uf-blue cursor-pointer",
                                                                        )}
                                                                        onClick={() => link && link()}
                                                                    >
                                                                        {(() => {
                                                                            switch (type) {
                                                                                case "date": {
                                                                                    return dayjs(row[binding]).format(
                                                                                        constants.DATE_FORMAT_DAYJS[
                                                                                            theme.lang
                                                                                        ],
                                                                                    );
                                                                                }
                                                                                case "time": {
                                                                                    return dayjs(row[binding]).format(
                                                                                        constants.TIME_FORMAT_DAYJS[
                                                                                            theme.lang
                                                                                        ],
                                                                                    );
                                                                                }
                                                                                case "datetime": {
                                                                                    return dayjs(row[binding]).format(
                                                                                        constants.DATETIME_FORMAT_DAYJS[
                                                                                            theme.lang
                                                                                        ],
                                                                                    );
                                                                                }
                                                                                default:
                                                                                    return cellData;
                                                                            }
                                                                        })()}
                                                                    </p>
                                                                ))}
                                                            {edit && (
                                                                <FormControl
                                                                    {...rest}
                                                                    type={type}
                                                                    value={row[binding]}
                                                                    onChange={(arg: any) => {
                                                                        if (arg.target) {
                                                                            handleUpdate(row, {
                                                                                ...row,
                                                                                [binding]: arg.target.value,
                                                                            });
                                                                        } else {
                                                                            handleUpdate(row, {
                                                                                ...row,
                                                                                [binding]: arg,
                                                                            });
                                                                        }
                                                                    }}
                                                                />
                                                            )}
                                                        </div>
                                                    );
                                                },
                                            )} */}
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
                totalCount={pagination === "in" ? data.content.length : data.page.totalElements}
                onChangePage={(next: any) => {
                    _setPage(next);
                    if (pagination === "out") setPage(next);
                }}
                onChangeSize={(next: any) => {
                    _setSize(next);
                    _setPage(0);
                    if (pagination === "out") setSize(next);
                }}
            />
        </div>
    );
};

const GridPagination = (props: any) => {
    const { page, size, onChangePage, onChangeSize, totalCount, setTotalCount } = props;

    const [_totalCount, _setTotalCount] = useState(totalCount);
    useEffect(() => {
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

const useGrid = (props: any) => {
    const { defaultSchema } = props;

    /** id, options, head, body */
    const [_schema, _setSchema] = useState(defaultSchema);
    const [_page, _setPage] = useState(0);
    const [_size, _setSize] = useState(10);

    const _mRef = useRef<any>({});
    const _originRef = useRef([]);
    const _contentRef = useRef([]);
    const _checkedRef = useRef([]);
    const _selectedRef = useRef(null);
    const _pagedRef = useRef([]);
    const _paginationRef = useRef({ page: _page, size: _size });

    const addRow = () => {
        _mRef.current.handleClickAdd();
    };
    const deleteRow = (type: any) => {
        _mRef.current.handleClickDelete(type);
    };
    const getData = () => {
        return _contentRef.current;
    };
    const getOriginData = () => {
        return _originRef.current;
    };
    const getCheckedRows = () => {
        return _checkedRef.current;
    };
    const getSelectedRow = () => {
        return _selectedRef.current;
    };
    const setSchema = () => {};

    const updateRow = (p: any, n: any) => {
        return _mRef.current.handleUpdate(p, n);
    };

    const validate = () => {};

    return {
        schema: {
            ..._schema,
            page: _page,
            size: _size,
            setPage: _setPage,
            setSize: _setSize,
            refs: {
                mRef: _mRef,
                originRef: _originRef,
                contentRef: _contentRef,
                selectedRef: _selectedRef,
                checkedRef: _checkedRef,
                pagedRef: _pagedRef,
                paginationRef: _paginationRef,
            },
        },
        page: _page,
        size: _size,
        getData,
        getOriginData,
        getSelectedRow,
        getCheckedRows,
        addRow,
        deleteRow,
        updateRow,
        validate,
    };
};

const data = utils.getMockData({ totalElements: 8 });

export const Temp = () => {
    const { schema, getData, getOriginData, getSelectedRow, getCheckedRows, addRow, deleteRow, updateRow, page, size } =
        useGrid({
            defaultSchema: schema1,
        });
    const data2 = utils.getMockDataWithPaging({ data, page, size });

    const { pgeStore, setStore } = useStore({ pgeUid: "test" });
    const _test = {
        head: {},
        cell: {},
        edit: {},
        // test: (props: any) => {
        //     return (
        //         <Layout>
        //             <FormControl
        //                 type="select"
        //                 onChange={(e) => {
        //                     console.log(e);
        //                     updateRow(props, { q: e.target.value });
        //                     // setStore("test", { test: true });
        //                 }}
        //                 options={[{ label: "a", value: "b" }]}
        //             />
        //             <FormControl
        //                 type="text"
        //                 edit={props.q === "b"}
        //                 value={props.g}
        //                 onChange={(e) => {
        //                     console.log(e);
        //                     updateRow(props, { g: e.target.value });
        //                     // setStore("test", { test: true });
        //                 }}
        //             />
        //             <button>asd</button>
        //         </Layout>
        //     );
        // },
    };

    return (
        <Page>
            <Group>
                <Group.Body>
                    <Group.Section>
                        <Grid {...schema} data={data} render={_test} />
                    </Group.Section>
                </Group.Body>
            </Group>
            <button onClick={() => console.log(getData())}>get Data</button>
            <button onClick={() => console.log(getOriginData())}>get getOriginData</button>
            <button onClick={() => console.log(getSelectedRow())}>get radio</button>
            <button onClick={() => console.log(getCheckedRows())}>get checkbox</button>
            <button onClick={() => addRow()}>add row</button>
            <button onClick={() => deleteRow("radio")}>delete radio</button>
            <button onClick={() => deleteRow("checkbox")}>delete checkbox</button>
            <button onClick={() => updateRow(getSelectedRow(), { q: "asd" })}>ffffffffffff</button>
        </Page>
    );
};
