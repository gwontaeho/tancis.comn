import React from "react";
import classNames from "classnames";

type TableProps = {
    children?: React.ReactNode;
    before?: React.ReactNode;
    border?: boolean;
    className?: string;
};

type TrProps = {
    children?: React.ReactNode;
    header?: boolean;
};

type TableCellProps = {
    children?: React.ReactNode;
    required?: boolean;
    colSpan?: number;
    rowSpan?: number;
    colspan?: number;
    rowspan?: number;
    width?: string | number;
};

export const Table = (props: TableProps) => {
    const { children, className, border = true, before } = props;

    return (
        <table
            className={classNames(
                "table-fixed w-full [&_th]:bg-uf-card-header [&_tr]:h-10 [&_td]:p-1 [&_th]:p-1 [&_th]:break-all [&_td]:break-all",
                {
                    "[&_th]:border [&_td]:border [&_tr]:border": border,
                },
                className,
            )}
        >
            {before}
            <tbody>{children}</tbody>
        </table>
    );
};

const Tr = (props: TrProps) => {
    const { children, header = false } = props;
    return <tr className={classNames({ "bg-uf-card-header": header })}>{children}</tr>;
};

const Th = (props: TableCellProps) => {
    const { children, required, colSpan, rowSpan, colspan, rowspan, width } = props;
    return (
        <th className="relative" colSpan={colSpan || colspan} rowSpan={rowSpan || rowspan} style={{ width }}>
            {children}
            {required && (
                <span
                    className={classNames("text-uf-error ml-0.5", {
                        "absolute top-0 right-0.5": typeof children !== "string",
                    })}
                >
                    *
                </span>
            )}
        </th>
    );
};

const Td = (props: TableCellProps) => {
    const { children, required, colSpan, colspan, rowspan, rowSpan, width } = props;
    return (
        <td className="relative" colSpan={colSpan || colspan} rowSpan={rowSpan || rowspan} style={{ width }}>
            {children}
            {required && (
                <span
                    className={classNames("text-uf-error ml-0.5", {
                        "absolute top-0 right-0.5": typeof children !== "string",
                    })}
                >
                    *
                </span>
            )}
        </td>
    );
};

Table.Tr = Tr;
Table.Th = Th;
Table.Td = Td;
