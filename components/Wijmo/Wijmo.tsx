import "@grapecity/wijmo.styles/wijmo.css";
import "./Wijmo.css";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";
import lodash from "lodash";
import classNames from "classnames";
import * as wjCore from "@grapecity/wijmo";
import { CellType, CellRange } from "@grapecity/wijmo.grid";

import { _MultiRowLayout } from "@grapecity/wijmo.grid.multirow";
import * as wjGrid from "@grapecity/wijmo.react.grid.multirow";
import * as wjcGridXlsx from "@grapecity/wijmo.grid.xlsx";
import { Selector } from "@grapecity/wijmo.grid.selector";
import { setLicenseKey } from "@grapecity/wijmo";

import { Pagination, Button, Icon, FormControl } from "@/comn/components";
import { WijmoSchemaType, TWijmoHead, useTheme, TWijmoBody } from "@/comn/hooks";
import dayjs from "dayjs";

setLicenseKey(
    "singlewindow.info,725598597875341#B0JoIIyVmdiwSZzxWYmpjIyNHZisnOiwmbBJye0ICRiwiI34zZ7h5LFhFdKFUa6czTpd4SCFFb7YXZ8V4KDZGV9A7MRxWSllkaitiSjh4cCBlWSZENWdmNzNUeItEdtV5L6ZlcxN7M8hjb0R6V8czQyBFNSZXd6kkW62mR8FXN8tCT6hTSxxkeNFzNz3meLRkRDdHU6AnTu9WNZJkURVFMyoGSzUGT5k6VwATQw2SYwknQvJUMXxkMQtCZNZme8k6cWtSOuNEWzpXWBJFblxGT5Vma4IXOLdVW9F7U4cXdaVjTrQ7UJRUZIJVZzN7KxQjMzgkdCZGZlJHMpNlQt9WVOdzTpJXe9MUMCFTbmRjc9AFTzMlWCJWWOhXM6RmQjhFWvh5N6FDbIpkVaF5TEB5ZzVGcNFVRotGR9VldnFjc7QUO5l7NK56alJVdKpnSK3Wd0J4VDhTYTlDZu56KzdkZhVGdjV6RycjUMlWcrVzRiBDbS9GestSZENkI0IyUiwiI5QjMyIkMFFjI0ICSiwCMxgDNxAzMzEjM0IicfJye35XX3JSSwIjUiojIDJCLi86bpNnblRHeFBCI4VWZoNFelxmRg2Wbql6ViojIOJyes4nI5kkTRJiOiMkIsIibvl6cuVGd8VEIgIXZ7VWaWRncvBXZSBybtpWaXJiOi8kI1xSfis4N8gkI0IyQiwiIu3Waz9WZ4hXRgAydvJVa4xWdNBybtpWaXJiOi8kI1xSfiQjR6QkI0IyQiwiIu3Waz9WZ4hXRgACUBx4TgAybtpWaXJiOi8kI1xSfiMzQwIkI0IyQiwiIlJ7bDBybtpWaXJiOi8kI1xSfiUFO7EkI0IyQiwiIu3Waz9WZ4hXRgACdyFGaDxWYpNmbh9WaGBybtpWaXJiOi8kI1tlOiQmcQJCLiYjMzMjNwAyNyETMzIDMyIiOiQncDJCLi2mZulmL73GZul6dlx6Zul6ciojIz5GRiwiIMqZ1pWZ1weJ1BiJ14qJ1de004O10VCK1pWZ1FKK18SI1ASr0ACr0tWr0iojIh94QiwiIxQzM5cDO7kTN8kTN5IzNiojIklkIs4XXbpjInxmZiwiIxY7MJAYM",
);

type TData_v1 = {
    page: number;
    size: number;
    totCnt: number;
    content: Record<string, any>[];
};

type TData_v2 = {
    content: Record<string, any>[];
    page: {
        number: number;
        size: number;
        totalElements: number;
        totalPages: number;
    };
};

type WijmoProps = {
    data?: any;
    gridRef: any;
    contentRef: any;
    schema: WijmoSchemaType;
    size: number;
    page: number;
    onCellClick?: { [name: string]: Function };
    setSize?: React.Dispatch<React.SetStateAction<number>>;
    setPage?: React.Dispatch<React.SetStateAction<number>>;
    onPageChange?: (page: number) => void;
    onSizeChange?: (size: number) => void;
};

