import "@grapecity/wijmo.styles/wijmo.css";
// import "./Wijmo.css";
import "./_Wijmo.css";

import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Pagination, Icon } from "@/comn/components";
import * as wjGrid from "@grapecity/wijmo.react.grid.multirow";
import { Selector } from "@grapecity/wijmo.grid.selector";
import { InputDate, InputTime, InputDateTime, InputNumber, InputMask, ComboBox } from "@grapecity/wijmo.input";
import { CellMaker } from "@grapecity/wijmo.grid.cellmaker";
import { Button } from "@/comn/components/Button";

export const Wijmo = ({ gridRef, schema = {}, pagination, addRow, removeChecked, onSelect, data } = {}) => {
    const navigate = useNavigate();
    const head = schema.head;
    const body = schema.body;

    const isInnerPagination = schema.options?.pagination === "inner";

    const originContent = data?.content || [];
    const originTotalCount = isInnerPagination ? originContent.length : data?.totCnt || 0;

    const [totalCount, setTotalCount] = useState(originTotalCount);

    useEffect(() => {
        if (!originTotalCount) return;
        setTotalCount(originTotalCount);
    }, [originTotalCount]);

    useEffect(() => {
        if (!gridRef?.current) return;
        if (schema.options?.checkbox) new Selector(gridRef.current.control);
        if (schema.options?.isReadOnly) gridRef.current.control.isReadOnly = true;

        gridRef.current.control.selectionMode = "Row";
        gridRef.current.control.allowAddNew = true;
        gridRef.current.control.allowDelete = true;

        console.log(gridRef.current.control);
        console.log(gridRef.current.control);

        gridRef.current.control.headerLayoutDefinition = headerLayoutDefinition();
        gridRef.current.control.layoutDefinition = layoutDefinition();

        gridRef.current.control.formatItem.addHandler((s, e) => {
            console.log(s);
            console.log(e);
        });

        gridRef.current.control.selectionChanged.addHandler((_, __) => {
            if (!onSelect) return;
            onSelect(_.selectedItems);
        });

        gridRef.current.control.itemsSourceChanged.addHandler((_) => {
            if (!_.collectionView) return;

            _.collectionView.collectionChanged.addHandler((__) => {
                const { pageSize, sourceCollection } = __;
                if (!isInnerPagination) return;
                setTotalCount((prev) => {
                    const next = sourceCollection.length;
                    const lastPageItemCount = prev % pageSize || pageSize;
                    if (prev < next) {
                        const greater = next - prev > pageSize - lastPageItemCount;
                        if (greater) return next;
                    }
                    if (prev > next) {
                        const less = prev - next >= lastPageItemCount;
                        if (less) return next;
                    }
                    return prev;
                });
            });
        });
    }, []);

    useEffect(() => {
        if (!gridRef?.current) return;
        gridRef.current.control.itemsSource = _.cloneDeep(originContent);
        gridRef.current.control.collectionView.pageSize = pagination.size;
    }, [data]);

    const headerLayoutDefinition = () => {
        if (!head) return;
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

    const layoutDefinition = () => {
        if (!body) return;
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

    const handleChangePage = (nextPage) => {
        if (isInnerPagination) {
            gridRef.current.control.collectionView.moveToPage(nextPage);
        } else pagination.setPage(nextPage);
    };

    const handleChangeSize = (nextSize) => {
        if (isInnerPagination) {
            gridRef.current.control.collectionView.pageSize = nextSize;
        } else pagination.setSize(nextSize);
        handleChangePage(0);
    };

    return (
        <div className="space-y-4">
            {(schema.options?.add || schema.options?.remove) && (
                <div className="flex space-x-2 justify-end">
                    {schema.options?.import && (
                        <Button onClick={addRow}>
                            <Icon icon="plus" size="xs" />
                        </Button>
                    )}

                    {schema.options?.export && (
                        <Button onClick={addRow}>
                            <Icon icon="plus" size="xs" />
                        </Button>
                    )}

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
                    page={pagination.page}
                    size={pagination.size}
                    onChangePage={handleChangePage}
                    onChangeSize={handleChangeSize}
                    totalCount={totalCount}
                />
            )}
        </div>
    );
};
