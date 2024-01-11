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

const BUTTON_VARIANTS = {
    contained: "uf-button",
    outlined: "uf-button-outlined",
    underlined: "uf-button-underlined",
};

const BUTTON_ROLES = {
    save: { text: "B_SAVE", color: "info" },
    list: { text: "B_LST", color: "" },
    submit: { text: "B_SBMT", color: "warning" },
    search: { text: "B_SRCH", color: "info" },
    close: { text: "B_CLS", color: "error" },
    delete: { text: "B_DEL", color: "error" },
    reset: { text: "B_RESET", color: "warning" },
    confirm: { text: "B_CFRM", color: "success" },
    ok: { text: "B_OK", color: "success" },
    apply: { text: "B_APPD", color: "blue" },
    gridAdd: { text: "B_ADD", color: "blue" },
    gridDelete: { text: "B_DELETE", color: "error" },
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    width?: keyof typeof WIDTHS;
    height?: keyof typeof HEIGHTS;
    variant?: keyof typeof BUTTON_VARIANTS;
    color?: "black" | "white" | "darkgray" | "gray" | "lightgray" | "blue" | "success" | "error" | "info" | "warning";
    role?: keyof typeof BUTTON_ROLES;
};

export const Button = (props: ButtonProps) => {
    let { children, type = "button", variant = "contained", color, width, height, role, ...rest } = props;

    const { t } = useTranslation();

    const _color = color
        ? { "data-color": color }
        : role && BUTTON_ROLES[role].color
          ? { "data-color": BUTTON_ROLES[role].color }
          : {};

    return (
        <button
            {...rest}
            {..._color}
            type={type}
            className={classNames(
                BUTTON_VARIANTS[variant],
                role && BUTTON_ROLES[role].color,
                width && WIDTHS[width],
                height && HEIGHTS[height],
            )}
        >
            {role ? t(BUTTON_ROLES[role].text) : typeof children === "string" ? t(children) : children}
        </button>
    );
};
