import React from "react";
import classNames from "classnames";
import { Button } from "./Button";
import { JUSTIFY_CONTENT, DIRECTION, GAP, WIDTH } from "../features/foundation";

type LayoutProps = {
    children?: React.ReactNode;
    gap?: keyof typeof GAP;
    size?: keyof typeof WIDTH;
    direction?: keyof typeof DIRECTION;
    align?: keyof typeof JUSTIFY_CONTENT;
};

/**
 * # Layout
 *
 * * LayoutLeft
 * * LayoutRight
 *
 * @param props LayoutProps
 * @returns
 */
export const Layout = (props: LayoutProps) => {
    const { children, direction = "row", gap = 1, size, align = "start" } = props;

    return (
        <div
            className={classNames(
                "uf-layout",
                GAP[gap],
                size && WIDTH[size],
                DIRECTION[direction],
                direction === "row" && JUSTIFY_CONTENT[align],
            )}
        >
            {children}
        </div>
    );
};

const LayoutLeft = (props: Omit<LayoutProps, "direction">) => {
    const { children, gap = 1, size } = props;

    return <div className={classNames("uf-layout-left", size && WIDTH[size], GAP[gap])}>{children}</div>;
};

const LayoutRight = (props: Omit<LayoutProps, "direction">) => {
    const { children, gap = 1, size } = props;

    return <div className={classNames("uf-layout-right", size && WIDTH[size], GAP[gap])}>{children}</div>;
};

Layout.Left = LayoutLeft;
Layout.Right = LayoutRight;
Layout.Button = Button;
