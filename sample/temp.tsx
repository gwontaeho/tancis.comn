import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import classNames from "classnames";
import lodash from "lodash";
import { Page, Button, Group, Layout, Pagination, FormControl, IconButton } from "../components";

import { utils } from "../utils";

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
    options: { checkbox: true, pagination: "out", add: true, remove: true },
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
            cells: [{ binding: "a", colspan: 2 }, { binding: "c" }, { binding: "d" }],
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
    } = props;

    const keyBase = useRef(uuid()).current;

    const [_head, _setHead] = useState(() =>
        head.map((_: any) => ({ ..._, __key: uuid(), cells: _.cells.map((__: any) => ({ ...__, __key: uuid() })) })),
    );
    const [_body, _setBody] = useState(() =>
        body.map((_: any) => ({ ..._, __key: uuid(), cells: _.cells.map((__: any) => ({ ...__, __key: uuid() })) })),
    );

    const [_content, _setContent] = useState(() => {
        const _ = data.content.map((_: any) => ({ ..._, __key: uuid(), __type: "origin" }));
        originRef.current = _;
        contentRef.current = _;
        return _;
    });
    const [_page, _setPage] = useState(page);
    const [_size, _setSize] = useState(size);
    const [_totalElements, _setTotalElements] = useState(_content.length || 0);

    const [_selected, _setSelected] = useState<string>();
    const [_editing, _setEditing] = useState<string>();
    const [_checked, _setChecked] = useState<any[]>([]);

    useEffect(() => {}, [_editing]);

    useEffect(() => {
        _setTotalElements(_content.length);
    }, [_content]);

    const handleClickAdd = () => {
        _setContent((prev: any) => {
            const next = [...prev, { __key: uuid(), __type: "added" }];
            contentRef.current = next;
            return next;
        });
    };

    console.log(_checked);

    const cs = lodash.chunk(_content, _size);
    return (
        <div className="[&_.cell]:justify-center [&_.cell]:min-h-[2.5rem] [&_.cell]:flex [&_.cell]:items-center [&_.cell]:px-1">
            <div>
                <button onClick={handleClickAdd}>add</button>
            </div>
            <div className="w-full mb-8 border">
                {/* head */}
                <div className="flex w-full gap-[1px] bg-uf-border border-b border-l border-l-uf-card-background">
                    <div className="flex items-center justify-center p-2 bg-uf-card-background">
                        <input type="checkbox" />
                    </div>
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
                    {cs[_page].map((row: any, rowIndex) => {
                        const contentRowKey = row.__key;
                        const rowKey = keyBase + "." + rowIndex;

                        return (
                            /** row */
                            <div
                                key={rowKey}
                                className={classNames(
                                    "flex gap-[1px] border-l",
                                    row.__type === "added" ? "border-l-uf-success" : "border-l-uf-card-background",
                                )}
                            >
                                <div className="flex items-center justify-center bg-uf-card-background p-2">
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
                                {_body.map(({ key, cells }: any, colIndex: any) => {
                                    const colKey = keyBase + "." + rowIndex + "." + colIndex;
                                    return (
                                        /** col */
                                        <div key={colKey} className="flex-1 grid gap-[1px]">
                                            {cells.map(
                                                ({ key, id, header, binding, colspan = 1 }: any, cellIndex: any) => {
                                                    const celKey =
                                                        keyBase + "." + rowIndex + "." + colIndex + "." + cellIndex;

                                                    const rowCelKey = contentRowKey + "." + celKey;
                                                    return (
                                                        <div
                                                            key={celKey}
                                                            className={classNames(
                                                                "cell bg-uf-card-background border",
                                                                SIZES[colspan],
                                                                _selected === rowCelKey
                                                                    ? "border-uf-info"
                                                                    : originRef.current?.find(
                                                                            ({ __key }: any) => __key === row.__key,
                                                                        )?.[binding] !== row[binding]
                                                                      ? "border-uf-warning"
                                                                      : "border-uf-card-background",
                                                            )}
                                                            onClick={(e) => {
                                                                if (_selected === rowCelKey) {
                                                                    // e.currentTarget.getElementsByTagName(
                                                                    //     "p",
                                                                    // )[0].innerText = "";
                                                                    _setEditing(rowCelKey);
                                                                    return;
                                                                }
                                                                _setSelected(rowCelKey);
                                                                _setEditing("");
                                                            }}
                                                        >
                                                            {_editing !== rowCelKey && <p>{row[binding]}</p>}
                                                            {_selected === rowCelKey && _editing === rowCelKey && (
                                                                <GridControl
                                                                    row={row}
                                                                    binding={binding}
                                                                    contentRef={contentRef}
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
                onChangePage={(next) => _setPage(next)}
                onChangeSize={(next) => _setSize(next)}
                totalCount={_totalElements}
            />
            <button
                onClick={() => {
                    console.log(_content);
                    console.log(originRef.current);
                    console.log(contentRef.current);
                }}
            >
                qwd
            </button>
        </div>
    );
};

const GridControl = (props: any) => {
    const { row, binding, contentRef, setContent } = props;

    const ref = useRef<any>();
    const value = useRef(row[binding]);

    useEffect(() => {
        if (!ref.current) return;
        ref.current.focus();

        return () => {
            setContent((prev: any) => {
                const next = prev.map((_: any) => {
                    if (_.__key !== row.__key) return _;
                    return { ..._, [binding]: value.current };
                });
                contentRef.current = next;
                return next;
            });
        };
    }, []);

    const handleChange = (e: any) => {
        value.current = e.target.value;
    };

    return <FormControl ref={ref} defaultValue={row[binding]} onChange={handleChange} />;
};

const useGrid = (props: any) => {
    const [_schema, _setSchema] = useState(props.defaultSchema);
    const [_page, _setPage] = useState(0);
    const [_size, _setSize] = useState(10);

    const _originRef = useRef();
    const _contentRef = useRef();

    return {
        schema: {
            ..._schema,
            page: _page,
            size: _size,
            setPage: _setPage,
            setSize: _setSize,
            originRef: _originRef,
            contentRef: _contentRef,
        },
        page: _page,
        size: _size,
    };
};

export const Temp = () => {
    const { schema } = useGrid({ defaultSchema: schema1 });
    const data = utils.getMockData({ totalElements: 96 });

    return (
        <Page>
            <Group>
                <Group.Body>
                    <Group.Section>
                        <Grid {...schema} data={data} />
                    </Group.Section>
                </Group.Body>
            </Group>
        </Page>
    );
};
