import { useCallback, useEffect, memo, useRef, useState } from "react";
import classNames from "classnames";
import { utils, writeFile } from "xlsx";
import { useTranslation } from "react-i18next";
import { VariableSizeList as List, areEqual } from "react-window";

import { Button, FormControl, Pagination, Icon } from "@/comn/components";
import { comnUtils } from "@/comn/utils";
import { useInitialize } from "./initializer";

/**
 * # Grid
 */
export const Grid = (props: { _grid?: any; data?: any; render?: any; onCellClick?: any; onRowClick?: any }) => {
    const { _grid, render, onCellClick, onRowClick } = props;

    const { t } = useTranslation();
    const { state } = useInitialize(props);

    const { _headCells, _bodyCells, _template, _options, _checked, _page, _size, _totalCount, _sort, _test } = state;

    const headRef = useCallback((ref: any) => {
        if (!ref) return;
        _grid.current._headRef = ref;
    }, []);
    const listRef = useCallback((ref: any) => {
        if (!ref) return;
        _grid.current._listRef = ref;
    }, []);
    const listInnerRef = useCallback((ref: any) => {
        if (!ref) return;
        _grid.current._listInner = ref;
    }, []);
    const listOuterRef = useCallback((ref: any) => {
        if (!ref) return;
        _grid.current._listOuter = ref;
        ref.onscroll = (event: any) => {
            _grid.current._headRef.scrollTo({ left: event.currentTarget.scrollLeft });
        };
    }, []);

    const onItemsRendered = useCallback(() => {
        if (!_grid.current._autoHeight) return;
        _grid.current._readjustHeight?.();
    }, []);
    const itemSize = useCallback((index: any) => {
        return _grid.current._rect[index]?.["height"] + 1 || _grid.current._rect[0]?.["height"] + 1 || 0;
    }, []);
    const handleChangePage = useCallback((next: any) => {
        _grid.current._handlePage(next);
    }, []);
    const handleChangeSize = useCallback((next: any) => {
        _grid.current._handleSize(next);
    }, []);

    return (
        <div className="flex flex-col w-full">
            {/* Top Buttons */}
            <div className="uf-grid-top">
                <div>
                    {_options.importExcel && <ImportButton _grid={_grid} />}
                    {_options.exportExcel && <Button onClick={() => _grid.current._export()}>Export</Button>}
                </div>
                <div>
                    {_options.add && <Button onClick={() => _grid.current._handleAdd()}>Add</Button>}
                    {_options.delete && <Button onClick={() => _grid.current._handleDelete("all")}>Delete</Button>}
                </div>
            </div>

            {/* Grid Main */}
            <div className="uf-grid-main">
                {/* Head */}
                <div ref={headRef} className="uf-grid-head">
                    {_options.checkbox && (
                        <div className="uf-grid-option">
                            <input
                                type="checkbox"
                                checked={(render?.checkbox
                                    ? _test.filter((_: any) => {
                                          return render.checkbox(_);
                                      })
                                    : _test
                                ).every(({ __key }: any) => {
                                    return _checked.some((_: any) => _ === __key);
                                })}
                                onChange={(event) => _grid.current._handleCheckAll(event)}
                            />
                        </div>
                    )}
                    {_options.radio && <div className="uf-grid-option" />}
                    {_options.index && <div className="uf-grid-option" />}

                    <div className="grid w-full gap-[1px]" style={{ gridTemplateColumns: _template }}>
                        {_headCells.map((row: any, rowIndex: any) => {
                            return row.map((cel: any, colIndex: any) => {
                                if (!cel) return null;
                                if (cel.show === false) return null;

                                return (
                                    <div
                                        key={_grid.current._key + ".gh." + rowIndex + "." + colIndex}
                                        className="p-1 bg-uf-card-header min-h-[2.5rem] flex items-center justify-center text-center font-semibold"
                                        style={{
                                            gridRow: `${rowIndex + 1} / span ${cel.rowspan ?? 1}`,
                                            gridColumn: `${colIndex + 1} / span ${cel.colspan ?? 1}`,
                                        }}
                                    >
                                        {render?.head?.[cel.binding]?.({
                                            id: cel.id,
                                            binding: cel.binding,
                                            header: t(cel.header),
                                        }) ||
                                            t(cel.header) ||
                                            cel.binding}

                                        {cel.required && <span className="text-uf-error">*</span>}
                                        <button
                                            className="relative ml-0.5"
                                            onClick={() => {
                                                _grid.current._handleSort(cel.binding);
                                            }}
                                        >
                                            <Icon
                                                icon={
                                                    _sort[cel.binding]?.val === "asc"
                                                        ? "barsUp"
                                                        : _sort[cel.binding]?.val === "desc"
                                                          ? "barsDown"
                                                          : "bars"
                                                }
                                                size="xs"
                                            />
                                            <span className="absolute text-[10px] bottom-0 right-0 translate-x-full">
                                                {_sort[cel.binding]?.seq}
                                            </span>
                                        </button>
                                    </div>
                                );
                            });
                        })}
                    </div>
                </div>

                {/* Body */}
                <List
                    ref={listRef}
                    innerRef={listInnerRef}
                    outerRef={listOuterRef}
                    onItemsRendered={onItemsRendered}
                    itemSize={itemSize}
                    itemCount={_test.length > _totalCount ? _totalCount : _test.length}
                    height={_options.height}
                    width="100%"
                    itemData={{
                        _grid,
                        state,
                        render,
                        onCellClick,
                        onRowClick,
                    }}
                >
                    {Row}
                </List>

                {/*  */}
            </div>

            {/* Pagination */}
            {_grid.current._pagination && (
                <Pagination
                    page={_page}
                    size={_size}
                    onChangePage={handleChangePage}
                    onChangeSize={handleChangeSize}
                    totalCount={_totalCount}
                />
            )}

            <Table _grid={_grid} _headCells={_headCells} _bodyCells={_bodyCells} render={render} />
        </div>
    );
};

