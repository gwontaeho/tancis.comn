import React from "react";
import lodash from "lodash";
import { v4 as uuid } from "uuid";
import classNames from "classnames";
import Draggable from "react-draggable";
import { useTranslation } from "react-i18next";
import { VariableSizeList as List, areEqual } from "react-window";

import { Button, FormControl, Pagination, Icon } from "@/comn/components";
import { comnUtils } from "@/comn/utils";

const fun = (schema: any) => {
    let t = [];

    for (let i = 0; i < schema.length; i++) {
        if (schema[i].show === false) {
            continue;
        }
        let rowIndex = -1;
        let colspan = schema[i].colspan || 1;
        let _current = 0;

        let head = [];

        for (let col = 0; col < schema[i].cells.length; col++) {
            const cell = schema[i].cells[col];
            let isAdd = true;

            if (_current === 0) {
                rowIndex++;
                if (!head[rowIndex]) head[rowIndex] = Array(colspan);
            }
            if (head[rowIndex][_current] === null) {
                for (let i = _current; i < colspan; i++) {
                    if (head[rowIndex][i] === null) {
                        _current++;
                        if (_current > col - 1) {
                            isAdd = false;
                        }
                    } else break;
                }
            }

            if (isAdd === false) {
                _current = 0;
                col--;
                continue;
            }
            if (_current > colspan - 1) {
                _current = 0;
                continue;
            }

            head[rowIndex][_current] = cell;
            if (cell.colspan !== undefined) {
                for (let i = _current + 1; i < _current + cell.colspan; i++) {
                    head[rowIndex][i] = null;
                }
            }
            if (cell?.rowspan !== undefined) {
                for (let i = rowIndex + 1; i < rowIndex + cell.rowspan; i++) {
                    if (!head[i]) head[i] = Array(colspan);
                    head[i][_current] = null;
                }
            }

            _current += cell.colspan === undefined ? 1 : cell.colspan;
            if (_current > colspan - 1) {
                _current = 0;
            }
        }

        t.push(head);
    }

    let tt = t[0];

    for (let i = 1; i < t.length; i++) {
        for (let j = 0; j < tt.length; j++) {
            tt[j] = [...tt[j], ...(t[i]?.[j] || [])];
        }
    }

    return tt;
};

