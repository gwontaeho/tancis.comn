import '@grapecity/wijmo.styles/wijmo.css'
import './Wijmo.css'

import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import lodash from 'lodash'
import { useTranslation } from 'react-i18next'

import * as wjGrid from '@grapecity/wijmo.react.grid.multirow'
import { Selector } from '@grapecity/wijmo.grid.selector'
import * as wjcXlsx from '@grapecity/wijmo.xlsx'
import * as wjcGridXlsx from '@grapecity/wijmo.grid.xlsx'
import { Pagination, Button, Icon, FormControl, Tree } from '@/comn/components'
import { InputDate, InputTime, InputDateTime, InputNumber, InputMask, ComboBox } from '@grapecity/wijmo.input'

import { WijmoSchemaType, WijmoHeadType, WijmoBodyType, useTheme } from '@/comn/hooks'
import dayjs from 'dayjs'
import { setLicenseKey } from '@grapecity/wijmo'
setLicenseKey(
    'singlewindow.info,725598597875341#B0JoIIyVmdiwSZzxWYmpjIyNHZisnOiwmbBJye0ICRiwiI34zZ7h5LFhFdKFUa6czTpd4SCFFb7YXZ8V4KDZGV9A7MRxWSllkaitiSjh4cCBlWSZENWdmNzNUeItEdtV5L6ZlcxN7M8hjb0R6V8czQyBFNSZXd6kkW62mR8FXN8tCT6hTSxxkeNFzNz3meLRkRDdHU6AnTu9WNZJkURVFMyoGSzUGT5k6VwATQw2SYwknQvJUMXxkMQtCZNZme8k6cWtSOuNEWzpXWBJFblxGT5Vma4IXOLdVW9F7U4cXdaVjTrQ7UJRUZIJVZzN7KxQjMzgkdCZGZlJHMpNlQt9WVOdzTpJXe9MUMCFTbmRjc9AFTzMlWCJWWOhXM6RmQjhFWvh5N6FDbIpkVaF5TEB5ZzVGcNFVRotGR9VldnFjc7QUO5l7NK56alJVdKpnSK3Wd0J4VDhTYTlDZu56KzdkZhVGdjV6RycjUMlWcrVzRiBDbS9GestSZENkI0IyUiwiI5QjMyIkMFFjI0ICSiwCMxgDNxAzMzEjM0IicfJye35XX3JSSwIjUiojIDJCLi86bpNnblRHeFBCI4VWZoNFelxmRg2Wbql6ViojIOJyes4nI5kkTRJiOiMkIsIibvl6cuVGd8VEIgIXZ7VWaWRncvBXZSBybtpWaXJiOi8kI1xSfis4N8gkI0IyQiwiIu3Waz9WZ4hXRgAydvJVa4xWdNBybtpWaXJiOi8kI1xSfiQjR6QkI0IyQiwiIu3Waz9WZ4hXRgACUBx4TgAybtpWaXJiOi8kI1xSfiMzQwIkI0IyQiwiIlJ7bDBybtpWaXJiOi8kI1xSfiUFO7EkI0IyQiwiIu3Waz9WZ4hXRgACdyFGaDxWYpNmbh9WaGBybtpWaXJiOi8kI1tlOiQmcQJCLiYjMzMjNwAyNyETMzIDMyIiOiQncDJCLi2mZulmL73GZul6dlx6Zul6ciojIz5GRiwiIMqZ1pWZ1weJ1BiJ14qJ1de004O10VCK1pWZ1FKK18SI1ASr0ACr0tWr0iojIh94QiwiIxQzM5cDO7kTN8kTN5IzNiojIklkIs4XXbpjInxmZiwiIxY7MJAYM'
)
// type WijmoOptionType = {
//     checkbox?: boolean;
//     pagination?: "in" | "out";
//     add?: boolean;
//     remove?: boolean;
//     isReadOnly?: boolean;
// };

type DataType = {
    page: number
    size: number
    totCnt: number
    content: Record<string, any>[]
}

type wijmoProps = {
    data?: DataType
    gridRef: any
    contentRef: any
    schema: WijmoSchemaType
    onSelect?: Function
    size: number
    page: number
    setSize: React.Dispatch<React.SetStateAction<number>>
    setPage: React.Dispatch<React.SetStateAction<number>>
}

