import React from "react";
import classNames from "classnames";

const GAPS = {
    1: {
        col: "space-y-1",
        row: "space-x-1",
    },
    2: {
        col: "space-y-2",
        row: "space-x-2",
    },
    4: {
        col: "space-y-4",
        row: "space-x-4",
    },
    8: {
        col: "space-y-8",
        row: "space-x-8",
    },
    16: {
        col: "space-y-16",
        row: "space-x-16",
    },
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
            className={classNames("flex", gap && GAPS[gap][direction], {
                "flex-col": !isRow,
            })}
        >
            {children}
        </div>
    );
};

const LayoutLeft = ({ children }: LayoutProps) => {
    return <div className="w-full flex space-x-1">{children}</div>;
};

const LayoutCenter = ({ children }: LayoutProps) => {
    return <div className="w-full max-w-fit flex space-x-1 justify-center">{children}</div>;
};

const LayoutRight = ({ children }: LayoutProps) => {
    return <div className="w-full flex justify-end space-x-1">{children}</div>;
};

Layout.Left = LayoutLeft;
Layout.Right = LayoutRight;
Layout.Center = LayoutCenter;
