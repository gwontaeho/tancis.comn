import classNames from "classnames";
import React from "react";

const SIZES = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
};

const COLORS = {};

type TextProps = {
    children?: React.ReactNode;
    href?: string;
    underline?: boolean;
    className?: string;
    size?: keyof typeof SIZES;
};

export const Text = (props: TextProps) => {
    const { children, href, className, size } = props;

    if (href)
        return (
            <a className={classNames("text-uf-blue underline w-fit", size && SIZES[size], className)} href={href}>
                {children}
            </a>
        );

    return <span className={classNames("w-fit", size && SIZES[size], className)}>{children}</span>;
};