export const Wijmo = (props: WijmoProps) => {
    const { gridRef, contentRef, schema, data, size, page, onCellClick, setSize, setPage, onPageChange, onSizeChange } =
        props;

    const { t } = useTranslation();
    const {
        theme: { lang },
    } = useTheme();

    const [_initialize, _setInitialize] = useState(false);

    const [_body] = useState(() =>
        schema.body.map((_) => {
            return {
                ..._,
                key: uuid(),
                cells: _.cells.map((__) => {
                    return { ...__, key: uuid() };
                }),
            };
        }),
    );

    const [totalCount, setTotalCount] = useState<number>(0);
    const [_page, _setPage] = useState<number>(page || 0);
    const [_size, _setSize] = useState<number>(size || 10);

    useEffect(() => {
        // 1. initialize

        if (!gridRef.current?.control) return;

        if (schema.options?.isReadOnly) gridRef.current.control.isReadOnly = true;
        if (schema.options?.checkbox) new Selector(gridRef.current.control);
        gridRef.current.control.deferResizing = true;
        gridRef.current.control.showMarquee = true;
        gridRef.current.control.rows.defaultSize = 40;
        gridRef.current.control.columnHeaders.rows.defaultSize = 40;
        gridRef.current.control.formatItem.addHandler(handleFormatItem);
        gridRef.current.control.itemsSourceChanged.addHandler(handleItemsSourceChanged);

        gridRef.current.control.hostElement.addEventListener("click", (e: any) => {
            const h = gridRef.current.control.hitTest(e);
            if (h.cellType !== 1) return;

            const col = h.col;
            const row = h.row;
            const rowValues = gridRef.current.control.rows[row].dataItem;
            const binding = h.panel.getCellElement(row, col).getElementsByClassName("cell")[0]?.dataset.binding;

            const value = gridRef.current.control.getCellData(row, col);
            if (!binding) return;
            if (onCellClick && onCellClick[binding]) onCellClick[binding]({ binding, value, rowValues });
        });

        _setInitialize(true);
    }, []);

    useEffect(() => {
        gridRef.current.control.headerLayoutDefinition = headerLayoutDefinition(schema.head);
        // gridRef.current.control.layoutDefinition = layoutDefinition(schema.body);
    }, [lang]);

    useEffect(() => {
        if (!gridRef.current.control) return;
        if (data === undefined) return;
        // 2. data setting
        const content = data.content.map((_: any) => ({
            ..._,
            __type: "origin",
            __index: uuid(),
        }));
        contentRef.current = lodash.cloneDeep(content);
        gridRef.current.control.itemsSource = lodash.cloneDeep(content);

        if (schema.options.pagination === "in") {
            gridRef.current.control.collectionView.pageSize = _size;
            gridRef.current.control.collectionView.moveToPage(_page);
            setTotalCount(content.length);
        } else {
            /**
             * v1 일 때
             */
            if (data.totCnt) {
                setTotalCount(data.totCnt);
            }

            /**
             * v2 일 때
             */
            if (data.page.totalElements) {
                setTotalCount(data.page.totalElements);
            }
        }
    }, [data]);

    useEffect(() => {
        if (!_initialize) return;
        if (page === _page) return;

        _setPage(page);
    }, [page]);

    useEffect(() => {
        if (!_initialize) return;
        if (size === _size) return;

        _setSize(size);
    }, [size]);

    useEffect(() => {
        if (!_initialize) return;
        if (page === _page) return;

        if (onPageChange) onPageChange(_page);

        if (setPage) {
            setPage(_page);
        }

        if (schema.options.pagination === "in") {
            gridRef.current.control.collectionView.moveToPage(_page);
        }
    }, [_page]);

    useEffect(() => {
        if (!_initialize) return;
        if (size === _size) return;

        _setPage(0);

        if (onSizeChange) onSizeChange(_size);

        if (setSize) {
            setSize(_size);
        }

        if (schema.options.pagination === "in") {
            gridRef.current.control.collectionView.pageSize = _size;
        }
    }, [_size]);

    // _MultiRowLayout.prototype._getSingleRowGroupHeaderRange = function (e, t, o) {
    //     var r = this._bindingGroups;
    //     if (0 === r.length) return null;
    //     var i = this._getGroupByColumn(o);
    //     wjCore.assert(null != i, "Failed to get the group!");
    //     var n = i._getCellRange(0, o - i._colstart),
    //         l = new CellRange(t, i._colstart + n.col, t, i._colstart + n.col2);
    //     if (0 != i.getBindingColumn(e, t, o).aggregate) return l;
    //     for (var a = r[0]._colstart, s = o - 1; s >= a; s--) {
    //         var u = this._getGroupByColumn(s);
    //         wjCore.assert(null != u, "Failed to get the group!");
    //         if (0 != u.getBindingColumn(e, t, s).aggregate) break;
    //         n = u._getCellRange(0, s - u._colstart);
    //         l.col = u._colstart + n.col;
    //     }
    //     var _ = r[r.length - 1],
    //         c = _._colstart + _._colspanEff;
    //     for (s = o + 1; s < c; s++) {
    //         var w = this._getGroupByColumn(s);
    //         wjCore.assert(null != w, "Failed to get the group!");
    //         if (w.getBindingColumn(e, t, s) && 0 != w.getBindingColumn(e, t, s).aggregate) break;
    //         n = w._getCellRange(0, s - w._colstart);
    //         l.col2 = w._colstart + n.col2;
    //     }
    //     return l;
    // };

    const handleFormatItem = (m: any, e: any) => {
        if (!e.cell.getElementsByClassName("cell")[0]) return;
        const cellType = e.getRow().dataItem["__type"];
        if (cellType === "added") return e.cell.classList.add("cell-added");
        const cellBinding = e.cell.getElementsByClassName("cell")[0].dataset.binding;

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
        _setPage(nextPage);
    };

    const handleChangeSize = (nextSize: number) => {
        _setSize(nextSize);
    };

    const handleAdd = () => {
        const item = { __index: uuid(), __type: "added" };
        gridRef.current.control.collectionView.addNew(item);
    };

    const handleRemove = () => {
        const checked = (gridRef.current.control.rows as any[])
            .filter((r) => r.isSelected)
            .map((r) => r.dataIndex)
            .filter((d, i, a) => a.indexOf(d) === i)
            .sort((a: number, b: number) => b - a);

        checked.forEach((index: number) => {
            gridRef.current.control.collectionView.removeAt(index);
        });
    };

    const headerLayoutDefinition = (head: TWijmoHead) => {
        return head.map((_) => {
            return {
                ..._,
                cells: _.cells.map((__) => {
                    return { ...__, header: t(__.header) };
                }),
            };
        });
    };

    // const layoutDefinition = (body: TWijmoBody) => {
    //     return body.map((_) => {
    //         return {
    //             ..._,
    //             cells: _.cells.map((__) => {
    //                 const { type, area, comnCd, onClick, ...rest } = __;
    //                 return {
    //                     ...rest,
    //                     cellTemplate: (e: any, s: any) => {
    //                         // if (onClick) {
    //                         //     s.onclick = () => onClick({ value: e.value, rowValues: e.item, binding: __.binding });
    //                         // }

    //                         return `<div class="cell" data-binding=${__.binding}>${e.value}</div>`;
    //                     },
    //                 };
    //             }),
    //         };
    //     });
    // };

    const handleExport = () => {
        wjcGridXlsx.FlexGridXlsxConverter.saveAsync(
            gridRef.current.control,
            {
                includeColumnHeaders: true,
                includeStyles: true,
                // formatItem: this.state.customContent ? this.exportFormatItem : null
            },
            "FlexGrid.xlsx",
        );
    };

    return (
        <div className="space-y-4">
            <Button onClick={handleExport}>
                <Icon icon="plus" size="xs" />
            </Button>
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

            <wjGrid.MultiRow ref={gridRef} multiRowGroupHeaders={false}>
                {_body.map((props) => {
                    return (
                        <wjGrid.MultiRowCellGroup key={props.key} colspan={props.colspan}>
                            {props.cells.map((cellProps) => {
                                return (
                                    <wjGrid.MultiRowCell
                                        dataType={(() => {
                                            switch (cellProps.type) {
                                                case "date":
                                                case "time":
                                                case "datetime":
                                                    return "Date";
                                                case "number":
                                                    return "Number";
                                                default:
                                                    return "String";
                                            }
                                        })()}
                                        width={cellProps.width}
                                        key={cellProps.key}
                                        colspan={cellProps.colspan}
                                        binding={cellProps.binding}
                                        isReadOnly={cellProps.isReadOnly}
                                    >
                                        {/* cell */}
                                        {/* <wjGrid.MultiRowCellTemplate
                                            cellType="Cell"
                                            template={(cell: any) => {
                                                const cellData = {
                                                    value: cell.item[cellProps.binding],
                                                    rowValues: cell.item,
                                                    binding: cellProps.binding,
                                                };

                                                return (
                                                    <div className="cell" data-binding={cellProps.binding}>
                                                        {cellProps.render
                                                            ? cellProps.render(cellData)
                                                            : cell.item[cellProps.binding]}
                                                    </div>
                                                );
                                            }}
                                        /> */}
                                        {/* edit cell */}
                                        <wjGrid.MultiRowCellTemplate
                                            cellType="CellEdit"
                                            template={(cell: any) => {
                                                return (
                                                    <div
                                                        className="w-full flex"
                                                        onMouseDown={(e) => {
                                                            if (
                                                                cellProps.type === "date" ||
                                                                cellProps.type === "time" ||
                                                                cellProps.type === "datetime" ||
                                                                cellProps.type === "daterange" ||
                                                                cellProps.type === "timerange"
                                                            ) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    >
                                                        <FormControl
                                                            size="full"
                                                            lang={lang}
                                                            type={cellProps.type}
                                                            name={cellProps.key}
                                                            defaultValue={cell.value}
                                                            area={cellProps.area}
                                                            comnCd={cellProps.comnCd}
                                                            thousandSeparator={cellProps.thousandSeparator}
                                                            onChange={(event) => {
                                                                cell.value =
                                                                    event.target === undefined
                                                                        ? event
                                                                        : event.target.value;
                                                            }}
                                                        />
                                                    </div>
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
                    page={_page}
                    size={_size}
                    onChangePage={handleChangePage}
                    onChangeSize={handleChangeSize}
                    totalCount={totalCount}
                />
            )}
        </div>
    );
};

/**
 * 원본
 */
// export const Wijmo = (props: WijmoProps) => {
//     const { gridRef, contentRef, schema, data, size, page, onCellClick, setSize, setPage } = props;

//     const { t } = useTranslation();
//     const {
//         theme: { lang },
//     } = useTheme();

//     const [_initialize, _setInitialize] = useState(false);

//     const [_body] = useState(() =>
//         schema.body.map((_) => {
//             return {
//                 ..._,
//                 key: uuid(),
//                 cells: _.cells.map((__) => {
//                     return { ...__, key: uuid() };
//                 }),
//             };
//         }),
//     );

//     const [totalCount, setTotalCount] = useState<number>();
//     const [_page, _setPage] = useState<number>(0);
//     const [_size, _setSize] = useState<number>(10);

//     useEffect(() => {
//         // 1. initialize

//         if (!gridRef.current?.control) return;

//         if (schema.options?.isReadOnly) gridRef.current.control.isReadOnly = true;
//         if (schema.options?.checkbox) new Selector(gridRef.current.control);
//         gridRef.current.control.deferResizing = true;
//         gridRef.current.control.showMarquee = true;
//         gridRef.current.control.rows.defaultSize = 40;
//         gridRef.current.control.columnHeaders.rows.defaultSize = 40;
//         gridRef.current.control.formatItem.addHandler(handleFormatItem);
//         gridRef.current.control.itemsSourceChanged.addHandler(handleItemsSourceChanged);

//         gridRef.current.control.hostElement.addEventListener("click", (e: any) => {
//             const h = gridRef.current.control.hitTest(e);
//             if (h.cellType !== 1) return;

//             const col = h.col;
//             const row = h.row;
//             const rowValues = gridRef.current.control.rows[row].dataItem;
//             const binding = h.panel.getCellElement(row, col).getElementsByClassName("cell")[0]?.dataset.binding;
//             const value = gridRef.current.control.getCellData(row, col);
//             if (!binding) return;
//             if (onCellClick && onCellClick[binding]) onCellClick[binding]({ binding, value, rowValues });
//         });

//         _setInitialize(true);
//     }, []);

//     useEffect(() => {
//         gridRef.current.control.headerLayoutDefinition = headerLayoutDefinition(schema.head);
//         gridRef.current.control.layoutDefinition = layoutDefinition(schema.body);
//     }, [lang]);

//     useEffect(() => {
//         if (!gridRef.current.control) return;
//         if (data === undefined) return;
//         // 2. data setting
//         const content = data.content.map((_) => ({
//             ..._,
//             __type: "origin",
//             __index: uuid(),
//         }));
//         contentRef.current = lodash.cloneDeep(content);
//         gridRef.current.control.itemsSource = lodash.cloneDeep(content);

//         setTotalCount(schema.options?.pagination === "in" ? content.length : data.totCnt);
//     }, [data]);

//     useEffect(() => {
//         if (!gridRef.current.control.collectionView) return;
//         if (schema.options?.pagination !== "in") return;
//         gridRef.current.control.collectionView.moveToPage(_page);
//     }, [_page]);

//     useEffect(() => {
//         if (!gridRef.current.control?.collectionView) return;
//         if (schema.options?.pagination !== "in") return;
//         gridRef.current.control.collectionView.pageSize = _size;
//     }, [_size]);

//     const handleFormatItem = (m: any, e: any) => {
//         if (!e.cell.getElementsByClassName("cell")[0]) return;
//         const cellType = e.getRow().dataItem["__type"];
//         if (cellType === "added") return e.cell.classList.add("cell-added");
//         const cellBinding = e.cell.getElementsByClassName("cell")[0].dataset.binding;

//         const cellValue = e.getRow().dataItem[cellBinding];
//         const cellIndex = e.getRow().dataItem["__index"];

//         const originValue = contentRef.current?.find((origin: any) => origin.__index === cellIndex)[cellBinding];
//         if (cellValue !== originValue) return e.cell.classList.add("cell-changed");
//     };

//     const handleItemsSourceChanged = (c: any) => {
//         if (schema.options?.pagination !== "in") return;
//         if (!c.collectionView) return;
//         c.collectionView.collectionChanged.addHandler((cv: any) => {
//             setTotalCount(cv.totalItemCount);
//         });
//     };

//     const handleChangePage = (nextPage: number) => {
//         if (schema.options?.pagination === "in") _setPage(nextPage);
//         if (schema.options?.pagination !== "in") setPage(nextPage);
//     };

//     const handleChangeSize = (nextSize: number) => {
//         if (schema.options?.pagination === "in") {
//             _setSize(nextSize);
//             _setPage(0);
//         }
//         if (schema.options?.pagination !== "in") {
//             setSize(nextSize);
//             setPage(0);
//         }
//     };

//     const handleAdd = () => {
//         const item = { __index: uuid(), __type: "added" };
//         gridRef.current.control.collectionView.addNew(item);
//     };

//     const handleRemove = () => {
//         const checked = (gridRef.current.control.rows as any[])
//             .filter((r) => r.isSelected)
//             .map((r) => r.dataIndex)
//             .filter((d, i, a) => a.indexOf(d) === i)
//             .sort((a: number, b: number) => b - a);

//         checked.forEach((index: number) => {
//             gridRef.current.control.collectionView.removeAt(index);
//         });
//     };

//     const headerLayoutDefinition = (head: TWijmoHead) => {
//         return head.map((_) => {
//             return {
//                 ..._,
//                 cells: _.cells.map((__) => {
//                     return { ...__, header: t(__.header) };
//                 }),
//             };
//         });
//     };

//     const layoutDefinition = (body: TWijmoBody) => {
//         return body.map((_) => {
//             return {
//                 ..._,
//                 cells: _.cells.map((__) => {
//                     const { type, area, comnCd, onClick, ...rest } = __;
//                     return {
//                         ...rest,
//                         cellTemplate: (e: any, s: any) => {
//                             // if (onClick) {
//                             //     s.onclick = () => onClick({ value: e.value, rowValues: e.item, binding: __.binding });
//                             // }

//                             return `<div class="cell" data-binding=${__.binding}>${e.value}</div>`;
//                         },
//                     };
//                 }),
//             };
//         });
//     };

//     const handleExport = () => {
//         wjcGridXlsx.FlexGridXlsxConverter.saveAsync(
//             gridRef.current.control,
//             {
//                 includeColumnHeaders: true,
//                 includeStyles: true,
//                 // formatItem: this.state.customContent ? this.exportFormatItem : null
//             },
//             "FlexGrid.xlsx",
//         );
//     };

//     return (
//         <div className="space-y-4">
//             <Button onClick={handleExport}>
//                 <Icon icon="plus" size="xs" />
//             </Button>
//             {(schema.options?.add || schema.options?.remove) && (
//                 <div className="flex space-x-2 justify-end">
//                     {!schema.options?.isReadOnly && schema.options?.add && (
//                         <Button onClick={handleAdd}>
//                             <Icon icon="plus" size="xs" />
//                         </Button>
//                     )}
//                     {schema.options?.remove && (
//                         <Button onClick={handleRemove}>
//                             <Icon icon="minus" size="xs" />
//                         </Button>
//                     )}
//                 </div>
//             )}

//             <wjGrid.MultiRow ref={gridRef}>
//                 {_body.map((props) => {
//                     return (
//                         <wjGrid.MultiRowCellGroup key={props.key} colspan={props.colspan}>
//                             {props.cells.map((cellProps) => {
//                                 return (
//                                     <wjGrid.MultiRowCell
//                                         width={cellProps.width}
//                                         key={cellProps.key}
//                                         colspan={cellProps.colspan}
//                                         binding={cellProps.binding}
//                                         isReadOnly={cellProps.isReadOnly}
//                                     >
//                                         {/* <wjGrid.MultiRowCellTemplate
//                                             cellType="Cell"
//                                             template={(cell: any) => {
//                                                 const cellData = {
//                                                     value: cell.item[cellProps.binding],
//                                                     rowValues: cell.item,
//                                                     binding: cellProps.binding,
//                                                 };

//                                                 if (cellProps.render) return cellProps.render(cellData);
//                                                 return (
//                                                     <div
//                                                         className={classNames("cell", {
//                                                             "cursor-pointer": cellProps.onClick,
//                                                         })}
//                                                         data-binding={cellProps.binding}
//                                                         onClick={() => cellProps.onClick?.(cellData)}
//                                                     >
//                                                         {cell.item[cellProps.binding]}
//                                                     </div>
//                                                 );
//                                             }}
//                                         /> */}
//                                         <wjGrid.MultiRowCellTemplate
//                                             cellType="CellEdit"
//                                             template={(cell: any) => {
//                                                 return (
//                                                     <div
//                                                         className="w-full flex"
//                                                         onMouseDown={(e) => {
//                                                             if (
//                                                                 cellProps.type === "date" ||
//                                                                 cellProps.type === "time" ||
//                                                                 cellProps.type === "datetime" ||
//                                                                 cellProps.type === "daterange" ||
//                                                                 cellProps.type === "timerange"
//                                                             ) {
//                                                                 e.preventDefault();
//                                                             }
//                                                         }}
//                                                     >
//                                                         <FormControl
//                                                             size="full"
//                                                             lang={lang}
//                                                             type={cellProps.type}
//                                                             name={cellProps.key}
//                                                             defaultValue={cell.value}
//                                                             area={cellProps.area}
//                                                             comnCd={cellProps.comnCd}
//                                                             onChange={(event) => {
//                                                                 cell.value =
//                                                                     event.target === undefined
//                                                                         ? event
//                                                                         : event.target.value;
//                                                             }}
//                                                         />
//                                                     </div>
//                                                 );
//                                             }}
//                                         />
//                                     </wjGrid.MultiRowCell>
//                                 );
//                             })}
//                         </wjGrid.MultiRowCellGroup>
//                     );
//                 })}
//             </wjGrid.MultiRow>

//             {schema.options?.pagination && (
//                 <Pagination
//                     page={schema.options?.pagination === "in" ? _page : page}
//                     size={schema.options?.pagination === "in" ? _size : size}
//                     onChangePage={handleChangePage}
//                     onChangeSize={handleChangeSize}
//                     totalCount={totalCount}
//                 />
//             )}
//         </div>
//     );
// };