/** row */
const Row = memo((props: any) => {
    const { data, index, style } = props;
    const { _grid, state, render, onCellClick, onRowClick } = data;
    const {
        _test,
        _bodyCells,
        _options,
        _checked,
        _selectedRow,
        _selectedCel,
        _totalCount,
        _page,
        _size,
        _template,
        _editingRow,
    } = state;

    const row = _test[index];
    const rowKey = row?.__key;
    const rowType = row?.__type;

    const resizeObserverRef = useRef<any>(null);
    const rowRefCallback = useCallback((ref: any) => {
        if (!ref) return;

        resizeObserverRef.current = new ResizeObserver((entries) => {
            requestAnimationFrame(() => {
                entries.forEach((value) => {
                    if (value.contentRect.height === 0) return;
                    if (_grid.current._rect[index]?.height !== value.contentRect.height) {
                        _grid.current._rect[index] = value.contentRect;
                        _grid.current._listRef.resetAfterIndex(index);
                        if (_grid.current._autoHeight) {
                            _grid.current._readjustHeight();
                        }
                    }
                });
            });
        });

        resizeObserverRef.current.observe(ref);
    }, []);

    useEffect(() => {
        return () => {
            resizeObserverRef.current.disconnect();
        };
    }, []);

    return (
        <div style={{ ...style }}>
            {/* Group */}
            {rowType === "group" && (
                <div ref={rowRefCallback} className="flex items-center h-[2.5rem] border-l border-l-uf-card-background">
                    <button
                        className="flex items-center justify-center w-[2rem] h-full"
                        onClick={() => _grid.current._handleGroup(row.groupKey, !row.open)}
                    >
                        <Icon icon="down" size="xs" className={classNames({ "rotate-180": row.open })} />
                    </button>
                    <div className="px-1">{`${row.binding}가 ${row.value}이고 ${row.count}개`}</div>
                </div>
            )}

            {/* Row */}
            {rowType !== "group" && (
                <div
                    ref={rowRefCallback}
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
                    {/* Checkbox */}
                    {_options?.checkbox && (
                        <div className="uf-grid-option">
                            <input
                                type="checkbox"
                                disabled={render?.checkbox ? !render?.checkbox?.(row) || undefined : undefined}
                                checked={_checked.some((_: any) => _ === rowKey)}
                                onChange={(event) => _grid.current._handleCheck(event, rowKey)}
                            />
                        </div>
                    )}

                    {/* Radio */}
                    {_options?.radio && (
                        <div className="uf-grid-option">
                            <input
                                type="radio"
                                disabled={render?.radio ? !render?.radio?.(row) || undefined : undefined}
                                checked={_selectedRow === rowKey}
                                onChange={(event) => _grid.current._handleSelect(event, rowKey)}
                            />
                        </div>
                    )}

                    {/* Index */}
                    {_options?.index && (
                        <div className="uf-grid-option font-semibold">
                            {_options?.index === "DESC"
                                ? _totalCount - (_page * _size + index)
                                : _page * _size + index + 1}
                        </div>
                    )}

                    {/* Body */}
                    <div className="grid w-full gap-[1px]" style={{ gridTemplateColumns: _template }}>
                        {_bodyCells.map((_: any, rowIndex: any) => {
                            return _.map((cel: any, colIndex: any) => {
                                if (!cel) return null;
                                if (cel.show === false) return null;

                                const { binding, align, rowspan, colspan, edit, ...rest } = cel;

                                const celKey = rowKey + ".gb." + rowIndex + "." + colIndex;
                                const value = row[binding];

                                const fv = comnUtils.getFormattedValue(value, rest);
                                const uv = comnUtils.getUnformattedValue(value, rest);
                                // const vldv = comnUtils.getValidatedValue(uv, rest);
                                const isEdit = _editingRow.includes(rowKey) ? true : edit;

                                const celContext = {
                                    binding,
                                    value: uv,
                                    rowValues: row,
                                    formattedValue: fv,
                                };

                                const formControlProps = {
                                    ...rest,
                                    rightButton: cel.rightButton && {
                                        ...cel.rightButton,
                                        onClick: cel.rightButton.onClick && (() => cel.rightButton.onClick(celContext)),
                                    },
                                    leftButton: cel.leftButton && {
                                        ...cel.leftButton,
                                        onClick: cel.leftButton.onClick && (() => cel.leftButton.onClick(celContext)),
                                    },
                                };

                                return (
                                    <div
                                        key={celKey}
                                        className={classNames(
                                            "p-1 bg-uf-card-background min-h-[2.5rem] flex items-center border border-uf-card-background aria-selected:border-uf-info aria-[invalid=true]:border-uf-error",
                                            (align === "start" || align === "left") && "justify-start text-left",
                                            (align === "end" || align === "right") && "justify-end text-right",
                                            (align === "center" || align === undefined) && "justify-center text-center",
                                        )}
                                        // {...(vldv && { "aria-invalid": true })}
                                        {...(_selectedCel === celKey && { "aria-selected": true })}
                                        style={{
                                            gridRow: `${rowIndex + 1} / span ${rowspan ?? 1}`,
                                            gridColumn: `${colIndex + 1} / span ${colspan ?? 1}`,
                                        }}
                                        onClick={() => {
                                            _grid.current._handleClickCel({
                                                ...celContext,
                                                key: celKey,
                                                onCellClick: onCellClick?.[binding],
                                            });
                                        }}
                                    >
                                        {!isEdit &&
                                            (render?.cell?.[binding]?.({
                                                value: value,
                                                rowValues: row,
                                                binding: binding,
                                            }) || (
                                                <FormControl
                                                    {...formControlProps}
                                                    edit={false}
                                                    value={fv}
                                                    onChange={(v) => {
                                                        _grid.current._handleUpdate({
                                                            ...row,
                                                            [binding]: comnUtils.getUnformattedValue(
                                                                v,
                                                                formControlProps,
                                                            ),
                                                        });
                                                    }}
                                                />
                                            ))}
                                        {isEdit &&
                                            (render?.edit?.[binding]?.({
                                                value: value,
                                                rowValues: row,
                                                binding: binding,
                                            }) || (
                                                <FormControl
                                                    {...formControlProps}
                                                    value={fv}
                                                    onChange={(v) => {
                                                        _grid.current._handleUpdate({
                                                            ...row,
                                                            [binding]: comnUtils.getUnformattedValue(
                                                                v,
                                                                formControlProps,
                                                            ),
                                                        });
                                                    }}
                                                />
                                            ))}
                                    </div>
                                );
                            });
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}, areEqual);

const ImportButton = (props: any) => {
    const { _grid } = props;

    const [file, setFile] = useState<any>();

    const handleClickSelect = async () => {
        const excel = await _grid.current._selectExcel();
        _grid.current._excel = excel;
        setFile(excel);
    };
    const handleClickImport = () => {
        _grid.current._importExcel(_grid.current._excel);
    };

    return (
        <div className="flex">
            <button className="bg-uf-blue px-3 rounded-l text-uf-white" onClick={handleClickSelect}>
                <Icon icon="search" size="xs" />
            </button>
            <span className="px-1.5 items-center flex font-mono border-y min-w-[4rem]">{file?.name}</span>
            <button className="bg-uf-blue px-3 rounded-r text-uf-white" onClick={handleClickImport}>
                Import
            </button>
        </div>
    );
};

const Table = (props: any) => {
    const { _grid, _headCells, _bodyCells, render } = props;

    const [exporting, setExporting] = useState(false);

    useEffect(() => {
        _grid.current._export = () => {
            if (_grid.current._exporting) return;

            _grid.current._exporting = true;
            setExporting(true);
        };
    }, []);

    useEffect(() => {
        if (exporting) {
            const ws = utils.table_to_sheet(_grid.current._table);
            ws["!cols"] = [{ width: 20 }, { width: 20 }, { width: 20 }];
            const wb = utils.book_new();
            utils.book_append_sheet(wb, ws, "est");
            _grid.current._wb = wb;
            writeFile(wb, "SheetJSTable.xlsx");

            _grid.current._exporting = false;
            setExporting(false);
        }
    }, [exporting]);

    const tableRef = useCallback((ref: any) => {
        if (!ref) return;
        _grid.current._table = ref;
    }, []);

    if (!exporting) return null;

    return (
        <table ref={tableRef} className="hidden">
            <thead className="[&_th]:border">
                {_headCells.map((cols: any, rowIndex: any) => {
                    return (
                        <tr key={_grid.current._key + ".thr." + rowIndex}>
                            {cols.map((cel: any, celIndex: any) => {
                                if (!cel) return null;
                                return (
                                    <th
                                        key={_grid.current._key + ".th." + rowIndex + "." + celIndex}
                                        rowSpan={cel.rowspan}
                                        colSpan={cel.colspan}
                                    >
                                        {cel.binding}
                                    </th>
                                );
                            })}
                        </tr>
                    );
                })}
            </thead>
            <tbody>
                {_grid.current._content.map((row: any, rowIndex: any) => {
                    return _bodyCells.map((cols: any) => {
                        return (
                            <tr key={_grid.current._key + ".tbr." + rowIndex}>
                                {cols.map((cel: any, celIndex: any) => {
                                    if (!cel) return null;
                                    return (
                                        <td
                                            key={_grid.current._key + ".td." + rowIndex + "." + celIndex}
                                            rowSpan={cel.rowspan}
                                            colSpan={cel.colspan}
                                        >
                                            {render?.cell?.[cel.binding]?.({
                                                value: row[cel.binding],
                                                rowValues: row,
                                                binding: cel.binding,
                                            }) || row[cel.binding]}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    });
                })}
            </tbody>
        </table>
    );
};
