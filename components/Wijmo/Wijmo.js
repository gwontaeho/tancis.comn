import "@grapecity/wijmo.styles/wijmo.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import * as wjGrid from "@grapecity/wijmo.react.grid.multirow";
import { Selector } from "@grapecity/wijmo.grid.selector";
import { CellMaker } from "@grapecity/wijmo.grid.cellmaker";
import { InputDate, InputTime, InputDateTime, InputNumber, InputMask, ComboBox } from "@grapecity/wijmo.input";
import { Pagination, Icon, Button } from "@/comn/components";

const defaultSchema = {
    options: {},
};

const defaultData = {
    page: 0,
    size: 0,
    totCnt: 0,
    content: [],
};

export const Wijmo = (props = {}) => {
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
    const [totalCount, setTotalCount] = useState();

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
        setInitialize(true);
    }, []);

    useEffect(() => {
        // 2. itemsSource setting
        console.log(data);
        const content = data.content.map((_, i) => ({ ..._, _grid_content_index: i }));
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

    const setGridPage = (grid, nextPage) => {
        if (!grid.collectionView) return;
        grid.collectionView.moveToPage(nextPage);
    };

    const setGridSize = (grid, nextSize) => {
        if (!grid.collectionView) return;
        grid.collectionView.pageSize = nextSize;
    };

    const handleChangePage = (nextPage) => {
        setPage(nextPage);
    };

    const handleChangeSize = (nextSize) => {
        setSize(nextSize);
        setPage(0);
    };

    const handleSortedColumn = (e, s) => {
        console.log(s);
        const _view = e.collectionView._view.map(({ _grid_content_index }) => _grid_content_index);
        contentRef.current = _view.map((_) =>
            contentRef.current.find(({ _grid_content_index }) => _grid_content_index === _)
        );
    };

    const handleItemsSourceChanged = (_) => {
        if (!_.collectionView) return;
        _.collectionView.collectionChanged.addHandler((__) => {
            if (schema.options.pagination === "inner") setTotalCount(__.totalItemCount);
        });
    };

    const handleFormatItem = (s, e) => {
        if (e.panel !== s.cells) return;
        if (s.collectionView.pageSize === 0) return;
        if (s.collectionView.itemCount <= e.row) return;

        const chunkedContent = _.chunk(contentRef.current, s.collectionView.pageSize);
        if (!chunkedContent?.[s.collectionView.pageIndex]?.[e.row]) return e.cell.classList.add("cell-new");

        const originalCellData = chunkedContent?.[s.collectionView.pageIndex]?.[e.row]?.[e.getColumn().binding];
        const currentCellData = e.getRow().dataItem?.[e.getColumn().binding];
        if (originalCellData !== currentCellData) return e.cell.classList.add("cell-changed");
    };

    const handleSelectionChanged = (_) => {
        if (!onSelect) return;
        onSelect(_.selectedItems);
    };

    const handleRowAdded = (s, e) => {};

    const handleDeletedRow = (s, e) => {
        const pageIndex = s.collectionView.pageIndex;
        const rowIndex = e.row;
        contentRef.current = contentRef.current.filter((_, i) => i !== pageIndex * size + rowIndex);
    };

    const headerLayoutDefinition = (head) => {
        return head.map((_) => {
            return {
                ..._,
                cells: _.cells.map((__) => {
                    const cells = { ...__, align: "center" };
                    return cells;
                }),
            };
        });
    };

    const layoutDefinition = (body) => {
        return body.map((_) => {
            return {
                ..._,
                cells: _.cells.map(({ type, mask, options, link, ...__ }, i) => {
                    const cells = { ...__ };
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
