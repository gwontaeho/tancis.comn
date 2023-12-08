import "@grapecity/wijmo.styles/wijmo.css";
import "./Wijmo.v2.css";

import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import lodash from "lodash";

import * as wjGrid from "@grapecity/wijmo.react.grid.multirow";
import { Selector } from "@grapecity/wijmo.grid.selector";
import { Pagination, Button, Icon, FormControl } from "@/com/components";
import { WijmoSchemaType, WijmoHeadType, WijmoBodyType } from "@/com/hooks";

// type WijmoOptionType = {
//     checkbox?: boolean;
//     pagination?: "in" | "out";
//     add?: boolean;
//     remove?: boolean;
//     isReadOnly?: boolean;
// };

type DataType = {
    page: number;
    size: number;
    totCnt: number;
    content: Record<string, any>[];
};

type wijmoProps = {
    data: DataType;
    gridRef: any;
    contentRef: any;
    schema: WijmoSchemaType;
    onSelect?: Function;
    size: number;
    page: number;
    setSize: React.Dispatch<React.SetStateAction<number>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const Wijmo = (props: wijmoProps) => {
    const { gridRef, contentRef, schema, data, size, page, setSize, setPage } = props;

    const [totalCount, setTotalCount] = useState<number>();
    const [_page, _setPage] = useState<number>(0);
    const [_size, _setSize] = useState<number>(10);

    useEffect(() => {
        // console.log("init start");
        // 1. initialize
        if (schema.options?.isReadOnly) gridRef.current.control.isReadOnly = true;
        if (schema.options?.checkbox) new Selector(gridRef.current.control);
        gridRef.current.control.headerLayoutDefinition = headerLayoutDefinition(schema.head);
        // gridRef.current.control.layoutDefinition = layoutDefinition(schema.body);
        gridRef.current.control.selectionMode = "Row";
        gridRef.current.control.formatItem.addHandler(handleFormatItem);
        gridRef.current.control.itemsSourceChanged.addHandler(handleItemsSourceChanged);
        // console.log("init end");
    }, []);

    useEffect(() => {
        // console.log("data set start");
        // 2. data setting
        const content = data.content.map((_, i) => ({ ..._, __type: "origin", __index: uuid() }));
        contentRef.current = lodash.cloneDeep(content);
        gridRef.current.control.itemsSource = lodash.cloneDeep(content);
        setTotalCount(schema.options?.pagination === "in" ? content.length : data.totCnt);
        // console.log("data set end");
    }, [data]);

    useEffect(() => {
        // console.log("paging start");
        // paging - in
        if (!gridRef.current.control.collectionView) return;
        if (schema.options?.pagination !== "in") return;
        gridRef.current.control.collectionView.moveToPage(_page);
    }, [_page]);

    useEffect(() => {
        // console.log("sizing start");
        // sizing - in
        if (!gridRef.current.control?.collectionView) return;
        if (schema.options?.pagination !== "in") return;
        gridRef.current.control.collectionView.pageSize = _size;
    }, [_size]);

    const handleFormatItem = (m: any, e: any) => {
        if (m.cells !== e.panel) return;
        const cellType = e.getRow().dataItem["__type"];
        if (cellType === "added") return e.cell.classList.add("cell-added");
        const cellBinding = e.getColumn().binding;
        const cellValue = e.getRow().dataItem[cellBinding];
        const cellIndex = e.getRow().dataItem["__index"];
        const originValue = contentRef.current?.find((origin: any) => origin.__index === cellIndex)[cellBinding];
        if (cellValue !== originValue) return e.cell.classList.add("cell-changed");
    };

    const handleItemsSourceChanged = (c: any) => {
        if (schema.options?.pagination !== "in") return;
        if (!c.collectionView) return;
        c.collectionView.collectionChanged.addHandler((cv: any) => {
            setTotalCount(cv.totalItemCount);
        });
    };

    const handleChangePage = (nextPage: number) => {
        if (schema.options?.pagination === "in") _setPage(nextPage);
        if (schema.options?.pagination !== "in") setPage(nextPage);
    };

    const handleChangeSize = (nextSize: number) => {
        if (schema.options?.pagination === "in") {
            _setSize(nextSize);
            _setPage(0);
        }
        if (schema.options?.pagination !== "in") {
            setSize(nextSize);
            setPage(0);
        }
    };

    const handleAdd = () => {
        const item = { __index: uuid(), __type: "added" };
        gridRef.current.control.collectionView.addNew(item);
    };

    const handleRemove = () => {
        const checked = gridRef.current.control.rows
            .filter((r: any) => r.isSelected)
            .map((r: any) => r.dataIndex)
            .sort((a: number, b: number) => b - a);
        checked.forEach((index: number) => {
            gridRef.current.control.collectionView.removeAt(index);
        });
    };

    const headerLayoutDefinition = (head: WijmoHeadType) => {
        return head;
    };

    const layoutDefinition = (body: WijmoBodyType) => {
        return body;
    };

    return (
        <div className="space-y-4">
            {(schema.options?.add || schema.options?.remove) && (
                <div className="flex space-x-2 justify-end">
                    {!schema.options?.isReadOnly && schema.options?.add && (
                        <Button onClick={handleAdd}>
                            <Icon icon="plus" size="xs" />
                        </Button>
                    )}
                    {schema.options?.remove && (
                        <Button onClick={handleRemove}>
                            <Icon icon="minus" size="xs" />
                        </Button>
                    )}
                </div>
            )}

            <wjGrid.MultiRow ref={gridRef}>
                {schema.body.map((props) => {
                    const { colspan, cells } = props;
                    return (
                        <wjGrid.MultiRowCellGroup colspan={colspan}>
                            {cells.map((cellProps) => {
                                return (
                                    <wjGrid.MultiRowCell colspan={cellProps.colspan} binding={cellProps.binding}>
                                        <wjGrid.MultiRowCellTemplate
                                            cellType="Cell"
                                            template={(r: any) => {
                                                return <div>{r.item[cellProps.binding]}</div>;
                                            }}
                                        />
                                        <wjGrid.MultiRowCellTemplate
                                            cellType="CellEdit"
                                            template={(r: any) => {
                                                console.log(r);
                                                return (
                                                    <FormControl
                                                        defaultValue={r.value}
                                                        onChange={(e) => (r.value = e.target.value)}
                                                    />
                                                );
                                            }}
                                        />
                                    </wjGrid.MultiRowCell>
                                );
                            })}
                        </wjGrid.MultiRowCellGroup>
                    );
                })}
            </wjGrid.MultiRow>

            {schema.options?.pagination && (
                <Pagination
                    page={schema.options?.pagination === "in" ? _page : page}
                    size={schema.options?.pagination === "in" ? _size : size}
                    onChangePage={handleChangePage}
                    onChangeSize={handleChangeSize}
                    totalCount={totalCount}
                />
            )}
        </div>
    );
};
