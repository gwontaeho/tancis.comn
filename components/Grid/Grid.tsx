import { useCallback, useEffect, memo, useRef, useState } from "react";
import { VariableSizeList, areEqual } from "react-window";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { utils, writeFile } from "xlsx-js-style";

import { Button, FormControl, Pagination, Icon, IconButton } from "@/comn/components";
import { comnUtils } from "@/comn/utils";
import { validateValue, fun } from "./utils";
import { useInitialize } from "./initializer";

type TGridCell = Record<string, any>;
type TGridRow = Record<string, any>;
type TGridRowContext = { backgroundColor: "yellow" | "red" | "blue" };
type TGridCellContext = { textColor: "yellow" | "red" | "blue" };

export type TGridRender = {
    row?: (data: TGridRow, context: TGridRowContext) => boolean;
    checkbox?: (data: TGridRow) => boolean;
    radio?: (data: TGridRow) => boolean;
    cell?: any;
    edit?: any;
    head?: any;
};

type GridProps = {
    _grid?: any;
    data?: any;
    render?: any;
    onCellClick?: any;
    onRowClick?: any;
    onRowCheck?: any;
    onRowSelect?: any;
    onPageChange?: any;
    onSizeChange?: any;
};

export const Grid = (props: GridProps) => {
    const { _grid, data, render, onRowCheck, onRowSelect, onRowClick, onCellClick, onPageChange, onSizeChange } = props;
    _grid.current._render = render;
    _grid.current._onRowCheck = onRowCheck;
    _grid.current._onRowSelect = onRowSelect;
    _grid.current._onRowClick = onRowClick;
    _grid.current._onCellClick = onCellClick;
    _grid.current._onPageChange = onPageChange;
    _grid.current._onSizeChange = onSizeChange;

    return <Component _grid={_grid} data={data} />;
};

/**
 * # Grid
 */
