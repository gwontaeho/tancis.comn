import React from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

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

const AS = {
    save: { label: "B_SAVE", css: "bg-blue text-white border-none" },
    list: { label: "B_LST", css: "" },
    submit: { label: "B_SBMT", css: "bg-warning text-white border-none" },
    search: { label: "B_SRCH", css: "bg-blue text-white border-none" },
    close: { label: "B_CLS", css: "bg-invalid text-white border-none" },
    delete: { label: "B_DEL", css: "bg-invalid text-white border-none" },
    reset: { label: "B_RESET", css: "bg-warning text-white border-none" },
    confirm: { label: "B_CFRM", css: "bg-success text-white border-none" },
    ok: { label: "B_OK", css: "bg-success text-white border-none" },
    link: { label: "", css: "" },
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: keyof typeof SIZES;
    as?: keyof typeof AS;
};

export const Button = (props: ButtonProps) => {
    const { children, type = "button", size = "fit", as, ...rest } = props;
    const { t } = useTranslation();

    return (
        <button {...rest} type={type} className={classNames("button", SIZES[size], as && AS[as].css)}>
            {as ? (children && typeof children == "string" ? t(children) : t(AS[as].label)) : children}
        </button>
    );
};
