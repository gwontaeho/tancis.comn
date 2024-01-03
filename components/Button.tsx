import React from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

const WIDTHS = {
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

const HEIGHTS = {
    sm: "h-7",
    lg: "h-10",
};

const VARIANTS = {
    contained: "uf-button",
    outlined: "uf-button-outlined",
    underlined: "uf-button-underlined",
};

const AS = {
    save: { label: "B_SAVE", color: "bg-info border-info" },
    list: { label: "B_LST", color: "" },
    submit: { label: "B_SBMT", color: "bg-warning border-warning" },
    search: { label: "B_SRCH", color: "bg-info border-info" },
    close: { label: "B_CLS", color: "bg-error border-error" },
    delete: { label: "B_DEL", color: "bg-error border-error" },
    reset: { label: "B_RESET", color: "bg-warning border-warning" },
    confirm: { label: "B_CFRM", color: "bg-success border-success" },
    ok: { label: "B_OK", color: "bg-success border-success" },
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    width?: keyof typeof WIDTHS;
    height?: keyof typeof HEIGHTS;
    variant?: keyof typeof VARIANTS;
    as?: keyof typeof AS;
};

export const Button = (props: ButtonProps) => {
    const { children, type = "button", variant = "contained", width, height, as, ...rest } = props;
    const { t } = useTranslation();

    return (
        <button
            {...rest}
            type={type}
            className={classNames(
                VARIANTS[variant],
                width && WIDTHS[width],
                height && HEIGHTS[height],
                as && AS[as].color,
            )}
        >
            {as ? (children && typeof children == "string" ? t(children) : t(AS[as].label)) : children}
        </button>
    );
};
