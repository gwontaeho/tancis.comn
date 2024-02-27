import { useCallback, useEffect, memo, useRef, useState } from "react";
import classNames from "classnames";
import { utils, writeFile } from "xlsx";
import { useTranslation } from "react-i18next";
import { VariableSizeList as List, areEqual } from "react-window";

import { Button, FormControl, Pagination, Icon, IconButton } from "@/comn/components";
import { comnUtils } from "@/comn/utils";
import { validateValue, fun } from "./utils";
import { useInitialize } from "./initializer";

/**
 * # Grid
 */
export const Grid = (props: {
    _grid?: any;
    data?: any;
    render?: any;
    onCellClick?: any;
    onRowClick?: any;
    onRowCheck?: any;
    onRowSelect?: any;
}) => {
    const { _grid, render, onCellClick, onRowClick } = props;

    const { t } = useTranslation();
    const { state } = useInitialize(props);

    const _state = { ...state, _test: state._test.length ? state._test : [{ __type: "empty" }] };
    const { _head, _body, _options, _checked, _page, _size, _totalItemCount, _sort, _test, _groupSchema } = _state;

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

    const _headCells = fun(_head);
    const _bodyCells = fun(_body);

    let _groupCells;
    if (_groupSchema) {
        _groupCells = fun(_groupSchema);
    }

    const _template = (() => {
        let w = Array(_headCells[0].length);
        for (let i = 0; i < _headCells.length; i++) {
            for (let j = 0; j < _headCells[i].length; j++) {
                if (w[j] === undefined) w[j] = 100;
                if (_headCells[i]?.[j]?.width !== undefined && _headCells[i]?.[j]?.colspan !== undefined) {
                    for (let k = j; k <= j + _headCells[i]?.[j]?.colspan; k++) {
                        if (k < _headCells[0].length) {
                            w[k] = _headCells[i]?.[j]?.width / _headCells[i]?.[j]?.colspan;
                        }
                    }
                }
                if (_headCells[i]?.[j]?.width !== undefined && _headCells[i]?.[j]?.colspan === undefined) {
                    w[j] = _headCells[i]?.[j].width;
                }
                if (_headCells[i]?.[j]?.show === false) {
                    w[j] = null;
                }
            }
        }
        return w
            .filter((_: any) => _)
            .map((_: any) => {
                if (typeof _ === "number") {
                    return `${_}px`;
                }
                if (typeof _ === "string") {
                    if (_.endsWith("*")) {
                        let t: any = _.slice(0, -1) || 1;
                        return `minmax( ${t * 100}px , ${t}fr)`;
                    }

                    if (_.endsWith("%")) {
                        return _;
                    }
                }
            })
            .join(" ");
    })();

    return (
        <div className="flex flex-col w-full">
            {/* Top Buttons */}
            <div className="uf-grid-top">
                <div>
                    {/* {_options.importExcel && <ImportButton _grid={_grid} />}
                    {_options.exportExcel && <ExportButton _grid={_grid} />} */}
                </div>
                <div>
                    {_options.add && <Button onClick={() => _grid.current._handleAdd()}>Add</Button>}
                    {_options.delete && <Button onClick={() => _grid.current._handleDelete("all")}>Delete</Button>}
                </div>
            </div>

            {/* Grid Main */}
            <div className="uf-grid-main">
                {/* Head */}
                <div ref={headRef} className="uf-grid-head relative">
                    {!!Object.keys(_grid.current._group).length && <div className="uf-grid-option" />}
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
                    itemCount={_test.length}
                    height={_options.height}
                    width="100%"
                    itemData={{
                        _grid,
                        _state,
                        _bodyCells,
                        _groupCells,
                        _template,
                        render,
                        onCellClick,
                        onRowClick,
                    }}
                >
                    {Row}
                </List>
            </div>

            {/* Pagination */}
            {_grid.current._pagination && (
                <Pagination
                    page={_page}
                    size={_size}
                    onChangePage={handleChangePage}
                    onChangeSize={handleChangeSize}
                    totalCount={_totalItemCount}
                />
            )}

            <Table _grid={_grid} _headCells={_headCells} _bodyCells={_bodyCells} render={render} />
        </div>
    );
};

