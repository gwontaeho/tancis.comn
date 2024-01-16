import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import classNames from "classnames";
import lodash from "lodash";
import { useTheme } from "@/comn/hooks";
import dayjs from "dayjs";
import constants from "@/comn/constants";
import { utils } from "@/comn/utils";
import { Page, Group, Pagination, FormControl } from "../components";

const SIZES: any = {
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
    options: { checkbox: true, pagination: "in", add: true, remove: true },
    head: [
        { cells: [{ id: "a", header: "asd", colspan: 2 }, { id: "aa" }, { id: "ab" }] },
        { cells: [{ id: "b", header: "asdas" }] },
        { cells: [{ id: "c" }] },
    ],
    body: [
        {
            cells: [{ binding: "id" }],
        },
        {
            cells: [
                { binding: "a", colspan: 2 },
                { binding: "c", type: "date" },
                { binding: "d", type: "number", thousandSeparator: true },
            ],
        },
        {
            cells: [{ binding: "b" }],
        },
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
        id, //
        head,
        body,
        options,
        page,
        size,
        setPage,
        setSize,
        data,
        originRef,
        contentRef,
        selectedRef,
        checkedRef,
    } = props;

    const { theme } = useTheme();

    const { pagination } = options;
    const keyBase = useRef(uuid()).current;

    const [_head, _setHead] = useState(() =>
        head.map((_: any) => ({ ..._, __key: uuid(), cells: _.cells.map((__: any) => ({ ...__, __key: uuid() })) })),
    );
    const [_body, _setBody] = useState(() =>
        body.map((_: any) => ({ ..._, __key: uuid(), cells: _.cells.map((__: any) => ({ ...__, __key: uuid() })) })),
    );

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

    const [_selectedCel, _setSelectedCel] = useState<string>();
    const [_selectedRow, _setSelectedRow] = useState<Record<string, any> | null>(null);
    const [_editing, _setEditing] = useState<string>();
    const [_checked, _setChecked] = useState<any[]>([]);

    useEffect(() => {
        _setContent(() => {
            const _ = data.content.map((_: any) => ({ ..._, __key: uuid(), __type: "origin" }));
            originRef.current = _;
            contentRef.current = _;
            return _;
        });
    }, [data.content]);

    useEffect(() => {
        selectedRef.current = _selectedRow;
    }, [_selectedRow]);

    useEffect(() => {
        checkedRef.current = _checked;
    }, [_checked]);

    useEffect(() => {
        _setSelectedRow(null);
        _setChecked([]);
    }, [_page]);

    const handleUpdate = (p: any, n: any) => {
        _setContent((prev: any) => {
            const next = prev.map((_: any) => {
                if (_.__key !== p.__key) return _;

                const origin = originRef.current.find(({ __key }: any) => __key === p.__key);
                const { __type, __key, ...rest } = n;
                let t = __type;

                if (__type === "origin" || __type === "updated") {
                    t = Object.keys(rest).every((k) => n[k] === origin[k]) ? "origin" : "updated";
                }

                return { ...n, __type: t };
            });

            contentRef.current = next;
            return next;
        });
    };

    const handleClickAdd = () => {
        _setContent((prev: any) => {
            const next = [...prev, { __key: uuid(), __type: "added" }];
            contentRef.current = next;
            return next;
        });
    };

    const handleClickDelete = (type: any) => {
        if (type === "radio") {
            if (!_selectedRow) return;
            _setContent((prev: any) => {
                return prev.filter(({ __key }: any) => __key !== _selectedRow.__key);
            });
            _setSelectedRow(null);
            contentRef.current = contentRef.current
                .map((_: any) => {
                    if (_.__key === _selectedRow.__key) {
                        if (_.__type === "added") return undefined;
                        return { ..._, __type: "deleted" };
                    } else {
                        return _;
                    }
                })
                .filter((_: any) => _ !== undefined);
        }
        if (type === "checkbox") {
            if (!_checked.length) return;
            _setContent((prev: any) =>
                prev.filter(({ __key }: any) => {
                    return !_checked.map((_) => _.__key).includes(__key);
                }),
            );
            _setChecked([]);
            contentRef.current = contentRef.current
                .map((_: any) => {
                    if (_checked.map((_) => _.__key).includes(_.__key)) {
                        if (_.__type === "added") return undefined;
                        return { ..._, __type: "deleted" };
                    } else {
                        return _;
                    }
                })
                .filter((_: any) => _ !== undefined);
        }
    };

    const pageContent = (pagination === "in" ? lodash.chunk(_content, _size)[_page] : _content) || [];
    return (
        <div className="[&_.cell]:justify-center [&_.cell]:min-h-[2.5rem] [&_.cell]:flex [&_.cell]:items-center [&_.cell]:px-1">
            <div>
                <button onClick={handleClickAdd}>add</button>
            </div>
            <div>
                <button onClick={() => handleClickDelete("radio")}>delete ra</button>
                <button onClick={() => handleClickDelete("checkbox")}>delete</button>
            </div>
            <div className="w-full mb-8 border">
                {/* head */}
                <div className="flex w-full gap-[1px] bg-uf-border border-b border-l border-l-uf-card-background">
                    <div className="flex items-center justify-center w-8 bg-uf-card-background">
                        <input
                            type="checkbox"
                            checked={pageContent.every(({ __key }: any) =>
                                _checked.some((row: any) => row.__key === __key),
                            )}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    _setChecked(pageContent);
                                } else {
                                    _setChecked([]);
                                }
                            }}
                        />
                    </div>
                    <div className="flex items-center justify-center w-8 bg-uf-card-background" />
                    {_head.map(({ __key, cells }: any) => {
                        return (
                            <div key={__key} className="flex-1 grid gap-[1px]">
                                {cells.map(({ __key, id, header, colspan = 1 }: any) => {
                                    return (
                                        <div
                                            key={__key}
                                            className={classNames("cell bg-uf-card-header", SIZES[colspan])}
                                        >
                                            {header || id}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
                {/* body */}
                <div className="flex flex-col w-full gap-[1px] bg-uf-border">
                    {pageContent.map((row: any, rowIndex: any) => {
                        const contentRowKey = row.__key;
                        const rowKey = keyBase + "." + rowIndex;

                        return (
                            /** row */
                            <div
                                key={rowKey}
                                className={classNames(
                                    "flex gap-[1px] border-l",
                                    row.__type === "added"
                                        ? "border-l-uf-success"
                                        : row.__type === "updated"
                                          ? "border-l-uf-warning"
                                          : "border-l-uf-card-background",
                                )}
                            >
                                <div className="flex items-center justify-center bg-uf-card-background w-8">
                                    <input
                                        type="checkbox"
                                        checked={_checked.some(({ __key }) => __key === contentRowKey)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                _setChecked((prev) => [...prev, row]);
                                            } else {
                                                _setChecked((prev) =>
                                                    prev.filter(({ __key }) => __key !== contentRowKey),
                                                );
                                            }
                                        }}
                                    />
                                </div>
                                <div className="flex items-center justify-center bg-uf-card-background w-8">
                                    <input
                                        type="radio"
                                        checked={_selectedRow?.__key === row.__key}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                _setSelectedRow(row);
                                            } else {
                                                _setSelectedRow(null);
                                            }
                                        }}
                                    />
                                </div>
                                {_body.map(({ cells }: any, colIndex: any) => {
                                    const colKey = keyBase + "." + rowIndex + "." + colIndex;
                                    return (
                                        /** col */
                                        <div key={colKey} className="flex-1 grid gap-[1px]">
                                            {cells.map(
                                                (
                                                    { __key, type, binding, colspan = 1, ...rest }: any,
                                                    cellIndex: any,
                                                ) => {
                                                    const celKey =
                                                        keyBase + "." + rowIndex + "." + colIndex + "." + cellIndex;
                                                    const contentCelKey = contentRowKey + "." + __key;

                                                    return (
                                                        <div
                                                            key={celKey}
                                                            className={classNames(
                                                                "cell bg-uf-card-background border",
                                                                SIZES[colspan],
                                                                _selectedCel === contentCelKey
                                                                    ? "border-uf-info"
                                                                    : originRef.current?.find(
                                                                            ({ __key }: any) => __key === row.__key,
                                                                        )?.[binding] !== row[binding]
                                                                      ? "border-uf-warning"
                                                                      : "border-uf-card-background",
                                                            )}
                                                            onClick={() => {
                                                                if (_selectedCel === contentCelKey) {
                                                                    _setEditing(contentCelKey);
                                                                    return;
                                                                }
                                                                _setSelectedCel(contentCelKey);
                                                                _setEditing("");
                                                            }}
                                                        >
                                                            {_editing !== contentCelKey && (
                                                                <p className="select-none">
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
                                                                        }

                                                                        return row[binding];
                                                                        // return row[binding];
                                                                    })()}
                                                                </p>
                                                            )}
                                                            {_selectedCel === contentCelKey &&
                                                                _editing === contentCelKey && (
                                                                    <CellControl
                                                                        {...rest}
                                                                        row={row}
                                                                        type={type}
                                                                        binding={binding}
                                                                        originRef={originRef}
                                                                        contentRef={contentRef}
                                                                        handleUpdate={handleUpdate}
                                                                        setContent={_setContent}
                                                                    />
                                                                )}
                                                        </div>
                                                    );
                                                },
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
            <Pagination
                page={_page}
                size={_size}
                onChangePage={(next) => {
                    _setPage(next);
                    if (pagination === "out") setPage(next);
                }}
                onChangeSize={(next) => {
                    _setSize(next);
                    _setPage(0);
                    if (pagination === "out") setSize(next);
                }}
                totalCount={pagination === "in" ? _content.length : data.page.totalElements}
            />
        </div>
    );
};

const CellControl = (props: any) => {
    const { type, row, binding, handleUpdate, ...rest } = props;
    console.log(rest);

    const ref = useRef<any>();
    const value = useRef(row[binding]);

    useEffect(() => {
        if (!ref.current) return;
        ref.current.focus();

        return () => {};
    }, []);

    const handleChange = (e: any) => {
        if (e.target) {
            value.current = e.target.value;
        } else {
            value.current = e;
        }
    };

    const handleBlur = () => {
        handleUpdate(row, { ...row, [binding]: value.current });
    };

    return (
        <FormControl ref={ref} type={type} defaultValue={row[binding]} onChange={handleChange} onBlur={handleBlur} />
    );
};

const useGrid = (props: any) => {
    /**
     * type
     * added | origin | deleted | updated
     *
     *
     */

    const [_schema, _setSchema] = useState(props.defaultSchema);
    const [_page, _setPage] = useState(0);
    const [_size, _setSize] = useState(10);

    const _originRef = useRef([]);
    const _contentRef = useRef([]);
    const _checkedRef = useRef([]);
    const _selectedRef = useRef(null);

    const getData = () => {
        return _contentRef.current;
    };
    const getPageData = () => {};
    const getOriginData = () => {
        return _originRef.current;
    };
    const getCheckedRows = () => {
        return _checkedRef.current;
    };
    const getSelectedRow = () => {
        return _selectedRef.current;
    };
    const getSelectedCell = () => {};

    return {
        schema: {
            ..._schema,
            page: _page,
            size: _size,
            setPage: _setPage,
            setSize: _setSize,
            originRef: _originRef,
            contentRef: _contentRef,
            selectedRef: _selectedRef,
            checkedRef: _checkedRef,
        },
        page: _page,
        size: _size,
        getData,
        getOriginData,
        getSelectedRow,
        getCheckedRows,
    };
};

const data = utils.getMockData({ totalElements: 9999 });

export const Temp = () => {
    const { schema, getData, getOriginData, getSelectedRow, getCheckedRows, page, size } = useGrid({
        defaultSchema: schema1,
    });
    const data2 = utils.getMockDataWithPaging({ data, page, size });

    return (
        <Page>
            <Group>
                <Group.Body>
                    <Group.Section>
                        <Grid {...schema} data={data} />
                    </Group.Section>
                </Group.Body>
            </Group>
            <button onClick={() => console.log(getData())}>get Data</button>
            <button onClick={() => console.log(getOriginData())}>get getOriginData</button>
            <button onClick={() => console.log(getSelectedRow())}>get radio</button>
            <button onClick={() => console.log(getCheckedRows())}>get checkbox</button>
        </Page>
    );
};
