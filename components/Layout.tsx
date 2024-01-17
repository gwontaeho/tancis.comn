import React from "react";
import classNames from "classnames";
import { Button } from "./Button";

const GAPS = {
    1: "gap-1",
    2: "gap-2",
    4: "gap-4",
    8: "gap-8",
    16: "gap-16",
};

const SIZES = {
    1: "w-1/12",
    2: "w-2/12",
    3: "w-3/12",
    4: "w-4/12",
    5: "w-5/12",
    6: "w-6/12",
    7: "w-7/12",
    8: "w-8/12",
    9: "w-9/12",
    10: "w-10/12",
    11: "w-11/12",
    12: "w-full",
    fit: "w-fit",
    full: "w-full",
};

type LayoutProps = {
    children?: React.ReactNode;
    direction?: "col" | "row";
    gap?: keyof typeof GAPS;
    size?: keyof typeof SIZES;
};

export const Layout = (props: LayoutProps) => {
    const { children, direction = "col", gap } = props;
    const isRow = direction === "row";
    return (
        <div
            className={classNames("uf-layout", gap && GAPS[gap], {
                "flex-col": !isRow,
            })}
        >
            {children}
        </div>
    );
};

const LayoutLeft = (props: LayoutProps) => {
    const { children, direction = "col", gap, size } = props;

    return <div className={classNames("uf-layout-left", size && SIZES[size])}>{children}</div>;
};

const LayoutRight = (props: LayoutProps) => {
    const { children, direction = "col", gap, size } = props;

    return <div className={classNames("uf-layout-right", size && SIZES[size])}>{children}</div>;
};

Layout.Left = LayoutLeft;
Layout.Right = LayoutRight;
Layout.Button = Button;