/** row */
const Row = memo((props: any) => {
    const { data, index, style } = props;
    const { _grid, _state, render, onCellClick, onRowClick, _bodyCells, _template, _groupCells } = data;
    const { _test, _options, _checked, _selectedRow, _selectedCel, _totalCount, _editingRow, _page, _size } = _state;

    const row = _test[index];
    const rowKey = row?.__key;
    const rowType = row?.__type;
    const rowIndex = row?.__index;

    const { t } = useTranslation();
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
            {/* Empty */}
            {rowType === "empty" && (
                <div
                    ref={rowRefCallback}
                    className="flex w-full min-w-full gap-[1px] border-l bg-uf-border border-l-uf-card-background h-[2.5rem]"
                >
                    {_options.checkbox && <div className="uf-grid-option" />}
                    {_options.radio && <div className="uf-grid-option" />}
                    {_options.index && <div className="uf-grid-option" />}
                    <div className="grid w-full gap-[1px]" style={{ gridTemplateColumns: _template }}>
                        <div
                            className="bg-uf-card-background flex items-center justify-center"
                            style={{ gridColumn: "1 / -1" }}
                        >
                            {t("msg.com.00034")}
                        </div>
                    </div>
                </div>
            )}

            {/* Group */}
            {rowType === "group" && (
                <div
                    ref={rowRefCallback}
                    className="flex w-full min-w-full gap-[1px] border-l bg-uf-border border-l-uf-card-background h-[2.5rem]"
                >
                    {!!Object.keys(_grid.current._group).length && (
                        <div className="uf-grid-option bg-uf-card-background">
                            <IconButton
                                icon="right"
                                size="xs"
                                className={classNames(row.open && "rotate-45")}
                                onClick={() => _grid.current._handleGroup(row.groupKey, !row.open)}
                            />
                        </div>
                    )}
                    {_options.checkbox && <div className="uf-grid-option bg-uf-card-background" />}
                    {_options.radio && <div className="uf-grid-option bg-uf-card-background" />}
                    {_options.index && <div className="uf-grid-option bg-uf-card-background" />}
                    <div className="grid w-full gap-[1px]" style={{ gridTemplateColumns: _template }}>
                        {_groupCells?.map((schemaRow: any, rowIndex: any) => {
                            return schemaRow.map((cel: any, colIndex: any) => {
                                if (!cel) return null;
                                if (cel.show === false) return null;

                                const { binding, aggregate } = cel;
                                const ag = row.aggregate.find((_: any) => {
                                    return _.binding === binding && _.aggregate === aggregate;
                                });

                                const celKey = rowKey + ".gg." + rowIndex + "." + colIndex;
                                return (
                                    <pre
                                        key={celKey}
                                        className="p-1 bg-uf-card-background min-h-[2.5rem] flex items-center text-right justify-end font-bold text-sm"
                                        style={{
                                            gridRow: `${rowIndex + 1} / span ${cel.rowspan ?? 1}`,
                                            gridColumn: `${colIndex + 1} / span ${cel.colspan ?? 1}`,
                                        }}
                                    >
                                        {`${ag.aggregate}:\n ${ag.value}`}
                                    </pre>
                                );
                            });
                        })}
                    </div>
                </div>
            )}

            {/* Row */}
            {rowType !== "group" && rowType !== "empty" && (
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
                    {!!Object.keys(_grid.current._group).length && (
                        <div className="uf-grid-option bg-uf-card-background" />
                    )}

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
                            {_options.pagination === "out"
                                ? _options?.index === "DESC"
                                    ? _totalCount - rowIndex - _page * _size
                                    : rowIndex + 1 + _page * _size
                                : _options?.index === "DESC"
                                  ? _totalCount - rowIndex
                                  : rowIndex + 1}
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
                                const abc = validateValue(value, _grid.current._rule[binding]);

                                const rowEdit = _editingRow.find((r: any) => r.key === rowKey && r.cell === undefined);
                                const cellEdit = _editingRow.find((r: any) => r.key === rowKey && r.cell === binding);

                                const isEdit =
                                    cellEdit !== undefined
                                        ? cellEdit.edit
                                        : rowEdit !== undefined
                                          ? rowEdit.edit
                                          : edit;

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
                                            "p-1 bg-uf-card-background min-h-[2.5rem] flex items-center border border-uf-card-background aria-[invalid=true]:border-uf-error aria-[selected=true]:border-uf-info ",

                                            (align === "start" || align === "left") && "justify-start text-left",
                                            (align === "end" || align === "right") && "justify-end text-right",
                                            (align === "center" || align === undefined) && "justify-center text-center",
                                        )}
                                        {...(abc.isError && { "aria-invalid": true })}
                                        {...(_selectedCel?.__key === celKey && { "aria-selected": true })}
                                        style={{
                                            gridRow: `${rowIndex + 1} / span ${rowspan ?? 1}`,
                                            gridColumn: `${colIndex + 1} / span ${colspan ?? 1}`,
                                        }}
                                        onClick={() => {
                                            _grid.current._handleClickCel({
                                                ...celContext,
                                                key: celKey,
                                                onCellClick,
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

    // const handleClickSelect = async () => {
    //     const excel = await _grid.current._selectExcel();
    //     _grid.current._excel = excel;
    //     setFile(excel);
    // };
    const handleClickImport = async () => {
        console.log(await _grid.current._importExcel());
    };

    return (
        <div className="flex">
            {/* <button className="bg-uf-blue px-3 rounded-l text-uf-white" onClick={handleClickSelect}>
                <Icon icon="search" size="xs" />
            </button> */}
            <span className="px-1.5 items-center flex font-mono border-y min-w-[4rem]">{file?.name}</span>
            <button className="bg-uf-blue px-3 rounded-r text-uf-white" onClick={handleClickImport}>
                Import
            </button>
        </div>
    );
};

const ExportButton = (props: any) => {
    const { _grid } = props;

    return <Button onClick={() => _grid.current._exportExcel()}>Export</Button>;
};

const Table = (props: any) => {
    const { _grid, _headCells, _bodyCells, render } = props;
    const [exporting, setExporting] = useState(false);

    useEffect(() => {
        _grid.current._exportExcel = () => {
            if (_grid.current._exporting) return;
            _grid.current._exporting = true;
            setExporting(true);
        };
    }, []);

    const tableRef = useCallback((ref: any) => {
        if (!ref) return;
        const ws = utils.table_to_sheet(ref);
        ws["!cols"] = new Array(_grid.current._cols).fill({ width: 20 });
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "est");
        writeFile(wb, "SheetJSTable.xlsx");
        _grid.current._exporting = false;
        setExporting(false);
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