const Component = memo((props: GridProps) => {
    const { _grid } = props;

    const { t } = useTranslation();
    const { state } = useInitialize(props);

    const _state = { ...state, _test: state._test.length ? state._test : [{ __type: "empty" }] };
    const { _head, _body, _template, _options, _checked, _page, _size, _totalItemCount, _sort, _test } = _state;

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
            <div className="uf-grid-main break-all">
                {/* Head */}
                <div
                    ref={(ref) => {
                        if (!ref) return;
                        if (_grid.current._headRef) return;
                        _grid.current._headRef = ref;
                    }}
                    className="uf-grid-head relative"
                >
                    {!!Object.keys(_grid.current._group).length && <div className="uf-grid-option" />}
                    {_options.checkbox && (
                        <div className="uf-grid-option">
                            <input
                                type="checkbox"
                                checked={(_grid.current._render?.checkbox
                                    ? _test.filter((_: any) => {
                                          return _grid.current._render.checkbox(_);
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
                        {_head.map((row: any, rowIndex: any) => {
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
                                        {_grid.current._render?.head?.[cel.binding]?.({
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
                <VariableSizeList
                    ref={(ref) => {
                        if (!ref) return;
                        if (_grid.current._listRef) return;
                        _grid.current._listRef = ref;
                    }}
                    innerRef={(ref) => {
                        if (!ref) return;
                        if (_grid.current._listInner) return;
                        _grid.current._listInner = ref;
                    }}
                    outerRef={(ref) => {
                        if (!ref) return;
                        if (_grid.current._listOuter) return;
                        _grid.current._listOuter = ref;
                    }}
                    onItemsRendered={() => {
                        if (!_grid.current._autoHeight) return;
                        _grid.current._readjustHeight?.();
                    }}
                    itemSize={(index) => {
                        return (
                            _grid.current._rect[index]?.["height"] + 1 || _grid.current._rect[0]?.["height"] + 1 || 0
                        );
                    }}
                    itemCount={_test.length}
                    height={_options.height}
                    width="100%"
                    itemData={{
                        _grid,
                        _state,
                    }}
                >
                    {Row}
                </VariableSizeList>
            </div>

            {/* Pagination */}
            {_grid.current._pagination && (
                <Pagination
                    page={_page}
                    size={_size}
                    onChangePage={(next) => {
                        _grid.current._handlePage(next);
                        if (_grid.current._onPageChange) _grid.current._onPageChange(next);
                    }}
                    onChangeSize={(next) => {
                        _grid.current._handleSize(next);
                        if (_grid.current.onSizeChange) _grid.current.onSizeChange(next);
                    }}
                    totalCount={_totalItemCount}
                />
            )}

            <Table _grid={_grid} _head={_head} _body={_body} />
        </div>
    );
});

/** row */
const Row = memo((props: any) => {
    const { data, index, style } = props;
    const { _grid, _state } = data;
    const {
        _test,
        _options,
        _checked,
        _selectedRow,
        _selectedCel,
        _totalCount,
        _editingRow,
        _page,
        _size,
        _body,
        _group,
        _template,
    } = _state;

    const row = _test[index];
    const rowKey = row?.__key;
    const rowType = row?.__type;
    const rowIndex = row?.__index;
    const rowContext: TGridRowContext = row?.__context || {};
    const { backgroundColor } = rowContext;

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
                        {_group?.map((schemaRow: any, rowIndex: any) => {
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
                                        {ag && `${ag.value}`}
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
                        if (_grid.current._onRowClick) _grid.current._onRowClick(row);
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
                                disabled={
                                    _grid.current._render?.checkbox
                                        ? !_grid.current._render?.checkbox?.(row) || undefined
                                        : undefined
                                }
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
                                disabled={
                                    _grid.current._render?.radio
                                        ? !_grid.current._render?.radio?.(row) || undefined
                                        : undefined
                                }
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
                        {_body.map((_: any, rowIndex: any) => {
                            return _.map((cel: any, colIndex: any) => {
                                if (!cel) return null;
                                if (cel.show === false) return null;
                                const { binding, align, rowspan, colspan, edit, header, ...FORM } = cel;

                                const celKey = rowKey + ".gb." + rowIndex + "." + colIndex;

                                const BINDING_VAL = row[binding];
                                const FORMATTED_VAL = comnUtils.getFormattedValue(BINDING_VAL, FORM);
                                const VALI = validateValue(BINDING_VAL, _grid.current._rule[binding]);

                                const CELL_CONTEXT = {
                                    binding,
                                    rowValues: row,
                                    value: BINDING_VAL,
                                    formattedValue: FORMATTED_VAL,
                                };

                                // "HEADER" | "EDIT" | "CELL"
                                let CELL_STATUS;
                                if (Boolean(header)) CELL_STATUS = "HEADER";
                                else {
                                    const rowCell = _editingRow.find(
                                        ({ key, cell }: any) => key === rowKey && cell === binding,
                                    )?.edit;
                                    const row = _editingRow.find(
                                        ({ key, cell }: any) => key === rowKey && cell === undefined,
                                    )?.edit;
                                    CELL_STATUS = rowCell ?? row ?? edit ? "EDIT" : "CELL";
                                }

                                /*
                                FORM START */
                                if (FORM.rightButton?.onClick) {
                                    FORM.rightButton.onClick = () => FORM.rightButton.onClick(CELL_CONTEXT);
                                }
                                if (FORM.leftButton?.onClick) {
                                    FORM.leftButton.onClick = () => FORM.leftButton.onClick(CELL_CONTEXT);
                                }

                                switch (FORM.type) {
                                    case "daterange":
                                    case "timerange":
                                        {
                                            const START_VAL = row[FORM.start.binding];
                                            const END_VAL = row[FORM.end.binding];
                                            FORM.start.type = FORM.type === "daterange" ? "date" : "time";
                                            FORM.end.type = FORM.type === "daterange" ? "date" : "time";
                                            FORM.start.value = comnUtils.getFormattedValue(START_VAL, FORM.start);
                                            FORM.end.value = comnUtils.getFormattedValue(END_VAL, FORM.end);

                                            FORM.start.onChange = (event: any) => {
                                                _grid.current._handleUpdate({
                                                    ...row,
                                                    [FORM.start.binding]: comnUtils.getUnformattedValue(
                                                        event,
                                                        FORM.start,
                                                    ),
                                                });
                                            };
                                            FORM.end.onChange = (event: any) => {
                                                _grid.current._handleUpdate({
                                                    ...row,
                                                    [FORM.end.binding]: comnUtils.getUnformattedValue(event, FORM.end),
                                                });
                                            };
                                        }

                                        break;
                                    default:
                                        {
                                            FORM.value = FORMATTED_VAL;
                                            FORM.onChange = (event: any) =>
                                                _grid.current._handleUpdate({
                                                    ...row,
                                                    [binding]: comnUtils.getUnformattedValue(event, FORM),
                                                });
                                        }
                                        break;
                                }
                                FORM.edit = CELL_STATUS === "EDIT";
                                const Control = <FormControl {...FORM} />;

                                /* FORM END
                                 */

                                const BG_COLORS = {
                                    blue: "bg-[#bacee0]",
                                    yellow: "bg-[#ffeb33]",
                                    red: "bg-[#ed3e49]",
                                };

                                const TEXT_COLORS = {
                                    blue: "text-[#bacee0]",
                                    yellow: "text-[#ffeb33]",
                                    red: "text-[#ed3e49]",
                                };

                                let editContext: any = {};
                                let cellContext: any = {};
                                const CustomEdit = _grid.current._render?.edit?.[binding]?.(
                                    { ...CELL_CONTEXT, control: Control },
                                    editContext,
                                );
                                const CustomCell = _grid.current._render?.cell?.[binding]?.(
                                    { ...CELL_CONTEXT, control: Control },
                                    cellContext,
                                );

                                const context = (
                                    CELL_STATUS === "EDIT" ? editContext : cellContext
                                ) as TGridCellContext;
                                const textColor = context.textColor;

                                const handleClickCell = () => {
                                    _grid.current._handleClickCel({
                                        ...CELL_CONTEXT,
                                        key: celKey,
                                    });
                                };

                                return (
                                    <div
                                        key={celKey}
                                        className={classNames(
                                            "p-1 min-h-[2.5rem] flex items-center border border-uf-card-background aria-[invalid=true]:border-uf-error aria-[selected=true]:border-uf-info",
                                            (align === "start" || align === "left") && "justify-start text-left",
                                            (align === "end" || align === "right") && "justify-end text-right",
                                            (align === "center" || align === undefined) && "justify-center text-center",

                                            CELL_STATUS === "HEADER" && "border-uf-card-header font-semibold",
                                            backgroundColor
                                                ? BG_COLORS[backgroundColor]
                                                : CELL_STATUS === "HEADER"
                                                  ? "bg-uf-card-header"
                                                  : "bg-uf-card-background",
                                            textColor && TEXT_COLORS[textColor],
                                        )}
                                        {...(VALI.isError && { "aria-invalid": true })}
                                        {...(_selectedCel?.__key === celKey && { "aria-selected": true })}
                                        style={{
                                            gridRow: `${rowIndex + 1} / span ${rowspan ?? 1}`,
                                            gridColumn: `${colIndex + 1} / span ${colspan ?? 1}`,
                                        }}
                                        onClick={handleClickCell}
                                    >
                                        {CELL_STATUS === "HEADER" && t(header)}
                                        {CELL_STATUS === "EDIT" && (CustomEdit || Control)}
                                        {CELL_STATUS === "CELL" && (CustomCell || Control)}
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

// const ImportButton = (props: any) => {
//     const { _grid } = props;

//     const [file, setFile] = useState<any>();

//     // const handleClickSelect = async () => {
//     //     const excel = await _grid.current._selectExcel();
//     //     _grid.current._excel = excel;
//     //     setFile(excel);
//     // };
//     const handleClickImport = async () => {
//         console.log(await _grid.current._importExcel());
//     };

//     return (
//         <div className="flex">
//             {/* <button className="bg-uf-blue px-3 rounded-l text-uf-white" onClick={handleClickSelect}>
//                 <Icon icon="search" size="xs" />
//             </button> */}
//             <span className="px-1.5 items-center flex font-mono border-y min-w-[4rem]">{file?.name}</span>
//             <button className="bg-uf-blue px-3 rounded-r text-uf-white" onClick={handleClickImport}>
//                 Import
//             </button>
//         </div>
//     );
// };

// const ExportButton = (props: any) => {
//     const { _grid } = props;

//     return <Button onClick={() => _grid.current._exportExcel()}>Export</Button>;
// };

const SHEET_COLUMNS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const Table = (props: any) => {
    const { _grid, _head, _body } = props;
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

        const splited = ws["!ref"]?.split(":");
        if (splited) {
            const obj = SHEET_COLUMNS.split("").reduce((prev, curr, index) => {
                return { ...prev, [curr]: index };
            }, {});

            const [start, end] = splited;
            const startCol = start.slice(0, 1) as keyof typeof obj;
            const endCol = end.slice(0, 1) as keyof typeof obj;

            const startRow = start.slice(1);
            const endRow = end.slice(1);

            const gap = obj[startCol];
            const colLength = obj[endCol] - obj[startCol] + 1;
            const rowLength = Number(endRow) - Number(startRow) + 1;

            const cellKeys = [];
            for (let i = 0; i < colLength; i++) {
                for (let j = 0; j < rowLength; j++) {
                    cellKeys.push(SHEET_COLUMNS[i + gap] + (j + 1));
                }
            }

            cellKeys.forEach((key) => {
                if (!ws[key]) ws[key] = { v: "" };
                ws[key].s = { border: {} };
                ws[key].s.border.top = { color: "000000", style: "thin" };
                ws[key].s.border.left = { color: "000000", style: "thin" };
                ws[key].s.border.top = { color: "000000", style: "thin" };
                ws[key].s.border.right = { color: "000000", style: "thin" };
                ws[key].s.border.bottom = { color: "000000", style: "thin" };

                if (ws[key].t === "s") {
                    ws[key].s.alignment = {};
                    ws[key].s.alignment.vertical = "top";
                }

                if (ws[key].v?.startsWith?.("th::")) {
                    ws[key].s.alignment = {};
                    ws[key].v = ws[key].v.slice(4);
                    ws[key].s.font = { bold: true };
                    ws[key].s.fill = { fgColor: { rgb: "EBEFFA" } };
                    ws[key].s.alignment.vertical = "center";
                    ws[key].s.alignment.horizontal = "center";
                }
            });
        }

        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Sheet");
        writeFile(wb, "SheetJSTable.xlsx");
        _grid.current._exporting = false;
        setExporting(false);
    }, []);

    if (!exporting) return null;

    return (
        <table ref={tableRef} className="hidden">
            <thead className="[&_th]:border">
                {_head.map((cols: any, rowIndex: any) => {
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
                                        th::{cel.binding}
                                    </th>
                                );
                            })}
                        </tr>
                    );
                })}
            </thead>
            <tbody>
                {_grid.current._content
                    .filter((_: any) => {
                        return _.__type !== "deleted";
                    })
                    .map((row: any, rowIndex: any) => {
                        return _body.map((cols: any, colIndex: any) => {
                            return (
                                <tr key={_grid.current._key + ".tbr." + rowIndex + "." + colIndex}>
                                    {cols.map((cel: any, celIndex: any) => {
                                        if (!cel) return null;

                                        const { binding, align, rowspan, colspan, edit, header, ...FORM } = cel;

                                        const BINDING_VAL = row[binding];
                                        const FORMATTED_VAL = comnUtils.getFormattedValue(BINDING_VAL, FORM);

                                        const CELL_CONTEXT = {
                                            binding,
                                            rowValues: row,
                                            value: BINDING_VAL,
                                            formattedValue: FORMATTED_VAL,
                                        };

                                        const BG_COLORS = {
                                            blue: "bg-[#bacee0]",
                                            yellow: "bg-[#ffeb33]",
                                            red: "bg-[#ed3e49]",
                                        };

                                        const TEXT_COLORS = {
                                            blue: "text-[#bacee0]",
                                            yellow: "text-[#ffeb33]",
                                            red: "text-[#ed3e49]",
                                        };

                                        switch (FORM.type) {
                                            case "daterange":
                                            case "timerange":
                                                {
                                                    const START_VAL = row[FORM.start.binding];
                                                    const END_VAL = row[FORM.end.binding];
                                                    FORM.start.type = FORM.type === "daterange" ? "date" : "time";
                                                    FORM.end.type = FORM.type === "daterange" ? "date" : "time";
                                                    FORM.start.value = comnUtils.getFormattedValue(
                                                        START_VAL,
                                                        FORM.start,
                                                    );
                                                    FORM.end.value = comnUtils.getFormattedValue(END_VAL, FORM.end);
                                                }
                                                break;
                                            default:
                                                {
                                                    FORM.value = FORMATTED_VAL;
                                                }
                                                break;
                                        }
                                        FORM.edit = false;
                                        const Control = <FormControl {...FORM} />;

                                        let cellContext: any = {};
                                        const CustomCell = _grid.current._render?.cell?.[binding]?.(
                                            { ...CELL_CONTEXT, control: Control },
                                            cellContext,
                                        );

                                        return (
                                            <td
                                                key={_grid.current._key + ".td." + rowIndex + "." + celIndex}
                                                rowSpan={cel.rowspan}
                                                colSpan={cel.colspan}
                                            >
                                                {CustomCell || Control}
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
