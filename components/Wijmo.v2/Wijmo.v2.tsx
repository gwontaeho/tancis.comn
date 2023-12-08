import "@grapecity/wijmo.styles/wijmo.css";
import "./Wijmo.v2.css";

import _ from "lodash";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { Pagination, Icon } from "@/com/components";
import * as wjGrid from "@grapecity/wijmo.react.grid.multirow";
import { Selector } from "@grapecity/wijmo.grid.selector";
import { InputDate, InputTime, InputDateTime, InputNumber, InputMask, ComboBox } from "@grapecity/wijmo.input";
import { CellMaker } from "@grapecity/wijmo.grid.cellmaker";
import { Button } from "@/com/components";

const defaultSchema = {
    options: {},
};

const defaultData = {
    page: 0,
    size: 0,
    totCnt: 0,
    content: [],
};

type dataType = {
    page: number;
    size: number;
    totCnt: number;
    content: object[];
};

type wijmoProps = {
    gridRef: any;
    contentRef: any;
    schema: any;
    data: dataType;
    size: number;
    page: number;
    setSize: React.Dispatch<React.SetStateAction<number>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    addRow: any;
    removeChecked: any;
    onSelect?: Function;
};

type wijmoBodyCellProps = {
    type: string;
    mask: string;
    options: object[];
    link: boolean;
};