export const Grid = (props: any) => {
    const {
        /**  */
        _grid,
        data = { content: [], page: { totalElements: 0 } },
        render,
        onCellClick,
        onRowClick,
    } = props;

    const __t = data?.__t?.getTime();
    const { t } = useTranslation();

    const [_head, _setHead] = React.useState(() => {
        return _grid.current._defaultSchema.head.map((_: any) => {
            return {
                ..._,
                cells: _.cells.map((__: any) => {
                    return { ...__, show: _.show === true ? true : _.show === false ? false : true };
                }),
            };
        });
    });

    const [_body, _setBody] = React.useState(() => {
        return _grid.current._defaultSchema.body.map((_: any, i: any) => {
            return {
                ..._,
                id: _grid.current._defaultSchema.head[i]?.id,
                show:
                    _grid.current._defaultSchema.head[i]?.show === true
                        ? true
                        : _grid.current._defaultSchema.head[i]?.show === false
                          ? false
                          : true,
                cells: _.cells.map((__: any) => {
                    return {
                        ...__,
                        id: _grid.current._defaultSchema.head[i]?.id,
                        show:
                            _grid.current._defaultSchema.head[i]?.show === true
                                ? true
                                : _grid.current._defaultSchema.head[i]?.show === false
                                  ? false
                                  : true,
                        edit:
                            __.edit === true
                                ? true
                                : __.edit === false
                                  ? false
                                  : _.edit === true
                                    ? true
                                    : _.edit === false
                                      ? false
                                      : _grid.current._defaultSchema.options?.edit === true
                                        ? true
                                        : false,
                    };
                }),
            };
        });
    });

    const [_totalCount, _setTotalCount] = React.useState<number>(() => {
        if (!data?.content) return 0;
        return _grid.current._pagination === "in" ? data.content.length : data.page.totalElements;
    });
    const [_page, _setPage] = React.useState<number>(_grid.current._page);
    const [_size, _setSize] = React.useState<number>(_grid.current._size);
    const [_selectedRow, _setSelectedRow] = React.useState<Record<string, any> | null>(null);
    const [_selectedCel, _setSelectedCel] = React.useState<any>(null);
    const [_editingRow, _setEditingRow] = React.useState<any[]>([]);
    const [_checked, _setChecked] = React.useState<any[]>([]);
    const [_sort, _setSort] = React.useState<any | null>({});
    const [_group, _setGroup] = React.useState<any | null>({});
    const [_options, _setOptions] = React.useState({
        index: _grid.current._index,
        checkbox: _grid.current._checkbox,
        radio: _grid.current._radio,
        edit: _grid.current._edit,
        add: _grid.current._add,
        delete: _grid.current._delete,
        exportExcel: _grid.current._exportExcel,
        importExcel: _grid.current._importExcel,
    });

    /**
     * initialize content
     */
    const [_test, _setTest] = React.useState<any[]>(() => {
        if (!Array.isArray(data.content)) return [];

        /**
         * content setting
         */
        const _ = data.content.map((_: any) => ({ ..._, __key: uuid(), __type: "origin" }));
        _grid.current._dataCreated = data.__t;
        _grid.current._dataUpdated = data.__t;
        _grid.current._origin = _;
        _grid.current._content = _;

        let content = _;

        /**
         * grouping
         */
        if (!!_grid.current._group) {
            const groups = lodash.sortBy(Object.entries<any>(_grid.current._group), [
                (a: any) => {
                    return a[1].seq;
                },
            ]);

            const getGrouped = (data: any, by: any, prevDepth: any, prevParent: any, prevGroupKey: any): any => {
                if (!by) return data;

                const depth = prevDepth + 1;
                const parent = [...prevParent, by];

                return Object.entries(lodash.groupBy(data, by[0])).reduce((p: any, c: any) => {
                    if (c[0] === "undefined") return c[1];

                    const groupKey = prevGroupKey + "__" + c[0];

                    _grid.current._groupStatus[groupKey] = { open: true };
                    const row = {
                        __key: uuid(),
                        __type: "group",
                        depth,
                        groupKey,
                        open: true,
                        value: c[0],
                        binding: by[0],
                        count: c[1].length,
                    };

                    return [...p, row, ...getGrouped(c[1], groups[depth], depth, parent, groupKey)];
                }, []);
            };

            content = getGrouped(content, groups[0], 0, [], "");
        }

        /**
         * paging
         */
        if (_grid.current._pagination === "in") {
            content = lodash.chunk(content, _grid.current._size)[_grid.current._page] || [];
        }
        _grid.current._paged = content;

        return content;
    });

    /** set paged content */
    React.useEffect(() => {
        if (!_grid.current._initialized) return;
        _grid.current._paged = _test;
    }, [_test]);

    /**
     * on data changed
     */
    React.useEffect(() => {
        if (!_grid.current._initialized) return;
        if (!Array.isArray(data.content)) return;
        if (data.content.length === 0 && _test.length === 0) return;

        setData(data);
    }, [__t]);

    /**
     * 240130
     * set data
     */
    const setData = (d: any) => {
        let content = (Array.isArray(d) ? d : Array.isArray(d.content) ? d.content : []).map((_: any) => ({
            ..._,
            __key: uuid(),
            __type: "origin",
        }));

        _grid.current._dataUpdated = new Date();
        _grid.current._origin = content;
        _grid.current._content = content;

        const total = _grid.current._pagination === "out" ? d?.page?.totalElements : undefined;

        __setGrid(_grid.current._content, total);
    };

    /** set edit */
    const setEdit = React.useCallback((type: any, target: any, value: any) => {
        /**
         * # type
         * column
         * cell
         * row
         *
         * # target
         * column id
         * cell binding
         * row
         * row key
         */

        switch (type) {
            case "column": {
                _setBody((prev: any) => {
                    const next = prev.map((_: any) => {
                        if (_.id !== target) return _;
                        return {
                            ..._,
                            cells: _.cells.map((__: any) => {
                                return { ...__, edit: value };
                            }),
                        };
                    });
                    return next;
                });
                return;
            }
            case "cell": {
                _setBody((prev: any) => {
                    const next = prev.map((_: any) => {
                        return {
                            ..._,
                            cells: _.cells.map((__: any) => {
                                if (__.binding !== target) return __;
                                return { ...__, edit: value };
                            }),
                        };
                    });
                    return next;
                });
                return;
            }
            /**
             * 240129
             */
            case "row": {
                const key =
                    typeof target === "object" && !!target.__key
                        ? target.__key
                        : typeof target === "string" && !!target
                          ? target
                          : undefined;

                if (!key) return;

                _setEditingRow((prev) => {
                    /** to edit */
                    if (value) {
                        if (prev.find((r) => r.__key === key)) return prev;
                        return [...prev, key];
                    }
                    /** to read */
                    return prev.filter((r) => r !== key);
                });

                break;
            }
        }
    }, []);

    /** set show */
    const setShow = React.useCallback((type: any, target: any, value: any) => {
        /**
         * # type
         * column
         *
         * # target
         * column id
         */

        switch (type) {
            case "column": {
                _setHead((prev: any) => {
                    const next = prev.map((_: any) => {
                        if (_.id !== target) return _;
                        return {
                            ..._,
                            show: value,
                            cells: _.cells.map((__: any) => {
                                return { ...__, show: value };
                            }),
                        };
                    });
                    return next;
                });
                _setBody((prev: any) => {
                    const next = prev.map((_: any) => {
                        if (_.id !== target) return _;
                        return {
                            ..._,
                            show: value,
                            cells: _.cells.map((__: any) => {
                                return { ...__, show: value };
                            }),
                        };
                    });
                    return next;
                });
                break;
            }
        }
    }, []);

    /** set option */
    const setOption = React.useCallback((target: any, value: any) => {
        _setOptions((prev) => {
            _grid.current[target] = value;
            return { ...prev, [target]: value };
        });

        if (target === "edit") {
            _setBody((prev: any) => {
                const next = prev.map((_: any) => {
                    return {
                        ..._,
                        edit: value,
                        cells: _.cells.map((__: any) => {
                            return { ...__, edit: value };
                        }),
                    };
                });
                return next;
            });
        }
    }, []);

    /** reset data */
    const resetData = () => {
        // remove sort options

        const o = _grid.current._origin;

        _grid.current._content = o;

        const paged =
            _grid.current._pagination === "in" ? lodash.chunk(o, _grid.current._size)[_grid.current._page] : o;
        _grid.current._paged = paged;

        _setTotalCount(o.length);
        _setTest(paged || []);
    };

    /** handle update */
    const handleUpdate = React.useCallback((n: any) => {
        if (!n?.__key) return;

        _grid.current._content = _grid.current._content.map((_: any) => {
            if (_.__key !== n.__key) return _;
            const { __type, __key, ...rest } = n;
            return {
                ..._,
                ...rest,
                __type:
                    _.__type === "origin" || _.__type === "updated"
                        ? Object.keys(rest).some((k) => {
                              return n[k] !== _grid.current._origin.find((o: any) => o.__key === n.__key)[k];
                          })
                            ? "updated"
                            : "origin"
                        : _.__type,
            };
        });

        __setGrid(_grid.current._content);
    }, []);

    /**
     * only pagination = in | false
     * handle add
     */
    const handleClickAdd = React.useCallback((data?: any) => {
        if (_grid.current._pagination === "out") return;
        _grid.current._content = [..._grid.current._content, { __key: uuid(), __type: "added", ...data }];

        __setGrid(_grid.current._content);
    }, []);

    /**
     * only pagination = in | false
     * handle delete
     */
    const handleClickDelete = React.useCallback((type: any) => {
        if (_grid.current._pagination === "out") return;
        if (!type) return;

        /** row */
        if (typeof type === "object" && type.__key) {
            _grid.current._content = _grid.current._content
                .map((_: any) => {
                    if (_.__key === type.__key) {
                        if (_.__type === "added") return undefined;
                        return { ..._, __type: "deleted" };
                    } else {
                        return _;
                    }
                })
                .filter((_: any) => _ !== undefined);

            __setGrid(_grid.current._content);
            return;
        }
        /** row array */
        if (Array.isArray(type)) {
            if (!type.length) return;
            _grid.current._content = _grid.current._content
                .map((_: any) => {
                    if (type.map((_: any) => _.__key).includes(_.__key)) {
                        if (_.__type === "added") return undefined;
                        return { ..._, __type: "deleted" };
                    } else {
                        return _;
                    }
                })
                .filter((_: any) => _ !== undefined);

            __setGrid(_grid.current._content);
            return;
        }
        /**
         * both radio, checkbox
         */
        if (type === "all") {
            const c = _grid.current._checked;
            const s = _grid.current._selectedRow;
            const a = [...c, s].filter((_) => _);

            if (!a.length) return;

            _grid.current._content = _grid.current._content
                .map((_: any) => {
                    if (a.map((_: any) => _.__key).includes(_.__key)) {
                        if (_.__type === "added") return undefined;
                        return { ..._, __type: "deleted" };
                    } else {
                        return _;
                    }
                })
                .filter((_: any) => _ !== undefined);
            _setSelectedRow(null);
            _setChecked([]);

            __setGrid(_grid.current._content);
            return;
        }
        /** radio */
        if (type === "radio") {
            if (!_grid.current._selectedRow) return;
            _grid.current._content = _grid.current._content
                .map((_: any) => {
                    if (_.__key === _grid.current._selectedRow.__key) {
                        if (_.__type === "added") return undefined;
                        return { ..._, __type: "deleted" };
                    } else {
                        return _;
                    }
                })
                .filter((_: any) => _ !== undefined);
            _setSelectedRow(null);

            __setGrid(_grid.current._content);
            return;
        }
        /** checkbox */
        if (type === "checkbox") {
            if (!_grid.current._checked.length) return;
            _grid.current._content = _grid.current._content
                .map((_: any) => {
                    if (_grid.current._checked.map((_: any) => _.__key).includes(_.__key)) {
                        if (_.__type === "added") return undefined;
                        return { ..._, __type: "deleted" };
                    } else {
                        return _;
                    }
                })
                .filter((_: any) => _ !== undefined);
            _setChecked([]);

            __setGrid(_grid.current._content);
            return;
        }
    }, []);

    /** handle page */
    const handleChangePage = React.useCallback((next: any) => {
        _grid.current._checked = [];
        _grid.current._selectedRow = null;

        _grid.current._page = next;

        _setPage(next);
        _setChecked([]);
        _setSelectedRow(null);

        if (_grid.current._pagination === "in") {
            __setGrid(_grid.current._content);
        }

        if (_grid.current._pagination === "out") {
            _grid.current._setPage(next);
        }
    }, []);

    /** handle size */
    const handleChangeSize = React.useCallback((next: any) => {
        _grid.current._checked = [];
        _grid.current._selectedRow = null;

        _grid.current._page = 0;
        _grid.current._size = next;
        _setPage(0);
        _setSize(next);
        _setChecked([]);
        _setSelectedRow(null);

        if (_grid.current._pagination === "in") {
            __setGrid(_grid.current._content);
        }

        if (_grid.current._pagination === "out") {
            _grid.current._setPage(0);
            _grid.current._setSize(next);
        }
    }, []);

    /** handle check all */
    const handleCheckAll = React.useCallback((e: any) => {
        if (e.target.checked) {
            _grid.current._checked = _grid.current._paged;
            _setChecked(_grid.current._paged);
        } else {
            _grid.current._checked = [];
            _setChecked([]);
        }
    }, []);

    /** handle check */
    const handleCheck = React.useCallback((e: any, rowProps: any) => {
        if (e.target.checked) {
            _setChecked((prev) => {
                const next = [...prev, rowProps];
                _grid.current._checked = next;
                return next;
            });
        } else {
            _setChecked((prev) => {
                const next = prev.filter(({ __key }) => __key !== rowProps.__key);
                _grid.current._checked = next;
                return next;
            });
        }
    }, []);

    /** handle select */
    const handleSelect = React.useCallback((e: any, rowProps: any) => {
        if (e.target.checked) {
            _grid.current._selectedRow = rowProps;
            _setSelectedRow(rowProps);
        } else {
            _grid.current._selectedRow = null;
            _setSelectedRow(null);
        }
    }, []);

    /** handle sort */
    const handleSort = React.useCallback((binding: any) => {
        let _ = _grid.current._sort;

        /** prev */
        const prev = _[binding];

        if (prev) {
            const pval = prev.val;
            const pseq = prev.seq;

            if (pval === "asc") {
                _[binding] = {
                    seq: pseq,
                    val: "desc",
                };
            }

            if (pval === "desc") {
                delete _[binding];
            }
        } else {
            const seqs = Object.entries(_)
                .map(([__, v]: any) => v?.seq)
                .filter((_) => _ !== undefined);
            const nseq = seqs.length === 0 ? 0 : Math.max(...seqs) + 1;
            _[binding] = {
                seq: nseq,
                val: "asc",
            };
        }

        _ = Object.fromEntries(
            lodash
                .sortBy(Object.entries(_), [
                    (a: any) => {
                        return a[1].seq;
                    },
                ])
                .map(([k, v]: any, i: any) => {
                    return [k, { ...v, seq: i }];
                }),
        );

        _grid.current._sort = _;

        _setSort(_grid.current._sort);
        __setGrid(_grid.current._content);
    }, []);

    const __setGrid = (content: any, total?: any) => {
        /**
         * 삭제된 데이터 배열에서 제거
         */
        let view = content.filter(({ __type }: any) => __type !== "deleted");

        /**
         * 그룹화, 정렬
         * Group & Sort
         */
        view = returnGrouped(view);

        /**
         *
         */
        _setTotalCount(total || view.length);

        /**
         *
         */
        view = returnPaged(view);

        if (view) {
            _setTest(view);
            return;
        } else {
            if (_grid.current._page === 0) {
                _setTest([]);
                return;
            }
            const next = _grid.current._page - 1;
            _grid.current._page = next;
            _setPage(next);
            return;
        }
    };

    const returnGrouped = React.useCallback((d: any) => {
        const hasGroup = !!_grid.current._group;

        if (!hasGroup) {
            return returnSorted(d);
        }

        if (hasGroup) {
            const groups = lodash.sortBy(Object.entries<any>(_grid.current._group), [
                (o: any) => {
                    return o[1].seq;
                },
            ]);

            const getGrouped = (data: any, by: any, prevDepth: any, prevParent: any, prevGroupKey: any): any => {
                if (!by) return returnSorted(data);

                const depth = prevDepth + 1;
                const parent = [...prevParent, by];

                return Object.entries(lodash.groupBy(data, by[0])).reduce((p: any, c: any) => {
                    if (c[0] === "undefined") return c[1];

                    const groupKey = prevGroupKey + "__" + c[0];

                    if (_grid.current._groupStatus[groupKey] === undefined) {
                        _grid.current._groupStatus[groupKey] = { open: true };
                    }

                    const open = _grid.current._groupStatus[groupKey].open;

                    const row = {
                        __key: uuid(),
                        __type: "group",
                        open,
                        depth,
                        groupKey,
                        value: c[0],
                        binding: by[0],
                        count: c[1].length,
                    };

                    if (open) {
                        return [...p, row, ...getGrouped(c[1], groups[depth], depth, parent, groupKey)];
                    } else {
                        return [...p, row];
                    }
                }, []);
            };

            return getGrouped(d, groups[0], 0, [], "");
        }
    }, []);

    const toggleGroup = React.useCallback((groupKey: any, open: any) => {
        _grid.current._groupStatus[groupKey] = { ..._grid.current._groupStatus[groupKey], open };
        __setGrid(_grid.current._content);
    }, []);

    const returnPaged = React.useCallback((d: any) => {
        if (_grid.current._pagination === "in") {
            return lodash.chunk(d, _grid.current._size)[_grid.current._page] || [];
        }

        if (
            _grid.current._pagination === "out" ||
            _grid.current._pagination === false ||
            _grid.current._pagination === undefined
        ) {
            return d;
        }
    }, []);

    const returnSorted = React.useCallback((d: any) => {
        const [iteratees, orders] = lodash
            .sortBy(Object.entries(_grid.current._sort), [
                (o: any) => {
                    return o[1].seq;
                },
            ])
            .reduce(
                (p: any, c: any) => {
                    return [
                        [...p[0], c[0]],
                        [...p[1], c[1].val],
                    ];
                },
                [[], []],
            );

        return lodash.orderBy(d, iteratees, orders);
    }, []);

    /** initialize */
    React.useEffect(() => {
        _grid.current._setData = setData;
        _grid.current._setEdit = setEdit;
        _grid.current._setShow = setShow;
        _grid.current._setOption = setOption;
        _grid.current._resetData = resetData;
        _grid.current._handleCheck = handleCheck;
        _grid.current._handleSelect = handleSelect;
        _grid.current._handleUpdate = handleUpdate;
        _grid.current._handleClickAdd = handleClickAdd;
        _grid.current._handleClickDelete = handleClickDelete;
        _grid.current._handleChangePage = handleChangePage;
        _grid.current._handleChangeSize = handleChangeSize;

        _grid.current._initialized = true;

        return () => {};
    }, []);

    const heads = fun(_head);
    const bodies = fun(_body);

    const getGridWidths = () => {
        let w = Array(heads[0].length);

        for (let i = 0; i < heads.length; i++) {
            for (let j = 0; j < heads[i].length; j++) {
                if (w[j] === undefined) w[j] = 100;
                if (heads[i]?.[j]?.width !== undefined && heads[i]?.[j]?.colspan !== undefined) {
                    for (let k = j; k <= j + heads[i]?.[j]?.colspan; k++) {
                        if (k < heads[0].length) {
                            w[k] = heads[i]?.[j]?.width / heads[i]?.[j]?.colspan;
                        }
                    }
                }
                if (heads[i]?.[j]?.width !== undefined && heads[i]?.[j]?.colspan === undefined) {
                    w[j] = heads[i]?.[j].width;
                }
                if (heads[i]?.[j]?.show === false) {
                    w[j] = null;
                }
            }
        }

        console.log(w);

        return w
            .filter((_: any) => _)
            .map((_: any) => {
                if (typeof _ === "number") {
                    return `${_}px`;
                }
                if (typeof _ === "string") {
                    if (_.endsWith("*")) {
                        return `${_.slice(0, -1) || 1}fr`;
                    }
                }
            })
            .join(" ");
    };

    const gridTemplateColumns = getGridWidths();

    return (
        <div>
            {/* button */}
            <div className="flex justify-between">
                <div className="flex gap-1 [&_*]:mb-2">
                    {_options.importExcel && <Button>Import</Button>}
                    {_options.exportExcel && <Button>Export</Button>}
                </div>

                <div className="flex gap-1 [&_*]:mb-2">
                    {_options.add && <Button onClick={() => handleClickAdd()}>add</Button>}
                    {_options.delete && <Button onClick={() => handleClickDelete("all")}>delete</Button>}
                </div>
            </div>

            <div className="w-full mb-2 flex flex-col bg-uf-border">
                {/* head */}
                <div
                    ref={(node) => (_grid.current._head = node)}
                    className="uf-grid-head flex w-full gap-[1px] border-b border-l border-l-uf-card-background sticky top-0 bg-uf-border z-10 overflow-x-auto"
                >
                    {/* group */}
                    {Object.keys(_grid.current._groupStatus).length > 0 && <div className="uf-grid-option" />}
                    {/* checkbox */}
                    {_options.checkbox && (
                        <div className="uf-grid-option">
                            <input
                                type="checkbox"
                                checked={_test.every(({ __key }: any) =>
                                    _checked.some((row: any) => row.__key === __key),
                                )}
                                onChange={handleCheckAll}
                            />
                        </div>
                    )}
                    {/* radio */}
                    {_options.radio && <div className="uf-grid-option" />}
                    {/* index */}
                    {_options.index && <div className="uf-grid-option" />}
                    {/* header */}
                    <div className="grid w-full gap-[1px]" style={{ gridTemplateColumns }}>
                        {heads.map((row: any, rowIndex: any) => {
                            return row.map((cel: any, colIndex: any) => {
                                if (!cel) return null;
                                if (cel.show === false) return null;

                                return (
                                    <div
                                        key={_grid.current._key + ".gh." + rowIndex + "." + colIndex}
                                        className="p-1 bg-uf-card-header min-h-[2.5rem] flex items-center justify-center"
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
                                    </div>
                                );
                            });
                        })}
                    </div>
                </div>
                <List
                    ref={(ref) => (_grid.current._list = ref)}
                    outerRef={(node) => {
                        if (node) {
                            node.onscroll = (event: any) => {
                                _grid.current._head.scrollTo({ left: event.currentTarget.scrollLeft });
                            };
                        }
                    }}
                    itemCount={_test.length > _totalCount ? _totalCount : _test.length}
                    height={_grid.current._height}
                    width="100%"
                    itemData={{
                        _grid,
                        /** option */
                        ..._options,
                        /** handler */
                        render,
                        onCellClick,
                        onRowClick,
                        /** state */
                        _test,
                        bodies,
                        _page,
                        _size,
                        _checked,
                        _selectedRow,
                        _selectedCel,
                        _setSelectedCel,
                        _editingRow,
                        _totalCount,

                        /** g */
                        toggleGroup,
                        gridTemplateColumns,
                        /** grid */
                        // _bo,
                    }}
                    itemSize={(index) =>
                        _grid.current._rect[index]?.["height"] + 1 || _grid.current._rect[0]?.["height"] + 1 || 0
                    }
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
                    totalCount={_totalCount}
                />
            )}
        </div>
    );
};