export const Wijmo = (props: wijmoProps) => {
    const { gridRef, contentRef, schema, data, size, page, setSize, setPage } = props

    const {
        theme: { lang },
    } = useTheme()

    const { t } = useTranslation()

    const [totalCount, setTotalCount] = useState<number>()
    const [_page, _setPage] = useState<number>(0)
    const [_size, _setSize] = useState<number>(10)

    useEffect(() => {
        // 1. initialize
        if (schema.options?.isReadOnly) gridRef.current.control.isReadOnly = true
        if (schema.options?.checkbox) new Selector(gridRef.current.control)
        // gridRef.current.control.layoutDefinition = layoutDefinition(schema.body);

        // gridRef.current.control.hostElement.addEventListener("click", (e: any) => {
        //     const a = gridRef.current.control.hitTest(e);
        //     console.log(a);
        // });

        gridRef.current.control.selectionMode = 'Row'
        gridRef.current.control.formatItem.addHandler(handleFormatItem)
        gridRef.current.control.itemsSourceChanged.addHandler(handleItemsSourceChanged)
    }, [])

    useEffect(() => {
        gridRef.current.control.headerLayoutDefinition = headerLayoutDefinition(schema.head)
    }, [lang])

    useEffect(() => {
        if (data === undefined) return
        // 2. data setting
        const content = data.content.map((_, i) => ({
            ..._,
            __type: 'origin',
            __index: uuid(),
        }))
        contentRef.current = lodash.cloneDeep(content)
        gridRef.current.control.itemsSource = lodash.cloneDeep(content)
        setTotalCount(schema.options?.pagination === 'in' ? content.length : data.totCnt)
    }, [data])

    useEffect(() => {
        if (!gridRef.current.control.collectionView) return
        if (schema.options?.pagination !== 'in') return
        gridRef.current.control.collectionView.moveToPage(_page)
    }, [_page])

    useEffect(() => {
        if (!gridRef.current.control?.collectionView) return
        if (schema.options?.pagination !== 'in') return
        gridRef.current.control.collectionView.pageSize = _size
    }, [_size])

    const handleFormatItem = (m: any, e: any) => {
        if (m.cells !== e.panel) return
        const cellType = e.getRow().dataItem['__type']
        if (cellType === 'added') return e.cell.classList.add('cell-added')
        const cellBinding = e.getColumn().binding
        const cellValue = e.getRow().dataItem[cellBinding]
        const cellIndex = e.getRow().dataItem['__index']
        const originValue = contentRef.current?.find((origin: any) => origin.__index === cellIndex)[cellBinding]
        if (cellValue !== originValue) return e.cell.classList.add('cell-changed')
    }

    const handleItemsSourceChanged = (c: any) => {
        if (schema.options?.pagination !== 'in') return
        if (!c.collectionView) return
        c.collectionView.collectionChanged.addHandler((cv: any) => {
            setTotalCount(cv.totalItemCount)
        })
    }

    const handleChangePage = (nextPage: number) => {
        if (schema.options?.pagination === 'in') _setPage(nextPage)
        if (schema.options?.pagination !== 'in') setPage(nextPage)
    }

    const handleChangeSize = (nextSize: number) => {
        if (schema.options?.pagination === 'in') {
            _setSize(nextSize)
            _setPage(0)
        }
        if (schema.options?.pagination !== 'in') {
            setSize(nextSize)
            setPage(0)
        }
    }

    const handleAdd = () => {
        const item = { __index: uuid(), __type: 'added' }
        gridRef.current.control.collectionView.addNew(item)
    }

    const handleRemove = () => {
        const checked = gridRef.current.control.rows
            .filter((r: any) => r.isSelected)
            .map((r: any) => r.dataIndex)
            .sort((a: number, b: number) => b - a)
        checked.forEach((index: number) => {
            gridRef.current.control.collectionView.removeAt(index)
        })
    }

    const headerLayoutDefinition = (head: WijmoHeadType) => {
        return head.map((_) => {
            return {
                ..._,
                cells: _.cells.map((__) => {
                    return { ...__, header: t(__.header) }
                }),
            }
        })
    }

    // const layoutDefinition = (body: WijmoBodyType) => {
    //     return body.map((_) => {
    //         return {
    //             ..._,
    //             cells: _.cells.map((__) => {
    //                 const { type, onClick, ...___ } = __;
    //                 return { ...___ };
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
            'FlexGrid.xlsx'
        )
    }

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

            <wjGrid.MultiRow ref={gridRef}>
                {schema.body.map((props, i) => {
                    const { colspan, cells } = props
                    return (
                        <wjGrid.MultiRowCellGroup key={'wijmo.' + schema.id + '.' + i} colspan={colspan}>
                            {cells.map((cellProps, ii) => {
                                return (
                                    <wjGrid.MultiRowCell
                                        key={'wijmo.' + schema.id + '.' + i + '.' + ii}
                                        colspan={cellProps.colspan}
                                        binding={cellProps.binding}
                                    >
                                        <wjGrid.MultiRowCellTemplate
                                            cellType="Cell"
                                            template={(ctx: any) => {
                                                const { __index, __type, ...data } = ctx.item
                                                return (
                                                    <div onClick={() => cellProps.onClick?.(data)}>
                                                        {ctx.item[cellProps.binding]}
                                                    </div>
                                                )
                                            }}
                                        />
                                        <wjGrid.MultiRowCellTemplate
                                            cellType="CellEdit"
                                            template={(ctx: any) => {
                                                const { type } = cellProps
                                                const { item, value } = ctx
                                                console.log(ctx)

                                                const handleChange = (e: any) => {
                                                    ctx.value = e.target.value
                                                }
                                                return (
                                                    <div className="h-9 px-1 flex items-center justify-center">
                                                        <FormControl type={type} onChange={handleChange} />
                                                    </div>
                                                )
                                            }}
                                        />
                                    </wjGrid.MultiRowCell>
                                )
                            })}
                            <wjGrid.MultiRowCell>
                                <wjGrid.MultiRowCellTemplate cellType="Cell" />
                            </wjGrid.MultiRowCell>
                        </wjGrid.MultiRowCellGroup>
                    )
                })}
            </wjGrid.MultiRow>

            {schema.options?.pagination && (
                <Pagination
                    page={schema.options?.pagination === 'in' ? _page : page}
                    size={schema.options?.pagination === 'in' ? _size : size}
                    onChangePage={handleChangePage}
                    onChangeSize={handleChangeSize}
                    totalCount={totalCount}
                />
            )}
        </div>
    )
}
