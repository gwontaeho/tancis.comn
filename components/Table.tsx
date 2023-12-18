import React from 'react'
import classNames from 'classnames'

type TableProps = {
    children?: React.ReactNode
    border?: boolean
}

type TrProps = {
    children?: React.ReactNode
}

type TableCellProps = {
    children?: React.ReactNode
    required?: boolean
    colSpan?: number
    rowSpan?: number
    width?: string | number
}

export const Table = (props: TableProps) => {
    const { children, border = true } = props

    return (
        <table
            className={classNames('table-fixed w-full [&_th]:h-10 [&_th]:bg-header [&_td]:h-10 [&_td]:p-1 [&_th]:p-1', {
                '[&_th]:border [&_td]:border [&_tr]:border': border,
            })}
        >
            <tbody>{children}</tbody>
        </table>
    )
}

const Tr = (props: TrProps) => {
    const { children } = props
    return <tr>{children}</tr>
}

const Th = (props: TableCellProps) => {
    const { children, required, colSpan, rowSpan, width } = props
    return (
        <th className="relative" colSpan={colSpan} rowSpan={rowSpan} style={{ width }}>
            {children}
            {required && (
                <span
                    className={classNames('text-invalid ml-0.5', {
                        'absolute top-0 right-0.5': typeof children !== 'string',
                    })}
                >
                    *
                </span>
            )}
        </th>
    )
}

const Td = (props: TableCellProps) => {
    const { children, required, colSpan, rowSpan, width } = props
    return (
        <td className="relative" colSpan={colSpan} rowSpan={rowSpan} style={{ width }}>
            {children}
            {required && (
                <span
                    className={classNames('text-invalid ml-0.5', {
                        'absolute top-0 right-0.5': typeof children !== 'string',
                    })}
                >
                    *
                </span>
            )}
        </td>
    )
}

Table.Tr = Tr
Table.Th = Th
Table.Td = Td