/** row */
const Row = React.memo((props: any) => {
    const { data, index: rowIndex, style } = props;

    const {
        _grid,
        /** option */
        index,
        checkbox,
        radio,
        /** handler */
        render,
        onCellClick,
        onRowClick,
        /** state */
        _test,
        bodies,
        _page,
        _size,
        _checked,
        _selectedRow,
        _selectedCel,
        _setSelectedCel,
        _editingRow,
        _totalCount,
        /** gtest */
        toggleGroup,
        gridTemplateColumns,
    } = data;

    const row = _test[rowIndex];

    const rowKey = _grid.current._key + "." + rowIndex;
    const rowType = row?.__type;
    const contentKey = row?.__key;

    const ref = React.useRef<any>();

    React.useEffect(() => {
        _grid.current._rect[rowIndex] = ref.current.getBoundingClientRect();
        _grid.current._list.resetAfterIndex(rowIndex);
    }, [_test, bodies]);

    return (
        <div style={{ ...style }}>
            {rowType === "group" && (
                <div ref={ref} className="flex items-center h-[2.5rem] border-l border-l-uf-card-background">
                    {row.depth > 0 && <div style={{ width: `${row.depth * 2}rem` }} />}
                    <button
                        className="flex items-center justify-center w-[2rem] h-full"
                        onClick={() => toggleGroup(row.groupKey, !row.open)}
                    >
                        <Icon icon="down" size="xs" className={classNames({ "rotate-180": row.open })} />
                    </button>
                    <div className="px-1">{`${row.binding}가 ${row.value}이고 ${row.count}개`}</div>
                </div>
            )}
            {rowType !== "group" && (
                <div
                    ref={ref}
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
                    {Object.keys(_grid.current._groupStatus).length > 0 && (
                        <div className="min-w-[2rem] max-w-[2rem]" />
                    )}
                    {checkbox && (
                        <div className="uf-grid-option">
                            <input
                                type="checkbox"
                                checked={_checked.some(({ __key }: any) => __key === contentKey)}
                                onChange={(e) => _grid.current._handleCheck(e, row)}
                            />
                        </div>
                    )}
                    {radio && (
                        <div className="uf-grid-option">
                            <input
                                type="radio"
                                checked={_selectedRow?.__key === row?.__key}
                                onChange={(e) => _grid.current._handleSelect(e, row)}
                            />
                        </div>
                    )}
                    {index && (
                        <div className="uf-grid-option font-semibold">
                            {index === "DESC" ? _totalCount - (_page * _size + rowIndex) : _page * _size + rowIndex + 1}
                        </div>
                    )}
                    {/* body columns */}
                    <div className="grid w-full gap-[1px]" style={{ gridTemplateColumns }}>
                        {bodies.map((_: any, rowIndex: any) => {
                            return _.map((__: any, colIndex: any) => {
                                if (!__) return null;
                                if (__.show === false) return null;

                                const celKey = contentKey + ".gb." + rowIndex + "." + colIndex;
                                const binding = __.binding;
                                const value = row[binding];
                                const ov = _grid.current._origin.find(({ __key }: any) => __key === contentKey)?.[
                                    binding
                                ];
                                const o = {
                                    type: __.type,
                                    /** text */
                                    mask: __.mask,
                                    letterCase: __.letterCase,
                                    /** */
                                    rows: __.rows,
                                    /** number */
                                    decimalScale: __.decimalScale,
                                    thousandSeparator: __.thousandSeparator,
                                    /** code */
                                    area: __.area,
                                    comnCd: __.comnCd,
                                    /** */
                                    options: __.options,
                                    /** rules */
                                    min: __.min,
                                    max: __.max,
                                    minLength: __.minLength,
                                    pattern: __.pattern,
                                    validate: __.validate,
                                    required: __.required,
                                    maxLength: __.maxLength,
                                    /** */
                                    rightButton: __.rightButton && {
                                        ...__.rightButton,
                                        onClick:
                                            __.rightButton.onClick &&
                                            (() =>
                                                __.rightButton.onClick({
                                                    value: value,
                                                    rowValues: row,
                                                    binding: binding,
                                                })),
                                    },
                                    leftButton: __.leftButton && {
                                        ...__.leftButton,
                                        onClick:
                                            __.leftButton.onClick &&
                                            (() =>
                                                __.leftButton.onClick({
                                                    value: value,
                                                    rowValues: row,
                                                    binding: binding,
                                                })),
                                    },
                                };
                                const vv = comnUtils.getViewValue(value, o);
                                const fv = comnUtils.getFormattedValue(value, o);
                                const uv = comnUtils.getUnformattedValue(value, o);
                                const vldv = comnUtils.getValidatedValue(uv, o);
                                const edit = _editingRow.includes(contentKey) ? true : __.edit;

                                return (
                                    <div
                                        key={celKey}
                                        className={classNames(
                                            "p-1 bg-uf-card-background min-h-[2.5rem] flex items-center border border-uf-card-background aria-selected:border-uf-info aria-[invalid=true]:border-uf-error",
                                            (__.align === "start" || __.align === "left") && "justify-start",
                                            (__.align === "end" || __.align === "right") && "justify-end",
                                            (__.align === "center" || __.align === undefined) && "justify-center",
                                        )}
                                        {...(vldv && { "aria-invalid": true })}
                                        {...(_selectedCel === celKey && { "aria-selected": true })}
                                        style={{
                                            gridRow: `${rowIndex + 1} / span ${__.rowspan ?? 1}`,
                                            gridColumn: `${colIndex + 1} / span ${__.colspan ?? 1}`,
                                        }}
                                        onClick={() => {
                                            _setSelectedCel(celKey);
                                            _grid.current._selectedCel = {
                                                binding: binding,
                                                value: uv,
                                                formattedValue: fv,
                                                rowValues: row,
                                            };

                                            /** on cell click */
                                            if (onCellClick?.[binding])
                                                onCellClick?.[binding]({
                                                    binding: binding,
                                                    value: uv,
                                                    formattedValue: fv,
                                                    rowValues: row,
                                                });
                                        }}
                                    >
                                        {!edit &&
                                            (render?.cell?.[binding]?.({
                                                value: value,
                                                rowValues: row,
                                                binding: binding,
                                            }) || (
                                                <FormControl
                                                    {...o}
                                                    edit={false}
                                                    value={fv}
                                                    onChange={(v) => {
                                                        _grid.current._handleUpdate({
                                                            ...row,
                                                            [binding]: comnUtils.getUnformattedValue(v, o),
                                                        });
                                                    }}
                                                />
                                            ))}
                                        {edit &&
                                            (render?.edit?.[binding]?.({
                                                value: value,
                                                rowValues: row,
                                                binding: binding,
                                            }) || (
                                                <FormControl
                                                    {...o}
                                                    value={fv}
                                                    onChange={(v) => {
                                                        _grid.current._handleUpdate({
                                                            ...row,
                                                            [binding]: comnUtils.getUnformattedValue(v, o),
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

/** set width */
// const setWidth = (col: any, diff: any) => {
//     const rects = _grid.current._headRects;
//     const rect = rects[col];
//     const next = rect.width + diff < 80 ? 80 : rect.width + diff;

//     _setHead((prev: any) => {
//         return prev.map((_: any, index: any) => {
//             if (!rects[index]) return _;
//             const { flex, ...rest } = _;

//             if (index !== col) {
//                 const w = rects[index].width;
//                 return { ...rest, width: w, minWidth: w, maxWidth: w };
//             }

//             if (index === col) {
//                 return { ...rest, minWidth: next, width: next, maxWidth: next };
//             }
//         });
//     });

//     _setBody((prev: any) => {
//         return prev.map((_: any, index: any) => {
//             if (!rects[index]) return _;
//             const { flex, ...rest } = _;

//             if (index !== col) {
//                 const w = rects[index].width;
//                 return { ...rest, width: w, minWidth: w, maxWidth: w };
//             }

//             if (index === col) {
//                 return { ...rest, minWidth: next, width: next, maxWidth: next };
//             }
//         });
//     });
// };
