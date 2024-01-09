import React from "react";
import classNames from "classnames";

const GAPS = {
    1: "gap-1",
    2: "gap-2",
    4: "gap-4",
    8: "gap-8",
    16: "gap-16",
};

type LayoutProps = {
    children?: React.ReactNode;
    direction?: "col" | "row";
    gap?: keyof typeof GAPS;
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
    const { children, direction = "col", gap } = props;

    return <div className={classNames("uf-layout-left")}>{children}</div>;
};

const LayoutRight = (props: LayoutProps) => {
    const { children, direction = "col", gap } = props;

    return <div className={classNames("uf-layout-right")}>{children}</div>;
};

Layout.Left = LayoutLeft;
Layout.Right = LayoutRight;
