import React from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { Icon, IconsType, IconSizesType } from "@/comn/components";

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
    contained: { style: "uf-button", color: "" },
    outlined: { style: "uf-button-outlined", color: "" },
    underlined: { style: "uf-button-underlined", color: "" },
    primary: { style: "uf-button", color: "blue" },
    warning: { style: "uf-button", color: "warning" },
    danger: { style: "uf-button", color: "error" },
    secondary: { style: "uf-button", color: "gray" },
    info: { style: "uf-button", color: "info" },
    "outline-info": { style: "uf-button-outlined", color: "info" },
    "outline-primary": { style: "uf-button-outlined", color: "blue" },
    "outline-danger": { style: "uf-button-outlined", color: "error" },
    "outline-secondary": { style: "uf-button-outlined", color: "gray" },
    "outline-bg": { style: "uf-button-outlined", color: "" },
    "outline-warning": { style: "uf-button-outlined", color: "warning" },
};

const BUTTON_ROLES = {
    save: { text: "B_SAVE", color: "primary", variant: undefined },
    list: { text: "B_LST", color: "gray", variant: undefined },
    submit: { text: "B_SBMT", color: "warning", variant: undefined },
    search: { text: "B_SRCH", color: "blue", variant: undefined },
    close: { text: "B_CLS", color: "error", variant: undefined },
    delete: { text: "B_DEL", color: "error", variant: undefined },
    reset: { text: "B_RESET", color: "warning", variant: undefined },
    confirm: { text: "B_CFRM", color: "success", variant: undefined },
    ok: { text: "B_OK", color: "primary", variant: undefined },
    edit: { text: "B_EDIT", color: "primary", variant: undefined },
    new: { text: "B_NEW", color: "gray", variant: undefined },
    cancel: { text: "B_CNCL", color: "warning", variant: undefined },
    apply: { text: "B_APPD", color: "blue", variant: undefined },
    gridAdd: { text: "B_ADD", color: "blue", variant: "uf-button-outlined" },
    gridDelete: { text: "B_DELETE", color: "error", variant: "uf-button-outlined" },
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    width?: keyof typeof WIDTHS;
    height?: keyof typeof HEIGHTS;
    variant?: keyof typeof BUTTON_VARIANTS;
    color?: "black" | "white" | "darkgray" | "gray" | "lightgray" | "blue" | "success" | "error" | "info" | "warning";
    role?: keyof typeof BUTTON_ROLES;
    icon?: IconsType;
    size?: IconSizesType;
};

export const Button = (props: ButtonProps) => {
    let {
        children,
        type = "button",
        variant = "contained",
        color,
        width,
        height,
        role,
        icon,
        size = "xs",
        ...rest
    } = props;

    const { t } = useTranslation();

    const _color = color
        ? { "data-color": color }
        : role && BUTTON_ROLES[role].color
          ? { "data-color": BUTTON_ROLES[role].color }
          : variant && BUTTON_VARIANTS[variant].color
            ? { "data-color": BUTTON_VARIANTS[variant].color }
            : {};

    return (
        <button
            {...rest}
            {..._color}
            type={type}
            className={classNames(
                "max-w-full min-w-max flex items-center disabled:bg-uf-lightgray disabled:border-uf-lightgray disabled:pointer-events-none",
                role && BUTTON_ROLES[role].variant !== undefined
                    ? BUTTON_ROLES[role].variant
                    : BUTTON_VARIANTS[variant].style,
                role && BUTTON_ROLES[role].color,
                width && WIDTHS[width],
                height && HEIGHTS[height],
            )}
        >
            {icon && <Icon icon={icon} size={size} className="mr-1" />}
            {role ? t(BUTTON_ROLES[role].text) : typeof children === "string" ? t(children) : children}
        </button>
    );
};
