import React from "react";
import classNames from "classnames";
import { Button } from "./Button";
import { DIRECTION, GAP, WIDTH } from "../features/foundation";

type LayoutProps = {
    children?: React.ReactNode;
    direction?: keyof typeof DIRECTION;
    size?: keyof typeof WIDTH;
    gap?: keyof typeof GAP;
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
    const { children, direction = "row", gap = 1, size } = props;

    return (
        <div className={classNames("uf-layout", size && WIDTH[size], GAP[gap], DIRECTION[direction])}>{children}</div>
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