export const Wijmo = (props: wijmoProps) => {
    const {
        gridRef,
        contentRef,
        schema = defaultSchema,
        data = defaultData,
        size,
        page,
        setSize,
        setPage,
        addRow,
        removeChecked,
        onSelect,
    } = props;
    const navigate = useNavigate();

    const [initialize, setInitialize] = useState(false);
    const [totalCount, setTotalCount] = useState<number>();

    useEffect(() => {
        // 1. initialize
        if (schema.options.checkbox) new Selector(gridRef.current.control);
        if (schema.options.isReadOnly) gridRef.current.control.isReadOnly = true;
        gridRef.current.control.selectionMode = "Row";
        gridRef.current.control.allowAddNew = true;
        gridRef.current.control.allowDelete = true;
        gridRef.current.control.headerLayoutDefinition = headerLayoutDefinition(schema.head);
        gridRef.current.control.layoutDefinition = layoutDefinition(schema.body);
        gridRef.current.control.rowAdded.addHandler(handleRowAdded);
        gridRef.current.control.deletedRow.addHandler(handleDeletedRow);
        gridRef.current.control.formatItem.addHandler(handleFormatItem);
        gridRef.current.control.itemsSourceChanged.addHandler(handleItemsSourceChanged);
        gridRef.current.control.selectionChanged.addHandler(handleSelectionChanged);
        gridRef.current.control.sortedColumn.addHandler(handleSortedColumn);
        gridRef.current.control.updatedView.addHandler(handleSortedColumn);
        setInitialize(true);
    }, []);

    useEffect(() => {
        // 2. itemsSource setting
        const content = data.content.map((_, i) => ({ ..._, _wc_index: i }));
        contentRef.current = _.cloneDeep(content);
        gridRef.current.control.itemsSource = _.cloneDeep(content);
        if (schema.options.pagination !== "inner") setTotalCount(data.totCnt);
    }, [data]);

    useEffect(() => {
        setGridPage(gridRef.current.control, page);
    }, [page]);

    useEffect(() => {
        setGridSize(gridRef.current.control, size);
    }, [size]);

    const setGridPage = (grid: any, nextPage: number) => {
        if (!grid.collectionView) return;
        grid.collectionView.moveToPage(nextPage);
    };

    const setGridSize = (grid: any, nextSize: number) => {
        if (!grid.collectionView) return;
        grid.collectionView.pageSize = nextSize;
    };

    const handleChangePage = (nextPage: number) => {
        setPage(nextPage);
    };

    const handleChangeSize = (nextSize: number) => {
        setSize(nextSize);
        setPage(0);
    };

    const handleSortedColumn = (e: any) => {
        if (!e.collectionView) return;
        const _view = e.collectionView._view.map(({ _wc_index }: { _wc_index: any }) => _wc_index);
        contentRef.current = _view.map((i: number) => contentRef.current.find((_: any) => _?._wc_index === i));
    };

    const handleItemsSourceChanged = (_: any) => {
        if (!_.collectionView) return;
        _.collectionView.collectionChanged.addHandler((__: any) => {
            if (schema.options.pagination === "inner") setTotalCount(__.totalItemCount);
        });
    };

    const handleFormatItem = (s: any, e: any) => {
        if (e.panel !== s.cells) return;
        if (s.collectionView.pageSize === 0) return;
        if (s.collectionView.itemCount <= e.row) return;

        const currentCellData = e.getRow().dataItem?.[e.getColumn().binding];
        const currentCellIndex = e.getRow().dataItem?._wc_index;

        if (e.getRow().dataItem?.["_wc_type"] === "added") return e.cell.classList.add("cell-new");
        const originalCellData = contentRef.current?.find(
            ({ _wc_index }: { _wc_index: any }) => _wc_index === currentCellIndex
        )?.[e.getColumn().binding];

        if (originalCellData !== currentCellData) return e.cell.classList.add("cell-changed");
    };

    const handleSelectionChanged = (_: any) => {
        if (!onSelect) return;
        onSelect(_.selectedItems);
    };

    const handleRowAdded = (s: any, e: any) => {
        const lastIndex = s.collectionView.sourceCollection.length - 1;
        s.collectionView.sourceCollection[lastIndex] = { _wc_index: "_" + lastIndex, _wc_type: "added" };
        contentRef.current = [...contentRef.current, { _wc_index: "_" + lastIndex, _wc_type: "added" }];
    };

    const handleDeletedRow = (s: any, e: any) => {
        const pageIndex = s.collectionView.pageIndex;
        const rowIndex = e.row;
        contentRef.current = contentRef.current.filter((_: any, i: number) => i !== pageIndex * size + rowIndex);
    };

    const headerLayoutDefinition = (head: any) => {
        return head.map((_: any) => {
            return {
                ..._,
                cells: _.cells.map((__: any) => {
                    const cells = { ...__, align: "center" };
                    return cells;
                }),
            };
        });
    };

    const layoutDefinition = (body: any) => {
        return body.map((_: any) => {
            return {
                ..._,
                cells: _.cells.map(({ type, mask, options, link, ...__ }: wijmoBodyCellProps) => {
                    const cells = { ...__ } as any;
                    const itemsSource = options;
                    const displayMemberPath = "label";

                    if (link) {
                        cells.cellTemplate = CellMaker.makeLink({
                            click: (e, ctx) => {
                                navigate(`/sample/pages/${ctx.value}`);
                            },
                        });
                    }

                    switch (type) {
                        case "number":
                            cells.editor = new InputNumber(document.createElement("div"));
                            break;
                        case "inputmask":
                            cells.editor = new InputMask(document.createElement("div"), { mask });
                            break;
                        case "select":
                            cells.editor = new ComboBox(document.createElement("div"), {
                                itemsSource,
                                displayMemberPath,
                            });
                            break;
                        case "date":
                            cells.editor = new InputDate(document.createElement("div"));
                            break;
                        case "time":
                            cells.editor = new InputTime(document.createElement("div"), { step: 5 });
                            cells.format = "h:mm tt";
                            break;
                        case "datetime":
                            cells.editor = new InputDateTime(document.createElement("div"));
                            cells.format = "g";
                            break;
                    }
                    return cells;
                }),
            };
        });
    };

    return (
        <div className="space-y-4" hidden={!initialize}>
            {(schema.options?.add || schema.options?.remove) && (
                <div className="flex space-x-2 justify-end">
                    {/* {schema.options?.import && (
            <Button onClick={addRow}>
              <Icon icon="plus" size="xs" />
            </Button>
          )} */}

                    {/* {schema.options?.export && (
            <Button onClick={addRow}>
              <Icon icon="plus" size="xs" />
            </Button>
          )} */}

                    {schema.options?.add && (
                        <Button onClick={addRow}>
                            <Icon icon="plus" size="xs" />
                        </Button>
                    )}
                    {schema.options?.remove && (
                        <Button onClick={removeChecked}>
                            <Icon icon="minus" size="xs" />
                        </Button>
                    )}
                </div>
            )}

            <wjGrid.MultiRow ref={gridRef} />

            {schema.options?.pagination && (
                <Pagination
                    page={page}
                    size={size}
                    onChangePage={handleChangePage}
                    onChangeSize={handleChangeSize}
                    totalCount={totalCount}
                />
            )}
        </div>
    );
};
